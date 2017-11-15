import * as express from 'express';
import * as mongoose from 'mongoose';
import * as _ from 'lodash';
import * as fs from 'mz/fs';
import * as path from 'path';
import * as glob from 'glob';
import '@golab/adaptive-hypotheses/';

const router = express.Router();
function globPromise( pattern: string, options: glob.IOptions ): Promise<string[]>{
	return new Promise( (resolve, reject) => {
		glob( pattern, options, (err, matches) => {
			if (err)
			return reject( err );
			return resolve( matches );
		})
	})
}

interface IHypothesisStoryModel extends IHypothesisStory, mongoose.Document {}
interface IHypothesisModel extends IHypothesis, mongoose.Document {
	numberCodes: number
	fulltext: string
}
interface IHypothesisCodeModel extends ICodeResult, mongoose.Document {}
interface IHypothesisCriteriumModel extends ICriteriumResult, mongoose.Document {}

let mongoCollection = process.env.MONGO_COLLECTION || "coding";

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
	elements: [{ // IHypothesisElement
		text: String,
		type: String
	}],
	fulltext: String,
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
	this.numberCodes = this.codeResults ? this.codeResults.length : 0;
	this.fulltext = this.elements.map( element => element.text ).join( " " ).trim().toLowerCase();
	next();
});

let codeSchema = new mongoose.Schema({
	coder: String,
	results: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Criterium' }]
});

let criteriumSchema = new mongoose.Schema({
	test: String,
	result: Boolean
});

let Story: mongoose.Model<IHypothesisStoryModel> = mongoose.model<IHypothesisStoryModel>( "Story", storySchema );
let Hypothesis: mongoose.Model<IHypothesisModel> = mongoose.model<IHypothesisModel>( "Hypothesis", hypothesisSchema );
let Code: mongoose.Model<IHypothesisCodeModel> = mongoose.model<IHypothesisCodeModel>( "Code", codeSchema );
let Criterium: mongoose.Model<IHypothesisCriteriumModel> = mongoose.model<IHypothesisCriteriumModel>( "Criterium", criteriumSchema );

/* GET home page. */
router.get('/', function(req, res, next) {
	res.json( "hypotheses work!" );
});

// clear db DISABLE IN PRODUCTION MODE!
router.get('/clear', function( req, res, next ) {
	Promise.all( [
		<any>Hypothesis.remove({}),
		Code.remove({}),
		Criterium.remove({})
	]).then(
		_ => res.send( "db cleared" )
	).catch( err => {
		res.status( 500 );
		res.send( err.message );
	});
});

// seed db DISABLE IN PRODUCTION MODE!
type Counts = {	[type: string]: number }
router.get('/seed', function( req, res, next) {
	
	// check if db is empty.
	Hypothesis.find()
	.then( contents => {
		if (contents.length){
			console.log( contents.length, "db not empty" );
			res.status( 418 );
			res.send( "db not empty" );
		} else {
			seed().then( (counts: Counts) => {
				res.json( counts );
			})
		}
	});
});

// get all data. All of it. That's a lot.
router.get('/hypotheses', function( req, res, next ){
	Story
	.find({})
	.populate([{
		path: "snapshots",
		model: "Hypothesis",
		populate: [{
			path: "codeResults",
			model: "Code",
			populate: {
				path: "results",
				model: "Criterium"
			}
		},
		{
			path: "parseResults",
			model: "Code",
			populate: {
				path: "results",
				model: "Criterium"
			}
		}]
	},
	{
		path: "updates",
		model: "Hypothesis",
		populate: [{
			path: "codeResults",
			model: "Code",
			populate: {
				path: "results",
				model: "Criterium"
			}
		},
		{
			path: "parseResults",
			model: "Code",
			populate: {
				path: "results",
				model: "Criterium"
			}
		}]
	}])
	.exec()
	.then( hypotheses => {
		res.json( hypotheses );
	})
})

// get current status
router.get('/status', function( req, res, next ) {
	Hypothesis
	.find()
	.exec()
	.then( docs => {
		let counts: {[count: string]: number } = {}
		let percentages: {[percentage: string]: string } = {}
		for ( let doc of docs ){
			let codes = doc.numberCodes
			switch (codes) {
				case 0:
				break;
				
				case 1:
				counts.one++;
				break;
				
				default:
				counts.multiple++;
				break;
			}
		}
		percentages.one = Math.round( counts.one / counts.total * 1000 ) / 10 + "%";
		percentages.multiple = Math.round( counts.multiple / counts.total * 1000 ) / 10 + "%";
		res.json( counts );
	}).catch( err => {
		res.status( 500 );
		res.json( err );
	})
})

