import * as dotenv from 'dotenv';
import * as Joi from 'joi';
import { EnvConfig } from '../../common/interfaces/env-config';
import { readBaseJsonFile } from '../../utils/read-json-file';

const nodeEnv = process.env.NODE_ENV || 'development';
const config = dotenv.config({ path: `${nodeEnv}.env` }).parsed;

config.APP_VERSION = getVersion();

export const envConfigs = validateInput(config);

/**
 * Ensures all needed variables are set,
 * and returns the validated JavaScript object
 * including the applied default values.
 */
function validateInput(environmentConfig: EnvConfig): EnvConfig {
  const envVarsSchema: Joi.ObjectSchema = Joi.object({
    APP_NAME: Joi.string().required(),
    APP_VERSION: Joi.string().required(),

    NODE_ENV: Joi.string()
      .valid('development')
      .default('development'),

    PORT: Joi.number().default(3000),

    DATABASE_HOST: Joi.string().required(),
    DATABASE_PORT: Joi.number().default(5432),
    DATABASE_NAME: Joi.string().required(),
    DATABASE_USER: Joi.string().required(),
    DATABASE_PASSWORD: Joi.string().required(),

    TYPEORM_MIGRATIONSRUN: Joi.boolean().required(),
    TYPEORM_LOGGING: Joi.boolean().required(),
    INTENT_API: Joi.string().required(),
  });

  const { error, value: validatedEnvConfig } = envVarsSchema.validate(
    environmentConfig,
  );

  if (error) {
    throw new Error(`Config validation error: ${error.message}`);
  }
  return validatedEnvConfig;
}

function getVersion(): string {
  const packageFile: { version: string } = readBaseJsonFile('package');
  return packageFile.version;
}
