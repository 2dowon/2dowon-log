/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            github
            tistory
          }
        }
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author
  const social = data.site.siteMetadata?.social

  return (
    <div className="bio">
      <StaticImage
        className="bio-avatar"
        layout="fixed"
        formats={["auto", "webp", "avif"]}
        src="../images/profile-pic.jpeg"
        width={80}
        height={80}
        quality={95}
        alt="Profile picture"
      />
      {author?.name && (
        <div className="space-y-[.2rem]">
          <div className="font-bold text-lg">@{author.name}</div>
          <div className="text-gray-500">{author?.summary || null}</div>
          <div className="flex gap-[1rem]">
            <a
              className="hover:text-blue-500"
              href={`https://github.com/${social?.github || ``}`}
            >
              GitHub
            </a>
            <a
              className="hover:text-blue-500"
              href={`https://${social?.tistory || ``}.tistory.com`}
            >
              Tistory
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

export default Bio
