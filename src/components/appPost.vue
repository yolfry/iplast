<template>
  <div v-if="posts">
    <ion-card v-for="post in posts" :key="post.id">
      <img :src="post._embedded['wp:featuredmedia'][0].source_url" />

      <ion-card-header>
        <ion-card-subtitle>{{ post.date }}</ion-card-subtitle>
        <ion-card-title>{{ post.title.rendered }}</ion-card-title>
      </ion-card-header>

      <ion-card-content v-html="post.excerpt.rendered"> </ion-card-content>
    </ion-card>
  </div>
</template>

<!--/wp-json/wp/v2/posts-->

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  loadingController,
} from "@ionic/vue";
import axios from "axios";

//Props
const posts = ref();
// let images = ref();

//Function

// function getImg(id: number) {
//   const res = axios.get(
//     `https://manuelbelen.com/dev/wp-json/wp/v2/media/${id}`
//   );

//   res.then((res) => {
//     imgRes.value = res.data.guid.rendered;
//   });

//   return imgRes.value;
// }

onMounted(async () => {
  const loading = await loadingController.create({
    cssClass: "my-custom-class",
    message: "Please wait...",
    // duration: this.timeout,
  });

  await loading.present();

  try {
    const res = await axios.get(
      "https://manuelbelen.com/dev/wp-json/wp/v2/posts?_embed"
    );
    console.log(res.status);
    posts.value = await res.data;

    await loading.dismiss();
  } catch (error) {
    loading.dismiss();
  }
});
</script>
