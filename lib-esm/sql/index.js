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
import { getShift } from '../common';
export var sql = function (text, _a) {
    if (_a === void 0) { _a = {}; }
    var _b = _a.step, step = _b === void 0 ? ' ' : _b, rest = __rest(_a, ["step"]);
    console.log(step);
    var shift = getShift(__assign({}, rest));
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
export var sqlmin = function (text) {
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
//# sourceMappingURL=index.js.map