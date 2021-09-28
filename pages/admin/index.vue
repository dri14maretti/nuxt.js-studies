<template>
    <div class="admin-page">
        <section class="new-post">
            <v-btn @click="$router.push('/admin/new-post')">
                Create Post
            </v-btn>
        </section>
        <section class="existing-posts">
            <h1>Existing posts</h1>
            <PostList isAdmin/>
        </section>
    </div>
</template>

<script>
import PostList from '~/components/Posts/PostList'

export default {
    layout: 'admin',
    components: {
        PostList
    }
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