<template>
  <div class="app-container">

    <!-- 提交结算 -->
    <el-card class="box-card">
      <div slot="header">
        <span>提交结算</span>

      </div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" size="small" label-width="120px" class="demo-ruleForm">
        <el-form-item label="可结算金额:">
          <el-tag type="info">{{ruleForm.total}}</el-tag>
        </el-form-item>
        <el-form-item label="结算金额:" prop="cash">
          <el-input type="text" v-model="ruleForm.cash" style="width:180px;"></el-input>
        </el-form-item>

        <el-form-item label="收款支付宝:" >
          <!-- <el-input type="text" v-model="ruleForm.zhifubao"></el-input> -->
          <el-tag type="info">{{ruleForm.pay_account}}</el-tag>
        </el-form-item>
        <el-form-item label="支付宝实名:" >
          <!-- <el-input type="text" v-model="ruleForm.name"></el-input> -->
          <el-tag type="info">{{ruleForm.pay_real_name}}</el-tag>
        </el-form-item>
        <!-- <el-form-item label="绑定微信:">
          <el-tag type="info">{{ruleForm.weixin}}</el-tag>
        </el-form-item> -->
        <el-form-item label="验证码:" prop="code">
          <el-input v-model="ruleForm.code" style="width:180px;" placeholder="请输入验证码"></el-input>
          <el-button type="warning" @click="getIdentifyCode">{{gettingIdentifyCodeBtnContent}}</el-button>
        </el-form-item>

        <el-form-item label="结算密码:" prop="password">
          <el-input type="password" placeholder="请输入结算密码" v-model="ruleForm.password" style="width:180px;"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')" :loading="loading"> 保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>

</template>

<script>
import { return2Fix } from '@/utils/validate'
export default {
  name: 'promote',
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '' || value === 0 || isNaN(value)) {
        callback(new Error('请输入合法的结算金额'))
      } else if (this.ruleForm.total < value) {
        callback(new Error('结算金额不能大于可结算金额'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      ruleForm: {

      },
      canGetIdentifyCode: true,
      gettingIdentifyCodeBtnContent: '获取验证码',
      rules: {
        password: [{ required: true, message: '请输入结算密码', trigger: 'blur' }],
        cash: [{ required: true, message: '请输入结算金额', trigger: 'blur' }, { validator: validatePass, trigger: 'blur' }],
        code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.querySettlementInfo()
    },
    querySettlementInfo() {
      this.$store.dispatch('SettlementBefore').then((res) => {
        if (res && res.data) {
          var data = res.data
          this.ruleForm = {
            pay_account: data.pay_account,
            pay_real_name: data.pay_real_name,
            total: return2Fix(data.total),
            phone: data.phone
          }
        }
      }).catch(() => {

      })
    },
    resetForm(formName) {
      this.init()
      this.$refs[formName].resetFields()
    },
    submitForm() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          const data = {
            cash: this.ruleForm.cash,
            code: this.ruleForm.code,
            password: this.ruleForm.password
          }
          this.$store.dispatch('Settlement', data).then(() => {
            this.loading = false
            this.centerDialogVisible = false
            this.$message({
              message: '修改成功！',
              type: 'success'
            })
          }).catch((err) => {
            if (err && err.response && err.response.data) {
              this.$message({
                showClose: true,
                center: true,
                message: err.response.data.message,
                type: 'error'
              })
            } else {
              console.log(err.response)
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
        let timeLast = 20
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
