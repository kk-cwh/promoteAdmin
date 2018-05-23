<template>
  <div class="app-container">

    <!-- 统计信息 -->
    <el-card class="box-card">
      <div slot="header" >
        <span>统计信息</span>
        <el-button style="float: right; padding: 3px 0" type="text" :loading="loading" @click="queryStatistic">刷新</el-button>
      </div>
      <div class="statistics-box">
        <div class="statistics-item">下属玩家:{{statistic.a1}}</div>
        <div class="statistics-item">历史收益:{{statistic.a2}}</div>
        <div class="statistics-item">昨日注册:{{statistic.a3}}</div>
        <div class="statistics-item">昨日收益:{{statistic.a4}}</div>
        <div class="statistics-item">今日注册:{{statistic.a5}}</div>
        <div class="statistics-item">今日收益:{{statistic.a6}}</div>
        <div class="statistics-item">下级代理:{{statistic.a7}}</div>
        <div class="statistics-item">非直属代理:{{statistic.a8}}</div>
      </div>
    </el-card>
    <br>
    <!-- 公告信息 -->
<el-row>
<el-col :span="16" >


    <div class="public-report clearfloat">
      <div class="report-title"> 公告信息 </div>
      <div class="report-publish">
        <el-button @click="toRoute">发布公告</el-button>
      </div>
    </div>

    <el-table :data="tableData" style="width: 100%" :show-header="false" row-class-name="report-row-item" cell-class-name="report-cell-item">
      <el-table-column prop="name" label="标题">
        <template slot-scope="scope">
          <a style="margin-left: 10px" href="javascript:void" @click="showReport(scope.row)">{{ scope.row.name }}</a>
        </template>
      </el-table-column>

      <el-table-column prop="date" label="日期" width="180">
      </el-table-column>
    </el-table>
</el-col>
</el-row>
  </div>
</template>

<script>

export default {
  name: 'promote',
  data() {
    return {
      statistic: {
      },
      editorContent: '',
      show: false,
      loading: false,
      centerDialogVisible: false,
      tableData: [

      ]
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.queryStatistic()
      this.queryReport()
    },
    queryStatistic() {
      this.loading = true
      this.$store.dispatch('GetUserInfo').then((res) => {
        if (res) {
          setTimeout(() => {
            this.statistic = {
              a1: parseInt(Math.random() * 10000).toLocaleString(),
              a2: parseInt(Math.random() * 10000).toLocaleString(),
              a3: parseInt(Math.random() * 10000).toLocaleString(),
              a4: parseInt(Math.random() * 10000).toLocaleString(),
              a5: parseInt(Math.random() * 10000).toLocaleString(),
              a6: parseInt(Math.random() * 10000).toLocaleString(),
              a7: parseInt(Math.random() * 10000).toLocaleString(),
              a8: parseInt(Math.random() * 10000).toLocaleString()
            }
            this.loading = false
          }, 1000)
        }
      }).catch(() => {

      })
    },
    queryReport() {
      this.$store.dispatch('GetUserInfo').then((res) => {
        if (res) {
          this.tableData = [{
            name: 'this is title',
            date: '2018-05-22'
          }, {
            name: 'this is title',
            date: '2018-05-22'
          }, {
            name: 'this is title',
            date: '2018-05-22'
          }]
        }
      }).catch(() => {

      })
    },
    showReport(row) {
      console.log(row)
    },
    toRoute() {
      this.$router.push({ name: 'promote_publish' })
    }
  }
}
</script>

<style scoped>

.box-card {
  width: 480px;
}
.statistics-box {
  display: flex;
  flex-wrap: wrap;
}
.statistics-item {
  flex: 1 0 200px;
  padding: 10px 5px;
  font-size: 14px;
}

.public-report {
  background: #d7d7d7;
  padding: 2px;
}
.clearfloat {
  zoom: 1;
}
.clearfloat:after {
  display: block;
  clear: both;
  content: "";
  visibility: hidden;
  height: 0;
}
.report-title{
  float: left;
  line-height: 40px;
  padding-left: 10px;
}
.report-publish{
  float: right;
}
</style>
<style >
.el-table .report-row-item{
 border-left: 2px solid #ffffff;
}
.el-table .report-cell-item{
  font-size:14px;
  color:#868686;
  /* background: #f2f2f2;
  border-bottom: 2px solid #ffffff; */
}
</style>



