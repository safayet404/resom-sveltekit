module.exports = {
  schema: "https://api-beta.resom.com.br/graphql/", // Replace with your Saleor GraphQL API URL
  documents: ["**/*.{graphql,js,ts,jsx,tsx,vue,svelte}"], // Where your queries/mutations are
  extensions: {
    endpoints: {
      default: {
        url: "YOUR_SALEOR_API_URL_HERE", // Again, your Saleor GraphQL API URL
        headers: {
          "X-Saleor-Channel": "channel-pln", // Add your default channel if needed
        },
        // Note: Saleor usually does not require special `introspect` config
      },
    },
  },
};
