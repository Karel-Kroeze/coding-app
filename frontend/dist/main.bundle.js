webpackJsonp(["main"],{

/***/ "../../../../../src/$$_gendir lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	return new Promise(function(resolve, reject) { reject(new Error("Cannot find module '" + req + "'.")); });
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_gendir lazy recursive";

/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container margin-top\">\n    <!-- provide a reference of status to coding, the simple (hacky) way -->\n    <app-status #status></app-status>\n    <app-coding *ngIf=\"status.checkedIn\" [status]=\"status\"></app-coding>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = (function () {
    function AppComponent() {
    }
    return AppComponent;
}());
AppComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__("../../../../../src/app/app.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app.component.css")]
    })
], AppComponent);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__coding_coding_component__ = __webpack_require__("../../../../../src/app/coding/coding.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__hypotheses_service__ = __webpack_require__("../../../../../src/app/hypotheses.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__status_status_component__ = __webpack_require__("../../../../../src/app/status/status.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_5__coding_coding_component__["a" /* CodingComponent */],
            __WEBPACK_IMPORTED_MODULE_7__status_status_component__["a" /* StatusComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* HttpModule */]
        ],
        providers: [__WEBPACK_IMPORTED_MODULE_6__hypotheses_service__["a" /* HypothesesService */]],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/coding/coding.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".hypothesis-text {\r\n    font-family: \"Roboto Slab\", serif;\r\n    text-align: center;\r\n    font-size: 36px;\r\n}\r\n\r\n@media (max-width: 600px){\r\n    .hypothesis-text {\r\n        font-size: 6vw;\r\n    }\r\n}\r\n\r\n@media (min-width: 600px) and (max-width: 1200px){\r\n    .hypothesis-text {\r\n        font-size: 4vw;\r\n    }\r\n}\r\n\r\n@media (min-width: 1200px) and (max-width: 2400px){\r\n    .hypothesis-text {\r\n        font-size: 3vw;\r\n    }\r\n}\r\n\r\n@media (min-width: 2400px ){\r\n    .hypothesis-text{\r\n        font-size: 2vw;\r\n    }\r\n}\r\n\r\n.btn.criterium {\r\n    margin: 10px;\r\n}\r\n\r\n.btn.next {\r\n    margin: 10px;\r\n    float: right\r\n}\r\n\r\n.line-break:before {\r\n    content: \"\";\r\n    display: block;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/coding/coding.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"hypothesis card\">\n    <div *ngIf=\"hypothesis\" class=\"hypothesis-text\">\n        {{hypothesis.fulltext}}\n    </div>\n    <div class=\"criteria-row\">\n        <ng-container *ngFor=\"let criterium of criteria\">\n            <br *ngIf=\"criterium.newLine\" />\n            <button type=\"button\" class=\"btn criterium\"\n                [ngClass]=\"{ 'btn-danger': !criterium.success, 'btn-success': criterium.success}\"\n                (click)=\"criterium.toggle()\"\n                [title]=\"criterium.description\"><span *ngIf=\"criterium.key\">{{criterium.key}}: </span>{{criterium.label}}</button>\n        </ng-container>\n            <button type=\"button\" class=\"btn btn-primary next\" \n                (click)=\"saveAndContinue()\"\n                [disabled]=\"savePending\">\n                <i *ngIf=\"savePending\" class=\"fa fa-spinner fa-pulse fa-fw\"></i>\n                Save\n            </button>\n    </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/coding/coding.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CodingComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__hypotheses_service__ = __webpack_require__("../../../../../src/app/hypotheses.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__status_status_component__ = __webpack_require__("../../../../../src/app/status/status.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__criterium_class__ = __webpack_require__("../../../../../src/app/coding/criterium.class.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var CodingComponent = (function () {
    function CodingComponent(hypothesesService) {
        this.hypothesesService = hypothesesService;
        this.savePending = true;
    }
    CodingComponent.prototype.keyboardInput = function (event) {
        // if enter, call saveAndContinue
        if (event.key === 'Enter') {
            return this.saveAndContinue();
        }
        // otherwise, loop over our criteria to see if the key matches any criterium.
        for (var _i = 0, _a = this.criteria; _i < _a.length; _i++) {
            var criterium = _a[_i];
            if (event.key === criterium.key) {
                return criterium.toggle();
            }
        }
        // well, that was about it...
        console.log('No binding for KeyoardEvent;', event);
    };
    CodingComponent.prototype.saveAndContinue = function () {
        var _this = this;
        if (this.savePending) {
            return;
        }
        this.savePending = true;
        this.hypothesesService.update(this.hypothesis, this.criteria, this.status.coder)
            .then(function (res) {
            if (res) {
                _this.getNextHypothesis(); // getNext succeeding also clears savePending
            }
            else {
                console.log('Something went wrong while saving');
            }
        }).catch(function (err) {
            console.log('Something went wrong while saving;', err.message);
        });
    };
    CodingComponent.prototype.ngOnInit = function () {
        this.getNextHypothesis();
    };
    CodingComponent.prototype.getNextHypothesis = function () {
        var _this = this;
        this.hypothesesService.getHypothesis(this.status.coder).then(function (res) {
            _this.hypothesis = res;
            setTimeout(function () { _this.savePending = false; }, 500);
        });
        // parser criteria
        var manipulationCriterium = new __WEBPACK_IMPORTED_MODULE_3__criterium_class__["a" /* Criterium */]('manipulation', 'r', null, 'Manipulation');
        var qualifiedCriterium = new __WEBPACK_IMPORTED_MODULE_3__criterium_class__["a" /* Criterium */]('qualified', 't', null, 'Qualified');
        var CVSCriterium = new __WEBPACK_IMPORTED_MODULE_3__criterium_class__["a" /* Criterium */]('CVS', 'y');
        var SyntaxCriterium = new __WEBPACK_IMPORTED_MODULE_3__criterium_class__["a" /* Criterium */]('Syntax', 'e', [manipulationCriterium, qualifiedCriterium, CVSCriterium]);
        var VariablesCriterium = new __WEBPACK_IMPORTED_MODULE_3__criterium_class__["a" /* Criterium */]('VariablesPresent', 'q', [SyntaxCriterium], 'Variables');
        var ModifierCriterium = new __WEBPACK_IMPORTED_MODULE_3__criterium_class__["a" /* Criterium */]('ModifiersPresent', 'w', [manipulationCriterium], 'Modifiers');
        // quality criteria
        var specificCriterium = new __WEBPACK_IMPORTED_MODULE_3__criterium_class__["a" /* Criterium */]('specific', 'f', null, 'Specific');
        var testableCriterium = new __WEBPACK_IMPORTED_MODULE_3__criterium_class__["a" /* Criterium */]('testable', 'd', [specificCriterium], 'Testable');
        var onTopicCriterium = new __WEBPACK_IMPORTED_MODULE_3__criterium_class__["a" /* Criterium */]('on-topic', 's', [testableCriterium], 'On-topic');
        var understandableCriterium = new __WEBPACK_IMPORTED_MODULE_3__criterium_class__["a" /* Criterium */]('understandable', 'a', [onTopicCriterium], 'Understandable');
        understandableCriterium.newLine = true;
        this.criteria = [
            VariablesCriterium,
            ModifierCriterium,
            SyntaxCriterium,
            manipulationCriterium,
            qualifiedCriterium,
            CVSCriterium,
            understandableCriterium,
            onTopicCriterium,
            testableCriterium,
            specificCriterium
        ];
        this.status.update();
    };
    return CodingComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__status_status_component__["a" /* StatusComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__status_status_component__["a" /* StatusComponent */]) === "function" && _a || Object)
], CodingComponent.prototype, "status", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* HostListener */])('window:keydown', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CodingComponent.prototype, "keyboardInput", null);
CodingComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'app-coding',
        template: __webpack_require__("../../../../../src/app/coding/coding.component.html"),
        styles: [__webpack_require__("../../../../../src/app/coding/coding.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__hypotheses_service__["a" /* HypothesesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__hypotheses_service__["a" /* HypothesesService */]) === "function" && _b || Object])
], CodingComponent);

