import { GetHypothesisString } from '@golab/adaptive-hypotheses/dist/lib';
import * as express from 'express';
import { Story, Hypothesis, Code, Criterium, Counts } from './Models';
import { seed, checkDoc, insertCode, insertCodeIntoAllMatchingHypotheses, takeRandomElementFromArray, codedBy } from './Utils';
import { some } from 'lodash';

export const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.json( "api functional" );
});

// clear db DISABLE IN PRODUCTION MODE!
router.get('/clear', function( req, res, next ) {
	Promise.all( [
		<any>Story.remove({}),
		Hypothesis.remove({}),
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
	.sort({numCodes: -1 })
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
	Hypothesis.find()
		.exec()
		.then( docs => {
			let counts: Counts = {
				one: 0,
				multiple: 0,
				total: docs.length
			}
			for ( let doc of docs ){
				let codes = doc.numCodes
				switch (codes) {
					case 0:
					break;
					
					case 1:
					if(!counts.one)
						counts.one = 0;
					counts.one++;
					break;
					
					default:
					if(!counts.multiple)
						counts.multiple = 0;
					counts.multiple++;
					break;
				}
			}
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
	const coder: string = req.params.coder;
	const limit: number = 50;

	Hypothesis.find({})
		.sort({'numCodes': 1 })
		.populate({
			path: 'codeResults',
			model: 'Code'
		})
		.limit( limit )
        .then( hypothesisRecords => {
            if (hypothesisRecords.length){
				// get `limit` records, and try to randomly return one that has not been coded by the current user.
				// if that fails, just randomly return one.
				// 
				// Should mitigate overlap from people working simultaneously
				// better solution would be to check out docs and lock them, but screw that - KISS.
				let freshHypothesisRecords = hypothesisRecords.filter( hypothesisRecord => !codedBy( hypothesisRecord, coder ) );
				if (freshHypothesisRecords.length){
					console.log( `serving FRESH hypothesis for ${coder} (${freshHypothesisRecords.length}/${limit})`);
					return res.json( { data: takeRandomElementFromArray( freshHypothesisRecords ) } )
				} else {
					console.log( `serving STALE hypothesis for ${coder}`);
					return res.json( { data: takeRandomElementFromArray( hypothesisRecords ) } )
				}
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
	Hypothesis.findById( req.body.hypothesis._id )
		.populate( { path: "codeResults", model: "Code" } )
		.exec()
		.then( checkDoc )
		.then( hypothesisRecord => insertCodeIntoAllMatchingHypotheses( req.body.code, hypothesisRecord ) )
		.then( affectedHypothesisRecords => res.json( { status: true, records: affectedHypothesisRecords } ) )
		.catch( err => {
			console.error( err );
			res.json( { status: false, error: err });
		})
})
