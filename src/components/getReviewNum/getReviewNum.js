import * as React from 'react'
import { useState, useEffect } from "react"
import * as Styles from './getReviewNum.module.scss'

const Layout = ({ section, images }) => {
	const [ amount, setAmount ] = useState( 0 );
	const [ isHide, setIsHide ] = useState( true );

	function getData(id) {
		fetch("https://dev-petted2.pantheonsite.io/wp-json/site-reviews/v1/summary?_fields=average,reviews&assigned_posts=" + id, {
			headers: {
			  Authorization: "Basic cGV0dGVkYWRtaW46N0VnaW5pcE5aVlpqQml5TllOYzJoMmlS"
			}
		})
		  .then((response) => response.json())
		  .then(function(data) {
			setAmount(data.reviews);
			setIsHide(false);
		});
	}

	useEffect(() => {
		getData(section);
	}, [ amount ] );

	return (
		<p className={Styles.reviews}>
			{!isHide ? <span>{amount}</span> : <div className={Styles.ldsDualRing}></div>} reviews
		</p>
	)
}

export default Layout