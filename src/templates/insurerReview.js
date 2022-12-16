import React from "react"
import { graphql } from "gatsby"
import Layout from '../components/header/header'
import Steps from '../components/steps/steps'
import Partners from '../components/partnersBlock/partnersBlock'
import Testimonials from '../components/testimonials/testimonials'
import TextAccordion from '../components/textAccordion/textAccordion'
import Plan from '../components/plan/plan'
import Hero from '../components/hero/hero'
import RegHero from '../components/regHero/regHero'
import Footer from '../components/footer/footer'
import InsurerSlider from '../components/insurerSlider/insurerSlider'
import FtExtra from '../components/featuredHeroExtra/featuredHeroExtra'
import SingleText from '../components/singleText/singleText'
import TwoCol from '../components/twoColumn/twoColumn'
import TwoColBlock from '../components/twoColumnBlock/twoColumnBlock'
import Blockquote from '../components/blockQuote/blockQuote'
import Classic from '../components/classic/classic'
import FormBlock from '../components/formBlock/formBlock'
import TextImage from '../components/textImage/textImage'
import MapBlock from '../components/mapBlock/mapBlock'
import CtaBlock from '../components/ctaBlock/ctaBlock'
import GenericText from '../components/genericText/genericText'
import Banner from '../components/bannerBlock/bannerBlock'
import InsuranceTable from '../components/insuranceTable/insuranceTable'
import AccordionBlock from '../components/accordionBlock/accordionBlock'
import Rating from '../components/rating/rating'
import ProsCons from '../components/prosCons/prosCons'
import c from 'classnames'
import {Helmet} from "react-helmet";
import reactStringReplace from 'react-string-replace';
import { useState, useEffect } from "react"

