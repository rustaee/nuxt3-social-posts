import { defineStore } from "pinia";
import posts from '~/assets/data/social-posts.json';
import type {Post} from '~/types/Post.js'

export const usePostsStore = defineStore('posts', {
    state: () => ({
        posts: [] as Post[],
        loading: false,
    }),
    actions: {
        loadPosts(){
            this.loading = true;
            try{
                this.posts = posts;
            } catch (error) {
                console.error ('Loading posts failed', error)
            } finally {
                this.loading = false
            }
        },
    },
    getters: {}
})