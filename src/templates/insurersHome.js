import React from "react"
import { graphql } from "gatsby"
import Layout from '../components/header/header'
import Hero from '../components/hero/hero'
import RegHero from '../components/regHero/regHero'
import Footer from '../components/footer/footer'
import InsurerSlider from '../components/insurerSlider/insurerSlider'
import StateMap from '../components/stateMap/stateMap'
import Testimonials from '../components/testimonials/testimonials'
import Ratings from '../components/ratings/ratings'
import Quote from '../components/quoteBlock/quoteBlock'
import ReviewsSummary from '../components/reviewsSummary/reviewsSummary'
import c from 'classnames'
import { Link } from 'gatsby'
import { useState, useEffect } from "react"

const WpPost = ({data, pageContext}) => {
	const images = data.allWpMediaItem.edges;
	let insurers = data.wp.acfOptionsInsurer.insurerRatings;
	const { currentPage, numPages } = pageContext;
	const isFirst = currentPage === 1
    const isLast = currentPage === numPages
    const prevPage = currentPage - 1 === 1 ? "/insurers/" : '/insurers/page/' + (currentPage - 1).toString()
    const nextPage = '/insurers/page/' + (currentPage + 1).toString()
	const [ toggle, setToggle ] = useState( true );

	useEffect(() => {
	}, [ toggle ] );

	let altWave = data.wpPage.pageSettings.altWave;

	return (
		<div>
			<Layout></Layout>
			<header className={c('pageHeader', {'pageHeaderAlt': altWave == 1})} id="page-header">
				<div className="container">
					{
						<div className="col col-xs-1-1">
							<div>
								<h1 className='pageHeaderTitle'>Insurers</h1>
								<p class="breadcrumbs"><span><span><a style={{color:'white'}} href="https://www.petted.com">Home</a> &gt; <span class="breadcrumb_last" aria-current="page">Insurers</span></span></span></p>
							</div>
						</div>
					}
				</div>
			</header>
			<main class="main" role="main">
				<div class="section">
					<div class="">
						<div class="archive__wrapper container">
							{
								data.allWpInsurer.nodes.map((insurer, index) => {
									return (
										<a href={insurer.uri} class="archive__card">
											<div class="archive__image archive__logo" style={{ backgroundImage: `url('${insurer.insurerDetails.logo.sourceUrl}')`}}></div>
											<div class="archive__title">
												<h2>{insurer.title}</h2>
											</div>
											<ReviewsSummary data={insurers} id={insurer.databaseId} />
										</a>
									)
								})
							}
						</div>
						<div className="static-nav-container">
							<div className="loop-pagination">
								{!isFirst && (
									<a className="loop-pagination--button" href={prevPage} rel="prev">
										&lt;
									</a>
								)}
								<div className="loop-pagination--numbers">
									{Array.from({ length: numPages }, (_, i) => {
										let current = i + 1;
										let link = i === 0 ? "/insurers/" : '/insurers/page/' + (i + 1).toString();
										if(current === 1 || current === numPages || current === currentPage || current === currentPage - 1 || current === currentPage + 1) {
											if(i + 1 === currentPage) {
												return (
													<span className='current'>
													{i + 1}
													</span>
												)
											} else {
												return (
													<a key={`pagination-number${i + 1}`} href={link}>
													{i + 1}
													</a>
												)
											}
										} 
									})}
								</div>
								{!isLast && (
									<a className="loop-pagination--button" href={nextPage} rel="next">
										&gt;
									</a>
								)}
							</div>
						</div>
					</div>
				</div>
				<Quote image='https://dev-petted2.pantheonsite.io/wp-content/uploads/2022/02/blog-dog.jpg' title='Pet insurance made easy!' text='Compare the best value plans in under 60 seconds' link='https://quote.petted.com/quote/' linkText='Get a free quote' />
			</main>
			<Footer data={data.wp.acfOptionsFooter.footerOptions}></Footer>
		</div>
	)
}

export const query = graphql`
    query ($id: String, $skip: Int!, $limit: Int!) {
    wpPage(id: { eq: $id }) {
		id
		uri
		title
		pageSettings {
			altHeaderWave
			noContainerOnMain
		}
	}
	allWpInsurer(sort: {fields: title}, skip: $skip, limit: $limit) {
		nodes {
			title
			uri
			databaseId
			insurerDetails {
				logo {
					sourceUrl
				}
			}
		}
	}
	wp {
		acfOptionsInsurer {
			insurerRatings {
				insurerRatings {
					rating
					insurer {
						... on WpInsurer {
							databaseId
						}
					}
				}
			}
		}
		themeGeneralSettings {
		  	ratingsWidget {
				ratingName
				ratingNumber
				ratingStars
				ratingValue
				ratingLink
			}
			stateBreedOptions {
				statesBackgroundImage {
					sourceUrl
				}
				statesBackgroundImageMobile {
					sourceUrl
				}
			}
		}
		acfOptionsFooter {
		  footerOptions {
			copyrightMessage
			facebook
			fieldGroupName
			footerLogo {
			  sourceUrl
			}
			instagram
			tagline
			tiktok
		  }
		}
	}
  
	allWpMediaItem {
		edges {
		  node {
			id
			sourceUrl
			databaseId
		  }
		}
	  }
	}
`

export default WpPost