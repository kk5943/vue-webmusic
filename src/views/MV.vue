<template>
  <div class="mv-container">
    <div class="mv-wrap">
      <h3 class="title">MV详情</h3>
      <div class="video-wrap">
        <video controls autoplay :src="mvUrl"></video>
      </div>
      <div class="mv-info-wrap">
        <div class="singer-wrap">
          <div class="avator-wrap">
            <img controls :src="artistCover" alt="" />
          </div>
          <span class="name">{{ artistName }}</span>
        </div>
        <div class="mv-info">
          <h3 class="title">{{ mvName }}</h3>
          <span class="data">发布: {{ publishTime }}</span>
          <span class="number">播放: {{ playCount | formatCount }}</span>
          <p class="desc">{{ desc }}</p>
        </div>
      </div>
      <!-- 热门评论 -->
      <div class="comment-wrap" v-if="hotComment.length != 0">
        <p class="title">
          热门评论<span class="number">({{ hotComment.length }})</span>
        </p>
        <div class="items-wrap">
          <div class="item-wrap" v-for="item in hotComment" :key="item.commentId">
            <div class="icon-wrap">
              <img :src="item.user.avatarUrl" alt="" />
            </div>
            <div class="content-wrap">
              <p class="content">
                <span class="name">{{ item.user.nickname }} : </span>
                <span class="comment">{{ item.content }}</span>
              </p>
              <p class="re-content" v-if="item.beReplied.length != 0">
                <span class="name">{{ item.beReplied[0].user.nickname }} : </span>
                <span class="comment">{{ item.beReplied[0].content }}</span>
              </p>
              <p class="data">{{ item.time | formatTime }}</p>
            </div>
          </div>
        </div>
      </div>
      <!-- 最新评论 -->
      <div class="comment-wrap" v-if="comments.length != 0">
        <p class="title">
          最新评论<span class="number">({{ total }})</span>
        </p>
        <div class="items-wrap">
          <div class="item-wrap" v-for="item in comments" :key="item.commentId">
            <div class="icon-wrap">
              <img :src="item.user.avatarUrl" alt="" />
            </div>
            <div class="content-wrap">
              <p class="content">
                <span class="name">{{ item.user.nickname }} : </span>
                <span class="comment">{{ item.content }}</span>
              </p>
              <p class="re-content" v-if="item.beReplied.length != 0">
                <span class="name">{{ item.beReplied[0].user.nickname }} : </span>
                <span class="comment">{{ item.beReplied[0].content }}</span>
              </p>
              <p class="data">{{ item.time | formatTime }}</p>
            </div>
          </div>
        </div>
      </div>
      <!-- 分页 -->
      <el-pagination background @current-change="handleCurrentChange" :current-page="pagenum" layout=" prev, pager, next" :total="total">
      </el-pagination>
    </div>
    <div class="mv-recommend">
      <h3 class="title">相关推荐</h3>
      <div class="items">
        <div class="item" v-for="item in mvList" :key="item.id" @click="toMV(item.id)">
          <div class="img-wrap">
            <img :src="item.cover" alt="" />
            <span class="iconfont icon-play"></span>
            <div class="num-wrap">
              <span class="iconfont icon-play"></span>
              <span class="num">{{ item.playCount | formatCount }}</span>
            </div>
            <span class="time">{{ item.duration | formatDuration }}</span>
          </div>
          <div class="info-wrap">
            <p class="name">{{ item.name }}</p>
            <p class="singer">{{ item.artistName }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import request from 'utils/request.js'
import moment from 'moment'
export default {
  name: '',
  data() {
    return {
      // 每页数据
      limit: 5,
      // 页面
      pagenum: 1,
      // 热门评论
      hotComment: [],
      // 最新评论
      comments: [],
      // 总条数
      total: 0,
      mvList: [],
      // mv地址
      mvUrl: '',
      // mv的名字
      mvName: '',
      // 播放次数
      playCount: '',
      // 发布时间
      publishTime: '',
      // 描述
      desc: '',
      // 歌手名
      artistName: '',
      // 封面
      artistCover: ''
    }
  },
  props: {},
  components: {},
  computed: {},
  watch: {
    $route() {
      this.pagenum = 1
      this.getComments()
      this.getInfo()
    }
  },
  created() {
    this.getComments()
    this.getInfo()
  },
  methods: {
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.pagenum = val
      this.getComments()
    },
    // 获取评论
    async getComments() {
      const res = await request({
        url: '/comment/mv',
        params: {
          id: this.$route.query.id,
          limit: this.limit,
          offset: (this.pagenum - 1) * this.limit
        }
      })
      console.log(res)
      if (res.hotComments.length != 0) {
        this.hotComment = res.hotComments
      }
      this.comments = res.comments
      this.total = res.total
    },
    // 获取信息
    async getInfo() {
      const { id } = this.$route.query
      // 相关MV
      const res1 = await request({
        url: '/simi/mv',
        params: {
          mvid: id
        }
      })
      this.mvList = res1.mvs
      // 获取MV地址
      const res2 = await request({
        url: '/mv/url',
        params: {
          id
        }
      })
      this.mvUrl = res2.data.url
      // MV信息
      const res3 = await request({
        url: '/mv/detail',
        params: {
          mvid: id
        }
      })
      this.mvName = res3.data.name
      this.playCount = res3.data.playCount
      this.publishTime = res3.data.publishTime
      this.desc = res3.data.desc
      // 歌手信息
      const res4 = await request({
        url: '/artists',
        params: {
          id: res3.data.artistId
        }
      })
      // 歌手名
      this.artistName = res4.artist.name
      this.artistCover = res4.artist.picUrl
    },
    // 切换mv
    toMV(id) {
      this.$router.push(`/home/mv?id=${id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
div.mv-container {
  display: flex;
  div.mv-wrap {
    width: 700px;
    margin-right: 20px;
    h3.title {
    }

    div.video-wrap {
      width: 100%;
      height: 390px;
      margin-top: 20px;
      video {
        border-radius: 5px;
        height: 100%;
        width: 100%;
        outline: none;
      }
    }

    div.mv-info-wrap {
      margin-top: 20px;
      margin-bottom: 60px;
      div.singer-wrap {
        display: flex;
        align-items: center;
        div.avator-wrap {
          width: 70px;
          height: 70px;
          margin-right: 20px;
          border-radius: 50%;
          overflow: hidden;
          img {
            height: 100%;
          }
        }

        span.name {
        }
      }

      div.mv-info {
        margin-top: 20px;

        h3.title {
          font-size: 30px;
          margin-bottom: 20px;
        }

        span.data {
          margin-right: 25px;
        }

        span.data,
        span.number {
          color: #bebebe;
          font-size: 14px;
        }

        p.desc {
          margin-top: 20px;
        }
      }
    }
    div.comment-wrap {
      margin-bottom: 70px;
      p.title {
        span.number {
        }
      }

      div.items-wrap {
        div.item-wrap {
          padding-top: 20px;
          display: flex;
          div.icon-wrap {
            margin-right: 15px;
            img {
              width: 50px;
              height: 50px;
              border-radius: 50%;
            }
          }
          &:not(:last-child) {
            .content-wrap {
              border-bottom: 1px solid #f2f2f1;
            }
          }
          div.content-wrap {
            padding-bottom: 20px;
            flex: 1;
            p.content {
              margin-bottom: 10px;
              span.name {
                font-size: 14px;
              }

              span.comment {
                font-size: 14px;
              }
            }

            p.re-content {
              margin-bottom: 10px;
              padding: 10px;
              background-color: #e6e5e6;
              border-radius: 5px;
              span.name {
              }

              span.comment {
              }
            }

            p.data {
              color: #bebebe;
              font-size: 14px;
            }
          }
        }
      }
    }
    .el-pagination {
      margin-top: 30px;
      margin-left: 30%;

      ::v-deep .number.active {
        background-color: rgb(221, 109, 96) !important;
        color: #fff;
      }
    }
  }

  div.mv-recommend {
    flex: 1;
    h3.title {
    }
    div.items {
      display: flex;
      flex-wrap: wrap;
      div.item {
        display: flex;
        width: 100%;
        padding: 10px 10px;
        div.img-wrap {
          width: 180px;
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
          .time {
            position: absolute;
            bottom: 5px;
            right: 5px;
            color: white;
            font-size: 15px;
          }
        }

        div.info-wrap {
          flex: 1;
          margin-left: 20px;
          margin-top: 10px;
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
