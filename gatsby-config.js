module.exports = {
  siteMetadata: {
	title: `Gatsby WordPress Tutorial`,
	description: `An example to learn how to source data from WordPress.`,
	author: `@gatsbyjs`,
  },
  plugins: ["gatsby-plugin-sass",
	/*
	 * Gatsby's data processing layer begins with “source”
	 * plugins. Here the site sources its data from WordPress.
	 */
	// highlight-start
	{
	  resolve: `gatsby-source-wordpress`,
	  options: {
		url: `https://dev-petted2.pantheonsite.io/graphql`,
		debug: {
		  graphql: {
			writeQueriesToDisk: true,
		  },
		},
	  },
	},
	// highlight-end
	/**
	 * The following plugins aren't required for gatsby-source-wordpress,
	 * but we need them so the default starter we installed above will keep working.
	 **/
	 {
	  resolve: 'gatsby-source-gravityforms',
	  options: {
		  // Base URL needs to include protocol (http/https)
		  baseUrl: 'https://dev-petted2.pantheonsite.io',
		  include: [1,2,3], // Array of form IDs. Will only import these forms.
		  exclude: [], // Array of form IDs. Will exclude these forms.
		  // Gravity Forms API
		  allowSelfSigned: false,
		  api: {
			  key: 'ck_cfbd5b4103fdc980b59cbb9e43b5638d218dbda5',
			  secret: 'cs_47ac25b3223494d24fba4d05e2a376ee11830c1c',
		  },
	  },
	},
	{
		resolve: "gatsby-plugin-gravity-forms",
		options: {
		  // This URL should be the same as you use for your
		  // gatsby-source-wordpress options.
		  url: "https://dev-petted2.pantheonsite.io/graphql",
		},
	  },
	`gatsby-plugin-react-helmet`,
	{
	  resolve: `gatsby-source-filesystem`,
	  options: {
		name: `images`,
		path: `${__dirname}/src/images`,
	  },
	},
	`gatsby-transformer-sharp`,
	`gatsby-plugin-sharp`,
	{
	  resolve: `gatsby-plugin-manifest`,
	  options: {
		name: `gatsby-starter-default`,
		short_name: `starter`,
		start_url: `/`,
		background_color: `#663399`,
		theme_color: `#663399`,
		display: `minimal-ui`,
		icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
	  },
	},
  ],
}