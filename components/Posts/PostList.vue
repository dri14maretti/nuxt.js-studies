<template>
	<section class="post-list">
		<PostPreview v-bind:key="post.id" v-for="post of posts" :postInfo="post" />
	</section>
</template>

<script>
    import PostPreview from '~/components/Posts/PostPreview'

export default {
	components: {
		PostPreview,
	},
	data: () => ({
		posts: [
			{
				id: '1',
				title: 'Hello there!',
				previewText:
					'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quos.',
				thumbnail:
					'https://blog.vulpi.com.br/wp-content/uploads/2020/04/apple-coffee-computer-desk-356056-1024x680.jpg',
			},
		],
	}),
}
</script>

<style scoped>
.post-list {
	display: flex;
	padding: 20px;
	box-sizing: border-box;
	flex-wrap: wrap;
	align-items: center;
	justify-content: center;
}

</style>