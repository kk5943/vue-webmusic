import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'

Vue.config.productionTip = false
import moment from 'moment'
// 全局过滤器
Vue.filter('formatDuration', dt => {
    // 分
    let minute = moment.duration(dt).minutes()
        // 秒
    let second = moment.duration(dt).seconds()

    return minute + ':' + second
})
Vue.filter('formatTime', time => {
    return moment(time).format('YYYY-MM-DD')
})
Vue.filter('formatCount', count => {
    if (count / 10000 > 10) {
        return parseInt(count / 10000) + '万'
    } else {
        return count
    }
})
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')