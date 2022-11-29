import * as React from 'react'
import * as Styles from './hero.module.scss'
import c from 'classnames'
import Ratings from '../ratings/ratings'

const Layout = ({ section, title, ratings }) => {
	let button_text = section.heroButtonText;
	let button_link = section.heroButtonLink.url;
	let hero_image = section.heroImage.sourceUrl;
	let hero_image_alt = section.heroImage.altText;
	let hero_image_mobile = section.heroMobileImage.sourceUrl;
	let hero_content = section.heroContent;

	return (
		<header className={c(Styles.pageHeader, Styles.home)} id="page-header">
			<div className="container">
				<div className="col col-lg-1-2">
					<h2 className={Styles.pageHeaderTitle}>{title}</h2>
					<div dangerouslySetInnerHTML={{__html: hero_content}}></div>
					<a href={button_link} className="btn btn--alt btn--large">{button_text}</a>
					<Ratings info={ratings}></Ratings>
				</div>
				<div className="col col-lg-1-2">
					<picture className={Styles.heroImage}>
						<source media="(max-width: 1023px)" srcset={hero_image_mobile} />
						<source media="(min-width: 1023px)" srcset={hero_image} />
						<img src={hero_image} alt={hero_image_alt} className="skip-lazy" />
					</picture>
				</div>
			</div>
		</header>  
	)
}

export default Layout