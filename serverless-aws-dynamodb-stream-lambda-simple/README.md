# Serverless/AWS/DynamoDB stream/Lambda: Simple setup

Sample project of game events for experimenting with DynamoDB streams.

This stack creates two tables, 1) "GameEvents" and 2) "Leaderboards". It's a simplistic setup that will aggregate a players game count and total score via the `streamProcessor` function which is triggered by events in the "GameEvents" table.

On "INSERT" events the `streamProcessor` will use an `UpdateExpression` to increment the aggregated values.

The `ConditionExpression` will ensure that the player already exists; otherwise a new player will be inserted in another code block.

```
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
```

## Geting started

```
# Install dependencies
npm install

# Deploy the stack
npm run sls -- deploy

# Insert a few game events
curl -X POST -H "Content-Type: application/json" -d '{"playerId": "c6MKs23F2", "score": 150 }' https://something.execute-api.us-east-1.amazonaws.com/games

curl -X POST -H "Content-Type: application/json" -d '{"playerId": "c6MKs23F2", "score": 220 }' https://something.execute-api.us-east-1.amazonaws.com/games

curl -X POST -H "Content-Type: application/json" -d '{"playerId": "uaFNTIKpI", "score": 180 }' https://something.execute-api.us-east-1.amazonaws.com/games

# See that the game count and score is aggregated in the leaderboard table
curl -i https://something.execute-api.us-east-1.amazonaws.com/leaders
```

## References

- https://www.serverless.com/framework/docs/providers/aws/events/streams/
- https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Expressions.ConditionExpressions.html
