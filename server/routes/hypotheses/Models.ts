import { ICodeResult, ICriteriumResult, IHypothesis, IHypothesisStory } from '@golab/adaptive-hypotheses/dist/lib';
import * as mongoose from 'mongoose';

export type Counts = {	[key: string]: number }
export type Percentages = { [key: string]: string }

export interface IStoryModel extends IHypothesisStory, mongoose.Document {}
export interface IHypothesisModel extends IHypothesis, mongoose.Document {
	numCodes: number
	fulltext: string
}
export interface ICodeModel extends ICodeResult, mongoose.Document {}
export interface ICriteriumModel extends ICriteriumResult, mongoose.Document {}

const mongoCollection = process.env.MONGO_COLLECTION || "coding";

mongoose.connect(`mongodb://mongo/${mongoCollection}`);
// mongoose.connect("mongodb://localhost/coding");
(<any>mongoose).Promise = global.Promise;

let storySchema = new mongoose.Schema({
	snapshots: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Hypothesis' }],
	updates: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Hypothesis' }]
})

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
hypothesisSchema.pre('save', function( this: IHypothesisModel, next) {
	this.numCodes = this.codeResults ? this.codeResults.length : 0;
	this.fulltext = this.elements.map( element => element.text ).join( " " ).trim().toLowerCase();
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

export const Story: mongoose.Model<IStoryModel> = mongoose.model<IStoryModel>( "Story", storySchema );
export const Hypothesis: mongoose.Model<IHypothesisModel> = mongoose.model<IHypothesisModel>( "Hypothesis", hypothesisSchema );
export const Code: mongoose.Model<ICodeModel> = mongoose.model<ICodeModel>( "Code", codeSchema );
export const Criterium: mongoose.Model<ICriteriumModel> = mongoose.model<ICriteriumModel>( "Criterium", criteriumSchema );
