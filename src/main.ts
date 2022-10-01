import { createApp } from 'vue'
import App from './App.vue'
import {installStorage} from "@/plugins/piniaStorage";
import {installRouter} from "./router";
import './assets/css/index.css'

const app = createApp(App)

app.use(installStorage)
app.use(installRouter)
app.mount('#app')