var _a, _b;
//# sourceMappingURL=coding.component.js.map

/***/ }),

/***/ "../../../../../src/app/coding/criteria-descriptions.json.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
    "VariablesPresent": "Are at least two variables present in the hypothesis?",
    "ModifiersPresent": "Is at least one modifier (e.g. 'increases', 'decreases', but NOT 'remains the same') present in the hypothesis?",
    "Syntax": "Is the hypothesis understandable? Minor mistakes and word repetitions can be ignored, as long as the intent of the student is clear.",
    "manipulation": "Does the tested relationship involve a manipulation? (i.e. is the student purposefully manipulating one variable to measure the effect on another?)",
    "CVS": "Does the hypothesis adhere to CVS? (i.e. vary only one variable at a time?)",
    "qualified": "Is the hypothesis fully qualified? (i.e. are the conditions under which the hypothesis is tested made explicit - e.g. in a series/parallel circuit).",
    "understandable": "Is the hypothesis understandable? Minor mistakes and word repetitions can be ignored, as long as the intent of the student is clear.",
    "on-topic": "Is the hypothesis on topic? (i.e. about the differences between series and parallel circuits?)",
    "testable": "Is the hypothesis testable? (e.g. can the variables involved be manipulated, controlled and measured?)",
    "specific": "Does the hypothesis state a clear and specific test and expected outcome?"
});
//# sourceMappingURL=criteria-descriptions.json.js.map

