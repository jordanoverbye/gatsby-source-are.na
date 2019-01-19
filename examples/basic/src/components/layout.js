import React from 'react'
import PropTypes from 'prop-types'

const Layout = ({ children }) => (
  <div style={{ padding: '2rem' }}>
    <div>{children}</div>
    <footer>
      © {new Date().getFullYear()}, Built with
      {` `}
      <a href="https://www.gatsbyjs.org">Gatsby</a>
    </footer>
  </div>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
