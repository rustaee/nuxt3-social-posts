
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

const detailPageLink = (post: Post) => {
   return { path: `/${post.id}`, query: route.query }
}

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
   <div class="w-full pt-5">
      <header class="header border-round-xl pb-8">
         <!-- top menu -->
         <div class="menu flex flex-row justify-content-between bg-red-200  border-round-top-xl">
            <div class="logo w-4  flex flex-row align-items-center">
               <div class="border-circle w-3rem h-3rem m-2 ml-4 bg-white "></div>
               <span class="text-white font-bold">Home</span>
            </div>
            <nav class="items" role="navigation">
               <ul class="list-none flex flex-row m-4">
                  <li><NuxtLink to="/">Home</NuxtLink></li>
                  <li class="mx-4"><NuxtLink to="/">About</NuxtLink></li>
                  <li><NuxtLink to="/">Contact</NuxtLink></li>
               </ul>
            </nav>
         </div>

         <h1 class="text-white text-6xl font-normal text-center mt-8">Social Posts</h1>
         <div class="filters flex flex-column justify-content-center align-items-center">
            <!-- Search Input -->
            <InputText
               v-model="searchQuery"
               placeholder="Search by title"
               aria-label="Search posts by title"
               class="mb-3 w-6 p-3"
            />

            <!-- Platform Filter -->
            <div class="flex flex-row w-6">
               <Select v-model="platformFilter" :options="platforms" placeholder="All Platforms" show-clear class="w-full p-1" aria-label="Filter by platform"/>

               <Button class="w-4 ml-2" label="Filter"/>
            </div>
    
         </div>
      </header>
  
      <!-- Posts List -->
      <main class="flex flex-row flex-wrap justify-content-center mt-5"  aria-live="polite">
         <!-- Loading State -->
         <div v-if="!postsStore.posts.length">
            <ProgressSpinner
               style="width: 50px; height: 50px" 
               stroke-width="8" 
               fill="transparent"
               animation-duration=".5s" 
               aria-label="loading" />
         </div>
    
         <!-- Posts List -->
         <div v-else class="flex flex-row flex-wrap justify-content-center align-stretch ">
            <div
               v-for="post in filteredPosts"
               :key="post.id"
               class="lg:w-4 md:w-6 sm:w-full p-3"
            >
               <Card class="w-full h-full">
                  <template #title><NuxtLink :to="detailPageLink(post)">
                     <h3>{{ post.title || post.headline || 'Untitled Post' }}</h3>
                  </NuxtLink></template>
                  <template #content>
                     <p class="m-0">
                        {{post.platform}}
                     </p>
                  </template>
               </Card>
            </div>
      
         </div>
      </main>
   
   </div>
</template>
<style scoped>
  .header{
    background: rgba(16, 32, 52, 0.2);
  }

  .menu{
    background: linear-gradient(to right, #0A2139, #2E5B8D);
    a {
      color: #ffffff;
      text-decoration: none;
    }
    a:hover {
      color: #ffffff;
      text-decoration: underline;
    }
  }
</style>

