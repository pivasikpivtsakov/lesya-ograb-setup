import { createApp } from 'vue'
import VueAxios from 'vue-axios'
import {Axios} from 'axios'

import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import './assets/main.css'


const baseBackendUrl = import.meta.env['VITE_BACKEND_URL']
const axiosInstance = new Axios({baseURL: baseBackendUrl, transformResponse: data => JSON.parse(data)})

const app = createApp(App)
app.config.unwrapInjectedRef = true
app
    .use(VueAxios, {axios: axiosInstance})
    .mount('#app')
