import React from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'

const ContentItem = ({ item }) => {
  switch (item.base_class) {
    case 'Block':
      return <Block item={item} />
    case 'Channel':
      return null // TODO
    default:
      return null
  }
}

const Block = ({ item }) => {
  return (
    <article>
      {item.image && (
        <div style={{ marginBottom: '0.5rem' }}>
          {item.image && <Img fluid={item.image.childImageSharp.fluid} />}
        </div>
      )}
      {item.content_html && (
        <div
          dangerouslySetInnerHTML={{ __html: item.content_html }}
          style={{ backgroundColor: '#222', color: '#fff', padding: '1rem' }}
        />
      )}
      {item.title && (
        <div>
          <span>{item.title}</span>
        </div>
      )}
      {item.description_html && (
        <div dangerouslySetInnerHTML={{ __html: item.description_html }} />
      )}
      {item.source && (
        <a href={item.source.url} target="_blank" rel="noopener noreferrer">
          Source: {item.source.title}
        </a>
      )}
    </article>
  )
}

ContentItem.propTypes = {
  item: PropTypes.object.isRequired,
}

export default ContentItem
