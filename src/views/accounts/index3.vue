<template>
  <div class="app-container">

    <!-- 提交结算 -->
    <el-card class="box-card">
      <div slot="header">
        <span>提交结算</span>

      </div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" size="small" label-width="120px" class="demo-ruleForm">
        <el-form-item label="可结算金额:" prop="name">
          <el-tag type="info">{{ruleForm.account}}</el-tag>
        </el-form-item>
        <el-form-item label="结算金额:" prop="name">
          <el-input type="text" v-model="ruleForm.account" style="width:180px;"></el-input>
        </el-form-item>

        <el-form-item label="收款支付宝:" prop="name">
          <!-- <el-input type="text" v-model="ruleForm.zhifubao"></el-input> -->
          <el-tag type="info">{{ruleForm.zhifubao}}</el-tag>
        </el-form-item>
        <el-form-item label="支付宝实名:" prop="name">
          <!-- <el-input type="text" v-model="ruleForm.name"></el-input> -->
          <el-tag type="info">{{ruleForm.name}}</el-tag>
        </el-form-item>
        <el-form-item label="绑定手机:" prop="name">
          <!-- <el-input  v-model="ruleForm.phone"></el-input> -->
          <el-tag type="info">{{ruleForm.phone}}</el-tag>
        </el-form-item>
        <el-form-item label="" prop="desc">
          <el-input v-model="ruleForm.desc" style="width:180px;" placeholder="请输入验证码"></el-input>
          <el-button type="warning" @click="getIdentifyCode">{{gettingIdentifyCodeBtnContent}}</el-button>
        </el-form-item>

        <el-form-item label="结算密码:">
          <el-input type="password" placeholder="请输入结算密码" v-model="ruleForm.password" style="width:180px;"></el-input>
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
      ruleForm: {
        account: 12313212.5,
        zhifubao: 'woyaotixian@163.com',
        name: '王者',
        phone: '185****9028'
      },
      canGetIdentifyCode: true,
      gettingIdentifyCodeBtnContent: '获取验证码',
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
