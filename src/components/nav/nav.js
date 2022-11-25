import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import * as Styles from './nav.module.scss'
import c from 'classnames'
import { useState } from "react"

const DocsSidebar = ({ title }) => {
    const { wpMenu } = useStaticQuery(graphql`
    {
        wpMenu(locations: {eq: HEADER}) {
          name
          menuItems {
            nodes {
              label
              url
              databaseId
              childItems {
                nodes {
                  url
				  label
                  databaseId
				  cssClasses
                }
              }
              parentId
			  cssClasses
            }
          }
        }
    }
  `)

  const [mobExpanded, setMobExpanded] = useState(false);
  const toggleMobExpand = () => setMobExpanded(!mobExpanded);

  return (
	<div className={Styles.menuHeaderMenuContainer}>	
		<ul id="main-nav" className={c(Styles.nav, Styles.navHeader)}>
			{wpMenu.menuItems.nodes.map((menuItem, i) => {
				const path = menuItem?.connectedNode?.node?.uri ?? menuItem.url
				const itemId = "menu-item-" + menuItem.databaseId
				if (menuItem.parentId) {
					return null;
				} 

				if (!menuItem.parentId && menuItem.childItems.nodes.length > 0) {
					const children = menuItem.childItems.nodes;
					return <li id={itemId} key={i + menuItem.url} className={c(Styles.menuItem, Styles.menuItemTypeCustom, Styles.menuItemObjectCustom, Styles.menuItemHasChildren, menuItem.cssClasses, {'open': mobExpanded == true})}><a className={c(Styles.menuLink, Styles.subMenuLink)} href={path} onClick={toggleMobExpand}>{menuItem.label}</a>
						<ul className={Styles.subMenu}>
							{ 
								children.map((item) =>
									<li id={item.databaseId} key={i + item.url} className={c(Styles.menuItem, Styles.menuItemTypeCustom, Styles.menuItemObjectCustom, item.cssClasses)}><a className={c(Styles.menuLink, Styles.subMenuLink)} href={item.url}>{item.label}</a></li>
								)
							}
						</ul>
						<button className={c('dropdown-toggle', Styles.dropdownToggle)} onClick={toggleMobExpand}>Expand Menu Item</button>
					</li>;
				} 

				if (!menuItem.parentId) {
					return <li id={itemId} key={i + menuItem.url} className={c(Styles.menuItem, menuItem.cssClasses)}><a className={c(Styles.menuLink, Styles.subMenuLink)} href={path}><div dangerouslySetInnerHTML={{__html: menuItem.label}}></div></a></li>;
				} 
			})}
		</ul>
		<a href="https://quote.petted.com/quote/" target="_blank" className={c("btn", "btn--alt", Styles.headerMobileBtn)}>Get a quote</a>
	</div>
  )
}

export default DocsSidebar