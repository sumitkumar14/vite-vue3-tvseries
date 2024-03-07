import { createApp } from 'vue'
import './style.css'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import App from './App.vue'
import router from './router/index.js'
import vuetify from './plugins/vuetify'


createApp(App).use(router).use(vuetify).mount('#app')

