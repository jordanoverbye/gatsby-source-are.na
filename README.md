# gatsby-source-are.na

Source plugin for pulling data into Gatsby from [are.na](https://are.na/)

## Installation

```
npm install --save gatsby-source-are.na
```

or

```
yarn add gatsby-source-are.na
```

## Requirements

1. You will need to generate an access token from [dev.are.na](https://dev.are.na/)

## How to use

You will need to pass in a valid `accessToken` and a list of channels by their slug to `channelSlugs`.

```
// In your  gatsby-config.js
plugins: [
  {
    resolve: 'gatsby-source-are.na',
    options: {
      accessToken: 'xxxx',
      channelSlugs: [
        'slug-1',
        'slug-2',
      ],
    }
  },
]
```

## Querying Data

Query all the channels

```
{
  allArenaChannels {
    edges {
      node {
        title
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
