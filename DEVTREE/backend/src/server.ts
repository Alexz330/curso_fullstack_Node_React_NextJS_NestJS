import express from 'express';
import cors from 'cors';

import 'dotenv/config'

import router from './router';
import { connectDB } from './config/db';
import { corsConfig } from './config/cors';

connectDB();

const app = express();

// Cors
app.use(cors(corsConfig));
app.use(express.json());
app.use('/api',router);




export default app;