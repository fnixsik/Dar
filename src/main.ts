import { createApp } from 'vue'
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice'
import App from './App.vue';
import router from './router';
import './assets/style/index.css';
import Aura from '@primeuix/themes/aura';

const pinia = createPinia()

const app = createApp(App);
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});
app.use(ToastService)
app.use(router)
app.use(pinia)
app.mount("#app");