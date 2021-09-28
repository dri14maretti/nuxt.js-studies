<template>
	<div class="admin-post-page">
		<section class="update-form">
			<AdminPostForm :post="loadedPost" />
		</section>
	</div>
</template>

<script>
import AdminPostForm from '@/components/Admin/AdminPostForm'

export default {
	layout: 'admin',
    components: {
		AdminPostForm,
	},

	data() {
		return {
			loadedPost: {
				author: 'Adriano',
				title: 'My blog post',
				content: "Programming is great, and I'm loving Vue and Nuxt",
				thumbnailLink:
					'https://blog.vulpi.com.br/wp-content/uploads/2020/04/apple-coffee-computer-desk-356056-1024x680.jpg',
			},
		}
	},
}
</script>

<style scoped>
.update-form {
	width: 90%;
	margin: 20px auto;
}
@media (min-width: 768px) {
	.update-form {
		width: 500px;
	}
}
</style>
