<template>
  <div class="login-container">

    <div class="login-admin">
      <h1> 鑫耀电玩-后台管理系统</h1>
    </div>

    <div class="login-tab">

      <el-tabs type="border-card">

        <!-- 验证码登陆 start-->
        <el-tab-pane>
          <span slot="label" style="display:inline-block;width:134px;text-align:center;"> 验证码登陆</span>
          <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
            <el-form-item prop="username">
              <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="手机号">
                <template slot="prepend">
                  <svg-icon icon-class="mobile" />
                </template>

              </el-input>
            </el-form-item>

            <el-form-item prop="code">
              <el-input name="code" type="text" @keyup.enter.native="handleLogin" v-model="loginForm.code" autoComplete="on" placeholder="验证码">
                <template slot="prepend">
                  <svg-icon icon-class="safe" />
                </template>
                <template slot="append">
                  <span class="show-pwd" @click="showPwd">
                    获取验证码
                  </span>
                </template>
              </el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
                登 陆
              </el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <!-- 验证码登陆  end -->

        <!-- 密码登陆 start-->
        <el-tab-pane>
          <span slot="label" style="display:inline-block;width:134px;text-align:center;">密码登陆</span>

          <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">

            <el-form-item prop="username">
              <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="手机号">
                <template slot="prepend">
                  <svg-icon icon-class="mobile" />
                </template>
              </el-input>
            </el-form-item>

            <el-form-item prop="password">
              <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on" placeholder="密码">
                <template slot="prepend">
                  <svg-icon icon-class="password" />
                </template>
                <template slot="append">
                  <svg-icon icon-class="eye" @click="showPwd" />
                </template>
              </el-input>

            </el-form-item>

            <el-form-item prop="code">
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
            </el-form-item>

            <el-form-item>
              <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
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
import { isvalidUsername } from '@/utils/validate'

export default {
  name: 'login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('请输入正确的用户名'))
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
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      loading: false,
      pwdType: 'password'
    }
  },
  methods: {
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('Login', this.loginForm).then(() => {
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
  background-image: url(https://dxlfb468n8ekd.cloudfront.net/gsc/WQ4M1Y/80/4f/77/804f77923a3d41788f7681c5f1ddfa90/images/index/u0_state0.jpg?token=7051449dc6e228edd8cdd16308b95068);
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
 
 
  
</style>
