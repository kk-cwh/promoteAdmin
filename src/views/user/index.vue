<template>
  <div class="app-container">

    <el-row>
      <el-col :span="24">
        <div class="form-content">
          <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">
            <el-form-item>
              <el-button icon="el-icon-circle-plus"  type="danger" @click="showAddDialog">新增</el-button>
            </el-form-item>

            <el-form-item label="手机号">
              <el-input v-model="formInline.phone"   placeholder="输入手机号" style="width:180px;"></el-input>
            </el-form-item>

            <el-form-item label="状态">
              <el-select v-model="formInline.status" placeholder="状态"  style="width:100px;">
                <el-option label="全部" value="0"></el-option>
                <el-option label="正常" value="1"></el-option>
                <el-option label="已封" value="2"></el-option>
              </el-select>
            </el-form-item>

        
            <el-form-item>
              <el-button type="primary"  icon="el-icon-search" @click="init" :loading="loading">查询</el-button>
            </el-form-item>

          </el-form>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="24">
        <div class="table-content">
          <el-table border v-loading="loading" :data="tableData" size="mini" row-class-name="report-row-item" cell-class-name="report-cell-item">
            <el-table-column prop="id" label="用户ID" width="180">
            </el-table-column>
            <el-table-column prop="name" label="用户名">
            </el-table-column>
            <el-table-column prop="email" label="邮箱">
            </el-table-column>
            <el-table-column prop="phone" label="手机">
            </el-table-column>
            <el-table-column prop="created_at" label="添加时间">
            </el-table-column>

            <el-table-column label="操作">
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
         :page-sizes="[2,10, 20, 30, 40, 50]" 
         :page-size="per_page" 
         layout="   total , prev, pager, next, jumper" 
         :total="total">
          </el-pagination>
          </el-col>
    </el-row>

    <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="420px" custom-class="dialog-me" center>
      <el-form ref="form" :model="form" label-width="60px">
        <el-form-item label="用户名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="form.remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">关 闭</el-button>
        <el-button type="primary" @click="addDialogVisible = false">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// 系统用户管理
export default {
  data() {
    return {
      currentPage: 1,
      per_page: 15,
      total: 0,
      loading: false,
      formInline: {},
      form: {},
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
      const query = { page: this.currentPage, per_page: this.per_page }
      this.$store.dispatch('SysUserList', query).then((res) => {
        console.log('userlist', res)
        this.tableData = []
        if (res.data && res.data.length) {
          res.data.forEach((item, index) => {
            this.tableData.push(
              {
                id: item.id,
                name: item.name,
                email: item.email,
                phone: item.phone,
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
        this.$message({
          showClose: true,
          center: true,
          message: '系统繁忙!',
          type: 'error'
        })
      })
    },
    showAddDialog() {
      this.addDialogVisible = true
    },
    addUser() {

    }

  }
}
</script>
<style>
.dialog-me .el-dialog__footer{
  /* margin-top: -30px; */
}
</style>

<style scoped>

.table-content {
  margin: 0 20px 10px 20px;
}
.dialog-me{
  background: #f0f;
}
.dialog-footer{
  margin-top:30px;
}
.form-content {
  min-height: 36px;
  line-height: 36px;
  padding: 10px 10px 0 10px;
}
</style>



