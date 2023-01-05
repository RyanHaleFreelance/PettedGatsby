import * as React from 'react'
import * as Styles from './postCard.module.scss'
import c from 'classnames'

const Layout = ({ data, index, image }) => {
	let content = undefined;

	function trimDownToWord(string, maxLength) {
		if (string <= maxLength) {
		  return string;
		}
	  
		let first = string.substr(0, maxLength);
		const second = string.substr(maxLength);
	  
		if (/\w$/.test(first) && /^\w/.test(second)) {
		  first = first.replace(/\b[^\w]*\w+$/, '');
		}
	  
		return first.trim() + '...';
	}

	const regex = /(<([^>]+)>)/ig;

	if(data.content !== undefined) {
		content = trimDownToWord(data.content.replace(regex, ''), 200);
	}

	if(data.excerpt !== undefined) {
		content = trimDownToWord(data.excerpt.replace(regex, ''), 200);
	}

	let cat = '';
	let catClass = '';
	if (data.categories !== undefined) {
		cat = data.categories.nodes[0].name;
		catClass = 'postLatestCat' + cat;
	}

	const getOrdinalNum = (number) => {
		let selector;
	  
		if (number <= 0) {
		  selector = 4;
		} else if ((number > 3 && number < 21) || number % 10 > 3) {
		  selector = 0;
		} else {
		  selector = number % 10;
		}
	  
		return number + ['th', 'st', 'nd', 'rd', ''][selector];
	};

	function formatDate(date) {
		const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
		var d = new Date(date),
			month = '' + (d.getMonth() + 1),
			day = '' + d.getDate(),
			year = d.getFullYear();
	
			month = months[month];
		if (day.length < 2) 
			day = '0' + day;
	
		day = getOrdinalNum(day);
		return day + ' ' + month + ' ' + year;
	}
	
	let date = formatDate(data.date);

	return (
		<div data-num={index} className={Styles.postLatestCard}> 
			<a href={data.uri} className={Styles.postLatestImage}>
				<img src={image} alt={data.title} />
			</a> 
			<div className={Styles.postLatestInfo}> 
				<div className="flex items-center">
					{
						(cat) ? 
							<div className={c(`${Styles.postLatestCat} ${Styles[catClass]}`)}><a href={`/blog/category/${cat}`} data-val="13">{cat}</a></div>
						: ''
					}
					<p className="small no-bm">{date}</p>
				</div> 
				<div className={Styles.postLatestTitle}> 
					<a href={data.uri} dangerouslySetInnerHTML={{__html: data.title}}></a>
				</div> 
				{
					(content) ?
					<div className={Styles.postLatestDesc}> 
						<p>{content}</p> 
					</div>
					: ''
				}
			</div>
		</div>
	)
}

export default Layout