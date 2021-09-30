<template>
	<form @submit.prevent="onSave">
		<AppControlInput v-model="editedPost.author"
			>Author Name</AppControlInput
		>

		<AppControlInput v-model="editedPost.title">Title</AppControlInput>

		<AppControlInput v-model="editedPost.thumbnail"
			>Thumbnail Link</AppControlInput
		>

		<AppControlInput control-type="textarea" v-model="editedPost.content"
			>Content</AppControlInput
		>

		<AppButton type="submit">Save</AppButton>

		<AppButton
			type="button"
			style="margin-left: 10px"
			btn-style="cancel"
			@click="onCancel"
			>Cancel</AppButton
		>
	</form>
</template>

<script>
export default {

	props: {
		post: {
			type: Object,
			required: false,
			default: {},
		},
	},

	data() {
		return {
			editedPost: this.post
				? { ...this.post }
				: {
						author: '',
						title: '',
						thumbnail: '',
						content: '',
						previewText: '',
				  },
		}
	},

	methods: {
		onSave() {
			if (this.editedPost.content.length > 100)
				this.editedPost.previewText = this.editedPost.content.substring(
					0,
					100
				) + '...';
			else
				this.editedPost.previewText =
					this.editedPost.content.substring(
						0,
						(this.editedPost.content.length - 1) / 2
					) + '...';
			this.$emit('submit', this.editedPost)
		},

		onCancel() {
			this.$router.push('/admin')
		},
	},
}
</script>
