<template>
    <div class="app-container">

        <!-- 给玩家上分 -->
        <el-card class="box-card">
            <div slot="header">
                <span>给玩家上分</span>

            </div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" size="small" label-width="120px" class="demo-ruleForm">
                <el-form-item label="商人ID:" >
                  {{userInfo.id}}
                </el-form-item>
                <el-form-item label="注册时间:">
                    {{userInfo.created_at}}
                </el-form-item>
                <el-form-item label="库存金币:" >
                    {{userInfo.balance}}
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
import { return2Fix } from '@/utils/validate'
export default {
  name: 'promote',
  data() {
    const validateMoney = (rule, value, callback) => {
      if (value === '' || value.toString().trim() === '' || isNaN(value)) {
        callback(new Error('请输入合法的金币数量!'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      userInfo: {},
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
          { required: true, validator: validateMoney, trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      checkList: []
    }
  },
  mounted() {
    this.ruleForm.player_id = this.$route.params.player_id
    this.init()
  },
  methods: {
    init() {
      this.queryStatistic()
    },
    queryStatistic() {
      this.$store.dispatch('GetAgencyInfo').then((res) => {
        if (res && res.agency) {
          var agency = res.agency
          this.userInfo = {
            id: agency.id,
            agency_name: agency.agency_name,
            agency_amount: agency.agency_amount,
            grade: agency.grade,
            balance: return2Fix(agency.balance),
            status: agency.status,
            phone: agency.phone,
            rate: agency.rate,
            QQ: agency.QQ,
            weixin: agency.weixin,
            remark: agency.remark,
            created_at: agency.created_at
          }
          this.ruleForm.phone = agency.phone.replace(agency.phone.substr(3, 4), '****')
        }
      }).catch(() => {

      })
    },
    resetForm() {

    },
    transfer() {
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
              this.init()
            }).catch((err) => {
              if (err && err.response && err.response.data) {
                this.$message({
                  showClose: true,
                  message: err.response.data.message,
                  type: 'error',
                  duration: 5 * 1000
                })
              } else {
                this.$message({
                  showClose: true,
                  center: true,
                  message: '转账失败！',
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




