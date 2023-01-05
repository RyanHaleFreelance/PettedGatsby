import * as React from 'react'
import * as Styles from './regHero.module.scss'
import c from 'classnames'
import FeaturedHero from '../featuredHero/featuredHero'

const Layout = ({ section, title }) => {
	let enableFeatured = (section.featuredHero.enableFeaturedHero) ? section.featuredHero.enableFeaturedHero : false;
	let pageTitle = (section.featuredHero.pageTitle) ? section.featuredHero.pageTitle : (title) ? title : section.title;
	let nhhBG = (section.noneHomeHeader.nhhBackgroundImage) ? section.noneHomeHeader.nhhBackgroundImage.sourceUrl : false;
	let nhhMobBG = (section.noneHomeHeader.nhhBackgroundImageMobile) ? section.noneHomeHeader.nhhBackgroundImageMobile.sourceUrl : false;
	let nhhImg = (section.noneHomeHeader.nhhImage) ? section.noneHomeHeader.nhhImage.sourceUrl : false;
	let nhhImgAlt = (section.noneHomeHeader.nhhImage) ? section.noneHomeHeader.nhhImage.altText : 'Petted image';
	let nhhMoveImageDown = (section.noneHomeHeader.nhhMoveImageDown) ? section.noneHomeHeader.nhhMoveImageDown : false;
	let altWave = (section.pageSettings.altHeaderWave) ? section.pageSettings.altHeaderWave : false;

	const nhhStyle = `		
	<style>
		.pageHeaderTitle,
		.breadcrumbs {
			position: relative;
			z-index: 10;
		}
		.pageHeader::before {
			content: "";
			position: absolute;
			background-image: url("${nhhBG}");
			height: 100%;
			width: 100%;
			left: 0;
			top: 0;
			opacity: 0.2;
			pointer-events: none;
			background-position: center;
			background-size: cover;
			background-repeat: no-repeat;
		}
	</style>`;

	const nhhMobStyle = `		
	<style>
		@media screen and (max-width: 767px) {
			.pageHeader::before {
				background-image: url("${nhhMobBG}");
			}
		}
	</style>`

	return (
		<div>
			{
				(nhhBG) ? 
					<div dangerouslySetInnerHTML={{__html:nhhStyle}}/>  
				: ''
			}

			{
				(nhhMobBG) ? 
					<div dangerouslySetInnerHTML={{__html:nhhMobStyle}}/>  
				: ''
			}
		
		<header className={c('pageHeader', Styles.pageHeader, {[Styles.pageHeaderDown]: nhhMoveImageDown == 1}, {[Styles.pageHeaderAlt]: altWave == 1})} id="page-header">
			<div className="container">
				{
					(enableFeatured) ? 
						<FeaturedHero section={section.featuredHero} title={pageTitle}></FeaturedHero>
					:
						<div className="col col-xs-1-1">
							{
								(nhhImg) ? 
									<div className={c(Styles.nhhHeader, {[Styles.nhhHeaderDown]: nhhMoveImageDown == 1})}>
										<div className={Styles.nhhHeaderLeft}>
											<h1 className={Styles.pageHeaderTitle} dangerouslySetInnerHTML={{__html:pageTitle}}></h1>
											<p>Breadcrumbs</p>
										</div>
										<div className={Styles.nhhHeaderRight}>
											<img src={nhhImg} alt={nhhImgAlt} />
										</div>
									</div>
								:
									<div>
										<h1 className={Styles.pageHeaderTitle} dangerouslySetInnerHTML={{__html:pageTitle}}></h1>
										<p>Breadcrumbs</p>
									</div>
							}
						</div>
					}
				</div>
			</header>
		</div>
	)
}

export default Layout