<template>
  <div class="app-container">

    <el-row>
      <el-col :span="23">
        <div class="form-content">
          <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">

            <el-form-item label="状态">
              <el-select v-model="formInline.region" placeholder="状态" style="width:100px;">
                <el-option label="全部" value="0"></el-option>
                <el-option label="正常" value="1"></el-option>
                <el-option label="已封" value="2"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="商人ID">
              <el-input v-model="formInline.user" placeholder="商人ID" style="width:100px;"></el-input>
            </el-form-item>

            <el-form-item label="商人QQ">
              <el-input v-model="formInline.user" placeholder="商人QQ" style="width:150px;"></el-input>
            </el-form-item>

            <el-form-item label="商人微信">
              <el-input v-model="formInline.user" placeholder="绑定手机" style="width:150px;"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="queryList" :loading="loading">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="info" plain>清空查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button icon="el-icon-circle-plus" type="danger" @click="centerDialogVisible = true">新增</el-button>
            </el-form-item>

          </el-form>
        </div>
      </el-col>

    </el-row>
    <el-row :gutter="20">

      <el-col :span="23">
        <div class="table-content">
          <el-table border v-loading="loading" :data="tableData" style="width: 100%" size="mini">
            <el-table-column prop="name" label="商人ID" width="140">
            </el-table-column>
            <el-table-column prop="city" label="状态" width="120">
            </el-table-column>
            <el-table-column prop="province" label="商人QQ" width="240">
            </el-table-column>
            <el-table-column prop="date" label="商人微信" width="240">
            </el-table-column>

            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button @click="editRow(scope.row)" type="text" size="small">修改</el-button>
                <el-button type="text" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>

        </div>
      </el-col>
    </el-row>

    <el-dialog :visible.sync="centerDialogVisible" width="480px" center>
      <div slot="title" style="font-size:15px;font-weight:bold;">新增商人</div>
      <el-form ref="form" :model="form" label-width="140px" size="small">
        <el-form-item label="代理ID">
          <el-input v-model="form.name" style="width:180px;"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="form.resource" style="width:140px;">
            <el-radio label="启用"></el-radio>
            <el-radio label="禁用"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="商人QQ">
          <el-input v-model="form.name" style="width:180px;"></el-input>
        </el-form-item>
        <el-form-item label="商人微信">
          <el-input v-model="form.name" style="width:180px;"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button @click="centerDialogVisible = false">关 闭</el-button>
          <el-button type="primary" @click="centerDialogVisible = false">保 存</el-button>
        </el-form-item>

      </el-form>

    </el-dialog>

    <el-dialog :visible.sync="editDialogVisible" width="480px" center>
      <div slot="title" style="font-size:15px;font-weight:bold;">编辑信息</div>
      <el-form ref="form" :model="form" label-width="140px" size="mini">
        <el-form-item label="代理ID">
          <el-input v-model="form.name" style="width:180px;"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="form.resource" style="width:140px;">
            <el-radio label="启用"></el-radio>
            <el-radio label="禁用"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="商人QQ">
          <el-input v-model="form.name" style="width:180px;"></el-input>
        </el-form-item>
        <el-form-item label="商人微信">
          <el-input v-model="form.name" style="width:180px;"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button @click="editDialogVisible = false">关 闭</el-button>
          <el-button type="primary" @click="editDialogVisible = false">保 存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      centerDialogVisible: false,
      editDialogVisible: false,
      formInline: {},
      form: {},
      rule: {},
      ruleForm: {},
      tableData: [

      ]
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
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
    onSubmit(row) {
      console.log(row)
    },
    editRow(row) {
      this.editDialogVisible = true
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