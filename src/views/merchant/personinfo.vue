<template>
    <div class="app-container">

        <!-- 给玩家上分 -->
        <el-card class="box-card">
            <div slot="header">
                <span>个人信息</span>

            </div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" size="small" label-width="120px" class="demo-ruleForm">
                <el-form-item label="商人ID:" prop="name">
                  {{ruleForm.id}}
                </el-form-item>
                <el-form-item label="后台账号:" prop="name">
                    {{ruleForm.created_at}}
                </el-form-item>
                <el-form-item label="绑定游戏ID:" prop="name">
                    {{ruleForm.count}}
                </el-form-item>
                <el-form-item label="绑定手机号:" prop="name">
                    {{ruleForm.count}}
                </el-form-item>
                <el-form-item label="绑定QQ:" prop="name">
                    {{ruleForm.count}}
                </el-form-item>
                <el-form-item label="绑定微信:" prop="name">
                    {{ruleForm.count}}
                </el-form-item>
                <el-form-item label="注册时间:" prop="name">
                    {{ruleForm.count}}
                </el-form-item>
                <el-form-item label="总拿货:" prop="name">
                    {{ruleForm.count}}
                </el-form-item>
                <el-form-item label="总拿货:" prop="name">
                    {{ruleForm.count}}
                </el-form-item>
                <el-form-item label="总售出:" prop="name">
                    {{ruleForm.count}}
                </el-form-item>
                <el-form-item label="账号状态:" prop="name">
                    {{ruleForm.count}}
                </el-form-item>
    
                <el-form-item>
                    <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
                    <el-button type="primary" @click="submitForm('ruleForm')">确认转账</el-button>
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
        id: '1312',
        created_at: '2018-01-20',
        count: '9999999'
      },
      rules: {},
      checkList: []
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
      console.log(this.checkList)
      if (this.checkList.length === 2) {
        this.$message({
          message: '转账成功！',
          type: 'success'
        })
      }
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




