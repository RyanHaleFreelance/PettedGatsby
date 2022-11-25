import * as React from 'react'
import * as Styles from './test.module.scss'
import c from 'classnames'

const Layout = ({ section, images }) => {
	const pagedata = section.attributes.data;
	let boo = [];
	let bgAlt = pagedata.three_col_bg_alt;
	let leftAlign = pagedata.three_col_left_align;
	let title = pagedata.three_col_title;
	for (var i=0; i < pagedata.three_col_columns; i++) {
		let imageString = 'three_col_columns_' + i + '_image';
		let fullString = 'three_col_columns_' + i + '_full_width_image';
		let textString = 'three_col_columns_' + i + '_text';
		let titleString = 'three_col_columns_' + i + '_title';
		boo.push({
			title: pagedata[titleString],
			text: pagedata[textString],
			image: getImageUrl(pagedata[imageString]),
			full: pagedata[fullString]
		});
	}
	// leftAlign = true;
	console.log(bgAlt, leftAlign, title);
	console.log(boo);

	function getImageUrl(id) {
		for (var i = 0; i < images.length; i++){
			if (images[i].node.databaseId == id){
			   return images[i].node.sourceUrl;
			}
		}
	}

	console.log(boo);

	return (
		<div className={c(Styles.threeCol, " section ", {
			bgAlt: bgAlt == 1,
			leftAlign: leftAlign == 1
		})}>
			<div className={Styles.container}>
				{
					(title) ? 
					<div className={Styles.threeColTitle}>
						<h2>{title}</h2>
					</div> 
					: ''
				}
				{
					(boo.length > 0) ? 
						<div className={Styles.threeColWrapper}>
							{
								boo.map((section, i) => (
									<div className={Styles.threeColColumn}>
										{
											(section.image) ? 
												<div className={Styles.threeColColumnImage}>
													<img src={section.image} alt="test" />
												</div>
											: ''
										}
										{
											(section.title) ? 
												<div className={Styles.threeColColumnTitle}>
													<h3>{section.title}</h3>
												</div>
											: ''
										}
										{
											(section.text) ? 
												<div className={c(Styles.threeColColumnText)} dangerouslySetInnerHTML={{__html: section.text}}></div>
											: ''
										}
									</div>
								))
							}
						</div>
					: ''
				}
			</div>
		</div>
	)
}

export default Layout