<template>
    <div class="app-container">

        <!-- 给玩家上分 -->
        <el-card class="box-card">
            <div slot="header">
                <span>给玩家上分</span>

            </div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" size="small" label-width="120px" class="demo-ruleForm">
                <el-form-item label="商人ID:" >
                  {{obj.id}}
                </el-form-item>
                <el-form-item label="注册时间:">
                    {{obj.created_at}}
                </el-form-item>
                <el-form-item label="库存金币:" >
                    {{obj.count}}
                </el-form-item>
                
                <el-form-item label="玩家ID:" prop="player_id">
                    <el-input v-model="ruleForm.player_id" style="width:180px;" placeholder="收款玩家游戏ID"></el-input>
                </el-form-item>
                <el-form-item label="转入金币:" prop="money">
                    <el-input v-model="ruleForm.money" style="width:180px;" placeholder="转入金币数量"></el-input>
                </el-form-item>
                <el-form-item label="密码:" prop="password">
                    <el-input v-model="ruleForm.password" type="password" style="width:180px;" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-checkbox-group v-model="checkList">
                        <el-checkbox label="1" >玩家ID核对无误</el-checkbox>
                        <el-checkbox label="2" >转入金额核对无误</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item>
                    <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
                    <el-button type="primary" @click="transfer('ruleForm')" :loading="loading">确认转账</el-button>
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

      obj: {
        id: '1312',
        created_at: '2018-01-20',
        count: '9999999'
      },
      ruleForm: {
        player_id: '',
        password: '',
        money: ''
      },
      rules: {
        player_id: [
          { required: true, message: '请输入玩家ID', trigger: 'blur' }
        ],
        money: [
          { required: true, message: '请输入转入金币数量', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
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
    transfer() {
      console.log(this.checkList)
      if (this.checkList.length === 2) {
        this.loading = true
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            this.$store.dispatch('Transfer', this.ruleForm).then(() => {
              this.loading = false
              this.$message({
                message: '转账成功！',
                type: 'success'
              })
              this.ruleForm = {}
              this.checkList = []
            }).catch(() => {
              this.$message({
                showClose: true,
                center: true,
                message: '转账失败！',
                type: 'error'
              })
              this.loading = false
            })
          } else {
            this.loading = false
            return false
          }
        })
      } else {
        this.$message({
          showClose: true,
          center: true,
          message: '请确认转玩家ID和转账金额,无误请勾选确认!',
          type: 'error'
        })
        this.loading = false
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




