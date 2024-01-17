import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'

import { createI18n } from 'vue-i18n';
import store from './store';

import en from './locales/en.json';
import ptBr from './locales/pt_br.json';

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en', 
  messages: {
    en,
    pt_br: ptBr
  }
});

const app = createApp(App);

app.use(router);
app.use(i18n);
app.use(store);

app.mount('#app')
