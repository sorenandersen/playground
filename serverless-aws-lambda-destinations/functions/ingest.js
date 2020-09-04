const EventBridge = require('aws-sdk/clients/eventbridge')
const eventBridge = new EventBridge()
const Log = require('@dazn/lambda-powertools-logger')

const model = {
  operation: 'division',
  numbers: { a: 4, b: 2 },
}

module.exports.handler = async (event, context) => {
  try {
    const requestData = JSON.parse(event.body)
    const params = {
      Entries: [
        {
          Detail: JSON.stringify(requestData),
          DetailType: requestData.operation, // Supported: "multiplication", "division"
          Source: 'demo.calculator',
          EventBusName: process.env.EVENT_BUS_NAME,
        },
      ],
    }

    await eventBridge.putEvents(params).promise()

    Log.debug('Pushed data to EventBridge', { params })

    return {
      message: 'data received',
      data: requestData,
    }
  } catch (error) {
    Log.error('ingest', { error })
    return {
      message: 'Error parsing or submitting data',
      error: error.message,
    }
  }
}
