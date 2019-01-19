import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import ContentItem from '../components/ContentItem'

const PageTemplate = ({ data }) => {
  const { title, metadata, contents } = data.arenaChannel
  return (
    <Layout>
      <h1>{title}</h1>
      <p>{metadata.description}</p>
      {contents.map((item, index) => (
        <ContentItem key={index} item={item} />
      ))}
    </Layout>
  )
}

PageTemplate.propTypes = {
  data: PropTypes.object.isRequired,
}

export default PageTemplate

export const pageQuery = graphql`
  query($slug: String!) {
    arenaChannel(slug: { eq: $slug }) {
      title
      metadata {
        description
      }
      contents {
        base_class
        content_html
        description_html
        title
        image {
          childImageSharp {
            fluid(maxWidth: 700) {
              # Choose either the fragment including a small base64ed image, a traced placeholder SVG, or one without.
              ...GatsbyImageSharpFluid_noBase64
            }
          }
        }
      }
    }
  }
`
