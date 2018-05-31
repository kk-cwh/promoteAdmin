<template>
  <div class="app-container">

    <el-row>
      <el-col :span="24">
        <div class="form-content">
          <el-form :inline="true" :model="queryForm" class="demo-form-inline" size="small">
         
            <el-form-item label="玩家ID">
              <el-input v-model="queryForm.user_id" placeholder="玩家ID" style="width:100px;"></el-input>
            </el-form-item>
            <el-form-item label="昵称">
              <el-input v-model="queryForm.NickName" placeholder="昵称" style="width:100px;"></el-input>
            </el-form-item>
      
            <el-form-item label="注册时间">
              <el-date-picker type="date" placeholder="开始日期" v-model="queryForm.dateStart" style="width: 140px;"></el-date-picker>-
              <el-date-picker type="date" placeholder="结束日期" v-model="queryForm.dateEnd" style="width: 140px;"></el-date-picker>
            </el-form-item>
            <el-form-item label="最近游戏时间">
              <el-date-picker type="date" placeholder="开始日期" v-model="queryForm.dateStart" style="width: 140px;"></el-date-picker>-
              <el-date-picker type="date" placeholder="结束日期" v-model="queryForm.dateEnd" style="width: 140px;"></el-date-picker>
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
          <el-table border v-loading="loading" :data="tableData" row-class-name="report-row-item" cell-class-name="report-cell-item" size="mini">
            <el-table-column prop="UserID" label="玩家ID" >
            </el-table-column>
            <el-table-column prop="RegDate" label="注册时间" >
            </el-table-column>
            <el-table-column prop="lastplaytime" label="最近游戏时间" >
            </el-table-column>
            <el-table-column prop="NickName" label="昵称">
            </el-table-column>
            <el-table-column prop="agency_name" label="携带">
            </el-table-column>
            <el-table-column prop="UnionCard" label="银行" >
            </el-table-column>
            <el-table-column prop="Money" label="总税收">
            </el-table-column>
       
            <el-table-column label="操作" width="120px">
              <template slot-scope="scope">
                <el-button @click="showReport(scope.row)" type="text" size="small">查看</el-button>
              </template>
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
      this.$store.dispatch('AgencyPlayer', query).then((res) => {
        this.tableData = []
        if (res.data && res.data.length) {
          res.data.forEach((item, index) => {
            this.tableData.push(
              {
                UserID: item.UserID,
                UserName: item.UserName,
                MachineCode: item.MachineCode,
                NickName: item.NickName,
                Money: item.Money,
                BankMoney: item.BankMoney,
                UserFaceID: item.UserFaceID,
                Mobile: item.Mobile,
                Email: item.Email,
                LastIP: item.LastIP,
                UserIDCard: item.UserIDCard,
                isMale: item.isMale,
                RealName: item.RealName,
                UnionCard: item.UnionCard,
                PromoId: item.PromoId,
                RegDate: item.RegDate,
                RegisterIP: item.RegisterIP,
                RegisterDevice: item.RegisterDevice,
                LastLoginDevice: item.LastLoginDevice,
                State: item.State,
                TotalWin: item.TotalWin,
                TodayWin: item.TodayWin,
                lastplaytime: item.lastplaytime,
                ParentId: item.ParentId,
                AgentId: item.AgentId,
                TotalTax: item.TotalTax
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
      console.log(row)
    },
    clearData() {
      this.queryForm = {}
      this.tableData = []
      this.total = 0
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



