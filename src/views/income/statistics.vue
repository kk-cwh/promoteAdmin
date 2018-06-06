<template>
  <div class="app-container">
    <el-row>
      <el-col :span="23">
        <div class="form-content">
          <el-form :inline="true" :model="queryForm" class="demo-form-inline" size="small">
            <el-form-item label="代理ID">
              <el-input v-model="queryForm.user" placeholder="代理ID" style="width:150px;"></el-input>
            </el-form-item>

            <el-form-item label="时间选择">
              <el-date-picker type="date" placeholder="选择日期" v-model="queryForm.date1" style="width: 140px;"></el-date-picker>-
              <el-date-picker type="date" placeholder="选择日期" v-model="queryForm.date1" style="width: 140px;"></el-date-picker>
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
            <el-table-column prop="created_at" label="日期">
            </el-table-column>
            <el-table-column prop="id" label="代理ID">
            </el-table-column>
            <el-table-column prop="rate" label="结算比例">
            </el-table-column>
            <el-table-column prop="_tax" label="产生税收">
            </el-table-column>
            <el-table-column prop="date" label="下级分成比例">
            </el-table-column>
            <el-table-column prop="_income" label="您的收入">
            </el-table-column>
            <el-table-column prop="date" label="下级代理收入">
            </el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :span="24" style="text-align:right;padding-right:30px;">
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40, 50]" :page-size="per_page" layout="   total , prev, pager, next, jumper" :total="total">
        </el-pagination>
      </el-col>
    </el-row>

  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      total: 0,
      per_page: 15,
      currentPage: 1,
      centerDialogVisible: false,
      editDialogVisible: false,
      queryForm: {},
      form: {},
      tableData: [
      ]
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
      const query = { ...this.queryForm, page: this.currentPage }
      this.$store.dispatch('IncomeList', query).then((res) => {
        this.tableData = []
        if (res.data && res.data.length) {
          res.data.forEach((item, index) => {
            this.tableData.push(
              {
                id: item.id,
                pid: item.pid,
                agency_name: item.agency_name,
                phone: item.phone,
                balance: item.balance,
                grade: item.grade,
                rate: item.rate + '%',
                status: item.status,
                pay_account: item.pay_account,
                _tax: item._tax,
                _income: item._income,
                updated_at: item.updated_at,
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
        this.loading = false
      }).catch(() => {
        this.loading = false
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