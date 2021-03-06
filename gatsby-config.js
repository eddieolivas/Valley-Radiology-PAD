const { faTruckMonster } = require("@fortawesome/free-solid-svg-icons")

require("dotenv").config()

module.exports = {
  siteMetadata: {
    title: `Valley Radiology`,
    description: `Valley Radiology in Fayetteville, NC, specializes in diagnosing and treating PAD for men and women at risk. Learn more, or book an appointment now.`,
    author: `@eddieolivas`,
    www: true,
    https: true,
    siteUrl: "https://valleyradiologypad.com",
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: process.env.GTM,
        includeInDevelopment: true,

        // Include GTM in development.
        //
        // Defaults to false meaning GTM will only be loaded in production.
        defaultDataLayer: { platform: "gatsby" },
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GA,
      },
    },
    {
      resolve: `gatsby-plugin-catch-links`,
      options: {
        excludePattern: /(excluded-link|external)/,
      },
    },
    {
      resolve: "gatsby-wpgraphql-inline-images",
      options: {
        wordPressUrl: `${process.env.BACKEND_URL}/`,
        uploadsUrl: process.env.UPLOADS_URL,
        processPostTypes: ["Page", "Post"],
        graphqlTypeName: `WPGraphQL`,
        generateWebp: true,
      },
    },
    {
      resolve: "gatsby-source-gravityforms",
      options: {
        // Base URL needs to include protocol (http/https)
        baseUrl: process.env.BACKEND_URL,
        // Gravity Forms API
        api: {
          key: process.env.CONSUMER_KEY,
          secret: process.env.CONSUMER_SECRET,
        },
        basicAuth: {
          user: process.env.USER,
          password: process.env.PASSWORD,
        },
      },
    },
    {
      resolve: `gatsby-source-graphql`,
      options: {
        typeName: `WPGraphQL`,
        fieldName: `wpcontent`,
        url: `${process.env.BACKEND_URL}/graphql`,
        refetchInterval: 60,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaultQuality: 100,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-no-index`,
    `gatsby-plugin-preact`,
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Nunito Sans\:400,400i,700`, // you can also specify font weights and styles
        ],
        display: "swap",
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
