exports.handleError = (resObj, statusCode, message, err) => {
  return resObj.status(statusCode).send({
    message,
    err,
  });
};

exports.HandleSuccess = (resObj, statusCode, message, result) => {
  if (result)
    return resObj.status(statusCode).send({
      message,
      result,
    });
  else {
    return resObj.status(statusCode).send({
      message,
    });
  }
};
