import express from 'express';
import cors from 'cors';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swaggerConfig';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';



const server = express();

// Middleware para lidar com JSON
server.use(bodyParser.json());

// Middleware para lidar com cookies
server.use(cookieParser());

// Middleware para lidar com formulários
server.use(express.urlencoded({ extended: false }));

//Redirecionamento para a documentação
server.get('/', (req, res) => {
  res.redirect('/api/docs');
});

// Middleware para lidar com CSS
server.use('/customUI.css', express.static(path.join(__dirname, 'customUI.css')));

//Middleware para documentação usando Swagger
server.use(
  '/api/docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customSiteTitle: 'Eixos API',
    customCssUrl: '/customUI.css',
  }),
);

// Middleware para CORS
const corsOptions = {
  origin: 'http://localhost:4000', // Permitir acesso de qualquer origem
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // Métodos permitidos
  credentials: true,
  //allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
};

server.use(cors(corsOptions));

export default server;
