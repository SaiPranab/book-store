const allowedOrigins = [
  'https://yourdomain.com', // Replace with your real production domain(s)
  // Add more domains as needed
];

const corsOptions = (env) => ({
  origin: (origin, callback) => {
    if (env === 'prod') {
      // Allow requests with no origin (like mobile apps, curl, etc.) or from allowed origins
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    } else {
      callback(null, true); // Allow all in development
    }
  },
  credentials: true,
  optionsSuccessStatus: 200, // For legacy browser support
});

module.exports = corsOptions;
