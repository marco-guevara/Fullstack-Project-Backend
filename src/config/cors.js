const defaultAllowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
];

function getAllowedOrigins() {
  if (!process.env.CORS_ORIGIN) {
    return defaultAllowedOrigins;
  }

  return process.env.CORS_ORIGIN.split(",").map((origin) => origin.trim());
}

const corsOptions = {
  origin(origin, callback) {
    const allowedOrigins = getAllowedOrigins();

    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS."));
  },
};

export default corsOptions;
