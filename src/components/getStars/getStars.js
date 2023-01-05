import * as React from 'react'
import { useState, useEffect } from "react"
import * as Styles from './getStars.module.scss'

const Layout = ({ section, title }) => {
	// const [ stars, setStars ] = useState( '' );
	let stars = getStars(section);

	function getStars(rating) {
		let stars = rating;
		let whole = Math.floor(stars);
		let decimal = stars - whole;
		let rounded = Math.round(decimal * 10) / 10;

		let html = '';

		for (let i = 0; i < whole; i++) {
			html += '<img src="https://dev-petted2.pantheonsite.io/wp-content/plugins/site-reviews/assets/images/star-full.svg" alt="star" />';
		}

		if(decimal > 0) {
			if(rounded < 0.3) {
				html += '<img src="https://dev-petted2.pantheonsite.io/wp-content/plugins/site-reviews/assets/images/star-empty.svg" alt="star" />';
			} else if(rounded < 0.7) {
				html += '<img src="https://dev-petted2.pantheonsite.io/wp-content/plugins/site-reviews/assets/images/star-half.svg" alt="star" />';
			} else {
				html += '<img src="https://dev-petted2.pantheonsite.io/wp-content/plugins/site-reviews/assets/images/star-full.svg" alt="star" />';
			}
		}

		for (let i = 0; i < (5 - Math.ceil(stars)); i++) {
			html += '<img src="https://dev-petted2.pantheonsite.io/wp-content/plugins/site-reviews/assets/images/star-empty.svg" alt="star" />';
		}

		return html;
	}


	return (
		<div className={Styles.stars} dangerouslySetInnerHTML={{__html: stars}}></div>
	)
}

export default Layout