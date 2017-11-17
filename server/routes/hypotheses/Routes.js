"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const Models_1 = require("./Models");
const Utils_1 = require("./Utils");
exports.router = express.Router();
/* GET home page. */
exports.router.get('/', function (req, res, next) {
    res.json("api functional");
});
// clear db DISABLE IN PRODUCTION MODE!
exports.router.get('/clear', function (req, res, next) {
    Promise.all([
        Models_1.Story.remove({}),
        Models_1.Hypothesis.remove({}),
        Models_1.Code.remove({}),
        Models_1.Criterium.remove({})
    ]).then(_ => res.send("db cleared")).catch(err => {
        res.status(500);
        res.send(err.message);
    });
});
// seed db DISABLE IN PRODUCTION MODE!
exports.router.get('/seed', function (req, res, next) {
    // check if db is empty.
    Models_1.Hypothesis.find()
        .then(contents => {
        if (contents.length) {
            console.log(contents.length, "db not empty");
            res.status(418);
            res.send("db not empty");
        }
        else {
            Utils_1.seed().then((counts) => {
                res.json(counts);
            });
        }
    });
});
// get all data. All of it. That's a lot.
exports.router.get('/hypotheses', function (req, res, next) {
    Models_1.Story
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
        .then(hypotheses => {
        res.json(hypotheses);
    });
});
// get current status
exports.router.get('/status', function (req, res, next) {
    Models_1.Hypothesis.find()
        .exec()
        .then(docs => {
        let counts = {
            one: 0,
            multiple: 0,
            total: docs.length
        };
        for (let doc of docs) {
            let codes = doc.numCodes;
            switch (codes) {
                case 0:
                    break;
                case 1:
                    if (!counts.one)
                        counts.one = 0;
                    counts.one++;
                    break;
                default:
                    if (!counts.multiple)
                        counts.multiple = 0;
                    counts.multiple++;
                    break;
            }
        }
        res.json(counts);
    }).catch(err => {
        res.status(500);
        res.json(err);
    });
});
exports.router.get('/check/:id', function (req, res, next) {
    Models_1.Hypothesis
        .findById(req.params.id)
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
        .then(doc => {
        res.json(doc);
    }).catch(err => {
        res.status(500);
        res.json(err);
    });
});
exports.router.get('/hypothesis/:coder', function (req, res, next) {
    const coder = req.params.coder;
    const limit = 50;
    Models_1.Hypothesis.find({})
        .sort({ 'numCodes': 1 })
        .populate({
        path: 'codeResults',
        model: 'Code'
    })
        .limit(limit)
        .then(hypothesisRecords => {
        if (hypothesisRecords.length) {
            // get `limit` records, and try to randomly return one that has not been coded by the current user.
            // if that fails, just randomly return one.
            // 
            // Should mitigate overlap from people working simultaneously
            // better solution would be to check out docs and lock them, but screw that - KISS.
            let freshHypothesisRecords = hypothesisRecords.filter(hypothesisRecord => !Utils_1.codedBy(hypothesisRecord, coder));
            if (freshHypothesisRecords.length) {
                console.log(`serving FRESH hypothesis for ${coder} (${freshHypothesisRecords.length}/${limit})`);
                return res.json({ data: Utils_1.takeRandomElementFromArray(freshHypothesisRecords) });
            }
            else {
                console.log(`serving STALE hypothesis for ${coder}`);
                return res.json({ data: Utils_1.takeRandomElementFromArray(hypothesisRecords) });
            }
        }
        else {
            res.status(404);
            res.send("no hypotheses");
        }
    }).catch(err => {
        console.error(err);
        res.status(500);
        res.send(err.message);
    });
});
exports.router.post('/code', function (req, res, next) {
    Models_1.Hypothesis.findById(req.body.hypothesis._id)
        .populate({ path: "codeResults", model: "Code" })
        .exec()
        .then(Utils_1.checkDoc)
        .then(hypothesisRecord => Utils_1.insertCodeIntoAllMatchingHypotheses(req.body.code, hypothesisRecord))
        .then(affectedHypothesisRecords => res.json({ status: true, records: affectedHypothesisRecords }))
        .catch(err => {
        console.error(err);
        res.json({ status: false, error: err });
    });
});
