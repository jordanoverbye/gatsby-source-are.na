const { createRemoteFileNode } = require('gatsby-source-filesystem');
const Arena = require('are.na');

exports.sourceNodes = async (helpers, configOptions) => {
  // Check the config options
  const hasValidConfigOptions = verifyConfigOptions(configOptions);
  if (!hasValidConfigOptions) return false;

  // Create a new instance of Arena. This is what we will use to get data from are.na
  const arena = new Arena({ accessToken: configOptions.accessToken });

  await Promise.all(
    configOptions.channelSlugs.map(async slug => {
      // Get all the data for the channel
      const channel = await arena.channel(slug).get({ page: 1, per: 999 });

      // Create a node id for the channel. The reason we do this here is so we can pass it as the parent for child nodes.
      const channelNodeId = helpers.createNodeId(`arena-channel-${channel.id}`);

      // Map over every item in the channel and either return null or the node id of the child.
      // We need the child node ids to make a parent/child connection
      let channelChildrenNodeIds = await Promise.all(
        channel.contents.map(async item => {
          if (item.base_class === 'Block') {
            return await createArenaBlockNode(item, channelNodeId, helpers);
          }

          if (item.base_class === 'Channel') {
            const innerChannel = await arena
              .channel(item.slug)
              .get({ page: 1, per: 999 });
            const innerChannelNodeId = helpers.createNodeId(
              `arena-inner-channel-${item.id}`
            );
            const innerContents = await Promise.all(
              innerChannel.contents.map(async item => {
                if (item.base_class === 'Block') {
                  return await createArenaBlockNode(
                    item,
                    innerChannelNodeId,
                    helpers
                  );
                }
                return null;
              })
            );
            const innerChildrenIds = innerContents.filter(i => i);
            await createArenaChannelNode(
              innerChannelNodeId,
              innerChannel,
              channelNodeId,
              innerChildrenIds,
              true,
              helpers
            );
            return innerChannelNodeId;
          }
        })
      )

      if (channelChildrenNodeIds !== null) {
        channelChildrenNodeIds = channelChildrenNodeIds.filter(i => i);
      }

      await createArenaChannelNode(
        channelNodeId,
        channel,
        null,
        channelChildrenNodeIds,
        false,
        helpers
      );

      return null;
    })
  );
  return;
};

function verifyConfigOptions(configOptions) {
  if (
    !configOptions.accessToken ||
    typeof configOptions.accessToken !== 'string'
  ) {
    console.error('Please pass in a valid accessToken to gatsby-source-are.na');
    return false;
  }
  if (
    !configOptions.channelSlugs ||
    typeof configOptions.channelSlugs !== 'object'
  ) {
    console.error(
      'Please pass in at least 1 channelSlug to gatsby-source-are.na'
    );
    return false;
  }
  return true;
}

async function createArenaChannelNode(
  id,
  channel,
  parent,
  childrenIds,
  isInner,
  { actions: { createNode }, createContentDigest }
) {
  const channelData = {
    channelId: channel.id,
    title: channel.title,
    created_at: channel.created_at,
    updated_at: channel.updated_at,
    added_to_at: channel.added_to_at,
    published: channel.published,
    slug: channel.slug,
    status: channel.status,
    metadata: channel.metadata,
  };

  const nodeData = {
    id: id,
    parent: parent,
    children: [...childrenIds],
    internal: {
      type: isInner ? `ArenaInnerChannel` : `ArenaChannel`,
      content: JSON.stringify(channelData),
      contentDigest: createContentDigest(channelData),
    },
  };

  await createNode(Object.assign({}, channelData, nodeData));
  return null;
}

async function createArenaBlockNode(
  block,
  parentId,
  { actions: { createNode }, createNodeId, createContentDigest, store, cache }
) {
  let fileNode;
  if (block.image) {
    try {
      fileNode = await createRemoteFileNode({
        url: block.image.original.url,
        store,
        cache,
        createNode,
        createNodeId: id => `ArenaImage-${id}`,
      });
    } catch (error) {
      console.warn('Error creating ArenaImage node', error);
    }
  }

  const blockWithImageNode = Object.assign({}, block, {
    image: fileNode,
    image___NODE: fileNode ? fileNode.id : null,
  });

  const nodeId = createNodeId(`arena-block-${block.id}`);
  const nodeData = {
    id: nodeId,
    parent: parentId,
    children: null,
    internal: {
      type: `ArenaBlock`,
      content: JSON.stringify(blockWithImageNode),
      contentDigest: createContentDigest(blockWithImageNode),
    },
  };
  await createNode(Object.assign({}, blockWithImageNode, nodeData));
  return nodeId;
}
