const log = require('@dazn/lambda-powertools-logger');

module.exports.handler = async (event) => {
  log.debug('body', event.body);
  const data = JSON.parse(event.body || '{}');

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
