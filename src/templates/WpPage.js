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

const WpPost = ({data}) => {
	const pageData = JSON.parse(data.wpPage.blocksJSON);
	const images = data.allWpMediaItem.edges;

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
			return <Classic section={val} images={imageArray} />;
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
        <Layout></Layout>
		{
			(pageurl == '/') ?
				<Hero section={data.wpPage.hero} title={data.wpPage.title} ratings={data.wp.themeGeneralSettings.ratingsWidget}></Hero>
			: 
				<RegHero section={data.wpPage}></RegHero>
		}
        <main className={c('main', {'container': noContainer != true}, {'container--full': noContainer != true})}>
			{
				(data.wpPage.featuredHero.enableFeaturedHero) ?
					<FtExtra section={data.wpPage.featuredHero}></FtExtra>
				: ''
			}
			{
				pageData.map((section, i) => (
					<LoadSection val={section} key={i} imageArray={images} />
				))
			}
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
  
	  wp {
		themeGeneralSettings {
		  ratingsWidget {
			ratingName
			ratingNumber
			ratingStars
			ratingValue
			ratingLink
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