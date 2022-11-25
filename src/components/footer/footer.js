import * as React from 'react'
import * as Styles from './footer.module.scss'
import c from 'classnames'
import SecNav from '../footerSecNav/footerSecNav'
import BreedNav from '../breedNav/breedNav'
import InsurerNav from '../insurerNav/insurerNav'
import StateNav from '../stateNav/stateNav'
import FooterNav from '../footerNav/footerNav'
import { useState } from "react"

const Layout = ({ data }) => {
	setTimeout(() => {
		console.log(data);
	}, 2000);
	let facebook = data.facebook;
	let instagram = data.instagram;
	let tiktok = data.tiktok;
	var logo = data.footerLogo.sourceUrl;
	let tagline = data.tagline;
	let copyright = data.copyrightMessage;

	const [secExpanded, setSecExpanded] = useState(false);
	const toggleSecExpand = () => setSecExpanded(!secExpanded);

	const [breedExpanded, setBreedExpanded] = useState(false);
	const toggleBreedExpand = () => setBreedExpanded(!breedExpanded);

	const [insurerExpanded, setInsurerExpanded] = useState(false);
	const toggleInsurerExpand = () => setInsurerExpanded(!insurerExpanded);

	const [stateExpanded, setStateExpanded] = useState(false);
	const toggleStateExpand = () => setStateExpanded(!stateExpanded);

	return (
		<footer id="footer" className={Styles.footer} role="contentinfo">
			<div className={c('container', Styles.footerMain)}>
				<div className={Styles.companyNavWrap}>
					<div className={Styles.brand}>
						<a href="/" className={Styles.brandLogo}>
							<img src={logo} alt="Petted logo" />
						</a>
						{
							(tagline) ?
								<p className={Styles.brandTagline}>{tagline}</p>
							: ''
						}
					</div>
					<nav role="navigation" className={Styles.footerNav}>
						<p className={c(Styles.footerNavTitle, Styles.noLink, {[Styles.open]:secExpanded}, 'navTitle', 'med-down')} onClick={toggleSecExpand}>Company</p>
						<SecNav></SecNav>
					</nav>
				</div>
				<div className={Styles.breedNavWrap}>
					<p className={c(Styles.footerNavTitle, Styles.noLink, {[Styles.open]:breedExpanded}, 'navTitle')} onClick={toggleBreedExpand}>Pet Insurance  by Breed</p>
					<BreedNav></BreedNav>
				</div>
				<div className={Styles.insurerNavWrap}>
					<p className={c(Styles.footerNavTitle, Styles.noLink, {[Styles.open]:insurerExpanded}, 'navTitle')} onClick={toggleInsurerExpand}>Pet Insurance  Reviews</p>
					<InsurerNav></InsurerNav>
				</div>
				<div className={Styles.stateNavWrap}>
					<p className={c(Styles.footerNavTitle, Styles.noLink, {[Styles.open]:stateExpanded}, 'navTitle')} onClick={toggleStateExpand}>Pet Insurance  by State</p>
					<StateNav></StateNav>
				</div>
			</div>
			<div className={Styles.footerBar}>
				<div className={c(Styles.container, 'container', 'flex-space')}> 
					<div className="col col-lg-3-4 flex order-sm-1"> 
						{/* <?php
							$copyright = get_field('copyright_message', 'options'); 
							$copyright = str_replace("#YEAR#", date("Y"), $copyright);
						?> */}
						{
							(copyright) ?
								<p className={c(Styles.copyright, 'no-bm', 'small', 'order-sm-1')}>{copyright}</p>
							: ''
						}
						<nav role="navigation" className={(Styles.footerNav, 'order-sm-0')}>
							<FooterNav></FooterNav>

							{/* <?php if(get_field('advertising_disclosure', 'option')) : ?>
								<button data-modal-id="disclosure-modal" className="footer-link">Advertising Disclosure</button>
								<?php
									load_module('content-modal', array(
										'id' => 'disclosure-modal',
										'title' => 'Advertising Disclosure',
										'content' => get_field('advertising_disclosure', 'option')
									));
								?>
							<?php endif; ?> */}
						</nav>
					</div>
					<div className="col col-lg-1-4 order-sm-0"> 
						<div className={c('flex', 'items-center', Styles.socialWrap)}>
							<span className="nowrap">Join us on</span>
							<ul className={Styles.social}>
								{
									(facebook) ?
										<li className={Styles.socialFacebook}>
											<a href={facebook} target="_blank" aria-label="Petted on Facebook"><span className="sr-only">Facebook</span></a>
										</li>
									: ''
								}
								{
									(instagram) ?
										<li className={Styles.socialInstagram}>
											<a href={instagram} target="_blank" aria-label="Petted on Instagram"><span className="sr-only">Instagram</span></a>
										</li>
									: ''
								}
								{
									(tiktok) ?
										<li className={Styles.socialTiktok}>
											<a href={tiktok} target="_blank" aria-label="Petted on TikTok"><span className="sr-only">TikTok</span></a>
										</li>
									: ''
								}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Layout