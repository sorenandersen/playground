const Log = require('@dazn/lambda-powertools-logger')

module.exports.handler = async (event) => {
  Log.debug('processer event', event)
  const a = event.detail.numbers.a
  const b = event.detail.numbers.b
  let result

  switch (event['detail-type']) {
    case 'multiplication':
      result = a * b
      break
    case 'division':
      if (a === 0 || b === 0) throw Error('Division by zero attempted.')
      result = a / b
      break
    default:
      break
  }

  Log.debug('result', { result })

  return {
    result,
  }
}
