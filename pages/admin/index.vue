<template>
	<div class="admin-page">
		<section class="new-post">
			<v-btn @click="$router.push('/admin/new-post')">
				Create Post
			</v-btn>
			<v-btn @click="onLogout" style="margin-left: 10px"> Logout </v-btn>
		</section>
		<section class="existing-posts">
			<h1>Existing posts</h1>
			<PostList isAdmin :posts="loadedPosts" />
		</section>
	</div>
</template>

<script>
export default {
	layout: 'admin',
	middleware: ['check-auth', 'auth'],
	computed: {
		loadedPosts() {
			return this.$store.getters.loadedPosts
		},
	},
	methods: {
		onLogout() {
			this.$store.dispatch('logout')
			this.$router.push('/admin/auth')
		},
	},
}
</script>

<style scoped>
.admin-page {
	padding: 20px;
}

.new-post {
	text-align: center;
	border-bottom: 2px solid #ccc;
	padding-bottom: 10px;
}

.existing-posts h1 {
	text-align: center;
}
</style>
