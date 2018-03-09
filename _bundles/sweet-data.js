(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("SweetData", [], factory);
	else if(typeof exports === 'object')
		exports["SweetData"] = factory();
	else
		root["SweetData"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.getShift = function (_a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.steps, steps = _c === void 0 ? 2 : _c, _d = _b.stepChar, stepChar = _d === void 0 ? '' : _d;
    var step;
    var shift = ['\n']; // array of shifts
    switch (stepChar) {
        case 'SPACE':
            stepChar = ' ';
            break;
        case 'TAB':
            stepChar = '	';
            break;
        default:
            stepChar = stepChar.length > 0 ? stepChar : ' ';
    }
    if (isNaN(parseInt(steps))) {
        step = stepChar;
    }
    else {
        step = '';
        for (var i = 0; i < steps; i++) {
            step += stepChar;
        }
    }
    var maxdeep = 100, // nesting level
    ix = 0;
    // initialize array with shifts //
    for (ix = 0; ix < maxdeep; ix++) {
        shift.push(shift[ix] + step);
    }
    return shift;
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// CSS
var css_1 = __webpack_require__(3);
exports.css = css_1.css;
exports.cssmin = css_1.cssmin;
// JSON
var json_1 = __webpack_require__(4);
exports.json = json_1.json;
exports.jsonmin = json_1.jsonmin;
// SQL
var sql_1 = __webpack_require__(5);
exports.sql = sql_1.sql;
exports.sqlmin = sql_1.sqlmin;
// XML
var xml_1 = __webpack_require__(6);
exports.xml = xml_1.xml;
exports.xmlmin = xml_1.xmlmin;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = __webpack_require__(0);
exports.css = function (text, options) {
    var shift = common_1.getShift(options);
    var ar = text.replace(/\s{1,}/g, ' ')
        .replace(/\{/g, "{~::~")
        .replace(/\}/g, "~::~}~::~")
        .replace(/\;/g, ";~::~")
        .replace(/\/\*/g, "~::~/*")
        .replace(/\*\//g, "*/~::~")
        .replace(/~::~\s{0,}~::~/g, "~::~")
        .split('~::~'), len = ar.length, deep = 0, str = '', ix = 0;
    for (ix = 0; ix < len; ix++) {
        if (/\{/.exec(ar[ix])) {
            str += shift[deep++] + ar[ix];
        }
        else if (/\}/.exec(ar[ix])) {
            str += shift[--deep] + ar[ix];
        }
        else if (/\*\\/.exec(ar[ix])) {
            str += shift[deep] + ar[ix];
        }
        else {
            str += shift[deep] + ar[ix];
        }
    }
    return str.replace(/^\n{1,}/, '');
};
exports.cssmin = function (text, _a) {
    var _b = (_a === void 0 ? {} : _a).preserveComments, preserveComments = _b === void 0 ? false : _b;
    var str = preserveComments ? text
        : text.replace(/\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+\//g, "");
    return str.replace(/\s{1,}/g, ' ')
        .replace(/\{\s{1,}/g, "{")
        .replace(/\}\s{1,}/g, "}")
        .replace(/\;\s{1,}/g, ";")
        .replace(/\/\*\s{1,}/g, "/*")
        .replace(/\*\/\s{1,}/g, "*/");
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.json = function (text, _a) {
    var _b = (_a === void 0 ? {} : _a).step, step = _b === void 0 ? ' ' : _b;
    return new Promise(function (resolve, reject) {
        try {
            if (typeof text === "string") {
                return resolve(JSON.stringify(JSON.parse(text), null, step));
            }
            if (typeof text === "object") {
                return resolve(JSON.stringify(text, null, step));
            }
            throw new TypeError('Input must of type "object" or "string"');
        }
        catch (e) {
            reject(e);
        }
    });
};
exports.jsonmin = function (text) {
    return new Promise(function (resolve, reject) {
        try {
            if (typeof text === "string") {
                var result = JSON.stringify(JSON.parse(text))
                    .replace(/\s{0,}\{\s{0,}/g, "{")
                    .replace(/\s{0,}\[$/g, "[")
                    .replace(/\[\s{0,}/g, "[")
                    .replace(/:\s{0,}\[/g, ':[')
                    .replace(/\s{0,}\}\s{0,}/g, "}")
                    .replace(/\s{0,}\]\s{0,}/g, "]")
                    .replace(/\"\s{0,}\,/g, '",')
                    .replace(/\,\s{0,}\"/g, ',"')
                    .replace(/\"\s{0,}:/g, '":')
                    .replace(/:\s{0,}\"/g, ':"')
                    .replace(/:\s{0,}\[/g, ':[')
                    .replace(/\,\s{0,}\[/g, ',[')
                    .replace(/\,\s{2,}/g, ', ')
                    .replace(/\]\s{0,},\s{0,}\[/g, '],[');
                return resolve(result);
            }
            if (typeof text === "object") {
                var result = JSON.stringify(text)
                    .replace(/\s{0,}\{\s{0,}/g, "{")
                    .replace(/\s{0,}\[$/g, "[")
                    .replace(/\[\s{0,}/g, "[")
                    .replace(/:\s{0,}\[/g, ':[')
                    .replace(/\s{0,}\}\s{0,}/g, "}")
                    .replace(/\s{0,}\]\s{0,}/g, "]")
                    .replace(/\"\s{0,}\,/g, '",')
                    .replace(/\,\s{0,}\"/g, ',"')
                    .replace(/\"\s{0,}:/g, '":')
                    .replace(/:\s{0,}\"/g, ':"')
                    .replace(/:\s{0,}\[/g, ':[')
                    .replace(/\,\s{0,}\[/g, ',[')
                    .replace(/\,\s{2,}/g, ', ')
                    .replace(/\]\s{0,},\s{0,}\[/g, '],[');
                return resolve(result);
            }
            throw new TypeError('Input must of type "object" or "string"');
        }
        catch (e) {
            reject(e);
        }
    });
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = __webpack_require__(0);
exports.sql = function (text, _a) {
    if (_a === void 0) { _a = {}; }
    var _b = _a.step, step = _b === void 0 ? ' ' : _b, rest = __rest(_a, ["step"]);
    console.log(step);
    var shift = common_1.getShift(__assign({}, rest));
    var ar_by_quote = text.replace(/\s{1,}/g, " ")
        .replace(/\'/ig, "~::~\'")
        .split('~::~'), len = ar_by_quote.length, ar = [], deep = 0, tab = step, inComment = true, inQuote = false, parenthesisLevel = 0, str = '', ix = 0;
    for (ix = 0; ix < len; ix++) {
        if (ix % 2) {
            ar = ar.concat(ar_by_quote[ix]);
        }
        else {
            ar = ar.concat(split_sql(ar_by_quote[ix], tab));
        }
    }
    len = ar.length;
    for (ix = 0; ix < len; ix++) {
        parenthesisLevel = isSubquery(ar[ix], parenthesisLevel);
        if (/\s{0,}\s{0,}SELECT\s{0,}/.exec(ar[ix])) {
            ar[ix] = ar[ix].replace(/\,/g, ",\n" + tab + tab + "");
        }
        if (/\s{0,}\(\s{0,}SELECT\s{0,}/.exec(ar[ix])) {
            deep++;
            str += shift[deep] + ar[ix];
        }
        else if (/\'/.exec(ar[ix])) {
            if (parenthesisLevel < 1 && deep) {
                deep--;
            }
            str += ar[ix];
        }
        else {
            str += shift[deep] + ar[ix];
            if (parenthesisLevel < 1 && deep) {
                deep--;
            }
        }
    }
    str = str.replace(/^\n{1,}/, '').replace(/\n{1,}/g, "\n");
    return str;
};
exports.sqlmin = function (text) {
    return text.replace(/\s{1,}/g, " ").replace(/\s{1,}\(/, "(").replace(/\s{1,}\)/, ")");
};
function isSubquery(str, parenthesisLevel) {
    return parenthesisLevel - (str.replace(/\(/g, '').length - str.replace(/\)/g, '').length);
}
function split_sql(str, tab) {
    return str.replace(/\s{1,}/g, " ")
        .replace(/ AND /ig, "~::~" + tab + tab + "AND ")
        .replace(/ BETWEEN /ig, "~::~" + tab + "BETWEEN ")
        .replace(/ CASE /ig, "~::~" + tab + "CASE ")
        .replace(/ ELSE /ig, "~::~" + tab + "ELSE ")
        .replace(/ END /ig, "~::~" + tab + "END ")
        .replace(/ FROM /ig, "~::~FROM ")
        .replace(/ GROUP\s{1,}BY/ig, "~::~GROUP BY ")
        .replace(/ HAVING /ig, "~::~HAVING ")
        .replace(/ IN /ig, " IN ")
        .replace(/ JOIN /ig, "~::~JOIN ")
        .replace(/ CROSS~::~{1,}JOIN /ig, "~::~CROSS JOIN ")
        .replace(/ INNER~::~{1,}JOIN /ig, "~::~INNER JOIN ")
        .replace(/ LEFT~::~{1,}JOIN /ig, "~::~LEFT JOIN ")
        .replace(/ RIGHT~::~{1,}JOIN /ig, "~::~RIGHT JOIN ")
        .replace(/ ON /ig, "~::~" + tab + "ON ")
        .replace(/ OR /ig, "~::~" + tab + tab + "OR ")
        .replace(/ ORDER\s{1,}BY/ig, "~::~ORDER BY ")
        .replace(/ OVER /ig, "~::~" + tab + "OVER ")
        .replace(/\(\s{0,}SELECT /ig, "~::~(SELECT ")
        .replace(/\)\s{0,}SELECT /ig, ")~::~SELECT ")
        .replace(/ THEN /ig, " THEN~::~" + tab + "")
        .replace(/ UNION /ig, "~::~UNION~::~")
        .replace(/ USING /ig, "~::~USING ")
        .replace(/ WHEN /ig, "~::~" + tab + "WHEN ")
        .replace(/ WHERE /ig, "~::~WHERE ")
        .replace(/ WITH /ig, "~::~WITH ")
        .replace(/ ALL /ig, " ALL ")
        .replace(/ AS /ig, " AS ")
        .replace(/ ASC /ig, " ASC ")
        .replace(/ DESC /ig, " DESC ")
        .replace(/ DISTINCT /ig, " DISTINCT ")
        .replace(/ EXISTS /ig, " EXISTS ")
        .replace(/ NOT /ig, " NOT ")
        .replace(/ NULL /ig, " NULL ")
        .replace(/ LIKE /ig, " LIKE ")
        .replace(/\s{0,}SELECT /ig, "SELECT ")
        .replace(/~::~{1,}/g, "~::~")
        .split('~::~');
}


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = __webpack_require__(0);
exports.xml = function (text, options) {
    return new Promise(function (resolve, reject) {
        var shift = common_1.getShift(options);
        try {
            var ar = text.replace(/>\s{0,}</g, "><")
                .replace(/</g, "~::~<")
                .replace(/xmlns\:/g, "~::~xmlns:")
                .replace(/xmlns\=/g, "~::~xmlns=")
                .split('~::~'), len = ar.length, inComment = false, deep = 0, str = '', ix = 0;
            for (ix = 0; ix < len; ix++) {
                // start comment or <![CDATA[...]]> or <!DOCTYPE //
                if (ar[ix].search(/<!/) > -1) {
                    str += shift[deep] + ar[ix];
                    inComment = true;
                    // end comment  or <![CDATA[...]]> //
                    if (ar[ix].search(/-->/) > -1 || ar[ix].search(/\]>/) > -1 || ar[ix].search(/!DOCTYPE/) > -1) {
                        inComment = false;
                    }
                }
                else {
                    // end comment  or <![CDATA[...]]> //
                    if (ar[ix].search(/-->/) > -1 || ar[ix].search(/\]>/) > -1) {
                        str += ar[ix];
                        inComment = false;
                    }
                    else {
                        if (/^<\w/.exec(ar[ix - 1]) && /^<\/\w/.exec(ar[ix]) &&
                            /^<[\w:\-\.\,]+/.exec(ar[ix - 1]) == /^<\/[\w:\-\.\,]+/.exec(ar[ix])[0].replace('/', '')) {
                            str += ar[ix];
                            if (!inComment) {
                                deep--;
                            }
                        }
                        else {
                            // <elm> //
                            if (ar[ix].search(/<\w/) > -1 && ar[ix].search(/<\//) === -1 && ar[ix].search(/\/>/) === -1) {
                                str = !inComment ? str += shift[deep++] + ar[ix] : str += ar[ix];
                            }
                            else {
                                // <elm>...</elm> //
                                if (ar[ix].search(/<\w/) > -1 && ar[ix].search(/<\//) > -1) {
                                    str = !inComment ? str += shift[deep] + ar[ix] : str += ar[ix];
                                }
                                else {
                                    // </elm> //
                                    if (ar[ix].search(/<\//) > -1) {
                                        str = !inComment ? str += shift[--deep] + ar[ix] : str += ar[ix];
                                    }
                                    else {
                                        // <elm/> //
                                        if (ar[ix].search(/\/>/) > -1) {
                                            str = !inComment ? str += shift[deep] + ar[ix] : str += ar[ix];
                                        }
                                        else {
                                            // <? xml ... ?> //
                                            if (ar[ix].search(/<\?/) > -1) {
                                                str += shift[deep] + ar[ix];
                                            }
                                            else {
                                                // xmlns //
                                                if (ar[ix].search(/xmlns\:/) > -1 || ar[ix].search(/xmlns\=/) > -1) {
                                                    str += shift[deep] + ar[ix];
                                                }
                                                else {
                                                    str += ar[ix];
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            resolve((str[0] == '\n') ? str.slice(1) : str);
        }
        catch (e) {
            reject(e);
        }
    });
};
exports.xmlmin = function (text, preserveComments) {
    return new Promise(function (resolve, reject) {
        try {
            var str = preserveComments ? text : text.replace(/\<![ \r\n\t]*(--([^\-]|[\r\n]|-[^\-])*--[ \r\n\t]*)\>/g, "");
            resolve(str.replace(/>\s{0,}</g, "><"));
        }
        catch (e) {
            reject(e);
        }
    });
};


/***/ })
/******/ ]);
});
//# sourceMappingURL=sweet-data.js.map