export class Hypothesis{
    _hypothesisId: string
    actor: string
    hypothesis: string
    reason: string
    numberCodes: number
}

export class Criterium{
    test: string
    result?: boolean
    key?: string

    constructor( test: string, key?: string ){
        this.test = test;
        this.result = true;
        this.key = key;
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