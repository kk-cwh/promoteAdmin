<template>
  <div class="login-container">
    <div class="login-form">
      <h2>代理系统登陆</h2>
      <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
        <el-form-item prop="username">
          <el-input name="username" type="text" v-model.trim="loginForm.username" autoComplete="on" placeholder="账号">
            <template slot="prepend">
              <svg-icon icon-class="mobile" />
            </template>
          </el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model.trim="loginForm.password" autoComplete="on" placeholder="密码">
            <template slot="prepend">
              <span>
                <svg-icon icon-class="password" />
              </span>
            </template>
            <template slot="append">
              <span class="show-pwd" @click="showPwd">
                <svg-icon icon-class="eye" /> </span>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input name="code" type="text" @keyup.enter.native="handleLogin" v-model="loginForm.code" autoComplete="on" placeholder="验证码">
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
          <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
            登 陆
          </el-button>
        </el-form-item>
      </el-form>

    </div>
  </div>
</template>

<script>

export default {
  name: 'login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value === '' || value.toString().trim() === '') {
        callback(new Error('请输入正确的账号'))
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
        username: 'Ethelyn Swift',
        password: ''
      },
      loginRules: {
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
      this.$refs.loginForm.validate(valid => {
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
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('Login', this.loginForm).then(() => {
            this.loading = false
            // this.$store.dispatch('GetInfo', this.loginForm).then(() => {
            this.$router.push({ path: '/' })
            // })
          }).catch(() => {
            this.loading = false
            this.$message({
              showClose: true,
              center: true,
              message: '账号或者密码有误!',
              type: 'error'
            })
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style>
.login-container  .el-input input {
  background: #fff;
  border: 0px;
    /* border: 1px solid #ebebeb;   */
  /* color: aliceblue; */
     color:#000;
  }
.login-container .el-input-group__append, .el-input-group__prepend{
  border: 0px;
  /* background:rgba(255, 255, 255, 0.1); */
  background: #ebebeb;

}
 .login-container .el-form-item {
   /* border:1px solid #000; */
   border: 1px solid #ebebeb;  
 
    background: #ebebeb;
    border-radius: 5px;
    /* color: #454545; */
    /* border: 1px solid rgba(255, 255, 255, 0.1); */
    /* background: rgba(0, 0, 0, 0.1); */
  }
</style>

<style scoped>

.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: #2d3a4b;
}
 .login-form {
    border-radius: 5px;
    position: absolute;
    right: 0;
    width: 380px;
    padding: 5px 30px 10px 30px;
    margin-top:180px; 
    margin-right:150px;
    background:#fff;
 
  }
  .login-form h2{
    text-align:center;
    /* color:#fff; */
  }
 .show-pwd{
    cursor: pointer;
 }
 
  
</style>
