import * as React from 'react'
import * as Styles from './quoteBlock.module.scss'

const Layout = ({ image, title, text, link, linkText }) => {

	return (
		<div className="container container--no-flex">
			<div className={Styles.blogQuote}>
				<div className={Styles.blogQuoteLeft}>
					<div className="image-mask">
						<img src={image} alt="Dog" />
					</div>
				</div>
				<div className={Styles.blogQuoteRight}>
					<h2>{title}</h2>
					<p>{text}</p>
					<a href={link} target="_blank" className="btn btn--alt">{linkText}</a>
				</div>
			</div>
		</div>
	)
}

export default Layout