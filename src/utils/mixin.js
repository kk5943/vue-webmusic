import request from 'utils/request.js'
export const playMusicMixin = {
    data() {
        return {
            newsong: []
        }
    },
    methods: {
        async toPlayMusic(id, index) {
            const res = await request({
                url: '/song/url',
                params: {
                    id
                }
            })
            let musicInfo = {}
            musicInfo.img = this.newsong[index].picUrl || this.newsong[index].album.picUrl
            musicInfo.songName = this.newsong[index].name
            musicInfo.singer = (this.newsong[index].artists && this.newsong[index].artists[0].name) || this.newsong[index].song.artists[0].name
            musicInfo.url = res.data[0].url
            this.$store.commit('PLAY_MUSIC', musicInfo)

            console.log(this.$parent.$el)

            // 不能用，因为this.$parent组件是main组件
            // this.$parent.url = res.data[0].url
            // if (this.$route.path === '/home/discovery') {
            //     this.$router.push({
            //         path: '/home',
            //         query: {
            //             url: res.data[0].url
            //         }
            //     })
            // }
        }
    }
}