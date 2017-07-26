let SweetData = require('../lib/sweet-data').SweetData;
let should = require('should');

describe('json', () => {

    it('should exist', () => {
        should.exist(SweetData.json);
    });

    it('should return a promise', () => {
        const json = { "foo": "bar" };
        
        should(SweetData.json(json)).be.a.Promise();
    });

    it('should fulfill the promise on valid json input', () => {
        const json = { "foo": "bar" };

        should(SweetData.json(json)).be.fulfilled();
    });

    it('should fulfill with a string on valid json input', () => {
        const json = { "foo": "bar" };

        const expected = '{\n  "foo": "bar"\n}';

        should(SweetData.json(json)).be.fulfilledWith(expected);
    });

    it('should reject the promise on invalid json input', () => {
        const invalidJson = '!@#$%^&*';

        should(SweetData.json(invalidJson)).be.rejected();
    });

    it('should reject the promise on invalid json input with TypeError', () => {
        const invalidJson = 123;

        const typeError = new TypeError('Input must of type "object" or "string"');

        should(SweetData.json(invalidJson)).be.rejectedWith(typeError);
    });
});