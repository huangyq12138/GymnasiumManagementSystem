<template>
  <div class="Login">
    <el-container
    class="login_container">
      <!-- 顶部导航栏 -->
        <el-header>
          <el-row  class="login_header">
            <el-col :span="5">
              <div class="grid-content bg-purple">
                <span class="l_icon" @click="close_open"><i class="el-icon-s-fold"></i></span>
                广东海洋大学体育馆管理系统
              </div>
            </el-col>
            <el-col :span="15"><div class="grid-content bg-purple-light"></div></el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple">
                <el-menu
                  :default-active="activeIndex"
                  class="el-menu-demo"
                  mode="horizontal"
                  @select="handleSelect"
                  background-color="#545c64"
                  text-color="#fff"
                  active-text-color="#ffd04b">
                  <el-submenu index="1">
                    <template slot="title">个人中心</template>
                    <el-menu-item index="1-1" @click="updatePsw">修改密码</el-menu-item>
                  </el-submenu>
                  <el-menu-item index="2" @click="outLogin">退出登录</el-menu-item>
                </el-menu>
              </div>
            </el-col>
          </el-row>
        </el-header>
        <el-container>
          <!-- 侧边菜单栏 -->
            <el-aside :width="el_aside_width">
              <el-menu
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                background-color="#667777"
                text-color="#fff"
                active-text-color="#ffd04b"
                :collapse="isCollapse"
                router
                >
                <el-menu-item index="User" v-show="isShow_2">
                  <i class="el-icon-s-custom"></i>
                  <span slot="title">用户管理</span>
                </el-menu-item>
                <el-menu-item index="Notice" v-show="isShow_1">
                  <i class="el-icon-bell"></i>
                  <span slot="title">公告管理</span>
                </el-menu-item>
                <el-menu-item index="Place">
                  <i class="el-icon-map-location"></i>
                  <span slot="title">场地管理</span>
                </el-menu-item>
                <el-menu-item index="Contest" v-show="isShow_1">
                  <i class="el-icon-timer"></i>
                  <span slot="title">赛事管理</span>
                </el-menu-item>
                <el-menu-item index="Equipment">
                  <i class="el-icon-basketball"></i>
                  <span slot="title">器材管理</span>
                </el-menu-item>
                <el-menu-item index="Money" v-show="isShow_1">
                  <i class="el-icon-s-data"></i>
                  <span slot="title">运营管理</span>
                </el-menu-item>
              </el-menu>
            </el-aside>
            <!-- 内容主体 -->
            <el-main>
              <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
    <!-- 修改密码弹出层 -->
    <el-dialog title="修改密码" :visible.sync="dialog" width="600px">
      <el-form :model="PswForm" status-icon :rules="rules" ref="PswForm" label-width="100px" class="demo-ruleForm editDialog">
        <el-form-item label="账号" prop="userNumber" :label-width="formLabelWidth">
          <el-input v-model="PswForm.userNumber" disabled></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd" :label-width="formLabelWidth">
          <el-input type="password" v-model="PswForm.pwd" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="rePwd" :label-width="formLabelWidth">
          <el-input type="password" v-model="PswForm.rePwd" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item class="Dfooter">
          <el-button type="primary" @click="submitPsw('PswForm')">确定</el-button>
          <el-button @click="dialog=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>  
  </div>
</template>

<script>
import {updatedPsw} from '@/API/api';
export default {
  name: 'Login',
  data () {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.PswForm.rePwd !== '') {
            this.$refs.PswForm.validateField('rePwd');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.PswForm.pwd) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
    };
    return {
      isCollapse: false,
      role:"",
      isShow_1:true,
      isShow_2:true,
      el_aside_width:"200px",
      activeIndex: '1',
      dialog:false,
      formLabelWidth:'70px',
      PswForm:{
        userNumber:'',
        pwd:'',
        rePwd:''
      },
      rules: {
        pwd: [
          { validator: validatePass, trigger: 'blur' }
        ],
        rePwd: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  components: {},
  created(){
    this.isLogin();
    this.initPswForm()
  },
  methods: {
      //判断是否登录
      isLogin(){
        if(!sessionStorage.getItem('token')){
          this.$router.push('/')
        }else{
          this.role=sessionStorage.getItem("role");
          if(this.role=='ROLE_user'){
            this.isShow_1=false;
            this.isShow_2=false;
          }else if(this.role=='ROLE_admin'){
            this.isShow_2=false;
          }
        }
      },
      //退出登录
      outLogin(){
        this.$confirm('是否确定退出登录？')
          .then(_ => {
            // 清除session缓存
            sessionStorage.clear();
            // 跳转至登录页面
            this.$router.push('/');
            // 成功提示
            this.$message.success('退出成功！')
          })
          .catch(_ => {});
      },
      //侧边栏子菜单展开事件 
      handleOpen(key, keyPath) {
        // console.log(key, keyPath);
      },
       //侧边栏子菜单关闭事件 
      handleClose(key, keyPath) {
        // console.log(key, keyPath);
      },
      // 菜单折叠事件
      close_open(){
        this.isCollapse = !this.isCollapse
        if(this.isCollapse==true){
          this.el_aside_width="auto"
        }else{
          this.el_aside_width="200px"
        }
      },
      //顶部菜单栏选择事件
      handleSelect(key, keyPath) {
        // console.log(key, keyPath);
      },
      //初始化密码框信息
      initPswForm(){
        this.PswForm.userNumber=sessionStorage.getItem('userNumber');
      },
      //修改密码
      updatePsw(){
        this.dialog=true;
      },
      //提交修改密码
      submitPsw(formName) {
        if(formName.pwd!=''){
          this.$refs[formName].validate((valid) => {
            if (valid) {
              let data=new FormData();
              data.append('userNumber',this.PswForm.userNumber);
              data.append('pwd',this.PswForm.pwd);
              data.append('rePwd',this.PswForm.rePwd);
              updatedPsw(data).then((res)=>{
                // console.log(res)
                if(res.code==200){
                  this.$message.success(res.title);
                  this.dialog=false;
                  this.PswForm.pwd="";
                  this.PswForm.rePwd="";
                }else{
                  this.$message.error(res.title);
                }
              })
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        }
      }
  }
}
</script>

<style scoped>
.Login,.login_container{
  height: 100%;
  min-width: 1200px;
}
.l_icon{
  cursor: pointer;
  margin-right: 10px;
}
 .el-header{
    background-color: #B3C0D1;
    color: #fff;
    text-align: center;
    line-height: 60px;
    background-color: rgb(84, 92, 100);
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    overflow: hidden;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-col {
    border-radius: 4px;
  }
  .grid-content {
    border-radius: 4px;
    height: 60px;
    min-height: 40px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
 .el-menu-vertical-demo{
   height: 100%;
 }

.editDialog{
  margin:0 auto;
  width:400px;
}
.editDialog .el-form-item{
  margin:0;
  padding:0;
  padding-bottom: 16px;
}
.editDialog .el-select{
  width:300px;
}
.editDialog .Dfooter{
  margin:20px 0 10px -60px;
  text-align: center;
}
.editDialog .Dfooter .el-button{
  width: 100px;
}
</style>

