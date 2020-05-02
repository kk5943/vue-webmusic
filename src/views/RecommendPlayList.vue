<template>
  <div class="recommend-playlist-comtainer">
    <!-- 顶部卡片 -->
    <div class="top-card">
      <img :src="topData.cover" alt="" class="bg" />
      <div class="mask"></div>
      <div class="icon-wrap"><img :src="topData.cover" alt="" /></div>
      <div class="content-wrap">
        <div class="tag">精品歌单</div>
        <h4 class="title">{{ topData.name }}</h4>
        <p class="info">{{ topData.desc }}</p>
      </div>
    </div>
    <!-- 标签栏 -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="全部" name="全部"></el-tab-pane>
      <el-tab-pane label="欧美" name="欧美"></el-tab-pane>
      <el-tab-pane label="华语" name="华语"></el-tab-pane>
      <el-tab-pane label="流行" name="流行"></el-tab-pane>
      <el-tab-pane label="说唱" name="说唱"></el-tab-pane>
      <el-tab-pane label="摇滚" name="摇滚"></el-tab-pane>
      <el-tab-pane label="民谣" name="民谣"></el-tab-pane>
      <el-tab-pane label="电子" name="电子"></el-tab-pane>
      <el-tab-pane label="轻音乐" name="轻音乐"></el-tab-pane>
      <el-tab-pane label="影视原声" name="影视原声"></el-tab-pane>
      <el-tab-pane label="ACG" name="ACG">"</el-tab-pane>
      <el-tab-pane label="怀旧" name="怀旧"></el-tab-pane>
      <el-tab-pane label="治愈" name="治愈"></el-tab-pane>
      <el-tab-pane label="旅行" name="旅行"></el-tab-pane>
    </el-tabs>
    <recommend-list :recommend-list="playList" class="recommend-list"></recommend-list>
    <!-- 分页 -->
    <el-pagination
      background
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-size="10"
      layout=" prev, pager, next"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
import request from 'utils/request.js'
import RecommendList from 'components/page/RecommendList'
export default {
  name: '',
  data() {
    return {
      activeName: '全部',
      // 页码
      pagenum: 1,
      // 总条数
      total: 0,
      // 顶部推荐歌单
      topData: {},
      // 歌单数据
      playList: []
    }
  },
  props: {},
  components: {
    RecommendList
  },
  computed: {},
  watch: {},
  created() {
    this.getTopDada()
    this.getlistData()
  },
  methods: {
    // 获取顶部数据
    async getTopDada() {
      const res = await request({
        url: '/top/playlist/highquality',
        params: {
          limit: 10,
          cat: this.activeName
        }
      })
      // console.log(res)
      if (res.playlists.length != 0) {
        this.topData.name = res.playlists[0].name
        this.topData.desc = res.playlists[0].description
        this.topData.cover = res.playlists[0].coverImgUrl
      } else {
        this.topData.name = ''
      }
    },
    async getlistData() {
      const res = await request({
        url: '/top/playlist',
        params: {
          limit: 10,
          offset: (this.pagenum - 1) * 10,
          cat: this.activeName
        }
      })
      console.log(res)
      this.playList = res.playlists
      this.total = res.total
    },
    handleClick(tab, event) {
      console.log(tab, event)
      this.pagenum = 1
      this.getTopDada()
      this.getlistData()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.pagenum = val
      this.getTopDada()
      this.getlistData()
    }
  }
}
</script>

<style lang="scss" scoped>
div.recommend-playlist-comtainer {
  // padding: 10px;
  div.top-card {
    padding: 20px;
    display: flex;
    position: relative;
    overflow: hidden;
    border-radius: 5px;
    img.bg {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 100%;
      filter: blur(20px);
    }

    div.mask {
      position: absolute;
      width: 100%;
      left: 0;
      top: 0;
      bottom: 0;
      width: 100%;
      background-color: rgba(0, 0, 0, 0.5);
    }

    div.icon-wrap {
      z-index: 1;
      margin-right: 20px;

      img {
        border-radius: 5px;

        width: 160px;
        height: 160px;
      }
    }

    div.content-wrap {
      z-index: 1;
      div.tag {
        width: 100px;
        // height: 30px;
        border: 1px solid #dfac67;
        border-radius: 5px;
        color: #dfac67;
        font-size: 16px;
        text-align: center;
        line-height: 30px;
        cursor: pointer;
      }

      h4.title {
        margin-top: 10px;
        color: white;
      }

      p.info {
        margin-top: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 5;
        color: #888482;
        font-size: 14px;
        line-height: 1.5;
      }
    }
  }

  .el-tabs {
    margin-top: 20px;
    // width: 70%;
    padding: 10px;
    ::v-deep .el-tabs__header {
      margin-left: 35%;
      .el-tabs__nav-wrap {
        .el-tabs__nav {
          width: 80%;
        }
        &::after {
          width: 0;
        }
        .el-tabs__active-bar {
          width: 0;
          background-color: rgb(221, 109, 96);
        }
        .el-tabs__item {
          padding: 0 10px;
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
  .recommend-list {
    margin-top: -10px;
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
