const log = require('@dazn/lambda-powertools-logger');
const createError = require('http-errors');
const middy = require('@middy/core');
const jsonBodyParser = require('@middy/http-json-body-parser');
const httpErrorHandler = require('../lib/middy-http-error-handler');
const { validate } = require('../lib/schema-validator');
const inputSchema = require('./calc.schema.json');

module.exports.handler = middy(async (event) => {
  log.debug('"calc" invoked', { body: event.body });

  validate(inputSchema, event.body);
  const { operation } = event.body;
  const { a, b } = event.body.operands;

  switch (operation) {
    case 'multiplication':
      return { result: a * b }
    case 'division':
      if (b === 0) {
        throw new createError.BadRequest('Attempted division by zero');
      }
      return { result: a / b }
    case 'force-error':
      thisShouldError();
      break;
    default:
      throw new createError.BadRequest(
        `Operation '${operation}' not supported.`,
      );
  }
})
  .use(jsonBodyParser())
  .use(httpErrorHandler());
