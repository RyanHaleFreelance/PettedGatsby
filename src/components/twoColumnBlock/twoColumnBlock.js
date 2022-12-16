import * as React from 'react'
import * as Styles from './twoColumnBlock.module.scss'
import c from 'classnames'
import { useEffect } from "react"

const Layout = ({ section }) => {
	const pagedata = section.attributes.data;

	return (
		<div className={c(Styles.tcb, 'container', 'container--center', 'margin-top-bot')}>
			<div className={Styles.tcbWrapper}>
				<div className={Styles.tcbLeft} dangerouslySetInnerHTML={{__html: pagedata.tc_left_column}}></div>
				<div className={Styles.tcbRight} dangerouslySetInnerHTML={{__html: pagedata.tc_right_column}}></div>
			</div>
		</div>
	)
}

export default Layout