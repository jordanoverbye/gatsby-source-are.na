import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import ContentItem from '../components/ContentItem'

const IndexPage = ({ children }) => (
  <StaticQuery
    query={graphql`
      {
        arenaChannel(slug: { eq: "gatsby-source-are-na-test" }) {
          title
          metadata {
            description
          }
          contents {
            base_class
            content_html
            description_html
            title
            source {
              url
              title
            }
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
    `}
    render={data => (
      <section style={{ padding: '2rem' }}>
        <div style={{ marginBottom: '2rem', maxWidth: '500px' }}>
          <h1 style={{ margin: '0 0 1rem 0' }}>{data.arenaChannel.title}</h1>
          {data.arenaChannel.metadata.description &&<p>{data.arenaChannel.metadata.description}</p>}
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(3, 1fr)`,
            gridGap: `2rem`,
          }}
        >
          {data.arenaChannel.contents.map((item, index) => (
            <ContentItem key={index} item={item} />
          ))}
        </div>
      </section>
    )}
  />
)

export default IndexPage
