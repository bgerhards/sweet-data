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
//# sourceMappingURL=index.js.map