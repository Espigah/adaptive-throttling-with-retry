import { requestRetry } from './request-retry';
import RetrySkip from './RetrySkip';
import { AdaptiveThrottling } from 'adaptive-throttling';

const defaultOptions = {
  historyTimeMinute: 120,
  k: 2,
  upperLimiteToReject: 60,
  retries: 3,
  retryDelayMultiplier: 2,
  maxRetryDelay: 200,
  retryPlugin: requestRetry,
  upperProbabilityLimiteToRetry: 0.4,
};

export const AdaptiveThrottlingWithRetry = (options: any = {}) => {
  options = { ...defaultOptions, ...options };
  const adaptiveThrottling = AdaptiveThrottling(options);
  const { upperProbabilityLimiteToRetry, retryPlugin } = options;
  return {
    get requestRejectionProbability() {
      return adaptiveThrottling.requestRejectionProbability;
    },
    async execute(requestFn: any) {
      return retryPlugin(() => {
        return adaptiveThrottling.execute(requestFn).catch((err: any) => {
          if (adaptiveThrottling.requestRejectionProbability > upperProbabilityLimiteToRetry) {
            return new RetrySkip(err);
          }
          throw err;
        });
      }, options).then((data: any) => {
        if (data instanceof RetrySkip) {
          throw data.error;
        }
        return data;
      });
    },
  };
};
