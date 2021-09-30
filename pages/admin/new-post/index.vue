<template>
	<div class="admin-new-post-page">
		<section class="new-post-form">
			<AdminPostForm @submit="onSubmitted" />
		</section>
	</div>
</template>

<script>
import AdminPostForm from '@/components/Admin/AdminPostForm'
import axios from 'axios'
export default {
	layout: 'admin',
	middleware: ['check-auth', 'auth'],
	components: {
		AdminPostForm,
	},
	methods: {
		onSubmitted(post) {
			this.$store.dispatch('addPost', post).then(() => {
				this.$router.push('/admin')
			})
		},
	},
}
</script>

<style scoped>
.new-post-form {
	width: 90%;
	margin: 20px auto;
}

@media (min-width: 768px) {
	.new-post-form {
		width: 500px;
	}
}
</style>
