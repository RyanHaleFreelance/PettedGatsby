import * as React from 'react'
import * as Styles from './featuredContent.module.scss'
import c from 'classnames'

const Layout = ({ section, title, path }) => {
	return (
		<div className="section">
			<div className={c(Styles.singleFeatured, 'container', 'container--1300')}>
				{
					(title) ?
						<div className={Styles.singleFeaturedUpperTitle}>
							<h3>{title}</h3>
						</div>
					: ''
				}
				<div className={c(Styles.singleFeaturedWrapper)}>
					{
						section.map((featured, index) => {
							const inner = path;
							let image = null;
							if (featured[inner]?.featuredImage?.node?.sourceUrl?.length > 0) {
								image = featured[inner].featuredImage.node.sourceUrl;
							}
							return (
								(image) ?
									<a href={featured[inner].link} className={Styles.singleFeaturedCard} style={{ backgroundImage: `url('${featured[inner].featuredImage.node.sourceUrl}')`}}>
										<div className={Styles.singleFeaturedDate}>
											<p>{featured[inner].date}</p>
										</div>
										<div className={Styles.singleFeaturedTitle}>
											<h2>{featured[inner].title}</h2>
										</div>
									</a>
								: 
								<a href={featured[inner].link} className={Styles.singleFeaturedCard} style={{ backgroundImage: `url('https://dev-petted2.pantheonsite.io/wp-content/uploads/2022/01/hero-bg-mob.jpg')`}}>
									<div className={Styles.singleFeaturedDate}>
										<p>{featured[inner].date}</p>
									</div>
									<div className={Styles.singleFeaturedTitle}>
										<h2>{featured[inner].title}</h2>
									</div>
								</a>
							)
						})
					}
				</div>
			</div>
		</div>
	)
}

export default Layout