
<script setup lang="ts">
import { onMounted } from 'vue'
import { usePostsStore } from '~/store/postsStore'

const route = useRoute()
const router = useRouter()
const postsStore = usePostsStore()
const searchQuery = ref((route.query.search as string) || '')

const filteredPosts = computed(() => {
  if (!searchQuery.value) return postsStore.posts
  return postsStore.posts.filter(post => {
    const title = post.title || post.headline || ''
    return title.toLowerCase().includes(searchQuery.value.toLowerCase())
  })
})

onMounted(async () => {
  await postsStore.loadPosts()

})

watch([searchQuery], ([newSearch]) => {
  router.replace({
    query: {
      ...route.query,
      search: newSearch || undefined,
    }
  })
})

</script>
<template>
  <div>
    <div class="filters">
      <InputText
        v-model="searchQuery"
        placeholder="Search by title"
        aria-label="Search posts by title"
      />
     
    <h1>Posts</h1>

    <!-- Loading State -->
    <div v-if="!postsStore.posts.length">
      Loading posts...
    </div>
    
    <!-- Posts List -->
    <div v-else>
      <div
        v-for="post in filteredPosts"
        :key="post.id"
      >
        <NuxtLink :to="`/${post.id}`">
          <h2>{{ post.title || post.headline || 'Untitled Post' }}</h2>
        </NuxtLink>
      </div>
    </div>
</div>
</div></template>

