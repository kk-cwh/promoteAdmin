<template>
  <div class="promote-container">
 <el-row :gutter="20">
  <el-col :span="24">
      <div class="agent-count">
           <span style="display:inline-block;margin-right:20px;">  下级代理数：6666  </span>
           <el-button icon="el-icon-circle-plus" size="medium" type="info">新增</el-button></div>
  </el-col>
</el-row>

<el-row>
  <el-col :span="24">
      <div class="form-content">
 <el-form :inline="true" :model="formInline" class="demo-form-inline" size="medium" >
 
  <el-form-item label="状态">
    <el-select v-model="formInline.region" placeholder="状态" style="width:100px;">
      <el-option label="全部" value="0"></el-option>
      <el-option label="正常" value="1"></el-option>
      <el-option label="已封" value="2"></el-option>
    </el-select>
  </el-form-item>

  <el-form-item label="代理ID">
    <el-input v-model="formInline.user" placeholder="代理ID"  style="width:100px;"></el-input>
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

<el-form-item label="账户余额">
  <el-input v-model="formInline.user" placeholder="绑定手机" style="width:100px;"></el-input>-
  <el-input v-model="formInline.user" placeholder="绑定手机" style="width:100px;"></el-input>
</el-form-item>

 <el-form-item label="注册时间">
      <el-date-picker type="date" placeholder="选择日期" v-model="formInline.date1" style="width: 140px;"></el-date-picker>-
      <el-date-picker type="date" placeholder="选择日期" v-model="formInline.date1" style="width: 140px;"></el-date-picker>
  </el-form-item>

  <el-form-item>
    <el-button type="primary" @click="onSubmit">查询</el-button>
  </el-form-item>

  </el-form>
  </div>
  </el-col>

</el-row>
<el-row :gutter="20">
  
  <el-col :span="24">
      <div class="table-content"> 
  <el-table border :data="tableData"   row-class-name="report-row-item" cell-class-name="report-cell-item" >
    <el-table-column prop="name" label="代理ID" width="80" >
    </el-table-column>
    <el-table-column prop="city" label="账号状态" width="80">
    </el-table-column>
    <el-table-column prop="province" label="等级" width="50">
    </el-table-column>
    <el-table-column prop="date" label="代理账号" width="100">
    </el-table-column>
    <el-table-column prop="date" label="代理名" width="100">
    </el-table-column>
    <el-table-column prop="province" label="提成比例" width="80">
    </el-table-column>
    <el-table-column prop="date" label="绑定手机" width="100">
    </el-table-column>
    <el-table-column prop="date" label="账户余额" width="100">
    </el-table-column>
    <el-table-column prop="date" label="历史收入" width="100">
    </el-table-column>
    <el-table-column prop="date" label="下属玩家" width="100">
    </el-table-column>
    <el-table-column prop="date" label="今日注册" width="100">
    </el-table-column>
    <el-table-column prop="date" label="今日收益" width="100">
    </el-table-column>
    <el-table-column prop="date" label="注册时间" width="100">
    </el-table-column>
     <el-table-column label="操作" >
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
      </template>
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
      formInline: {},
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
  min-height: 36px;
  line-height: 36px;
  padding-left: 20px;
  background: #efefef;
}
</style>



