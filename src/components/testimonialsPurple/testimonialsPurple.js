import * as React from 'react'
import * as Styles from './testimonialsPurple.module.scss'
import Ratings from '../ratings/ratings'
import c from 'classnames'
import { useEffect } from "react"

const Layout = ({ section, title, images, ratings }) => {
	let dataArray = [];

	for (var i=0; i < section.length; i++) {
		dataArray.push({
			title: section[i]['name'],
			text: section[i]['quote'],
			image: getImageUrl(section[i]['image']),
			location: section[i]['location'],
		});
	}

	function getImageUrl(id) {
		for (var i = 0; i < images.length; i++){
			if (images[i].node.databaseId === id){
			   return images[i].node.sourceUrl;
			}
		}
	}

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
	}, [])

	return (
		<div className="section bg-alt fix-overflow">
			<div className="container items-center"> 
				<div className="col col-md-2-5 align-text-center">
					{
						(title) ?
							<h2 className="textBlockTitle title--padded" dangerouslySetInnerHTML={{__html: title}}></h2>
						: ''
					}
					<div className="textBlockInner">
						<Ratings info={ratings}></Ratings>
					</div>
				</div>
				<div className={c("col col-md-3-5 align-text-center testimonial-slider")}>
					<div className="slider-wrap">
						{
							(dataArray.length > 0) ? 
								dataArray.map((section, i) => (
									<div className={c("slide", Styles.testimonial)}>
										<p className={Styles.testimonialQuote}>{section.text}</p>
										<footer>
											{
												(section.image) ? 
													<img src={section.image} alt="Image of quote sayer" className={Styles.testimonialImage} />
												: ''
											}
											<div className={Styles.testimonialAttr}>
												<span className={Styles.testimonialName}>{section.title}</span>
												<span className={Styles.testimonialLocation}>{section.location}</span>
											</div>
										</footer>
									</div>
								))
							: ''
						}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Layout