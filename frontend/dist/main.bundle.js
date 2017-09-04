webpackJsonp([1,4],{

/***/ 174:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(257);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__ = __webpack_require__(467);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HypothesesService; });
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
    HypothesesService.prototype.getHypothesis = function () {
        return this.http
            .get("api/hypothesis")
            .toPromise()
            .then(function (response) {
            console.log("response received", response.json());
            return response.json().data;
        }).catch(this.handleError);
    };
    HypothesesService.prototype.update = function (hypothesis, criteria, coder) {
        return this.http
            .post("api/code", { hypothesis: hypothesis, criteria: criteria, coder: coder })
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
    HypothesesService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === 'function' && _a) || Object])
    ], HypothesesService);
    return HypothesesService;
    var _a;
}());
//# sourceMappingURL=hypotheses.service.js.map

/***/ }),

/***/ 275:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__hypotheses_service__ = __webpack_require__(174);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StatusComponent; });
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
        return Math.round(part / total * 100) + "%";
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
    StatusComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["U" /* Component */])({
            selector: 'app-status',
            template: __webpack_require__(465),
            styles: [__webpack_require__(461)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__hypotheses_service__["a" /* HypothesesService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__hypotheses_service__["a" /* HypothesesService */]) === 'function' && _a) || Object])
    ], StatusComponent);
    return StatusComponent;
    var _a;
}());
//# sourceMappingURL=status.component.js.map

/***/ }),

/***/ 293:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 293;


/***/ }),

/***/ 294:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(381);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(402);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(405);




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 401:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["U" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__(463),
            styles: [__webpack_require__(459)]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 402:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(372);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(257);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(401);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__coding_coding_component__ = __webpack_require__(403);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__hypotheses_service__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__status_status_component__ = __webpack_require__(275);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_5__coding_coding_component__["a" /* CodingComponent */],
                __WEBPACK_IMPORTED_MODULE_7__status_status_component__["a" /* StatusComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */]
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_6__hypotheses_service__["a" /* HypothesesService */]],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 403:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__hypotheses_service__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__defs_hypotheses__ = __webpack_require__(404);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__status_status_component__ = __webpack_require__(275);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CodingComponent; });
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
    CodingComponent.prototype.toggle = function (criterium) {
        criterium.result = !criterium.result;
    };
    CodingComponent.prototype.keyboardInput = function (event) {
        // if enter, call saveAndContinue
        if (event.key == "Enter")
            return this.saveAndContinue();
        // otherwise, loop over our criteria to see if the key matches any criterium.
        for (var _i = 0, _a = this.criteria; _i < _a.length; _i++) {
            var criterium = _a[_i];
            if (event.key === criterium.key)
                return this.toggle(criterium);
        }
        // well, that was about it...
        console.log("No binding for KeyoardEvent;", event);
    };
    CodingComponent.prototype.saveAndContinue = function () {
        var _this = this;
        this.savePending = true;
        this.hypothesesService.update(this.hypothesis, this.criteria, this.status.coder)
            .then(function (res) {
            if (res) {
                _this.getNextHypothesis(); // getNext succeeding also clears savePending
            }
            else {
                console.log("Something went wrong while saving");
            }
        }).catch(function (err) {
            console.log("Something went wrong while saving;", err.message);
        });
    };
    CodingComponent.prototype.ngOnInit = function () {
        this.getNextHypothesis();
    };
    CodingComponent.prototype.getNextHypothesis = function () {
        var _this = this;
        this.hypothesesService.getHypothesis().then(function (res) {
            _this.hypothesis = res;
            setTimeout(function () { _this.savePending = false; }, 500);
        });
        this.criteria = [
            new __WEBPACK_IMPORTED_MODULE_2__defs_hypotheses__["a" /* Criterium */]("Variables", "q"),
            new __WEBPACK_IMPORTED_MODULE_2__defs_hypotheses__["a" /* Criterium */]("Modifier", "w"),
            new __WEBPACK_IMPORTED_MODULE_2__defs_hypotheses__["a" /* Criterium */]("Syntax", "e")
        ];
        this.status.update();
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Input */])(), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__status_status_component__["a" /* StatusComponent */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__status_status_component__["a" /* StatusComponent */]) === 'function' && _a) || Object)
    ], CodingComponent.prototype, "status", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* HostListener */])('window:keydown', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], CodingComponent.prototype, "keyboardInput", null);
    CodingComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["U" /* Component */])({
            selector: 'app-coding',
            template: __webpack_require__(464),
            styles: [__webpack_require__(460)]
        }), 
        __metadata('design:paramtypes', [(typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__hypotheses_service__["a" /* HypothesesService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__hypotheses_service__["a" /* HypothesesService */]) === 'function' && _b) || Object])
    ], CodingComponent);
    return CodingComponent;
    var _a, _b;
}());
//# sourceMappingURL=coding.component.js.map

