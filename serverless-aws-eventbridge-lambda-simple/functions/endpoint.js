const EventBridge = require('aws-sdk/clients/eventbridge')
const eventBridge = new EventBridge()
const Log = require('@dazn/lambda-powertools-logger')

const model = {
  type: 'translate', // "translate" or "sentiment"
  data: 'This string should be translated',
  language: 'es',
}

module.exports.handler = async (event, context) => {
  try {
    let requestData = JSON.parse(event.body)
    let params = {
      Entries: [
        {
          Detail: JSON.stringify(requestData),
          DetailType: requestData.type, // "translate" or "sentiment"
          Source: process.env.EVENT_BUS_SOURCE,
          EventBusName: process.env.EVENT_BUS_NAME,
        },
      ],
    }

    if (requestData) await eventBridge.putEvents(params).promise()

    Log.debug('Pushed data to EventBridge', { params })

    return {
      message: 'data received',
      data: requestData,
    }
  } catch (error) {
    Log.error('putEvents error', { error })
    return {
      message: 'Error submitting data',
      error: error.message,
    }
  }
}
