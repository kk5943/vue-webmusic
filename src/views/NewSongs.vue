<template>
  <div class="songs-container">
    <!-- 标签栏 -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="全部" name="0"></el-tab-pane>
      <el-tab-pane label="华语" name="7"></el-tab-pane>
      <el-tab-pane label="欧美" name="96"></el-tab-pane>
      <el-tab-pane label="日本" name="8"></el-tab-pane>
      <el-tab-pane label="韩国" name="16"></el-tab-pane>
    </el-tabs>

    <!-- table内容栏 -->
    <el-table style="width:100%" :data="newsong" class="playlit-table" stripe>
      <el-table-column type="index"> </el-table-column>
      <el-table-column prop="" label="" width="180">
        <template slot-scope="scope">
          <div class="img-wrap">
            <img :src="scope.row.album.picUrl" alt="" />
            <span class="iconfont icon-play" @click="toPlayMusic(scope.row.id, scope.$index)"></span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="" label="音乐标题" width="180">
        <template slot-scope="scope">
          <div class="song-wrap">
            <div class="name-wrap">
              <span>{{ scope.row.name }}</span>
              <span v-if="scope.row.mvid != 0" class="iconfont icon-mv"></span>
            </div>
            <span>{{ scope.row.subTitle }}</span>
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
  </div>
</template>

<script>
import request from 'utils/request.js'
import { playMusicMixin } from 'utils/mixin.js'
export default {
  name: '',
  data() {
    return {
      activeName: '0',
      newsong: []
    }
  },
  props: {},
  components: {},
  computed: {},
  watch: {},
  mixins: [playMusicMixin],
  created() {
    this.getSongsList()
  },
  methods: {
    // 获取歌曲列表数据
    async getSongsList() {
      const res = await request({
        url: '/top/song',
        params: {
          type: this.activeName
        }
      })
      console.log(res)
      this.newsong = res.data
    },

    handleClick(tab, event) {
      console.log(tab, event)
      this.getSongsList()
    }
  }
}
</script>

<style lang="scss" scoped>
div.songs-container {
  .el-tabs {
    // margin-top: 20px;
    // width: 70%;
    padding: 10px;
    ::v-deep .el-tabs__header {
      // margin-left: 35%;
      display: flex;
      justify-content: flex-end;
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
          padding: 0 20px;
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
}
</style>
