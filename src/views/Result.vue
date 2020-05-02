<template>
  <div class="result-container">
    <div class="title-wrap">
      <h3>{{ $route.query.keywords }}</h3>
      <span class="sub-title">找到{{ total }}个结果</span>
    </div>
    <!-- 标签栏 -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="歌曲" name="1">
        <!-- table内容栏 -->
        <el-table style="width:100%" :data="songList" class="playlit-table" stripe @row-dblclick="toPlayMusic">
          <el-table-column type="index"> </el-table-column>
          <el-table-column prop="" label="音乐标题" width="180">
            <template slot-scope="scope">
              <div class="song-wrap">
                <div class="name-wrap">
                  <span>{{ scope.row.name }}</span>
                  <span v-if="scope.row.mvid != 0" class="iconfont icon-mv" @click="toMV(scope.row.id)"></span>
                </div>
                <span class="sub-name" v-if="scope.row.alias.length != 0">{{ scope.row.alias[0] }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="artists[0].name" label="歌手"> </el-table-column>
          <el-table-column prop="album.name" label="专辑"> </el-table-column>
          <el-table-column prop="duration" label="时长">
            <template slot-scope="scope">
              <span>{{ scope.row.duration | formatDuration }}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="歌单" name="1000">
        <recommend-list :recommend-list="playList" class="recommend-list"></recommend-list>
      </el-tab-pane>
      <el-tab-pane label="MV" name="1004">
        <mv-list :mv-list="mvList"></mv-list>
      </el-tab-pane>
    </el-tabs>
    <!-- 分页 -->
    <el-pagination
      background
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-size="limit"
      layout=" prev, pager, next"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
import request from 'utils/request.js'
import RecommendList from 'components/page/RecommendList'
import MvList from 'components/page/MvList'
export default {
  name: '',
  data() {
    return {
      activeName: '1',
      // 页容量
      limit: 15,
      type: 1,
      // 页码
      pagenum: 1,
      // 总条数
      total: 0,
      songList: [],
      playList: [],
      mvList: []
    }
  },
  props: {},
  components: {
    RecommendList,
    MvList
  },
  computed: {},
  watch: {
    // activeName() {
    //   console.log(this.activeName)
    //   // this.searchResult()
    // }
    $route(to, from) {
      this.searchResult()
    }
  },
  created() {
    console.log('搜索组件创建开始')
    this.searchResult()
  },
  methods: {
    toMV(id) {
      this.$router.push(`/home/mv?id=${id}`)
    },
    async toPlayMusic(row, column, event) {
      // console.log(row, column, event)
      const res = await request({
        url: '/song/url',
        params: {
          id: row.id
        }
      })
      let musicInfo = {}
      musicInfo.img = row.artists[0].img1v1Url
      musicInfo.songName = row.name
      musicInfo.singer = (row.artists && row.artists[0].name) || row.song.artists[0].name
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
    handleClick(tab, event) {
      // console.log(tab, event)
      this.pagenum = 1
      this.limit = this.activeName == '1004' ? 12 : 15
      this.searchResult()
    },
    searchResult() {
      request({
        url: '/search',
        params: {
          keywords: this.$route.query.keywords,
          limit: this.limit,
          offset: (this.pagenum - 1) * this.limit,
          type: this.activeName
        }
      }).then(res => {
        console.log(res)
        switch (this.activeName) {
          case '1':
            this.songList = res.result.songs
            this.total = res.result.songCount
            break
          case '1000':
            this.playList = res.result.playlists
            this.total = res.result.playlistCount
            break
          case '1004':
            this.mvList = res.result.mvs
            this.total = res.result.mvCount
            break
          default:
            break
        }
      })
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.pagenum = val
      this.searchResult()
    }
  }
}
</script>

<style lang="scss" scoped>
.result-container {
  div.title-wrap {
    display: flex;
    align-items: flex-end;

    h3 {
      margin-right: 10px;
    }

    span.sub-title {
      font-size: 15px;
      color: #bebebe;
    }
  }

  .el-tabs {
    margin-top: 30px;
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
  // margin-top: 10px;

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
