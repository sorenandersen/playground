# Serverless/AWS/EventBridge/Lambda destinations: Simple setup

Sample project for experimenting with Lambda destinations.

This sample is based on my [EventBridge sample to be found here](https://github.com/sorenandersen/playground/tree/master/serverless-aws-eventbridge-lambda-simple). It's a basic calculator that can carry out two operations: Multiplication and division. The calculator does it's processing asynchronously, being triggered by EventBridge.

Now, to make a use case for a Lambda failure destination the calculator (the `processor` function) will throw if we ask it to divide by zero.

The result of successful processing is simply dumped to the logs.

## Geting started

```
# Install dependencies
npm install

# Deploy the stack
npm run sls -- deploy

# Ingest, all good
curl -d '{"operation": "multiplication", "numbers": {"a": 2, "b": 2}}' -H "Content-Type: application/json" -X POST https://w2f75xzc40.execute-api.us-east-1.amazonaws.com/

# Ingest with invalid data
curl -d '{"operation": "division", "numbers": {"a": 2, "b": 0}}' -H "Content-Type: application/json" -X POST https://w2f75xzc40.execute-api.us-east-1.amazonaws.com/

# Inspect results
npm run sls -- logs -f processor
```

Failed invocations are to be seen in the AWS SQS console.

## References

- https://docs.aws.amazon.com/lambda/latest/dg/invocation-async.html#invocation-async-destinations
- https://www.serverless.com/framework/docs/providers/aws/guide/functions/#destinations
- https://www.serverless.com/blog/lambda-destinations
