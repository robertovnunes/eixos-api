import server from './api/conf/server';
import routes from './api/routes';
import { config } from 'dotenv';

config();

const app = server;

const PORT = process.env.PORT || 3000;

app.use(routes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`If production, server is running on https://eixos-api.onrender.com`);
  console.log('See the API documentation at https://eixos-api.onrender.com/api/docs');
});
