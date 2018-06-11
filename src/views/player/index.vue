<template>
  <div class="app-container">

    <el-row v-show="show">
      <el-col :span="24">
        <div class="form-content">
          <el-form :inline="true" :model="queryForm" class="demo-form-inline" size="small">

            <el-form-item label="玩家ID">
              <el-input v-model="queryForm.userId" placeholder="玩家ID" style="width:100px;"></el-input>
            </el-form-item>
            <el-form-item label="昵称">
              <el-input v-model="queryForm.nickName" placeholder="昵称" style="width:100px;"></el-input>
            </el-form-item>

            <el-form-item label="注册时间">
              <el-date-picker type="date"  value-format="yyyy-MM-dd" placeholder="开始日期" v-model="queryForm.registerTimeStart" style="width: 140px;"></el-date-picker>-
              <el-date-picker type="date"  value-format="yyyy-MM-dd" placeholder="结束日期" v-model="queryForm.registerTimeEnd" style="width: 140px;"></el-date-picker>
            </el-form-item>
            <el-form-item label="最近游戏时间">
              <el-date-picker type="date"  value-format="yyyy-MM-dd" placeholder="开始日期" v-model="queryForm.playTimeStart" style="width: 140px;"></el-date-picker>-
              <el-date-picker type="date"  value-format="yyyy-MM-dd" placeholder="结束日期" v-model="queryForm.playTimeEnd" style="width: 140px;"></el-date-picker>
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

    <el-row :gutter="20" v-show="show">
      <el-col :span="24">
        <div class="table-content">
          <el-table border v-loading="loading" :data="tableData" row-class-name="report-row-item" cell-class-name="report-cell-item" size="mini">
            <el-table-column prop="UserID" label="玩家ID">
            </el-table-column>
            <el-table-column prop="NickName" label="昵称">
            </el-table-column>
            <el-table-column prop="Money" label="携带余额">
            </el-table-column>
            <el-table-column prop="BankMoney" label="银行余额">
            </el-table-column>
            <el-table-column prop="RegDate" label="注册时间">
            </el-table-column>
            <el-table-column prop="lastplaytime" label="上次游戏时间">
            </el-table-column>
            <el-table-column prop="taxes" label="总税收">
            </el-table-column>
            <el-table-column label="操作" width="220px">
              <template slot-scope="scope">
                <el-button @click="toShowDetail(scope.row)" type="text" size="mini">查看明细</el-button>
                <el-button @click="toTransfer(scope.row)" type="text" size="mini">转 账</el-button>
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

    <el-row :gutter="20" v-show="!show">
      <el-col :span="24">
        <div class="agent-count">
          <span style="display:inline-block;margin-right:20px;"> 玩家明细 </span>
          <el-button  size="small" @click="show=true"> 返 回 </el-button>
        </div>
      </el-col>

      <el-col :span="24">
        <div class="table-content">
          <el-table border v-loading="loading" :data="tableDataDetail" row-class-name="report-row-item" cell-class-name="report-cell-item" size="mini">
            <el-table-column prop="id" label="玩家ID">
            </el-table-column>
            <el-table-column prop="type" label="游戏类型">
            </el-table-column>
            <el-table-column prop="room_name" label="游戏房间">
            </el-table-column>

            <el-table-column prop="begin_time" label="游戏开始时间">
            </el-table-column>
            <el-table-column prop="end_time" label="游戏结束时间">
            </el-table-column>

            <el-table-column prop="tax" label="税收">
            </el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :span="24" style="text-align:right;padding-right:30px;">
        <el-pagination background @size-change="detailHandleSizeChange" @current-change="detailHandleCurrentChange" :current-page="detailCurrentPage" :page-sizes="[10, 20, 30, 40, 50]" :page-size="detail_per_page" layout="   total , prev, pager, next, jumper" :total="detail_total">
        </el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { return2Fix } from '@/utils/validate'
export default {
  data() {
    return {
      show: true,
      currentPage: 1,
      per_page: 15,
      total: 0,
      detailCurrentPage: 1,
      detail_per_page: 15,
      detail_total: 0,
      loading: false,
      number: 0,
      detailId: 0,
      queryForm: {},
      tableData: [
      ],
      tableDataDetail: []
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
    detailHandleSizeChange(val) {
      this.detail_per_page = val
      this.detailCurrentPage = 1
      this.showDetail()
    },
    detailHandleCurrentChange(val) {
      this.detailCurrentPage = val
      this.showDetail()
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
                taxes: return2Fix(item.taxes),
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
    toShowDetail(row) {
      this.detailId = row.UserID
      this.showDetail()
    },
    showDetail() {
      this.show = false
      const query = { id: this.detailId, page: this.detailCurrentPage, per_page: this.detail_per_page }
      this.$store.dispatch('AgencyPlayerDetail', query).then((res) => {
        this.tableDataDetail = []
        if (res.data && res.data.length) {
          res.data.forEach((item, index) => {
            this.tableDataDetail.push(
              {
                id: item.id,
                agency_id: item.agency_id,
                game_id: item.game_id,
                user_id: item.user_id,
                add_gold: item.add_gold,
                cur_gold: item.cur_gold,
                begin_time: item.begin_time,
                end_time: item.end_time,
                last_play_time: item.last_play_time,
                room_name: item.room_name,
                tax: item.tax,
                type: item.type,
                created_at: item.created_at,
                updated_at: item.updated_at

              }
            )
          })
        }
        if (res.meta && res.meta.pagination) {
          this.detail_total = res.meta.pagination.total
          this.detail_per_page = res.meta.pagination.per_page
        }
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    clearData() {
      this.queryForm = {}
      this.tableData = []
      this.total = 0
    },
    toTransfer(row) {
      this.$router.push({ name: 'transfer', params: { player_id: row.UserID }})
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
  margin: 2px  20px;
  background: #efefef;
}
</style>



