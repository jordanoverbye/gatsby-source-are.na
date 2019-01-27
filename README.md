# gatsby-source-are.na

Source plugin for pulling data into [gatsby](https://www.gatsbyjs.org/) from [are.na](https://are.na/). Check out the examples in the `/examples` folder for how this plugin could be used as a lightweight CMS for a image board or portfolio.

## Installation

```
npm install --save gatsby-source-are.na
```

or

```
yarn add gatsby-source-are.na
```

## Requirements

You will first need to generate an access token from [dev.are.na](https://dev.are.na/) which will be passed into via `gatsby-config.js`.

## How to use

You will need to pass in a valid `accessToken` and a list of channels by their slug to `channelSlugs`.

```
// In your  gatsby-config.js
plugins: [
  {
    resolve: 'gatsby-source-are.na',
    options: {
      accessToken: 'xxxx',
      channelSlugs: ['slug-1', 'slug-2'],
    }
  },
]
```

## Querying Data

Query all channels passed in via `channelSlugs`.

```
{
  allArenaChannels {
    edges {
      node {
      slug
      children {
        __typename
        ... on ArenaInnerChannel {
          title
          slug
          children {
            __typename
            ... on ArenaBlock {
              title
              image {
                childImageSharp {
                  fluid(maxWidth: 1280) {
                    ...GatsbyImageSharpFluid_noBase64
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
```

Query a specific channel

```
{
  arenaChannel(slug: { eq: "some-slug" }) {
    title
  }
}
```

Query a specific inner channel

```
{
  arenaInnerChannel(slug: { eq: "some-slug" }) {
    title
  }
}
```
