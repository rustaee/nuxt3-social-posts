import { defineStore } from "pinia";
import posts from '~/assets/data/social-posts.json';
import type { Post } from '~/types/Post.js'

export const usePostsStore = defineStore('posts', {
  state: () => ({
    posts: [] as Post[],
    loading: false,
  }),
  actions: {
    async loadPosts(){
      //if the posts are already loaded
      if (this.posts.length > 0) {
        return this.posts
      }
          
      this.loading = true;
      try{
        await new Promise((resolve) => setTimeout(resolve, 1000));
        this.posts = posts;
      } catch (error) {
        console.error ('Loading posts failed', error)
      } finally {
        this.loading = false
      }
      return this.posts;
    },
  },
  getters: {}
})