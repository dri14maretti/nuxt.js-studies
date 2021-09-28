<template>
	<nuxt-link :to="postLink" class="post-preview">
		<article>
			<div
				class="post-thumbnail"
				:style="{
					backgroundImage: 'url(' + postInfo.thumbnail + ')',
				}"
			></div>
			<div class="post-content">
				<h1>{{ postInfo.title }}</h1>
				<p>{{ postInfo.previewText }}</p>
			</div>
		</article>
	</nuxt-link>
</template>

<script>
export default {
	name: 'PropsPreview',
	props: {
		postInfo: {
			id: {
				type: String,
				required: true,
			},
			title: {
				type: String,
				required: true,
			},
			previewText: {
				type: String,
				required: true,
			},
			thumbnail: {
				type: String,
				required: true,
			},
		},
		isAdmin: {
			type: Boolean,
			required: true,
		}
	},

	computed: {
		postLink() {
			return this.isAdmin ? '/admin/' + this.postInfo.id : '/posts/' + this.postInfo.id;
		}
	}

}
</script>

<style scoped>
.post-preview {
	border: 1px solid #ccc;
	box-shadow: 0 2px 2px #ccc;
	background-color: white;
	width: 90%;
}

a {
	text-decoration: none;
	color: black;
}

@media (min-width: 850px) {
	.post-preview {
		width: 400px;
		margin: 10px;
	}
}

.post-thumbnail {
	width: 100%;
	height: 200px;
	background-position: center;
	background-size: cover;
}

.post-content {
	padding: 10px;
	text-align: center;
}

a:hover .post-content,
a:active .post-content {
	background-color: #ccc;
}
</style>
