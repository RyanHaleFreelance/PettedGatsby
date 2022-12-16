import * as React from 'react'
import * as Styles from './rating.module.scss'
import c from 'classnames'

const Layout = ({ section, title, half }) => {
	// const pagedata = section.node.insurerReview;
	let overallTitle = 'Overall score';
	let overall = section.rating.overallRating;
	let claimsTitle = 'Speed of claims';
	let claims = section.rating.speedOfClaims;
	let serviceTitle = 'Customer service';
	let service = section.rating.customerService;
	let claimsProcedureTitle = 'Claims procedure';
	let claimsProcedure = section.rating.claimsProcedure;
	let understandTitle = 'Easy to understand';
	let understand = section.rating.easyToUnderstand;
	let moneyTitle = 'Value for money';
	let money = section.rating.valueForMoney;

	function getStars(input) {
		let stars = input;
		let whole = Math.floor(stars);
		let decimal = stars - whole;
		let rounded = Math.round(decimal * 10) / 10;

		let html = '';

		for (let i = 0; i < whole; i++) {
			html += '<img src="https://dev-petted2.pantheonsite.io/wp-content/uploads/2022/12/star-full.svg" alt="star" />';
		}

		if(decimal > 0) {
			if(rounded < 0.3) {
				html += '<img src="https://dev-petted2.pantheonsite.io/wp-content/uploads/2022/12/star-empty.svg" alt="star" />';
			} else if(rounded < 0.7) {
				html += '<img src="https://dev-petted2.pantheonsite.io/wp-content/uploads/2022/12/star-half.svg" alt="star" />';
			} else {
				html += '<img src="https://dev-petted2.pantheonsite.io/wp-content/uploads/2022/12/star-full.svg" alt="star" />';
			}
		}

		for (let i = 0; i < (5 - Math.ceil(stars)); i++) {
			html += '<img src="https://dev-petted2.pantheonsite.io/wp-content/uploads/2022/12/star-empty.svg" alt="star" />';
		}

		return html;
	}
	return (
		<div className={c('bg-alt-radius', Styles.ourReview, {[Styles.halfsies]: half})}>
			{ 
				(title) ? <h4>Our {section.insurer.title} rating</h4> : '' 
			}
			<div className={Styles.insurerRatingOverview}>
				{
					(overall) ? 
						<div className={Styles.ratingItem}><h3>{overallTitle}</h3>
							<div className={Styles.ratingValue}>
								<span className={Styles.ratingNumber}>{overall.toLocaleString(undefined,{minimumFractionDigits: 1 })}</span>
								<div className={Styles.ratingStars} dangerouslySetInnerHTML={{__html: getStars(overall)}}></div>
							</div>
						</div>
					: ''
				}
				{
					(claims) ? 
						<div className={Styles.ratingItem}><h3>{claimsTitle}</h3>
							<div className={Styles.ratingValue}>
								<span className={Styles.ratingNumber}>{claims.toLocaleString(undefined,{minimumFractionDigits: 1 })}</span>
								<div className={Styles.ratingStars} dangerouslySetInnerHTML={{__html: getStars(claims)}}></div>
							</div>
						</div>
					: ''
				}
				{
					(service) ? 
						<div className={Styles.ratingItem}><h3>{serviceTitle}</h3>
							<div className={Styles.ratingValue}>
								<span className={Styles.ratingNumber}>{service.toLocaleString(undefined,{minimumFractionDigits: 1 })}</span>
								<div className={Styles.ratingStars} dangerouslySetInnerHTML={{__html: getStars(service)}}></div>
							</div>
						</div>
					: ''
				}
				{
					(claimsProcedure) ? 
						<div className={Styles.ratingItem}><h3>{claimsProcedureTitle}</h3>
							<div className={Styles.ratingValue}>
								<span className={Styles.ratingNumber}>{claimsProcedure.toLocaleString(undefined,{minimumFractionDigits: 1 })}</span>
								<div className={Styles.ratingStars} dangerouslySetInnerHTML={{__html: getStars(claimsProcedure)}}></div>
							</div>
						</div>
					: ''
				}
				{
					(understand) ? 
						<div className={Styles.ratingItem}><h3>{understandTitle}</h3>
							<div className={Styles.ratingValue}>
								<span className={Styles.ratingNumber}>{understand.toLocaleString(undefined,{minimumFractionDigits: 1 })}</span>
								<div className={Styles.ratingStars} dangerouslySetInnerHTML={{__html: getStars(understand)}}></div>
							</div>
						</div>
					: ''
				}
				{
					(money) ? 
						<div className={Styles.ratingItem}><h3>{moneyTitle}</h3>
							<div className={Styles.ratingValue}>
								<span className={Styles.ratingNumber}>{money.toLocaleString(undefined,{minimumFractionDigits: 1 })}</span>
								<div className={Styles.ratingStars} dangerouslySetInnerHTML={{__html: getStars(money)}}></div>
							</div>
						</div>
					: ''
				}
			</div>
		</div>
	)
}

export default Layout