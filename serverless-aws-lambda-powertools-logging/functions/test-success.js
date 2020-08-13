const Log = require('@dazn/lambda-powertools-logger')
const wrap = require('@dazn/lambda-powertools-pattern-basic')

const arbitrary = { invoker: 'http-api' }

// With Lambda powertools (@dazn/lambda-powertools-middleware-sample-logging middleware),
// Log.debug statements will be sampled at default 1%, configurable with the
// SAMPLE_DEBUG_LOG_RATE environment variable.
module.exports.handler = wrap(async (event, context) => {
  Log.debug('This is a debug log', { event, context })
  Log.info('Info for you', { arbitrary })

  return { arbitrary }
})

/*
functions:
  testSuccess:
    handler: functions/test-success.handler
    events:
      - httpApi:
          path: /test-success
          method: get
  testError:
    handler: functions/test-error.handler
    events:
      - httpApi:
          path: /test-error
          method: get

*/
