export class Hypothesis{
    _hypothesisId: string
    actor: string
    hypothesis: string
    reason: string
    numberCodes: number
}

export class Criterium{
    test: string
    name: string
    result?: boolean
    key?: string
    requiredFor?: Criterium[]

    constructor( test: string, key?: string, requiredFor?: Criterium[], name?: string ){
        this.test = test;
        this.result = true;
        this.key = key;
        this.requiredFor = requiredFor;
        this.name = name || test;
    }

    toggle( forceState = undefined ){
        // update this
        if (typeof( forceState ) != 'undefined' )
            this.result = forceState;
        else
            this.result = !this.result;

        // update dependencies, if any
        if ( !this.result && this.requiredFor)
            for ( let dependant of this.requiredFor )
                dependant.toggle( false );                
    }
}

// let hypothesisSchema = mongoose.Schema({
//     _hypothesisId: String,
//     actor: String,
//     hypothesis: String,
//     reason: String,
//     numberCodes: Number,
//     codes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Code' }]
// });

// let codeSchema = mongoose.Schema({
//   _target: { type: mongoose.Schema.Types.ObjectId, ref: 'hypothesis' },
//   coder: String,
//   results: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Criterium' }]
// });

// let criteriumSchema = mongoose.Schema({
//   _target: { type: mongoose.Schema.Types.ObjectId, ref: 'Code' },
//   test: String,
//   result: Boolean
// });