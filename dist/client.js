'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = OpenSearch;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _dbcNodeBasesoapClient = require('dbc-node-basesoap-client');

var BaseSoapClient = _interopRequireWildcard(_dbcNodeBasesoapClient);

/**
 * Constructs the object of parameters for search result request.
 *
 * @param {Object} value Object with parameters for getting a search result
 * @return {Promise}
 */
function getSearchResult(client, values) {
  var params = {
    query: values.query,
    stepValue: values.stepValue,
    start: values.start,
    sort: values.sort,
    objectFormat: 'briefDisplay',
    facets: values.facets || {}
  };

  return client.request('search', params, null, true);
}

/**
 * Constructs the object of parameters for work request.
 *
 * @param {Object} value Object with parameters for getting a work
 * @return {Promise}
 */
function getWorkResult(client, values) {
  var params = {
    query: values.query,
    start: 1,
    stepValue: 1,
    allObjects: true,
    objectFormat: ['dkabm', 'briefDisplay'],
    relationData: 'full'
  };

  return client.request('search', params, null, true);
}

/**
 * Setting the necessary paramerters for the client to be usable.
 * The wsdl is only set if wsdl is null to allow setting it through
 * environment variables.
 *
 * @param {Object} config Config object with the necessary parameters to use
 * the webservice
 */

function OpenSearch(config) {

  if (typeof config !== 'object') {
    throw new Error('A config object should be provided');
  }

  if (!config.wsdl) {
    throw new Error('A wsdl should be provided with the given config object');
  }

  if (!config.agency) {
    throw new Error('An agency should be provided with the given config object');
  }

  if (!config.profile) {
    throw new Error('An profile should be provided with the given config object');
  }

  var defaults = {
    agency: config.agency,
    profile: config.profile
  };

  var logger = config.logger || null;

  var opensearchClient = BaseSoapClient.client(config.wsdl, defaults, logger);

  return {
    getSearchResult: getSearchResult.bind(null, opensearchClient),
    getWorkResult: getWorkResult.bind(null, opensearchClient)
  };
}

module.exports = exports['default'];