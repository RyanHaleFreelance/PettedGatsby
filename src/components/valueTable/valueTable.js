import * as React from 'react'
import * as Styles from './valueTable.module.scss'

const Layout = ({ section, title }) => {
	// const pagedata = section.attributes.data
	let data = section.costing;
	
	function shuffleFisherYates(array) {
		let i = array.length;
		while (i--) {
		  const ri = Math.floor(Math.random() * i);
		  [array[i], array[ri]] = [array[ri], array[i]];
		}
		return array;
	}

	let shuffled = shuffleFisherYates(data);
	let match = false;

	//get first
	for (let index = 0; index < shuffled.length; index++) {
		const element = shuffled[index];
		if(title == 'ASPCA Review') {
			title = 'ASPCA Pet Health Insurance';
		}
		if(title.includes(element.insurer.title)) {
			match = element;
			shuffled.splice(index, 1);
		}
	}

	return (
		<div class="table-wrapper table--vfm">
			<div class="table-wrapper__inner">
				<table class="content-table">
					<thead>
						<tr>
							<th></th>
							<th>{section.caseStudy1.title}</th>
							<th>{section.caseStudy2.title}</th>
							<th>{section.caseStudy3.title}</th>
						</tr>
						<tr>
							<th></th>
							<th>{section.caseStudy1.state}</th>
							<th>{section.caseStudy2.state}</th>
							<th>{section.caseStudy3.state}</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							{
								(match.insurer) ? <td>{match.insurer.title}</td> : ''
							}
							<td>{match.caseStudy1Cost}</td>
							<td>{match.caseStudy2Cost}</td>
							<td>{match.caseStudy3Cost}</td>
						</tr>
						{
							shuffled.map((item, index) => (
								(index < 3) ? 
									<tr>
										<td>{item.insurer.title}</td>
										<td>{item.caseStudy1Cost}</td>
										<td>{item.caseStudy2Cost}</td>
										<td>{item.caseStudy3Cost}</td>
									</tr>
								: ''
							))
						}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default Layout