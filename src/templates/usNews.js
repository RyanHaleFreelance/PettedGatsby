import * as React from "react"
import * as Styles from "../components/usNews.module.scss"
import c from 'classnames'
import axios from 'axios';
import {Helmet} from "react-helmet";

const IndexPage = () => {
	const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	const today = new Date();
	const yesterday = new Date(today);

	yesterday.setDate(yesterday.getDate() - 1);

	today.toDateString();
	yesterday.toDateString();

	var month = yesterday.getMonth()+1;
	var day = yesterday.getDate();
	var year = yesterday.getFullYear();

	setTimeout(() => {
		if (typeof window !== 'undefined') {
			document.querySelector(".headerDate span").innerHTML = monthNames[yesterday.getMonth()] + ' ' + day + ', ' + year;

			var title = getUrlVars()["title"];
			var type = getUrlVars()["type"];

			if(typeof title !== 'undefined') {
				var titledecode = decodeURIComponent(title);
				document.querySelector(".peUsHeaderTitle h1").innerHTML = titledecode;

				if(typeof type !== 'undefined') {
					document.querySelector(".peUsHeaderTitle h1").setAttribute('data-' + type, titledecode); 
				} else {
					document.querySelector(".peUsHeaderTitle h1").setAttribute('data-puppy', titledecode); 
				}
			}

			if(typeof type !== 'undefined') {
				setTimeout(() => {
					changeActive(type);
				}, 10);
			}
		}
	}, 1);


	function getUrlVars()
	{
		if (typeof window !== 'undefined') {
			var vars = [], hash;
			var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
			for(var i = 0; i < hashes.length; i++)
			{
				hash = hashes[i].split('=');
				vars.push(hash[0]);
				vars[hash[0]] = hash[1];
			}
			return vars;
		}
	}

	function changeActive(current) {
		if (typeof window !== 'undefined') {
			var elements = document.getElementsByClassName('usNews-module--active--3475a');
			
			while(elements.length > 0){
				elements[0].classList.remove('usNews-module--active--3475a');
			}

			document.querySelector('.' + current).classList.add('usNews-module--active--3475a');
			document.querySelector('.peUsHeader').classList.remove('headerpuppy', 'headerdog', 'headerkitten', 'headercat');
			document.querySelector('.peUsHeader').classList.add('header' + current);

			let test = document.querySelectorAll('[data-' + current + ']');
			for (let index = 0; index < test.length; index++) {
				const element = test[index];
				let data = element.getAttribute('data-' + current);
				element.innerHTML = data;
			}
		}
	}
	
		// fetch("https://api.ip2location.com/v2/?key=6EJ8CZ3EBW&package=WS3")
		//   .then((response) => response.json())
		//   .then(function(data) {
		// 	console.log(data);
		// }).catch(error => console.log('error', error));

return(
	<html>
		<Helmet>
			<meta charset="<?php bloginfo('charset'); ?>" />
			<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0" />
	
			<script>{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-KCGF6MF');`}</script>

			<script>{`
				(function (doc, tag, id) { var js = doc.getElementsByTagName(tag)[0]; if (doc.getElementById(id)) { return; } js = doc.createElement(tag); js.id = id; js.src = "https://quote.petted.com/Scripts/lib/widgets/petted/quote-form/widget.js"; js.type = "text/javascript"; doc.body.appendChild(js); }(document, 'script', 'petted-quote-engine')); setTimeout(() => {document.addEventListener("load", function (event) { QuoteEnginePetted.setOptions({ targetId: "petted-quote-form", redirectUrl: "https://quote.petinsurer.com/quote", baseUrl: "https://quote.petinsurer.com/", urlParam: { source:'BestOfWidget', utm_source: '', utm_medium: '', utm_campaign: '', utm_content: '', utm_term: '', referer:window.location.href, }, refCode: 'co', }); QuoteEnginePetted.init(); }, false); console.log('yello');}, 3000);console.log(document.querySelector('#petted-quote-form'));
			`}</script>

			<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
			<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
			<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
			<link rel="manifest" href="/site.webmanifest" />
			<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#6067ee" />
			<meta name="msapplication-TileColor" content="#6067ee" />
			<meta name="theme-color" content="#ffffff" />
	
			<link rel="preconnect" href="https://fonts.googleapis.com" />
			<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
			<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
		</Helmet>
		<body>
			<meta name="viewport" content="width=device-width, initial-scale=1"/>
			<link rel="preconnect" href="https://fonts.googleapis.com"/>
			<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
			<link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"/>
			<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js" integrity="sha512-894YE6QWD5I59HgZOGReFYm4dnWc1Qt5NtvYSaNcOP+u1T9qYdvdihz0PPSiiqn/+/3e7Jo4EaG7TubfWGUrMQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
		<main className={c(Styles.main, Styles.peUsWrapper)} role="main" id="main-content">
			<div className={Styles.peUsPreNav}>
				<img src="https://dev-petted2.pantheonsite.io/wp-content/uploads/2022/01/usn-logo.svg" alt="US News Logo" />
				<p>INSURANCE</p>
			</div>
			<div className={c(Styles.peUsHeader, 'peUsHeader')}>
				<div className={Styles.peUsContainer}>
					<div className={Styles.peUsHeaderText}>
						<div className={c(Styles.peUsHeaderDate, 'headerDate')}>
							<p>Updated <span>April 25, 2022</span></p>
						</div>
						<div className={c(Styles.peUsHeaderTitle, 'peUsHeaderTitle')}>
							<h1 data-puppy="Pet insurance for puppies" data-dog="Pet insurance for dogs" data-kitten="Pet insurance for kittens" data-cat="Pet insurance for cats">Pet insurance for puppies</h1>
						</div>
						<div className={Styles.peUsHeaderSubText}>
							<p data-puppy="Protect your puppy against accidents & illness, from 8 weeks old and up" data-dog="View the best plans in the US and protect your dog against accidents & illness" data-kitten="Protect your kitten against accidents & illness, from 6 weeks old and up" data-cat="Find the best plans to protect your cat against accidents & illness">Protect your puppy against accidents & illness, from 8 weeks old and up</p>
						</div>
					</div>
				</div>
			</div>
			<div className={Styles.peUsSwitcher}>
				<div className={c(Styles.peUsSwitcherWrapper, Styles.peUsContainer)}>
					<div className={c(Styles.peUsSwitcherMenu, 'peUsSwitcherWrapper')}>
						<a href="javascript:void(0);" onClick={() => changeActive('puppy')} data-type="puppy" className={c(Styles.puppy, Styles.active, 'puppy')}>Puppy</a>
						<a href="javascript:void(0);" onClick={() => changeActive('dog')} data-type="dog" className={c(Styles.dog, 'dog')}>Dog</a>
						<a href="javascript:void(0);" onClick={() => changeActive('kitten')} data-type="kitten" className={c(Styles.kitten, 'kitten')}>Kitten</a>
						<a href="javascript:void(0);" onClick={() => changeActive('cat')} data-type="cat" className={c(Styles.cat, 'cat')}>Cat</a>
					</div>
					<div className={Styles.peUsSwitcherQuote}>
						<a href="#" className={Styles.peUsBtn}>Compare Quotes</a>
					</div>
				</div>
			</div>
			<section>
				<div className={Styles.peUsContainer}>
					<div className={Styles.peUsColWrapper}>
						<div className={Styles.peUsWrapperMainCol}>
							<div className={Styles.peUsBgGrey}>
								<div className={Styles.peUsTitle}>
									{/* <?php $ch = curl_init();
										curl_setopt($ch, CURLOPT_URL, 'https://api.ip2location.com/v2/?ip=' . $_SERVER['REMOTE_ADDR'] . '&key=6EJ8CZ3EBW&package=WS3');
	
										curl_setopt($ch, CURLOPT_FAILONERROR, 1);
										curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
										curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
										curl_setopt($ch, CURLOPT_TIMEOUT, 10);
	
										$response = curl_exec($ch);
	
										// var_dump($response);
										
										$responseArray = explode(',', $response);
										
										$regionExplode = explode(':',$responseArray[3]);
										$region = $regionExplode[1];
										$regionFinal = str_replace('"', " ", $region);
	
										$cityExplode = explode(':',$responseArray[4]);
										$city = $cityExplode[1];
										$cityFinal = str_replace('"', "", $city);
	
										$return = '';
	
										if($regionFinal && $cityFinal) {
											$return = 'in ' . $cityFinal . ', ' . $regionFinal;
										}
										?> */}
									<h2>Top Pet Insurance <span>FIX THIS & IP</span></h2>
								</div>
								<div className={Styles.peUsItem}>
									<div className={Styles.peUsItemWrapper}>
										<div className={Styles.peUsItemInnerWrapper}>
											<div className={Styles.peUsItemLogo}>
												<div className={Styles.peUsItemNumber}>
													<div className={Styles.peUsItemNumberWrapper}>
														<div className={Styles.peUsItemNumberNum}>
															<p>1</p>
														</div>
														<div className={Styles.peUsItemNumberRanking}>
															<p>Editor's Choice</p>
														</div>
													</div>
												</div>
												<div className={Styles.peUsItemLogoImage}>
													<img src="https://dev-petted2.pantheonsite.io/wp-content/uploads/2022/01/manypets.svg" alt="ManyPets Logo" />
												</div>
											</div>
											<div className={Styles.peUsItemMobileRating}>
												<div className={Styles.peUsItemRatingWrapper}>
													<div className={Styles.peUsItemRatingText}>
														<p>5.0</p>
													</div>
													<div className={Styles.peUsItemRatingStars}>
														<img src="https://dev-petted2.pantheonsite.io/wp-content/uploads/2022/04/5-star.svg" alt="Stars rating"/>
													</div>
												</div>
												<div className={Styles.peUsItemQuote}>
													<a href="#" className={Styles.peUsBtn}>Get A Free Quote</a>
												</div>
											</div>
										</div>
										<div className={Styles.peUsItemList}>
											<ul>
												<li data-puppy="Unlimited coverage for accidents and illness" data-dog="Accident and Illness plan" data-kitten="Accident and Illness plan" data-cat="Accident, illness & wellness plans">Unlimited coverage for accidents and illness</li>
												<li data-puppy="Add routine wellness care—save up to 50%!" data-dog="Optional wellness plan" data-kitten="Optional wellness plan" data-cat="Unlimited annual coverage with no caps">Add routine wellness care—save up to 50%!</li>
												<li data-puppy="0% Copay option" data-dog="Coverage begins after 15 days" data-kitten="Coverage begins after 15 days " data-cat="Vet exam fees covered for no extra cost">0% Copay option</li>
												<li data-puppy="No credit check required" data-dog="Covers vet exams for illness and accidents" data-kitten="Coverage starts at $15 for kittens" data-cat="Usually the best value cat plan available ">No credit check required</li>
												<li data-puppy="No fees for paying monthly" data-dog="Hereditary conditions for dogs covered" data-kitten="Hereditary conditions covered" data-cat="No extra fees for paying monthly">No fees for paying monthly</li>
											</ul>
										</div>
										<div className={Styles.peUsItemRating}>
											<div className={Styles.peUsItemRatingWrapper}>
												<div className={Styles.peUsItemRatingText}>
													<p>5.0</p>
												</div>
												<div className={Styles.peUsItemRatingStars}>
													<img src="https://dev-petted2.pantheonsite.io/wp-content/uploads/2022/04/5-star.svg" alt="Stars rating" />
												</div>
											</div>
											<div className={Styles.peUsItemQuote}>
												<a href="#" className={Styles.peUsBtn}>Get A Free Quote</a>
											</div>
										</div>
									</div>
								</div>
								<div className={Styles.peUsItem}>
									<div className={Styles.peUsItemWrapper}>
										<div className={Styles.peUsItemInnerWrapper}>
											<div className={Styles.peUsItemLogo}>
												<div className={Styles.peUsItemNumber}>
													<div className={Styles.peUsItemNumberWrapper}>
														<div className={Styles.peUsItemNumberNum}>
															<p>2</p>
														</div>
														<div className={Styles.peUsItemNumberRanking}>
															<p>Runner Up</p>
														</div>
													</div>
												</div>
												<div className={Styles.peUsItemLogoImage}>
													<img src="https://dev-petted2.pantheonsite.io/wp-content/uploads/2022/01/lemonade.svg" alt="lemonade Logo"/>
												</div>
											</div>
											<div className={Styles.peUsItemMobileRating}>
												<div className={Styles.peUsItemRatingWrapper}>
													<div className={Styles.peUsItemRatingText}>
														<p>4.9</p>
													</div>
													<div className={Styles.peUsItemRatingStars}>
														<img src="https://dev-petted2.pantheonsite.io/wp-content/uploads/2022/04/4.9-star.svg" alt="Stars rating"/>
													</div>
												</div>
												<div className={Styles.peUsItemQuote}>
													<a href="#" className={Styles.peUsBtn}>Get A Free Quote</a>
												</div>
											</div>
										</div>
										<div className={Styles.peUsItemList}>
											<ul>
												
												<li data-puppy="Up to $100,000 cover for accidents & illness" data-dog="Up to $100,000 cover for accidents & illness" data-kitten="Up to $100,000 cover for accidents & illness" data-cat="Accident, illness & wellness plans">Up to $100,000 cover for accidents & illness</li>
												<li data-puppy="Optional wellness plan for vaccines & more" data-dog="Accident and illness coverage plan" data-kitten="Accident and illness coverage plan" data-cat="Covers hereditary cat issues for no extra cost">Optional wellness plan for vaccines & more</li>
												<li data-puppy="10% discount if you bundle pet & home insurance" data-dog="Two-day waiting period for accidents" data-kitten="Covers kitten health emergencies" data-cat="30-day money back guarantee">10% discount if you bundle pet & home insurance</li>
												<li data-puppy="Very competitive monthly pricing" data-dog="Very competitive monthly pricing" data-kitten="Very competitive monthly pricing" data-cat="Very competitive monthly pricing">Very competitive monthly pricing </li>
												<li data-puppy="Multi-pet discount" data-dog="Multi-pet discount" data-kitten="Multi-pet discount" data-cat="Multi-pet discount">Multi-pet discount</li>
											</ul>
										</div>
										<div className={Styles.peUsItemRating}>
											<div className={Styles.peUsItemRatingWrapper}>
												<div className={Styles.peUsItemRatingText}>
													<p>4.9</p>
												</div>
												<div className={Styles.peUsItemRatingStars}>
													<img src="https://dev-petted2.pantheonsite.io/wp-content/uploads/2022/04/4.9-star.svg" alt="Stars rating"/>
												</div>
											</div>
											<div className={Styles.peUsItemQuote}>
												<a href="#" className={Styles.peUsBtn}>Get A Free Quote</a>
											</div>
										</div>
									</div>
								</div>
								<div className={Styles.peUsItem}>
									<div className={Styles.peUsItemWrapper}>
										<div className={Styles.peUsItemInnerWrapper}>
											<div className={Styles.peUsItemLogo}>
												<div className={Styles.peUsItemNumber}>
													<div className={Styles.peUsItemNumberWrapper}>
														<div className={Styles.peUsItemNumberNum}>
															<p>3</p>
														</div>
														<div className={Styles.peUsItemNumberRanking}>
															<p>Runner Up</p>
														</div>
													</div>
												</div>
												<div className={Styles.peUsItemLogoImage}>
													<img src="https://dev-petted2.pantheonsite.io/wp-content/uploads/2022/01/healthypaws.svg" alt="healthypaws Logo" />
												</div>
											</div>
											<div className={Styles.peUsItemMobileRating}>
												<div className={Styles.peUsItemRatingWrapper}>
													<div className={Styles.peUsItemRatingText}>
														<p>4.7</p>
													</div>
													<div className={Styles.peUsItemRatingStars}>
														<img src="https://dev-petted2.pantheonsite.io/wp-content/uploads/2022/04/4.7-star.svg" alt="Stars rating"/>
													</div>
												</div>
												<div className={Styles.peUsItemQuote}>
													<a href="#" className={Styles.peUsBtn}>Get A Free Quote</a>
												</div>
											</div>
										</div>
										<div className={Styles.peUsItemList}>
											<ul>
												<li data-puppy="Protect your puppy from 8 weeks old" data-dog="Accident and Illness coverage " data-kitten="Accident and Illness coverage " data-cat="Accident and Illness coverage ">Protect your puppy from 8 weeks old</li>
												<li data-puppy="No maximum annual or lifetime pay-outs" data-dog="No lifetime caps for dogs " data-kitten="Unlimited coverage caps " data-cat="Unlimited coverage caps ">No maximum annual or lifetime pay-outs</li>
												<li data-puppy="#1 customer-rated 2010-2021" data-dog="Charitable donation made for every new policy " data-kitten="Charitable donation made for every new policy" data-cat="Charitable donation made for every new policy">#1 customer-rated 2010-2021</li>
												<li data-puppy="30-day money-back guarantee" data-dog="30-day money-back guarantee" data-kitten="30-day money-back guarantee" data-cat="30-day money-back guarantee">30-day money-back guarantee</li>
												<li data-puppy="Most claims processed within two days" data-dog="Most claims processed within two days" data-kitten="Most claims processed within two days" data-cat="Most claims processed within two days">Most claims processed within two days</li>
											</ul>
										</div>
										<div className={Styles.peUsItemRating}>
											<div className={Styles.peUsItemRatingWrapper}>
												<div className={Styles.peUsItemRatingText}>
													<p>4.7</p>
												</div>
												<div className={Styles.peUsItemRatingStars}>
													<img src="https://dev-petted2.pantheonsite.io/wp-content/uploads/2022/04/4.7-star.svg" alt="Stars rating"/>
												</div>
											</div>
											<div className={Styles.peUsItemQuote}>
												<a href="#" className={Styles.peUsBtn}>Get A Free Quote</a>
											</div>
										</div>
									</div>
								</div>
								<div className={Styles.peUsMobileQuote}>
									<div id="petted-quote-form-mobile"></div>
								</div>
								<div className={Styles.peUsItem}>
									<div className={Styles.peUsItemWrapper}>
										<div className={Styles.peUsItemInnerWrapper}>
											<div className={Styles.peUsItemLogo}>
												<div className={Styles.peUsItemNumber}>
													<div className={Styles.peUsItemNumberWrapper}>
														<div className={Styles.peUsItemNumberNum}>
															<p>4</p>
														</div>
														<div className={Styles.peUsItemNumberRanking}>
															<p>Runner Up</p>
														</div>
													</div>
												</div>
												<div className={Styles.peUsItemLogoImage}>
													<img src="https://dev-petted2.pantheonsite.io/wp-content/uploads/2022/04/pumpkim.png" alt="pumpkim Logo"/>
												</div>
											</div>
											<div className={Styles.peUsItemMobileRating}>
												<div className={Styles.peUsItemRatingWrapper}>
													<div className={Styles.peUsItemRatingText}>
														<p>4.7</p>
													</div>
													<div className={Styles.peUsItemRatingStars}>
														<img src="https://dev-petted2.pantheonsite.io/wp-content/uploads/2022/04/4.7-star.svg" alt="Stars rating"/>
													</div>
												</div>
												<div className={Styles.peUsItemQuote}>
													<a href="#" className={Styles.peUsBtn}>Get A Free Quote</a>
												</div>
											</div>
										</div>
										<div className={Styles.peUsItemList}>
											<ul>
												<li data-puppy="Accident, illness & wellness plans" data-dog="Accident, illness & wellness plans" data-kitten="Accident, illness & wellness plans" data-cat="Accident, illness & wellness plans">Accident, illness & wellness plans</li>
												<li data-puppy="Unlimited annual coverage available" data-dog="Unlimited annual coverage available" data-kitten="Unlimited annual coverage available" data-cat="Unlimited annual coverage available">Unlimited annual coverage available</li>
												<li data-puppy="Includes vet exam fees as standard" data-dog="Includes vet exam fees as standard" data-kitten="Includes vet exam fees as standard" data-cat="Includes vet exam fees as standard">Includes vet exam fees as standard</li>
												<li data-puppy="Puppy insurance starts from eight weeks old" data-dog="90% reimbursement rate for all breeds" data-kitten="Coverage starts from eight weeks old" data-cat="Covers prescription food and supplements">Puppy insurance starts from eight weeks old</li>
												<li data-puppy="Use any vet in the USA or Canada" data-dog="Use any vet in the USA or Canada" data-kitten="Use any vet in the USA or Canada" data-cat="Use any vet in the USA or Canada">Use any vet in the USA or Canada</li>
											</ul>
										</div>
										<div className={Styles.peUsItemRating}>
											<div className={Styles.peUsItemRatingWrapper}>
												<div className={Styles.peUsItemRatingText}>
													<p>4.7</p>
												</div>
												<div className={Styles.peUsItemRatingStars}>
													<img src="https://dev-petted2.pantheonsite.io/wp-content/uploads/2022/04/4.7-star.svg" alt="Stars rating"/>
												</div>
											</div>
											<div className={Styles.peUsItemQuote}>
												<a href="#" className={Styles.peUsBtn}>Get A Free Quote</a>
											</div>
										</div>
									</div>
								</div>
								<div className={Styles.peUsItem}>
									<div className={Styles.peUsItemWrapper}>
										<div className={Styles.peUsItemInnerWrapper}>
											<div className={Styles.peUsItemLogo}>
												<div className={Styles.peUsItemNumber}>
													<div className={Styles.peUsItemNumberWrapper}>
														<div className={Styles.peUsItemNumberNum}>
															<p>5</p>
														</div>
														<div className={Styles.peUsItemNumberRanking}>
															<p>Runner Up</p>
														</div>
													</div>
												</div>
												<div className={Styles.peUsItemLogoImage}>
													<img src="https://dev-petted2.pantheonsite.io/wp-content/uploads/2022/01/spot.svg" alt="spot Logo"/>
												</div>
											</div>
											<div className={Styles.peUsItemMobileRating}>
												<div className={Styles.peUsItemRatingWrapper}>
													<div className={Styles.peUsItemRatingText}>
														<p>4.6</p>
													</div>
													<div className={Styles.peUsItemRatingStars}>
														<img src="https://dev-petted2.pantheonsite.io/wp-content/uploads/2022/04/4.6-star.svg" alt="Stars rating"/>
													</div>
												</div>
												<div className={Styles.peUsItemQuote}>
													<a href="#" className={Styles.peUsBtn}>Get A Free Quote</a>
												</div>
											</div>
										</div>
										<div className={Styles.peUsItemList}>
											<ul>
												<li data-puppy="Annual coverage from $2,500 to unlimited " data-dog="Annual coverage from $2,500 to unlimited " data-kitten="Annual coverage from $2,500 to unlimited " data-cat="Accident, illness & wellness plans">Annual coverage from $2,500 to unlimited </li>
												<li data-puppy="Alternative and holistic therapies included " data-dog="Alternative and holistic therapies included " data-kitten="Alternative and holistic therapies included " data-cat="Annual coverage from $2,500 - unlimited">Alternative and holistic therapies included </li>
												<li data-puppy="Includes microchipping and vet visits " data-dog="Includes microchipping and vet visits " data-kitten="Includes microchipping and vet visits " data-cat="Covers vet exam fees for cats for no extra cost">Includes microchipping and vet visits </li>
												<li data-puppy="Preventative care plan available " data-dog="Preventative dog care plan available " data-kitten="Treatment for behavioural issues included  " data-cat="10% multi-pet discount">Preventative care plan available </li>
												<li data-puppy="Treatment for behavioural issues included " data-dog="Treatment for behavioural issues included  " data-kitten="Kitten plans start from $11 a month" data-cat="24/7 live vet chat">Treatment for behavioural issues included</li>
											</ul>
										</div>
										<div className={Styles.peUsItemRating}>
											<div className={Styles.peUsItemRatingWrapper}>
												<div className={Styles.peUsItemRatingText}>
													<p>4.6</p>
												</div>
												<div className={Styles.peUsItemRatingStars}>
													<img src="https://dev-petted2.pantheonsite.io/wp-content/uploads/2022/04/4.6-star.svg" alt="Stars rating"/>
												</div>
											</div>
											<div className={Styles.peUsItemQuote}>
												<a href="#" className={Styles.peUsBtn}>Get A Free Quote</a>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className={Styles.peUsItem}>
								<div className={Styles.peUsItemWrapper}>
									<div className={Styles.peUsItemInnerWrapper}>
										<div className={Styles.peUsItemLogo}>
											<div className={Styles.peUsItemLogoImage}>
												<img src="https://dev-petted2.pantheonsite.io/wp-content/uploads/2022/01/embrace.svg" alt="embrace Logo"/>
											</div>
											<div className={c(Styles.peUsItemRatingWrapper, Styles.peUsItemRatingWrapperMobile)}>
												<div className={Styles.peUsItemRatingText}>
													<p>4.4</p>
												</div>
												<div className={Styles.peUsItemRatingStars}>
													<img src="https://dev-petted2.pantheonsite.io/wp-content/uploads/2022/04/4.4-star.svg" alt="Stars rating"/>
												</div>
											</div>
										</div>
										<div className={Styles.peUsItemMobileRating}>
											<div className={Styles.peUsItemQuote}>
												<a href="#" className={Styles.peUsBtn}>Get A Free Quote</a>
											</div>
										</div>
									</div>
									<div className={Styles.peUsItemList}>
										<ul>
											<li data-puppy="Accident, Illness & wellness coverage " data-dog="Accident and Illness coverage " data-kitten="Accident and Illness coverage " data-cat="Accident, illness & wellness plans for cats">Accident, Illness & wellness coverage</li>
											<li data-puppy="10% multi-pet discount " data-dog="Covers curable pre-existing conditions " data-kitten="10% multi-pet discount " data-cat="Rated #1 Pet Insurance provider by Forbes">10% multi-pet discount</li>
											<li data-puppy="Puppies can be enrolled from six weeks old" data-dog="Includes healthy pet deductible " data-kitten="Kittens can be insured from six weeks old " data-cat="24/7 live vet chat">Puppies can be enrolled from six weeks old</li>
										</ul>
									</div>
									<div className={Styles.peUsItemRating}>
										<div className={Styles.peUsItemRatingWrapper}>
											<div className={Styles.peUsItemRatingText}>
												<p>4.4</p>
											</div>
											<div className={Styles.peUsItemRatingStars}>
												<img src="https://dev-petted2.pantheonsite.io/wp-content/uploads/2022/04/4.4-star.svg" alt="Stars rating"/>
											</div>
										</div>
										<div className={Styles.peUsItemQuote}>
											<a href="#" className={Styles.peUsBtn}>Get A Free Quote</a>
										</div>
									</div>
								</div>
							</div>
							<div className={Styles.peUsItem}>
								<div className={Styles.peUsItemWrapper}>
									<div className={Styles.peUsItemInnerWrapper}>
										<div className={Styles.peUsItemLogo}>
											<div className={Styles.peUsItemLogoImage}>
												<img src="https://dev-petted2.pantheonsite.io/wp-content/uploads/2022/01/trupanion.svg" alt="trupanion Logo"/>
											</div>
											<div className={c(Styles.peUsItemRatingWrapper, Styles.peUsItemRatingWrapperMobile)}>
												<div className={Styles.peUsItemRatingText}>
													<p>4.2</p>
												</div>
												<div className={Styles.peUsItemRatingStars}>
													<img src="https://dev-petted2.pantheonsite.io/wp-content/uploads/2022/04/4.2-star.svg" alt="Stars rating"/>
												</div>
											</div>
										</div>
										<div className={Styles.peUsItemMobileRating}>
											<div className={Styles.peUsItemQuote}>
												<a href="#" className={Styles.peUsBtn}>Get A Free Quote</a>
											</div>
										</div>
									</div>
									<div className={Styles.peUsItemList}>
										<ul>
											<li data-puppy="Covers 90% of vet fees " data-dog="Covers 90% of vet fees " data-kitten="Covers 90% of vet fees " data-cat="Accident & illness plan">Covers 90% of vet fees </li>
											<li data-puppy="Covers accidents and illnesses " data-dog="No automatic price increase as dog gets older" data-kitten="Covers accidents and illnesses " data-cat="Pays claims directly to your veterinarian">Covers accidents and illnesses </li>
											<li data-puppy="Only five-day waiting period for injuries " data-dog="Only five-day waiting period for injuries " data-kitten="Only five-day waiting period for injuries " data-cat="Excellent customer service">Only five-day waiting period for injuries</li>
										</ul>
									</div>
									<div className={Styles.peUsItemRating}>
										<div className={Styles.peUsItemRatingWrapper}>
											<div className={Styles.peUsItemRatingText}>
												<p>4.2</p>
											</div>
											<div className={Styles.peUsItemRatingStars}>
												<img src="https://dev-petted2.pantheonsite.io/wp-content/uploads/2022/04/4.2-star.svg" alt="Stars rating"/>
											</div>
										</div>
										<div className={Styles.peUsItemQuote}>
											<a href="#" className={Styles.peUsBtn}>Get A Free Quote</a>
										</div>
									</div>
								</div>
							</div>
							<div className={Styles.peUsItem}>
								<div className={Styles.peUsItemWrapper}>
									<div className={Styles.peUsItemInnerWrapper}>
										<div className={Styles.peUsItemLogo}>
											<div className={Styles.peUsItemLogoImage}>
												<img src="https://dev-petted2.pantheonsite.io/wp-content/uploads/2022/01/petsbest.svg" alt="petsbest Logo"/>
											</div>
											<div className={c(Styles.peUsItemRatingWrapper, Styles.peUsItemRatingWrapperMobile)}>
												<div className={Styles.peUsItemRatingText}>
													<p>4.2</p>
												</div>
												<div className={Styles.peUsItemRatingStars}>
													<img src="https://dev-petted2.pantheonsite.io/wp-content/uploads/2022/04/4.2-star.svg" alt="Stars rating"/>
												</div>
											</div>
										</div>
										<div className={Styles.peUsItemMobileRating}>
											<div className={Styles.peUsItemQuote}>
												<a href="#" className={Styles.peUsBtn}>Get A Free Quote</a>
											</div>
										</div>
									</div>
									<div className={Styles.peUsItemList}>
										<ul>
											<li data-puppy="Coverage for accident and illness exam fees" data-dog="Coverage for accident and illness exam fees" data-kitten="Coverage for accident and illness exam fees" data-cat="Accident, illness & wellness plans">Coverage for accident and illness exam fees</li>
											<li data-puppy="Puppy Wellness plans available " data-dog="Unlimited accident and illness plan option " data-kitten="Wellness plans available " data-cat="Unlimited coverage available ">Puppy Wellness plans available</li>
											<li data-puppy="Unlimited accident and illness plan option " data-dog="Optional vet direct pay" data-kitten="Unlimited accident and illness plan option " data-cat="Multi-pet discount">Unlimited accident and illness plan option</li>
										</ul>
									</div>
									<div className={Styles.peUsItemRating}>
										<div className={Styles.peUsItemRatingWrapper}>
											<div className={Styles.peUsItemRatingText}>
												<p>4.2</p>
											</div>
											<div className={Styles.peUsItemRatingStars}>
												<img src="https://dev-petted2.pantheonsite.io/wp-content/uploads/2022/04/4.2-star.svg" alt="Stars rating"/>
											</div>
										</div>
										<div className={Styles.peUsItemQuote}>
											<a href="#" className={Styles.peUsBtn}>Get A Free Quote</a>
										</div>
									</div>
								</div>
							</div>
							<div className={Styles.peUsItem}>
								<div className={Styles.peUsItemWrapper}>
									<div className={Styles.peUsItemInnerWrapper}>
										<div className={Styles.peUsItemLogo}>
											<div className={Styles.peUsItemLogoImage}>
												<img src="https://dev-petted2.pantheonsite.io/wp-content/uploads/2022/04/fetch.svg" alt="fetch Logo"/>
											</div>
											<div className={c(Styles.peUsItemRatingWrapper, Styles.peUsItemRatingWrapperMobile)}>
												<div className={Styles.peUsItemRatingText}>
													<p>4.1</p>
												</div>
												<div className={Styles.peUsItemRatingStars}>
													<img src="https://dev-petted2.pantheonsite.io/wp-content/uploads/2022/04/4.1-star.svg" alt="Stars rating"/>
												</div>
											</div>
										</div>
										<div className={Styles.peUsItemMobileRating}>
											<div className={Styles.peUsItemQuote}>
												<a href="#" className={Styles.peUsBtn}>Get A Free Quote</a>
											</div>
										</div>
									</div>
									<div className={Styles.peUsItemList}>
										<ul>
											<li data-puppy="Accident, illness & comprehensive dental cover" data-dog="Accident, illness & comprehensive dental cover" data-kitten="Accident, illness & comprehensive dental cover" data-cat="Accident, illness & comprehensive dental cover">Accident, illness & comprehensive dental cover</li>
											<li data-puppy="Vet exam fees included as standard" data-dog="Vet exam fees included as standard" data-kitten="Vet exam fees included as standard" data-cat="Vet exam fees included as standard">Vet exam fees included as standard</li>
											<li data-puppy="Use any vet in the US or Canada" data-dog="Use any vet in the US or Canada" data-kitten="Use any vet in the US or Canada" data-cat="Use any vet in the US or Canada">Use any vet in the US or Canada</li>
										</ul>
									</div>
									<div className={Styles.peUsItemRating}>
										<div className={Styles.peUsItemRatingWrapper}>
											<div className={Styles.peUsItemRatingText}>
												<p>4.1</p>
											</div>
											<div className={Styles.peUsItemRatingStars}>
												<img src="https://dev-petted2.pantheonsite.io/wp-content/uploads/2022/04/4.1-star.svg" alt="Stars rating"/>
											</div>
										</div>
										<div className={Styles.peUsItemQuote}>
											<a href="#" className={Styles.peUsBtn}>Get A Free Quote</a>
										</div>
									</div>
								</div>
							</div>
							<div className={Styles.peUsItem}>
								<div className={Styles.peUsItemWrapper}>
									<div className={Styles.peUsItemInnerWrapper}>
										<div className={Styles.peUsItemLogo}>
											<div className={Styles.peUsItemLogoImage}>
												<img src="https://dev-petted2.pantheonsite.io/wp-content/uploads/2022/04/figo.png" alt="figo Logo"/>
											</div>
											<div className={c(Styles.peUsItemRatingWrapper, Styles.peUsItemRatingWrapperMobile)}>
												<div className={Styles.peUsItemRatingText}>
													<p>4.1</p>
												</div>
												<div className={Styles.peUsItemRatingStars}>
													<img src="https://dev-petted2.pantheonsite.io/wp-content/uploads/2022/04/4.1-star.svg" alt="Stars rating"/>
												</div>
											</div>
										</div>
										<div className={Styles.peUsItemMobileRating}>
											<div className={Styles.peUsItemQuote}>
												<a href="#" className={Styles.peUsBtn}>Get A Free Quote</a>
											</div>
										</div>
									</div>
									<div className={Styles.peUsItemList}>
										<ul>
											<li data-puppy="100% reimbursement option" data-dog="100% reimbursement option" data-kitten="100% reimbursement option" data-cat="Accident, illness & wellness plans">100% reimbursement option</li>
											<li data-puppy="Cover your puppy from 8 weeks " data-dog="Cover your puppy from 8 weeks " data-kitten="One plan for accidents and illness" data-cat="100% reimbursement option">Cover your puppy from 8 weeks</li>
											<li data-puppy="24/7 live vet chat " data-dog="24/7 live vet chat " data-kitten="24/7 live vet chat for kittens" data-cat="Excellent feline dental coverage included">24/7 live vet chat</li>
										</ul>
									</div>
									<div className={Styles.peUsItemRating}>
										<div className={Styles.peUsItemRatingWrapper}>
											<div className={Styles.peUsItemRatingText}>
												<p>4.1</p>
											</div>
											<div className={Styles.peUsItemRatingStars}>
												<img src="https://dev-petted2.pantheonsite.io/wp-content/uploads/2022/04/4.1-star.svg" alt="Stars rating"/>
											</div>
										</div>
										<div className={Styles.peUsItemQuote}>
											<a href="#" className={Styles.peUsBtn}>Get A Free Quote</a>
										</div>
									</div>
								</div>
							</div>
							<div className={Styles.peUsItem}>
								<div className={Styles.peUsItemWrapper}>
									<div className={Styles.peUsItemInnerWrapper}>
										<div className={Styles.peUsItemLogo}>
											<div className={Styles.peUsItemLogoImage}>
												<img src="https://dev-petted2.pantheonsite.io/wp-content/uploads/2022/01/prudentpet.svg" alt="prudentpet Logo"/>
											</div>
											<div className={c(Styles.peUsItemRatingWrapper, Styles.peUsItemRatingWrapperMobile)}>
												<div className={Styles.peUsItemRatingText}>
													<p>4.0</p>
												</div>
												<div className={Styles.peUsItemRatingStars}>
													<img src="https://dev-petted2.pantheonsite.io/wp-content/uploads/2022/04/4-star.svg" alt="Stars rating"/>
												</div>
											</div>
										</div>
										<div className={Styles.peUsItemMobileRating}>
											<div className={Styles.peUsItemQuote}>
												<a href="#" className={Styles.peUsBtn}>Get A Free Quote</a>
											</div>
										</div>
									</div>
									<div className={Styles.peUsItemList}>
										<ul>
											<li data-puppy="Unlimited coverage option" data-dog="Unlimited coverage option" data-kitten="Unlimited coverage option" data-cat="Accident, illness & wellness plans">Unlimited coverage option</li>
											<li data-puppy="Provides advertising money for missing puppies" data-dog="Provides advertising money for missing puppies" data-kitten="Kitten Wellness plan option" data-cat="24/7 live vet chat">Provides advertising money for missing puppies</li>
											<li data-puppy="Wellness plan option" data-dog="Wellness plan option" data-kitten="A choice of three plans " data-cat="#1 rated on Trustpilot">Wellness plan option</li>
										</ul>
									</div>
									<div className={Styles.peUsItemRating}>
										<div className={Styles.peUsItemRatingWrapper}>
											<div className={Styles.peUsItemRatingText}>
												<p>4.0</p>
											</div>
											<div className={Styles.peUsItemRatingStars}>
												<img src="https://dev-petted2.pantheonsite.io/wp-content/uploads/2022/04/4-star.svg" alt="Stars rating"/>
											</div>
										</div>
										<div className={Styles.peUsItemQuote}>
											<a href="#" className={Styles.peUsBtn}>Get A Free Quote</a>
										</div>
									</div>
								</div>
							</div>
							<div className={Styles.peUsItem}>
								<div className={Styles.peUsItemWrapper}>
									<div className={Styles.peUsItemInnerWrapper}>
										<div className={Styles.peUsItemLogo}>
											<div className={Styles.peUsItemLogoImage}>
												<img src="https://dev-petted2.pantheonsite.io/wp-content/uploads/2022/04/wagmo.png" alt="wagmo Logo"/>
											</div>
											<div className={c(Styles.peUsItemRatingWrapper, Styles.peUsItemRatingWrapperMobile)}>
												<div className={Styles.peUsItemRatingText}>
													<p>4.0</p>
												</div>
												<div className={Styles.peUsItemRatingStars}>
													<img src="https://dev-petted2.pantheonsite.io/wp-content/uploads/2022/04/4-star.svg" alt="Stars rating"/>
												</div>
											</div>
										</div>
										<div className={Styles.peUsItemMobileRating}>
											<div className={Styles.peUsItemQuote}>
												<a href="#" className={Styles.peUsBtn}>Get A Free Quote</a>
											</div>
										</div>
									</div>
									<div className={Styles.peUsItemList}>
										<ul>
											<li data-puppy="100% reimbursement option" data-dog="100% reimbursement option" data-kitten="100% reimbursement option" data-cat="100% reimbursement option">100% reimbursement option</li>
											<li data-puppy="5% multi-pet discount" data-dog="No upper age limit for dogs" data-kitten="5% multi-pet discount " data-cat="5% multi-pet discount ">5% multi-pet discount</li>
											<li data-puppy="Use app to make claims" data-dog="24/7 live vet chat " data-kitten="Includes end of life treatment " data-cat="Includes end of life treatment ">Use app to make claims</li>
										</ul>
									</div>
									<div className={Styles.peUsItemRating}>
										<div className={Styles.peUsItemRatingWrapper}>
											<div className={Styles.peUsItemRatingText}>
												<p>4.0</p>
											</div>
											<div className={Styles.peUsItemRatingStars}>
												<img src="https://dev-petted2.pantheonsite.io/wp-content/uploads/2022/04/4-star.svg" alt="Stars rating"/>
											</div>
										</div>
										<div className={Styles.peUsItemQuote}>
											<a href="#" className={Styles.peUsBtn}>Get A Free Quote</a>
										</div>
									</div>
								</div>
							</div>
							<div className={Styles.peUsBestOverall}>
								<div className={Styles.peUsSubTitle}>
									<h3>Best overall plan</h3>
								</div>
								<div className={Styles.peUsItem}>
									<div className={Styles.peUsItemWrapper}>
										<div className={Styles.peUsItemInnerWrapper}>
											<div className={Styles.peUsItemLogo}>
												<div className={Styles.peUsItemNumber}>
													<div className={Styles.peUsItemNumberWrapper}>
														<div className={Styles.peUsItemNumberNum}>
															<p>1</p>
														</div>
														<div className={Styles.peUsItemNumberRanking}>
															<p>Editor's Choice</p>
														</div>
													</div>
												</div>
												<div className={Styles.peUsItemLogoImage}>
													<img src="https://dev-petted2.pantheonsite.io/wp-content/uploads/2022/01/manypets.svg" alt="ManyPets Logo"/>
												</div>
											</div>
											<div className={Styles.peUsItemMobileRating}>
												<div className={Styles.peUsItemRatingWrapper}>
													<div className={Styles.peUsItemRatingText}>
														<p>5.0</p>
													</div>
													<div className={Styles.peUsItemRatingStars}>
														<img src="https://dev-petted2.pantheonsite.io/wp-content/uploads/2022/04/5-star.svg" alt="Stars rating"/>
													</div>
												</div>
												<div className={Styles.peUsItemQuote}>
													<a href="#" className={Styles.peUsBtn}>Get A Free Quote</a>
												</div>
											</div>
										</div>
										<div className={Styles.peUsItemList}>
											<ul>
												<li data-puppy="Unlimited coverage for accidents and illness" data-dog="Accident and Illness plan" data-kitten="Accident and Illness plan" data-cat="Accident, illness & wellness plans">Unlimited coverage for accidents and illness</li>
												<li data-puppy="Add routine wellness care—save up to 50%!" data-dog="Optional wellness plan" data-kitten="Optional wellness plan" data-cat="Unlimited annual coverage with no caps">Add routine wellness care—save up to 50%!</li>
												<li data-puppy="0% Copay option" data-dog="Coverage begins after 15 days" data-kitten="Coverage begins after 15 days " data-cat="Vet exam fees covered for no extra cost">0% Copay option</li>
												<li data-puppy="No credit check required" data-dog="Covers vet exams for illness and accidents" data-kitten="Coverage starts at $15 for kittens" data-cat="Usually the best value cat plan available ">No credit check required</li>
												<li data-puppy="No fees for paying monthly" data-dog="Hereditary conditions for dogs covered" data-kitten="Hereditary conditions covered" data-cat="No extra fees for paying monthly">No fees for paying monthly</li>
											</ul>
										</div>
										<div className={Styles.peUsItemRating}>
											<div className={Styles.peUsItemRatingWrapper}>
												<div className={Styles.peUsItemRatingText}>
													<p>5.0</p>
												</div>
												<div className={Styles.peUsItemRatingStars}>
													<img src="https://dev-petted2.pantheonsite.io/wp-content/uploads/2022/04/5-star.svg" alt="Stars rating"/>
												</div>
											</div>
											<div className={Styles.peUsItemQuote}>
												<a href="#" className={Styles.peUsBtn}>Get A Free Quote</a>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className={Styles.peUsTextSection}>
								<div className={Styles.peUsSubTitle}>
									<h3>What is pet insurance?</h3>
								</div>
								<div className={Styles.peUsTextItem}>
									<p>Pet insurance is like any insurance: it's there to help with any bills you might otherwise struggle to pay. In the case of pet insurance for your puppy, these are vet bills, which can easily run into tens of thousands of dollars.</p>
								</div>
							</div>
							<div className={Styles.peUsTextSection}>
								<div className={Styles.peUsSubTitle}>
									<h3>How does pet insurance work?</h3>
								</div>
								<div className={Styles.peUsTextItem}>
									<p>Pet insurance is simple. You pay a monthly premium and, if your puppy needs veterinary care covered by your plan, your provider pays for it minus any co-pay or deductible. Some plans require you to pay the vet, with the provider reimbursing you, but others pay the vet directly. There are three basic types of pet insurance:</p>
									<ul>
										<li><strong>Accident and Illness -</strong> the most popular and comprehensive</li>
										<li><strong>Routine Wellness -</strong> for preventative treatments like annual vaccinations</li>
										<li><strong>Emergency -</strong> for immediately life-threatening situations</li>
									</ul>
								</div>
							</div>
							<div className={Styles.peUsTextSection}>
								<div className={Styles.peUsSubTitle}>
									<h3>Do I need pet insurance?</h3>
								</div>
								<div className={Styles.peUsTextItem}>
									<p>The short answer is 'yes'. Over a dog's life, you can expect to spend around $16,600 on vet care alone. Treatment for some conditions, like cancer or a broken hip, can easily exceed $10,000 - and 61% of Americans don't have enough savings to cover a $1,000 emergency bill. If you can't pay, the heart-breaking alternative is often your beloved puppy being put to sleep when it might have lived a long and happy life. Insuring your pup is a smart financial move that also gives you peace of mind.</p>
								</div>
							</div>
							<div className={Styles.peUsTextSection}>
								<div className={Styles.peUsSubTitle}>
									<h3>How much does pet insurance cost?</h3>
								</div>
								<div className={Styles.peUsTextItem}>
									<p>This depends on several factors, including where you live, your puppy's breed, and their age - which is why it's important to compare quotes. On average, pet insurance costs around $40 per month but you can find premiums for as little as $20 per month - that's less than 70¢ a day.</p>
									<p>Pet insurance plans usually come with a deductible, which is the first amount you're responsible for before the insurance kicks in. Most insurers have an annual deductible, meaning it resets every 12 months. If you choose a $250 deductible (most popular) this means you'll pay the first $250 per year before the insurance begins.</p>
									<p>Generally, the higher the deductible you choose the less you'll pay monthly for your pet's insurance. But if you choose a lower the deductible you'll usually pay a little more each month for your insurance.</p>
									<p>Most insurers offer a $100, $250 or $500 deductible, but there are some plans that come with a $0 deductible, which some pet parents prefer as it helps to avoid large unexpected bills.</p>
								</div>
							</div>
							<div className={Styles.peUsTextSection}>
								<div className={Styles.peUsSubTitle}>
									<h3>Examples of monthly premiums</h3>
								</div>
								<div className={Styles.peUsTextTable}>
									<div className={Styles.peUsTextTableWrapper}>
										<table>
											<tr>
												<th></th>
												<th><img src="https://dev-petted2.pantheonsite.io/wp-content/uploads/2022/01/manypets.svg" alt="ManyPets logo"/></th>
												<th><img src="https://dev-petted2.pantheonsite.io/wp-content/uploads/2022/01/lemonade.svg" alt="lemonade logo"/></th>
												<th><img src="https://dev-petted2.pantheonsite.io/wp-content/uploads/2022/01/healthypaws.svg" alt="healthypaws logo"/></th>
												<th><img src="https://dev-petted2.pantheonsite.io/wp-content/uploads/2022/04/pumpkim.png" alt="pumpkim Logo"/></th>
												<th><img src="https://dev-petted2.pantheonsite.io/wp-content/uploads/2022/01/spot.svg" alt="spot logo"/></th>
												<th><img src="https://dev-petted2.pantheonsite.io/wp-content/uploads/2022/01/embrace.svg" alt="embrace logo"/></th>
											</tr>
											<tr>
												<td className={Styles.peUsTableHeading}><p data-puppy="3-month-old Chihuahua" data-dog="2-year-old Chihuahua" data-kitten="2-month-old Am. Shorthair" data-cat="1-year-old Am. Shorthair">3-month-old Chihuahua</p><span>Los Angeles, CA</span></td>
												<td><p data-puppy="$43.01" data-dog="$43.01" data-kitten="$29.16" data-cat="$30.62">$43.01</p></td>
												<td><p data-puppy="$30.92" data-dog="$30.92" data-kitten="$24.58" data-cat="$24.58">$30.92</p></td>
												<td><p data-puppy="$34.23" data-dog="$39.43" data-kitten="$27.33" data-cat="$28.64">$34.23</p></td>
												<td><p data-puppy="$67.18" data-dog="$67.18" data-kitten="$33.43" data-cat="$33.43">$67.18</p></td>
												<td><p data-puppy="$40.09" data-dog="$40.09" data-kitten="$25.84" data-cat="$25.84">$40.09</p></td>
												<td><p data-puppy="$38.64" data-dog="$35.93" data-kitten="$37.74" data-cat="$39.15">$38.64</p></td>
											</tr>
											<tr>
												<td className={Styles.peUsTableHeading}><p data-puppy="6-month-old Labrador" data-dog="4-year-old Labrador" data-kitten="4-month-old Am. Longhair" data-cat="3-year-old Am. Longhair">6-month-old Labrador</p><span>New York City, NY</span></td>
												<td><p data-puppy="$66.54" data-dog="$74.23" data-kitten="$26.28" data-cat="$30.42">$66.54</p></td>
												<td><p data-puppy="$55.83" data-dog="$55.83" data-kitten="$24.25" data-cat="$24.25">$55.83</p></td>
												<td><p data-puppy="$50.22" data-dog="$74.40" data-kitten="$29.43" data-cat="$37.60">$50.22</p></td>
												<td><p data-puppy="$80.18" data-dog="$91.64" data-kitten="$126.10" data-cat="$26.10">$80.18</p></td>
												<td><p data-puppy="$50.87" data-dog="$58.14" data-kitten="$19.78" data-cat="$19.78">$50.87</p></td>
												<td><p data-puppy="$78.38" data-dog="$99.54" data-kitten="$29.28" data-cat="$32.50">$78.38</p></td>
											</tr>
											<tr>
												<td className={Styles.peUsTableHeading}><p data-puppy="9-month-old German Shephard" data-dog="6-year-old German Shephard" data-kitten="8-month-old Maine Coon" data-cat="5-year-old Maine Coon">9-month-old German Shephard</p><span>Austin, TX</span></td>
												<td><p data-puppy="$41.96" data-dog="$68.10" data-kitten="$16.31" data-cat="$22.79">$41.96</p></td>
												<td><p data-puppy="$35.58" data-dog="$35.58" data-kitten="$16.63" data-cat="$16.63">$35.58</p></td>
												<td><p data-puppy="$46.61" data-dog="$71.34" data-kitten="$31.24" data-cat="$45.67">$46.61</p></td>
												<td><p data-puppy="$52.36" data-dog="$78.42" data-kitten="$29.14" data-cat="$32.75">$52.36</p></td>
												<td><p data-puppy="$31.55" data-dog="$47.25" data-kitten="$19.48" data-cat="$21.88">$31.55</p></td>
												<td><p data-puppy="$64.01" data-dog="$74.89" data-kitten="$27.81" data-cat="$40.68">$64.01</p></td>
											</tr>
										</table>
									</div>
									<div className={Styles.peUsTextTableTexts}>
										<p>Quotes taken May 5, 2022</p>
										<p className={Styles.peUsScrollMore}>Scroll for more</p>
									</div>
								</div>
							</div>
							<div className={Styles.peUsTextSection}>
								<div className={Styles.peUsSubTitle}>
									<h3>What does pet insurance cover? </h3>
								</div>
								<div className={Styles.peUsTextItem}>
									<p>All pet insurance providers are different - another reason to compare quotes and check the details of each plan - but here are some things that are covered by most accident and illness plans:</p>
									<ul>
										<li><strong>Accidents -</strong> e.g. poisoning, bite wounds, sprains, ACL ruptures</li>
										<li><strong>Regular illnesses -</strong> e.g. ear infections, vomiting</li>
										<li><strong>Serious illnesses -</strong> e.g. cancer, heart disease </li>
										<li><strong>Chronic illnesses -</strong> e.g. allergies, arthritis, skin conditions</li>
										<li><strong>Hereditary conditions -</strong> e.g. hip dysplasia, epilepsy</li>
										<li><strong>Congenital conditions -</strong> e.g. eye or limb defects</li>
										<li><strong>Imaging -</strong> e.g. X-rays, MRIs, CT scans</li>
										<li><strong>Diagnostics -</strong> e.g. ultrasounds, blood tests </li>
										<li><strong>Surgery -</strong> including anaesthetic, vet-prescribed drugs and follow-up consultations</li>
									</ul>
								</div>
							</div>
							<div className={Styles.peUsTextSection}>
								<div className={Styles.peUsSubTitle}>
									<h3>When should I get pet insurance?</h3>
								</div>
								<div className={Styles.peUsTextItem}>
									<p>You should get pet insurance as soon as possible for your puppy. The younger your pet is, the cheaper they are to insure. They're also less likely to have pre-existing conditions, which are excluded from nearly all plans, and the sooner you get pet insurance, the less chance there is of them needing treatment while they're not covered.</p>
								</div>
							</div>
							<div className={Styles.peUsTextSection}>
								<div className={Styles.peUsSubTitle}>
									<h3>Who are the best pet insurance providers?</h3>
								</div>
							</div>
							<div className={Styles.peUsLowerRating}>
								<div className={Styles.peUsLowerRatingsLogo}>
									<p>1.</p>
									<img src="https://dev-petted2.pantheonsite.io/wp-content/uploads/2022/01/manypets.svg" alt="ManyPets Logo"/>
								</div>
								<div className={Styles.peUsLowerRatingsDesc}>
									<p>ManyPets began in the UK but is now a major player in the US market. One of its stand-out features is its flexible reimbursement. This allows co-pay and deductibles to be adjusted to suit your specific needs. It's also competitively priced, covers some pre-existing conditions if they're 18 months symptom-free, and offers incentives to move from other providers.</p>
								</div>
								<div className={Styles.peUsLowerRatingsList}>
									<ul className={Styles.peUsTickList}>
										<li>Flexible reimbursement options</li>
										<li>Some pre-existing conditions covered</li>
										<li>Good customer service</li>
									</ul>
								</div>
								<div className={Styles.peUsLowerRatingsButton}>
									<a href="#" className={c(Styles.peUsBtn, Styles.peUsBtnAlt)}>Get A Free Quote</a>
								</div>
							</div>
							<div className={Styles.peUsLowerRating}>
								<div className={Styles.peUsLowerRatingsLogo}>
									<p>2.</p>
									<img src="https://dev-petted2.pantheonsite.io/wp-content/uploads/2022/01/lemonade.svg" alt="lemonade Logo"/>
								</div>
								<div className={Styles.peUsLowerRatingsDesc}>
									<p>Lemonade is popular due to its speed and ease of use. It says you can get your dog insurance policy in seconds and that 30% of all claims are approved within three minutes by the company's Artificial Intelligence (AI) software. If you want to help animal welfare organizations, Lemonade is a public benefit corporation, which means that a percentage of its profits go to meaningful causes.</p>
								</div>
								<div className={Styles.peUsLowerRatingsList}>
									<ul className={Styles.peUsTickList}>
										<li>Fast and easy online claims</li>
										<li>Competitive prices</li>
										<li>Donates to good causes</li>
									</ul>
								</div>
								<div className={Styles.peUsLowerRatingsButton}>
									<a href="#" className={c(Styles.peUsBtn, Styles.peUsBtnAlt)}>Get A Free Quote</a>
								</div>
							</div>
							<div className={Styles.peUsLowerRating}>
								<div className={Styles.peUsLowerRatingsLogo}>
									<p>3.</p>
									<img src="https://dev-petted2.pantheonsite.io/wp-content/uploads/2022/01/healthypaws.svg" alt="healthypaws Logo"/>
								</div>
								<div className={Styles.peUsLowerRatingsDesc}>
									<p>The accident and illness plan from Healthy Paws is appealingly simple. It also offers unlimited annual and lifetime payouts, which is great if your dog develops a chronic condition. It may arrange direct payment to your vet for very expensive treatment. It also supports pet rescues and animal shelters that care for sick homeless dogs through its Healthy Paws Foundation.</p>
								</div>
								<div className={Styles.peUsLowerRatingsList}>
									<ul className={Styles.peUsTickList}>
										<li>Unlimited pay-outs</li>
										<li>Includes alternative care like acupuncture</li>
										<li>Helps less fortunate animals</li>
									</ul>
								</div>
								<div className={Styles.peUsLowerRatingsButton}>
									<a href="#" className={c(Styles.peUsBtn, Styles.peUsBtnAlt)}>Get A Free Quote</a>
								</div>
							</div>
							<div className={Styles.peUsLowerRating}>
								<div className={Styles.peUsLowerRatingsLogo}>
									<p>4.</p>
									<img src="https://dev-petted2.pantheonsite.io/wp-content/uploads/2022/04/pumpkim.png" alt="pumpkim Logo"/>
								</div>
								<div className={Styles.peUsLowerRatingsDesc}>
									<p>You can choose from a variety of dog insurance plans with Pumpkin, and its puppy plans are popular because they don't reduce the level of cover as your dog ages. Pumpkin places an emphasis on preventative care with its wellness plans, and it also pays out 90% of all covered vet bills throughout your dog's life, which gives customers financial certainty.</p>
								</div>
								<div className={Styles.peUsLowerRatingsList}>
									<ul className={Styles.peUsTickList}>
										<li>90% reimbursement level </li>
										<li>Unlimited annual coverage</li>
										<li>Puppy-specific plans</li>
									</ul>
								</div>
								<div className={Styles.peUsLowerRatingsButton}>
									<a href="#" className={c(Styles.peUsBtn, Styles.peUsBtnAlt)}>Get A Free Quote</a>
								</div>
							</div>
							<div className={c(Styles.peUsLowerRating, Styles.noBorder)}>
								<div className={Styles.peUsLowerRatingsLogo}>
									<p>5.</p>
									<img src="https://dev-petted2.pantheonsite.io/wp-content/uploads/2022/01/spot.svg" alt="spot Logo"/>
								</div>
								<div className={Styles.peUsLowerRatingsDesc}>
									<p> Spot is another provider that lets you adjust your annual limits, deductible, and reimbursement rates to suit. It also scores points for its claims process, which lets you submit via email, fax, the app, or online. It takes a holistic approach to pet health, and coverage options include alternative therapy, behavioral training, vitamins and supplements, and preventative care. It also has 24/7 pet telehealth.</p>
								</div>
								<div className={Styles.peUsLowerRatingsList}>
									<ul className={Styles.peUsTickList}>
										<li>Holistic health options</li>
										<li>24/7 pet telehealth line</li>
										<li>Flexible reimbursement options</li>
									</ul>
								</div>
								<div className={Styles.peUsLowerRatingsButton}>
									<a href="#" className={c(Styles.peUsBtn, Styles.peUsBtnAlt)}>Get A Free Quote</a>
								</div>
							</div>
						</div>
						<div className={Styles.peUsWrapperSecCol}>
							<div className={Styles.peUsWrapperQuoteWrap}>
								<div id="petted-quote-form"></div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<footer className={Styles.peUsFooter}>
				<div className={Styles.peUsFooterWrapper}>
					<div className={Styles.peUsFooterLogo}>
						<img src="https://dev-petted2.pantheonsite.io/wp-content/uploads/2022/01/usn-logo.svg" alt="US News Logo" />
					</div>
					<div className={Styles.peUsFooterDisclaimer}>
						<p>This information is provided by Compare Pet Insurance Services, Inc. trading as PetInsurer.com, 360 N Pacific Coast Highway, Suite 2000, El Segundo, CA 90245</p>
					</div>
				</div>
			</footer>
		</main>
		</body>
	</html>
)}

export default IndexPage
