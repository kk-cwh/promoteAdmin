<template>
  <div class="app-container">

    <el-row :gutter="20">
      <el-col :span="24">
        <div class="agent-count">
          <span style="display:inline-block;margin-right:20px;"> 下级代理数：{{number}} </span>
          <el-button icon="el-icon-circle-plus" size="small" type="danger" @click="centerDialogVisible = true">新增</el-button>
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
              <el-button type="primary" icon="el-icon-search" @click="queryList" :loading="loading">查询</el-button>
            </el-form-item>

          </el-form>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="24">
        <div class="table-content">
          <el-table border v-loading="loading" :data="tableData" row-class-name="report-row-item" cell-class-name="report-cell-item" size="mini">
            <el-table-column prop="name" label="代理ID">
            </el-table-column>
            <el-table-column prop="city" label="账号状态">
            </el-table-column>
            <el-table-column prop="province" label="等级">
            </el-table-column>
            <el-table-column prop="date" label="代理账号">
            </el-table-column>
            <el-table-column prop="date" label="代理名">
            </el-table-column>
            <el-table-column prop="province" label="提成比例">
            </el-table-column>
            <el-table-column prop="date" label="绑定手机">
            </el-table-column>
            <el-table-column prop="date" label="账户余额">
            </el-table-column>
            <el-table-column prop="date" label="历史收入">
            </el-table-column>
            <el-table-column prop="date" label="下属玩家">
            </el-table-column>
            <el-table-column prop="date" label="今日注册">
            </el-table-column>
            <el-table-column prop="date" label="今日收益">
            </el-table-column>
            <el-table-column prop="date" label="注册时间">
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
    </el-row>

    <el-dialog title="添加推广链接" :visible.sync="centerDialogVisible" width="480px" center>
      <el-form ref="form" :model="form" label-width="100px" size="small">
        <el-form-item label="配置名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="推广模板">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="二维码模板">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false" size="small">关 闭</el-button>
        <el-button type="primary" @click="centerDialogVisible = false" size="small">保 存</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      number: 0,
      formInline: {},
      form: {},
      centerDialogVisible: false,
      tableData: [

      ]
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.number = parseInt(Math.random() * 1000)
      this.queryList()
    },
    queryList() {
      this.loading = true
      this.tableData = []
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.tableData.push(
            {
              date: '2016-05-03',
              name: '王小虎',
              province: '上海',
              city: i + 1,
              address: '上海市普陀区金沙江路 1518 弄',
              zip: 200333,
              tag: '家'
            }
          )
        }
        this.loading = false
      }, 1000)

      // this.$store.dispatch('Login', this.loginForm).then(() => {
      //   this.loading = false
      // }).catch(() => {
      //   this.loading = false
      // })
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



