const { format, createLogger, transports } = require("winston");
const { combine, timestamp, label, printf } = format;
const CATEGORY = "winston custom format";

const customFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}] ${message}`;
});

const logger = new createLogger({
  format: combine(
    label({ label: CATEGORY }),
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    customFormat
  ),

  transports: [
    new transports.File({
      name: "info-file",
      filename: "log/info.log",
      level: "info",
    }),
    new transports.File({
      name: "error-file",
      filename: "log/error.log",
      level: "error",
    }),
    new transports.File({
      name: "debug-file",
      filename: "log/debug.log",
      level: "debug",
    }),
  ],
});

module.exports = logger;
