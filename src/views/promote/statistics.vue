<template>
  <div class="app-container">
    <el-row>
      <el-col :span="23">
        <div class="form-content">
          <el-form :inline="true" :model="queryForm" class="demo-form-inline" size="small">
            <el-form-item label="代理ID">
              <el-input v-model="queryForm.agency_id" placeholder="代理ID" style="width:150px;"></el-input>
            </el-form-item>

            <el-form-item label="时间选择">
              <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="开始日期" v-model="queryForm.start_date" style="width: 140px;"></el-date-picker>-
              <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="结束日期" v-model="queryForm.end_date" style="width: 140px;"></el-date-picker>
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
          <el-table border   :summary-method="getSummaries" show-summary v-loading="loading" :data="tableData" style="width: 100%" size="mini">
           
            <el-table-column prop="id" label="代理ID">
            </el-table-column>
            <el-table-column prop="agency_name" label="代理名称">
            </el-table-column>
            <el-table-column prop="grade" label="代理级别">
            </el-table-column>
            <!-- <el-table-column prop="date" label="统计项目">
            </el-table-column> -->
            <el-table-column prop="_counts" label="注册人数">
            </el-table-column>
            <el-table-column prop="phone" label="绑定手机">
            </el-table-column>
            <el-table-column prop="_new_user_counts" label="新增注册">
            </el-table-column>
            <el-table-column prop="_amounts" label="充值金额">
            </el-table-column>
            <el-table-column prop="_amount_counts" label="充值人数">
            </el-table-column>
            <!-- <el-table-column prop="date" label="新增充值">
            </el-table-column> -->

            <el-table-column prop="_cash" label="提现金额">
            </el-table-column>
            <el-table-column prop="_cash_counts" label="提现人数">
            </el-table-column>

            <el-table-column prop="_tax" label="产生税收">
            </el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :span="24" style="text-align:right;padding-right:30px;">
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[2,10, 20, 30, 40, 50]" :page-size="per_page" layout="   total , prev, pager, next, jumper" :total="total">
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
      this.$store.dispatch('PromotionList', query).then((res) => {
        this.tableData = []
        if (res.data && res.data.length) {
          res.data.forEach((item, index) => {
            this.tableData.push(
              {
                id: item.id,
                agency_amount: item.agency_amount,
                agency_name: item.agency_name,
                grade: item.grade,
                phone: item.phone,
                _amount_counts: item._amount_counts,
                _amounts: item._amounts,
                _cash: item._cash,
                _cash_counts: item._cash_counts,
                _counts: item._counts,
                _new_user_counts: item._new_user_counts,
                _tax: item._tax,
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
    showReport(row) {

    },
    editRow(row) {
      this.editDialogVisible = true
    },
    clearData() {
      this.queryForm = {}
      this.tableData = []
    },
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return
        }
        if (index === 1) {
          sums[index] = '直属代理'
          return
        }

        if (index === 2 || index === 4) {
          sums[index] = ''
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)

          sums[index] += ''
        } else {
          sums[index] = 'N/A'
        }
      })

      return sums
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