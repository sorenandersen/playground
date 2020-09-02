# Serverless/AWS/EventBridge/Lambda: Simple setup

Sample project for experimenting with EventBridge.

Based on [Sessions With SAM (S1E3): Amazon EventBridge](https://github.com/aws-samples/sessions-with-aws-sam#eventbridge) sample code, with IaC ported to the Serverless Framework.

The `endpoint` Lambda accepts requests with a JSON payload defining the task to be carried out. It'll emit events on a _custom bus_ to which consumers can subscribe via _rules_. The subscribers - or _targets_ as they are named in EventBridge - in this small example are simle Lambda functions that carry out translation or sentiment analysis.

The actual processing is asynchronous and in this small example it's simply just dumped to the logs.

## Geting started

```
# Install dependencies
npm install

# Deploy the stack
npm run sls -- deploy

# Translate
curl -d '{"type": "translate", "data": "Two beers please, "language": "es"}' -H "Content-Type: application/json" -X POST https://something.execute-api.us-east-1.amazonaws.com/

# Sentiment
curl -d '{"type": "sentiment", "data": "Happy path!", "language": "en"}' -H "Content-Type: application/json" -X POST https://something.execute-api.us-east-1.amazonaws.com/

# Inspect results from Amazon Translate and Comprehend
npm run sls -- logs -f translate
npm run sls -- logs -f sentiment
```

## References

- https://github.com/aws-samples/sessions-with-aws-sam#eventbridge
