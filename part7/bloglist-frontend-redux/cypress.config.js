const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    base_frontend_url: "http://localhost:3000",
    base_backend_url: "http://localhost:3003/api",
  },
});
