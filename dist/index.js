
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./adaptive-throttling-with-retry.cjs.production.min.js')
} else {
  module.exports = require('./adaptive-throttling-with-retry.cjs.development.js')
}
