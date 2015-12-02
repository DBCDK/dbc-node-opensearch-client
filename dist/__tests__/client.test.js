'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _chai = require('chai');

var _clientJs = require('../client.js');

var _clientJs2 = _interopRequireDefault(_clientJs);

describe('Test Open Search Facet Display', function () {

  it('Assert facet display', function (done) {

    done(); // remove for testing against webservice

    this.timeout(15000);
    setTimeout(done, 15000);
    var config = {
      wsdl: 'http://ml-p01.dbc.dk/opensearch/tags/4.1.1/?wsdl',
      agency: '150013',
      profile: 'opac'
    };

    var openSearch = (0, _clientJs2['default'])(config);
    var result = openSearch.getFacetResult({
      query: '"harry potter"',
      facets: [{ numberOfTerms: 5, facetName: ['facet.creator', 'facet.type'] }]
    });

    result.then(function (searchResult) {
      _chai.assert.equal(searchResult.result.collectionCount, '0', 'collectionCount is 0');
      _chai.assert.equal(searchResult.result.more, 'true', 'there is more');
      _chai.assert.equal(searchResult.result.facetResult.facet[0].facetName, 'facet.creator', 'facet.creator is in result');
      done();
    })['catch'](function (err) {
      return done(err);
    });
  });
});

describe('Test Open Search List Display', function () {

  it('Assert list display', function (done) {

    done(); // remove for testing against webservice

    this.timeout(15000);
    setTimeout(done, 15000);
    var config = {
      wsdl: 'http://ml-p01.dbc.dk/opensearch/tags/4.1.1/?wsdl',
      agency: '150013',
      profile: 'opac'
    };

    var openSearch = (0, _clientJs2['default'])(config);
    var result = openSearch.getSearchResult({
      query: '"harry potter"',
      start: '1',
      stepValue: '10',
      sort: 'rank_frequency'
    });

    result.then(function (searchResult) {
      _chai.assert.equal(searchResult.result.collectionCount, '10', 'collectionCount is 10');
      _chai.assert.equal(searchResult.result.sortUsed, 'rank_main_title', 'sort used is rank_main_title');
      _chai.assert.equal(searchResult.result.more, 'true', 'there is more');
      done();
    })['catch'](function (err) {
      return done(err);
    });
  });
});

describe('Test Open Search Work Display', function () {
  it('Assert work display', function (done) {

    done(); // remove for testing against webservice

    this.timeout(10000);
    setTimeout(done, 10000);
    var config = {
      wsdl: 'http://ml-p01.dbc.dk/opensearch/tags/4.1.1/?wsdl',
      agency: '150013',
      profile: 'opac'
    };

    var openSearch = (0, _clientJs2['default'])(config);
    var result = openSearch.getWorkResult({
      query: 'rec.id=870970-basis:25245784',
      sort: 'date_descending'
    });

    result.then(function (searchResult) {
      _chai.assert.equal(searchResult.result.collectionCount, '1', 'collectionCount is 1');
      _chai.assert.equal(searchResult.result.more, 'false', 'there is not more');
      _chai.assert.isAbove(searchResult.result.searchResult.collection.numberOfObjects, 3, 'work contains more than 3 manifestations');
      done();
    })['catch'](function (err) {
      return done(err);
    });
  });
});