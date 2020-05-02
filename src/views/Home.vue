<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <el-row type="flex" align="bottom">
        <el-col :span="3">
          <div class="icon-wrapper">
            <span class="iconfont icon-home" @click="$router.replace('/')"></span>
            <span class="iconfont icon-sami-select"></span>
            <span class="iconfont icon-full-screen"></span></div
        ></el-col>
        <el-col :span="15">
          <div class="history-wrapper">
            <span class="iconfont icon-arrow-lift" @click="$router.go(-1)"></span>
            <span class="iconfont icon-arrow-right" @click="$router.go(1)"></span></div
        ></el-col>
        <el-col :span="6" class="search-input"
          ><el-input size="small" placeholder="请输入搜索内容" v-model.trim="input4" @change="toResult" clearable>
            <i slot="prefix" class="el-input__icon el-icon-search"></i> </el-input
        ></el-col>
      </el-row>
    </el-header>

    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏区域 -->

      <el-aside width="200px">
        <el-menu :default-active="$route.path" background-color="#ededed" text-color="black" active-text-color="#dd6d60" router>
          <el-menu-item index="/home/discovery">
            <i class="iconfont icon-find-music"></i>
            <span slot="title">发现音乐</span>
          </el-menu-item>
          <el-menu-item index="/home/recommendplaylist">
            <i class="iconfont icon-music-list"></i>
            <span slot="title">推荐歌单</span>
          </el-menu-item>
          <el-menu-item index="/home/newsongs">
            <i class="iconfont icon-music"></i>
            <span slot="title">最新音乐</span>
          </el-menu-item>
          <el-menu-item index="/home/newmv">
            <i class="iconfont icon-mv"></i>
            <span slot="title">最新MV</span>
          </el-menu-item>
        </el-menu>
        <transition name="fade">
          <div :class="['item', { active: isActive }]" v-if="Object.keys($store.state.musicInfo).length">
            <div class="img-wrap">
              <img :src="$store.state.musicInfo.img" alt="" />
            </div>
            <div class="song-wrap">
              <p class="sone-name">{{ $store.state.musicInfo.songName }}</p>
              <p class="singer">{{ $store.state.musicInfo.singer }}</p>
            </div>
          </div>
        </transition>
      </el-aside>

      <!-- 右侧内容区域 -->
      <el-main><router-view></router-view></el-main>
    </el-container>
    <!-- 底部区域 -->
    <el-footer>
      <div class="player">
        <audio autoplay="autoplay" controls loop :src="url"></audio>
      </div>
    </el-footer>
  </el-container>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      input4: '',
      isActive: true
    }
  },
  props: {},
  components: {},
  computed: {
    url() {
      return this.$store.getters.url
    }
  },
  watch: {
    // $route(to, from) {
    //   this.url = this.$route.query.url
    // }
  },
  updated() {
    // console.log(this.$store.getters.url)
  },
  methods: {
    toResult() {
      console.log('toResult')
      if (!this.input4) {
        this.$message.warning('请输入搜索内容')
      }
      this.$router.push(`/home/result?keywords=${this.input4}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.home-container {
  height: 100%;
  .el-container {
    height: calc(100% - 120px);
  }
  .el-header {
    background-color: rgb(198, 47, 47);
    .el-row {
      height: 100%;
      .icon-wrapper {
        font-size: 26px;
        .iconfont {
          margin-right: 10px;
          font-size: 12px;
          width: 18px;
          line-height: 18px;
          display: inline-block;
          text-align: center;
          color: #fff !important;
          &.icon-home {
            background-color: #dd6d60;
            border-radius: 50%;
          }
          &.icon-sami-select {
            margin-left: 2px;
            background-color: #dcc060;
            border-radius: 50%;
          }
          &.icon-full-screen {
            margin-left: 2px;
            background-color: #84bb58;
            border-radius: 50%;
          }
          &::before {
            opacity: 0;
            transition: 0.2s;
          }
          &:hover {
            &::before {
              opacity: 1;
            }
          }
        }
      }
      .history-wrapper {
        span {
          color: #fff;
          font-size: 26px;
        }
      }
      .el-col {
        margin-bottom: 10px;
        .search-input {
        }
      }
    }
  }
  .el-footer {
    background: #f1f3f4;
    .player {
      height: 100%;
      audio {
        width: 100%;
        // height: 100%;

        background: #f1f3f4;

        border-radius: none;
        outline: none;
      }
    }
  }
  .el-aside {
    position: relative;
    .el-menu {
      border-right: 0;
      height: 100%;
      .el-menu-item {
        span {
          margin-left: 5px;
        }
      }
    }

    div.item {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1;
      display: flex;
      padding: 5px;
      border: 1px solid #ccc;
      border-right: none;
      opacity: 0;
      div.img-wrap {
        width: 30%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;

        img {
          width: 100%;
        }
      }

      div.song-wrap {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        padding: 10px;
        font-size: 14px;
        color: rgb(44, 44, 44);

        p.sone-name {
        }

        p.singer {
          font-size: 14px;
          color: rgb(90, 90, 90);
        }
      }
    }
    div.active {
      opacity: 1;
      transition: all 0.3s ease;
    }
  }
}
</style>
