import express from 'express';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import path from 'path';
import apiRoutes from './routes/api';

// Load environment variables from .env in root directory
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API Routes
app.use('/api', apiRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});