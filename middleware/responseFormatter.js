const responseFormatter = (req, res, next) => {
  res.success = (data, message = 'Success') => {
    return res.json({
      success: true,
      message,
      data,
    });
  };

  res.error = (message, statusCode = 400) => {
    return res.status(statusCode).json({
      success: false,
      error: {
        message,
      },
    });
  };

  next();
};

module.exports = responseFormatter; 