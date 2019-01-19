const path = require(`path`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const pageTemplate = path.resolve(`src/templates/page.js`)

  const pages = await graphql(`
    {
      allArenaChannel {
        edges {
          node {
            slug
          }
        }
      }
    }
  `)

  pages.data.allArenaChannel.edges.forEach(edge => {
    createPage({
      path: `${edge.node.slug}`,
      component: pageTemplate,
      context: {
        slug: edge.node.slug,
      },
    })
  })
}
