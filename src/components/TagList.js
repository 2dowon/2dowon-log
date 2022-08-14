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
    <div>
      {tagList.map((tag, i) => {
        const isSelectedTag = selected === tag.fieldValue
        return (
          <Link
            key={JSON.stringify({ tag, i })}
            to={isSelectedTag ? "/tags" : `/tags?query=${tag.fieldValue}`}
          >
            <div
              selected={isSelectedTag}
              className={`${isSelectedTag && "text-red-500"}`}
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
