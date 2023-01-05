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
import * as Styles from './blogHome.module.scss'

const WpPost = ({data}) => {

	const images = data.allWpMediaItem.edges;
	let posts = data.allWpPost.edges;
	let cats = data.allWpCategory.nodes;
	let featureds = data.wpPage.blog.featuredPosts;
	let ppp = 4;
	let numPage = Math.ceil(posts.length / ppp);
	let currentFilter = 'all';

	var all = {
		'Fun': [],
		'Behavior': [],
		'News': [],
		'Advice': [],
		'Health': []
	};

	for (let index = 0; index < cats.length; index++) {
		const element = cats[index];
		for (let i = 0; i < posts.length; i++) {
			const inner = posts[i];
			if(element.name == inner.node.categories.nodes[0].name) {
				all[element.name].push(inner);
			}
		}
	}

	//initial state of the posts (page 1)
	const [ toggle, setToggle ] = useState(getPosts(1,4,false));
	const [ remember, setRemember ] = useState(1);
	const [ pagination, setPagination ] = useState(buildPagination(numPage));
	const [ hardFilter, setHardFilter ] = useState('all');

	//loops through all posts and renders the ones for the page
	function getPosts(start,end, passedFilter) {
		let myArray = [];
		if(passedFilter && passedFilter != 'all') {
			all[passedFilter].map((item, index) => {
				let image = 'https://dev-petted2.pantheonsite.io/wp-content/uploads/2022/01/hero-bg-mob.jpg';
		
				if(item.node.featuredImage) {
					image = item.node.featuredImage.node.sourceUrl;
				}
				let count = index + 1;
				if(count >= start && count <= end) {
					myArray.push(<PostCard data={item.node} index={count} image={image}/>);
				}
				numPage = Math.ceil(all[passedFilter].length / ppp);
			});
		} else {
			posts.map((item, index) => {
				let image = 'https://dev-petted2.pantheonsite.io/wp-content/uploads/2022/01/hero-bg-mob.jpg';
		
				if(item.node.featuredImage) {
					image = item.node.featuredImage.node.sourceUrl;
				}
				let count = index + 1;
				if(count >= start && count <= end) {
					myArray.push(<PostCard data={item.node} index={count} image={image}/>);
				}
				numPage = Math.ceil(posts.length / ppp);
			});
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
			setToggle(getPosts(betweenStart,betweenEnd,hardFilter));
			sortPrevNext(next);
		} else if(prev) {
			let prev = remember - 1;
			let betweenStart = ((prev * ppp) - ppp) + 1;
			let betweenEnd = (prev * ppp);
			setRemember(prev);
			setToggle(getPosts(betweenStart,betweenEnd,hardFilter));
			sortPrevNext(prev);
		} else {
			let betweenStart = ((current * ppp) - ppp) + 1;
			let betweenEnd = (current * ppp);
			setRemember(current);
			setToggle(getPosts(betweenStart,betweenEnd,currentFilter));
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

	function changeTab(e, select) {
		if (typeof window !== 'undefined') {
			let alltabs = document.querySelectorAll('.blogCats a');
			let tab = e.target;
			let myFilter = false;
			if(select) {
				myFilter = e;
			} else {
				myFilter = e.target.innerHTML;
			}
			
			alltabs.forEach(function(item) {
				item.classList.remove('catActive');
			});

			if(myFilter == 'Latest Posts') {
				myFilter = 'all';
			}

			currentFilter = myFilter;
			setHardFilter(myFilter);
			setToggle(getPosts(1,4,myFilter));
			setPagination(buildPagination(numPage));
			postPagination(1, false, false);
			if(!select) {
				tab.classList.add('catActive');
			}
		}
	}

	function buildPagination(pageNum) {
		let pages = [];
		for (let i = 0; i < pageNum; i++) {
			pages.push(<a id={`page-${i+1}`} className={c({'current': i == 0})} key={`pagination-number${i + 1}`} href='javascript:void(0);' onClick={() => postPagination(i + 1, false, false)}>{i + 1}</a>);
		}
		return pages;
	}

	useEffect(() => {

	}, [ toggle ] );

  return (
	<div className="blogHome">
        <Layout></Layout>
		<RegHero section={data.wpPage}></RegHero>
		<main className="main blog" role="main" id="main-content">
			<div className="container container--no-flex">
				{
					(featureds) ? 
						<div className={Styles.blogFeatured}>
							<p>Featured Content</p>
							<div className={Styles.blogFeaturedWrapper}>
								{
									featureds.map((post, index) => {
										
										let image = 'https://www.petted.com/wp-content/uploads/2022/01/hero-bg-mob.jpg';
										if(post.post.featuredImage) {
											image = post.post.featuredImage.node.sourceUrl;
										}	
										let catClass = '' 

										if(post?.post?.categories?.nodes[0]?.name) {
											catClass = 'blogLatestCat' + post.post.categories.nodes[0].name;
										}

										return (
											<a href={post.post.uri} className={c(Styles.blogFeaturedCard, {[Styles.hasCat]: post?.post?.categories?.nodes[0]?.name})} style={{ backgroundImage: `url('${image}')`}}>
												{
													(post?.post?.categories?.nodes[0]?.name) ?
														<div className={c(`${Styles.blogFeaturedCat} ${Styles.blogLatestCat} ${Styles[catClass]}`)}>
															<p>{post.post.categories.nodes[0].name}</p>
														</div>
													: ''
												}
													<div className={c(Styles.blogFeaturedTitle, Styles.blogFeaturedTitleTop)}>
														<h2>{post.post.title}</h2>
													</div>
											</a>
										)
									})
								}
							</div>
						</div>
					: ''
				}
				<div className={Styles.blogUpper}>
					<div className={Styles.blogCategoryWrapper}>					
							{ 
								(cats) ? 
									<div className={c(Styles.blogCategories, 'blogCats')}>		
										<a href="javascript:void(0);" onClick={(e) => changeTab(e, false)} data-value="0" className={'catActive'}>Latest Posts</a>
										{ 
											cats.map((cat, index) => {
												return (
													<a href="javascript:void(0);" onClick={(e) => changeTab(e, false)} data-value={cat.id} key={index}>{cat.name}</a>
												)
											})
										}
									</div>
								: ''
							}
						<div className={Styles.blogCategoriesMobile}>
						    <select name="articleType" id="articleType" onChange={e => changeTab(e.target.value, true)}>
						        <option value="all" selected="selected">Latest Posts</option>
								{ 
									cats.map((cat, index) => {
										return (
											<option value={cat.id} key={index}>{cat.name}</option>
										)
									})
								}
						    </select>
						</div>
					</div>
				</div>
				<div className={Styles.blogWrapper}>
					<div className={Styles.blogResults}>
						{toggle}
					</div>
				</div>
				<div className={Styles.blogNumbers}>
					<div className="loop-pagination">
						<a className="loop-pagination--button previous disabled" href="javascript:void(0);" onClick={() => postPagination(0, true, false)} rel="prev">
							&lt;
						</a>
						<div className="loop-pagination--numbers">
							{pagination}
						</div>
						<a className="loop-pagination--button next" href="javascript:void(0);" onClick={() => postPagination(0, false, true)} rel="next">
							&gt;
						</a>
					</div>
				</div>
				<div className={Styles.blogQuote}>
					<div className={Styles.blogQuoteLeft}>
						<div className="image-mask">
							<img src={data.wpPage.blog.blogQuoteImage.sourceUrl} alt="" />
						</div>
					</div>
					<div className={Styles.blogQuoteRight}>
						<h2>{data.wpPage.blog.blogQuoteTitle}</h2>
						<div dangerouslySetInnerHTML={{__html: data.wpPage.blog.blogQuoteText}}></div>
						<a href={data.wpPage.blog.blogQuoteLink} target="_blank" className="btn btn--alt">{data.wpPage.blog.blogQuoteButtonText}</a>
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
			blog {
				blogQuoteButtonText
				blogQuoteLink
				blogQuoteText
				blogQuoteTitle
				featuredPosts {
					post {
						... on WpPost {
							categories {
								nodes {
								uri
								name
								}
							}
							uri
							title
							featuredImage {
								node {
									sourceUrl
								}
							}
						}
						... on WpPage {
							uri
							title
							featuredImage {
							  node {
								sourceUrl
							  }
							}
						}
				  	}
				}
				blogQuoteImage {
				  	sourceUrl
				}
			}
		}
		allWpCategory(filter: {count: {gt: 0}}) {
			nodes {
			  	name
			  	databaseId
			}
		}
		allWpPost (sort: {fields: date, order: DESC}) {
			edges {
				node {
					featuredImage {
						node {
							sourceUrl
						}
					}
					title
					uri
					date
					categories {
						nodes {
							id
							name
							databaseId
						}
					}
					excerpt
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