let SweetData = require('../lib');
let should = require('should');

describe('xml', () => {

  it('should exist', () => {
    should.exist(SweetData.xml);
  });

  it('should return a promise', () => {
    const xml = '<?xml version="1.0" encoding="UTF-8" ?>      <!DOCTYPE foo SYSTEM "Foo.dtd"><a>          <b>bbb</b>   <!-- comment --><c/><d><soapenv:Envelope xmlns:soapenv="http://xxx" xmlns:xsd="http://yyy" xmlns:xsi="http://zzz"></soapenv>       </d><e>        <![CDATA[ <z></z> ]]></e><f><g></g></f></a>';

    should(SweetData.xml(xml)).be.a.Promise();
  });

  it('should fulfill the promise on valid xml input', () => {
    const xml = '<?xml version="1.0" encoding="UTF-8" ?>      <!DOCTYPE foo SYSTEM "Foo.dtd"><a>          <b>bbb</b>   <!-- comment --><c/><d><soapenv:Envelope xmlns:soapenv="http://xxx" xmlns:xsd="http://yyy" xmlns:xsi="http://zzz"></soapenv>       </d><e>        <![CDATA[ <z></z> ]]></e><f><g></g></f></a>';

    should(SweetData.xml(xml)).be.fulfilled();
  });

  it('should reject the promise on invalid xml input with TypeError', () => {
    const invalidxml = 123;

    const typeError = new TypeError('Input must of type "object" or "string"');

    should(SweetData.xml(invalidxml)).be.rejectedWith(typeError);
  });
});
