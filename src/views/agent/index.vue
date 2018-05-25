<template>
  <div class="app-container">

    <el-row :gutter="20">
      <el-col :span="24">
        <div class="agent-count">
          <span style="display:inline-block;margin-right:20px;"> 下级代理数：{{number}} </span>
          <el-button icon="el-icon-circle-plus" size="small" type="danger" @click="toAdd">新增</el-button>
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <div class="form-content">
          <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">
            <el-form-item label="状态">
              <el-select v-model="formInline.region" placeholder="状态" style="width:100px;">
                <el-option label="全部" value="0"></el-option>
                <el-option label="正常" value="1"></el-option>
                <el-option label="已封" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="代理ID">
              <el-input v-model="formInline.user" placeholder="代理ID" style="width:100px;"></el-input>
            </el-form-item>
            <el-form-item label="代理账号">
              <el-input v-model="formInline.user" placeholder="可开启模糊查询" style="width:150px;"></el-input>
            </el-form-item>
            <el-form-item label="模糊">
              <el-switch v-model="formInline.value2"></el-switch>
            </el-form-item>

            <el-form-item label="绑定手机">
              <el-input v-model="formInline.user" placeholder="绑定手机" style="width:150px;"></el-input>
            </el-form-item>
            <br>
            <el-form-item label="账户余额">
              <el-input v-model="formInline.user" placeholder="绑定手机" style="width:100px;"></el-input>-
              <el-input v-model="formInline.user" placeholder="绑定手机" style="width:100px;"></el-input>
            </el-form-item>
            <el-form-item label="注册时间">
              <el-date-picker type="date" placeholder="开始日期" v-model="formInline.date1" style="width: 140px;"></el-date-picker>-
              <el-date-picker type="date" placeholder="结束日期" v-model="formInline.date1" style="width: 140px;"></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="init" :loading="loading">查询</el-button>
            </el-form-item>

          </el-form>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="24">
        <div class="table-content">
          <el-table border v-loading="loading" :data="tableData" row-class-name="report-row-item" cell-class-name="report-cell-item" size="mini">
            <el-table-column prop="id" label="代理ID" width="60px">
            </el-table-column>
            <el-table-column prop="status" label="账号状态" width="80px">
            </el-table-column>
            <el-table-column prop="grade" label="等级" width="60px" >
            </el-table-column>
            <el-table-column prop="agency_name" label="代理账号">
            </el-table-column>
            <el-table-column prop="agency_name" label="代理名">
            </el-table-column>
            <el-table-column prop="rate" label="提成比例" width="80px">
            </el-table-column>
            <el-table-column prop="phone" label="绑定手机">
            </el-table-column>
            <el-table-column prop="balance" label="账户余额">
            </el-table-column>
            <el-table-column prop="history_sum" label="历史收入">
            </el-table-column>
            <el-table-column prop="players" label="下属玩家" width="80px">
            </el-table-column>
            <el-table-column prop="today_new_member" label="今日注册">
            </el-table-column>
            <el-table-column prop="today_sum" label="今日收益">
            </el-table-column>
            <el-table-column prop="created_at" label="注册时间">
            </el-table-column>
            <el-table-column label="操作" width="120px">
              <template slot-scope="scope">
                <el-button @click="showReport(scope.row)" type="text" size="small">查看</el-button>
                <el-button type="text" size="small">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :span="24" style="text-align:right;padding-right:30px;">
        <el-pagination background @size-change="handleSizeChange"
         @current-change="handleCurrentChange"
          :current-page="currentPage" 
         :page-sizes="[10, 20, 30, 40, 50]" 
         :page-size="per_page" 
         layout="   total , prev, pager, next, jumper" 
         :total="total">
          </el-pagination>
          </el-col>
    </el-row>

<!-- 添加代理 dialog -->
    <el-dialog title="添加代理" :visible.sync="addDialogVisible" width="480px" center>
        <div slot="title" style="font-size:15px;font-weight:bold;">添加代理</div>
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="140px" size="small">
        <el-form-item label="代理名称" prop="agency_name">
          <el-input v-model="ruleForm.agency_name" name="agency_name" style="width:200px"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="ruleForm.phone" name="phone" style="width:200px"></el-input>
        </el-form-item>
        <el-form-item label="代理用户密码" prop="password">
          <el-input v-model="ruleForm.password" name="password" style="width:200px"></el-input>
        </el-form-item>
        <el-form-item label="税率" prop="rate">
          <el-input type="text" v-model="ruleForm.rate" name="rate" style="width:200px"></el-input>
        </el-form-item>
        <el-form-item label="">
         <el-button @click="addDialogVisible = false" size="small">关 闭</el-button>
        <el-button type="primary" @click="addAgency('agency_form')" size="small">保 存</el-button>
        </el-form-item>
      </el-form>
      
  
    </el-dialog>

  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 1,
      per_page: 15,
      total: 0,
      loading: false,
      number: 0,
      formInline: {},
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
          { required: true, message: '请输入手机号', trigger: 'change' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        rate: [
          { required: true, message: '请输入税率', trigger: 'blur' }
        ]
      },
      addDialogVisible: false,
      tableData: [
      ]
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.per_page = 15
      this.currentPage = 1
      this.number = parseInt(Math.random() * 1000)
      this.queryList()
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.per_page = val
      this.currentPage = 1
      this.queryList()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
      this.queryList()
    },
    queryList() {
      this.loading = true
      this.tableData = []
      const query = { page: this.currentPage, per_page: this.per_page }
      this.$store.dispatch('AgencyList', query).then((res) => {
        this.tableData = []
        if (res.data && res.data.length) {
          res.data.forEach((item, index) => {
            this.tableData.push(
              {
                id: item.id,
                agency_amount: item.agency_amount,
                agency_name: item.agency_name,
                phone: item.phone,
                balance: item.balance,
                children: item.children,
                grade: item.grade,
                rate: item.rate + '%',
                history_sum: item.history_sum,
                players: item.players,
                son: item.son,
                status: item.status ? '正常' : '已封',
                today_new_member: item.today_new_member,
                today_sum: item.today_sum,
                created_at: item.created_at
              }
            )
          })
        }
        if (res.meta && res.meta.pagination) {
          this.total = res.meta.pagination.total
          this.per_page = res.meta.pagination.per_page
        }
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    toAdd() {
      this.addDialogVisible = true
      // this.ruleForm = {}
    },
    addAgency() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.addDialogVisible = false
          this.$store.dispatch('AddAgency', this.ruleForm).then((res) => {
            console.log(res)
          }).catch((err) => {
            this.$message({
              showClose: true,
              message: err.response.data.message,
              type: 'error',
              duration: 5 * 1000
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    showReport(row) {
      console.log(row)
    }
  }
}
</script>

<style scoped>

.table-content {
  margin: 0 20px 10px 20px;
}

.form-content {
  min-height: 36px;
  line-height: 36px;
  padding: 10px 10px 0 10px;
}

.agent-count {
  min-height: 36px;
  line-height: 36px;
  padding-left: 20px;
  background: #efefef;
}
</style>



