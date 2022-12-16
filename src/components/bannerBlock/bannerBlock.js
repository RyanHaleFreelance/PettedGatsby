import * as React from 'react'
import * as Styles from './bannerBlock.module.scss'
import c from 'classnames'

const Layout = ({ section, images }) => {
	const pagedata = section.attributes.data;
	// let dataArray = [];
	let image = getImageUrl(pagedata.b_background_image);
	let content = pagedata.b_text;
	let btnLink = pagedata.b_button_link;
	let btnText = pagedata.b_button_text;

	function getImageUrl(id) {
		for (var i = 0; i < images.length; i++){
			if (images[i].node.databaseId === id){
			   return images[i].node.sourceUrl;
			}
		}
	}

	return (
		<div className={c(Styles.bannerBlock, 'container', 'container--center', 'margin-top-bot')}>
			<div className={c(Styles.bannerBlockWrapper, {[Styles.bannerBlockWrapperBtn]: btnLink != undefined})}  style={{ backgroundImage: `url('${image}')`}}>
				<div className={Styles.bannerBlockText} dangerouslySetInnerHTML={{__html: content}}></div>
				{
					(btnLink) ? 
						<div className={Styles.bannerBlockButton}>
							<a href={btnLink} className="btn btn--alt">{btnText}</a>
						</div>
					: ''
				}
			</div>
		</div>
	)
}

export default Layout