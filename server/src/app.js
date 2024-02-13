import express from 'express';
import { init } from './loaders/index.js';
import config from './config.js';

const app = express();

init(app, config);

export default app;
