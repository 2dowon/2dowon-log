import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Tag from "../components/Tag"
import { Utterances } from "../components/Utterances"

const BlogPostTemplate = ({
  data: { previous, next, markdownRemark: post, site },
}) => {
  const utterances = site.siteMetadata.comment.utterances
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
              return <Tag tag={tag} />
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
      {!!utterances && <Utterances repo={utterances} theme="github-light" />}
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
    site {
      siteMetadata {
        comment {
          utterances
        }
      }
    }
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
