let should = require('should');
let SweetData = require('../lib');

describe('css', () => {

  it('should exist', () => {
    should.exist(SweetData.css);
  });

  it('should format css', () => {
    const expected = `.foobar {\n   color: red;\n}\n`;

    const text = '.foobar    {    color:    red; }';

    const actual = SweetData.css(text);

    actual.should.equal(expected);
  });
});
