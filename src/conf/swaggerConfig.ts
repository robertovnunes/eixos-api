import swaggerJSDoc from "swagger-jsdoc";
import server from "./server";

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Minha API',
      version: '1.0.0',
      description: 'Documentação da API gerada pelo Swagger',
    },
  },
  apis: ['./src/controllers/*.ts'], // Caminho para os arquivos com anotação JSDoc
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
