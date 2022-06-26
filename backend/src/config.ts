import dotenv from "dotenv";
import path from "path";
import Joi from "@hapi/joi";

dotenv.config({ path: path.join(__dirname, "../.env") });

const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string().valid("production", "development", "test").required(),
  PORT: Joi.number().default(3000),
  DATABASE_URL: Joi.string().required(),
}).unknown();

const { value: config, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export default config;
