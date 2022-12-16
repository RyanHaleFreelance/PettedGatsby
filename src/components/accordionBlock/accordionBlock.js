import * as React from 'react'
import * as Styles from './accordionBlock.module.scss'
import Accordion from '../accordion/accordion'
import c from 'classnames'

const Layout = ({ section, images }) => {
	const pagedata = section.attributes.data;
	let title = pagedata.accord_title;
	let content = pagedata.accord_content;
	let accordions = pagedata.accord_accordions;
	let accordArray = [];

	for (var i=0; i < accordions; i++) {
		let amount = 'accord_accordions_' + i + '_accordion_items';
		let title = 'accord_accordions_' + i + '_accordion_title';

		let forAmount = pagedata[amount];
		let faqs = loadFaqs(i, forAmount);
	
		accordArray.push({
			title: pagedata[title],
			faqs: faqs
		})
	}

	function loadFaqs(i, amount) {
		let array = [];
		for (var d=0; d < amount; d++) {
			let content = 'accord_accordions_' + i + '_accordion_items_' + d + '_item_content';
			let title = 'accord_accordions_' + i + '_accordion_items_' + d + '_item_title';

			array.push({
				title: pagedata[title],
				text: pagedata[content]
			})
		}
		return array;
	}

	return (
		<div className="section">
			<div className="container">
				<header className="section__header align-text-center col col-1-1">
				{
						(title) ?
							<h2 className="section-title" dangerouslySetInnerHTML={{__html: title}}></h2>
						: ''
					}
					{
						(content) ? 
							<div className="textBlockInner">
								<p dangerouslySetInnerHTML={{__html: content}}></p>
							</div>
						: ''
					}
				</header>
				{
					accordArray.map((section, i) => (
						<div className={c(Styles.accordionWrapper, 'col' ,'col-1-1')}>
							<h3>{section.title}</h3>
							<ul className={Styles.accordion}>
							{
								section.faqs.map((section, i) => (
									<Accordion data={section} key={i}></Accordion>
								)) 
							}
							</ul>
							
						</div>
					)) 
				}
			</div>
		</div>
	)
}

export default Layout