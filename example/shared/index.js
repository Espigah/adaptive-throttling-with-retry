const axios = require('axios');

let interval = 0;

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const sucessCase = (adaptiveThrottling) => {
  adaptiveThrottling
    .execute(() => {
      return Promise.resolve('ok');
    })
    .then((response) => {
      console.log('response', response);
    })
    .catch((error) => {
      console.log('error', error.message);
    });
};

const failCase = (adaptiveThrottling) => {
  adaptiveThrottling
    .execute(() => {
      return axios.get('/user?ID=12345');
    })
    .then((response) => {
      console.log('response', response.data);
    })
    .catch((error) => {
      console.log('error', error.message);
    });
};

const getUser = (adaptiveThrottling) => {
  interval++;
  console.log({ interval, requestRejectionProbability: adaptiveThrottling.requestRejectionProbability });
  if ((interval >= 0 && interval < 101) || interval > 2009) {
    sucessCase(adaptiveThrottling);
  }
  if (interval >= 100 && interval < 2009) {
    failCase(adaptiveThrottling);
  }
  setTimeout(() => {
    getUser(adaptiveThrottling);
  }, randomIntFromInterval(50, 500));
};

module.exports = {
  getUser,
};
