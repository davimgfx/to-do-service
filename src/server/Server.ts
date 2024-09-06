import express from 'express';
import cors from 'cors';
import { router } from '../routes';
import "dotenv/config"
import "../shared/services/TranslationsYup"

const server = express();

server.use(cors())

server.use(express.json());

server.use('/api', router);

export { server };
