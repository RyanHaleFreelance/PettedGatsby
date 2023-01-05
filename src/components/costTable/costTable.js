import * as React from 'react'
import * as Styles from './costTable.module.scss'

const Layout = ({ section, title, type }) => {

	return (
		<div className="container container--1300">
			{
				(title) ?
					<div className={Styles.singleCostTitle}>
						<h3>{title}</h3>
					</div>
				: ''
			}
			{
				(type == 1) ?
				<div className={Styles.singleCostTable}>
					<table>
						<tr>
							<th>Breed</th>
							<th>Area</th>
							<th>Age</th>
							<th>Annual Coverage</th>
							<th>Typical Premium</th>
						</tr>
						{
							section.map((item) => (
								<tr>
									<td className={Styles.singleCostSpecies}><img src={item.speciesImage.sourceUrl} alt={`${item.species} icon`} /><p>{item.species}</p></td>
									<td><p>{item.breed}</p></td>
									<td><p>{item.age}</p></td>
									<td><p>{item.annualCoverage}</p></td>
									<td><p>{item.averagePremium}</p></td>
								</tr>
							))
						}
					</table>
				</div>
				:
				<div className={Styles.singleCostTable}>
					<table>
						<tr>
							<th>City</th>
							<th>State</th>
							<th>Age</th>
							<th>Annual Coverage</th>
							<th>Typical Premium</th>
						</tr>
						{
							section.map((item) => (
								<tr>
									<td><p>{item.city}</p></td>
									<td><p>{item.state}</p></td>
									<td><p>{item.age}</p></td>
									<td><p>{item.annualCoverage}</p></td>
									<td><p>{item.averagePremium}</p></td>
								</tr>
							))
						}
					</table>
				</div>
			}
		</div>
	)
}

export default Layout