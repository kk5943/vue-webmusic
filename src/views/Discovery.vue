<template>
  <div class="discovery-container">
    <!-- 轮播图 -->
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="item in bannerList" :key="item.imageUrl">
        <img :src="item.imageUrl" alt="" />
      </el-carousel-item>
    </el-carousel>
    <!-- 推荐歌单 -->
    <div class="recommend-list">
      <h3 class="title">
        推荐歌单
      </h3>
      <div class="items-wrap">
        <div class="item" @click="toPlayList(item.id)" v-for="item in recommendList" :key="item.id">
          <div class="img-wrap">
            <div class="desc-wrap">{{ item.copywriter }}</div>
            <img :src="item.picUrl" alt="" />
            <span class="iconfont icon-play"></span>
          </div>
          <p class="name">{{ item.name }}</p>
        </div>
      </div>
    </div>
    <!-- 最新音乐 -->
    <div class="newSones">
      <h3 class="title">最新音乐</h3>
      <div class="items">
        <div class="item" v-for="(item, index) in newsong" :key="item.id">
          <div class="img-wrap">
            <img :src="item.picUrl" alt="" />
            <span class="iconfont icon-play" @click="toPlayMusic(item.id, index)"></span>
          </div>
          <div class="song-wrap">
            <p class="sone-name">{{ item.name }}</p>
            <p class="singer">{{ item.song.artists[0].name }}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 推荐MV -->
    <div class="recommend-mv">
      <h3 class="title">推荐MV</h3>
      <div class="items">
        <div class="item" v-for="item in mv" :key="item.id" @click="toMV(item.id)">
          <div class="img-wrap">
            <img :src="item.picUrl" alt="" />
            <span class="iconfont icon-play"></span>
            <div class="num-wrap">
              <span class="iconfont icon-play"></span>
              <span class="num">{{ item.playCount }}</span>
            </div>
          </div>
          <div class="info-wrap">
            <p class="name">{{ item.copywriter }}</p>
            <p class="singer">{{ item.artistName }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import request from 'utils/request.js'
import { playMusicMixin } from 'utils/mixin.js'
export default {
  name: '',
  data() {
    return {
      bannerList: [],
      recommendList: [],
      newsong: [],
      mv: [],
      currentIndex: 0
    }
  },
  props: {},
  components: {},
  computed: {},
  watch: {},
  mixins: [playMusicMixin],
  created() {
    this.getBannerList()
    this.getRecommendList()
    this.getNewSongs()
    this.getRecommenMV()
  },
  methods: {
    toMV(id) {
      this.$router.push(`/home/mv?id=${id}`)
    },
    toPlayList(id) {
      this.$router.push(`/home/playlist?id=${id}`)
    },
    // 轮播图数据
    async getBannerList() {
      const res = await request({
        url: '/banner'
      })
      console.log(res)
      this.bannerList = res.banners
    },
    // 推荐歌单
    async getRecommendList() {
      const res = await request({
        url: '/personalized',
        params: {
          // 获取的数据量
          limit: 10
        }
      })
      console.log(res)
      this.recommendList = res.result
    },
    // 最新音乐
    async getNewSongs() {
      const res = await request({
        url: '/personalized/newsong'
      })
      console.log(res)
      this.newsong = res.result
    },
    // 推荐mv
    async getRecommenMV() {
      const res = await request({
        url: '/personalized/mv'
      })
      console.log(res)
      this.mv = res.result
    }
    // 播放音乐
    // async toPlayMusic(id, index) {
    //   const res = await request({
    //     url: '/song/url',
    //     params: {
    //       id
    //     }
    //   })
    //   let musicInfo = {}
    //   musicInfo.img = this.newsong[index].picUrl
    //   musicInfo.songName = this.newsong[index].name
    //   musicInfo.singer = this.newsong[index].song.artists[0].name
    //   this.$store.commit('PLAY_MUSIC', musicInfo)

    //   console.log(this.$parent.$el)

    //   // 不能用，因为this.$parent组件是main组件
    //   // this.$parent.url = res.data[0].url
    //   this.$router.push({
    //     path: '/home',
    //     query: {
    //       url: res.data[0].url
    //     }
    //   })
    // }
  }
}
</script>

<style lang="scss" scoped>
.discovery-container {
  .el-carousel {
    .el-carousel-item {
      img {
        // height: 100%;
        // border-radius: 10px;
      }
    }
  }
  div.recommend-list {
    margin-top: 40px;
    h3.title {
      font-weight: normal;
      padding-left: 8px;
    }

    div.items-wrap {
      display: flex;
      flex-wrap: wrap;
      div.item {
        width: 20%;
        padding: 10px;
        position: relative;
        overflow: hidden;
        &:hover {
          div.desc-wrap {
            top: 0 !important;
            opacity: 1 !important;
            transition: top 0.2s !important;
          }
        }
        div.img-wrap {
          position: relative;
          overflow: hidden;
          &:hover {
            .icon-play {
              // opacity: 1;
              visibility: visible;
            }
          }
          div.desc-wrap {
            position: absolute;
            width: 100%;
            left: 0;
            top: 0;
            padding: 5px;
            font-size: 16px;
            color: white;
            background-color: rgba(0, 0, 0, 0.5);
            display: -webkit-box;
            overflow: hidden;
            -webkit-box-orient: vertical;
            text-overflow: ellipsis;
            -webkit-line-clamp: 2;
            top: -50px;
            opacity: 0;
          }

          img {
            width: 100%;
            // height: 200px;
            border-radius: 5px;
          }

          .icon-play {
            position: absolute;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            right: 10px;
            bottom: 12px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.8);
            color: #dd6d60;
            font-size: 20px;
            // opacity: 0;
            visibility: hidden;
            &::before {
              transform: translateX(2px);
            }
          }
        }

        p.name {
          margin-top: 10px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          font-size: 14px;
        }
      }
    }
  }
  div.newSones {
    margin-top: 40px;
    h3.title {
      font-weight: normal;
      padding-left: 8px;
    }

    div.items {
      // height: 500px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      div.item {
        width: 50%;
        padding: 10px 0 10px 15px;
        display: flex;
        &:hover {
          background-color: #f5f5f5;
        }
        div.img-wrap {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          img {
            width: 80px;
            height: 80px;
          }

          .icon-play {
            position: absolute;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 30px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.8);
            color: #dd6d60;
            font-size: 14px;
            opacity: 0;
            &::before {
              transform: translateX(2px);
            }
          }
          &:hover .icon-play {
            opacity: 1;
          }
        }

        div.song-wrap {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          padding: 10px;
          font-size: 16px;
          p.sone-name {
          }

          p.singer {
            font-size: 14px;
            color: gray;
          }
        }
      }
    }
  }
  div.recommend-mv {
    margin-top: 40px;
    h3.title {
      font-weight: normal;
      padding-left: 8px;
    }

    div.items {
      display: flex;
      justify-content: space-around;
      div.item {
        width: 25%;
        padding: 10px 10px;
        div.img-wrap {
          width: 100%;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            width: 100%;
            border-radius: 5px;
          }

          > span.icon-play {
            position: absolute;
            // top: 50%;
            // left: 50%;
            // transform: translate(-50%, -50%);
            display: flex;
            align-items: center;
            justify-content: center;
            width: 30px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.8);
            color: #dd6d60;
            font-size: 14px;
            opacity: 0;
            &::before {
              transform: translateX(2px);
            }
          }
          &:hover .icon-play {
            opacity: 1;
          }

          div.num-wrap {
            position: absolute;
            color: white;
            top: 0;
            right: 0;
            display: flex;
            align-content: center;
            padding-right: 5px;
            padding-top: 2px;
            font-size: 15px;
            span.icon-play {
              font-size: 14px;
              display: flex;
              align-items: center;
              margin-right: 5px;
            }

            span.num {
            }
          }
        }

        div.info-wrap {
          margin-top: 5px;
          p.name {
            font-size: 15px;
          }

          p.singer {
            margin-top: 5px;
            font-size: 14px;
            color: #c5c5c5;
          }
        }
      }
    }
  }
}
</style>
