const DocumentClient = require('aws-sdk/clients/dynamodb').DocumentClient
const dynamodb = new DocumentClient()
const Log = require('@dazn/lambda-powertools-logger')
const { v4: uuid } = require('uuid')

module.exports.handler = async (event, context) => {
  const { playerId, score } = JSON.parse(event.body)
  Log.debug('post', { playerId, score })

  await dynamodb
    .put({
      TableName: process.env.GAME_EVENTS_TABLE,
      Item: {
        gameRoundId: uuid(),
        date: new Date().toISOString(),
        playerId,
        score,
      },
    })
    .promise()

  return {}
}
