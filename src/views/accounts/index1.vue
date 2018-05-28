<template>
  <div class="app-container">

    <!-- 结算账户 -->
    <el-card class="box-card">
      <div slot="header">
        <span>结算账户</span>

      </div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" size="small" label-width="120px" class="demo-ruleForm">
        <el-form-item label="结算支付宝账户:" prop="name">
          <el-input v-model="ruleForm.name" style="width:180px;"></el-input>
        </el-form-item>
        <el-form-item label="支付宝实名:" prop="name">
          <el-input v-model="ruleForm.name" style="width:180px;"></el-input>
        </el-form-item>
        <el-form-item label="绑定微信:" prop="name">
          <el-input v-model="ruleForm.name" style="width:180px;"></el-input>
        </el-form-item>

        <el-form-item label="" prop="desc">
          <el-input v-model="ruleForm.desc" style="width:180px;" placeholder="请输入验证码"></el-input>
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
      rules: {}
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
    resetForm() {

    },
    submitForm() {

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




