function json(text) {

    return new Promise((resolve, reject) => {
        try {
            if (typeof text === "string") {
                return resolve(JSON.stringify(JSON.parse(text), null, this.step));
            }

            if (typeof text === "object") {
                return resolve(JSON.stringify(text, null, this.step));
            }

            throw new TypeError('Input must of type "object" or "string"');
        } catch (e) {
            return reject(e);
        }
    });
}

function jsonmin(text) {

    return new Promise((resolve, reject) => {
        try {
            return resolve(
                text
                    .toString()
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
                    .replace(/\]\s{0,},\s{0,}\[/g, '],[')
            );
        } catch (e) {
            return reject(e);
        }
    });
}

exports.json = json;
exports.jsonmin = jsonmin;