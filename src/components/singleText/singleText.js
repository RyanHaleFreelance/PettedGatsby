import * as React from 'react'
import * as Styles from './singleText.module.scss'

const Layout = ({ section, images }) => {
	const pagedata = section.attributes.data;

	return (
		<div className="section">
			<div className="container align-text-center items-center"> 
				<div className="single-column" dangerouslySetInnerHTML={{__html:pagedata.sct_text}}></div>
			</div>
		</div>
	)
}

export default Layout