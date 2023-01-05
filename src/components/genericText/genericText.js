import * as React from 'react'
import './genericText.css'
import {Helmet} from "react-helmet";
import reactStringReplace from 'react-string-replace';
import Rating from '../rating/rating'
import Comparison from '../comparisonTable/comparisonTable'
import Coverage from '../coverageTable/coverageTable'
import Value from '../valueTable/valueTable'
import Modal from '../modal/modal'

const Layout = ({ section, images, reviews, versus, comparison, title, value }) => {
	const pagedata = section.attributes.data;
	let widget = 0;
	let compData = '';
	let modalId = 'youtubeModal';

	if(pagedata.widget) {
		widget = pagedata.widget;
	}
	if(comparison) {
		compData = comparison.insurerCoverage;
	}
	
	let replaced = false;
		
	function getData(incoming) {
		for (let i = 0; i < reviews.length; i++) {
			const element = reviews[i];
			let title = element.node.insurerReview.insurer.title;
			if(title.toLowerCase() == incoming.toLowerCase()) {
				return element;
			}
		}
	}

	function getCompData(incoming) {
		for (let i = 0; i < compData.length; i++) {
			const element = compData[i];
			let title = element.insurer.title;
			if(title.toLowerCase() == incoming.toLowerCase()) {
				return element;
			}
		}
	}

	const openModal = (elem) => {
		if (typeof window !== 'undefined') {
			let video = document.getElementById(modalId).querySelector('.embedIframe').dataset.src;
			document.getElementById(modalId).querySelector('.embedIframe').src = video;
			document.getElementById(modalId).classList.add('modalActive');
			document.getElementById(modalId).parentElement.classList.add('modalActive');
			document.querySelector('body').classList.add('hasModal');
		}
	}
	//sort out shortcodes
	let content; 
	
	content = reactStringReplace(pagedata.gt_generic_text, /\[rating insurer="(.*)"\]/gi, (match, i) => (
		<Rating section={getData(match).node.insurerReview} title={true} half={true} />
	));

	content = reactStringReplace(content, '[comparison_table]', (match, i) => (
		<Comparison section={versus} />
	));

	content = reactStringReplace(content, '[value_for_money_table]', (match, i) => (
		<Value section={value} title={title} />
	));

	content = reactStringReplace(content, '[coverage_table]', (match, i) => (
		<Coverage insurer1='' insurer2='' disclaimer={comparison.disclaimerText} section={compData} title={title} />
	));

	content = reactStringReplace(content, /\[purple(?: text="(.*)")?\]/gi, (match, i) => (
		'<span class="purple" style="font-size: 22px; color: #7452ff;">' + match + '</span>'
	));

	content = reactStringReplace(content, /\[coveredtitle(?: title="(.*)")?\]/gi, (match, i) => (
		'<div class="covered-title"><h3>' + match + '</h3><p>Covered by insurance!</p></div>'
	));

	content = reactStringReplace(content, /\[didyouknow(?: text="(.*)")?\]/gi, (match, i) => (
		'<div class="dyk"><div class="dyk__inner"><div class="dyk__title"><p>Did you know?</p></div><div class="dyk__text"><p>' + match + '</p></div></div></div>'
	));

	content = reactStringReplace(content, /\[youtube(?: id="(.*)")?\]/gi, (match, i) => (
		<div>
			<div class="insurer__video-wrap">
				<div class="embed-container content-video" onClick={openModal} data-modal-id="video-modal" data-id={match} style={{ backgroundImage: `url('https://img.youtube.com/vi/${match}/0.jpg')`}}></div>
			</div>
			<Modal data={modalId} video={match}></Modal>
		</div>
	));

	if(/\[coverage_table insurers="(.*)"\]/.test(content)) {
		content = reactStringReplace(content, /\[coverage_table(?: insurers="(.*)")?\]/gi, (match, i) => (
			<Coverage insurer1={getCompData(match.split(',')[0])} insurer2={getCompData(match.split(',')[1])} disclaimer={comparison.disclaimerText} section='' title={title} /> 
		));
	}

	return (
		<div>
			{
				(content) ?
				<div>
					{ content.map( (piece,i) => {
						return typeof(piece)==='object' ? piece : 
						(piece == '</p>\n<p>' || piece == '\r\n\r\n' || piece == '\n\n' || piece == '<p></p>' || piece == '<p></p><p></p>' || piece == '</p><p>' || piece == '</p>\r\n<p>' || piece == '\r\n') ? '' : <div dangerouslySetInnerHTML={{__html:piece}}></div>
					})}
					</div>
				:
					<div>
				{
					(widget == 1) ? 
						<div style={{marginBottom: '20px', width: '100%', display: 'block', marginTop: '20px'}}>
							<div class="pe-container no-margin-ps">
								<Helmet>
									<script id="petted-quote-engine" src="https://quote.petted.com/Scripts/lib/widgets/petted/quote-form/widget.js" type="text/javascript"></script>
									
									<script>{`
										setTimeout(() => {QuoteEnginePetted.setOptions({
											targetId: "petted-quote-form",
											redirectUrl: "https://quote.petinsurer.com/quote",
											baseUrl: "https://quote.petinsurer.com/",
											urlParam: { source: "BestOfWidget", utm_source: "", utm_medium: "", utm_campaign: "", utm_content: "", utm_term: "", referer: window.location.href },
											refCode: "co",
										});
										QuoteEnginePetted.init();}, 500);
									`}</script>
								</Helmet>
								<div id="petted-quote-form"></div>
							</div>
						</div>
					:
						<div dangerouslySetInnerHTML={{__html:pagedata.gt_generic_text}}></div>
				}
				</div>
			}
		</div>
	)
}

export default Layout