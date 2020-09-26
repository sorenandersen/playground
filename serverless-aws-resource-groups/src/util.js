function response(statusCode, message) {
  return {
    statusCode: statusCode,
    body: JSON.stringify({
      message: message,
    }),
  }
}

function isBeerNameValid(name) {
  const alphanumericPattern = RegExp('^[a-zA-Z0-9]{1,40}$')
  return typeof name === 'string' && alphanumericPattern.test(name)
}

module.exports = { response, isBeerNameValid }
