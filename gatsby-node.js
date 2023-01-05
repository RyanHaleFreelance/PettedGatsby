exports.createPages = async ({ actions, graphql, reporter }) => {
  const result = await graphql(`
	{
	  allWpPage {
		nodes {
		  id
		  uri
		  template {
			templateName
		  }
		}
	  }
	}
  `)

  const posts = await graphql(`
	{
	  allWpPost {
		nodes {
		  id
		  uri
		}
	  }
	}
  `)

  const insurers = await graphql(`
  {
	allWpInsurer {
	  nodes {
		id
		uri
	  }
	}
  }
`)

const breeds = await graphql(`
{
  allWpBreed {
	nodes {
	  id
	  uri
	}
  }
}
`)

const archives = await graphql(`
{
  allWpContentType {
	edges {
	  node {
		id
		uri
	  }
	}
  }
}
`)

const states = await graphql(`
{
  allWpState {
	nodes {
	  id
	  uri
	}
  }
}
`)

const categories = await graphql(`
{
	allWpCategory {
	  nodes {
		id
		uri
	  }
	}
  }
`)

const users = await graphql(`
{
  allWpUser {
	edges {
	  node {
		id
		uri
	  }
	}
  }
}
`)

  if (result.errors) {
	reporter.error("There was an error fetching posts", result.errors)
  }
  
  const { allWpPage } = result.data
  const { allWpPost } = posts.data
  const { allWpInsurer } = insurers.data
  const { allWpState } = states.data
  const { allWpBreed } = breeds.data
  const { allWpContentType } = archives.data
  const { allWpUser } = users.data
  const { allCategories } = categories.data
  
  // Define the template to use
  const pageTemplate = require.resolve(`./src/templates/WpPage.js`)
  const blogHome = require.resolve(`./src/templates/blogHome.js`)
  const versus = require.resolve(`./src/templates/versus.js`)
  const usNews = require.resolve(`./src/templates/usNews.js`)
  const review = require.resolve(`./src/templates/insurerReview.js`)
  const postTemplate = require.resolve(`./src/templates/WpPost.js`)
  const insurer = require.resolve(`./src/templates/insurerSingle.js`)
  const state = require.resolve(`./src/templates/stateSingle.js`)
  const breed = require.resolve(`./src/templates/breedSingle.js`)
  const breedHome = require.resolve(`./src/templates/breedsHome.js`)
  const stateHome = require.resolve(`./src/templates/statesHome.js`)
  const insurerHome = require.resolve(`./src/templates/insurersHome.js`)
  const author = require.resolve(`./src/templates/authorSingle.js`)
  const catSingle = require.resolve(`./src/templates/catSingle.js`)
  
  if (allWpPage.nodes.length) {
		allWpPage.nodes.map(page => {
			if(page.template.templateName == 'Blog Home') {
				actions.createPage({
				path: page.uri,
				component: blogHome,
				context: page,
				})
			}
			else if(page.template.templateName == 'Insurer Vs. Insurer') {
				actions.createPage({
					path: page.uri,
					component: versus,
					context: page,
				})
	  		} 
			else if(page.template.templateName == 'US NEws') {
				actions.createPage({
					path: page.uri,
					component: usNews,
					context: page,
				})
	  		} 
			else if(page.template.templateName == 'Insurer Review') {
				actions.createPage({
					path: page.uri,
					component: review,
					context: page,
				})
			}
			else {
				actions.createPage({
				path: page.uri,
				component: pageTemplate,
				context: page,
				})
	  		}
   		})
  	}

  if (allWpPost.nodes.length) {
	allWpPost.nodes.map(post => {
	  actions.createPage({
		path: post.uri,
		component: postTemplate,
		context: post,
	  })
	})
  }

  if (allWpInsurer.nodes.length) {
	allWpInsurer.nodes.map(post => {
	  actions.createPage({
		path: post.uri,
		component: insurer,
		context: post,
	  })
	})
  }

  if (categories.data.allWpCategory.nodes.length) {
	categories.data.allWpCategory.nodes.map(post => {
	  actions.createPage({
		path: post.uri,
		component: catSingle,
		context: post,
	  })
	})
  }

  if (allWpUser.edges.length) {
	allWpUser.edges.map(post => {
	  actions.createPage({
		path: post.node.uri,
		component: author,
		context: {
		  id: post.node.id,
		  uri: post.node.uri,
		},
	  })
	})
  }
  if (allWpContentType.edges.length) {
	allWpContentType.edges.map(post => {
	  if(post.node.uri == '/breeds/') {
		actions.createPage({
		  path: post.node.uri,
		  component: breedHome,
		  context: post,
		})
	  }

	  else if(post.node.uri == '/states/') {
		actions.createPage({
		  path: post.node.uri,
		  component: stateHome,
		  context: post,
		})
	  }

	  else if(post.node.uri == '/insurers/') {
		const posts = allWpInsurer.nodes
		const postsPerPage = 15
		const numPages = Math.ceil(posts.length / postsPerPage)
		Array.from({ length: numPages }).forEach((_, i) => {
		  actions.createPage({
			path: i === 0 ? `/insurers/` : `/insurers/page/${i + 1}`,
			component: insurerHome,
			context: {
			  limit: postsPerPage,
			  skip: i * postsPerPage,
			  numPages,
			  currentPage: i + 1,
			},
		  })
		})
	  }
	})
  }

  if (allWpBreed.nodes.length) {
	allWpBreed.nodes.map(post => {
	  actions.createPage({
		path: post.uri,
		component: breed,
		context: post,
	  })
	})
  }

  if (allWpState.nodes.length) {
	allWpState.nodes.map(post => {
	  actions.createPage({
		path: post.uri,
		component: state,
		context: post,
	  })
	})
  }
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
	type WpBlockAttributesObject {
	  foobar: String
	}
  `;
  createTypes(typeDefs);
};