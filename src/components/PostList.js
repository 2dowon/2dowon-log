import React, { useState, useEffect } from "react"
import _ from "lodash"
import { Link } from "gatsby"
import Tag from "./Tag"

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
          <article
            key={slug}
            className="post-list-item border-b-[1px] border-gray-4 py-[2rem] group"
            itemScope
            itemType="http://schema.org/Article"
          >
            <Link to={slug} itemProp="url">
              <header>
                <h2>
                  <span className="font-bold text-heading-5 text-gray-10 group-hover:text-green">
                    {title}
                  </span>
                </h2>
                <small className="flex justify-end text-gray-7">{date}</small>
              </header>
              <section>
                <p
                  dangerouslySetInnerHTML={{
                    __html: description,
                  }}
                  itemProp="description"
                  className="text-gray-9"
                />
              </section>
            </Link>

            <div className="flex gap-[0.5rem] mt-[1rem]">
              {tags &&
                tags.map(tag => {
                  return <Tag tag={tag} />
                })}
            </div>
          </article>
        )
      })}
    </div>
  )
}

export default PostList
