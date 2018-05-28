<template>
  <div class="login-container">

    <div class="login-admin">
      <h1> 鑫耀电玩-代理系统</h1>
    </div>

    <div class="login-tab">

      <el-tabs type="border-card">

        <!-- 验证码登陆 start-->
        <el-tab-pane>
          <span slot="label" style="display:inline-block;width:134px;text-align:center;"> 验证码登陆</span>
          <el-form autoComplete="on" :model="loginForm1" :rules="loginRules1" ref="loginForm1" label-position="left">
            <el-form-item prop="username">
              <el-input name="username" type="text" v-model="loginForm1.username" autoComplete="on" placeholder="手机号">
                <template slot="prepend">
                  <svg-icon icon-class="mobile" />
                </template>

              </el-input>
            </el-form-item>

            <el-form-item prop="password">
              <el-input name="password" type="text" @keyup.enter.native="handleLogin1" v-model="loginForm1.password" autoComplete="on" placeholder="验证码">
                <template slot="prepend">
                  <svg-icon icon-class="safe" />
                </template>
                <template slot="append">
                  <span class="show-pwd" @click="getIdentifyCode">
                    {{gettingIdentifyCodeBtnContent}}
                  </span>
                </template>
              </el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin1">
                登 陆
              </el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <!-- 验证码登陆  end -->

        <!-- 密码登陆 start-->
        <el-tab-pane>
          <span slot="label" style="display:inline-block;width:134px;text-align:center;">密码登陆</span>

          <el-form autoComplete="on" :model="loginForm2" :rules="loginRules2" ref="loginForm2" label-position="left">

            <el-form-item prop="username">
              <el-input name="username" type="text" v-model="loginForm2.username" autoComplete="on" placeholder="手机号">
                <template slot="prepend">
                  <svg-icon icon-class="mobile" />
                </template>
              </el-input>
            </el-form-item>

            <el-form-item prop="password">
              <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin2" v-model="loginForm2.password" autoComplete="on" placeholder="密码">
                <template slot="prepend">
                  <svg-icon icon-class="password" />
                </template>
                <template slot="append">
                  <svg-icon icon-class="eye" @click="showPwd" />
                </template>
              </el-input>

            </el-form-item>

            <!-- <el-form-item prop="code">
              <el-input name="code" type="text" @keyup.enter.native="handleLogin" v-model="loginForm.code" autoComplete="on" placeholder="验证码">
                <template slot="prepend">
                  <svg-icon icon-class="safe" />
                </template>
                <template slot="append">
                  <span class="show-pwd" @click="showPwd">
                    1234
                  </span>
                </template>
              </el-input>
            </el-form-item> -->

            <el-form-item>
              <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin2">
                登 陆
              </el-button>
            </el-form-item>

          </el-form>

        </el-tab-pane>
        <!-- 密码登陆 end-->
      </el-tabs>

    </div>
  </div>
</template>

<script>
import { isPhoneNumber } from '@/utils/validate'

export default {
  name: 'login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isPhoneNumber(value)) {
        callback()
        // callback(new Error('请输入正确的手机号'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('密码不能小于5位'))
      } else {
        callback()
      }
    }
    return {
      loginForm1: {
        username: 'Ethelyn Swift',
        password: ''
      },
      loginRules1: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }]
        // password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      loginForm2: {
        username: '',
        password: ''
      },
      loginRules2: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      loading: false,
      pwdType: 'password',
      canGetIdentifyCode: true,
      gettingIdentifyCodeBtnContent: '获取验证码'
    }
  },
  methods: {
    getIdentifyCode() {
      this.$refs.loginForm1.validate(valid => {
        if (valid) {
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
      })
    },

    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleLogin1() {
      this.$refs.loginForm1.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('Login', this.loginForm1).then(() => {
            this.loading = false
            // this.$store.dispatch('GetInfo', this.loginForm).then(() => {
            this.$router.push({ path: '/' })
            // })
          }).catch(() => {
            this.loading = false
            this.$message({
              showClose: true,
              message: '账号或者密码有误!',
              type: 'error',
              duration: 5 * 1000
            })
          })
        } else {
          return false
        }
      })
    },
    handleLogin2() {
      this.$refs.loginForm2.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('Login', this.loginForm2).then(() => {
            this.loading = false
            this.$router.push({ path: '/' })
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style>
.login-container  .el-input input {
 /* background: transparent; */
 border: 0px;
  }
.login-container .el-input-group__append, .el-input-group__prepend{
 border: 0px;

}
 .login-container .el-form-item {
    border: 1px solid #dcdfe6;  
    /* background: rgba(0, 0, 0, 0.1); */
    border-radius: 5px;
    color: #454545;

    
  }
</style>

<style scoped>

.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: #2d3a4b;
  user-select: none;
  /* background-image: url(https://dxlfb468n8ekd.cloudfront.net/gsc/WQ4M1Y/80/4f/77/804f77923a3d41788f7681c5f1ddfa90/images/index/u0_state0.jpg?token=7051449dc6e228edd8cdd16308b95068); */
}

.login-admin{
    position: absolute;
    top:90px;
    right:500px;
    left:120px;
    width: 420px;
}
.login-admin h1{
  color:#fff;
  font-size:40px;
}

 .login-tab {
    position: absolute;
    right: 0;
    width: 420px;
    padding: 35px 35px 15px 35px;
    margin: 150px;
  }
 
 .show-pwd{
   cursor: pointer;
   user-select: none;
 }
  
</style>
