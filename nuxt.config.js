import colors from 'vuetify/es5/util/colors'

export default {
	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		titleTemplate: '%s - pages-routing-views',
		title: 'pages-routing-views',
		htmlAttrs: {
			lang: 'en',
		},
		meta: [
			{ charset: 'utf-8' },
			{
				name: 'viewport',
				content: 'width=device-width, initial-scale=1',
			},
			{ hid: 'description', name: 'description', content: '' },
			{ name: 'format-detection', content: 'telephone=no' },
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
			{
				rel: 'stylesheet',
				href: 'https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" rel="stylesheet',
			},
		],
	},

	loading: { color: '#fa923f' },

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: ['~/assets/styles/main.css'],

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: ['~plugins/core-components.js', '~plugins/date-filter.js'],

	env: {
		fbAPIKey: 'AIzaSyD79xQpxIShYDQ3KcCxbSxsIjdkFCySrsQ',
	},

	axios: {
		baseURL: 'https://nuxt-blog-ed505-default-rtdb.firebaseio.com',
		credentials: false,
	},

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: true,

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [
		// https://go.nuxtjs.dev/vuetify
		'@nuxtjs/vuetify',
	],

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: ['@nuxtjs/axios'],

	// Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
	vuetify: {
		customVariables: ['~/assets/variables.scss'],
		theme: {
			dark: true,
			themes: {
				dark: {
					primary: colors.blue.darken2,
					accent: colors.grey.darken3,
					secondary: colors.amber.darken3,
					info: colors.teal.lighten1,
					warning: colors.amber.base,
					error: colors.deepOrange.accent4,
					success: colors.green.accent3,
				},
			},
		},
	},

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {},

	transition: {
		name: 'fade',
		mode: 'out-in',
	},
}
