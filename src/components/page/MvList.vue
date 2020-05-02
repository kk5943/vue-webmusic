<template>
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
</template>

<script>
export default {
  name: '',
  data() {
    return {}
  },
  props: {
    mvList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {},
  computed: {},
  watch: {},
  created() {},
  methods: {
    toMV(id) {
      this.$router.push(`/home/mv?id=${id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
div.items {
  display: flex;
  flex-wrap: wrap;
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
      .time {
        position: absolute;
        bottom: 5px;
        right: 5px;
        color: white;
        font-size: 15px;
      }
    }

    div.info-wrap {
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
</style>
