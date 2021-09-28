import Vuex from 'vuex'

const createStore = () => {
	return new Vuex.Store({
		state: {
			loadedPosts: [],
		},
		mutations: {
			setPosts(state, posts) {
				state.loadedPosts = posts
			},
		},
		actions: {
			async nuxtServerInit(vuexContext, context) {
				return new Promise((resolve, reject) => {
					setTimeout(() => {
						vuexContext.commit('setPosts', [
							{
								id: '1',
								title: 'Hello there!',
								previewText:
									'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quos.',
								thumbnail:
									'https://blog.vulpi.com.br/wp-content/uploads/2020/04/apple-coffee-computer-desk-356056-1024x680.jpg',
							},
							{
								id: '2',
								title: 'Hello there for the second time!',
								previewText: 'Teste de previewText',
								thumbnail:
									'https://blog.vulpi.com.br/wp-content/uploads/2020/04/apple-coffee-computer-desk-356056-1024x680.jpg',
							},
						])
                        resolve();
					}, 1500)
				})
			},
			setPosts(vuexContext, posts) {
				vuexContext.commit('setPosts', posts)
			},
		},
		getters: {
			loadedPosts(state) {
				return state.loadedPosts
			},
		},
	})
}

export default createStore
