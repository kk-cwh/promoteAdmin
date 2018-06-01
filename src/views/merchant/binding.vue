<template>
  <div class="app-container">

    <el-row>
      <el-col :span="23">
        <div class="form-content">
          <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">

            <!-- <el-form-item label="状态">
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
            </el-form-item> -->
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
            <el-table-column prop="merchant_id" label="商人ID" width="140">
            </el-table-column>
            <el-table-column prop="statusTxt" label="状态" width="120">
            </el-table-column>
            <el-table-column prop="merchant_qq" label="商人QQ" width="240">
            </el-table-column>
            <el-table-column prop="merchant_wechat" label="商人微信" width="240">
            </el-table-column>

            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button @click="editRow(scope.row)" type="text" size="small">编辑</el-button>
                <!-- <el-button type="text" size="small">删除</el-button> -->
              </template>
            </el-table-column>
          </el-table>

        </div>
      </el-col>
    </el-row>

    <el-dialog :visible.sync="centerDialogVisible" width="480px" center>
      <div slot="title" style="font-size:15px;font-weight:bold;">新增联系方式</div>
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="140px" size="small">
        <el-form-item label="代理ID">
          <el-input v-model="ruleForm.agency_id" style="width:180px;" disabled></el-input>
        </el-form-item>
        <el-form-item label="商人QQ" prop="merchant_qq">
          <el-input v-model="ruleForm.merchant_qq" style="width:180px;"></el-input>
        </el-form-item>
        <el-form-item label="商人微信" prop="merchant_wechat">
          <el-input v-model="ruleForm.merchant_wechat" style="width:180px;"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="ruleForm.status" style="width:140px;">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="">
          <el-button @click="centerDialogVisible = false">关 闭</el-button>
          <el-button type="primary" @click="merchantBinding" :loading="loading">保 存</el-button>
        </el-form-item>

      </el-form>

    </el-dialog>

    <el-dialog :visible.sync="editDialogVisible" width="480px" center>
      <div slot="title" style="font-size:15px;font-weight:bold;">编辑联系方式</div>
      <el-form ref="form" :model="form" label-width="140px" size="mini">
        <el-form-item label="代理ID">
          <el-input v-model="form.agency_id" style="width:180px;" disabled></el-input>
        </el-form-item>
        <el-form-item label="商人QQ">
          <el-input v-model="form.merchant_qq" style="width:180px;"></el-input>
        </el-form-item>
        <el-form-item label="商人微信">
          <el-input v-model="form.merchant_wechat" style="width:180px;"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="form.status" style="width:140px;">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="0">禁用</el-radio>
          </el-radio-group>
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
      ruleForm: {
        status: 1
      },
      rules: {
        merchant_qq: [{ required: true, message: '请输入QQ号', trigger: 'blur' }],
        merchant_wechat: [{ required: true, message: '请输入微信号', trigger: 'blur' }]
      },
      tableData: [

      ]
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.getAgencyInfo()
      this.queryList()
    },
    getAgencyInfo() {
      this.$store.dispatch('GetAgencyInfo').then((res) => {
        if (res && res.agency) {
          var agency = res.agency
          this.ruleForm.agency_id = agency.id
        }
      }).catch(() => {
        this.$message({
          showClose: true,
          center: true,
          message: '系统繁忙,稍后再试！',
          type: 'error'
        })
      })
    },
    queryList() {
      this.loading = true
      this.$store.dispatch('MerchantInfos').then((res) => {
        this.loading = false
        this.tableData = []
        if (res.data && res.data.length) {
          res.data.forEach((item, index) => {
            this.tableData.push(
              {
                id: item.id,
                agency_id: item.agency_id,
                merchant_id: item.merchant_id,
                merchant_qq: item.merchant_qq,
                merchant_wechat: item.merchant_wechat,
                status: item.status,
                statusTxt: item.status === 1 ? '启用' : '禁用',
                created_at: item.created_at
              }
            )
          })
        }
      }).catch(() => {
        this.$message({
          showClose: true,
          center: true,
          message: '系统繁忙,稍后再试！',
          type: 'error'
        })
      })

      // this.$store.dispatch('Login', this.loginForm).then(() => {
      //   this.loading = false
      // }).catch(() => {
      //   this.loading = false
      // })
    },
    merchantBinding() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$store.dispatch('MerchantBinding', this.ruleForm).then(() => {
            this.loading = false
            this.centerDialogVisible = false
            this.$message({
              message: '添加成功！',
              type: 'success'
            })
            this.queryList()
          }).catch(() => {
            this.$message({
              showClose: true,
              center: true,
              message: '系统繁忙,添加失败！',
              type: 'error'
            })
            this.loading = false
          })
        } else {
          this.loading = false
          return false
        }
      })
    },
    onSubmit(row) {
    },
    editRow(row) {
      this.editDialogVisible = true
      this.form = row
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