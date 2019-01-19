import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/Layout'

const HomePage = () => {
  return (
    <Layout>
      <StaticQuery
        query={graphql`
          {
            allArenaChannel {
              edges {
                node {
                  slug
                  title
                  metadata {
                    description
                  }
                  contents {
                    image {
                      childImageSharp {
                        fluid(maxWidth: 800) {
                          ...GatsbyImageSharpFluid_noBase64
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
                gridGap: '2rem',
              }}
            >
              {data.allArenaChannel.edges.map((item, index) => (
                <div>
                  <Link to={`/${item.node.slug}`}>
                    <Img
                      fluid={item.node.contents[0].image.childImageSharp.fluid}
                    />
                    <span>{item.node.title}</span>
                    <p>{item.node.metadata.description}</p>
                  </Link>
                </div>
              ))}
            </div>
          )
        }}
      />
    </Layout>
  )
}

HomePage.propTypes = {}

export default HomePage
