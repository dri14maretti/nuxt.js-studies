import Vuex from 'vuex'
import axios from 'axios'

const createStore = () => {
	return new Vuex.Store({
		state: {
			loadedPosts: [],
		},
		mutations: {
			setPosts(state, posts) {
				state.loadedPosts = posts
			},
			addPost(state, post) {
				state.loadedPosts.push(post)
			},
			editPost(state, editedPost) {
				const postIndex = state.loadedPosts.findIndex((post) => post.id === editedPost.id)
				state.loadedPosts[postIndex] = editedPost
			},
		},
		actions: {
			async nuxtServerInit(vuexContext, context) {
				return axios
					.get('https://nuxt-blog-ed505-default-rtdb.firebaseio.com/posts.json')
					.then((reponse) => {
						const responseArray = []
						for(const key in reponse.data) {
							responseArray.push({... reponse.data[key], id: key})
						}
						vuexContext.commit('setPosts', responseArray)
					})
					.catch((e) => console.log(e))
			},
			setPosts(vuexContext, posts) {
				vuexContext.commit('setPosts', posts)
			},
			async addPost(vuexContext, post) {
				const createdPost = { ...post, updatedDate: new Date().toLocaleDateString() }
				return axios
				.post(
					'https://nuxt-blog-ed505-default-rtdb.firebaseio.com/posts.json',
					createdPost
				)
				.then((result) => {
					vuexContext.commit('addPost', { ...createdPost, id: result.data.name })
				})
				.catch((error) => {
					console.log(error)
				})
			},
			async editPost(vuexContext, editedPost) {
				return axios
				.put(
					`https://nuxt-blog-ed505-default-rtdb.firebaseio.com/posts/${editedPost.id}.json`,
					editedPost
				)
				.then((response) => {
					vuexContext.commit('editPost', editedPost)
				})
				.catch((error) => {
					console.log(error)
				})
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
