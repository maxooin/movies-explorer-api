import { constants } from 'http2';
import { errorMessageRouters } from '../utils/constants.js';

function centralizedError(err, req, res, next) {
  let {
    statusCode,
    message,
  } = err;
  if (!statusCode) {
    statusCode = constants.HTTP_STATUS_INTERNAL_SERVER_ERROR;
    message = errorMessageRouters.unknown;
  }
  res.status(statusCode)
    .send({ message });
  next();
}

export default centralizedError;
