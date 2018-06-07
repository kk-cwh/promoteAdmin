<template>
  <div class="app-container">

    <el-row>
      <el-col :span="24">
        <div class="form-content">
          <el-form :inline="true" :model="queryForm" class="demo-form-inline" size="small">

            <el-form-item label="支付宝账号">
              <el-input v-model="queryForm.zhifubao" placeholder="支付宝账号" style="width:160px;"></el-input>
            </el-form-item>

            <el-form-item label="结算金额">
              <el-input v-model="queryForm.minMoney" placeholder="金额" style="width:100px;"></el-input>-
              <el-input v-model="queryForm.maxMoney" placeholder="金额" style="width:100px;"></el-input>
            </el-form-item>
            <el-form-item label="状态">
              <el-select v-model="queryForm.status" placeholder="状态" style="width:100px;">
                <el-option label="全部" value="0"></el-option>
                <el-option label="结算成功" value="1"></el-option>
                <el-option label="未结算" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="时间">
              <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="开始日期" v-model="queryForm.date1" style="width: 140px;"></el-date-picker>-
              <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="结束日期" v-model="queryForm.date2" style="width: 140px;"></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="init" :loading="loading">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="info" plain @click="clearData">清空查询</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="24">
        <div class="table-content">
          <el-table border show-summary :summary-method="getSummaries" v-loading="loading" :data="tableData" row-class-name="report-row-item" cell-class-name="report-cell-item" size="mini">
            <el-table-column prop="id" label="结算ID" width="60px">
            </el-table-column>
            <el-table-column prop="created_at" label="创建时间">
            </el-table-column>
            <el-table-column prop="pay_money" label="结算余额">
            </el-table-column>

            <el-table-column prop="pay_account" label="支付宝账号">
            </el-table-column>
            <el-table-column prop="pay_real_name" label="姓名">
            </el-table-column>

            <!-- <el-table-column prop="status" label="状态" width="80px">
            </el-table-column> -->
            <el-table-column prop="created_at" label="结算时间">
            </el-table-column>

            <!-- <el-table-column label="操作" width="120px">
              <template slot-scope="scope">
                <el-button @click="showReport(scope.row)" type="text" size="small">查看</el-button>
                <el-button type="text" size="small">编辑</el-button>
              </template>
            </el-table-column> -->
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
      currentPage: 1,
      per_page: 15,
      total: 0,
      loading: false,
      number: 0,
      queryForm: {},
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
      this.number = parseInt(Math.random() * 1000)
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
      const query = { page: this.currentPage, per_page: this.per_page, ...this.queryForm }
      this.$store.dispatch('SettlementRecords', query).then((res) => {
        this.tableData = []
        if (res.data && res.data.length) {
          res.data.forEach((item, index) => {
            this.tableData.push(
              {
                id: item.id,
                agency_id: item.agency_id,
                agency_name: item.agency_name,
                pay_money: item.pay_money,
                pay_account: item.pay_account,
                status: item.status,
                pay_real_name: item.pay_real_name,
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
    clearData() {
      this.queryForm = {}
      this.tableData = []
      this.total = 0
    },
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return
        }
        if (index === 1 || index === 3 || index === 4) {
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
          sums[index] += ' '
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