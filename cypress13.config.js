const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "mczp8t",
  video: false,
  env: {
    viewportWidth: 1280,
    viewportHeight: 800
  },
  e2e: {
    baseUrl: 'https://santa-secret.ru/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
