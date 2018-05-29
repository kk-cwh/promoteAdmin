<template>
    <div class="app-container">

        <!-- 给玩家上分 -->
        <el-card class="box-card">
            <div slot="header">
                <span>个人信息</span>

                <el-button @click="toReset" type="text" size="small" style="float:right;">重置转账密码</el-button>
            </div>

            <el-form size="small" label-width="120px">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="商人ID:" prop="name">
                            {{userInfo.id}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="后台账号:" prop="name">
                            {{userInfo.agency_name}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="绑定游戏ID:" prop="name">
                            {{userInfo.id}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="绑定手机号:" prop="phone">
                            {{userInfo.phone}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="绑定QQ:" prop="name">
                            {{userInfo.QQ}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="绑定微信:" prop="name">
                            {{userInfo.weixin}}
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="总拿货:" prop="name">
                            {{userInfo.agency_amount}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="总售出:" prop="name">
                            {{userInfo.balance}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="账号状态:" prop="name">
                            {{userInfo.status}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="注册时间:" prop="name">
                            {{userInfo.created_at}}
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </el-card>

        <el-dialog :visible.sync="resetDialogVisible" width="480px" center>
            <div slot="title" style="font-size:15px;font-weight:bold;">重置转账密码</div>
            <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="140px" size="small">
                <el-form-item label="手机号:">
                    <el-tag style="width:180px;" type="info" >{{ruleForm.phone}}</el-tag>
                </el-form-item>
                <el-form-item label="新密码:" prop="password">
                    <el-input type="password" v-model="ruleForm.password" style="width:180px;"></el-input>
                </el-form-item>
                <el-form-item label="重复新密码:" prop="password_confirmation">
                    <el-input type="password" v-model="ruleForm.password_confirmation" style="width:180px;"></el-input>
                </el-form-item>

                <el-form-item label="验证码:" prop="code">
                    <el-input v-model="ruleForm.code" style="width:180px;" placeholder="请输入验证码"></el-input>
                    <el-button type="warning" @click="getIdentifyCode">{{gettingIdentifyCodeBtnContent}}</el-button>
                </el-form-item>
                <el-form-item label="">
                    <el-button @click="resetDialogVisible = false">关 闭</el-button>
                    <el-button type="primary" @click="resetTransferPassword" >确认重置</el-button>
                </el-form-item>
                <!-- <el-form-item label="备注">
          <el-input type="textarea" v-model="ruleForm.desc"></el-input>
        </el-form-item> -->
            </el-form>
        </el-dialog>

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
      show: false,
      loading: false,
      canGetIdentifyCode: true,
      gettingIdentifyCodeBtnContent: '获取验证码',
      resetDialogVisible: false,
      userInfo: {},
      ruleForm: {},
      rules: {
        password: [{ required: true, message: '请输入新密码', trigger: 'blur' }, { validator: validatePass, trigger: 'blur' }],
        password_confirmation: [{ required: true, message: '请再次输入新密码', trigger: 'blur' }, { validator: validatePass2, trigger: 'blur' }],
        code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      },
      checkList: []
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.current_page = 1
      this.tableData = []
      this.queryStatistic()
    },
    queryStatistic() {
      this.loading = true

      this.$store.dispatch('GetAgencyInfo').then((res) => {
        if (res && res.agency) {
          var agency = res.agency
          this.userInfo = {
            id: agency.id,
            agency_name: agency.agency_name,
            agency_amount: agency.agency_amount,
            grade: agency.grade,
            balance: agency.balance,
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
    toReset() {
      this.resetDialogVisible = true
    },
    resetTransferPassword() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$store.dispatch('ResetTransferPwd', this.ruleForm).then(() => {
            this.loading = false
            this.$message({
              message: '密码重置成功！',
              type: 'success'
            })
          }).catch(() => {
            this.$message({
              showClose: true,
              center: true,
              message: '重置失败！',
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
        this.$store.dispatch('sendPhoneCode', { phone: this.userInfo.phone }).then((res) => {
          console.log('res:,', res)
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
  width: 600px;
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




