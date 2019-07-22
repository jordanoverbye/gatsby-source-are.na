import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import ContentItem from '../components/ContentItem'
import Layout from '../components/layout'
import SEO from '../components/seo'

const IndexPage = ({ children }) => (
  <Layout>
    <SEO title="Home" />
    <StaticQuery
      query={graphql`
        {
          arenaChannel(slug: { eq: "gatsby-source-are-na-test" }) {
            title
            metadata {
              description
            }
            children {
              __typename
              ... on ArenaBlock {
                title
                content_html
                description_html
                image {
                  childImageSharp {
                    fluid(maxWidth: 1204) {
                      ...GatsbyImageSharpFluid_noBase64
                    }
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
            {data.arenaChannel.metadata.description && (
              <p>{data.arenaChannel.metadata.description}</p>
            )}
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(3, 1fr)`,
              gridGap: `2rem`,
            }}
          >
            {data.arenaChannel.children.map((item, index) => (
              <ContentItem key={index} item={item} />
            ))}
          </div>
        </section>
      )}
    />
  </Layout>
)

export default IndexPage
