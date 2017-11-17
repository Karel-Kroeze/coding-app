import { ICriteriumResult, ICriteriumError } from '@golab/adaptive-hypotheses';

export class Criterium implements ICriteriumResult {
    // ICriteriumResult
    test: string;
    success: boolean;
    error?: ICriteriumError;
    result?: any;
    
    constructor( test: string, public key: string, private dependents?: Criterium[], private descriptiveLabel?: string ){
        this.success = true;
        this.test = test;
    }    

    toggle( success?: boolean ): void {
        if ( typeof success !== "undefined" )
            this.success = success;
        else 
            this.success = !this.success;

        if (!this.success && this.dependents)
            for ( let dependent of this.dependents )
                dependent.toggle( false );
    }

    get label(){
        return this.descriptiveLabel || this.test;
    }
}