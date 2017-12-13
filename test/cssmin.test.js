let SweetData = require('../lib');
let should = require('should');

describe('cssmin', () => {

  it('should exist', () => {
    should.exist(SweetData.cssmin);
  });

  it('should format minify css', () => {
    const expected = `.foobar {color: red;}`;

    const text = '.foobar    {    color:    red; }';

    const actual = SweetData.cssmin(text);

    actual.should.equal(expected);
  });

  it('should remove comments by default', () => {
    const expected = `.foobar {color: red;}`;

    const text = '/* comment */.foobar    {    color:    red; }';

    const actual = SweetData.cssmin(text);

    actual.should.equal(expected);
  });

  it('should preserve comments when preserveComments flag set to true', () => {
    const expected = `/*comment */.foobar {color: red;}`;

    const options = { preserveComments: true };
    const text = '/* comment */.foobar    {    color:    red; }';

    const actual = SweetData.cssmin(text, options);

    actual.should.equal(expected);
  });
});
