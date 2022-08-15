import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import filter from "lodash/filter"

import queryString from "query-string"

// Components
// import { Helmet } from "react-helmet"
import { graphql, navigate } from "gatsby"
import TagList from "../components/TagList"
import PostList from "../components/PostList"
import Layout from "../components/layout"

const TagsPage = ({
  data: {
    allMarkdownRemark: { group: tags, nodes: posts },
  },
}) => {
  const [selected, setSelected] = useState()
  const [filteredPosts, setFilteredPosts] = useState([])

  let query = null
  if (typeof document !== "undefined") {
    query = document.location.search
  }

  useEffect(() => {
    if (!selected) {
      setFilteredPosts(posts)
      return
    }

    setFilteredPosts(
      filter(posts, post => post.frontmatter.tags.indexOf(selected) !== -1)
    )
  }, [selected])

  useEffect(() => {
    const _query = queryString.parse(query)["query"]
    setSelected(_query)
  }, [query])

  return (
    <Layout>
      {/* <Helmet title={title} /> */}

      <div>
        {selected ? (
          <div className="text-body-4 pc:text-heading-6 mb-[1rem] font-bold">
            There are {filteredPosts.length} post
            {filteredPosts.length > 1 && "s"} that match #{selected}.
          </div>
        ) : (
          <div className="text-body-4 pc:text-heading-6 mb-[1rem] font-bold">
            There are {tags.length} tag{tags.length > 1 && "s"}.
          </div>
        )}

        <TagList
          count
          tagList={tags}
          selected={selected}
          onClick={tag => {
            if (tag === selected) {
              navigate("/tags")
            } else {
              setSelected(tag)
            }
          }}
        />
      </div>

      <PostList postList={filteredPosts} />
    </Layout>
  )
}

TagsPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      group: PropTypes.arrayOf(
        PropTypes.shape({
          fieldValue: PropTypes.string.isRequired,
          totalCount: PropTypes.number.isRequired,
        }).isRequired
      ),
    }),
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }),
    }),
  }),
}

export default TagsPage

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
          tags
        }
      }
    }
  }
`
