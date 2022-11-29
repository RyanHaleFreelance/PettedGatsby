import * as React from 'react'
import * as Styles from './twoColumn.module.scss'
import c from 'classnames'

const Layout = ({ section, images }) => {
	const pagedata = section.attributes.data;

	let leftdataArray = [];
	let rightdataArray = [];

	for (var i=0; i < pagedata.tcc_left_col_content; i++) {
		let quote = 'tcc_left_col_content_' + i + '_quote';
		let source = 'tcc_left_col_content_' + i + '_source';
		let type = 'tcc_left_col_content_' + i + '_type';
		let image = 'tcc_left_col_content_' + i + '_image';
		let title = 'tcc_left_col_content_' + i + '_title';
		let content = 'tcc_left_col_content_' + i + '_content';

		leftdataArray.push({
			quote: pagedata[quote] ? pagedata[quote] : false,
			source: pagedata[source] ? pagedata[source] : false,
			type: pagedata[type] ? pagedata[type] : false,
			title: pagedata[title] ? pagedata[title] : false,
			content: pagedata[content] ? pagedata[content] : false,
			image: pagedata[image] ? getImageUrl(pagedata[image]) : false,
		});
	}

	for (var i=0; i < pagedata.tcc_right_col_content; i++) {
		let quote = 'tcc_right_col_content_' + i + '_quote';
		let source = 'tcc_right_col_content_' + i + '_source';
		let type = 'tcc_right_col_content_' + i + '_type';
		let image = 'tcc_right_col_content_' + i + '_image';
		let title = 'tcc_right_col_content_' + i + '_title';
		let content = 'tcc_right_col_content_' + i + '_content';

		rightdataArray.push({
			quote: pagedata[quote] ? pagedata[quote] : false,
			source: pagedata[source] ? pagedata[source] : false,
			type: pagedata[type] ? pagedata[type] : false,
			title: pagedata[title] ? pagedata[title] : false,
			content: pagedata[content] ? pagedata[content] : false,
			image: pagedata[image] ? getImageUrl(pagedata[image]) : false,
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
		<div className={c('section', Styles.twoColContent)}>
			<div className="container"> 
				<div className={c('col', 'col-md-1-2', Styles.leftCol)}>
					{
						(leftdataArray) ?
							leftdataArray.map((section, i) => (
								(section.type == 'image') ? 
									<img src={section.image} alt="Image alt" />
								: (section.type == 'text') ?
									<div>
										{
											(section.title) ?
											<h2 className="textBlockTitle">{section.title}</h2>
										: ''
										}
										
										{
											(section.content) ?
												<div classNameName="textBlockInner" dangerouslySetInnerHTML={{__html:section.content}}></div>
											: ''
										}
									</div>
								: (section.type == 'blockquote') ?
									<figure className="quote">
										{ 
											(section.quote) ?
												<blockquote dangerouslySetInnerHTML={{__html:section.quote}}></blockquote>
											: '' 
										}
										{ 
											(section.source) ?
												<figcaption>
													{section.source}
												</figcaption>
											: '' 
										}
									</figure>
								: ''
								
							))
						: ''
					}
				</div>
				<div className={c('col', 'col-md-1-2', Styles.colOffset)}>
				{
						(rightdataArray) ?
							rightdataArray.map((section, i) => (
								(section.type == 'image') ? 
									<img src={section.image} alt="Image alt" />
								: (section.type == 'text') ?
									<div>
										{
											(section.title) ?
											<h2 className="textBlockTitle">{section.title}</h2>
										: ''
										}
										
										{
											(section.content) ?
												<div classNameName="textBlockInner" dangerouslySetInnerHTML={{__html:section.content}}></div>
											: ''
										}
									</div>
								: (section.type == 'blockquote') ?
									<figure className="quote">
										{ 
											(section.quote) ?
												<blockquote dangerouslySetInnerHTML={{__html:section.quote}}></blockquote>
											: '' 
										}
										{ 
											(section.source) ?
												<figcaption>
													{section.source}
												</figcaption>
											: '' 
										}
									</figure>
								: ''
								
							))
						: ''
					}
				</div>
			</div>
		</div>
	)
}

export default Layout