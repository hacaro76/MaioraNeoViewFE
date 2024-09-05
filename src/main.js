import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueCryptojs from 'vue-cryptojs'
//const compression = require('compression-webpack-plugin')

createApp(App).use(router).use(store).use(VueCryptojs).mount('#app')
