import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
library.add(fas, far, fab)
dom.watch();
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component("font-awesome-icon", FontAwesomeIcon)

app.mount('#app')
