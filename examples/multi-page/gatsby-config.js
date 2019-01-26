const path = require('path')

module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: path.join(__dirname, `src`, `images`),
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: 'gatsby-source-are.na',
      options: {
        accessToken:
          '2db187bcb9fe61545222381128aba06a72dfcf73a62c291e835f8e344c1d3881',
        channelSlugs: [
          'gatsby-source-arena-portfolio',
          'gatsby-source-are-na-test',
        ],
      },
    },
  ],
}
