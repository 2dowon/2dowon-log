import React from "react"
import { Link } from "gatsby"

const Tag = ({ tag }) => {
  return (
    <Link key={tag} to={`/tags?query=${tag}`}>
      <div className="bg-gray-4 text-gray-8 text-center px-[0.8rem] py-[0.3rem] rounded-full cursor-pointer text-detail-4">
        {tag}
      </div>
    </Link>
  )
}

export default Tag
