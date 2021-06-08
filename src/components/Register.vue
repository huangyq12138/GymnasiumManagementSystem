<template>
  <div class="Register" ref="rcontent" @scroll="title_change($event)">
    <div class="title" ref="rtitle">用户注册</div>
    <div class="r_content">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="ruleForm.name" autocomplete="off" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.password" autocomplete="off" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <el-radio-group v-model="ruleForm.gender">
              <el-radio label="男" value="0"></el-radio>
              <el-radio label="女" value="1"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="身份" prop="identity">
            <el-radio-group v-model="ruleForm.identity" @change="showInfo($event)">
              <el-radio label="老师" value="0"></el-radio>
              <el-radio label="学生" value="1"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="一卡通" prop="number" v-show="is_student">
            <el-input v-model="ruleForm.number" autocomplete="off" placeholder="请输入一卡通账号"></el-input>
          </el-form-item>
          <el-form-item label="教职工号" prop="number" v-show="!is_student">
            <el-input v-model="ruleForm.number" autocomplete="off" placeholder="请输入教职工号"></el-input>
          </el-form-item>
          <el-form-item label="联系方式" prop="phone">
            <el-input v-model="ruleForm.phone" autocomplete="off" placeholder="请输入联系方式"></el-input>
          </el-form-item>
          <el-form-item label="学院" prop="academy">
            <el-select v-model="ruleForm.academy" placeholder="请选择所属学院">
              <el-option label="数学与计算机学院" value="math"></el-option>
              <el-option label="电子信息学院" value="dianzi"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="系别" prop="marjoy" v-show="is_student">
            <el-select v-model="ruleForm.marjoy" placeholder="请选择所在专业">
              <el-option label="软件工程" value="software"></el-option>
              <el-option label="计算机科学与技术" value="computer"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="班级" prop="class" v-show="is_student">
            <el-select v-model="ruleForm.class" placeholder="请选择所在班级">
              <el-option label="软件1181" value="1181"></el-option>
              <el-option label="软件1182" value="1182"></el-option>
              <el-option label="软件1183" value="1183"></el-option>
              <el-option label="软件1184" value="1184"></el-option>
              <el-option label="软件卓越1181" value="11181"></el-option>
            </el-select>
          </el-form-item>
          <div class="go_register">
            <router-link to="Login">已有账号？立即登录</router-link>
          </div>
          <el-form-item class="login_btn">
            <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
      is_student:false,
      ruleForm: {
        name:'',
        password: '',
        gender:'',
        identity:'',
        number:'',
        phone:'',
        academy:'',
        marjoy:'',
        class:''

      },
      rules: {
          name: [
            {required: true, message: '姓名不能为空', trigger: 'blur'}
          ],
          number: [
            {required: true, message: '账号不能为空', trigger: 'blur'}
          ],
          password: [
              {required: true, message: '密码不能为空', trigger: 'blur'}
          ],
          gender: [
              {required: true, message: '请选择性别', trigger: 'blur'}
          ],
          identity: [
              {required: true, message: '请选择身份', trigger: 'blur'}
          ],
          phone:[
            {required: true, message: '联系方式不能为空', trigger: 'blur'}
          ],
          academy: [
              {required: true, message: '请选择学院', trigger: 'blur'}
          ],
        } 
    }
  },
  components: {},
  computed: {
  },
  methods: {
    // 提交
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    //重置
    resetForm(formName) {
        this.$refs[formName].resetFields();
    },
    //改变头部样式
    title_change(e){
      if(e.srcElement.scrollTop!=0){
        this.$refs.rtitle.className="title_after"
      }else{
        this.$refs.rtitle.className="title"
      }
    },
    //根据不同身份展示页面
    showInfo(e){
      if(e=="学生"){
        this.is_student=true
      }else{
        this.is_student=false
      }
    }
  }
}
</script>

<style scoped>
body{
  height: 100%; 
  overflow:hidden;
}
.Register{
  height: 100%; 
  overflow-y: scroll;
}
.r_content{
  width: 460px;
  margin: 100px auto;
}

.title{
  text-align: center;
  font-size: 26px;
  line-height: 100px;
  letter-spacing: 5px;
  color: #555;
  width:100%;
  background-color: #fff;
  z-index: 99;
  position:fixed;
  top:0;
}
.title_after{
  text-align: center;
  font-size: 26px;
  line-height: 50px;
  letter-spacing: 5px;
  color: #555;
  width:100%;
  background-color: #fff;
  z-index: 99;
  position:fixed;
  top:0;
  box-shadow: 10px 1px 10px 1px #f2f2f2;
}
.el-input{
  width:300px;
}
.el-form-item{
  padding: 0;
  margin-bottom: 24px;
  }
.login_btn{
  margin-left:-100px;
  text-align: center;
  margin-bottom: 120px;
}
.login_btn .el-button{
  width:163px;
  letter-spacing: 5px;
}
.go_register{
  font-size: 12px;
  text-align: right;
  margin: 0 60px 40px 0;
}
.go_register a{
   color:#409EFF;
}
.el-select{
  width:300px;
}
</style>
