import * as React from "react"
import Header from "./Header"

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <main className="global-wrapper">{children}</main>
      <footer className="text-center mt-[5rem]">
        © 2dowon, Built with
        <a href="https://www.gatsbyjs.com" className="text-green ml-[0.3rem]">
          Gatsby
        </a>
      </footer>
    </div>
  )
}

export default Layout
