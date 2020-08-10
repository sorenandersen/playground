const AWS = require('aws-sdk')
AWS.config.region = 'us-east-1'
const dynamodb = new AWS.DynamoDB.DocumentClient()
require('dotenv').config()

const seedData = [
  {
    PK: '1',
    Name: 'Foo',
  },
  {
    PK: '2',
    Name: 'Bar',
  },
  {
    PK: '3',
    Name: 'Baz',
  },
]

const putReqs = seedData.map((x) => ({
  PutRequest: {
    Item: x,
  },
}))

const req = {
  RequestItems: {
    [process.env.TABLE_NAME]: putReqs,
  },
}

dynamodb
  .batchWrite(req)
  .promise()
  .then(() => console.log('Done!'))
  .catch((err) => console.error(err))
