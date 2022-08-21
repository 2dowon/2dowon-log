import * as React from "react"
import { Link } from "gatsby"
import { FaTags } from "react-icons/fa"

const Header = () => {
  return (
    <header className="flex justify-between w-full mt-0 items-center pc:px-[5rem] px-[1rem] border-b-[1px] border-gray-2">
      <h1 className="mt-[1rem] text-heading-6 font-serif">
        <Link to="/">2dowon's log</Link>
      </h1>
      <div>
        <Link
          to="/tags"
          className="text-body-4 text-gray-7 pc:hover:text-green"
        >
          <FaTags />
        </Link>
      </div>
    </header>
  )
}

export default Header
