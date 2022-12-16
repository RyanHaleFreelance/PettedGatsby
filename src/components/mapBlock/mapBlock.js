import * as React from 'react'

const Layout = ({ section, images }) => {
	const pagedata = section.attributes.data;
	let title = pagedata.map_title;
	let map = getImageUrl(pagedata.map_image);
	let content = pagedata.map_content;
	let link = pagedata.map_link;

	function getImageUrl(id) {
		for (var i = 0; i < images.length; i++){
			if (images[i].node.databaseId === id){
			   return images[i].node.sourceUrl;
			}
		}
	}

	return (
		<div className="section">
			<div className="container items-center"> 
				<div className="col col-md-1-2"> 
					{
						(link) ? 
							<a href={link} target="_blank" id="map">
								<div id="map">
									<img src={map} alt="Petted Map location" />
								</div>
							</a>
						: 
							<div id="map">
								<img src={map} alt="Petted Map location" />
							</div>
					}
				</div>
				<div className="col col-md-1-2 align-text-center">
					{
						(title) ?
							<h2 className="textBlockTitle" dangerouslySetInnerHTML={{__html: title}}></h2>
						: ''
					}
					{
						(content) ? 
							<div className="textBlockInner">
								<p dangerouslySetInnerHTML={{__html: content}}></p>
							</div>
						: ''
					}
				</div>
			</div>
		</div>
	)
}

export default Layout