exports.success = (msg, res, data = {}) => {
  res.status(200).json({
    status: "success",
    status_code: 200,
    message: msg,
    result: data,
  });
};

exports.failLogin = (msg, res) => {
  res.status(201).json({
    status: "failed",
    status_code: 201,
    message: msg,
  });
};

exports.badRequest = (msg, res) => {
  res.status(400).json({
    status: "failed",
    status_code: 400,
    message: msg,
  });
};

exports.invalid = (msg, res) => {
  res.status(401).json({
    status: "failed",
    status_code: 401,
    message: msg,
  });
};

exports.forbidden = (msg, res) => {
  res.status(403).json({
    status: "failed",
    status_code: 403,
    message: msg,
  });
};

exports.notFound = (msg, res) => {
  res.status(404).json({
    status: "failed",
    status_code: 404,
    message: msg,
  });
};

exports.internalServerError = (msg, res) => {
  res.status(500).json({
    status: "failed",
    status_code: 500,
    message: msg,
  });
};

exports.gatewayTimeout = (msg, res) => {
  res.status(504).json({
    status: "failed",
    status_code: 504,
    message: msg,
  });
};
