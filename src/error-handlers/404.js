module.exports = (err, req, res, next) => {
  const errorObj = {
    status: 404,
    message: "route not found",
  };

  res.status(404).send(errorObj);
};
