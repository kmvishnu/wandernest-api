import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cors from "cors";

const configureHelmet = () => {
  return helmet();
};

const configureRateLimiter = () => {
  return rateLimit({
    windowMs: 30 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 30 requests per window
    message: "Too many requests, please try again later.",
  });
};

const configureCors = () => {
  const corsOptions = {
    origin: (origin, callback) => {
      callback(null, true);
    },
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  };
  return cors(corsOptions);
};

export const securityMiddlewares = {
  helmet: configureHelmet,
  rateLimiter: configureRateLimiter,
  cors: configureCors,
};
