import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Vuelidate from "vuelidate";

Vue.config.productionTip = false

new Vue({
    router,
    vuetify,
    store,
    render: h => h(App)
}).$mount('#app')

Vue.use(Vuelidate)

if (localStorage.getItem('tasks') === null) {
    localStorage.setItem('tasks', "[]")
}
