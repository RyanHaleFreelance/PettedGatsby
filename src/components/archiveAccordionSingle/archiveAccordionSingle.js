import * as React from 'react'
import * as Styles from './archiveAccordionSingle.module.scss'
import c from 'classnames'
import { useState } from "react"

const Layout = ({ item, key }) => {

	const [expanded, setExpanded] = useState(false);

	const toggleExpand = (elem) => {
		if(elem.target.parentElement.parentElement.classList.contains('archiveAccordionSingle-module--open--1b8f5')) {
			elem.target.parentElement.parentElement.classList.remove("archiveAccordionSingle-module--open--1b8f5");
			elem.target.parentElement.parentElement.querySelector('.accordionContent').classList.remove('archiveAccordionSingle-module--accordionContentActive--99d37');
			setExpanded(false);
		} else {
			if (typeof window !== 'undefined') {
				var elements = document.getElementsByClassName('archiveAccordionSingle-module--open--1b8f5');
				var elements2 = document.getElementsByClassName('archiveAccordionSingle-module--accordionContentActive--99d37');
				
				while(elements.length > 0){
					elements[0].classList.remove('archiveAccordionSingle-module--open--1b8f5');
				}
		
				while(elements2.length > 0){
					elements2[0].classList.remove('archiveAccordionSingle-module--accordionContentActive--99d37');
				}

				setExpanded(true);
				elem.target.parentElement.parentElement.classList.add("archiveAccordionSingle-module--open--1b8f5");
				elem.target.parentElement.parentElement.querySelector('.accordionContent').classList.add('archiveAccordionSingle-module--accordionContentActive--99d37');
			}
		}
	}

	return (
		<li className={c(Styles.accordionItem, 'accordionItem', {[Styles.open]: expanded == true})}>
			<h4 className={Styles.accordionTitle}>
				<button aria-expanded="false" className={Styles.accordionTrigger} aria-controls="accordion-<?php echo $year; ?>-content-<?php echo $month; ?>" id="accordion-<?php echo $year; ?>-trigger-<?php echo $month; ?>" onClick={toggleExpand}>
					{item.monthyear}
					<span className={Styles.accordionHandle}></span>
				</button>
			</h4>
			<div id="accordion-<?php echo $year; ?>-content-<?php echo $month; ?>" role="region" className={c(Styles.accordionContent, 'accordionContent', 'align-text-left', {[Styles.accordionContentActive]: expanded == true})} aria-labelledby="accordion-<?php echo $year; ?>-trigger-<?php echo $month; ?>">
				<ul class="archive-list list--unstyled">
					{
						item.records.map((post, index) => {
							return (
								<li>
									<a href={post.url}>{post.title}</a>
								</li>
							)
						})
					}
				</ul>
			</div>
		</li>
	)
}

export default Layout