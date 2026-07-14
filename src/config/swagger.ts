import swaggerJsdoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Panda Market API",
    version: "1.0.0",
    description: "Panda Market Backend API Documentation",
  },
  servers: [
    {
      url: "http://localhost:8080",
      description: "Local server",
    },
  ],
};

const options = {
  definition: swaggerDefinition,
  apis: ["./src/docs/**/*.ts", "./src/features/**/*.route.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);
