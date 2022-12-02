import * as React from 'react'
import { useStaticQuery, graphql } from "gatsby"
import GravityFormForm from "gatsby-plugin-gravity-forms";

const Layout = () => {
	const data = useStaticQuery(graphql`
    {
        wpGfForm(databaseId: { eq: 1 }) {
			...GravityFormFields
		}
    }
  `)

	return (
		<GravityFormForm data={data}></GravityFormForm>
	)
}

export default Layout