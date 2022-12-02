import * as React from 'react'
import * as Styles from './ctaBlock.module.scss'

const Layout = ({ section, images }) => {
	const pagedata = section.attributes.data;
	let title = pagedata.cta_title;
	let content = pagedata.cta_text;
	let btnLink = pagedata.cta_button_link.url;
	let btnText = pagedata.cta_button_text;

	return (
		<div className="section bg-alt">
			<div className="cta container"> 
				<div className="col col-1-1 align-text-center aligncenter">
					{
						(title) ?
							<h2 className="textBlockTitle" dangerouslySetInnerHTML={{__html: title}}></h2>
						: ''
					}
					{
						(content) ? 
							<p dangerouslySetInnerHTML={{__html: content}}></p>
						: ''
					}
					{
						(btnLink) ? 
							<a href={btnLink} className="btn">{btnText}</a>
						: ''
					}
				</div>
			</div>
		</div>
	)
}

export default Layout