const log = require('@dazn/lambda-powertools-logger');
const { validate } = require('../lib/schema-validator');
const seatings_schema = require('./create-seating.schema.json');

module.exports.handler = async (event) => {
  log.debug('body', event.body);
  const data = JSON.parse(event.body || '{}');

  // Validate
  const validateResult = validate(seatings_schema, data);
  if (!validateResult.valid) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: validateResult.errorsText }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
