import React from "react"
import { graphql } from "gatsby"
import Layout from '../components/header/header'
import AuthorHeader from '../components/authorHeader/authorHeader'
import Footer from '../components/footer/footer'
import PostCard from '../components/postCard/postCard'
import AccordionArchive from '../components/accordionArchive/accordionArchive'
import c from 'classnames'
import {Helmet} from "react-helmet";
import reactStringReplace from 'react-string-replace';
import { useState, useEffect } from "react"

const WpPost = ({data, pageContext}) => {
	const images = data.allWpMediaItem.edges;
	let posts = data.wpUser.posts.nodes;
	let pages = data.wpUser.pages.nodes;
	let breeds = data.wpUser.breeds.nodes;
	let states = data.wpUser.states.nodes;
	let combined = [];

	

	for (let index = 0; index < posts.length; index++) {
		const element = posts[index];
		combined.push(element);
	}

	for (let index = 0; index < pages.length; index++) {
		const element = pages[index];
		combined.push(element);
	}

	for (let index = 0; index < breeds.length; index++) {
		const element = breeds[index];
		combined.push(element);
	}

	for (let index = 0; index < states.length; index++) {
		const element = states[index];
		combined.push(element);
	}

	//combine all 4 arrays into one and sort by date
	combined.sort(function(a,b){
		return new Date(b.date) - new Date(a.date);
	});

	//initial state of the posts (page 1)
	const [ toggle, setToggle ] = useState(getPosts(1,10));
	const [ remember, setRemember ] = useState(1);

	//loops through all posts and renders the ones for the page
	function getPosts(start,end) {
		let myArray = [];

		combined.map((item, index) => {
			let image = 'https://dev-petted2.pantheonsite.io/wp-content/uploads/2022/01/hero-bg-mob.jpg';
	
			if(item.featuredImage) {
				image = item.featuredImage.node.sourceUrl;
			}
			let count = index + 1;
			if(count >= start && count <= end) {
				myArray.push(<PostCard data={item} index={count} image={image}/>);
			}
		});

		return myArray;
	}

	let ppp = 10;
	let numPage = Math.ceil(combined.length / ppp);

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

	function changeTab(tab) {
		if (typeof window !== 'undefined') {
			let alltabs = document.querySelectorAll('.tablist__tab');
			let alllists = document.querySelectorAll('.tablist__panel');
			alltabs.forEach(function(item) {
				item.setAttribute("aria-selected", false);
			});
			alllists.forEach(function(item) {
				item.classList.remove('tablist__panel--active');
			});
			document.getElementById('tablist_tab'+tab).setAttribute("aria-selected", true);
			document.getElementById('tablist_panel'+tab).classList.add('tablist__panel--active');
		}
	}

	const result = combined.reduce((r, {date, title, uri}) => {
		let dateObj = new Date(date);
		let monthyear = dateObj.toLocaleString("en-us", { month: "long", year: 'numeric' });

		if(!r[monthyear]) {
			r[monthyear] = {monthyear, entries: 1, records: [{'title': title, 'url': uri}]}
		}
		else {
			r[monthyear].entries++;
			r[monthyear].records.push({'title': title, 'url': uri});
		}
		return r;
	}, {})

	useEffect(() => {
	
	}, [ toggle ] );

  return (
	<div>
        <Layout></Layout>
		<AuthorHeader section={data} />
        <main className={c('main site-main single single--author')}>
			<div class="section">
				<div class="archive__wrapper container">
					<div class="tablist">
						<div role="tablist" aria-label="{{ aria_label }}" class="tablist__tabs">
							<button role="tab" id="tablist_tab1" onClick={() => changeTab(1)} aria-selected="true" aria-controls="tablist_panel1" tabindex="-1" class="tablist__tab">
									Latest
							</button>
							<button role="tab" id="tablist_tab2" onClick={() => changeTab(2)} aria-selected="false" aria-controls="tablist_panel2" tabindex="-1" class="tablist__tab">
									Archive
							</button>
						</div>
						<div class="tablist__panels">
							<div tabindex="0" role="tabpanel" id="tablist_panel1" aria-labelledby="tablist_tab1" class="tablist__panel tablist__panel--active">
								<div class="blog__wrapper">
									<div class="blog__results">
										{toggle}
									</div>
								</div>
								<div class="blog__numbers">
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
							</div>
							<div tabindex="0" role="tabpanel" id="tablist_panel2" aria-labelledby="tablist_tab2" class="tablist__panel">
								<AccordionArchive data={result} />
							</div>
						</div>
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
		wpUser(id: { eq: $id }) {
			id
    		name
			description
			userOptions {
				jobTitle
				customProfilePhoto {
					sourceUrl
				}
			}
			posts {
				nodes {
					featuredImage {
						node {
							sourceUrl
						}
					}
					title
					uri
					date
					excerpt
					categories {
						nodes {
						  id
						  name
						  databaseId
						}
					}
				}
			}
			pages {
				nodes {
					featuredImage {
						node {
							sourceUrl
						}
					}
					title
					uri
					date
					content
				}
			}
			states {
				nodes {
					featuredImage {
						node {
							sourceUrl
						}
					}
					title
					uri
					date
					excerpt
				}
			}
			breeds {
				nodes {
					featuredImage {
						node {
							sourceUrl
						}
					}
					title
					uri
					date
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