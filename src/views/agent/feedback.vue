<template>
  <div class="app-container">
    <el-row>
      <el-col :span="23">
        <div class="form-content">
          <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">
            <el-form-item>
              <el-button icon="el-icon-circle-plus" type="danger" @click="centerDialogVisible = true">新增</el-button>
            </el-form-item>
            <el-form-item label="留言类别">
              <el-select v-model="formInline.region" placeholder="留言类别" style="width:100px;">
                <el-option label="全部" value="0"></el-option>
                <el-option label="正常" value="1"></el-option>
                <el-option label="已封" value="2"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="留言时间">
              <el-date-picker type="date" placeholder="选择日期" v-model="formInline.date1" style="width: 140px;"></el-date-picker>-
              <el-date-picker type="date" placeholder="选择日期" v-model="formInline.date1" style="width: 140px;"></el-date-picker>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="queryList" :loading="loading">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="info" plain>清空查询</el-button>
            </el-form-item>

          </el-form>
        </div>
      </el-col>

    </el-row>
    <el-row :gutter="20">

      <el-col :span="23">
        <div class="table-content">
          <el-table border v-loading="loading" :data="tableData" style="width: 100%" size="mini">
            <el-table-column prop="date" label="时间" width="200">
            </el-table-column>
            <el-table-column prop="city" label="信息ID" width="120">
            </el-table-column>
            <el-table-column prop="province" label="留言类别" width="240">
            </el-table-column>
            <el-table-column prop="date" label="留言内容">
            </el-table-column>
          </el-table>

        </div>
      </el-col>
    </el-row>

    <el-dialog :visible.sync="centerDialogVisible" width="480px" center>
      <div slot="title" style="font-size:15px;font-weight:bold;">新增反馈</div>
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
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">关 闭</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">保 存</el-button>
      </span> -->
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
      tableData: [
        {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
          tag: '家'
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
          tag: '公司'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
          tag: '家'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
          tag: '公司'
        }
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
    showReport(row) {
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