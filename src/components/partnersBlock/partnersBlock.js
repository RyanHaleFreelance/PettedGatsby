import * as React from 'react'
import * as Styles from './partnersBlock.module.scss'
import c from 'classnames'

const Layout = ({ section, images }) => {
	const pagedata = section.attributes.data;
	let dataArray = [];
	let buttonText = pagedata.partners_button_text;
	let buttonLink = pagedata.partners_button_link.url;
	let title = pagedata.partners_title;
	let bgAlt = pagedata.partners_bg_alt;
	let left = pagedata.partners_align_left;
	let just = pagedata.partners_justification;
	let content = pagedata.partners_content;
	let image = getImageUrl(pagedata.partners_image);

	for (var i=0; i < pagedata.partners; i++) {
		let link = 'partners_' + i + '_link';
		let logo = 'partners_' + i + '_logo';
		let name = 'partners_' + i + '_name';
		dataArray.push({
			name: pagedata[name],
			link: pagedata[link],
			image: getImageUrl(pagedata[logo]),
		});
	}

	function getImageUrl(id) {
		for (var i = 0; i < images.length; i++){
			if (images[i].node.databaseId === id){
			   return images[i].node.sourceUrl;
			}
		}
	}

	setTimeout(() => {
		let partner_logos = [...document.querySelectorAll('.partner-logo:not(.hide)')];
		let hidden_logos = document.querySelectorAll('.partner-logo.hide');
	
		if(partner_logos.length && hidden_logos.length) {
			shuffle(partner_logos);

			let logo_index = 0;
			let logo_max = partner_logos.length;
			let hidden_index = 0;
			let hidden_max = hidden_logos.length;
	
			for (let index = 0; index < 50; index++) {
				setTimeout(function(){
					let partner_logo = partner_logos[logo_index];
	
					// console.log(logo_index);
					// find image within random
					let image = partner_logo.getElementsByTagName('img')[0];
					let image_src = image.src;
					let image_swap = hidden_logos[hidden_index].getElementsByTagName('img')[0];
					let image_swap_src = image_swap.src;
					// Fade out logo
					partner_logo.classList.add('fade-out');
	
					setTimeout(function(){
						// Swap image src
						image.src = image_swap_src;
						image.dataset.src = image_swap_src;
						image_swap.src = image_src;  
						image_swap.dataset.src = image_src;  
					}, 500);
	
					setTimeout(function(){
						// Fade in logo
						partner_logo.classList.remove('fade-out');
					}, 750);
	
					if(hidden_index === (hidden_max - 1)) {
						hidden_index = 0;
					} else {
						hidden_index++;
					}
	
					if(logo_index === (logo_max - 1)) {
						logo_index = 0;
					} else {
						logo_index++;
					}
	
				}, 1000 + (2700 * index));
			}
		}
	}, 1000);



	function shuffle(array) {
		array.sort(() => Math.random() - 0.5);
	}

	return (
		<div className={c("section", {'bg-alt': bgAlt == 1})}>
			<div className={c("text-image-block container items-center", {'flex-reverse': left == 1})}> 
				<div className={c("col col-md-1-2", {'align-text-center': just == 1})}>
					{
						(title) ? 
							<h2 className={Styles.textBlockTitle}>{title}</h2> 
						: ''
					}
					<div class="text-block__inner">
						{
							(content) ? 
								<div dangerouslySetInnerHTML={{__html: content}}></div>
							: ''
						}
						{
							(dataArray.length > 0) ? 
								<ul class="flex list--unstyled flexwrap justify-center items-center no-bm">
									{
										dataArray.map((section, i) => (
											<li  className={c("partner-logo", {'hide': i > 8})}>
												{
													(section.link) ? 
														"<a href=${section.link} target='_blank'>"
													: ''
												}
													<img src={section.image} alt={section.name} loading="lazy"  />
												{
													(section.link) ? 
														"</a>"
													: ''
												}
											</li>
										))
									}
								</ul>
							: ''
						}
					</div>
					{
						(buttonLink) ? 
							<a href={buttonLink} className="btn btn--slim">{buttonText}</a>
						: ''
					}
				</div>
				<div class="col col-md-1-2 align-text-center med-up">
					<div class="image-mask">
						<img src={image} alt="Dog image" />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Layout