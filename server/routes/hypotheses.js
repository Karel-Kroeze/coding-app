const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const fs = require('mz/fs');
const path = require('path');
const glob = require('glob-fs')();

function nodir(file){
  if (fs.)
}

let mongoCollection = process.env.MONGO_COLLECTION || "coding";

mongoose.connect(`mongodb://mongo/${mongoCollection}`);
// mongoose.connect("mongodb://localhost/coding");
mongoose.Promise = global.Promise;

let hypothesisSchema = mongoose.Schema({
    _hypothesisId: String,
    actor: String,
    hypothesis: String,
    reason: String,
    numberCodes: Number,
    codes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Code' }]
});
hypothesisSchema.pre('save', function(next) {
  this.numberCodes = this.codes.length;
  next();
});

let codeSchema = mongoose.Schema({
  _target: { type: mongoose.Schema.Types.ObjectId, ref: 'hypothesis' },
  coder: String,
  results: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Criterium' }]
});

let criteriumSchema = mongoose.Schema({
  _target: { type: mongoose.Schema.Types.ObjectId, ref: 'Code' },
  test: String,
  result: Boolean
});

let Hypothesis = mongoose.model( "Hypothesis", hypothesisSchema );
let Code = mongoose.model( "Code", codeSchema );
let Criterium = mongoose.model( "Criterium", criteriumSchema );

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json( "hypotheses work!" );
});

// clear db DISABLE IN PRODUCTION MODE!
router.get('/clear', function( req, res, next ) {
  Promise.all( [
    Hypothesis.remove(),
    Code.remove(),
    Criterium.remove()
  ]).then(
      res.send( "db cleared" )
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
        console.log( contents, "db not empty" );
        res.status( 418 );
        res.send( "db not empty" );
      } else {
        seed().then( counts => {
            res.json( counts );
          })
      }
    });
});

// get all data. All of it. That's a lot.
router.get('/hypotheses', function( req, res, next ){
  Hypothesis
    .find({})
    .populate({
      path: "codes",
      model: "Code",
      populate: {
        path: "results",
        model: "Criterium"
      }
    })
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
        let counts = {
          total: docs.length,
          one: 0,
          multiple: 0
        };
        for ( doc of docs ){
            let codes = doc.codes.length;
            switch (codes) {
              case 0:
              case 1:
                break;
              
              case 2:
                counts.one++;
                break;
            
              default:
                counts.multiple++;
                break;
            }
        }
        counts.percentOne = Math.round( counts.one / counts.total * 100) + "%";
        counts.percentMultiple = Math.round( counts.multiple / counts.total * 100) + "%";
        res.json( counts );
    }).catch( err => {
        res.status( 500 );
        res.json( err );
    })
})

router.get('/check/:id', function( req, res, next ){
    Hypothesis
      .findById( req.params.id )
      .populate({
        path: "codes",
        model: "Code",
        populate: {
          path: "results",
          model: "Criterium"
        }
      }).exec()
      .then( doc => {
          res.json( doc );
      }).catch( err => {
          res.status( 500 );
          res.json( err );
      });
});

router.get('/hypothesis', function( req, res, next ){
    Hypothesis
      .find()
      .sort( 'numberCodes' )
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
        .then( hypothesis => {
            // create and attach new code
            let codeRecord = new Code({
              _target: hypothesis._id,
              coder: req.body.coder
            });
            hypothesis.codes.push( codeRecord );            
            hypothesis.save();

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
  console.log( process.cwd() )
  return glob.readdirPromise( "./data/*.json" )
      .then( files => { console.log( files ); return files })
      .then( 
        files => Promise.all( 
          files.map( 
            file => fs.readFile( file, 'utf8' ) // read file
                      .then( JSON.parse )       // parse as JSON
                      .then( parseHypotheses )  // parse codes and store
          )
        ).then( countsArray => {
          let COUNTS = { files: countsArray.length }
          for ( let counts of countsArray ){
            for ( let property in counts ){
              COUNTS[property] += counts[property]
            }
          }
          return COUNTS;
        })
      ) 
}

function parseHypotheses( data ) {
  let counts = {
    hypotheses: 0,
    snapshots: 0,
    criteria: 0
  }

  for ( let id in data ){
      counts.hypotheses++;

      let set = data[id];
      let actor = set.actor.displayName;
      for ( let snapshot of set.snapshots ){
          // create hypothesis object
          let hypothesisRecord = new Hypothesis({
              _hypothesisId: id,
              actor: actor,
              hypothesis: snapshot.text,
              reason: snapshot.reason
          });

          // create parser code
          let parserCodeRecord = new Code({
              coder: "Parser"
          });
          hypothesisRecord.codes.push( parserCodeRecord );

          // create criteria codeSchema
          for ( let criterium of snapshot.code ){
              let criteriumRecord = new Criterium({
                  test: criterium.test,
                  result: criterium.status
              });
              parserCodeRecord.results.push( criteriumRecord );
              criteriumRecord.save();
              counts.criteria++;
          }

          parserCodeRecord.save();
          hypothesisRecord.save();
          counts.snapshots++;
      }
  }
  return counts;
}


module.exports = router;

