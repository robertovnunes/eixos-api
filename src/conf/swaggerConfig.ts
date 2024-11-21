import swaggerJSDoc from "swagger-jsdoc";
import YAML from "yamljs";

const swaggerDefinition = YAML.load('./src/conf/swaggerDoc.yaml');

const options = {
  swaggerDefinition,
  apis: ['./src/controllers/*.ts'],
};


const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
