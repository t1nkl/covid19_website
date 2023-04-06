import { createApp } from 'vue'
import { createPinia } from 'pinia'
import * as Sentry from '@sentry/vue'

import App from './App.vue'
import router from './router'

// Main CSS
import './assets/main.css'

// Vuetify
import 'vuetify/styles'
import vuetify from '@/plugins/vuetify'

const app = createApp(App)

// Sentry
Sentry.init({
  app,
  dsn: 'https://95ab22a389504f539769b1bb9cc2ba9e@o4504968911126528.ingest.sentry.io/4504968921219072',
  integrations: [
    new Sentry.BrowserTracing({
      routingInstrumentation: Sentry.vueRouterInstrumentation(router),
      tracePropagationTargets: ['localhost', 'sars-cov-2-app.firebaseapp.com', /^\//]
    })
  ],
  tracesSampleRate: 1.0,
  release: 'covid19_website@1.0.1'
})

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.mount('#app')
