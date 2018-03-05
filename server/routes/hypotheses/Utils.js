"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("mz/fs");
const glob = require("glob");
const Models_1 = require("./Models");
function globPromise(pattern, options) {
    return new Promise((resolve, reject) => {
        glob(pattern, options, (err, matches) => {
            if (err)
                return reject(err);
            return resolve(matches);
        });
    });
}
exports.globPromise = globPromise;
function checkDoc(doc) {
    if (!doc) {
        throw "document not found";
    }
    return doc;
}
exports.checkDoc = checkDoc;
function codedBy(hypothesis, coder) {
    for (const code of hypothesis.codeResults) {
        if (code.coder === coder)
            return true;
    }
    return false;
}
exports.codedBy = codedBy;
function takeRandomElementFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
}
exports.takeRandomElementFromArray = takeRandomElementFromArray;
function insertCodeIntoAllMatchingHypotheses(code, hypothesisRecord) {
    return __awaiter(this, void 0, void 0, function* () {
        // add to original target
        let codeRecord = yield createCodeRecord(code);
        hypothesisRecord = yield insertCode(codeRecord, hypothesisRecord);
        // add to identical hypotheses
        let matchingHypothesisRecords = yield findMatchingHypotheses(hypothesisRecord)
            .then(matchingHypothesisRecords => {
            return Promise.all(matchingHypothesisRecords.map(matchingHypothesisRecord => {
                return insertCode(codeRecord, matchingHypothesisRecord);
            }));
        });
        let affectedHypothesisRecords = [hypothesisRecord, ...matchingHypothesisRecords];
        console.log(`Code (${code.coder}) applied to ${affectedHypothesisRecords.length} hypotheses`);
        return affectedHypothesisRecords;
    });
}
exports.insertCodeIntoAllMatchingHypotheses = insertCodeIntoAllMatchingHypotheses;
function findMatchingHypotheses(hypothesisRecord) {
    return __awaiter(this, void 0, void 0, function* () {
        return Models_1.Hypothesis.find()
            .where('fulltext').equals(hypothesisRecord.fulltext)
            .where('_id').ne(hypothesisRecord._id)
            .exec();
    });
}
function insertCode(codeRecord, hypothesisRecord) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!hypothesisRecord.codeResults) {
            hypothesisRecord.codeResults = [];
        }
        hypothesisRecord.codeResults.push(codeRecord);
        return hypothesisRecord.save();
    });
}
exports.insertCode = insertCode;
/**
* Read file contents from ../data/*.json and use them to create hypothesis entries and parser codings.
*/
function seed() {
    return __awaiter(this, void 0, void 0, function* () {
        return globPromise("./data/*.json", {})
            .then(files => { console.log(files); return files; })
            .then(parseFiles)
            .then(addCounts);
    });
}
exports.seed = seed;
function parseFiles(files) {
    return __awaiter(this, void 0, void 0, function* () {
        return Promise.all(files.map(parseFile));
    });
}
function parseFile(file) {
    return __awaiter(this, void 0, void 0, function* () {
        return fs.readFile(file, 'utf8') // read file
            .then(JSON.parse) // parse as JSON
            .then(parseHypotheses); // parse codes and store
    });
}
function addCounts(counts) {
    let COUNTS = { files: counts.length };
    for (let count of counts) {
        for (let property in count) {
            if (!COUNTS[property]) {
                COUNTS[property] = 0;
            }
            COUNTS[property] += count[property];
        }
    }
    console.log(COUNTS);
    return COUNTS;
}
function parseHypotheses(data) {
    return __awaiter(this, void 0, void 0, function* () {
        let counts = {};
        try {
            return yield Promise.all(Object.keys(data).map(id => createStoryRecord(data[id])))
                .then((stories) => {
                return {
                    stories: stories.length,
                    updates: stories.map(story => story.updates.length).reduce((a, b) => a + b),
                    snapshots: stories.map(story => story.snapshots.length).reduce((a, b) => a + b)
                };
            });
        }
        catch (e) {
            console.error(e);
            throw (e);
        }
    });
}
function createStoryRecord(story) {
    return __awaiter(this, void 0, void 0, function* () {
        let storyRecord = new Models_1.Story(story);
        storyRecord.actor = story.actor;
        storyRecord.updates = [];
        storyRecord.snapshots = [];
        // if (story.updates){
        // 	for (let update of story.updates){
        // 		storyRecord.updates.push( await createHypothesisRecord( update ) );
        // 	}
        // }
        if (story.snapshots) {
            for (let snapshot of story.snapshots) {
                storyRecord.snapshots.push(yield createHypothesisRecord(snapshot));
            }
        }
        return storyRecord.save();
    });
}
function createHypothesisRecord(hypothesis) {
    return __awaiter(this, void 0, void 0, function* () {
        let hypothesisRecord = new Models_1.Hypothesis(hypothesis);
        hypothesisRecord.codeResults = [];
        if (hypothesis.parseResults) {
            hypothesisRecord.parseResults = yield createCodeRecord(hypothesis.parseResults);
        }
        return hypothesisRecord.save();
    });
}
function createCodeRecord(code) {
    return __awaiter(this, void 0, void 0, function* () {
        let codeRecord = new Models_1.Code(code);
        codeRecord.results = [];
        for (let criterium of code.results) {
            codeRecord.results.push(yield new Models_1.Criterium(criterium).save());
        }
        return codeRecord.save();
    });
}
