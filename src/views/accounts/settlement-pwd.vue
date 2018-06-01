<template>
  <div class="app-container">

 

      <!-- 结算密码 -->
      <el-card class="box-card">
        <div slot="header">
          <span>结算密码</span>

        </div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" size="small" label-width="120px" class="demo-ruleForm">
          <el-form-item label="当前结算密码:" prop="name">
            <el-input type="password" v-model="ruleForm.oldpassword" style="width:180px;"></el-input>
          </el-form-item>
          <el-form-item label="新密码:" prop="password">
            <el-input type="password" v-model="ruleForm.password" style="width:180px;"></el-input>
          </el-form-item>
          <el-form-item label="重复新密码:" prop="password_confirmation">
            <el-input type="password" v-model="ruleForm.password_confirmation" style="width:180px;"></el-input>
          </el-form-item>
          <el-form-item label="绑定微信:" prop="name">
            <el-input  v-model="ruleForm.mobile" style="width:180px;"></el-input>
          </el-form-item>
          <el-form-item label="验证码:" prop="code">
            <el-input v-model="ruleForm.code" style="width:180px;" placeholder="请输入验证码"></el-input>
            <el-button type="warning" @click="getIdentifyCode">{{gettingIdentifyCodeBtnContent}}</el-button>
          </el-form-item>
          <el-form-item>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')" :loading="loading">保存</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>

</template>

<script>

export default {
  name: 'promote',
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.password_confirmation !== '') {
          this.$refs.ruleForm.validateField('password_confirmation')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      canGetIdentifyCode: true,
      gettingIdentifyCodeBtnContent: '获取验证码',
      ruleForm: {
      },
      rules: {
        password: [{ required: true, message: '请输入新密码', trigger: 'blur' }, { validator: validatePass, trigger: 'blur' }],
        password_confirmation: [{ required: true, message: '请再次输入新密码', trigger: 'blur' }, { validator: validatePass2, trigger: 'blur' }],
        code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      }
    }
  },
  mounted() {
    // this.init()
  },
  methods: {
    init() {
    },
    queryStatistic() {
      this.loading = true

      this.$store.dispatch('GetAgencyHome').then((res) => {
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
          this.$store.dispatch('SettlementPwd', this.ruleForm).then(() => {
            this.loading = false
            this.centerDialogVisible = false
            this.$message({
              message: '修改成功！',
              type: 'success'
            })
          }).catch((err) => {
            if (err.response.status === 400) {
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




