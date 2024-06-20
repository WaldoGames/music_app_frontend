const { defineConfig } = require("cypress");
require('dotenv').config()

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    foo: 'bar',
    baz: 'quux',

    auth0_domain: process.env.REACT_APP_AUTH0_DOMAIN,
    auth0_client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
    auth0_client_secret: process.env.REACT_APP_AUTH0_CLIENT_SECRET,
    auth0_audience: "",
    auth0_scope: "openid profile email offline_access"
  },
});
