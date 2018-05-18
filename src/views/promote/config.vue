<template>
  <div class="app-container">

    <el-row>
      <el-col :span="24">
        <div class="form-content">
          <el-form :inline="true" :model="formInline" class="demo-form-inline" size="medium">
            <el-form-item label="配置ID">
              <el-input v-model="formInline.user" placeholder="配置ID" style="width:100px;"></el-input>
            </el-form-item>
            <el-form-item label="名称">
              <el-input v-model="formInline.user" placeholder="名称" style="width:150px;"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="showReport">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="info" plain>清空查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button icon="el-icon-circle-plus" size="medium" type="danger" @click="centerDialogVisible = true">新增</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="24">
        <div class="table-content">
          <el-table border :data="tableData" row-class-name="report-row-item" cell-class-name="report-cell-item">
            <el-table-column prop="name" label="推广ID">
            </el-table-column>
            <el-table-column prop="city" label="名称">
            </el-table-column>
            <el-table-column prop="province" label="推广模板">
            </el-table-column>
            <el-table-column prop="date" label="宣传页下载">
            </el-table-column>
            <el-table-column prop="date" label="推广二维码">
            </el-table-column>
            <el-table-column prop="province" label="推广落地页">
            </el-table-column>
            <el-table-column prop="date" label="下载地址二维码">
            </el-table-column>
            <el-table-column prop="date" label="安装包地址">
            </el-table-column>
            <el-table-column prop="date" label="创建时间">
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

    <el-dialog title="添加推广链接" :visible.sync="centerDialogVisible" width="30%" center>
      <el-form ref="form" :model="form" label-width="80px">
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
        <el-button @click="centerDialogVisible = false">关 闭</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">保 存</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: 'dashboard',
  data() {
    return {
      loading: false,
      formInline: {},
      form: {},
      centerDialogVisible: false,
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




