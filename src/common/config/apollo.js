import ApolloClient, { createBatchingNetworkInterface } from 'apollo-client';
import settings from '../settings';

const { graphQLEndpoint } = settings;

const batchingNetworkInterface = createBatchingNetworkInterface({
  uri: graphQLEndpoint,
  batchInterval: 10,
});

/* eslint-disable no-param-reassign */
batchingNetworkInterface.use([{
  async applyBatchMiddleware(req, next) {
    const token = localStorage.getItem('token');

    if (!req.options.headers) {
      req.options.headers = {};
    }

    if (token !== null) {
      req.options.headers.authorization = token;
    }

    return next();
  },
}]);
/* eslint-enable */

const client = new ApolloClient({
  dataIdFromObject: o => o.id,
  networkInterface: batchingNetworkInterface,
  queryDeduplication: true,
});

export default client;