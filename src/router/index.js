import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [{
        path: '/home',
        component: () =>
            import ('views/Home.vue'),
        redirect: '/home/discovery',
        children: [{
                path: 'discovery',
                component: () =>
                    import ('views/Discovery')
            },
            {
                path: 'recommendplaylist',
                component: () =>
                    import ('views/RecommendPlayList')
            },
            {
                path: 'playlist',
                component: () =>
                    import ('views/PlayList')
            },
            {
                path: 'newsongs',
                component: () =>
                    import ('views/NewSongs')
            },
            {
                path: 'newmv',
                component: () =>
                    import ('views/NewMV')
            },
            {
                path: 'mv',
                component: () =>
                    import ('views/MV')
            },
            {
                path: 'result',
                component: () =>
                    import ('views/Result')
            }
        ]
    },
    {
        path: '/*',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ('views/Home.vue'),
        redirect: '/home/discovery'
    }
]

const router = new VueRouter({
    routes
})

export default router