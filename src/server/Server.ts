import express from 'express';
import { router } from '../routes';
import "dotenv/config"
import { taskController } from '../controllers';

const server = express();

server.use(express.json());

server.use("api", router)

server.get('/', (req, res) => {
  return res.send('Hello World!');
});

server.post('/task', taskController.createBodyValidation, taskController.createTask);

export { server };
