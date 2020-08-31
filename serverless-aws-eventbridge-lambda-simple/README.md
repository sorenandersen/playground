# Serverless/AWS/EventBridge/Lambda: Simple setup

Sample project for experimenting with EventBridge.

Based on the [Sessions With SAM (S1E3): Amazon EventBridge](https://github.com/aws-samples/sessions-with-aws-sam#eventbridge) example code base with IaC ported to the Serverless Framework.

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
