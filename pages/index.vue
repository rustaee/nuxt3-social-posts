
<script setup lang="ts">
import { onMounted } from 'vue'
import { usePostsStore } from '~/store/postsStore'

const route = useRoute()
const router = useRouter()
const postsStore = usePostsStore()
const searchQuery = ref((route.query.search as string) || '')
const platformFilter = ref((route.query.platform as string) || '')

const filteredPosts = computed(() => {
  let posts = postsStore.posts;

  // Filter by search query
  if (searchQuery.value) {
    posts = posts.filter(post =>
      (post.title || post.headline || '').toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  //filter by platform
  if (platformFilter.value ) {
    posts = posts.filter(post => post.platform === platformFilter.value)
  }

  return posts
  
})

const platforms = computed(() => {
  // Use a Set to avoid duplicates
  const platformSet = new Set(postsStore.posts.map(post => post.platform))

  // Filter out empty or undefined platforms
  return Array.from(platformSet).filter(Boolean)
})

onMounted(async () => {
  await postsStore.loadPosts()

})

watch([searchQuery, platformFilter], ([newSearch, newPlatform]) => {
  router.replace({
    query: {
      ...route.query,
      search: newSearch || undefined,
      platform: newPlatform || undefined
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
      
      <select v-model="platformFilter" aria-label="Filter posts by platform">
        <option value="">All Platforms</option>
        <option v-for="platform in platforms" :key="platform" :value="platform">
          {{ platform }}
        </option>
      </select>
     
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

