import * as React from 'react'
import * as Styles from './planCoverage.module.scss'

const Layout = ({ section, title, text }) => {

	return (
		<div className={Styles.planCoverage}>
			{
				(title) ?
					<div className={Styles.planCoverageTitle}>
						<h3>{title}</h3>
					</div>
				: ''
			}
			{
				(text) ?
					<div className={Styles.planCoverageText}>
						<p>{text}</p>
					</div>
				: ''
			}
			<div className={Styles.planCoverageList}>
				{
					section.map((item, index) => (
						<div className={Styles.planCoverageItem}>
							{
								(item.cross) ?
									<img src="https://dev-petted2.pantheonsite.io/wp-content/uploads/2022/12/cross.svg" alt="Cross Icon" />
								: 
									<img src="https://dev-petted2.pantheonsite.io/wp-content/uploads/2022/12/icon-tick-purple.svg" alt="Tick Icon>" />
							}
							<p>{item.itemText}</p>
						</div>
					))
				}
			</div>
		</div>
	)
}

export default Layout