/***/ }),

/***/ "../../../../../src/app/coding/criterium.class.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Criterium; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__criteria_descriptions_json__ = __webpack_require__("../../../../../src/app/coding/criteria-descriptions.json.ts");

var Criterium = (function () {
    function Criterium(test, key, dependents, descriptiveLabel) {
        this.key = key;
        this.dependents = dependents;
        this.descriptiveLabel = descriptiveLabel;
        this.newLine = false;
        this.success = true;
        this.test = test;
        this._description = __WEBPACK_IMPORTED_MODULE_0__criteria_descriptions_json__["a" /* default */][test] || test;
        console.log(__WEBPACK_IMPORTED_MODULE_0__criteria_descriptions_json__["a" /* default */], test, this.description);
    }
    Criterium.prototype.toggle = function (success) {
        if (typeof success !== "undefined")
            this.success = success;
        else
            this.success = !this.success;
        if (!this.success && this.dependents)
            for (var _i = 0, _a = this.dependents; _i < _a.length; _i++) {
                var dependent = _a[_i];
                dependent.toggle(false);
            }
    };
    Object.defineProperty(Criterium.prototype, "label", {
        get: function () {
            return this.descriptiveLabel || this.test;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Criterium.prototype, "description", {
        get: function () {
            return this._description;
        },
        enumerable: true,
        configurable: true
    });
    return Criterium;
}());

//# sourceMappingURL=criterium.class.js.map

/***/ }),

/***/ "../../../../../src/app/hypotheses.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HypothesesService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__ = __webpack_require__("../../../../rxjs/add/operator/toPromise.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var HypothesesService = (function () {
    function HypothesesService(http) {
        this.http = http;
        this.apiPath = "api";
    }
    HypothesesService.prototype.getHypothesis = function (coder) {
        return this.http
            .get("api/hypothesis/" + coder)
            .toPromise()
            .then(function (response) {
            console.log("response received", response.json());
            return response.json().data;
        }).catch(this.handleError);
    };
    HypothesesService.prototype.update = function (hypothesis, criteria, coder) {
        var code = {
            coder: coder,
            results: criteria
        };
        return this.http
            .post("api/code", { hypothesis: hypothesis, code: code })
            .toPromise()
            .then(function (response) {
            console.log("update response received", response.json());
            return response.json().status;
        });
    };
    HypothesesService.prototype.getCodingStatus = function () {
        return this.http
            .get("api/status")
            .toPromise()
            .then(function (response) {
            console.log("status received", response.json());
            return response.json();
        }).catch(this.handleError);
    };
    HypothesesService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    return HypothesesService;
}());
HypothesesService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]) === "function" && _a || Object])
], HypothesesService);

