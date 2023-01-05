import * as React from 'react'
import * as Styles from './accordionArchive.module.scss'
import c from 'classnames'
import { useState } from "react"
import Accordion from '../archiveAccordionSingle/archiveAccordionSingle'

const Layout = ({ data, key }) => {

	return (
		<div className={c(Styles.accordionWrapper, 'col', 'col-1-1')}>
			<ul className={Styles.accordion} data-open-first="true">
				{
					Object.values(data).map((item, index) => {
						return (
							<Accordion item={item} key={index}></Accordion>
						)
					})
				}
			</ul>
		</div>
	)
}

export default Layout