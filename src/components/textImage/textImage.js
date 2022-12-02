import * as React from 'react'
import * as Styles from './textImage.module.scss'
import c from 'classnames'

const Layout = ({ section, images }) => {
	const pagedata = section.attributes.data;

	let title = pagedata.tib_title;
	let content = pagedata.tib_content;
	let align = pagedata.tib_alignment;
	let just = pagedata.tib_justify;
	let bg = pagedata.tib_background;
	let btnLink = pagedata.tib_button_link.url;
	let btnText = pagedata.tib_button_text;
	let img = getImageUrl(pagedata.tib_image);

	function getImageUrl(id) {
		for (var i = 0; i < images.length; i++){
			if (images[i].node.databaseId === id){
			   return images[i].node.sourceUrl;
			}
		}
	}

	return (
		<div className={c('section', {'bg-alt': bg == 1})}>
			<div className={c(Styles.textImageBlock, 'container', 'items-center', {'flex-reverse': align == 1})}> 
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
					{
						(btnLink) ? 
							<a href={btnLink} className="btn btn--slim">{btnText}</a>
						: ''
					}
				</div>
				<div className="col col-md-1-2 align-text-center med-up">
					<div className="image-mask">
						<img src={img} alt={title} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Layout