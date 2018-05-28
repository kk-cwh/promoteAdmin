<template>
    <div class="app-container">

        <!-- 给玩家上分 -->
        <el-card class="box-card">
            <div slot="header">
                <span>给玩家上分</span>

            </div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" size="small" label-width="120px" class="demo-ruleForm">
                <el-form-item label="商人ID:" prop="name">
                  {{ruleForm.id}}
                </el-form-item>
                <el-form-item label="注册时间:" prop="name">
                    {{ruleForm.created_at}}
                </el-form-item>
                <el-form-item label="库存金币:" prop="name">
                    {{ruleForm.count}}
                </el-form-item>
                
                <el-form-item label="玩家ID:" prop="name">
                    <el-input v-model="ruleForm.name" style="width:180px;" placeholder="收款玩家游戏ID"></el-input>
                </el-form-item>
                <el-form-item label="转入金币:" prop="name">
                    <el-input v-model="ruleForm.name" style="width:180px;" placeholder="转入金币"></el-input>
                </el-form-item>
                <el-form-item label="" prop="name">
                    <el-checkbox-group v-model="checkList">
                        <el-checkbox label="1" >玩家ID核对无误</el-checkbox>
                        <el-checkbox label="2" >转入金额核对无误</el-checkbox>
                    </el-checkbox-group>
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




