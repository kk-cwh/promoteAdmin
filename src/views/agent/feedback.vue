<template>
    <div class="app-container">
        <el-row>
            <el-col :span="23">
                <div class="form-content">
                    <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">
                        <el-form-item>
                            <el-button icon="el-icon-circle-plus" type="danger" @click="centerDialogVisible = true">新增</el-button>
                        </el-form-item>
                        <el-form-item label="留言类别">
                            <el-select v-model="formInline.type" style="width:140px;">
                                <el-option :value="''" label="全部"></el-option>
                                <el-option :value="1" label="建议"></el-option>
                                <el-option :value="2" label="推广"></el-option>
                                <el-option :value="3" label="提现"></el-option>
                                <el-option :value="4" label="其他"></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="留言时间">
                            <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="formInline.start_date" style="width: 140px;"></el-date-picker>-
                            <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="formInline.end_date" style="width: 140px;"></el-date-picker>
                        </el-form-item>

                        <el-form-item>
                            <el-button type="primary" icon="el-icon-search" @click="queryList" :loading="loading">查询</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="info" plain @click="clearData">清空查询</el-button>
                        </el-form-item>

                    </el-form>
                </div>
            </el-col>

        </el-row>
        <el-row :gutter="20">

            <el-col :span="23">
                <div class="table-content">
                    <el-table border v-loading="loading" :data="tableData" style="width: 100%" size="mini">
                        <el-table-column prop="date" label="时间" width="200">
                        </el-table-column>
                        <el-table-column prop="id" label="信息ID" width="120">
                        </el-table-column>
                        <el-table-column prop="type" label="留言类别" width="240">
                        </el-table-column>
                        <el-table-column prop="feedback_text" label="留言内容">
                        </el-table-column>
                    </el-table>

                </div>
            </el-col>
             <el-col :span="24" style="text-align:right;padding-right:30px;">
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40, 50]" :page-size="per_page" layout="   total , prev, pager, next, jumper" :total="total">
        </el-pagination>
      </el-col>
        </el-row>

        <el-dialog :visible.sync="addDialogVisible" width="480px" center>
            <div slot="title" style="font-size:15px;font-weight:bold;">新增反馈</div>
            <el-form ref="form" :model="form"  :rules="rules" label-width="120px" size="small">

                <el-form-item label="类别:">
                    <el-select v-model="form.type" style="width:80px;">
                        <el-option :value="1" label="建议"></el-option>
                        <el-option :value="2" label="推广"></el-option>
                        <el-option :value="3" label="提现"></el-option>
                        <el-option :value="4" label="其他"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="留言内容:">
                    <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 4}" v-model="form.text" style="width:280px;"></el-input>
                </el-form-item>

                <el-form-item label="">
                    <el-button @click="addDialogVisible = false">关 闭</el-button>
                    <el-button type="primary" @click="addDialogVisible = false">保 存</el-button>
                </el-form-item>

            </el-form>
            <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">关 闭</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">保 存</el-button>
      </span> -->
        </el-dialog>

        <el-dialog :visible.sync="editDialogVisible" width="480px" center>
            <div slot="title" style="font-size:15px;font-weight:bold;">编辑信息</div>
            <el-form ref="form" :model="form" label-width="140px" size="mini">
                <el-form-item label="代理ID">
                    <el-input v-model="form.name" style="width:180px;"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-radio-group v-model="form.resource" style="width:140px;">
                        <el-radio label="启用"></el-radio>
                        <el-radio label="禁用"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="商人QQ">
                    <el-input v-model="form.name" style="width:180px;"></el-input>
                </el-form-item>
                <el-form-item label="商人微信">
                    <el-input v-model="form.name" style="width:180px;"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-button @click="editDialogVisible = false">关 闭</el-button>
                    <el-button type="primary" @click="editDialogVisible = false">保 存</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      currentPage: 1,
      per_page: 15,
      total: 0,
      addDialogVisible: false,
      editDialogVisible: false,
      formInline: { type: '' },
      form: { type: 1 },
      tableData: [

      ],
      ruleForm: {
        agency_name: '',
        phone: '',
        password: '',
        rate: ''
      },
      rules: {
        agency_name: [
          { required: true, message: '请输入代理名称', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入代理账号', trigger: 'change' }
        ]
      }
    }
  },
  mounted() {
    // this.init()
  },
  methods: {
    init() {
      this.per_page = 15
      this.currentPage = 1
      this.queryList()
    },
    handleSizeChange(val) {
      this.per_page = val
      this.currentPage = 1
      this.queryList()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.queryList()
    },
    queryList() {
      this.loading = true
      this.tableData = []
    //   const query = { page: this.currentPage, per_page: this.per_page, ...this.queryForm }
    //   this.$store.dispatch('FeedbackList', query).then((res) => {
    //     this.tableData = []
    //     if (res.data && res.data.length) {
    //       res.data.forEach((item, index) => {
    //         this.tableData.push(
    //           {
    //             id: item.id,
    //             agency_amount: item.agency_amount,
    //             wechat_uid: item.wechat_uid,
    //             agency_name: item.agency_name,
    //             phone: item.phone,
    //             balance: item.balance,
    //             children: item.children,
    //             grade: item.grade,
    //             rate: item.rate,
    //             rateTxt: item.rate + '%',
    //             history_sum: item.history_sum,
    //             game_user_id: item.game_user_id,
    //             players: item.players,
    //             son: item.son,
    //             status: item.status ? '正常' : '已封',
    //             today_new_member: item.today_new_member,
    //             today_sum: item.today_sum,
    //             created_at: item.created_at
    //           }
    //         )
    //       })
    //     }
    //     if (res.meta && res.meta.pagination) {
    //       this.total = res.meta.pagination.total
    //       this.per_page = res.meta.pagination.per_page
    //     }
    //     this.loading = false
    //   }).catch(() => {
    //     this.loading = false
    //   })
    },
    showReport(row) {
    },
    addFeedBack(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addDialogVisible = false
          this.$store.dispatch('AddFeedBack', this.ruleForm).then((res) => {
            this.init()
          }).catch((err) => {
            this.$message({
              showClose: true,
              message: err.response.data.message,
              type: 'error',
              duration: 5 * 1000
            })
          })
        } else {
          return false
        }
      })
    },
    editRow(row) {
      this.editDialogVisible = true
    },
    clearData() {
      this.queryForm = {}
      this.tableData = []
    }
  }
}
</script>

<style scoped>
.promote-container {
  width: 100%;
  margin: 0 auto;
}
.table-content {
  margin: 0 20px 10px 20px;
}

.form-content {
  min-height: 36px;
  line-height: 36px;
  padding: 10px 10px 0 10px;
}

.agent-count {
    padding-top: 10px;
  min-height: 36px;
  line-height: 36px;
  padding-left: 20px;
}
</style>