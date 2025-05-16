import winston from "winston";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "request-logging" },
  transports: [new winston.transports.File({ filename: "logs.txt" })],
});

function loggerMiddleware(req, res, next) {
  const logData = `${req.method} ${req.originalUrl} - Body: ${JSON.stringify(
    req.body
  )}`;
  logger.info(logData);
  next();
}

export default loggerMiddleware;
