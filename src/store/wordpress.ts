import { defineStore } from "pinia";
import axios from "axios";
import { useAppStore } from "./app";

export const useWordpressStore = defineStore('wordpressStore', {
    state: () => {
        return {
            posts: undefined as any,
        }
    },
    actions: {
        async getPost(langueje = 'en') {


            //filter Languaje 
            if (langueje == 'fr')
                langueje = 'en'

            if (langueje == 'es')
                langueje = ''

            try {

                const appStore = await useAppStore()

                // isLoading.value = true;
                const res = await axios.get(
                    `https://iplastdr.com/${langueje}/wp-json/wp/v2/posts?_embed`
                );
                this.posts = await res.data;

                appStore.saveDataApp('posts', res.data)

                // isLoading.value = await false;
                // await loading.dismiss();
            } catch (error) {
                // isLoading.value = await false;
                // loading.dismiss();
                console.log(error);
            }
        }
    }
})