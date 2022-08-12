exports.handleError = (resObj,statusCode, message, err) => {
  return resObj.status(statusCode).send({
    message,
    err,
  });
};

exports.HandleSuccess = (resObj,statusCode, message, result) => {
  return resObj.status(statusCode).send({
    message,
    result,
  });
};
