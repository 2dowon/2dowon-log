import * as React from "react"
import { Link } from "gatsby"
import { FaTags } from "react-icons/fa"

const Header = () => {
  return (
    <header className="flex justify-between w-full mt-0 items-center px-[1rem]">
      <h1 className="text-heading-2 mt-[1rem]">
        <Link to="/">2dowon's log</Link>
      </h1>
      <div>
        <Link to="/tags" className="text-body-4 text-gray-7 hover:text-green">
          <FaTags />
        </Link>
      </div>
    </header>
  )
}

export default Header
