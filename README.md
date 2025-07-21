### https://starwars-app.azurewebsites.net

# This is a sample application that demonstrates the authentication flow for Angular apps using Auth0.

This TypeScript code sample demonstrates how to build a Single-Page Application (SPA) using Angular. This Angular code sample builds the API server using Angular class components.

## Set Up and Run the Angular Project

Install the project dependencies:

```bash
npm install
```

The compatible API server runs on `http://localhost:6060` by default. As such, to connect your Angular application with that API server, create a `.env` file under the root project directory and populate it with the following environment variables:

```bash
API_SERVER_URL=http://localhost:6060
```

Setup environment.ts
```bash
npm run env
```

Next, execute the following command to run the JSON server API:

```bash
npm run api
```

Finally, open another terminal tab and execute this command to run your Angular application:

```bash
npm start
```