/***/ }),

/***/ 404:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Hypothesis */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Criterium; });
var Hypothesis = (function () {
    function Hypothesis() {
    }
    return Hypothesis;
}());
var Criterium = (function () {
    function Criterium(test, key) {
        this.test = test;
        this.result = true;
        this.key = key;
    }
    return Criterium;
}());
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
//# sourceMappingURL=hypotheses.js.map

/***/ }),

/***/ 405:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ 459:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(78)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 460:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(78)();
// imports


// module
exports.push([module.i, ".hypothesis-text {\r\n    font-family: \"Roboto Slab\", serif;\r\n    text-align: center;\r\n    font-size: 36px;\r\n}\r\n\r\n@media (max-width: 600px){\r\n    .hypothesis-text {\r\n        font-size: 6vw;\r\n    }\r\n}\r\n\r\n@media (min-width: 600px){\r\n    .hypothesis-text {\r\n        font-size: 4vw;\r\n    }\r\n}\r\n\r\n\r\n.btn.criterium {\r\n    margin: 10px;\r\n    float: left;\r\n}\r\n\r\n.btn.next {\r\n    margin: 10px;\r\n    float: right;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 461:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(78)();
// imports


// module
exports.push([module.i, ".check-in-input {\r\n    max-width: 300px;\r\n}\r\n\r\n.margin-top-20px {\r\n    margin-top: 20px;\r\n}\r\n\r\n.status .progress {\r\n    display: -webkit-inline-box;\r\n    display: -ms-inline-flexbox;\r\n    display: inline-flex;\r\n    width: calc(100% - 20px);\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 463:
/***/ (function(module, exports) {

module.exports = "<div class=\"container margin-top\">\n    <!-- provide a reference of status to coding, the simple (hacky) way -->\n    <app-status #status></app-status>\n    <app-coding *ngIf=\"status.checkedIn\" [status]=\"status\"></app-coding>\n</div>\n"

/***/ }),

/***/ 464:
/***/ (function(module, exports) {

module.exports = "<div class=\"hypothesis card\">\n    <div *ngIf=\"hypothesis\" class=\"hypothesis-text\">\n        {{hypothesis.hypothesis}}\n    </div>\n    <div class=\"\">\n        <button type=\"button\" class=\"btn criterium\"\n            *ngFor=\"let criterium of criteria\" \n            [ngClass]=\"{ 'btn-danger': !criterium.result, 'btn-success': criterium.result }\"\n            (click)=\"toggle(criterium)\"><span *ngIf=\"criterium.key\">{{criterium.key}}: </span>{{criterium.test}}</button>\n        <button type=\"button\" class=\"btn btn-primary next\" \n                (click)=\"saveAndContinue()\"\n                [disabled]=\"savePending\">\n                    <i *ngIf=\"savePending\" class=\"fa fa-spinner fa-pulse fa-fw\"></i>\n                    Save\n                </button>\n    </div>\n</div>"

/***/ }),

/***/ 465:
/***/ (function(module, exports) {

module.exports = "<div class=\"status card\">\n    <div *ngIf=\"status && checkedIn\">\n        <i class=\"fa fa-user\" title=\"Checked in as {{coder}}\"></i>\n        <div class=\"progress\" title={{summary}}>\n            <div class=\"progress-bar bg-primary\" [ngStyle]=\"widthMultiple\"></div>\n            <div class=\"progress-bar bg-success\" [ngStyle]=\"widthOne\"></div>\n        </div>\n    </div>\n    <div *ngIf=\"!checkedIn\" class=\"margin-top-20px\">\n        <label class=\"sr-only\" for=\"coder\">Check in as:</label>  \n        <div class=\"input-group float-left check-in-input\">\n            <span class=\"input-group-addon\"><i class=\"fa fa-user fa-fw\"></i></span>\n            <input type=\"text\" \n                   class=\"form-control\" \n                   id=\"coder\" \n                   name=\"coder\" \n                   placeholder=\"Name\" \n                   [(ngModel)]=\"coder\">\n        </div>\n        <button type=\"button\" \n                class=\"btn btn-primary float-right col-md-2\"\n                (click)=\"checkIn()\">\n                Check in\n        </button>\n    </div>\n</div>"

/***/ }),

/***/ 478:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(294);


/***/ })

},[478]);
//# sourceMappingURL=main.bundle.js.map