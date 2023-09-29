
export const info = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "API Eccomerce Backend",
      version: "1.0.0",
      description: "Ecommerce realizado durante el curso de Backend dictado por la plataforma de Coderhouse, en el cual se aplica: NodeJS, Express, MongoDB, Mongoose, Passport, FakerJS, Joi, Bcrypt, entre otras dependencias",
    },
    servers: [
      { url: "http://localhost:8080/api" }
    ],
  },
  apis: ["./src/docs/*.yml"]
};