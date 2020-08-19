const DocumentClient = require('aws-sdk/clients/dynamodb').DocumentClient
const dynamodb = new DocumentClient()
const Log = require('@dazn/lambda-powertools-logger')

module.exports.handler = async (event, context) => {
  Log.debug('Received event', { event, context })

  for (const record of event.Records) {
    Log.debug('DynamoDB event, record', {
      eventName: record.eventName,
      record: record.dynamodb,
    })
    if (record.eventName === 'INSERT') {
      // Update aggregation table
      const playerId = record.dynamodb.NewImage.playerId.S
      const score = parseFloat(record.dynamodb.NewImage.score.N)

      try {
        // Optimistically assume that we have a record for the given playerId already.
        // The update expression will error out if a record with the given playerId already exists and we will handle it in the try block
        await dynamodb
          .update({
            TableName: process.env.LEADERBOARDS_TABLE,
            Key: { playerId },
            ConditionExpression: 'attribute_exists(playerId)',
            UpdateExpression:
              'set gamesPlayed = gamesPlayed + :increment, totalScore = totalScore + :score',
            ExpressionAttributeValues: {
              ':increment': 1,
              ':score': score,
            },
            ReturnValues: 'UPDATED_NEW',
          })
          .promise()
      } catch (error) {
        if (error.code === 'ConditionalCheckFailedException') {
          // No record to update, as this is the first time seeing this playerId
          Log.debug('New record about to be inserted', {
            playerId,
            score,
            updateError: error,
          })

          // Insert new record
          await dynamodb
            .put({
              TableName: process.env.LEADERBOARDS_TABLE,
              Item: {
                playerId,
                gamesPlayed: 1,
                totalScore: score,
              },
              ConditionExpression: 'attribute_not_exists(playerId)',
            })
            .promise()
        } else {
          Log.error('ERROR: dynamodb.put()', { playerId, score }, error)
          throw error
        }
      }
    }
  }
  Log.debug('Successfully processed records', { count: event.Records.length })
}
