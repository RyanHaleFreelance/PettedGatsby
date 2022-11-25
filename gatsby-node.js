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

  if (result.errors) {
    reporter.error("There was an error fetching posts", result.errors)
  }
  
  const { allWpPage } = result.data
  const { allWpPost } = posts.data
  
  // Define the template to use
  const pageTemplate = require.resolve(`./src/templates/WpPage.js`)
  const blogHome = require.resolve(`./src/templates/blogHome.js`)
  const postTemplate = require.resolve(`./src/templates/WpPost.js`)
  
  if (allWpPage.nodes.length) {
    allWpPage.nodes.map(page => {
      console.log(page.uri + page.template.templateName);
      if(page.template.templateName == 'Blog Home') {
        actions.createPage({
          path: page.uri,
          component: blogHome,
          context: page,
        })
      } else {
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
        // It's best practice to use the uri field from WPGraphQL nodes when
        // building
        path: post.uri,
        component: postTemplate,
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