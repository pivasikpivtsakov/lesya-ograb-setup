import { createApp } from 'vue'
import VueAxios from 'vue-axios'
import axios from 'axios'

import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import './assets/main.css'


const baseBackendUrl = import.meta.env['VITE_BACKEND_URL']
const axiosInstance = axios.create({baseURL: baseBackendUrl})
axiosInstance.interceptors.request.use(null, error => {
    alert('не могу достучаться до сервера')
    console.error(error)
})

const app = createApp(App)
app.config.unwrapInjectedRef = true
app
    .use(VueAxios, {axios: axiosInstance})
    .mount('#app')
