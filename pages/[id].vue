<script setup lang="ts">
import { useRoute } from 'vue-router'
import { usePostsStore } from '~/store/postsStore'
import type { Post } from '~/types/Post'

const route = useRoute()
const router = useRouter()
const postsStore = usePostsStore()

const loading = ref(true);
const postId = Number(route.params.id)
const currentPost = computed<Post>(() => postsStore.posts.find(p => p.id === postId))

const goBack = () => {
   router.push({
      path: '/',
      query: route.query
   })
}

onMounted(async () => {

   // Ensure posts are loaded 
   if (postsStore.posts.length === 0) {
      loading.value = true;
      await postsStore.loadPosts()
      loading.value = false;
   }

   loading.value = false;
})
</script>

<template>
   <div>
      <!-- Back Button -->
      <Button 
         label="← Back" 
         icon="pi pi-arrow-left" 
         class="p-button-text p-mb-3" 
         @click="goBack" 
      />

      <!-- Post details-->
      <div v-if="loading"  aria-live="polite"> loading ... </div>
      <main v-else-if="currentPost">
         <div v-if="currentPost.meta.images">
            <div v-for="idx, img in currentPost.meta.images" :key="idx">
               <img :src="img.url" :alt="img.alt" class="w-full h-auto mb-4"/>
            </div>
               
         </div>
         <h1>{{ currentPost.title || currentPost.headline || 'Untitled' }}</h1>
         <div v-html="currentPost.content"></div>
         <time :datetime="currentPost.published_date">{{ currentPost.published_date }}</time>
         <ul v-if="currentPost.meta.tags">
            <li v-for="(tag, index) in currentPost.meta.tags" :key="index"> {{ tag }}</li>
         </ul>
      </main>
      <div  v-else role="alert">
         <p>Post not found.</p>
      </div>
   </div>
 
</template>
