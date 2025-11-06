export const environment = {
  production: false,
  auth0: {
    domain: 'sollys.us.auth0.com',
    clientId: 'P8ycmNe0T6hqxZtdD9cTwmgUtXDtEzLA',
    authorizationParams: {
      audience: 'https://demo-api-server.azurewebsites.net',
      redirect_uri: 'http://localhost:4040/callback',
    },
    errorPath: '/callback',
  },
  api: {
    starwarsApiUrl: 'https://localhost:44393',
  }
};
