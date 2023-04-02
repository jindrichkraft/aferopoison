import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Pool } from 'pg';

import authRouter from './routes/auth';
import projectRouter from './routes/project';
import issueRouter from './routes/issue';
import profileRouter from './routes/profile';
import { printBanner } from './utils/banner';
import {
  DEFAULT_EXPRESS_PORT,
  DEFAULT_POSTGRES_PORT,
  DEFAULT_POSTGRES_HOST,
  AUTH_ROUTE_PATH,
  PROJECTS_ROUTE_PATH,
  ISSUES_ROUTE_PATH,
  PROFILE_ROUTE_PATH,
} from './utils/constants';

// Setup
const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

// Ports
const expressPort = Number(process.env.EXPRESS_PORT) || DEFAULT_EXPRESS_PORT;
const postgresPort = Number(process.env.POSTGRES_PORT) || DEFAULT_POSTGRES_PORT;

// PostgreSQL Pool
export const pool = new Pool({
  host: process.env.DB_HOST || DEFAULT_POSTGRES_HOST,
  user: process.env.DB_USER || '',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || '',
  port: postgresPort,
});

// Routes
app.use(AUTH_ROUTE_PATH, authRouter);
app.use(PROJECTS_ROUTE_PATH, projectRouter);
app.use(ISSUES_ROUTE_PATH, issueRouter);
app.use(PROFILE_ROUTE_PATH, profileRouter);

// Start Banner
printBanner('start', {
  newLine: true,
});

// Express Server
app.listen(expressPort, () => {
  console.log(`[STATUS] Express listening on port ${expressPort}...`);
  console.log(`[STATUS] PostgreSQL running on port ${postgresPort}...`);
});
