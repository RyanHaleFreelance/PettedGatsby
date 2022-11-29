import * as React from 'react'
import * as Styles from './steps.module.scss'

const Layout = ({ section, images }) => {
	const pagedata = section.attributes.data;

	let dataArray = [];
	let buttonText = pagedata.sbs_button_text;
	let buttonLink = pagedata.sbs_button_link.url;
	let title = pagedata.sbs_title;
	let content = pagedata.sbs_introduction;

	for (var i=0; i < pagedata.sbs_steps; i++) {
		let imageString = 'sbs_steps_' + i + '_icon';
		let textString = 'sbs_steps_' + i + '_content';
		let titleString = 'sbs_steps_' + i + '_title';
		dataArray.push({
			title: pagedata[titleString],
			text: pagedata[textString],
			image: getImageUrl(pagedata[imageString]),
		});
	}

	function getImageUrl(id) {
		for (var i = 0; i < images.length; i++){
			if (images[i].node.databaseId === id){
			   return images[i].node.sourceUrl;
			}
		}
	}

	return (
		<div className="section">
			<div className="text-image-block container full items-center align-text-center"> 
				<div className="col col-md-1-1">
					{
						(title) ? 
							<h2 className={Styles.textBlockTitle}>{title}</h2> 
						: ''
					}
					{
						(content) ? 
							<div className="textBlockInner">
								{content}
							</div>
						: ''
					}
				</div>
				{
					(dataArray.length > 0) ? 
						<div className="col col-md-1-1">
							<ol className="steps flex">
								{
									dataArray.map((section, i) => (
										<li>
											<img src={section.image} alt={section.title + ' icon'} className="step__icon" loading="lazy" />
											<h3 className="step__title">{section.title}</h3>
											<p dangerouslySetInnerHTML={{__html:section.text}}></p>
										</li>
									))
								}
							</ol>
						</div>
					: ''
				}
				<div className="col col-md-1-1">
					{
						(buttonLink) ? 
							<a href={buttonLink} className="btn">{buttonText}</a>
						: ''
					}
				</div>
			</div>
		</div>
	)
}

export default Layout