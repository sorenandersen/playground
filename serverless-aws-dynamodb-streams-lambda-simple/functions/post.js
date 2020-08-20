const DocumentClient = require('aws-sdk/clients/dynamodb').DocumentClient
const dynamodb = new DocumentClient()
const Log = require('@dazn/lambda-powertools-logger')
const shortid = require('shortid')

module.exports.handler = async (event, context) => {
  const { playerId, score } = JSON.parse(event.body)
  Log.debug('post', { playerId, score })

  await dynamodb
    .put({
      TableName: process.env.GAME_EVENTS_TABLE,
      Item: {
        playerId,
        timestamp: new Date().toISOString(),
        gameRoundId: shortid.generate(),
        score,
      },
    })
    .promise()

  return {}
}
