var Promise = require('promise-polyfill');
var setAsap = require('setasap');
Promise._immediateFn = setAsap;

function json(text) {
  var that = this;

  return new Promise(function(resolve, reject) {
    try {
      if (typeof text === "string") {
        return resolve(JSON.stringify(JSON.parse(text), null, that.step));
      }

      if (typeof text === "object") {
        return resolve(JSON.stringify(text, null, that.step));
      }

      throw new TypeError('Input must of type "object" or "string"');
    } catch (e) {
      reject(e);
    }
  });
}

function jsonmin(text) {

  return new Promise(function(resolve, reject) {
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
    } catch (e) {
      reject(e);
    }
  });
}

exports.json = json;
exports.jsonmin = jsonmin;