const WpPost = ({data}) => {
	const pageData = JSON.parse(data.wpPage.blocksJSON);
	const images = data.allWpMediaItem.edges;
	let insurerReviews = data.allWpPage.edges;
	let comparison = data.wp.acfOptionsInsurer.insurerCoverageTable;
	let insurerVsInsurer = data.wpPage.insurerVsInsurer;
	let title = data.wpPage.title;
	let value = data.wp.acfOptionsInsurer.valueForMoneyComparisonTable;
	let toc = [];
	let content; 
	let pros = data.wpPage.insurerReview.prosCons.pros;
	let cons = data.wpPage.insurerReview.prosCons.cons;

	const [ toggle, setToggle ] = useState( true );
			
	useEffect(() => {
	}, [ toggle ] );


	  
	//get h2s and add the id for toc
	content = reactStringReplace(pageData[0].attributes.content, /(<h2>.*<\/h2>)/gi, (match, i) => (
		toc.push({match, i}),
		match.replace("<h2>", "<h2 id=toc" + i + ">")
	));

	//sanitise the toc items for output
	for (let index = 0; index < toc.length; index++) {
		const element = toc[index];
		element.match = element.match.replace(/<\/?[^>]+(>|$)/g, "");
	}

	let html = '';

	//recreate html form the reactstringreplace function
	for (let i = 0; i < content.length; i++) {
		console.log(content[i]);
		if (typeof(content[i]) === 'string') {
			html += content[i];
		} else {
			html += content[i].props.children;
		}
	}

	//send new content in same format
	let newContent = {
		originalContent: html
	};

	setTimeout(() => {
		console.log(data);
		console.log(data.wpPage.blocksJSON);
	}, 2000);

	const LoadSection = ({ val, imageArray }) => {
		let name = (val.attributes.name) ? val.attributes.name : (val.name) ? val.name : undefined
		switch (name) {
			case "acf/steps" :
			return <Steps section={val} images={imageArray} />;
			case "acf/partners" :
			return <Partners section={val} images={imageArray} />;
			case "acf/testimonials" :
			return <Testimonials section={val} images={imageArray} ratings={data.wp.themeGeneralSettings.ratingsWidget} />;
			case "acf/plan" :
			return <Plan section={val} images={imageArray} />;
			case "acf/text-accordion" :
			return <TextAccordion section={val} images={imageArray} />;
			case "acf/insurers-slider" :
			return <InsurerSlider section={val} images={imageArray} />;
			case "acf/single-column-text-block" :
			return <SingleText section={val} images={imageArray} />;
			case "acf/two-column-content" :
			return <TwoCol section={val} images={imageArray} />;
			case "acf/blockquote-block" :
			return <Blockquote section={val} images={imageArray} />;
			case "core/freeform" :
			return <Classic section={newContent} images={imageArray} reviews={insurerReviews} versus={insurerVsInsurer} comparison={comparison} title={title} value={value} />;
			case "acf/form-block" :
			return <FormBlock section={val} images={imageArray} />;
			case "acf/text-image-block" :
			return <TextImage section={val} images={imageArray} />;
			case "acf/map-block" :
			return <MapBlock section={val} images={imageArray} />;
			case "acf/accordions-block" :
			return <AccordionBlock section={val} images={imageArray} />;
			case "acf/cta-block" :
			return <CtaBlock section={val} images={imageArray} />;
			case "acf/generic-text-block" :
			return <GenericText section={val} images={imageArray} />;
			case "acf/table-block" :
			return <InsuranceTable section={val} images={imageArray} />;
			case "acf/two-column-block" :
			return <TwoColBlock section={val} images={imageArray} />;
			case "acf/banner-block" :
			return <Banner section={val} images={imageArray} />;
			default:
			return "Block (" + name + ") not found. ";
		}
	};

	let pageurl = data.wpPage.uri;

	let noContainer = data.wpPage.pageSettings.noContainerOnMain;

  return (
	<div>
		<Helmet>
			<script id="petted-quote-engine" src="https://petinsurer.azurewebsites.net/Scripts/lib/widgets/petted/vertical/quote-form/widget.min.js" type="text/javascript"></script>

			<script>{`
				setTimeout(() => {QuoteEnginePetted.setOptions({
					targetId: "petted-quote-form",
					redirectUrl: "https://petinsurer.azurewebsites.net/quote",
					baseUrl: "https://petinsurer.azurewebsites.net/",
					urlParam: { source: "PettedWidgetSingle", utm_source: "", utm_medium: "", utm_campaign: "", utm_content: "", utm_term: ""},
					refCode: "co",
				});
				QuoteEnginePetted.init();}, 500);
			`}</script>
		</Helmet>
        <Layout></Layout>
		<RegHero section={data.wpPage}></RegHero>
        <main className={c('main')}>
			{
				(data.wpPage.featuredHero.enableFeaturedHero && data.wpPage.featuredHero.heroImage) ?
					<FtExtra section={data.wpPage.featuredHero}></FtExtra>
				: ''
			}
			<article>
				<div class="post__wrapper insurer__content container full">
					<div class="col col-lg-2-3">
						<div class="bg-alt-radius insurer-overview">
							<header class="post__upper">
								<div class="post__author-image">
									<img src={data.wpPage.author.node.userOptions.customProfilePhoto.sourceUrl} alt={data.wpPage.author.node.name} />
								</div>
								<div class="post__author-name-date">    
									<p class="name"><a href="<?php echo get_author_posts_url(get_the_author_meta( 'ID' )); ?>" class="unstyled">{data.wpPage.author.node.name}</a></p>
									<div class="flex">
										<p>{data.wpPage.author.node.userOptions.jobTitle}</p>
										<p>{data.wpPage.date}</p>
									</div>
								</div>
							</header>
							<h2>Overview</h2>
							<div dangerouslySetInnerHTML={{__html:data.wpPage.insurerReview.overview}}></div>

							<h2>Table of contents</h2>
							<div class="toc-bound">
            					<ul class="toc" id="toc">
									{
										toc.map((item, index) => (
											(index < 4) ? 
											<li>
												<a href={`#toc${item.i}`}>{item.match}</a>
											</li> 
											:
											<li className={c({'hidetoc': toggle})}>
												<a href={`#toc${item.i}`}>{item.match}</a>
											</li>
										))
									}
								</ul>
								<button id="toc-toggle" className={c({'toggled': !toggle})} onClick={ e => setToggle( !toggle ) }>{(toggle) ? 'Show more' : 'Show less'}</button></div>

								<h2>Our {data.wpPage.insurerReview.insurer.title} rating</h2>
								<Rating section={data.wpPage.insurerReview} title={false} half={false}  />

								{
									(pros || cons) ? 
										<ProsCons title={data.wpPage.insurerReview.insurer.title} pros={pros} cons={cons}></ProsCons>
									: ''
								}
							</div> 
						<div class="content-wrap entry-content">
							{
								pageData.map((section, i) => {
									return section.name == 'core/freeform' ? <LoadSection val={section} key={i} imageArray={images} /> : ''
								})
							}
						</div>
						<div className="force-padding">
							<Rating section={data.wpPage.insurerReview} title={true} half={false}  />
						</div>

						<div class="hr"><hr /></div>
						<div class="bg-alt-radius about-author">
							<div class="about-author__image">
								<img src={data.wpPage.author.node.userOptions.customProfilePhoto.sourceUrl} alt={data.wpPage.author.node.name} />
							</div>
							<div class="about-author__meta">
								<h2 class="about-author__title">{data.wpPage.author.node.name}</h2>
								<p class="subtitle">{data.wpPage.author.node.userOptions.jobTitle}</p>
								<p class="no-bm">{data.wpPage.author.node.description}</p>
							</div>
						</div>
					</div>
					<div class="col col-lg-1-3">
						<div class="position-sticky pt">
							<div id="petted-quote-form"></div>
						</div>
					</div>
				</div>
				<main class="main container container--full" role="main" id="main-content">
					{
						pageData.map((section, i) => {
							return section.name !== 'core/freeform' ? <LoadSection val={section} key={i} imageArray={images} /> : ''
						})
					}
				</main>
			</article>
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
			author {
				node {
					name
					description
					userOptions {
						jobTitle
						customProfilePhoto {
							sourceUrl
						}
					}
				}
			}
			insurerReview {
				excerpt
				insurer {
				  	... on WpInsurer {
						id
						title
				  	}
				}
				overview
				prosCons {
				  	pros {
						item
				  	}
				  	cons {
						item
				  	}
				}
				rating {
					valueForMoney
					speedOfClaims
					overallRating
					easyToUnderstand
					customerService
					claimsProcedure
				}
			}
			date(formatString: "MMM DD, yyyy")
			title
			blocksJSON
			featuredHero {
				enableFeaturedHero
				fieldGroupName
				heroVideoId
				introduction
				pageTitle
				showBreadcrumbs
				heroImage {
					sourceUrl
					altText
				}
				heroImageMobile {
					sourceUrl
				}
			}
			insurerVsInsurer {
				comparisonTable {
				  quoteDetails {
					breed
					quoteDescription
					type
				  }
				  insurer1Cost
				  insurer2Cost
				}
				disclaimer
				insurer1 {
				  ... on WpInsurer {
					insurerDetails {
					  logo {
						sourceUrl
						title
					  }
					}
				  }
				}
				insurer2 {
				  ... on WpInsurer {
					insurerDetails {
					  logo {
						sourceUrl
						title
					  }
					}
				  }
				}
			}
			hero {
				heroContent
				heroButtonText
				heroButtonLink {
					url
				}
				heroImage {
					sourceUrl
					altText
				}
				heroMobileImage {
					sourceUrl
				}
			}
			noneHomeHeader {
				nhhMoveImageDown
				nhhBackgroundImage {
					sourceUrl
				}
				nhhBackgroundImageMobile {
					sourceUrl
				}
				nhhImage {
					sourceUrl
					altText
				}
			}
			pageSettings {
				altHeaderWave
				noContainerOnMain
			}
		}
		allWpPage(filter: {template: {templateName: {eq: "Insurer Review"}}}) {
			edges {
			  node {
				insurerReview {
				  rating {
					claimsProcedure
					customerService
					easyToUnderstand
					overallRating
					valueForMoney
					speedOfClaims
				  }
				  insurer {
					... on WpInsurer {
					  title
					}
				  }
				}
			  }
			}
		}
		wp {
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
			acfOptionsInsurer {
				valueForMoneyComparisonTable {
					caseStudy1 {
						state
						title
					}
					caseStudy2 {
					  	state
					  	title
					}
					caseStudy3 {
					  	state
					  	title
					}
					costing {
					 	caseStudy1Cost
					  	caseStudy2Cost
					  	caseStudy3Cost
					  	insurer {
							... on WpInsurer {
						  		title
							}
						}
					}
				}
				insurerCoverageTable {
					disclaimerText
					insurerCoverage {
						annualCoverageOptions
						appToMakeClaims
						chargeForPayingMonthly
						deductibleOptions
						dentalAccidentsCovered
						dentalIllnessesCovered
						endOfLifeCoverage
						maximumAgeAtSignUp
						multiPetDiscountOffered
						reimbursementOptions
						vetExamFeesIncludedAtNoExtraCost
						virtualVettelehealthService
						wellnessPlanOffered
						whenDoesCoverageStart
						insurer {
						... on WpInsurer {
								title
								insurerDetails {
									logo {
										sourceUrl
									}
								}
							}
						}
					}
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