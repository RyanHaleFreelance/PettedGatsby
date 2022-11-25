import * as React from 'react'
import * as Styles from './ratings.module.scss'
import c from 'classnames'

const Layout = ({ info }) => {
	let ratingName = info.ratingName;
	let ratingNumber = info.ratingNumber;
	let ratingStars = info.ratingStars;
	let ratingValue = info.ratingValue;
	let ratingLink = info.ratingLink;

	let stars = '';
	for (let index = 0; index < ratingStars; index++) {
		stars += '<img src="https://dev-petted2.pantheonsite.io/wp-content/uploads/2022/11/icon-star.svg" alt="star" width="17" height="17" />';
	}

	return (
		<div className={c(Styles.ratings, 'ratings')}>
			{
				(ratingLink) ?  "<a href={ratingLink} target='_blank'>" : ''
			}
				<span className={Styles.ratingsTitle}>{ratingName}</span>
				<div className={c(Styles.ratingsInner, 'flex', 'items-center')}>
					<div className={c(Styles.ratingsStars, 'flex', 'items-center')} dangerouslySetInnerHTML={{__html: stars}}></div>
					<span className={Styles.ratingsVal}>{ratingValue}</span>
					<span className={Styles.ratingsNum}>{ratingNumber} ratings</span>
				</div>
				{
					(ratingLink) ?  "</a>" : ''
				}
		</div>
	)
}

export default Layout