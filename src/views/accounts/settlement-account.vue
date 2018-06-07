<template>
  <div class="app-container">

    <!-- 结算账户 -->
    <el-card class="box-card">
      <div slot="header">
        <span>结算账户</span>

      </div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" size="small" label-width="128px" class="demo-ruleForm">
        <el-form-item label="结算支付宝账户:" prop="account">
          <el-input v-model="ruleForm.account" style="width:180px;"></el-input>
        </el-form-item>
        <el-form-item label="支付宝实名:" prop="real_name">
          <el-input v-model="ruleForm.real_name" style="width:180px;"></el-input>
        </el-form-item>
        <el-form-item label="绑定微信:" prop="name">
          <el-input v-model="ruleForm.name" style="width:180px;"></el-input>
        </el-form-item>

        <el-form-item label="验证码:" prop="code">
          <el-input v-model="ruleForm.code" style="width:180px;" placeholder="请输入验证码"></el-input>
          <el-button type="warning" @click="getIdentifyCode">{{gettingIdentifyCodeBtnContent}}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>

</template>

<script>

export default {
  name: 'promote',
  data() {
    return {
      loading: false,
      canGetIdentifyCode: true,
      gettingIdentifyCodeBtnContent: '获取验证码',
      ruleForm: {
      },

      rules: {
        real_name: [
          { required: true, message: '请输入支付宝实名', trigger: 'change' }
        ],
        account: [
          { required: true, message: '请输入支付宝账户', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    // this.init()
  },
  methods: {
    init() {
      this.current_page = 1
      this.tableData = []
      this.queryStatistic()
    },
    queryStatistic() {
      this.loading = true
      const query = { page: this.current_page }
      this.$store.dispatch('GetAgencyHome', query).then((res) => {
        this.loading = false
      }).catch(() => {

      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    submitForm() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$store.dispatch('SettlementAccount', this.ruleForm).then(() => {
            this.loading = false
            this.centerDialogVisible = false
            this.$message({
              message: '修改成功！',
              type: 'success'
            })
            this.queryList()
          }).catch((err) => {
            if (err && err.response && err.response.data) {
              this.$message({
                showClose: true,
                center: true,
                message: err.response.data.message,
                type: 'error'
              })
            } else {
              this.$message({
                showClose: true,
                center: true,
                message: '系统繁忙！',
                type: 'error'
              })
            }
            this.loading = false
          })
        } else {
          this.loading = false
          return false
        }
      })
    },
    getIdentifyCode() {
      if (this.canGetIdentifyCode) {
        this.canGetIdentifyCode = false
        let timeLast = 59
        const timer = setInterval(() => {
          if (timeLast >= 0) {
            this.gettingIdentifyCodeBtnContent = timeLast + '秒后重试'
            timeLast -= 1
          } else {
            clearInterval(timer)
            this.gettingIdentifyCodeBtnContent = '获取验证码'
            this.canGetIdentifyCode = true
          }
        }, 1000)

        // you can write ajax request here
        this.$store.dispatch('sendPhoneCode').then((res) => {
          this.$message({
            message: '已发送！请注意查收!',
            type: 'success'
          })
        }).catch(() => {
          clearInterval(timer)
          this.canGetIdentifyCode = true
          this.$message({
            showClose: true,
            center: true,
            message: '发送失败！',
            type: 'error'
          })
        })
      }
    }

  }
}
</script>

<style scoped>
.box-card {
  width: 480px;
}
.clearfloat {
  zoom: 1;
}
.clearfloat:after {
  display: block;
  clear: both;
  content: "";
  visibility: hidden;
  height: 0;
}
</style>




