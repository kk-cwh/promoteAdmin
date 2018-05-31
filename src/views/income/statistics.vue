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
            <el-table-column prop="date" label="日期">
            </el-table-column>
            <el-table-column prop="city" label="代理ID">
            </el-table-column>
            <el-table-column prop="province" label="结算比例" >
            </el-table-column>
            <el-table-column prop="date" label="收入明细">
            </el-table-column>
            <el-table-column prop="date" label="产生税收">
            </el-table-column>
            <el-table-column prop="date" label="下级分成比例">
            </el-table-column>
            <el-table-column prop="date" label="您的收入">
            </el-table-column>
            <el-table-column prop="date" label="下级代理收入">
            </el-table-column>
           </el-table>
        </div>
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
      this.$store.dispatch('IncomeList', this.queryForm).then((res) => {
        this.tableData = []
        if (res.data && res.data.length) {
          res.data.forEach((item, index) => {
            this.tableData.push(
              {
                id: item.id,
                name: item.name,
                agency_id: item.agency_id,
                template_id: item.template_id,
                template_name: item.template_name,
                qrcode_img: item.qrcode_img,
                qrcode_url: item.qrcode_url,
                down_img: item.down_img,
                down_url: item.down_url,
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
    onSubmit(row) {
      console.log(row)
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