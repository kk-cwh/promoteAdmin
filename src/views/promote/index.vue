<template>
  <div class="app-container">

    <!-- 统计信息 -->
    <el-card class="box-card">
      <div slot="header">
        <span>统计信息</span>
        <el-button style="float: right; padding: 3px 0" type="text" :loading="loading" @click="init">刷新</el-button>
      </div>
      <div class="statistics-box">
        <div class="statistics-item">下属玩家:{{statistic.players}}</div>
        <div class="statistics-item">历史收益:{{statistic.history_sum}}</div>
        <div class="statistics-item">昨日注册:{{statistic.yesterday_member}}</div>
        <div class="statistics-item">昨日收益:{{statistic.yesterday_sum}}</div>
        <div class="statistics-item">今日注册:{{statistic.today_new_member}}</div>
        <div class="statistics-item">今日收益:{{statistic.today_sum}}</div>
        <div class="statistics-item">下级代理:{{statistic.son}}</div>
        <div class="statistics-item">非直属代理:{{statistic.children}}</div>
      </div>
    </el-card>
    <br>
    <!-- 公告信息 -->
    <el-row>
      <el-col :span="16">

        <div class="public-report clearfloat">
          <div class="report-title"> 公告信息 </div>
          <div class="report-publish">
            <el-button type="text" @click="moreReport">更多公告</el-button>
            <el-button @click="toRoute">发布公告</el-button>
          </div>
        </div>

        <el-table :data="tableData" height="400" style="width: 100%" :show-header="false"  row-class-name="report-row-item" cell-class-name="report-cell-item">
          <el-table-column prop="title" label="标题">
            <template slot-scope="scope">
              <a style="margin-left: 10px" href="javascript:void" @click="showReport(scope.row)">{{ scope.row.title }}</a>
            </template>
          </el-table-column>

          <el-table-column prop="created_at" label="日期" width="180">
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
      current_page: 1,
      total_pages: 1,
      tableData: [
      ]
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.current_page = 1
      this.tableData = []
      this.queryStatistic()
    },
    queryStatistic() {
      this.loading = true
      const query = { page: this.current_page }
      this.$store.dispatch('GetAgencyHome', query).then((res) => {
        if (res.data && res.data.length) {
          res.data.forEach((item, index) => {
            this.tableData.push(
              {
                id: item.id,
                agency_id: item.agency_id,
                content: item.content,
                title: item.title,
                status: item.status,
                updated_at: item.updated_at,
                created_at: item.created_at
              }
            )
          })
        }

        if (res.meta && res.meta.info) {
          const info = res.meta.info
          this.statistic = {
            children: info.children,
            history_sum: '￥' + (info.history_sum / 100),
            players: info.players,
            son: info.son,
            today_new_member: info.today_new_member,
            today_sum: '￥' + (info.today_sum / 100),
            yesterday_member: info.yesterday_member,
            yesterday_sum: '￥' + (info.yesterday_sum / 100)
          }
          this.total_pages = res.meta.pagination.total_pages
        }
        this.loading = false
      }).catch(() => {

      })
    },
    queryReport() {
      // this.$store.dispatch('GetUserInfo').then((res) => {
      //   if (res) {
      //     this.tableData = [{
      //       name: 'this is title',
      //       date: '2018-05-22'
      //     }, {
      //       name: 'this is title',
      //       date: '2018-05-22'
      //     }, {
      //       name: 'this is title',
      //       date: '2018-05-22'
      //     }]
      //   }
      // }).catch(() => {

      // })
    },
    moreReport() {
      this.current_page += 1
      if (this.current_page <= this.total_pages) {
        this.queryStatistic()
      } else {
        this.$notify.info({
          title: '提示',
          message: '没有更多公告了!'
        })
      }
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



