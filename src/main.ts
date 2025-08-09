import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import i18n from './i18n'
import MainModal from './components/MainModal.vue'
import ConfirmModal from './components/ConfirmModal.vue'
import LanguageSwitcher from './components/LanguageSwitcher.vue'
import MainHeader from './components/MainHeader.vue'
import Loading from './components/AppLoading.vue'
import CatalogTable from './components/CatalogTable.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)
app.component('MainModal', MainModal)
app.component('ConfirmModal', ConfirmModal)
app.component('LanguageSwitcher', LanguageSwitcher)
app.component('MainHeader', MainHeader)
app.component('AppLoading', Loading)
app.component('CatalogTable', CatalogTable)
app.component('FontAwesomeIcon', FontAwesomeIcon)

app.mount('#app')
