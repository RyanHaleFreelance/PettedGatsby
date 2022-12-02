import * as React from 'react'
import * as Styles from './classic.module.scss'

const Layout = ({ section, images }) => {
	const pagedata = section.attributes.content;

	return (
		<div className="section main-content" dangerouslySetInnerHTML={{__html:pagedata}}>
		</div>
	)
}

export default Layout