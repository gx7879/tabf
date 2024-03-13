import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useUserStore } from './stores/user'

import App from './App.vue'
import router from './router'

import Countdown from 'vue3-flip-countdown'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Countdown)

const user = useUserStore()

router.beforeEach((to, from, next) => {
  if (to.path === '/login' || to.path.startsWith('/preview')) {
    next()
  } else if (user.token !== undefined) {
    next()
  } else {
    next({
      path: '/login'
    })
  }
})

app.mount('#app')
