import * as React from 'react'
import * as Styles from './textAccordion.module.scss'
import c from 'classnames'
import Accordion from '../accordion/accordion'

const Layout = ({ section, images }) => {
	const pagedata = section.attributes.data;
	let dataArray = [];
	let title = pagedata.ta_text;
	let content = pagedata.ta_content;
	let align = pagedata.ta_alignment;
	let just = pagedata.ta_justification;
	let btnLink = pagedata.ta_button_link.url;
	let btnText = pagedata.ta_button_text;

	for (var i=0; i < pagedata.ta_accordion_items; i++) {
		let textString = 'ta_accordion_items_' + i + '_item_content';
		let titleString = 'ta_accordion_items_' + i + '_item_title';
		dataArray.push({
			title: pagedata[titleString],
			text: pagedata[textString],
		});
	}

	return (
		<div className={c('section')}>
			<div className={c('text-accordion-block', 'container', {'flex-reverse': align == 1})}> 
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
							<a href={btnLink} className="btn btn--trans mt btn--slim">{btnText}</a>
						: ''
					}
				</div>
				<div className="col col-md-1-2 align-text-center">
					{
						(dataArray.length > 0) ? 
							<ul className={Styles.accordion} data-open-first="<?php $open_first_accordion; ?>">
								{ dataArray.map((section, i) => (
									<Accordion data={section} key={i}></Accordion>
								)) }
							</ul>
						: ''
					}
				</div>
			</div>
		</div>
	)
}

export default Layout