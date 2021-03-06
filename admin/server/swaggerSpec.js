const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDocument = {
  openapi: "3.0.1",
  info: {
    version: "1.0.0",
    title: "APIs Document",
    description: "your description here",
    termsOfService: "",
    // contact: {
    //   name: "",
    //   email: "",
    //   url: "",
    // },
    license: {
      name: "Apache 2.0",
      url: "https://www.apache.org/licenses/LICENSE-2.0.html",
    },
  },
};

// options for the swagger docs
const options = {
  // import swaggerDefinitions
  swaggerDefinition: swaggerDocument,
  // path to the API docs
  apis: ["./routes/*.js"],
};
const swaggerSpec = swaggerJSDoc(options);

module.exports = {
  swaggerSpec,
};
