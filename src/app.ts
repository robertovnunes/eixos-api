import express, { Request, Response } from 'express';

import server from './api/conf/server';
import routes from './api/routes';

const app = server;

const PORT = process.env.PORT || 3000;

app.use(routes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
