<template>
  <div class="items-wrap">
    <div class="item" @click="toPlayList(item.id)" v-for="item in recommendList" :key="item.id">
      <div class="img-wrap">
        <div class="num-wrap">
          播放量:
          <span class="num"> {{ item.playCount | formatCount }}</span>
        </div>
        <img :src="item.coverImgUrl" alt="" />
        <span class="iconfont icon-play"></span>
      </div>
      <p class="name">{{ item.description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    recommendList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {}
  },
  components: {},
  computed: {},
  watch: {},
  created() {
    console.log('RecommendList')
  },
  methods: {
    toPlayList(id) {
      this.$router.push(`/home/playlist?id=${id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
div.items-wrap {
  display: flex;
  flex-wrap: wrap;
  div.item {
    width: 20%;
    padding: 10px;
    position: relative;
    overflow: hidden;
    &:hover {
      div.num-wrap {
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
      div.num-wrap {
        position: absolute;
        width: 100%;
        line-height: 1.5;
        left: 0;
        top: 0;
        padding: 5px;
        font-size: 14px;
        color: white;
        background-color: rgba(0, 0, 0, 0.5);
        display: -webkit-box;
        overflow: hidden;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        top: -50px;
        opacity: 0;
        .num {
        }
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
</style>
