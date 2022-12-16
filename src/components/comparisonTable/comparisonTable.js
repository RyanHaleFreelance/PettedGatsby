import * as React from 'react'
import * as Styles from './comparisonTable.module.scss'
import c from 'classnames'

const Layout = ({ section, images }) => {
	let dataArray = section.comparisonTable;

	return (
		<div>
			<table className={c(Styles.insurerVinsurerTable, "content-table")}>
				<thead className="transparent">
					<tr>
						<th></th>
						<th><img src={section.insurer1.insurerDetails.logo.sourceUrl} alt={section.insurer1.insurerDetails.logo.title} /></th>
						<th><img src={section.insurer2.insurerDetails.logo.sourceUrl} alt={section.insurer2.insurerDetails.logo.title} /></th>
					</tr>
				</thead>
				<tbody>
				{
					dataArray.map((section, i) => (
						<tr>
							<td className={c(Styles[`type${section.quoteDetails.type}`])}>
								<p className={Styles.breed}>{section.quoteDetails.breed}</p>
								<p dangerouslySetInnerHTML={{__html: section.quoteDetails.quoteDescription}}></p>
							</td>
							<td>{section.insurer1Cost}{(section.insurer1Cost[0] == '$') ? <span>per month</span> : ''}</td>
							<td>{section.insurer2Cost}{(section.insurer2Cost[0] == '$') ? <span>per month</span> : ''}</td>
						</tr>
					))
				}
				</tbody>
			</table>
			<div className={Styles.insurerVinsurerMobile}>
				<div className={Styles.iviHead}>
					<div>
						<img src={section.insurer1.insurerDetails.logo.sourceUrl} alt={section.insurer1.insurerDetails.logo.title} />
					</div>
					<div>
						<img src={section.insurer2.insurerDetails.logo.sourceUrl} alt={section.insurer2.insurerDetails.logo.title} />
					</div>
				</div>
				{
					dataArray.map((section, i) => (
						<div className={Styles.iviItem}>
							<div className={Styles.iviItemCost}>{section.insurer1Cost}{(section.insurer1Cost[0] == '$') ? <span>per month</span> : ''}</div>
							<div className={Styles.iviItemCost}>{section.insurer2Cost}{(section.insurer2Cost[0] == '$') ? <span>per month</span> : ''}</div>
							<div className={c(Styles.iviItemDetails, Styles[`type${section.quoteDetails.type}`])}>
								<p className={Styles.breed}>{section.quoteDetails.breed}</p>
								<p dangerouslySetInnerHTML={{__html: section.quoteDetails.quoteDescription}}></p>
							</div>
						</div>
					))
				}
			</div>
			<p className={c('small', Styles.disclaimer)}><em>{section.disclaimer}</em></p>
		</div>
	)
}

export default Layout