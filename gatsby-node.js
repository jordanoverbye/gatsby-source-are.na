const { createRemoteFileNode } = require('gatsby-source-filesystem')
const Arena = require('are.na')

exports.sourceNodes = async (
  { actions, createNodeId, createContentDigest, store, cache },
  configOptions
) => {
  const { createNode, createNodeField } = actions

  if (!configOptions.accessToken) {
    console.error('Access token is required for gatsby-source-are.na')
    return
  }

  const arena = new Arena({ accessToken: configOptions.accessToken })

  await Promise.all(
    configOptions.channelSlugs.map(async slug => {
      const channelData = await arena.channel(slug).get({ page: 1, per: 999 })
      const contents = await Promise.all(
        channelData.contents.map(async content => {
          let fileNode
          if (content.image) {
            try {
              fileNode = await createRemoteFileNode({
                url: content.image.original.url,
                store,
                cache,
                createNode,
                createNodeId: id => `ArenaChannelContentImage-${id}`,
              })
            } catch (error) {
              console.warn(
                'Error creating ArenaChannelContentImage node',
                error
              )
            }
          }
          return {
            itemId: content.id,
            title: content.title,
            slug: content.slug,
            status: content.status,
            metadata: content.metadata,
            base_class: content.base_class,
            image: fileNode,
            image___NODE: fileNode ? fileNode.id : null,
            updated_at: content.updated_at,
            created_at: content.created_at,
            content: content.content,
            content_html: content.content_html,
            description: content.description,
            description_html: content.description_html,
            source: content.source,
          }
        })
      )

      const cleanChannelData = {
        channelId: channelData.id,
        title: channelData.title,
        created_at: channelData.created_at,
        updated_at: channelData.updated_at,
        added_to_at: channelData.added_to_at,
        published: channelData.published,
        slug: channelData.slug,
        status: channelData.status,
        metadata: channelData.metadata,
        contents: contents,
      }

      const nodeContent = JSON.stringify(cleanChannelData)
      const nodeMeta = {
        id: createNodeId(`arena-channel-${slug}`),
        parent: null,
        children: [],
        internal: {
          type: `ArenaChannel`,
          content: nodeContent,
          contentDigest: createContentDigest(cleanChannelData),
        },
      }
      const node = Object.assign({}, cleanChannelData, nodeMeta)
      createNode(node)
    })
  )

  return
}
