"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoCollection = process.env.MONGO_COLLECTION || "coding";
mongoose.connect(`mongodb://mongo/${mongoCollection}`);
// mongoose.connect("mongodb://localhost/coding");
mongoose.Promise = global.Promise;
let storySchema = new mongoose.Schema({
    snapshots: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Hypothesis' }],
    updates: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Hypothesis' }]
});
let hypothesisSchema = new mongoose.Schema({
    // IHypothesis
    approved: Boolean,
    tested: Boolean,
    elements: mongoose.SchemaTypes.Mixed,
    fulltext: String,
    numCodes: Number,
    confidence: Number,
    state: String,
    showConfidenceMeter: Boolean,
    // IHypothesisAdaptive
    feedback: mongoose.SchemaTypes.Mixed,
    parseResults: { type: mongoose.SchemaTypes.ObjectId, ref: 'Code' },
    // IHypothesisCoded
    codeResults: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Code' }]
});
hypothesisSchema.pre('save', function (next) {
    this.numCodes = this.codeResults ? this.codeResults.length : 0;
    this.fulltext = this.elements.map(element => element.text).join(" ").trim().toLowerCase();
    next();
});
let codeSchema = new mongoose.Schema({
    coder: String,
    results: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Criterium' }]
});
let criteriumSchema = new mongoose.Schema({
    test: String,
    success: Boolean
});
exports.Story = mongoose.model("Story", storySchema);
exports.Hypothesis = mongoose.model("Hypothesis", hypothesisSchema);
exports.Code = mongoose.model("Code", codeSchema);
exports.Criterium = mongoose.model("Criterium", criteriumSchema);
