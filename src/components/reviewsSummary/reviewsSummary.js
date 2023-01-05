import * as React from 'react'
import * as Styles from './reviewsSummary.module.scss'
import ReviewNum from '../getReviewNum/getReviewNum'
import GetStars from '../getStars/getStars'
import { useState, useEffect } from "react"

const Layout = ({ data, id }) => {
	const pagedata = data.insurerRatings;
	const [ myData, setMyData ] = useState(0);

	function getData(incoming) {
		for (let i = 0; i < pagedata.length; i++) {
			const element = pagedata[i];
			let id = element.insurer.databaseId;
			if(id == incoming) {
				setMyData(element.rating);
			}
		}
	}
	
	useEffect(() => {
		getData(id);
	}, [ data ] );

	return (
		<div className={Styles.archiveReviews}>
			<div className={Styles.reviewSummary}>
				<span className={Styles.insurerRating}>{myData}</span>
				<GetStars section={myData} />
				<ReviewNum section={id} />
			</div>
		</div>
	)
}

export default Layout