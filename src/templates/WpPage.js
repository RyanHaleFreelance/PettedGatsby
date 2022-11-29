import React from "react"
import { graphql } from "gatsby"
import Layout from '../components/header/header'
import Steps from '../components/steps/steps'
import Partners from '../components/partnersBlock/partnersBlock'
import Testimonials from '../components/testimonials/testimonials'
import TextAccordion from '../components/textAccordion/textAccordion'
import Plan from '../components/plan/plan'
import RegHero from '../components/regHero/regHero'
import Footer from '../components/footer/footer'
import InsurerSlider from '../components/insurerSlider/insurerSlider'
import FtExtra from '../components/featuredHeroExtra/featuredHeroExtra'
import SingleText from '../components/singleText/singleText'
import TwoCol from '../components/twoColumn/twoColumn'
import Blockquote from '../components/blockQuote/blockQuote'

const WpPost = ({data}) => {
	const pageData = JSON.parse(data.wpPage.blocksJSON);
	const images = data.allWpMediaItem.edges;
	setTimeout(() => {
		console.log(pageData);
	}, 2000);

	const LoadSection = ({ val, imageArray }) => {
		switch (val.attributes.name) {
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
			default:
			return "Block (" + val.attributes.name + ") not found. ";
		}
	};
  return (
    <div>
        <Layout></Layout>
        <RegHero section={data.wpPage}></RegHero>
        <main className="main container container--full">
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