var _a;
//# sourceMappingURL=hypotheses.service.js.map

/***/ }),

/***/ "../../../../../src/app/status/status.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".check-in-input {\r\n    max-width: 300px;\r\n}\r\n\r\n.margin-top-20px {\r\n    margin-top: 20px;\r\n}\r\n\r\n.status .progress {\r\n    display: -webkit-inline-box;\r\n    display: -ms-inline-flexbox;\r\n    display: inline-flex;\r\n    width: calc(100% - 20px);\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/status/status.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"status card\">\n    <div *ngIf=\"status && checkedIn\">\n        <i class=\"fa fa-user\" title=\"Checked in as {{coder}}\"></i>\n        <div class=\"progress\" title={{summary}}>\n            <div class=\"progress-bar bg-primary\" [ngStyle]=\"widthMultiple\"></div>\n            <div class=\"progress-bar bg-success\" [ngStyle]=\"widthOne\"></div>\n        </div>\n    </div>\n    <div *ngIf=\"!checkedIn\" class=\"margin-top-20px\">\n        <form action=\"\">\n            <label class=\"sr-only\" for=\"coder\">Check in as:</label>  \n            <div class=\"input-group float-left check-in-input\">\n                <span class=\"input-group-addon\"><i class=\"fa fa-user fa-fw\"></i></span>\n                <input type=\"text\" \n                    class=\"form-control\" \n                    id=\"coder\" \n                    name=\"coder\" \n                    placeholder=\"Name\" \n                    [(ngModel)]=\"coder\">\n            </div>\n            <input type=\"submit\" \n                    class=\"btn btn-primary float-right col-md-2\"\n                    (submit)=\"checkIn()\"\n                    (click)=\"checkIn()\" value=\"Check in\" />\n        </form>\n    </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/status/status.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StatusComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__hypotheses_service__ = __webpack_require__("../../../../../src/app/hypotheses.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var StatusComponent = (function () {
    function StatusComponent(hypothesesService) {
        this.hypothesesService = hypothesesService;
        this.checkedIn = false;
    }
    Object.defineProperty(StatusComponent.prototype, "summary", {
        get: function () {
            return (this.status.one + this.status.multiple) + "/" + this.status.total + " (" + this.percent(this.status.total, this.status.one + this.status.multiple) + ") completed.";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StatusComponent.prototype, "percentMultiple", {
        get: function () {
            return this.percent(this.status.total, this.status.multiple);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StatusComponent.prototype, "percentOne", {
        get: function () {
            return this.percent(this.status.total, this.status.one);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StatusComponent.prototype, "widthMultiple", {
        get: function () {
            return {
                width: this.percentMultiple
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StatusComponent.prototype, "widthOne", {
        get: function () {
            return {
                width: this.percentOne
            };
        },
        enumerable: true,
        configurable: true
    });
    StatusComponent.prototype.percent = function (total, part) {
        return Math.round(part / total * 1000) / 10 + "%";
    };
    StatusComponent.prototype.ngOnInit = function () {
        this.update();
    };
    StatusComponent.prototype.update = function () {
        var _this = this;
        this.hypothesesService.getCodingStatus()
            .then(function (res) { return _this.status = res; });
    };
    StatusComponent.prototype.checkIn = function () {
        console.log("Checking in " + this.coder);
        if (this.coder && this.coder !== "") {
            this.checkedIn = true;
        }
        else {
            alert("\"" + this.coder + "\" is not a valid name");
        }
    };
    return StatusComponent;
}());
StatusComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'app-status',
        template: __webpack_require__("../../../../../src/app/status/status.component.html"),
        styles: [__webpack_require__("../../../../../src/app/status/status.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__hypotheses_service__["a" /* HypothesesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__hypotheses_service__["a" /* HypothesesService */]) === "function" && _a || Object])
], StatusComponent);

var _a;
//# sourceMappingURL=status.component.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_20" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map