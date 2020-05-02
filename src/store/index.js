import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        musicInfo: {}
    },
    mutations: {
        PLAY_MUSIC(state, payload) {
            state.musicInfo = payload
        }
    },
    getters: {
        url(state) {
            return state.musicInfo.url
        }
    },
    actions: {},
    modules: {}
})