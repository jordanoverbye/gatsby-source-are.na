import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql, Link } from 'gatsby'

const Layout = ({ children }) => (
  <div style={{ maxWidth: '1024px', margin: '0 auto' }}>
    <Header />
    <div>{children}</div>
    <footer>
      © {new Date().getFullYear()}, Built with
      {` `}
      <a href="https://www.gatsbyjs.org">Gatsby</a>
    </footer>
  </div>
)

const Header = () => {
  return (
    <header>
      <StaticQuery
        query={graphql`
          {
            allArenaChannel {
              edges {
                node {
                  slug
                  title
                }
              }
            }
          }
        `}
        render={data => {
          return (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Link to="/">Home</Link>
              <nav>
                <ul>
                  {data.allArenaChannel.edges.map((item, index) => (
                    <li key={index}>
                      <Link to={`/${item.node.slug}`}>{item.node.title}</Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          )
        }}
      />
    </header>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
