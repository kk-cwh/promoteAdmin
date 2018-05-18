<template>
  <div class="app-container">
    <el-row>
      <el-col :span="23">
        <div class="form-content">
          <el-form :inline="true" :model="formInline" class="demo-form-inline" size="medium">
            <el-form-item label="代理ID">
              <el-input v-model="formInline.user" placeholder="代理ID" style="width:150px;"></el-input>
            </el-form-item>

            <el-form-item label="时间选择">
              <el-date-picker type="date" placeholder="选择日期" v-model="formInline.date1" style="width: 140px;"></el-date-picker>-
              <el-date-picker type="date" placeholder="选择日期" v-model="formInline.date1" style="width: 140px;"></el-date-picker>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="showReport">查询</el-button>
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
          <el-table border :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="日期">
            </el-table-column>
            <el-table-column prop="city" label="代理ID">
            </el-table-column>
            <el-table-column prop="province" label="代理级别">
            </el-table-column>
            <el-table-column prop="date" label="统计项目">
            </el-table-column>
            <el-table-column prop="date" label="注册人数">
            </el-table-column>
            <el-table-column prop="date" label="绑定手机">
            </el-table-column>
            <el-table-column prop="date" label="新增注册">
            </el-table-column>
            <el-table-column prop="date" label="充值金额">
            </el-table-column>
            <el-table-column prop="date" label="充值人数">
            </el-table-column>
            <el-table-column prop="date" label="新增充值">
            </el-table-column>

            <el-table-column prop="date" label="提现金额">
            </el-table-column>
            <el-table-column prop="date" label="提现人数">
            </el-table-column>

            <el-table-column prop="date" label="产生税收">
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
export default {
  name: 'dashboard',
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
  methods: {
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