import * as React from 'react'
import { useStaticQuery, graphql } from "gatsby"
import * as Styles from './insurerSlider.module.scss'
import c from 'classnames'
import { useEffect, useState } from "react"
import axios from 'axios';
import ReviewNum from '../getReviewNum/getReviewNum'
import GetStars from '../getStars/getStars'

const Insurer = ({ section, images }) => {
	const { wp } = useStaticQuery(graphql`
	{
		wp {
		  acfOptionsInsurer {
			insurerRatings {
			  insurerRatings {
				pettedRecommended
				rating
				insurer {
				  ... on WpInsurer {
					id
					title
					insurerDetails {
					  logo {
						sourceUrl
					  }
					}
					uri
					databaseId
				  }
				}
			  }
			}
		  }
		}
	  }	  
  `)
	const pagedata = section.attributes.data;
	let insurers = wp.acfOptionsInsurer.insurerRatings.insurerRatings;
	let stars = '';
	for (var i=0; i < insurers.length; i++) {
		stars = '';
		let current = insurers[i];
		let logo = current.insurer.insurerDetails.logo.sourceUrl;
		let uri = current.insurer.uri;
		let rec = current.pettedRecommended;
		let rating = current.rating;
		let id = current.insurer.databaseId;
		let title = current.insurer.title;
	}

	let title = pagedata.is_title;
	let content = pagedata.is_content;
	let btnLink2 = pagedata.is_secondary_link.url;
	let btnText2 = pagedata.is_secondary_text;
	let btnLink = pagedata.is_button_link.url;
	let btnText = pagedata.is_button_text;

	const [total, settotal] = useState(null);

	useEffect(() => {
		import('tiny-slider').then(({ tns }) => {
			setTimeout(() => {
				if (typeof window !== 'undefined') {
					const sliders = document.querySelectorAll('.slider-wrap');
		
					if (sliders) {
						for (let i = 0; i < sliders.length; i++) {
							var has_controls = sliders[i].dataset.controls ? sliders[i].dataset.controls : true;
				
							var slider = tns({
								container: sliders[i],
								mouseDrag: true,
								touch: true,
								responsive: {
									300: {
										items: sliders[i].dataset.smslides ? sliders[i].dataset.smslides : 1,
										loop: sliders[i].dataset.loop ? sliders[i].dataset.loop : false,
									},
									650: {
										items: sliders[i].dataset.mdslides ? sliders[i].dataset.mdslides : 1,
										loop: false,
									},
									1100: {
										items: sliders[i].dataset.slides ? sliders[i].dataset.slides : 1,
										loop: false,
									}
								},
								slideBy: 'page',
								nav: sliders[i].dataset.nav ? sliders[i].dataset.nav : false,
								controls: has_controls,
								loop: false,
								gutter: sliders[i].dataset.gutter ? sliders[i].dataset.gutter : 0
							});
						}
				
						const controls = document.querySelectorAll('.tns-controls');
				
						controls.forEach(control => {
							control.tabIndex = -1;
				
							var buttons = document.querySelectorAll('.tns-controls button');
				
							buttons.forEach(button => {
								button.tabIndex = 0;
							})
						});
					}
				}
			}, 1);
		})

		axios.get('https://dev-petted2.pantheonsite.io/wp-json/site-reviews/v1/summary?_fields=reviews', {
			headers: {
				Authorization: "Basic cGV0dGVkYWRtaW46N0VnaW5pcE5aVlpqQml5TllOYzJoMmlS"
			}
		})
		.then(function (response) {
			settotal(response.data.reviews);
		})
		.catch(function (error) {

		})
		.finally(function () {
		});
	}, [])

	return (
		<div className="section bg-alt">
			<div className="container full items-center align-text-center"> 
				<div className="col col-md-1-1">
					{
						(title) ? 
							<h2 className="textBlockTitle">{title}</h2> 
						: ''
					}
					{
						(content) ? 
							<div className="alignTextCenter textBlockInner">
								<p>{content}</p>
							</div>
						: ''
					}
				</div>
				<div className={c('col', 'col-md-1-1', 'insurerSliderContainer')}>
					<div className={c(Styles.sliderWrap, 'slider-wrap', Styles.sliderWrapInsurers)} data-slides="5" data-smslides="1" data-mdslides="3" data-gutter="20">
					{
						insurers.map((section, i) => (
							<div className={c('slide', 'slide--insurer', Styles.slideInsurer)}>
								<div className={c('slide-inner', Styles.slideInner)}>
									{ 
										(i == 0) ? 
											<span className={c(Styles.recommended, Styles.recommendedBest)}>Best Buy</span>
										: (section.pettedRecommended) ?
											<span className={Styles.recommended}>Petted Recommended</span>
										: ''	
									}
									<div className={Styles.slideInnerLogoWrap}>
										<img src={section.insurer.insurerDetails.logo.sourceUrl} alt={section.insurer.title} className={Styles.slideInnerLogo} />  
									</div>
									
									<span className={Styles.insurerRating}>{section.rating}</span>
									
									<GetStars section={section.rating} title={section.insurer.title} />

									<ReviewNum section={section.insurer.databaseId} />
								
									<a href={section.insurer.uri} className="link--more">Read reviews</a>
								</div>
							</div>
						))
					}
					</div>
				</div>
				<div className="col col-md-1-1">
					{
						(btnLink) ? 
							<a href={btnLink} className="btn">{btnText}</a>
						: ''
					}
					{
						(btnLink2) ? 
							<a href={btnLink2} className="btn btn--trans">{btnText2}</a>
						: ''
					}

					{
						(total > 999) ?
							<p className={Styles.reviewCount}><img src="https://dev-petted2.pantheonsite.io/wp-content/uploads/2022/12/smiley.svg" alt="smiley face" /> {total} reviews and counting!</p>
						: ''
					}
				</div>
			</div>
		</div>
	)
}

export default Insurer