
<script setup lang="ts">
import { onMounted } from 'vue'
import { usePostsStore } from '~/store/postsStore'


const postsStore = usePostsStore()



onMounted(async () => {
  await postsStore.loadPosts()

})

</script>
<template>
  <div>
    <h1>Posts</h1>

    <!-- Loading State -->
    <div v-if="!postsStore.posts.length">
      Loading posts...
    </div>
    
    <!-- Posts List -->
    <div v-else>
      <div
        v-for="post in postsStore.posts"
        :key="post.id"
      >
        <NuxtLink :to="`/${post.id}`">
          <h2>{{ post.title || post.headline || 'Untitled Post' }}</h2>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

