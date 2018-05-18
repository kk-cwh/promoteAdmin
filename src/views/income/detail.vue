<template>
  <div class="app-container">
    <el-row>
      <el-col :span="23">
        <div class="form-content">
          <el-form :inline="true" :model="formInline" class="demo-form-inline" size="medium">
            <el-form-item label="代理ID">
              <el-input v-model="formInline.user" placeholder="代理ID" style="width:150px;"></el-input>
            </el-form-item>
            <el-form-item label="玩家ID">
              <el-input v-model="formInline.user" placeholder="玩家ID" style="width:150px;"></el-input>
            </el-form-item>

            <el-form-item label="游戏">
              <el-select v-model="formInline.region" placeholder="游戏" style="width:100px;">
                <el-option label="全部" value="0"></el-option>
                <el-option label="斗地主" value="1"></el-option>
                <el-option label="炸金花" value="2"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
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
            <el-table-column prop="date" label="时间">
            </el-table-column>
            <el-table-column prop="city" label="收入渠道">
            </el-table-column>
            <el-table-column prop="province" label="游戏">
            </el-table-column>
            <el-table-column prop="date" label="玩家ID">
            </el-table-column>
            <el-table-column prop="date" label="产生税收">
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
    </el-row>

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
  methods: {
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