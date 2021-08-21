const errorHandler = (err, req, res, next) => {
  console.error(err);
  res.status(err.status || 400).send({
    success: false,
    message: err._message || err.message
  });
};

const asyncMiddleware = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = {
  errorHandler,
  asyncMiddleware
};