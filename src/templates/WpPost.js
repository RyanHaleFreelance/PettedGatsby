import React from "react"
import { graphql } from "gatsby"

const WpPost = ({data}) => {
  return (
    <div>
        <h1>{data.wpPost.title}</h1>
        <div dangerouslySetInnerHTML={{__html: data.wpPost.content}}></div>
    </div>
  )
}

export const query = graphql`
  query ($id: String) {
    wpPost(id: { eq: $id }) {
      id
      title
      content
    }
  }
`

export default WpPost