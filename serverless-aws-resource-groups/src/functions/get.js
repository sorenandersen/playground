const DocumentClient = require('aws-sdk/clients/dynamodb').DocumentClient
const dynamodb = new DocumentClient()
const Log = require('@dazn/lambda-powertools-logger')
const { response, isBeerNameValid } = require('../util')

module.exports.handler = async (event, context) => {
  if (!isBeerNameValid(event.pathParameters.name)) {
    return response(
      400,
      'Bad request: beer name must be an alphanumeric string (max 40 characters).',
    )
  }

  let result

  try {
    result = await dynamodb
      .get({
        TableName: process.env.TABLE_NAME,
        Key: {
          BeerName: event.pathParameters.name,
        },
      })
      .promise()
  } catch (error) {
    Log.error('DynamoDB get', error)
    return response(500, 'Internal server error')
  }

  if (!result.Item) return response(404, 'Beer does not exist')

  return response(200, 'My favorite beer is: ' + result.Item.BeerName)
}
