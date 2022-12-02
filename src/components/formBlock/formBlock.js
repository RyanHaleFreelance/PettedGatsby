import * as React from 'react'
import c from 'classnames'
import Af from '../affiliateForm/affiliateForm'
import Cf from '../contactForm/contactForm'
import Vf from '../videoForm/videoForm'

	const Layout = ({ section, images }) => {
	const pagedata = section.attributes.data;
	let title = pagedata.form_title;
	let content = pagedata.form_content;
	let align = pagedata.form_alignment;
	let just = pagedata.form_justification;
	let image = getImageUrl(pagedata.form_image);
	let id = parseInt(pagedata.form_id);

  	function getImageUrl(id) {
		for (var i = 0; i < images.length; i++){
			if (images[i].node.databaseId === id){
			return images[i].node.sourceUrl;
			}
		}
	}

	return (
		<div className="section bg-alt">
			<div className={c('container', 'items-center', {'flex-reverse': align == 1})}> 
				<div className={c('col', 'col-md-1-2', {'align-text-center': just == 1})}>
					{
						(title) ?
							<h2 className="textBlockTitle" dangerouslySetInnerHTML={{__html: title}}></h2>
						: ''
					}
					{
						(content) ? 
							<div className="textBlockInner">
								<p dangerouslySetInnerHTML={{__html: content}}></p>
							</div>
						: ''
					}
					<div className="med-up">
						<div className="image-mask">
							<img src={image} alt={title} />
						</div>
					</div>
				</div>
				<div className="col col-md-1-2 align-text-center">
					{
						(id == 1) ? 
							<Cf></Cf>
						: (id == 2) ? 
							<Af></Af>
						: (id == 3) ?
							<Vf></Vf>
						: ''
					}
				</div>
			</div>
		</div>
	)
}

export default Layout