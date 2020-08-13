# Serverless/AWS/Lambda: Set up structured logging and sampling with Lambda powertools

Sample project showing how to set up structured logging with DAZN Lamba powertools.

This example uses the Serverless Framework along with `@dazn/lambda-powertools-logger` and `@dazn/lambda-powertools-pattern-basic` packages.

## Geting started

```
# Install dependencies
npm install

# Deploy the stack
npm run sls -- deploy

# Make a few requests; debug logs are sampled at 20%
curl https://something.execute-api.us-east-1.amazonaws.com/success

# Make a request
curl https://something.execute-api.us-east-1.amazonaws.com/error
```

Now open the AWS CloudWatch console, find the proper log groups and streams, and wiew the structured logs with contextual information that the logger automatically adds.
