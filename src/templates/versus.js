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
import c from 'classnames'
import {Helmet} from "react-helmet";

const WpPost = ({data}) => {
	const pageData = JSON.parse(data.wpPage.blocksJSON);
	const images = data.allWpMediaItem.edges;
	let insurerReviews = data.allWpPage.edges;
	let comparison = data.wp.acfOptionsInsurer.insurerCoverageTable;
	let insurerVsInsurer = data.wpPage.insurerVsInsurer;
	let title = data.wpPage.title;
	let value = data.wp.acfOptionsInsurer.valueForMoneyComparisonTable;

	setTimeout(() => {
		console.log(data);
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
			return <Classic section={val} images={imageArray} reviews={insurerReviews} versus={insurerVsInsurer} comparison={comparison} title={title} value={value} />;
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
			return <GenericText section={val} images={imageArray} reviews={insurerReviews} versus={insurerVsInsurer} comparison={comparison} title={title} value={value} />;
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
				<div class="post__wrapper versus container padded-content">
					<div class="col col-lg-2-3 content-wrap entry-content">
						{
							pageData.map((section, i) => {
								console.log(section);
								return (section.name == 'core/freeform' || section.name == 'acf/generic-text-block') ? <LoadSection val={section} key={i} imageArray={images} /> : ''
							})
						}
					</div>
					<div class="col col-lg-1-3">
						<div class="position-sticky">
							<div id="petted-quote-form"></div>
						</div>
					</div>
				</div>
				<main class="main container container--full" role="main" id="main-content">
					{
						pageData.map((section, i) => {
							return (section.name !== 'core/freeform' && section.name !== 'acf/generic-text-block') ? <LoadSection val={section} key={i} imageArray={images} /> : ''
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