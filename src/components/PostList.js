import React, { useState, useEffect } from "react"
import _ from "lodash"

import { Link } from "gatsby"

const checkIsScrollAtBottom = () => {
  return (
    document.documentElement.scrollHeight -
      document.documentElement.scrollTop <=
    document.documentElement.clientHeight + 100
  )
}

const PostList = ({ postList }) => {
  const [postCount, setPostCount] = useState(10)

  const handleMoreLoad = _.throttle(() => {
    if (checkIsScrollAtBottom() && postCount < postList.length) {
      setTimeout(() => setPostCount(postCount + 10), 300)
    }
  }, 250)

  useEffect(() => {
    window.addEventListener("scroll", handleMoreLoad)

    return () => {
      window.removeEventListener("scroll", handleMoreLoad)
    }
  }, [postCount, postList])

  useEffect(() => {
    setPostCount(10)
  }, [postList])

  return (
    <div>
      {postList.slice(0, postCount).map(post => {
        const { title, date, description, tags } = post.frontmatter
        const { slug } = post.fields

        return (
          <li key={slug}>
            <article
              className="post-list-item"
              itemScope
              itemType="http://schema.org/Article"
            >
              <Link to={slug} itemProp="url">
                <header>
                  <h2>
                    <span itemProp="headline">{title}</span>
                  </h2>
                  <small>{date}</small>
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: description,
                    }}
                    itemProp="description"
                  />
                </section>
              </Link>

              <div className="flex gap-[1rem]">
                {tags &&
                  tags.map(tag => {
                    return (
                      <Link key={tag} to={`/tags?query=${tag}`}>
                        <div className="bg-gray-500 text-white text-center px-[1rem] rounded-full cursor-pointer">
                          {tag}
                        </div>
                      </Link>
                    )
                  })}
              </div>
            </article>
          </li>
        )
      })}
    </div>
  )
}

export default PostList
