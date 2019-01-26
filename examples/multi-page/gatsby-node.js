const path = require(`path`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const pageTemplate = path.resolve(`src/templates/page.js`)

  const pages = await graphql(`
    {
      allArenaChannel {
        edges {
          node {
            children {
              __typename
              ... on ArenaInnerChannel {
                slug
              }
            }
          }
        }
      }
    }
  `)
  pages.data.allArenaChannel.edges.forEach(edge => {
    edge.node.children
      .filter(item => item.__typename === 'ArenaInnerChannel')
      .forEach(child => {
        createPage({
          path: `${child.slug}`,
          component: pageTemplate,
          context: {
            slug: child.slug,
          },
        })
      })
  })
}
