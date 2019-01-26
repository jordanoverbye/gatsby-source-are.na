import React from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import SEO from '../components/Seo'

const PageTemplate = ({ data }) => {
  const {
    title,
    metadata: { description },
    children,
  } = data.arenaInnerChannel
  return (
    <Layout>
      <SEO title={title} />
      <section className="margin-bottom-m">
        <h1 className="margin-bottom-xs">{title}</h1>
        <p className="no-margin">{description}</p>
      </section>
      <section>
        {children
          .filter(item => item.__typename === 'ArenaBlock')
          .map((item, index) => {
            return (
              <div className="margin-bottom-s" key={index}>
                <Img fluid={item.image.childImageSharp.fluid} />
              </div>
            )
          })}
      </section>
    </Layout>
  )
}

PageTemplate.propTypes = {
  data: PropTypes.object.isRequired,
}

export default PageTemplate

export const pageQuery = graphql`
  query($slug: String!) {
    arenaInnerChannel(slug: { eq: $slug }) {
      title
      metadata {
        description
      }
      children {
        __typename
        ... on ArenaBlock {
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
`
