const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    foo: 'bar',
    baz: 'quux',

    auth0_domain: "dev-fpvaobxa6q4y0nwm.us.auth0.com",
    auth0_client_id: "DGtH3DTVrUu6Iek6ZM1iqj77y4w3n5xc",
    auth0_client_secret: "wvcPZOkjQmNYTtgzUwuv_Pv7WXJs0UTjokS3bwOwSvDjxXJ1G4D-K1Rz8fgudc_y",
    auth0_audience: "",
    auth0_scope: "openid profile email offline_access"
  },
});
