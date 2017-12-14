"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("../common");
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
//# sourceMappingURL=index.js.map