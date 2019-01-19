const path = require(`path`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const pageTemplate = path.resolve(`src/templates/page.js`)

  return graphql(`
    {
      allArenaChannel {
        edges {
          node {
            slug
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      throw result.errors
    }

    result.data.allArenaChannel.edges.forEach(edge => {
      createPage({
        path: `${edge.node.slug}`,
        component: pageTemplate,
        context: {
          slug: edge.node.slug,
        },
      })
    })
  })
}
