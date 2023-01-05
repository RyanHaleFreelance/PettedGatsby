import * as React from 'react'
import * as Styles from './authorHeader.module.scss'
import c from 'classnames'

const Layout = ({ section, images }) => {
	// const pagedata = section.attributes.data;
	let image = 'https://dev-petted2.pantheonsite.io/wp-content/uploads/2022/01/hero-bg-mob.jpg';

	if(section.wpUser.userOptions.customProfilePhoto) {
		image = section.wpUser.userOptions.customProfilePhoto.sourceUrl;
	}

	return (
		<header className={c(Styles.pageHeader)} id="page-header">
			<div className="container">
				<div className={Styles.headerAuthor}>
					
					<div className={Styles.headerAuthorImage}>
						<img src={image} alt={section.wpUser.name} />
					</div>
					<div className={Styles.headerAuthorMeta}>
						<h1 class="page-header__title">{section.wpUser.name}</h1>
						<p class="subtitle">{section.wpUser.userOptions.jobTitle}</p>
						<p>{section.wpUser.description}</p>
					</div>
				</div>
			</div>
		</header>
	)
}

export default Layout