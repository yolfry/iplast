import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router';
// import { markRaw } from 'vue';

import { IonicVue } from '@ionic/vue';
import { createPinia } from 'pinia';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import '@/theme/variables.css';
import '@/theme/globalStyle.css'





const pinia = createPinia()


//Stores App
// import { useAppStore } from './store/app';


//Agregar Router a la aplicación pinia, plugin pinia 
// pinia.use(({ store }) => {
//   store.$router = markRaw(router)
// });



import installI18n from '@/plugins/i18n'



const app = createApp(App)
  .use(IonicVue)
  .use(router)
  .use(pinia)



router.isReady().then(async () => {
  const i18n = await installI18n()
  app.use(i18n)

  app.mount('#app');

});