const log = require('@dazn/lambda-powertools-logger');
const createError = require('http-errors');
const middy = require('@middy/core');
const jsonBodyParser = require('@middy/http-json-body-parser');
const httpErrorHandler = require('../lib/middy-http-error-handler');
const { validate } = require('../lib/schema-validator');
const schema = require('./calc.schema.json');

module.exports.handler = middy(async (event) => {
  log.debug('"calc" invoked', { body: event.body });

  // Validate
  const validateResult = validate(schema, event.body);
  if (!validateResult.valid)
    throw new createError.BadRequest(validateResult.errorsText);

  const { operation } = event.body;
  const { a, b } = event.body.operands;
  let result;

  switch (operation) {
    case 'multiplication':
      result = a * b;
      break;
    case 'division':
      if (b === 0) {
        throw new createError.BadRequest('Attempted division by zero');
      }
      result = a / b;
      break;
    case 'force-error':
      thisShouldError();
      break;
    default:
      throw new createError.BadRequest(
        `Operation '${operation}' not supported.`,
      );
  }

  return { result };
})
  .use(jsonBodyParser())
  .use(httpErrorHandler());
