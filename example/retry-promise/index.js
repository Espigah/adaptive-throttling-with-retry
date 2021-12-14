const { AdaptiveThrottlingWithRetry } = require('../../dist/index');
const { retry } = require('ts-retry-promise');

const { getUser } = require('../shared');

const adaptiveThrottling = AdaptiveThrottlingWithRetry({
  retryPlugin: (requestFn, options) => {
    return retry(requestFn, options);
  },
});

setTimeout(() => {
  getUser(adaptiveThrottling);
}, 200);
