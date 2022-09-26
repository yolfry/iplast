<script lang="ts" setup>
import { onMounted, computed } from "vue";
import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonRow,
  IonCol,
  IonSpinner,
  IonGrid,
} from "@ionic/vue";

// import axios from "axios";
import { useWordpressStore } from '@/store/wordpress';
import { useAppStore } from '@/store/app';
import { useAccountStore } from "@/store/account";
import { useI18n } from "vue-i18n";

const wordpress = useWordpressStore()
const posts = computed(() => {
  return wordpress.posts;
});

function link(link: any, post: any) {
  window.location = link;

  const viewPost: any = {}
  viewPost.ultimoPostView = post

  const accountStore = useAccountStore()
  accountStore.saveDataUser(viewPost)

}

const i18n = useI18n()

onMounted(async () => {
  const wordpress = useWordpressStore()
  const appStore = await useAppStore()

  //Post Local, obtener Post Guardado en Local
  wordpress.posts = await appStore.getDataApp('posts')
  await wordpress.getPost(i18n.locale.value)

});
</script>
  
<style scoped>
.color-sub-title {
  color: var(--ion-color-primary);
}
</style>
  

<template>
  <ion-grid>
    <ion-row class="ion-justify-content-center ion-padding">
      <ion-col v-show="!posts" size="auto">
        <ion-spinner></ion-spinner>
      </ion-col>
    </ion-row>
    <ion-row v-if="posts">
      <ion-col v-for="post in posts" :key="post.id" size="12" size-sm="6">
        <ion-card button mode="ios">
          <div @click="link(post.link, post)"><img :src="post._embedded['wp:featuredmedia'][0].source_url" />

            <ion-card-header>
              <ion-card-subtitle>{{ post.date }}</ion-card-subtitle>
              <ion-card-title>{{ post.title.rendered }}</ion-card-title>
            </ion-card-header>

            <ion-card-content v-html="post.excerpt.rendered"> </ion-card-content>
          </div>
        </ion-card>
      </ion-col>
    </ion-row>

    <!--Item End -->
  </ion-grid>
</template>