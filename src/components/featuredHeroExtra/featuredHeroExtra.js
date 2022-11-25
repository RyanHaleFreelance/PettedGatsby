import * as React from 'react'
import * as Styles from './featuredHeroExtra.module.scss'
import c from 'classnames'
import Modal from '../modal/modal'

const Layout = ({ section, title }) => {
	setTimeout(() => {
		console.log(section);
	}, 2000);

	let imgAlt = (section.heroImage) ? section.heroImage.altText : 'Petted image';
	let mobImage = (section.heroImageMobile) ? section.heroImageMobile.sourceUrl : false;
	let heroVideoId = (section.heroVideoId) ? section.heroVideoId : false;
	let image = (section.heroImage) ? section.heroImage.sourceUrl : false;
	let modalId = makeid(10);

	function makeid(length) {
		var result           = '';
		var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		var charactersLength = characters.length;
		for ( var i = 0; i < length; i++ ) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	}

	const openModal = (elem) => {
		let video = document.getElementById(modalId).querySelector('.embedIframe').dataset.src;
		document.getElementById(modalId).querySelector('.embedIframe').src = video;
		document.getElementById(modalId).classList.add('modalActive');
		document.getElementById(modalId).parentElement.classList.add('modalActive');
		document.querySelector('body').classList.add('hasModal');
	}

	return (
		<div className={c(Styles.featuredHeroImage, 'align-text-center')}>
			{
				(heroVideoId) ? 
					<div className={c('embed-container', Styles.contentVideo, 'contentVideo')} data-modal-id="video-modal" data-title={title} data-id={heroVideoId} onClick={openModal} style={{ backgroundImage:  `url("${image}")`}}></div>
					// <?php echo $schema; ?>

				: (image) ?
					<img src={image} alt={imgAlt} />
				: ''
			}
			{
				(heroVideoId) ?
					<Modal data={modalId} video={heroVideoId}></Modal>
				: ''
			}
			<p>schema</p>
		</div>
	)
}

export default Layout