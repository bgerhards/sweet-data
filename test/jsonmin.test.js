let SweetData = require('../lib/sweet-data').SweetData;
let should = require('should');

describe('jsonmin', () => {

    it('should exist', () => {
        should.exist(SweetData.jsonmin);
    });

    it('should return a promise', () => {
        const json = '{ "foo": "bar" }';
        
        should(SweetData.jsonmin(json)).be.a.Promise();
    });

    it('should fulfill the promise on valid json input', () => {
        const json = '{ "foo": "bar" }';

        should(SweetData.jsonmin(json)).be.fulfilled();
    });

    it('should fulfill with a string on valid json input', () => {
        const json = '{"menu":{"id": "file","value": \n[[1,2,3],[4,5,6] ],\n"popup":{"menuitem":[{"value":    ["one","two"],\n"onclick":"CreateNewDoc()"},{"value":"Close","onclick":"CloseDoc()"}]}}}';

        const expected = '{"menu":{"id":"file","value":[[1,2,3],[4,5,6]],"popup":{"menuitem":[{"value":["one","two"],"onclick":"CreateNewDoc()"},{"value":"Close","onclick":"CloseDoc()"}]}}}';

        should(SweetData.jsonmin(json)).be.fulfilledWith(expected);
    });
})