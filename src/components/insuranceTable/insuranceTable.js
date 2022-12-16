import * as React from 'react'
import '../genericText/genericText.css'
import c from 'classnames'

const Layout = ({ section, images }) => {
	const pagedata = section.attributes.data;

	let grey = pagedata.it_make_section_grey;
	let dataArray = [];
	let title = pagedata.table_title;
	let left = pagedata.table_left_column;
	let right = pagedata.table_right_column;
	let lower = pagedata.lower_section;

	for (var i=0; i < pagedata.table_rows; i++) {
		let left = 'table_rows_' + i + '_left_column';
		let right = 'table_rows_' + i + '_right_column';
		let title = 'table_rows_' + i + '_title';
		let popup = 'table_rows_' + i + '_pop_up_text';

		dataArray.push({
			left: pagedata[left],
			right: pagedata[right],
			title: pagedata[title],
			popup: pagedata[popup]
		});
	}

	const openModal = (elem) => {
		if (typeof window !== 'undefined') {
			let data = elem.target.dataset.desc;
			let title = elem.target.innerHTML;
			document.getElementById('pemodal').querySelector('.pe-modal__text p').innerHTML = data;
			document.getElementById('pemodal').querySelector('.pe-modal__title p').innerHTML = title;
			document.getElementById('pemodal').classList.add('is-open');
			document.querySelector('body').classList.add('hasModal');
		}
	}

	return (
		<section className={c('section', {'section--grey': grey == 1})}>
			<div class="pe-container">
				<div class="pe-table">
					<h3 className="pe-table__header pe-table__header--mobile" dangerouslySetInnerHTML={{__html:title}}></h3>
					<div class="pe-table__headers">
						<div class="pe-table__header pe-table__50">
							<h3 dangerouslySetInnerHTML={{__html:title}}></h3>
						</div>
						<div className="pe-table__header-btn pe-table__25" dangerouslySetInnerHTML={{__html:left}}></div>
						<div className="pe-table__header-btn pe-table__25" dangerouslySetInnerHTML={{__html:right}}></div>
					</div>
					{
						dataArray.map((section, i) => (
							<div class="pe-table__row">
								<div class="pe-table__link pe-table__50 ">
									<a href="javascript:void(0);" onClick={openModal} data-desc={section.popup}>{section.title}</a>
								</div>
								<div className="pe-table__result pe-table__25" dangerouslySetInnerHTML={{__html:section.left}}></div>
								<div className="pe-table__result pe-table__25" dangerouslySetInnerHTML={{__html:section.right}}></div>
							</div>
						)) 
					}
				</div>
				<div class="pe-summary">
					<div class="pe-summary__btn">
						<a href="javascript:void(0);" class="pe-btn pe-btn--speech">Quick Summary</a>
					</div>
					<div className="pe-summary__text" dangerouslySetInnerHTML={{__html:lower}}></div>
				</div>
			</div>
		</section>
	)
}

export default Layout