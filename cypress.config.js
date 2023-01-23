const { defineConfig } = require("cypress");

module.exports = defineConfig({
	projectId: "junumb",
	video: false,
	e2e: {
		baseUrl: 'https://santa-secret.ru/',
		setupNodeEvents(on, config) {
		// implement node event listeners here
		},
	},
});
