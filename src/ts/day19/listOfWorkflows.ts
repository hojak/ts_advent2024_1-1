import { Part, createPartFromString } from "./part";
import { RangeOfParts } from "./rangeOfParts";
import { Workflow } from "./workflow";

export class ListOfWorkflows {
    private _workflows : Map<string, Workflow> = new Map();


    constructor ( description: string ) {
        for ( let line of description.split("\n").filter ( line => line.trim() != "")) {
            let workflow = new Workflow ( line );
            this._workflows.set ( workflow.name, workflow);
        }
    }

    getNumberOfWorkflows(): number {
        return this._workflows.size;
    }

    runOnPart(aPart: Part): string {
        let currentWorkflow = "in";

        while ( this._workflows.has ( currentWorkflow) ) {
            let workflow = this._workflows.get ( currentWorkflow );
            if ( workflow == undefined ) {
                // cannot be possible, is necessary because of compiler...
                throw new Error ( "no workflow found");
            }
            currentWorkflow = workflow.perform ( aPart );
        }

        return currentWorkflow;
    }

    getAcceptedPartsOfInput(input: string): Part[] {
        let accepted :Part[] = [];
        for ( let line of input.split("\n").filter ( line => line.trim() != "")) {
            let part = createPartFromString(line);
            if ( this.runOnPart(part) == "A") {
                accepted.push(part)
            }
        }
        return accepted;
    }


    getAcceptedRanges(inputRange: RangeOfParts) : RangeOfParts[] {
        const startWorkflow = this._workflows.get('in');
        if (startWorkflow == undefined) {
            return [];
        }
        return this._getAcceptedRanges ( [], startWorkflow, inputRange);
    }

    private _getAcceptedRanges(previousDecisions: Decision[], upcomingWorkflow: Workflow, range: RangeOfParts): RangeOfParts[] {
        let result : RangeOfParts[] = [];

        for ( let step of upcomingWorkflow.steps ) {

        }

        return result;
    }

}


export function evaluateParts ( parts: Part[]) {
    return parts.map ( part => part.getSum() ).reduce ( (prev, curr) => prev+curr);
}


interface Decision {
    workflow: Workflow,
    descicionIndex: number;
}