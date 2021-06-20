<template>
  <div class="Login">
      <el-card class="box-card">
        <div class="title">登录</div>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="账号" prop="userNumber">
            <el-input v-model="ruleForm.userNumber" autocomplete="off" placeholder="请输入一卡通账号/教职工号" clearable></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.password" autocomplete="off" placeholder="请输入密码" show-password
            @keydown.native.enter="submitForm('ruleForm')" clearable></el-input>
          </el-form-item>
          <div class="go_register">
            <router-link to="Register">没有账号？注册账号</router-link>
          </div>
          <el-form-item class="login_btn">
            <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
          </el-form-item>
        </el-form>
      </el-card>
  </div>
</template>

<script>
import axios from 'axios'
import {login} from '@/API/api';
export default {
  name: 'Login',
  data () {
    return {
      ruleForm: {
        userNumber:'',
        password: ''
      },
      rules: {
          userNumber: [
            {required: true, message: '账号不能为空', trigger: 'blur'}
          ],
          password: [
              {required: true, message: '密码不能为空', trigger: 'blur'}
          ]
        }
    }
  },
  components: {},
  methods: {
    // 提交
    async submitForm(formName){
      this.$refs[formName].validate((valid) => {
          if (valid) {
            let data = new FormData();
            data.append('userNumber', this.ruleForm.userNumber)
            data.append('password', this.ruleForm.password)
            login(data).then((res)=>{
              console.log(res)
              if(res.code==200){
                //登录成功后缓存token
                sessionStorage.setItem("token",res.token);
                sessionStorage.setItem("userNumber",this.ruleForm.userNumber);
                sessionStorage.setItem("role",res.role[0].authority)
                // 成功提示
                this.$message({
                  message: res.msg,
                  type: 'success'
                });
                axios.interceptors.request.use(
                  config => {
                      //将token放到请求头发送给服务器,将token放在请求头中
                      config.headers.Authorization = res.token;
                      return config;
                  }, err => {
                      return Promise.error(err);
                  }
                )
                // 跳转页面
                this.$router.push('/Home');
              }else{
                // 错误提示
                this.$message.error(res.msg);
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    },
  }
}
</script>

<style scoped>
body,.Login{
  overflow: hidden;
  background-color: #545c64;
  height: 100%;
}
.box-card{
  height: 390px;
  width:500px;
  margin: 150px auto;
}
.title{
  text-align: center;
  font-size: 26px;
  margin-top:20px;
  letter-spacing: 15px;
  color: #555;
}
.el-input{
  width:300px;
}
.el-form-item{
  padding: 0;
  margin: 30px 0;
}
.login_btn{
  margin-left:-100px;
  text-align: center;
}
.login_btn .el-button{
  width:340px;
  margin:30px 50px 0 50px;
  letter-spacing: 5px;
}
.go_register{
  font-size: 12px;
  text-align: right;
  margin: -15px 60px;
}
.go_register a{
   color:#409EFF;
}
</style>
