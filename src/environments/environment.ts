export const environment = {
  production: true,
  auth0: {
    domain: 'sollys.us.auth0.com',
    clientId: 'P8ycmNe0T6hqxZtdD9cTwmgUtXDtEzLA',
    authorizationParams: {
      audience: 'https://demo-api-server.azurewebsites.net',
      redirect_uri: 'https://mango-island-0f9e70a00.3.azurestaticapps.net/callback',
    },
    errorPath: '/callback',
  },
  api: {
    starwarsApiUrl: 'https://starwars-webjet-api.azurewebsites.net',
  },
};
