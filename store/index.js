import Vuex from 'vuex'
import Cookie from 'js-cookie'

const createStore = () => {
	return new Vuex.Store({
		state: {
			loadedPosts: [],
			token: null,
		},
		mutations: {
			setPosts(state, posts) {
				state.loadedPosts = posts
			},
			addPost(state, post) {
				state.loadedPosts.push(post)
			},
			editPost(state, editedPost) {
				const postIndex = state.loadedPosts.findIndex(
					(post) => post.id === editedPost.id
				)
				state.loadedPosts[postIndex] = editedPost
			},
			setToken(state, token) {
				state.token = token
			},
			clearToken(state) {
				state.token = null
			},
		},
		actions: {
			async nuxtServerInit(vuexContext, context) {
				return context.app.$axios
					.$get('/posts.json')
					.then((data) => {
						const responseArray = []
						for (const key in data) {
							responseArray.push({ ...data[key], id: key })
						}
						vuexContext.commit('setPosts', responseArray)
					})
					.catch((e) => console.log(e))
			},
			setPosts(vuexContext, posts) {
				vuexContext.commit('setPosts', posts)
			},
			async addPost(vuexContext, post) {
				const createdPost = { ...post, updatedDate: new Date() }
				return this.$axios
					.$post(
						`/posts.json?auth=${vuexContext.state.token}`,
						createdPost
					)
					.then((data) => {
						vuexContext.commit('addPost', {
							...createdPost,
							id: data.name,
						})
					})
					.catch((error) => {
						console.log(error)
					})
			},
			async editPost(vuexContext, editedPost) {
				return this.$axios
					.$put(
						`/posts/${editedPost.id}.json?auth=${vuexContext.state.token}`,
						editedPost
					)
					.then((response) => {
						vuexContext.commit('editPost', editedPost)
					})
					.catch((error) => {
						console.log(error)
					})
			},

			authenticateUser(vuexContext, authData) {
				let authURL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.fbAPIKey}`

				if (!authData.isLogin)
					authURL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.fbAPIKey}`

				return this.$axios
					.$post(authURL, {
						email: authData.email,
						password: authData.password,
						token: '',
						returnSecureToken: true,
					})
					.then((result) => {
						vuexContext.commit('setToken', result.idToken)
						localStorage.setItem('token', result.idToken)
						localStorage.setItem(
							'tokenExpiration',
							new Date().getTime() + +result.expiresIn * 1000
						)

						Cookie.set('jwt', result.idToken)
						Cookie.set(
							'expirationDate',
							new Date().getTime() + +result.expiresIn * 1000
						)
					})
					.catch((error) => {
						console.warn(error.response.data.error.message)
					})
			},

			initAuth(vuexContext, req) {
				let token, expirationDate
				if (req) {
					if (!req.headers.cookie) return

					const jwtCookie = req.headers.cookie
						.split(';')
						.find((c) => c.trim().startsWith('jwt='))

					if (!jwtCookie) return

					token = jwtCookie.split('=')[1]
					expirationDate = req.headers.cookie
						.split(';')
						.find((c) => c.trim().startsWith('expirationDate='))
						.split('=')[1]
				} else {
					token = localStorage.getItem('token')
					expirationDate = localStorage.getItem('tokenExpiration')
				}

				if (new Date() > +expirationDate || !token) {
					vuexContext.dispatch('logout')
					return
				}

				vuexContext.commit('setToken', token)
			},
			logout(vuexContext) {
				vuexContext.commit('clearToken')
				Cookie.remove('jwt')
				Cookie.remove('expirationDate')
				if (process.client) {
					localStorage.removeItem('token')
					localStorage.removeItem('tokenExpiration')
				}
			},
		},
		getters: {
			loadedPosts(state) {
				return state.loadedPosts
			},
			isAuthenticated(state) {
				return state.token != null
			},
		},
	})
}

export default createStore
