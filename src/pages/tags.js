import React, { useState, useEffect } from "react"
import _ from "lodash"
import PropTypes from "prop-types"
import filter from "lodash/filter"

import queryString from "query-string"

// Components
// import { Helmet } from "react-helmet"
import { Link, graphql, navigate } from "gatsby"
import TagList from "../components/TagList"
import PostList from "../components/PostList"
import Layout from "../components/layout"

const TagsPage = ({
  data: {
    allMarkdownRemark: { group: tags, nodes: posts },
    site: {
      siteMetadata: { title },
    },
  },
  location,
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
    <Layout location={location} title={title}>
      {/* <Helmet title={title} /> */}

      <div>
        {selected ? (
          <h1>
            There are {filteredPosts.length} post
            {filteredPosts.length > 1 && "s"} that match #{selected}.
          </h1>
        ) : (
          <h1>
            There are {tags.length} tag{tags.length > 1 && "s"}.
          </h1>
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
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 2000) {
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
