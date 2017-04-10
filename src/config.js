import dotenv from 'dotenv-safe';

dotenv.load();

export const secret = process.env.SECRET;
export const port = process.env.PORT || 8000;
export const dbLocation = 'mongodb://localhost/api-dev-quiz';