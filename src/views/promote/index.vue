<template>
    <div class="app-container">
        <el-collapse-transition>
            <div v-show="!show">
                <!-- 统计信息 -->
                <el-card class="box-card">
                    <div slot="header">
                        <span>统计信息</span>
                        <el-button style="float: right; padding: 3px 0;" type="text" :loading="loading" @click="init">刷新</el-button>
                    </div>
                    <div class="statistics-box">
                        <div class="statistics-item">下属玩家:{{statistic.players}}</div>
                        <div class="statistics-item">历史收益:{{statistic.history_sum}}</div>
                        <div class="statistics-item">昨日注册:{{statistic.yesterday_member}}</div>
                        <div class="statistics-item">昨日收益:{{statistic.yesterday_sum}}</div>
                        <div class="statistics-item">今日注册:{{statistic.today_new_member}}</div>
                        <div class="statistics-item">今日收益:{{statistic.today_sum}}</div>
                        <div class="statistics-item">下级代理:{{statistic.son}}</div>
                        <div class="statistics-item">非直属代理:{{statistic.children-statistic.son}}</div>
                    </div>
                </el-card>
                <br>
                <!-- 公告信息 -->
                <el-row>
                    <el-col :span="16">

                        <div class="public-report clearfloat">
                            <div class="report-title"> 公告信息 </div>
                            <div class="report-publish">
                                <el-button type="text" @click="moreReport">更多公告&nbsp;&nbsp;</el-button>
                                <el-button @click="toPublish" v-show="ablePublish">发布公告</el-button>
                            </div>
                        </div>

                        <el-table :data="tableData" height="400" style="width: 100%" :show-header="false" row-class-name="report-row-item" cell-class-name="report-cell-item">
                            <el-table-column prop="title" label="标题">
                                <template slot-scope="scope">
                                    <a style="margin-left: 10px" href="javascript:void(0);" @click="showReport(scope.row)">{{ scope.row.title }}</a>
                                </template>
                            </el-table-column>

                            <el-table-column prop="created_at" label="日期" width="180">
                            </el-table-column>
                            <el-table-column label="操作" width="60">
                                <template slot-scope="scope">
                                    <span @click="editReport(scope.row)" class="eidt-span" v-show="ablePublish">
                                        <svg-icon icon-class="edit" />
                                    </span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-col>

                </el-row>
            </div>
        </el-collapse-transition>
        <!-- 发布公告编辑 -->
        <el-collapse-transition>
            <el-row v-show="show">
                <el-col :span="16" :offset="4">
                    <el-card class="editor-card">
                        <div slot="header">
                            标题：
                            <el-input v-model="publish.title" style="width:200px;"></el-input>
                        </div>
                        <div class="editor-box">
                            <div ref="toolbar" class="toolbar"></div>
                            <div ref="editor" class="text"></div>
                        </div>
                        <div style="text-align:right;padding:10px;">
                            <el-button size="small" type="primary" @click="addOrEditPublicReport">发布</el-button>
                            <el-button size="small" @click="show=false">返回</el-button>
                        </div>

                    </el-card>

                </el-col>
            </el-row>
        </el-collapse-transition>

        <el-dialog :title="title" :visible.sync="centerDialogVisible" width="720px" center>
            <div v-html="content"></div>
            <span slot="footer" class="dialog-footer"></span>
        </el-dialog>

    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { setKey } from '@/utils/auth'
import E from 'wangeditor'
export default {
  name: 'promote',
  data() {
    return {
      ablePublish: false,
      publishTxt: '',
      statistic: {
      },
      title: '',
      content: '',
      show: false,
      loading: false,
      centerDialogVisible: false,
      current_page: 1,
      total_pages: 1,
      tableData: [
      ],
      publish: {
        title: '',
        content: ''
      },
      editor: ''
    }
  },
  computed: {
    ...mapGetters([
      'isAdmin'
    ])
  },
  mounted() {
    this.getAgencyInfo()
    this.editor = new E(this.$refs.toolbar, this.$refs.editor)
    this.editor.customConfig.onchange = (html) => {
      this.publish.content = html
    }
    this.editor.create()
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
          setKey('next_agency_num', info.son)
          this.total_pages = res.meta.pagination.total_pages
        }
        this.loading = false
      }).catch(() => {

      })
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
      this.centerDialogVisible = true
      this.title = row.title
      this.content = row.content
    },
    editReport(row) {
      this.publish = row
      this.editor.txt.html(row.content)
      this.show = true
    },
    toRoute() {
      this.$router.push({ name: 'promote_publish' })
    },
    toPublish() {
      this.show = true
      this.editor.txt.html('')
      this.publish = {
        title: '',
        content: ''
      }
    },
    addOrEditPublicReport() {
      if (this.publish.id) {
        this.updatePublicReport()
      } else {
        this.addPublicReport()
      }
    },
    addPublicReport() {
      const form = {
        title: this.publish.title,
        content: this.publish.content
      }
      if (form.title === '' && form.title.trim() === '') {
        this.$message({
          showClose: true,
          message: '标题不能为空!',
          type: 'error',
          duration: 3 * 1000
        })
        return
      }
      if (form.content === '' && form.content.trim() === '') {
        this.$message({
          showClose: true,
          message: '公告内容不能为空!',
          type: 'error',
          duration: 3 * 1000
        })
        return
      }
      this.$store.dispatch('AddPublicReport', form).then((res) => {
        this.show = false
        this.$message({
          showClose: true,
          message: '发布成功!',
          type: 'success',
          duration: 3 * 1000
        })
        this.init()
      }).catch((err) => {
        if (err && err.response && err.response.data) {
          this.$message({
            showClose: true,
            message: err.response.data.message,
            type: 'error',
            duration: 5 * 1000
          })
        } else {
          this.$message({
            showClose: true,
            message: '发布失败！',
            type: 'error',
            duration: 5 * 1000
          })
        }
        this.show = false
      })
    },
    updatePublicReport() {
      const form = {
        id: this.publish.id,
        title: this.publish.title,
        content: this.publish.content
      }
      if (form.title === '' && form.title.trim() === '') {
        this.$message({
          showClose: true,
          message: '标题不能为空!',
          type: 'error',
          duration: 3 * 1000
        })
        return
      }
      if (form.content === '' && form.content.trim() === '') {
        this.$message({
          showClose: true,
          message: '公告内容不能为空!',
          type: 'error',
          duration: 3 * 1000
        })
        return
      }
      this.$store.dispatch('UpdatePublicReport', form).then((res) => {
        this.show = false
        this.$message({
          showClose: true,
          message: '更新发布成功!',
          type: 'success',
          duration: 3 * 1000
        })
        this.init()
      }).catch((err) => {
        if (err && err.response && err.response.data) {
          this.$message({
            showClose: true,
            message: err.response.data.message,
            type: 'error',
            duration: 5 * 1000
          })
        } else {
          this.$message({
            showClose: true,
            message: '更新失败！',
            type: 'error',
            duration: 5 * 1000
          })
        }

        this.show = false
      })
    },
    getAgencyInfo() {
      this.$store.dispatch('GetAgencyInfo').then((res) => {
        if (res && res.agency) {
          var agency = res.agency
          var isAdmin = agency.grade === 1
          this.ablePublish = isAdmin
          this.$store.commit('SET_IS_ADMIN', isAdmin)
        }
      }).catch(() => {

      })
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
.editor-box .toolbar {
    padding: 5px;
 border: 1px solid #ccc; 
}
.editor-box .text {
 border: 1px solid #ccc;
 height: 400px;
}
.eidt-span{
  cursor: pointer;
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



