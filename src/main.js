import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import App from './App.vue'
import router from './router/index.js'
import vuetify from './plugins/vuetify'

const pinia = createPinia()

createApp(App).use(pinia).use(router).use(vuetify).mount('#app')

