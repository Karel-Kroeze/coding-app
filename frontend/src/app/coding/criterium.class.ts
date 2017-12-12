import { ICriteriumResult, ICriteriumError } from '@golab/adaptive-hypotheses';
import DESCRIPTIONS from './criteria-descriptions.json';
export class Criterium implements ICriteriumResult {
    // ICriteriumResult
    test: string;
    success: boolean;
    error?: ICriteriumError;
    result?: any;
    newLine = false;
    private _description: string;

    constructor( test: string, public key: string, private dependents?: Criterium[], private descriptiveLabel?: string ) {
        this.success = true;
        this.test = test;
        this._description = DESCRIPTIONS[test] || test;

        console.log( DESCRIPTIONS, test, this.description );
    }

    toggle( success?: boolean ): void {
        if ( typeof success !== 'undefined' ) {
            this.success = success;
        } else {
            this.success = !this.success;
        }

        if (!this.success && this.dependents) {
            for ( const dependent of this.dependents ) {
                dependent.toggle( false );
            }
        }
    }

    get label(){
        return this.descriptiveLabel || this.test;
    }

    get description(){
        return this._description;
    }
}
