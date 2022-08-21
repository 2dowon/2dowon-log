import React from "react"
import { Link } from "gatsby"

const spaceToDash = text => {
  return text.replace(/\s+/g, "-")
}

const TagList = ({ tagList, count, selected }) => {
  if (!tagList) return null

  if (!count) {
    return (
      <div>
        {tagList.map((tag, i) => (
          <Link key={JSON.stringify({ tag, i })} to={`/tags?query=${tag}`}>
            <div>{spaceToDash(tag)}</div>
          </Link>
        ))}
      </div>
    )
  }

  return (
    <div className="flex gap-[0.8rem] flex-wrap">
      {tagList.map((tag, i) => {
        const isSelectedTag = selected === tag.fieldValue
        return (
          <Link
            key={JSON.stringify({ tag, i })}
            to={isSelectedTag ? "/tags" : `/tags?query=${tag.fieldValue}`}
          >
            <div
              className={`${
                isSelectedTag
                  ? "bg-green text-[#FCF6F5]"
                  : "bg-gray-9 text-white"
              } text-center px-[0.8rem] py-[0.2rem] rounded-full cursor-pointer pc:hover:bg-green pc:hover:text-[#FCF6F5]`}
            >
              {spaceToDash(tag.fieldValue)} ({tag.totalCount})
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export default TagList
