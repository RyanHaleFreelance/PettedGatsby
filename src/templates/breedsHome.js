import React from "react"
import { graphql } from "gatsby"
import Layout from '../components/header/header'
import Hero from '../components/hero/hero'
import RegHero from '../components/regHero/regHero'
import Footer from '../components/footer/footer'
import InsurerSlider from '../components/insurerSlider/insurerSlider'
import Testimonials from '../components/testimonials/testimonials'
import Ratings from '../components/ratings/ratings'
import c from 'classnames'
import { useState, useEffect } from "react"

const WpPost = ({data}) => {
	// const pageData = JSON.parse(data.wpPage.blocksJSON);
	const images = data.allWpMediaItem.edges;

	let tests = [{
		attributes: {
			data: {
				test_testimonials: 2,
				test_logo: true,
				test_rating: 'Excellent',
				test_title: "Join thousands <br/>of happy pet parents!",
				test_testimonials_0_image: 227,
				test_testimonials_0_location: "Los Angeles",
				test_testimonials_0_name: "Cassie D",
				test_testimonials_0_quote: "Getting a quote through Petted was a breeze and comparing pet insurance quotes was super simple. In less than 5 minutes, my new pup was fully covered giving me total peace of mind! ",
				test_testimonials_1_image: 417,
				test_testimonials_1_location: "Austin, Texas",
				test_testimonials_1_name: "Nina T",
				test_testimonials_1_quote: "Coverage is easy to understand and well spelt out. Claims are easy and you're reimbursed fast! I'm super happy I'm fully covered because vet bills can be so expensive where I live.",
			}
		}
	}];
	
	let bg = '';

	if(data.wp.themeGeneralSettings.stateBreedOptions.breedsBackgroundImage) {
		bg = `		
		<style>
			.post-archive::before {
				background-image: url("${data.wp.themeGeneralSettings.stateBreedOptions.breedsBackgroundImage.sourceUrl}") !important;
			}
		</style>`
	}

	let bgMob = '';
	
	if(data.wp.themeGeneralSettings.stateBreedOptions.breedsBackgroundImageMobile) {
		bgMob = `		
		<style>
			@media only screen and (max-width: 600px) {
				.post-archive::before {
					background-image: url("${data.wp.themeGeneralSettings.stateBreedOptions.breedsBackgroundImageMobile.sourceUrl}") !important;
				}
			}
		</style>`
	}

	const [ toggle, setToggle ] = useState( true );
			
	setTimeout(() => {
		if (typeof window !== 'undefined') {
			let select = document.querySelector('.post-archive__select-wrap select');
			let selectWrap = document.querySelector('.post-archive__select-wrap');
			let btn = document.querySelector('.post-archive__select a.btn');
			let searchModal = document.querySelector('.post-archive__search-modal');
			let searchModalInput = document.querySelector('.post-archive__search-modal input');

			select.addEventListener("change", (event) => {
				let selected = event.target.value;
				btn.setAttribute('href', selected);
				btn.classList.remove('btn--disabled');
			}, false);

			selectWrap.addEventListener("click", (event) => {
				if(searchModal.classList.contains('is-open')) {
					searchModal.classList.remove('is-open');
				} else {
					searchModal.classList.add('is-open');
					searchModalInput.focus();
				}
			}, false);

			searchModalInput.addEventListener("input", (event) => {
				if (typeof window !== 'undefined') {
					let search = event.target.value.toLowerCase();
					let items = document.querySelectorAll('.post-archive__search-modal-item');
					items.forEach((item) => {
						item.classList.remove('first-match');
						let text = item.querySelector('a').innerText.toLowerCase();
						if(text.indexOf(search) >= 0) {
							item.classList.add('is-visible');
							item.style.display = 'block';
						} else {
							item.classList.remove('is-visible');
							item.style.display = 'none';
						}
					});
					if(document.querySelectorAll('.post-archive__search-modal-item.is-visible').length > 0 && search.length > 0) {
						document.querySelectorAll('.post-archive__search-modal-item.is-visible')[0].classList.add('first-match');
					}
				}
			}, false);

			document.addEventListener("keydown", (event) => {
				if (typeof window !== 'undefined') {
					if(event.keyCode == 13){
						let visible = document.querySelectorAll('.post-archive__search-modal-item.is-visible.first-match a');
						if(visible.length == 0) {
							btn.classList.add('btn--disabled');
							return;
						} else {
							let clicked = document.querySelector('.post-archive__search-modal-item.is-visible.first-match a').dataset.val;
							select.value = clicked;
							btn.setAttribute('href', clicked);
							btn.classList.remove('btn--disabled');
							select.classList.add('item-selected');
							searchModal.classList.remove('is-open');
						}
					}
				}
			}, false);

			if (typeof window !== 'undefined') {
				const items = document.querySelectorAll(".post-archive__search-modal-item a");

				items.forEach((item) => {
					item.addEventListener("click", (event) => {
						let clicked = event.target.dataset.val;
						select.value = clicked;
						btn.setAttribute('href', clicked);
						btn.classList.remove('btn--disabled');
						select.classList.add('item-selected');
						searchModal.classList.remove('is-open');
					}, false);
				});
			}
		}
	}, 100);

	useEffect(() => {
	}, [ toggle ] );


  return (
    <div>
        <Layout></Layout>
		<main class="main" role="main">
			<div class="post-archive" id="main-content">
				{
					(bg) ? 
						<div dangerouslySetInnerHTML={{__html:bg}}/>  
					: ''
				}
				{
					(bgMob) ? 
						<div dangerouslySetInnerHTML={{__html:bgMob}}/>  
					: ''
				}
				<div class="container container--no-flex">
					<div class="post-archive__text">
						<h1>Find the best pet insurance for your Breed</h1>
						<p>Different breeds have different needs, so it pays to research the best insurance plan for your pet. Find out all you need to know here!</p>
					</div>
					<div class="post-archive__select">
						<p>Type or scroll to search</p>
						<div class="post-archive__overall-select-wrap">
							<div class="post-archive__select-wrap">
								<select name="breed" id="breed">
									<option value="javascript:void(0);" disabled selected>French Bulldog</option>
									{
										(data.allWpBreed.nodes).map((breed, index) => {
											return (
												<option value={breed.uri}>
													{
														(breed.breeds.archiveTitle) ? breed.breeds.archiveTitle : breed.title
													}
												</option>
											)
										})
									}
								</select>
							</div>
							<div class="post-archive__search-modal" style={{opacity: 0, zIndex: -1}}>
								<input type="text" placeholder="Type to search" />
								<div class="post-archive__search-modal-items">
									{
										(data.allWpBreed.nodes).map((breed, index) => {
											return (
												<div class="post-archive__search-modal-item">
													<a href="javascript:void(0);" data-val={breed.uri}>
														{
															(breed.breeds.archiveTitle) ? breed.breeds.archiveTitle : breed.title
														}
													</a>
												</div>
											)
										})
									}
								</div>
							</div>
						</div>
						<a href="javascript:void(0);" class="btn btn--disabled btn--alt">Show me</a>
					</div>
					<div class="post-archive__breadcrumbs">
						<p class="breadcrumbs"><span><span><a href="https://www.petted.com">Home</a> &gt; <span><a href="https://www.petted.com">Pet Insurance</a> &gt; <span class="breadcrumb_last" aria-current="page">By Breed</span></span></span></span></p>
					</div>
				</div>
			</div>
			<Testimonials section={tests[0]} images={images} ratings={data.wp.themeGeneralSettings.ratingsWidget} />
			<div class="section">
				<div class="archive-links container">
					<div class="archive-links__title">
						<h3>Pet insurance by Breed</h3>
					</div>
					<div class="archive-links__wrap">
						{
							(data.allWpBreed.nodes).map((breed, index) => {
								return (
									<a href={breed.uri}>
										{
											(breed.breeds.archiveTitle) ? breed.breeds.archiveTitle : breed.title
										}
									</a>
								)
							})
						}
					</div>
				</div>
			</div>
		</main>
        <Footer data={data.wp.acfOptionsFooter.footerOptions}></Footer>
    </div>
  )
}

export const query = graphql`
    query ($id: String) {
    wpPage(id: { eq: $id }) {
		id
		uri
		title
		blocksJSON
		pageSettings {
			altHeaderWave
			noContainerOnMain
		}
	}
	allWpBreed {
		nodes {
		  uri
		  breeds {
			archiveTitle
		  }
		  title
		}
	}
	wp {
		themeGeneralSettings {
		  	ratingsWidget {
				ratingName
				ratingNumber
				ratingStars
				ratingValue
				ratingLink
			}
			stateBreedOptions {
				breedsBackgroundImage {
					sourceUrl
				}
				breedsBackgroundImageMobile {
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