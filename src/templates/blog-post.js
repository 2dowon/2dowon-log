import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogPostTemplate = ({
  data: { previous, next, markdownRemark: post },
}) => {
  return (
    <Layout>
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header className="w-full border-b-[1px] border-gray-4 mb-[2rem]">
          <h1 itemProp="headline">{post.frontmatter.title}</h1>
          <div className="w-full text-sm italic text-right text-gray-8">
            {post.frontmatter.date}
          </div>
          <div className="flex gap-[0.5rem] mt-[1rem] mb-[2rem]">
            {post.frontmatter.tags.map(tag => {
              return (
                <Link key={tag} to={`/tags?query=${tag}`}>
                  <div className="bg-gray-7 text-white text-center px-[0.8rem] rounded-full cursor-pointer">
                    {tag}
                  </div>
                </Link>
              )
            })}
          </div>
        </header>
        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
          className="pb-[3rem]"
        />
        <hr />
        <footer>
          <Bio />
        </footer>
      </article>
      <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li
            className={`list-none bg-gray-3 px-[1rem] h-[5rem] flex justify-center items-center rounded-md ${
              !previous && "invisible"
            }`}
          >
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                <span className="font-medium text-gray-10 text-detail-6">
                  ← {previous.frontmatter.title}
                </span>
              </Link>
            )}
          </li>
          <li
            className={`list-none bg-gray-3 px-[1rem] h-[5rem] flex justify-center items-center rounded-md ${
              !next && "invisible"
            }`}
          >
            {next && (
              <Link to={next.fields.slug} rel="next">
                <span className="font-medium text-gray-10 text-detail-6">
                  {next.frontmatter.title} →
                </span>
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export const Head = ({ data: { markdownRemark: post } }) => {
  return (
    <Seo
      title={post.frontmatter.title}
      description={post.frontmatter.description || post.excerpt}
    />
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        tags
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
