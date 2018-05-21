<template>
  <div class="login-container">
    <div class="login-form">
      <h2>后台管理</h2>
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
import { isvalidUsername } from '@/utils/validate'

export default {
  name: 'login',
  data() {
    const validateUsername = (rule, value, callback) => {
      callback()
      if (!isvalidUsername(value)) {
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
        password: '123123'
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
  background: transparent;
  border: 0px;
  color: aliceblue;
  }
.login-container .el-input-group__append, .el-input-group__prepend{
  border: 0px;
  background:rgba(255, 255, 255, 0.1);
  background: transparent;

}
 .login-container .el-form-item {
   /* border:1px solid #dfdddd; */
    border-radius: 5px;
    color: #454545;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
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
    width: 420px;
    padding: 20px 35px 15px 35px;
    margin-top:180px; 
    margin-right:150px;
  }
  .login-form h2{
    text-align:center;
    color:#fff;
  }
 .show-pwd{
    cursor: pointer;
 }
 
  
</style>
