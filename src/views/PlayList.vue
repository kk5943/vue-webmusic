<template>
  <div class="playlist-container">
    <div class="top-wrap">
      <div class="img-wrap">
        <!-- 封面 -->
        <img :src="coverImgUrl" alt="" />
      </div>
      <div class="info-wrap">
        <!-- 名字 -->
        <p class="title">{{ title }}</p>
        <!-- 头像 -->
        <div class="avator-wrap">
          <img :src="avatarUrl" alt="" />
          <span class="name">{{ nickname }}</span>
          <span class="time">{{ createTime }}</span>
        </div>
        <div class="play-wrap">
          <span class="iconfont icon-circle-play"></span>
          <span class="text">播放全部</span>
        </div>
        <!-- 分类标签 -->
        <div class="tag-wrap">
          <span class="title">标签:</span>
          <ul>
            <li v-for="item in tags" :key="item">{{ item }}</li>
          </ul>
        </div>
        <!-- 简介 -->
        <div class="desc-wrap">
          <span class="title">简介:</span>
          <span>{{ signature }}</span>
        </div>
      </div>
    </div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="歌曲列表" name="1">
        <!-- table内容栏 -->
        <el-table style="width:100%" :data="songList" class="playlit-table" stripe>
          <el-table-column type="index"> </el-table-column>
          <el-table-column prop="" label="" width="180">
            <template slot-scope="scope">
              <div class="img-wrap">
                <img :src="scope.row.al.picUrl" alt="" />
                <span class="iconfont icon-play" @click="toPlayMusic(scope.row.id, scope.$index)"></span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="" label="音乐标题" width="180">
            <template slot-scope="scope">
              <div class="song-wrap">
                <div class="name-wrap">
                  <span>{{ scope.row.name }}</span>
                  <span v-if="scope.row.mv != 0" class="iconfont icon-mv"></span>
                </div>
                <span>{{ scope.row.subTitle }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="ar[0].name" label="歌手"> </el-table-column>
          <el-table-column prop="al.name" label="专辑"> </el-table-column>
          <el-table-column prop="duration" label="时长">
            <template slot-scope="scope">
              <span>{{ scope.row.dt | formatDuration }}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane :label="`评论(${total + hotComment.length})`" name="2">
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
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import request from 'utils/request.js'
import moment from 'moment'
export default {
  name: '',
  data() {
    return {
      activeName: '1',
      // 页码
      pagenum: 1,
      limit: 20,
      // 歌单详情数据
      // 歌曲列表
      songList: [],
      title: '',
      avatarUrl: '',
      coverImgUrl: '',
      signature: '',
      nickname: '',
      tags: [],
      createTime: '',
      // 热门评论
      hotComment: [],
      // 热门评论个数
      hotCount: 0,
      // 最新评论
      comments: [],
      // 最新评论总条数
      total: 0
    }
  },
  props: {},
  components: {},
  computed: {},
  watch: {},
  created() {
    this.getPlayListDetail()
    this.getHotComment()
    this.getNewComment()
  },
  methods: {
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.pagenum = val
      this.getNewComment()
    },
    async toPlayMusic(id, index) {
      const res = await request({
        url: '/song/url',
        params: {
          id
        }
      })
      let musicInfo = {}
      musicInfo.img = this.songList[index].al.picUrl
      musicInfo.songName = this.songList[index].name
      musicInfo.singer = this.songList[index].ar[0].name
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
    },
    async getPlayListDetail() {
      const res = await request({
        url: '/playlist/detail',
        params: {
          id: this.$route.query.id
        }
      })
      // console.log(res)
      this.songList = res.playlist.tracks
      this.title = res.playlist.name
      this.avatarUrl = res.playlist.creator.avatarUrl
      this.coverImgUrl = res.playlist.coverImgUrl
      this.signature = res.playlist.creator.signature
      this.nickname = res.playlist.creator.nickname
      this.tags = res.playlist.tags
      this.createTime = moment(res.playlist.createTime).format('YYYY-MM-DD')
    },
    async getHotComment() {
      const res = await request({
        url: '/comment/hot',
        params: {
          id: this.$route.query.id,
          type: 2
        }
      })
      console.log(res)
      this.hotComment = res.hotComments
    },
    async getNewComment() {
      const res = await request({
        url: '/comment/playlist',
        params: {
          id: this.$route.query.id,
          limit: 5,
          offset: (this.pagenum - 1) * 5
        }
      })
      console.log(res)
      this.comments = res.comments
      this.total = res.total
    }
  }
}
</script>

<style lang="scss" scoped>
.playlist-container {
  margin: auto;
  padding: 20px 80px 0;
  div.top-wrap {
    display: flex;
    div.img-wrap {
      width: 230px;
      height: 230px;
      img {
      }
    }

    div.info-wrap {
      margin-left: 20px;
      p.title {
      }

      div.avator-wrap {
        display: flex;
        align-items: center;
        // border-radius: 50%;
        margin-top: 20px;
        img {
          width: 35px;
          height: 35px;
          border-radius: 50%;
        }

        span.name {
          margin-left: 10px;
        }

        span.time {
          margin-left: 10px;
        }
      }

      div.play-wrap {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 120px;
        height: 35px;
        background: linear-gradient(to right, #e85e4d, #c6483c);
        margin-top: 20px;
        border-radius: 4px;
        span {
          color: white;
        }
        .text {
          margin-left: 8px;
        }
      }

      div.tag-wrap {
        margin-top: 20px;
        display: flex;
        span {
          margin: 0;
        }
        ul {
          display: flex;
          align-items: center;
          list-style: none;
          margin-left: 8px;
          li {
            font-size: 15px;
            &:not(:last-child):after {
              content: '/';
              margin: 0 4px;
            }
          }
        }
      }
      div.desc-wrap {
        margin-top: 10px;
        span.title {
        }

        span {
        }
      }
    }
  }
  .el-tabs {
    // margin-top: 20px;
    // width: 70%;
    padding: 10px;
    ::v-deep .el-tabs__header {
      // margin-left: 35%;
      // display: flex;
      // justify-content: flex-end;
      .el-tabs__nav-wrap {
        .el-tabs__nav {
          // width: 80%;
        }
        .el-tabs__active-bar {
          // width: 0;
          background-color: rgb(221, 109, 96);
        }
        .el-tabs__item {
          padding: 0 20px;
          font-size: 16px;
          &:hover {
            color: rgb(221, 109, 96);
          }
          &.is-active {
            color: rgb(221, 109, 96);
          }
        }
      }
    }
  }
  .playlit-table {
    .img-wrap {
      position: relative;
      overflow: hidden;
      width: 70px;
      height: 70px;
      &:hover {
        .icon-play {
          opacity: 1;
        }
      }
      img {
        border-radius: 5px;
      }
      .icon-play {
        position: absolute;
        width: 25px;
        height: 25px;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.8);
        color: #dd6d60;
        font-size: 12px;
        opacity: 0;
        &::before {
          transform: translateX(2px);
        }
      }
    }
    .song-wrap {
      > span {
        margin-top: 20px;
        display: inline-block;
        color: #bebebe;
      }
      .name-wrap {
        span {
        }
        span.icon-mv {
          padding-left: 5px;
          color: #dd6d60;
        }
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
</style>
