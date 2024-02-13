import morgan from 'morgan';
import logger from '../utils/index.js';

export const morganMiddleware = morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens['response-time'](req, res), 'ms'
    ].join(' ');
  }, {
    stream: {
      write(message) {
        const statusCode = message.split(' ')[2];
        if (statusCode.startsWith('2')) {
          logger.info(message);
        } else if (statusCode.startsWith('4')) {
          logger.warn(message);
        } else if (statusCode.startsWith('5')) {
          logger.error(message);
        }
      }
    }
  });