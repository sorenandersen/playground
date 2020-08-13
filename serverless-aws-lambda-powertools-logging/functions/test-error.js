const Log = require('@dazn/lambda-powertools-logger')
const wrap = require('@dazn/lambda-powertools-pattern-basic')

const arbitrary = { invoker: 'http-api', message: 'Oooops, got problem' }

module.exports.handler = wrap(async (event, context) => {
  try {
    Log.info('About to blow up ...', { arbitrary })
    const result = nonExistingFunction()
    return { result }
  } catch (error) {
    Log.error('Your error message here', error)
    throw error
  }
})
