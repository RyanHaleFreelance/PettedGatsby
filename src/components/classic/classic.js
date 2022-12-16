import * as React from 'react'
import * as Styles from './classic.module.scss'
import reactStringReplace from 'react-string-replace';
import Rating from '../rating/rating'
import Comparison from '../comparisonTable/comparisonTable'
import Coverage from '../coverageTable/coverageTable'
import Value from '../valueTable/valueTable'

const Layout = ({ section, images, reviews, versus, comparison, title, value }) => {
	let compData = '';
	if(comparison) {
		compData = comparison.insurerCoverage;
	}
	
	console.log(section.originalContent);
	
	
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
	//sort out shortcodes
	let content; 
	
	content = reactStringReplace(section.originalContent, /\[rating insurer="(.*)"\]/gi, (match, i) => (
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

	if(/\[coverage_table insurers="(.*)"\]/.test(content)) {
		content = reactStringReplace(content, /\[coverage_table(?: insurers="(.*)")?\]/gi, (match, i) => (
			<Coverage insurer1={getCompData(match.split(',')[0])} insurer2={getCompData(match.split(',')[1])} disclaimer={comparison.disclaimerText} section='' title={title} /> 
		));
	}

	return (
		<div className="section main-content">
			{ content.map( (piece,i) => {
				console.log(piece);
				return typeof(piece)==='object' ? piece : 
				(piece == '</p>\n<p>' || piece == '\r\n\r\n' || piece == '\n\n' || piece == '<p></p>' || piece == '<p></p><p></p>' || piece == '</p><p>' || piece == '\r\n') ? '' : <div dangerouslySetInnerHTML={{__html:piece}}></div>
			})}
		</div>
	)
}

export default Layout