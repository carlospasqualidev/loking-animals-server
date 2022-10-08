import cors from 'cors';

const allowedOrigins = ['http://localhost:3000'];

export const corsOptions: cors.CorsOptions = {
  origin: allowedOrigins,
};
