# Serverless/AWS/API Gateway/Lambda JSON Schema Validation

Sample project for experimenting with ways of undertaking JSON Schema validation with API Gateway and Lambda.

Currently only APIGW REST API's support JSON Schema validation and [with the Serverless Framework this is a breeze to set up](https://www.serverless.com/framework/docs/providers/aws/events/apigateway/#request-schema-validators).

This small demo includes a REST API endpoint that utilizes APIGW's built-in schema validation, and an HTTP API endpoint that reuses the same schema definition to perform the validation in the Lambda handler.

API Gateway currently supports JSON Schema Draft 04.

## Geting started

```
# Install dependencies
npm install

# Deploy the stack
npm run sls -- deploy

# Test endpoint: REST API
# AWS API Gateway built-in JSON Schema validation
curl -X POST -H "Content-Type: application/json" -d '{"numSeats": "should-be-a-number"}' https://xyz.execute-api.eu-west-1.amazonaws.com/dev/seatings1 -i

# Test endpoint: HTTP API endpoint
# Lambda handler validates the schema with the Ajv library
curl -X POST -H "Content-Type: application/json" -d '{"numSeats": "should-be-a-number"}' https://xyz.execute-api.eu-west-1.amazonaws.com/seatings2 -i
```

## References

- https://www.serverless.com/framework/docs/providers/aws/events/apigateway/#request-schema-validators
- https://www.fernandomc.com/posts/schema-validation-serverless-framework/
- https://www.npmjs.com/package/ajv/v/6.12.6
