const DocumentClient = require('aws-sdk/clients/dynamodb').DocumentClient
const dynamodb = new DocumentClient()
const Log = require('@dazn/lambda-powertools-logger')
const { response, isBeerNameValid } = require('../util')

module.exports.handler = async (event, context) => {
  const data = JSON.parse(event.body)
  if (!isBeerNameValid(data.name)) {
    return response(
      400,
      'Bad request: beer name must be an alphanumeric string (max 40 characters).',
    )
  }

  try {
    await dynamodb
      .put({
        TableName: process.env.TABLE_NAME,
        Item: {
          BeerName: data.name,
        },
      })
      .promise()
  } catch (error) {
    Log.error('DynamoDB put', error)
    return response(500, 'Internal server error')
  }

  return response(200, 'Added favorite beer: ' + data.name)
}
