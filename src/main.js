import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useUserStore } from './stores/user'
import vClickOutside from "click-outside-vue3"
import { createI18n } from 'vue-i18n'
import en from './locale/en.json';
import zh_TW from './locale/zh_TW.json';

import App from './App.vue'
import router from './router'

import Countdown from 'vue3-flip-countdown'

const messages = {
  en,
  zh_TW,
};

const locale = localStorage.getItem('locale') ?? 'zh_TW';
const i18n = createI18n({
  locale,
  messages,
  legacy: false,
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Countdown)
app.use(i18n)
app.use(vClickOutside)

const user = useUserStore()

router.beforeEach((to) => {
  if (to.path === '/login' || to.path.startsWith('/preview')) {
    if (user.token !== undefined) {
      return { path: '/' }
    }
    return true
  } else if (user.token !== undefined) {
    return true
  } else {
    return {
      path: '/login'
    }
    // next({
    //   path: '/login'
    // })
  }
})

app.mount('#app')
