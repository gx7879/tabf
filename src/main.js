import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import Countdown from 'vue3-flip-countdown'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Countdown)

app.mount('#app')
