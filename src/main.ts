import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// Main CSS
import './assets/main.css'

// Vuetify
import 'vuetify/styles'
import vuetify from '@/plugins/vuetify'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(vuetify)
app.mount('#app')
