# Adaptive throttling

![npm-version](https://img.shields.io/npm/v/adaptive-throttling-with-retry?style=flat-square) ![bundle-size](https://img.shields.io/bundlephobia/min/adaptive-throttling-with-retry?style=flat-square) ![node-version](https://img.shields.io/node/v/adaptive-throttling-with-retry?style=flat-square) ![downloads](https://img.shields.io/npm/dm/adaptive-throttling-with-retry?style=flat-square)

This library is an extension for ![adaptive-throttling](https://www.npmjs.com/package/adaptive-throttling) library that provides simple retry based on request rejection probability

## Installation

```bash
npm i adaptive-throttling-with-retry -S
```

or

```bash
yarn add adaptive-throttling-with-retry
```

## Usage

### Import

```javascript
import { AdaptiveThrottlingWithRetry } from 'adaptive-throttling-with-retry';
// or
const { AdaptiveThrottlingWithRetry } = require('adaptive-throttling-with-retry');
```

### Example

```javascript
const { AdaptiveThrottling } = require('adaptive-throttling-with-retry');
const axios = require('axios');

const adaptiveThrottlingWithRetry = AdaptiveThrottlingWithRetry({
  historyTimeMinute: 120,
  k: 2,
  upperLimiteToReject: 60,
  retries: 3,
  retryDelayMultiplier: 2,
  maxRetryDelay: 200,
  upperProbabilityLimiteToRetry: 0.4,
});

adaptiveThrottlingWithRetry
  .execute(() => {
    return axios.get('/user?ID=12345');
  })
  .then((response) => {
    console.log('success', response.data);
  })
  .catch((error) => {
    console.log('error', error.message);
  });
```

Or use any retry library you want

```javascript
const { AdaptiveThrottling } = require('adaptive-throttling-with-retry');
const axios = require('axios');
const { retry } = require('ts-retry-promise');

const adaptiveThrottlingWithRetry = AdaptiveThrottlingWithRetry({
  backof: 'EXPONENTIAL',
  retryPlugin: (requestFn, options) => {
    return retry(requestFn, options);
  },
  upperProbabilityLimiteToRetry: 0.5,
});

adaptiveThrottlingWithRetry
  .execute(() => {
    return axios.get('/user?ID=12345');
  })
  .then((response) => {
    console.log('success', response.data);
  })
  .catch((error) => {
    console.log('error', error.message);
  });
```
