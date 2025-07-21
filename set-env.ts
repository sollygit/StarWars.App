const { writeFile, existsSync, mkdirSync } = require('fs');
const { promisify } = require('util');
const path = require('path');
const dotenv = require('dotenv');
const envFile = process.env['NODE_ENV'] === 'production' ? 'production.env' : '.env';
const targetPath = './src/environments/environment.ts';
const writeFilePromisified = promisify(writeFile);

dotenv.config({ path: envFile });

const envConfigFile = `export const environment = {
  production: ${process.env['PRODUCTION']},
  auth0: {
    domain: '${process.env['AUTH0_DOMAIN']}',
    clientId: '${process.env['AUTH0_CLIENT_ID']}',
    authorizationParams: {
      audience: '${process.env['AUTH0_AUDIENCE']}',
      redirect_uri: '${process.env['AUTH0_CALLBACK_URL']}',
    },
    errorPath: '/callback',
  },
  api: {
    starwarsApiUrl: '${process.env['STARWARS_API_URL']}',
  },
};
`;

(async () => {
  try {
    await ensureDirectoryExistence(targetPath)
    await writeFilePromisified(targetPath, envConfigFile);
  } catch (err) {
    console.error(err);
    throw err;
  }
})();

function ensureDirectoryExistence(filePath: string) {
  var dirname = path.dirname(filePath);
  if (existsSync(dirname)) {
    return;
  }
  ensureDirectoryExistence(dirname);
  mkdirSync(dirname);
  return;
}