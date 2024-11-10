const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://bookcart.azurewebsites.net", // Replace with your app's base URL
  },
});
