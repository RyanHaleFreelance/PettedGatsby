import * as React from 'react'
import * as Styles from './plan.module.scss'
import c from 'classnames'

const Layout = ({ section, images }) => {
	const pagedata = section.attributes.data;
	let planTitle = pagedata.plan_title;
	let popoutContent= pagedata.plan_popout_content;
	let popoutBtnText = pagedata.plan_popout_button_text;
	let popoutBtnLink = pagedata.plan_popout_button_link.url
	let popoutImage = getImageUrl(pagedata.plan_popout_background_image);
	let planContent = pagedata.plan_content;
	let badge = pagedata.plan_badge_text;

	function getImageUrl(id) {
		for (var i = 0; i < images.length; i++){
			if (images[i].node.databaseId === id){
			   return images[i].node.sourceUrl;
			}
		}
	}

	return (
		<div className="section bg--dark">
			<div className="plan-block container items-center"> 
				<div className="col col-md-2-5 align-text-center">
					{
						(planTitle) ?
							<h2 className="text-block__title title--padded" dangerouslySetInnerHTML={{__html: planTitle}}></h2>
						: ''
					}
					{
						(planContent) ? 
							<div className="text-block__inner">
								<div dangerouslySetInnerHTML={{__html: planContent}}></div>
							</div>
						: ''
					}
				</div>
				<div className="col col-md-3-5">
					<div className={Styles.popout} style={{ backgroundImage:  `url('${popoutImage}')`}}>
						<div className={Styles.popoutBadge}>{badge}</div>
						<div dangerouslySetInnerHTML={{__html: popoutContent}}></div>
						{
							(popoutBtnLink) ? 
								<a href={popoutBtnLink} className="btn btn--alt btn--slim">{popoutBtnText}</a>
							: ''
						}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Layout