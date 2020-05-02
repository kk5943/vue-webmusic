<template>
  <div class="newmv-container">
    <!-- 标签栏 -->
    <div class="title">
      <div>地区:</div>
      <div>类型:</div>
      <div>排序：</div>
    </div>
    <el-tabs v-model="area" @tab-click="handleClick">
      <el-tab-pane label="全部" name="全部"></el-tab-pane>
      <el-tab-pane label="内地" name="内地"></el-tab-pane>
      <el-tab-pane label="港台" name="港台"></el-tab-pane>
      <el-tab-pane label="欧美" name="欧美"></el-tab-pane>
      <el-tab-pane label="日本" name="日本"></el-tab-pane>
      <el-tab-pane label="韩国" name="韩国"></el-tab-pane>
    </el-tabs>
    <el-tabs v-model="type" @tab-click="handleClick">
      <el-tab-pane label="全部" name="全部"></el-tab-pane>
      <el-tab-pane label="官方版" name="官方版"></el-tab-pane>
      <el-tab-pane label="原生" name="原生"></el-tab-pane>
      <el-tab-pane label="现场版" name="现场版"></el-tab-pane>
      <el-tab-pane label="网易出品" name="网易出品"></el-tab-pane>
    </el-tabs>
    <el-tabs v-model="order" @tab-click="handleClick">
      <el-tab-pane label="上升最快" name="上升最快"></el-tab-pane>
      <el-tab-pane label="最热" name="最热"></el-tab-pane>
      <el-tab-pane label="最新" name="最新"></el-tab-pane>
    </el-tabs>

    <!-- mv容器 -->
    <div class="mvs-wrap">
      <mv-list :mv-list="mvList"></mv-list>
    </div>
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
import MvList from 'components/page/MvList'

export default {
  name: '',
  data() {
    return {
      area: '全部',
      type: '全部',
      order: '上升最快',
      // 页码
      pagenum: 1,
      // 页容量
      limit: 12,
      // 总条数
      total: 0,
      // 列表数据
      mvList: []
    }
  },
  props: {},
  components: {
    MvList
  },
  computed: {},
  watch: {},
  created() {
    this.getMVList()
  },
  methods: {
    // 获取mv列表数据
    async getMVList() {
      const res = await request({
        url: '/mv/all',
        params: {
          area: this.area,
          type: this.type,
          order: this.order,
          limit: this.limit,
          offset: (this.pagenum - 1) * this.limit
        }
      })
      console.log(res)
      this.mvList = res.data
      if (res.count) {
        this.total = res.count
      }
    },
    handleClick(tab, event) {
      // console.log(tab, event)
      this.pagenum = 1
      this.getMVList()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.pagenum = val
      this.getMVList()
    }
  }
}
</script>

<style lang="scss" scoped>
.newmv-container {
  position: relative;
  padding: 20px 60px 0 80px;
  .title {
    position: absolute;
    left: 88px;
    top: 11px;
    line-height: 4;
  }
  .el-tabs {
    // margin-top: 20px;
    // width: 70%;
    position: relative;
    padding: 10px;
    margin-left: 30px;
    span {
      position: absolute;
      width: 100%;
      left: 0;
      top: 0;
      z-index: 99;
    }
    ::v-deep .el-tabs__header {
      margin-left: 20px;
      display: flex;
      justify-content: flex-start;
      .el-tabs__nav-wrap {
        .el-tabs__nav {
          width: 80%;
        }
        &::after {
          width: 0;
        }
        .el-tabs__active-bar {
          width: 0 !important;
          background-color: rgb(221, 109, 96);
        }
        .el-tabs__item {
          padding: 0 20px;
          // margin: 0px 10px;
          font-size: 14px;
          height: 30px;
          line-height: 30px;
          &:hover {
            color: rgb(221, 109, 96);
          }
          &.is-active {
            color: rgb(221, 109, 96);
            background-color: #fcf6f5;
            border-radius: 20px;
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
