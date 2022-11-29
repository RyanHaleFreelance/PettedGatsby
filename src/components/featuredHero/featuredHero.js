import * as React from 'react'
import * as Styles from './featuredHero.module.scss'
import c from 'classnames'

const Layout = ({ section, title }) => {
	let introduction = (section.introduction) ? section.introduction : false;
	let pageTitle = (section.pageTitle) ? section.pageTitle : section.title;
	let showBreadcrumbs = (section.showBreadcrumbs) ? section.showBreadcrumbs : false;
	let image = (section.heroImage) ? section.heroImage.sourceUrl : false;

	return (
		<div className={c('col', 'align-text-center', Styles.featuredHero, {[Styles.featuredHeroWithImage]: image != false})}>
			<h1 className={Styles.pageHeaderTitle} dangerouslySetInnerHTML={{__html:pageTitle}}></h1>
			{
				(introduction) ? 
					<p className={Styles.pageHeaderTitle} dangerouslySetInnerHTML={{__html:introduction}}></p>
				: ''
			}  
			{
				(showBreadcrumbs) ? 
					<p>Breadcrumbs</p>
				: ''
			}
		</div>
	)
}

export default Layout