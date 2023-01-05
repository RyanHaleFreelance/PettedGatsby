import * as React from 'react'
import * as Styles from './prosCons.module.scss'

const Layout = ({ title, pros, cons }) => {
	return (
		<section>
			<h2>Pros & Cons of {title} pet insurance</h2>
			<div className={Styles.prosCons}>
				{
					(pros.length > 0) ? 
						<ul className={Styles.listPros}>
						{
							pros.map((item, index) => (
								<li>{item.item}</li>
							))
						}
						</ul>
					: ''
				}
					{
					(cons.length > 0) ? 
						<ul className={Styles.listCons}>
						{
							cons.map((item, index) => (
								<li>{item.item}</li>
							))
						}
						</ul>
					: ''
				}
			</div>
		</section>
	)
}

export default Layout