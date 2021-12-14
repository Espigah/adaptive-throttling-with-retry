const { AdaptiveThrottlingWithRetry } = require('../../dist/index');
const { getUser } = require('../shared');

const adaptiveThrottling = AdaptiveThrottlingWithRetry();

setTimeout(() => {
  getUser(adaptiveThrottling);
}, 200);
