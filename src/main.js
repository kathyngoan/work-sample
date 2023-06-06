import "@/scss/main.scss";

import { createApp } from 'vue'
import App from './App.vue'


//AXIOS API
import axios from 'axios'
import VueAxios from 'vue-axios'


const app = createApp(App)

app.use(VueAxios, axios)

app.mount('#app')

