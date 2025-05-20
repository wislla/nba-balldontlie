import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import 'flowbite'
import 'flowbite/dist/flowbite.min.css'

import router from './routes'

const app = createApp(App)

app.use(router)

app.mount('#app')
