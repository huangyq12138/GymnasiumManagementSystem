<template>
  <div class="Login">
      <el-card class="box-card">
        <div class="title">登录</div>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
<<<<<<< HEAD
          <el-form-item label="账号" prop="userNumber">
            <el-input v-model="ruleForm.userNumber" autocomplete="off" placeholder="请输入一卡通账号/教职工号"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.password" autocomplete="off" placeholder="请输入密码" show-password
=======
          <el-form-item label="账号" prop="number">
            <el-input v-model="ruleForm.number" autocomplete="off" placeholder="请输入一卡通账号/教职工号"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.password" autocomplete="off" placeholder="请输入密码"
>>>>>>> xq
            @keydown.native.enter="submitForm('ruleForm')"></el-input>
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
<<<<<<< HEAD
import {login} from '@/API/api';
=======
>>>>>>> xq
export default {
  name: 'Login',
  data () {
    return {
      ruleForm: {
<<<<<<< HEAD
        userNumber:'',
        password: ''
      },
      rules: {
          userNumber: [
=======
        number:'',
        password: ''
      },
      rules: {
          number: [
>>>>>>> xq
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
<<<<<<< HEAD
    async submitForm(formName){
      this.$refs[formName].validate((valid) => {
          if (valid) {
            let data = new FormData();
            data.append('userNumber', this.ruleForm.userNumber)
            data.append('password', this.ruleForm.password)
            login(data).then((res)=>{
              if(res.code==200){
                //登录成功后缓存token
                sessionStorage.setItem("token",res.token);
                sessionStorage.setItem("userNumber",this.ruleForm.userNumber);
                // 成功提示
                this.$message({
                  message: res.msg,
                  type: 'success'
                });
                // 跳转页面
                this.$router.push('/Home');
              }else{
                // 错误提示
                this.$message.error(res.msg);
              }
            })
=======
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
>>>>>>> xq
          } else {
            console.log('error submit!!');
            return false;
          }
        });
<<<<<<< HEAD
    },
=======
      }
>>>>>>> xq
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
