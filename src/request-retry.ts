function randomIntFromInterval(min: number, max: number): number {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const requestRetry = (requestFunc: any, options: any = {}, attempts = 0) => {
  return requestFunc().catch((err: any) => {
    attempts++;
    if (options.retries < attempts) {
      attempts = 0;
      throw err;
    }

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        requestRetry(requestFunc, options, attempts).then(resolve).catch(reject);
      }, options.retryDelayMultiplier * attempts * randomIntFromInterval(100, options.maxRetryDelay));
    });
  });
};
