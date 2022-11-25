import * as React from 'react'
import * as Styles from './accordion.module.scss'
import c from 'classnames'
import { useState } from "react"

const Layout = ({ data, key }) => {

	const [expanded, setExpanded] = useState(false);

	const toggleExpand = (elem) => {
		if(elem.target.parentElement.parentElement.classList.contains('accordion-module--open--657d7')) {
			elem.target.parentElement.parentElement.classList.remove("accordion-module--open--657d7");
			elem.target.parentElement.parentElement.querySelector('.accordionContent').classList.remove('accordion-module--accordionContentActive--6696e');
			setExpanded(false);
		} else {
			if (typeof window !== 'undefined') {
				var elements = document.getElementsByClassName('accordion-module--open--657d7');
				var elements2 = document.getElementsByClassName('accordion-module--accordionContentActive--6696e');
				
				while(elements.length > 0){
					elements[0].classList.remove('accordion-module--open--657d7');
				}
		
				while(elements2.length > 0){
					elements2[0].classList.remove('accordion-module--accordionContentActive--6696e');
				}

				setExpanded(true);
				elem.target.parentElement.parentElement.classList.add("accordion-module--open--657d7");
				elem.target.parentElement.parentElement.querySelector('.accordionContent').classList.add('accordion-module--accordionContentActive--6696e');
			}
		}
	}

	return (
		<li className={c(Styles.accordionItem, 'accordionItem', {[Styles.open]: expanded == true})}>
			<h3 className={Styles.accordionTitle}>
				<button
				aria-expanded="false"
				className={Styles.accordionTrigger}
				aria-controls={'accordion-1-content-' + key}
				id={'accordion-1-trigger-' + key}
				onClick={toggleExpand}>
				{data.title}
				<span className={Styles.accordionHandle}></span>
				</button>
			</h3>
			<div
				id={'accordion-1-content-' + key}
				role="region"
				className={c(Styles.accordionContent, 'accordionContent', 'align-text-left', {[Styles.accordionContentActive]: expanded == true})}
				aria-labelledby={'accordion-1-trigger-' + key} dangerouslySetInnerHTML={{__html: data.text}}
			>
			</div>
		</li>
	)
}

export default Layout