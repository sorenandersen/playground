# Serverless/AWS/EventBridge/Lambda destinations: Simple setup

Sample project for experimenting with Lambda destinations.

This sample is based on my [EventBridge sample to be found here](https://github.com/sorenandersen/playground/tree/master/serverless-aws-eventbridge-lambda-simple). It's a basic calculator that can carry out two operations: Multiplication and division. The calculator is doing the processing asynchronously, being triggered by EventBridge.

To make a use case for a Lambda failure destination the calculator (the `processor` function) will throw if we ask it to divide by zero. The failure destination is an SQS queue.

The `processor` function is also configured with an "on success" destination. The success destination is the custom EventBridge bus, enabling subscribers, i.e. other microservices, to react on the result of the processing.

## Geting started

```
# Install dependencies
npm install

# Deploy the stack
npm run sls -- deploy

# Ingest, all good
curl -d '{"operation": "multiplication", "numbers": {"a": 2, "b": 2}}' -H "Content-Type: application/json" -X POST https://something.execute-api.us-east-1.amazonaws.com/

# Ingest, oops - that's a division by zero
curl -d '{"operation": "division", "numbers": {"a": 2, "b": 0}}' -H "Content-Type: application/json" -X POST https://something.execute-api.us-east-1.amazonaws.com/

# Inspect successful invocations in CloudWatch
npm run sls -- logs -f processor

# Inspect successful invocations with lumigo-cli
lumigo-cli tail-eventbridge-bus -n demo-lambda-destinations-bus-dev -r us-east-1

# Inspect failed invocations with lumigo-cli
lumigo-cli tail-sqs -n demo-lambda-destinations-failure-queue-dev -r us-east-1
```

We can also inspect invocations in the AWS CloudWatch console (successes) or the SQS console (failures). Remember there's a sligt delay for failures to surface because Lambda will retry twice, making it three attempts in total, before sending to the failure destination.

## References

- https://docs.aws.amazon.com/lambda/latest/dg/invocation-async.html#invocation-async-destinations
- https://www.serverless.com/framework/docs/providers/aws/guide/functions/#destinations
- https://www.serverless.com/blog/lambda-destinations
