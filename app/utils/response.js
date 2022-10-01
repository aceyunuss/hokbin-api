exports.success = (msg, res, data = {}) => {
  res.status(200).json({
    status: "success",
    status_code: 200,
    msg,
    result: data,
  });
};

exports.badRequest = (msg, res) => {
  res.status(400).json({
    status: "failed",
    status_code: 400,
    msg,
  });
};

exports.forbidden = (msg, res) => {
  res.status(403).json({
    status: "failed",
    status_code: 403,
    msg,
  });
};

exports.notFound = (msg, res) => {
  res.status(404).json({
    status: "failed",
    status_code: 404,
    msg,
  });
};

exports.internalServerError = (msg, res) => {
  res.status(500).json({
    status: "failed",
    status_code: 500,
    msg,
  });
};

exports.gatewayTimeout = (msg, res) => {
  res.status(504).json({
    status: "failed",
    status_code: 504,
    msg,
  });
};
