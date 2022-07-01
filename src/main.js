import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css'

const app = createApp(App)
app.config.globalProperties.$filters = {
    thousandSeparator(value) {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    },
    currencyUSD(value) {
        return '$' + this.thousandSeparator(value)
    },
    toHoursAndMinutes(totalMinutes) {
        const minutes = totalMinutes % 60;
        const hours = Math.floor(totalMinutes / 60);
        return `${hours.toString().padStart(2)}h ${minutes.toString().padStart(2)}m`;
    }
}
app.use(store).use(router).mount('#app')
