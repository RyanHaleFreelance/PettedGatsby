import * as React from 'react'
import * as Styles from './modal.module.scss'
import c from 'classnames'
import { useState } from "react"

const Layout = ({ data, video }) => {
	let id = data;
	const closeModal = (elem) => {
		if (typeof window !== 'undefined') {
			let eles = document.querySelectorAll(".modalActive");
			document.querySelector('body').classList.remove('hasModal');
			eles.forEach(ele => {
				ele.classList.remove('modalActive');
				ele.querySelector('.embedIframe').src = '';
			});
		}
	}

	return (
		<div className={Styles.modalOverlay} onClick={closeModal}>
			<div
			role="dialog"
			id={id}
			aria-labelledby={id + "_title"}
			aria-modal="true"
			className={Styles.modal}
			data-open-page-load="false"
			>
				<div className={Styles.modalHeader}>
					<button className={Styles.modalClose} aria-label="Close Modal" onClick={closeModal}>
					<svg fill="none" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12"></path></svg>
					</button>
					<h2 className={Styles.modalTitle}></h2>
				</div>
				<div className={Styles.modalContent}>
					<div className="embed-container">
						<iframe data-src={'https://www.youtube.com/embed/' + video +'?enablejsapi=1'} src=''
							className='embedIframe'
							frameborder="0"
							allow="accelerometer; autoplay; encrypted-media; gyroscope;"
							allowfullscreen
							id="insurer-video"></iframe>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Layout