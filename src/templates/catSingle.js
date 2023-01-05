import React from "react"
import { graphql } from "gatsby"
import Layout from '../components/header/header'
import RegHero from '../components/regHero/regHero'
import FtExtra from '../components/featuredHeroExtra/featuredHeroExtra'
import Footer from '../components/footer/footer'
import PostCard from '../components/blogItem/blogItem'
import AccordionArchive from '../components/accordionArchive/accordionArchive'
import c from 'classnames'
import {Helmet} from "react-helmet";
import reactStringReplace from 'react-string-replace';
import { useState, useEffect } from "react"
import * as Styles from './catSingle.module.scss'

const WpPost = ({data}) => {
	const images = data.allWpMediaItem.edges;
	let posts = data.wpCategory.posts.nodes;
	let ppp = 10;
	let numPage = Math.ceil(posts.length / ppp);
	//initial state of the posts (page 1)
	const [ toggle, setToggle ] = useState(getPosts(1,10));
	const [ remember, setRemember ] = useState(1);

	//loops through all posts and renders the ones for the page
	function getPosts(start,end) {
		let myArray = [];

		posts.map((item, index) => {
			let image = 'https://dev-petted2.pantheonsite.io/wp-content/uploads/2022/01/hero-bg-mob.jpg';
			if(item.featuredImage) {
				image = item.featuredImage.node.sourceUrl;
			}
			let count = index + 1;
			if(count >= start && count <= end) {
				myArray.push(<a href={item.uri} className="archive__card"><div className="archive__image" style={{ backgroundImage: `url('${image}')`}}></div><div className="archive__title"><h2>{item.title}</h2></div><div className="archive__date"><p>{item.date}</p></div></a>);
			}
		});

		if(numPage == 1) {
			setTimeout(() => {
				document.querySelector('.next').style.display = 'none';
			}, 500);
			
		}

		return myArray;
	}


	//work out first and last post for page and send nums to get posts
	function postPagination(current, prev, next) {
		if (next) {
			let next = remember + 1;
			let betweenStart = ((next * ppp) - ppp) + 1;
			let betweenEnd = (next * ppp);
			setRemember(next);
			setToggle(getPosts(betweenStart,betweenEnd));
			sortPrevNext(next);
		} else if(prev) {
			let prev = remember - 1;
			let betweenStart = ((prev * ppp) - ppp) + 1;
			let betweenEnd = (prev * ppp);
			setRemember(prev);
			setToggle(getPosts(betweenStart,betweenEnd));
			sortPrevNext(prev);
		} else {
			let betweenStart = ((current * ppp) - ppp) + 1;
			let betweenEnd = (current * ppp);
			setRemember(current);
			setToggle(getPosts(betweenStart,betweenEnd));
			sortPrevNext(current);
		}
	}

	function sortPrevNext(page) { 
		if (typeof window !== 'undefined') {
			let allpages = document.querySelectorAll('.loop-pagination--numbers a');

			allpages.forEach(function(item) {
				item.classList.remove('current');
			});
			
			document.getElementById('page-'+ page).classList.add('current');

			if(page == numPage) {
				document.querySelector('.next').classList.add('disabled');
			} else {
				document.querySelector('.next').classList.remove('disabled');
			}

			if(page == 1) {
				document.querySelector('.previous').classList.add('disabled');
			} else {
				document.querySelector('.previous').classList.remove('disabled');
			}
		}
	}

	useEffect(() => {

	}, [ toggle ] );

  return (
	<div>
        <Layout></Layout>
		<RegHero section={data.wpCategory} title={data.wpCategory.name}></RegHero>
		<main className="main" role="main" id="main-content">
			<div className="">
				<div className="archive__wrapper archive__wrapper--wider container">
					{toggle}
				</div>
				<div className="loop-pagination">
					<a className="loop-pagination--button previous disabled" href="javascript:void(0);" onClick={() => postPagination(0, true, false)} rel="prev">
						&lt;
					</a>
					<div className="loop-pagination--numbers">
						{Array.from({ length: numPage }, (_, i) => {
							return (
								<a id={`page-${i+1}`} className={c({'current': i == 0})} key={`pagination-number${i + 1}`} href='javascript:void(0);' onClick={() => postPagination(i + 1, false, false)}>
								{i + 1}
								</a>
							)
						})}
					</div>
					<a className="loop-pagination--button next" href="javascript:void(0);" onClick={() => postPagination(0, false, true)} rel="next">
						&gt;
					</a>
				</div>
			</div>
			<div className="container container--no-flex">
				<div className={Styles.archiveQuote}>
					<div className={Styles.archiveQuoteLeft}>
						<div className="image-mask">
							<img src="https://petted.com/wp-content/uploads/2022/02/blog-dog-600x600.jpg" />
						</div>
					</div>
					<div className={Styles.archiveQuoteRight}>
						<h2>Pet insurance made easy!</h2>
						<p>Compare the best value plans in under 60 seconds</p>
						<a href="https://quote.petted.com/quote/" target="_blank" className="btn btn--alt">Get a free quote</a>
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
		wpCategory(id: { eq: $id }) {
			id
			name
    		posts {
				nodes {
					featuredImage {
						node {
							sourceUrl
						}
					}
					title
					uri
					date(formatString: "Do MMMM, yyyy")
				}
			}
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