# sweet-data - Nodejs plugin
** Fork of pretty-data **

nodejs plugin to **pretty-print** or **minify**
text in **XML**, **JSON**, **CSS**  and  **SQL** formats.

**License:** Dual licensed under
the MIT and GPL licenses:

[http://www.opensource.org/licenses/mit-license.php](http://www.opensource.org/licenses/mit-license.php)

[http://www.gnu.org/licenses/gpl.html](http://www.gnu.org/licenses/gpl.html)

## Description

* `sd.xml(data)` - pretty print XML; 

* `sd.json(data)` - pretty print JSON; 

* `sd.css(data)` - pretty print CSS; 

* `sd.sql(data)` - pretty print SQL; 

* `sd.xmlmin(data [, preserveComments]) ` - minify XML; 

* `sd.jsonmin(data)` - minify JSON text;

* `sd.cssmin(data [, preserveComments] )` - minify CSS text; 

* `sd.sqlmin(data)` - minify SQL text;

* `sd.setStep([indentationCount, indentationChar])` - update indentation character(s) and character count (per depth). `SPACE` or `TAB` will use respective characters. Any other character provided will be assumed as ' '. Default values are `SPACE` and 2


**PARAMETERS:**

`@data` - String; XML, JSON, CSS or SQL text to beautify; 

`@preserveComments` - Bool (optional, used in npp.minxml and npp.mincss only); 
                       Set this flag to true to prevent removing comments from @data; 

`@Return` - String | Promise(String);

`@indentationCount` - Numeric (optional, used to set number of indentation (per level))

`@indentationChar` - String (optional, indentation character. `SPACE` or `TAB`* will use 
                             respective characters, other values will assume a single space (` `))

                     *`TAB` may not be visible in your editor within the web browser.

## USAGE

[JSON](#json)

[JSON Minification](#json-minification)

[XML](#xml)

[XML Minification](#xml-minification)

`var sd = require('sweet-data'); `

`var xml_pp = sd.xml(data); `

`var xml_min = sd.xmlmin(data [,true]);`

`var css_pp = sd.css(data); `

`var css_min = sd.cssmin(data [, true]);`

`var sql_pp = sd.sql(data);` 

`var sql_min = sd.sqlmin(data);`


### JSON

#### json(json: string | object)

Returns a promise which is resolved asynchronously when the json input (string or object) is parsed and beautified. The promise resolves a string accessed via `.then()`. Errors can be caught/handled via `.catch()`.

**ES6**

```
import { SweetData as sd } from 'sweet-data';

const json = { "foo": "bar" };

sd.json(json)
  .then(beautifiedJSON => console.log(beautifiedJSON))
  .catch(error => console.log(error));
```

**CommonJS**

```
const sd = require('sweet-data');

const json = { "foo": "bar" };

sd.json(json)
  .then(beautifiedJSON => console.log(beautifiedJSON))
  .catch(error => console.log(error));
```

### JSON Minification

#### jsonmin(json: string | object)

Returns a promise which is resolved asynchronously when the json input (string or object) is parsed and minified. The promise resolves a string accessed via `.then()`. Errors can be caught/handled via `.catch()`.

**ES6**

```
import { SweetData as sd } from 'sweet-data';

const json = { "foo": "bar" };

sd.jsonmin(json)
  .then(minifiedJSON => console.log(minifiedJSON))
  .catch(error => console.log(error));
```

**CommonJS**

```
const sd = require('sweet-data');

const json = { "foo": "bar" };

sd.jsonmin(json)
  .then(minifiedJSON => console.log(minifiedJSON))
  .catch(error => console.log(error));
```

### XML

#### xml(xml: string)

Returns a promise which is resolved asynchronously when the xml string input is beautified. The promise resolves a string accessed via `.then()`. Errors can be caught/handled via `.catch()`.

**ES6**

```
import { SweetData as sd } from 'sweet-data';

const xml = '<?xml version="1.0" encoding="UTF-8" ?>      <!DOCTYPE foo SYSTEM "Foo.dtd"><a>          <b>bbb</b>   <!-- comment --><c/><d><soapenv:Envelope xmlns:soapenv="http://xxx" xmlns:xsd="http://yyy" xmlns:xsi="http://zzz"></soapenv>       </d><e>        <![CDATA[ <z></z> ]]></e><f><g></g></f></a>';

sd.xml(xml)
  .then(beautifiedXML => console.log(beautifiedXML))
  .catch(error => console.log(error));
```

**CommonJS**

```
const sd = require('sweet-data');

const xml = '<?xml version="1.0" encoding="UTF-8" ?>      <!DOCTYPE foo SYSTEM "Foo.dtd"><a>          <b>bbb</b>   <!-- comment --><c/><d><soapenv:Envelope xmlns:soapenv="http://xxx" xmlns:xsd="http://yyy" xmlns:xsi="http://zzz"></soapenv>       </d><e>        <![CDATA[ <z></z> ]]></e><f><g></g></f></a>';

sd.xml(xml)
  .then(beautifiedXML => console.log(beautifiedXML))
  .catch(error => console.log(error));
```


### XML Minification

#### xmlmin(xml: string)

Returns a promise which is resolved asynchronously when the xml string input is minified. The promise resolves a string accessed via `.then()`. Errors can be caught/handled via `.catch()`.

**ES6**

```
import { SweetData as sd } from 'sweet-data';

const xml = '<?xml version="1.0" encoding="UTF-8" ?>      <!DOCTYPE foo SYSTEM "Foo.dtd"><a>          <b>bbb</b>   <!-- comment --><c/><d><soapenv:Envelope xmlns:soapenv="http://xxx" xmlns:xsd="http://yyy" xmlns:xsi="http://zzz"></soapenv>       </d><e>        <![CDATA[ <z></z> ]]></e><f><g></g></f></a>';

sd.xmlmin(xml)
  .then(minifiedXML => console.log(minifiedXML))
  .catch(error => console.log(error));
```

**CommonJS**

```
const sd = require('sweet-data');

const xml = '<?xml version="1.0" encoding="UTF-8" ?>      <!DOCTYPE foo SYSTEM "Foo.dtd"><a>          <b>bbb</b>   <!-- comment --><c/><d><soapenv:Envelope xmlns:soapenv="http://xxx" xmlns:xsd="http://yyy" xmlns:xsi="http://zzz"></soapenv>       </d><e>        <![CDATA[ <z></z> ]]></e><f><g></g></f></a>';

sd.xmlmin(xml)
  .then(minifiedXML => console.log(minifiedXML))
  .catch(error => console.log(error));
```

### Tests

Install dependencies using `npm install`

Run tests

```
npm test
```

Watch tests

```
npm run test-watch
```
