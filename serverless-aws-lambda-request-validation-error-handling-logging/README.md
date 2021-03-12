# Serverless/AWS/API Gateway HTTP API/Lambda: Request validation, error handling and structured logging

Sample project for demonstrating a compelling combo of libraries and helpers for handling request validation, error handling and logging.

These simple but powerful techniques leave a minimal footprint in the Lambda handler code while keeping intentions clear and business logic free of clutter and boiler plate code.

## Feature set

- **Request validation with JSON Schema** performed within the handler code with Ajv, to allow deployment as an API Gateway HTTP API (as this feature is yet to be supported natively by APIGWv2)
- **Error handling** with custom Middy middleware and the `http-errors` library for generating HTTP errors. And a catch-all for handling runtime- or deliberately unhandled errors
- **Structured logging**, with DAZN Lambda Powertools logger, for contextual logs in JSON format and configurable log level

## Example

Included [`calc.js` handler function](./functions/calc.js) demonstrates the techniques in action, here with a glimpse of the function body:

```
const validateResult = validate(schema, event.body);
if (!validateResult.valid)
  throw new createError.BadRequest(validateResult.errorsText);

...

case 'division':
  if (b === 0) {
    throw new createError.BadRequest('Attempted division by zero');
  }
```

### JSON Schema validation

The [`validate` function is a local helper](./lib/schema-validator.js) that validates the request body against the [provided schema](./functions/calc.schema.json).

It is configured to us JSON Schema draft 04 to comply with the version currently supported by API Gateway REST API.

## Geting started

```
# Install dependencies
npm install

# Deploy the stack
npm run sls -- deploy

# --- Successful requests ---
# Multiplication
curl -X POST -d '{"operation": "multiplication", "operands": {"a": 2, "b": 2}}' -H "Content-Type: application/json" https://6zvonqmvxd.execute-api.eu-west-1.amazonaws.com/calc -i

# Division
curl -X POST -d '{"operation": "division", "operands": {"a": 2, "b": 2}}' -H "Content-Type: application/json" https://6zvonqmvxd.execute-api.eu-west-1.amazonaws.com/calc -i

# --- Invalid requests ---
curl -X POST -d '{"operation": "multiplication"}' -H "Content-Type: application/json" https://6zvonqmvxd.execute-api.eu-west-1.amazonaws.com/calc -i

curl -X POST -d 'clearly invalid' -H "Content-Type: application/json" https://6zvonqmvxd.execute-api.eu-west-1.amazonaws.com/calc -i

# --- Erroneous requests ---
# Division by zero
curl -X POST -d '{"operation": "division", "operands": {"a": 2, "b": 0}}' -H "Content-Type: application/json" https://6zvonqmvxd.execute-api.eu-west-1.amazonaws.com/calc -i

# Deliberately forcing a runtime ReferenceError
curl -X POST -d '{"operation": "force-error", "operands": {"a": 42, "b": 42}}' -H "Content-Type: application/json" https://6zvonqmvxd.execute-api.eu-west-1.amazonaws.com/calc -i

# Inspect invocations in CloudWatch Logs
npm run sls -- logs -f calc
```

## References

- https://www.npmjs.com/package/ajv/v/6.12.6
- https://github.com/middyjs/middy
- https://www.npmjs.com/package/http-errors
- https://www.npmjs.com/package/@dazn/lambda-powertools-logger
