import { server } from './server/Server';

const PORT = process.env.PORT || 3001;

server.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
