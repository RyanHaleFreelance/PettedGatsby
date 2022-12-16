import * as React from 'react'
import * as Styles from './coverageTable.module.scss'
import c from 'classnames'

const Layout = ({ insurer1, insurer2, disclaimer, section, title }) => {
	// const pagedata = section.
	let i1 = 'Annual coverage options';
	let i2 = 'Deductible options';
	let i3 = 'Reimbursement options';
	let i4 = 'When does coverage start?';
	let i5 = 'Maximum age at sign up';
	let i6 = 'Are vet exam fees included at no extra cost?';
	let i7 = 'Are dental accidents covered?';
	let i8 = 'Are dental illnesses covered?';
	let i9 = 'Is there a wellness plan offered?';
	let i10 = 'Is there a virtual vet/telehealth service?';
	let i11 = 'End of life coverage';
	let i12 = 'Is there a multi-pet discount offered?';
	let i13 = 'Is there a charge for paying monthly?';
	let i14 = 'Is there an app to make claims?';

	return (
		<div>
			{
				(!insurer1 && !insurer2) ? 
					<div class="table-wrapper overflow-active">
						<div class="scroll-prompt">Scroll to compare</div>
						<div class="table-wrapper__inner">
							<table class="content-table content-table--cols">
								<thead class="transparent">
									<tr>
										<th></th>
										{
											section.map((section, i) => (
												<th className={c({'active': title.includes(section.insurer.title)})}>
													<img src={section.insurer.insurerDetails.logo.sourceUrl} alt={section.insurer.title} />
												</th>
											))
										}
									</tr>
								</thead>
								<tbody>
									<tr>
										<th>{i1}</th>
										{
											section.map((section, i) => (
												<td className={c({'active': title.includes(section.insurer.title)})}>
													{section.annualCoverageOptions}
												</td>
											))
										}
									</tr>
									<tr>
										<th>{i2}</th>
										{
											section.map((section, i) => (
												<td className={c({'active': title.includes(section.insurer.title)})}>
													{section.deductibleOptions}
												</td>
											))
										}
									</tr>
									<tr>
										<th>{i3}</th>
										{
											section.map((section, i) => (
												<td className={c({'active': title.includes(section.insurer.title)})}>
													{section.reimbursementOptions}
												</td>
											))
										}
									</tr>
									<tr>
										<th>{i4}</th>
										{
											section.map((section, i) => (
												<td className={c({'active': title.includes(section.insurer.title)})}>
													{section.whenDoesCoverageStart}
												</td>
											))
										}
									</tr>
									<tr>
										<th>{i5}</th>
										{
											section.map((section, i) => (
												<td className={c({'active': title.includes(section.insurer.title)})}>
													{section.maximumAgeAtSignUp}
												</td>
											))
										}
									</tr>
									<tr>
										<th>{i6}</th>
										{
											section.map((section, i) => (
												<td className={c({'active': title.includes(section.insurer.title)})}><span className={c('table__checkbox', {'checked--1': section.vetExamFeesIncludedAtNoExtraCost == true}, {'checked--': section.vetExamFeesIncludedAtNoExtraCost == null})}></span></td>
											))
										}
									</tr>
									<tr>
										<th>{i7}</th>
										{
											section.map((section, i) => (
												<td className={c({'active': title.includes(section.insurer.title)})}><span className={c('table__checkbox', {'checked--1': section.areDentalAccidentsCovered == true}, {'checked--': section.areDentalAccidentsCovered == null})}></span></td>
											))
										}
									</tr>
									<tr>
										<th>{i8}</th>
										{
											section.map((section, i) => (
												<td className={c({'active': title.includes(section.insurer.title)})}><span className={c('table__checkbox', {'checked--1': section.areDentalIllnessesCovered == true}, {'checked--': section.areDentalIllnessesCovered == null})}></span></td>
											))
										}
									</tr>
									<tr>
										<th>{i9}</th>
										{
											section.map((section, i) => (
												<td className={c({'active': title.includes(section.insurer.title)})}><span className={c('table__checkbox', {'checked--1': section.isThereAWellnessPlan == true}, {'checked--': section.isThereAWellnessPlan == null})}></span></td>
											))
										}
									</tr>
									<tr>
										<th>{i10}</th>
										{
											section.map((section, i) => (
												<td className={c({'active': title.includes(section.insurer.title)})}><span className={c('table__checkbox', {'checked--1': section.isThereAVirtualVet == true}, {'checked--': section.isThereAVirtualVet == null})}></span></td>
											))
										}
									</tr>
									<tr>
										<th>{i11}</th>
										{
											section.map((section, i) => (
												<td className={c({'active': title.includes(section.insurer.title)})}><span className={c('table__checkbox', {'checked--1': section.endOfLifeCoverage == true}, {'checked--': section.endOfLifeCoverage == null})}></span></td>
											))
										}
									</tr>
									<tr>
										<th>{i12}</th>
										{
											section.map((section, i) => (
												<td className={c({'active': title.includes(section.insurer.title)})}><span className={c('table__checkbox', {'checked--1': section.isThereAMultiPetDiscount == true}, {'checked--': section.isThereAMultiPetDiscount == null})}></span></td>
											))
										}
									</tr>
									<tr>
										<th>{i13}</th>
										{
											section.map((section, i) => (
												<td className={c({'active': title.includes(section.insurer.title)})}><span className={c('table__checkbox', {'checked--1': section.isThereAChargeForPayingMonthly == true}, {'checked--': section.isThereAChargeForPayingMonthly == null})}></span></td>
											))
										}
									</tr>
									<tr>
										<th>{i14}</th>
										{
											section.map((section, i) => (
												<td className={c({'active': title.includes(section.insurer.title)})}><span className={c('table__checkbox', {'checked--1': section.isThereAnAppToMakeClaims == true}, {'checked--': section.isThereAnAppToMakeClaims == null})}></span></td>
											))
										}
									</tr>
								</tbody>
							</table>
						</div>
						<p class="small"><em>{disclaimer}</em></p>
					</div>
				: 
				<div class="table-wrapper insurer-vs">
					<div class="table-wrapper__inner">
						<table class="content-table content-table--cols">
							<thead class="transparent">
								<tr>
									<th></th>
									<th class="inactive">
										<img src={insurer1.insurer.insurerDetails.logo.sourceUrl} alt={insurer1.insurer.title} />
									</th>
									<th class="inactive">
										<img src={insurer2.insurer.insurerDetails.logo.sourceUrl} alt={insurer2.insurer.title} />
									</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<th>{i1}</th>
									<td className="inactive">{insurer1.annualCoverageOptions}</td>
									<td className="inactive">{insurer2.annualCoverageOptions} </td>
								</tr>
								<tr>
									<th>{i2}</th>
									<td className="inactive">{insurer1.deductibleOptions}</td>
									<td className="inactive">{insurer2.deductibleOptions}</td>
								</tr>
								<tr>
									<th>{i3}</th>
									<td className="inactive">{insurer1.reimbursementOptions}</td>
									<td className="inactive">{insurer2.reimbursementOptions}</td>
								</tr>
								<tr>
									<th>{i4}</th>
									<td className="inactive">{insurer1.whenDoesCoverageStart}</td>
									<td className="inactive">{insurer2.whenDoesCoverageStart}</td>
								</tr>
								<tr>
									<th>{i5}</th>
									<td className="inactive">{insurer1.maximumAgeAtSignUp}</td>
									<td className="inactive">{insurer2.maximumAgeAtSignUp}</td>
								</tr>
								<tr>
									<th>{i6}</th>
									<td className="inactive"><span className={c('table__checkbox', {'checked--1': insurer1.vetExamFeesIncludedAtNoExtraCost == true}, {'checked--': insurer1.vetExamFeesIncludedAtNoExtraCost == null})}></span></td>
									<td className="inactive"><span className={c('table__checkbox', {'checked--1': insurer2.vetExamFeesIncludedAtNoExtraCost == true}, {'checked--': insurer2.vetExamFeesIncludedAtNoExtraCost == null})}></span></td>
								</tr>
								<tr>
									<th>{i7}</th>
									<td className="inactive"><span className={c('table__checkbox', {'checked--1': insurer1.dentalAccidentsCovered == true}, {'checked--': insurer1.dentalAccidentsCovered == null})}></span></td>
									<td className="inactive"><span className={c('table__checkbox', {'checked--1': insurer2.dentalAccidentsCovered == true}, {'checked--': insurer2.dentalAccidentsCovered == null})}></span></td>
								</tr>
								<tr>
									<th>{i8}</th>
									<td className="inactive"><span className={c('table__checkbox', {'checked--1': insurer1.dentalIllnessesCovered == true}, {'checked--': insurer1.dentalIllnessesCovered == null})}></span></td>
									<td className="inactive"><span className={c('table__checkbox', {'checked--1': insurer2.dentalIllnessesCovered == true}, {'checked--': insurer2.dentalIllnessesCovered == null})}></span></td>
								</tr>
								<tr>
									<th>{i9}</th>
									<td className="inactive"><span className={c('table__checkbox', {'checked--1': insurer1.wellnessPlanOffered == true}, {'checked--': insurer1.wellnessPlanOffered == null})}></span></td>
									<td className="inactive"><span className={c('table__checkbox', {'checked--1': insurer2.wellnessPlanOffered == true}, {'checked--': insurer2.wellnessPlanOffered == null})}></span></td>
								</tr>
								<tr>
									<th>{i10}</th>
									<td className="inactive"><span className={c('table__checkbox', {'checked--1': insurer1.virtualVettelehealthService == true}, {'checked--': insurer1.virtualVettelehealthService == null})}></span></td>
									<td className="inactive"><span className={c('table__checkbox', {'checked--1': insurer2.virtualVettelehealthService == true}, {'checked--': insurer2.virtualVettelehealthService == null})}></span></td>
								</tr>
								<tr>
									<th>{i11}</th>
									<td className="inactive"><span className={c('table__checkbox', {'checked--1': insurer1.endOfLifeCoverage == true}, {'checked--': insurer1.endOfLifeCoverage == null})}></span></td>
									<td className="inactive"><span className={c('table__checkbox', {'checked--1': insurer2.endOfLifeCoverage == true}, {'checked--': insurer2.endOfLifeCoverage == null})}></span></td>
								</tr>
								<tr>
									<th>{i12}</th>
									<td className="inactive"><span className={c('table__checkbox', {'checked--1': insurer1.multiPetDiscountOffered == true}, {'checked--': insurer1.multiPetDiscountOffered == null})}></span></td>
									<td className="inactive"><span className={c('table__checkbox', {'checked--1': insurer2.multiPetDiscountOffered == true}, {'checked--': insurer2.multiPetDiscountOffered == null})}></span></td>
								</tr>
								<tr>
									<th>{i13}</th>
									<td className="inactive"><span className={c('table__checkbox', {'checked--1': insurer1.chargeForPayingMonthly == true}, {'checked--': insurer1.chargeForPayingMonthly == null})}></span></td>
									<td className="inactive"><span className={c('table__checkbox', {'checked--1': insurer2.chargeForPayingMonthly == true}, {'checked--': insurer2.chargeForPayingMonthly == null})}></span></td>
								</tr>
								<tr>
									<th>{i14}</th>
									<td className="inactive"><span className={c('table__checkbox', {'checked--1': insurer1.appToMakeClaims == true}, {'checked--': insurer1.appToMakeClaims == null})}></span></td>
									<td className="inactive"><span className={c('table__checkbox', {'checked--1': insurer2.appToMakeClaims == true}, {'checked--': insurer2.appToMakeClaims == null})}></span></td>
								</tr>
							</tbody>
						</table>
					</div>
					<p class="small"><em>{disclaimer}</em></p>
				</div>
			}
		</div>
	)
}

export default Layout