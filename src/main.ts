import './assets/main.scss'
import 'vue-toastification/dist/index.css'

import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import type { Router } from 'vue-router'
import Toast from 'vue-toastification'

declare module 'pinia' {
  export interface PiniaCustomProperties {
    router: Router
  }
}

const app = createApp(App)
const pinia = createPinia()
pinia.use(({ store }) => {
  store.router = markRaw(router)
})

app.use(pinia)
app.use(router)
app.use(Toast, {
  timeout: 3000,
  maxToasts: 1,
  newestOnTop: true,
  closeOnClick: false,
  hideProgressBar: false,
  icon: false,
  toastClassName: 'toast',
  bodyClassName: 'toast-body',
  closeButtonClassName: 'modal-close is-large'
})

app.mount('#app')
