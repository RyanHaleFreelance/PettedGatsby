import * as React from 'react'
import * as Styles from './bestInsuranceTable.module.scss'
import c from 'classnames'

const Layout = ({ section, title }) => {
	return (
		<div className="container container--1300">
			{
				(title) ?
					<div className={Styles.singleInsuranceTitle}>
						<h3>{title}</h3>
					</div>
				: ''
			}
			<div className={Styles.singleInsuranceTable}>
				<table>
					<tr>
						<th>Provider</th>
						<th>Customer Review Score</th>
						<th>Waiting Period</th>
						<th>Minimum Enroll Age</th>
						<th>Maximum Enroll Age</th>
						<th>Pricing</th>
						<th></th>
					</tr>
					{
						section.map((item, key) => (
							<tr>
								<td className={c(Styles.singleInsuranceProvider, {[Styles.singleInsuranceProviderTooltip]: item.toolip == null })}>
								{
									(item.tooltip) ?
										<p className={Styles.tooltip}>{item.tooltip}</p>
									: ''
								}
								<p className={Styles.count}>{(key+1)}</p><img src={item.provider.sourceUrl} alt="Provider Logo" /></td>
								<td className={Styles.singleInsuranceScore}><p>{item.score}</p></td>
								<td className={Styles.singleInsuranceWaitingPeriod}><p>{item.waitingPeriod}</p></td>
								<td className={Styles.singleInsuranceMinAge}><p>{item.minimumAge}</p></td>
								<td className={Styles.singleInsuranceAge}><p>{item.maximumAge}</p></td>
								<td className={Styles.singleInsuranceBbb}><p>{item.bbbRating}</p></td>
								<td className={Styles.singleInsuranceButton}><a href={item.viewMoreLink} target="_blank" className="btn btn--alt btn--small">{item.viewMoreText}</a></td>
							</tr>
						))
					}
					</table>
			</div>
		</div>
	)
}

export default Layout