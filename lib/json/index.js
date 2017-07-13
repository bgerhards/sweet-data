function json(text) {

	return new Promise((resolve, reject) => {
        try {
            if ( typeof text === "string" ) {
                return resolve(JSON.stringify(JSON.parse(text), null, this.step));
            }

            if ( typeof text === "object" ) {
                return resolve(JSON.stringify(text, null, this.step));
            }
        
            return resolve(null);
        }
        catch(e) {
            return reject(e);
        }
    });
}

function jsonmin(text) {
								  
    return  text.replace(/\s{0,}\{\s{0,}/g,"{")
                .replace(/\s{0,}\[$/g,"[")
                .replace(/\[\s{0,}/g,"[")
                .replace(/:\s{0,}\[/g,':[')
                .replace(/\s{0,}\}\s{0,}/g,"}")
                .replace(/\s{0,}\]\s{0,}/g,"]")
                .replace(/\"\s{0,}\,/g,'",')
                .replace(/\,\s{0,}\"/g,',"')
                .replace(/\"\s{0,}:/g,'":')
                .replace(/:\s{0,}\"/g,':"')
                .replace(/:\s{0,}\[/g,':[')
                .replace(/\,\s{0,}\[/g,',[')
                .replace(/\,\s{2,}/g,', ')
                .replace(/\]\s{0,},\s{0,}\[/g,'],[');   
}

exports.json = json;
exports.jsonmin = jsonmin;