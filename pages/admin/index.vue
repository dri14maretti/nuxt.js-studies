<template>
    <div class="admin-page">
        <section class="new-post">
            <v-btn>
                Create Post
            </v-btn>
        </section>
        <section>
            <h1>Existing posts</h1>
            <PostList />
        </section>
    </div>
</template>

<script>
import PostList from '~/components/Posts/PostList'

export default defineComponent({
    components: {
        PostList
    }
})
</script>
