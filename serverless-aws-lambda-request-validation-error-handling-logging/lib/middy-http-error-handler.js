const log = require('@dazn/lambda-powertools-logger');

module.exports = () => {
  return {
    onError: (handler, next) => {
      const error = handler.error;
      const statusCodeError =
        error.statusCode && typeof error.statusCode === 'number';

      if (statusCodeError && error.statusCode < 500) {
        // **
        // HTTP status code error
        // **
        log.warn('statusCodeError', {
          statusCode: error.statusCode,
          error,
          event: handler.event,
          context: handler.context,
        });

        // Reveal error as-is
        handler.response = {
          statusCode: error.statusCode,
          body: JSON.stringify({
            message: error.message,
          }),
        };

        return next();
      }

      // **
      // Non-HTTP or server error
      // Log and return nondisclosed error
      // **
      log.error(
        'Unhandled error',
        {
          event: handler.event,
          context: handler.context,
        },
        error,
      );
      handler.response = {
        statusCode: 500,
        body: JSON.stringify({
          message: 'Internal Server Error',
        }),
      };

      return next();
    },
  };
};
