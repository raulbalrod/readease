import yaml from "js-yaml";
import { readFileSync } from "fs";

const paths = yaml.load(readFileSync("./src/openapi/paths.yaml", "utf8"));
const schemas = yaml.load(readFileSync("./src/openapi/schemas.yaml", "utf8"));

export const swaggerDoc = {
  ...yaml.load(readFileSync("./src/openapi/openapi.yaml", "utf8")),
  paths,
  components: {
    schemas,
    securitySchemes: {
      JWT: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
      JWT: [],
    },
  ],
};
