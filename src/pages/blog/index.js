import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../../components/layout"
import SEO from "../../components/seo"

const BlogIndex = props => {
  const { data } = props
  const posts = data.allMarkdownRemark.edges

  const tag = (link, tag) => {
    return (
      <a href={link}>
        <span className="inline-block rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 border-accent-5 border block hover:bg-accent-3 hover:text-white hover:border-accent-3">
          #{tag}
        </span>
      </a>
    )
  }

  return (
    <Layout>
      <SEO title="All posts" />
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        return (
          <article
            key={node.fields.slug}
            className="mb-6 rounded shadow-md p-3 border-gray-100 hover:bg-gray-100"
          >
            <Link to={node.fields.slug}>
              <h3 className="font-semibold text-2xl">{title}</h3>

              <header className="mb-1">
                <small className="italic text-gray-500">
                  {node.frontmatter.date}
                </small>
              </header>
              <section className="mb-4">
                <p
                  dangerouslySetInnerHTML={{
                    __html: node.frontmatter.description || node.excerpt,
                  }}
                />
              </section>
            </Link>
            <section>
              {tag("#","SQL")}
              {tag("#","PowerShell")}
              {tag("#","Meta")}
            </section>
          </article>
        )
      })}
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`
