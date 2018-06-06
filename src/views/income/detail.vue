<template>
  <div class="app-container">
    <el-row>
      <el-col :span="23">
        <div class="form-content">
          <el-form :inline="true" :model="queryForm" class="demo-form-inline" size="small">
            <el-form-item label="代理ID">
              <el-input v-model="queryForm.user" placeholder="代理ID" style="width:150px;"></el-input>
            </el-form-item>
            <el-form-item label="玩家ID">
              <el-input v-model="queryForm.user" placeholder="玩家ID" style="width:150px;"></el-input>
            </el-form-item>

            <el-form-item label="游戏">
              <el-select v-model="queryForm.region" placeholder="游戏" style="width:100px;">
                <el-option label="全部" value="0"></el-option>
                <el-option label="斗地主" value="1"></el-option>
                <el-option label="炸金花" value="2"></el-option>
              </el-select>
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
            <el-table-column prop="created_at" label="时间">
            </el-table-column>
            <el-table-column prop="room_name" label="游戏房间">
            </el-table-column>
            <el-table-column prop="id" label="玩家ID">
            </el-table-column>
            <el-table-column prop="tax" label="产生税收">
            </el-table-column>
            <el-table-column prop="date" label="提成比例">
            </el-table-column>
            <el-table-column prop="date" label="下级分成比例">
            </el-table-column>
            <el-table-column prop="date" label="我的收入">
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
      this.$store.dispatch('IncomeDetail', query).then((res) => {
        this.tableData = []
        if (res.data && res.data.length) {
          res.data.forEach((item, index) => {
            this.tableData.push(
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