router.get('/check/:id', function( req, res, next ){
	Hypothesis
	.findById( req.params.id )
	.populate([{
		path: "codeResults",
		model: "Code",
		populate: {
			path: "results",
			model: "Criterium"
		}
	},
	{
		path: "parseResults",
		model: "Code",
		populate: {
			path: "results",
			model: "Criterium"
		}
	}])
	.exec()
	.then( doc => {
		res.json( doc );
	}).catch( err => {
		res.status( 500 );
		res.json( err );
	});
});

router.get('/hypothesis/:coder', function( req, res, next ){
	console.log( req.params.coder );
	Hypothesis
	.find()
	.populate({
		path: "codeResults",
		model: "Code"
	})
	// todo; I think this doesn't actually expect an array...
	.where( 'codeResults.coder' ).ne( req.params.coder )
	.limit( 10 )
	.exec()
	.then( docs => {
		if (docs){
			// get 10 records, and return one at random. Should mitigate overlap from people working simultaneously
			// better solution would be to check out docs and lock them, but screw that - KISS.
			res.json( { data: docs[Math.floor(Math.random()*docs.length)] } );
		} else {
			res.status( 404 );
			res.send( "no hypotheses" );
		}
	}).catch( err => {
		console.error( err );
		res.status( 500 );
		res.send( err.message );
	})
})

router.post('/code', function( req, res, next ){
	console.log( req.body );
	
	if (!req.body || !req.body.hypothesis || !req.body.hypothesis._id || !req.body.criteria || !req.body.coder ){
		res.json( {status: false });
	} else {
		Hypothesis
		.findById( req.body.hypothesis._id )
		.then( doc => { 
			if (!doc) throw "bad request" 
			return doc;
		})
		.then( hypothesis => {
			// create and attach new code
			let codeRecord = new Code({ coder: req.body.coder });
			if (!hypothesis.codeResults)
				hypothesis.codeResults = [];
			hypothesis.codeResults.push( codeRecord );            
			hypothesis.save();
			
			// for each identical hypothesis, also add this code
			Hypothesis
				.find()
				.where( "fulltext", hypothesis.fulltext )
				.where( "_id" ).ne( hypothesis._id )
				.then( identicalHypotheses => {
					console.log( identicalHypotheses.length + " identical hypotheses found." );
					identicalHypotheses.map( identical => {
						if (!identical.codeResults)
							identical.codeResults = [];
						identical.codeResults.push( codeRecord );
						identical.save();
					})
				})
			
			// create and attach criteria
			for ( let criterium of req.body.criteria ){
				let criteriumRecord = new Criterium({
					_target: codeRecord._id,
					test: criterium.test,
					result: criterium.result
				});
				codeRecord.results.push( criteriumRecord );
				criteriumRecord.save();
			}
			
			// finally, save the codeRecord
			codeRecord.save();
			
			res.json( { status: true, id: hypothesis._id, check: "/api/check/" + hypothesis._id });
		}).catch( err => {
			console.error( err );
			res.json( { status: false, error: err });
		})
	}
})

/**
* Read file contents from ../data/*.json and use them to create hypothesis entries and parser codings.
*/
let seed = function(){
	return globPromise( "./data/*.json", {} )
	.then( files => { console.log( files ); return files })
	.then( files => { return Promise.all( 
		files.map( 
			file => fs.readFile( file, 'utf8' ) // read file
			.then( JSON.parse )       // parse as JSON
			.then( parseHypotheses )  // parse codes and store
		) ) } )
		.then( (countsArray: Counts[]) => {
			let COUNTS: Counts = { files: countsArray.length }
			for ( let counts of countsArray ){
				for ( let property in counts ){
					if (!COUNTS[property]) COUNTS[property] = 0
					COUNTS[property] += counts[property]
				}
			}
			console.log( COUNTS )
			return COUNTS;
		}); 
	}
	
	function parseHypotheses( data: {[id: string]: IHypothesisStory} ): Counts {
		let counts: Counts = {
			hypotheses: 0,
			snapshots: 0,
			updates: 0
		}
		
		for ( let id in data ){
			// create story object
			let story = data[id];
			let storyRecord = new Story(story);
			counts.hypotheses++;
			
			// // add all hypotheses
			// for ( let snapshot of story.snapshots ){
			// 	// create hypothesis object
			// 	let hypothesisRecord = new Hypothesis(snapshot);
			// 	storyRecord.snapshots.push( hypothesisRecord );

			// 	// add parser codes
			// 	let parserCodeRecord = new Code( snapshot.parseResults );
				
			// }
		}
		return counts;
	}
	
	
	module.exports = router;
	
	