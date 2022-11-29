import * as React from 'react'
import * as Styles from './blockQuote.module.scss'
import c from 'classnames'

const Layout = ({ section, images }) => {
	const pagedata = section.attributes.data;
	
	return (
		<div class="section bg-alt align-text-center">
			<div class="cta container"> 
				<div class="col col-1-1 aligncenter">
					<figure class="quote">
						{ 
							(pagedata.quote) ?
								<blockquote dangerouslySetInnerHTML={{__html:pagedata.quote}}></blockquote>
							: '' 
						}
						{ 
							(pagedata.source) ?
								<figcaption>
									{pagedata.source}
								</figcaption>
							: '' 
						}
					</figure>
				</div>
			</div>
		</div>
	)
}

export default Layout