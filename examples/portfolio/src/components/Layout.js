import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql, Link } from 'gatsby'

const Layout = ({ children }) => (
  <div className="container">
    <Header />
    <main className="padding-vertical-xl">{children}</main>
    <Footer />
  </div>
)

const Header = () => {
  return (
    <header className="padding-top-xs">
      <div>
        <Link to="/">Home</Link>
      </div>
    </header>
  )
}

const Footer = () => {
  return (
    <footer className="padding-vertical-s">
      © {new Date().getFullYear()}, Built with
      {` `}
      <a href="https://www.gatsbyjs.org">Gatsby</a>
    </footer>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
