
import express from 'express';
import initApp from './src/index.routes.js';
import dotenv from 'dotenv'
dotenv.config();

const app = express();

initApp(app, express);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
