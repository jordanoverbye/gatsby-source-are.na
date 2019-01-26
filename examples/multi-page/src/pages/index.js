import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import Layout from '../components/Layout'
import SEO from '../components/Seo'

const HomePage = () => {
  return (
    <Layout>
      <SEO title={'Home'} />
      <StaticQuery
        query={graphql`
          {
            arenaChannel(slug: { eq: "gatsby-source-arena-portfolio" }) {
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
                            # Choose either the fragment including a small base64ed image, a traced placeholder SVG, or one without.
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
        `}
        render={data => {
          return (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gridColumnGap: '2rem',
                gridRowGap: '4rem',
              }}
            >
              {data.arenaChannel.children
                .filter(item => item.__typename === 'ArenaInnerChannel')
                .map((item, index) => {
                  return (
                    <article key={index}>
                      {item.children.slice(0, 1).map((block, index) => (
                        <Link to={`/${item.slug}`} key={index}>
                          <Img fluid={block.image.childImageSharp.fluid} />
                        </Link>
                      ))}
                      <h3 className="margin-vertical-xs">{item.title}</h3>
                      <Link to={`/${item.slug}`}>View Project</Link>
                    </article>
                  )
                })}
            </div>
          )
        }}
      />
    </Layout>
  )
}

HomePage.propTypes = {}

export default HomePage
