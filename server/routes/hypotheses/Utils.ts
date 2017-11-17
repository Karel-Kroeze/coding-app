import { ICodeResult, IHypothesis, IHypothesisStory } from '@golab/adaptive-hypotheses/dist/lib';
import * as fs from 'mz/fs';
import * as glob from 'glob';
import { IHypothesisModel, Hypothesis, Counts, IStoryModel, Story, ICodeModel, Code, Criterium } from './Models';

export function globPromise( pattern: string, options: glob.IOptions ): Promise<string[]>{
	return new Promise( (resolve, reject) => {
		glob( pattern, options, (err, matches) => {
			if (err)
			return reject( err );
			return resolve( matches );
		})
	})
}

export function checkDoc<T>( doc: T | null ){
	if (!doc) {
		throw "document not found";
	}
	return doc;
}

export function codedBy( hypothesis: IHypothesisModel, coder: string ): boolean {
	for ( const code of <ICodeResult[]>hypothesis.codeResults ){
		if ( code.coder === coder )
			return true;
	}
	return false;
}

export function takeRandomElementFromArray<T>( array: T[] ): T {
	return array[Math.floor(Math.random()*array.length)];
}

export async function insertCodeIntoAllMatchingHypotheses( code: ICodeResult, hypothesisRecord: IHypothesisModel ): Promise<IHypothesisModel[]> {
	// add to original target
	let codeRecord = await createCodeRecord( code );
	hypothesisRecord = await insertCode( codeRecord, hypothesisRecord );
	
	// add to identical hypotheses
	let matchingHypothesisRecords = await findMatchingHypotheses( hypothesisRecord )
		.then( matchingHypothesisRecords => {
			return Promise.all( matchingHypothesisRecords.map( matchingHypothesisRecord => {
				return insertCode( codeRecord, matchingHypothesisRecord );
			}))
		})

	let affectedHypothesisRecords = [ hypothesisRecord, ...matchingHypothesisRecords ];
	console.log( `Code (${code.coder}) applied to ${affectedHypothesisRecords.length} hypotheses` );
	return affectedHypothesisRecords;
}

async function findMatchingHypotheses( hypothesisRecord: IHypothesisModel ): Promise<IHypothesisModel[]> {
	return Hypothesis.find()
		.where( 'fulltext' ).equals( hypothesisRecord.fulltext )
		.where( '_id' ).ne( hypothesisRecord._id )
		.exec()
}

export async function insertCode( codeRecord: ICodeModel, hypothesisRecord: IHypothesisModel ): Promise<IHypothesisModel> {
	if ( !hypothesisRecord.codeResults ){
		hypothesisRecord.codeResults = [];
	}
	hypothesisRecord.codeResults.push( codeRecord );	
	return hypothesisRecord.save();
}

/**
* Read file contents from ../data/*.json and use them to create hypothesis entries and parser codings.
*/
export async function seed(): Promise<Counts> {
	return globPromise( "./data/*.json", {} )
			.then( files => { console.log( files ); return files; })
			.then( parseFiles )
			.then( addCounts );
}

async function parseFiles( files: string [] ) {
	return Promise.all( files.map( parseFile ) );
}

async function parseFile( file: string ){
	return fs.readFile( file, 'utf8' ) // read file
		.then( JSON.parse )       // parse as JSON
		.then( parseHypotheses )  // parse codes and store
}

function addCounts( counts: Counts[] ): Counts {
	let COUNTS: Counts = { files: counts.length }
	for ( let count of counts ){
		for ( let property in count ){
			if (!COUNTS[property]) {
				COUNTS[property] = 0
			}
			COUNTS[property] += count[property]
		}
	}
	console.log( COUNTS )
	return COUNTS;
}

async function parseHypotheses( data: {[id: string]: IHypothesisStory} ): Promise<Counts> {
	let counts: Counts = {};
	return await Promise.all( Object.keys( data ).map( id => createStoryRecord( data[id] ) ) )
		.then( (stories) => { return {
			stories: stories.length,
			updates: stories.map( story => story.updates.length ).reduce( (a, b) => a + b ),
			snapshots: stories.map( story => story.snapshots.length ).reduce( (a, b) => a + b )
		}});
}

async function createStoryRecord( story: IHypothesisStory ): Promise<IStoryModel> {
	let queue = Promise.resolve();
	let storyRecord = new Story( story );
	storyRecord.updates = [];
	storyRecord.snapshots = [];
	
	// if (story.updates){
	// 	for (let update of story.updates){
	// 		storyRecord.updates.push( await createHypothesisRecord( update ) );
	// 	}
	// }

	if (story.snapshots){
		for (let snapshot of story.snapshots){
			storyRecord.snapshots.push( await createHypothesisRecord( snapshot ) );
		}
	}
	
	return storyRecord.save();
}

async function createHypothesisRecord( hypothesis: IHypothesis ): Promise<IHypothesisModel> {
	let hypothesisRecord = new Hypothesis( hypothesis );
	hypothesisRecord.codeResults = [];
	
	if (hypothesis.parseResults){
		hypothesisRecord.parseResults = await createCodeRecord( hypothesis.parseResults );
	}
	
	return hypothesisRecord.save();
}

async function createCodeRecord( code: ICodeResult ): Promise<ICodeModel> {
	let codeRecord = new Code( code );
	codeRecord.results = [];
	
	for ( let criterium of code.results ){
		codeRecord.results.push( await new Criterium( criterium ).save() );
	}
	
	return codeRecord.save();
}
	