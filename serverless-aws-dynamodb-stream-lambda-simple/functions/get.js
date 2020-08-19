const DocumentClient = require('aws-sdk/clients/dynamodb').DocumentClient
const dynamodb = new DocumentClient()

module.exports.handler = async (event, context) => {
  const data = await dynamodb
    .scan({
      TableName: process.env.LEADERBOARDS_TABLE,
    })
    .promise()

  return {
    items: data.Items || [],
  }
}
