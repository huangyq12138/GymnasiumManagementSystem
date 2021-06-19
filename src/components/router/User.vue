<template>
  <div class="User">
     <el-card class="box-card">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 搜索框 -->
        <div class="input_box">
           <el-input v-model="input" placeholder="请输入用户账号" clearable></el-input>
           <el-button type="primary" @click="search()" style="margin-left:-10px">查询</el-button>
           <el-button type="primary" @click="lookAdmin()">查看管理员</el-button>
           <el-button type="primary" @click="addAdminBtn()">添加管理员</el-button>
           <el-button type="primary" @click="lookUser()" v-show="istable_2||istable_3||istable_0">返回</el-button>
        </div>
        <!-- 用户信息表格 -->
        <el-table
          :data="tableData"
          style="width: 100%"
          height="470"
          stripe>
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="账号">
                  <span>{{ props.row.userNumber }}</span>
                </el-form-item>
                <el-form-item label="名字">
                  <span>{{ props.row.username }}</span>
                </el-form-item>
                <el-form-item label="性别">
                  <span>{{ props.row.gender }}</span>
                </el-form-item>
                <!-- <el-form-item label="身份">
                  <span>{{ props.row.identity}}</span>
                </el-form-item> -->
                <el-form-item label="联系方式">
                  <span>{{ props.row.phone }}</span>
                </el-form-item>
                <el-form-item label="学院">
                  <span>{{ props.row.academy }}</span>
                </el-form-item>
                <el-form-item label="专业">
                  <span>{{ props.row.major }}</span>
                </el-form-item>
                <el-form-item label="班级">
                  <span>{{ props.row.classes }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            label="账号"
            prop="userNumber"
            width="200">
          </el-table-column>
          <el-table-column
            label="姓名"
            prop="username"
            width="150">
          </el-table-column>
          <el-table-column
            label="性别"
            prop="gender"
            width="120">
          </el-table-column>
          <el-table-column
            label="联系方式"
            prop="phone"
            width="200">
          </el-table-column>
          <el-table-column
            label="学院"
            prop="academy">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button 
                size="mini"
                type="primary"
                icon="el-icon-edit" 
                circle  
                @click="handleEdit(scope.$index, scope.row)"
                v-show="istable_1"
                >
                </el-button>
                <!-- <el-button 
                v-show="istable_1"
                type="danger" 
                icon="el-icon-delete" 
                circle
                @click="handleDelete(scope.$index, scope.row)"
                size="mini">
                </el-button> -->
                <el-button
                v-show="istable_2"
                size="mini"
                type="danger"
                class="editBtn"
                @click="deleteAdmin(scope.$index, scope.row)">删除管理员</el-button>
                <el-button
                v-show="istable_3"
                size="mini"
                type="primary"
                class="editBtn"
                @click="addAdmin(scope.$index, scope.row)">添加为管理员</el-button>
            </template>
          </el-table-column>
        </el-table>
    </el-card>  
     <!-- 编辑用户信息 -->
    <el-dialog title="修改用户信息" :visible.sync="dialog_1" width="600px">
      <el-form :model="Edit_form"  class="editDialog">
        <el-form-item label="账号" :label-width="formLabelWidth">
          <el-input v-model="Edit_form.userNumber" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="Edit_form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" :label-width="formLabelWidth">
          <el-input v-model="Edit_form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item label="性别" :label-width="formLabelWidth">
          <el-radio-group v-model="Edit_form.gender">
            <el-radio label="0" value="0">女</el-radio>
            <el-radio label="1" value="1">男</el-radio>
          </el-radio-group>
        </el-form-item> -->
        <el-form-item label="学院" :label-width="formLabelWidth">
          <el-select v-model="Edit_form.academy" placeholder="请选择学院">
              <el-option label="数学与计算机学院" value="数学与计算机学院"></el-option>
              <el-option label="电子信息学院" value="电子信息学院"></el-option>
              <el-option label="外国语学院" value="外国语学院"></el-option>
              <el-option label="中歌艺术学院" value="中歌艺术学院"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="系别" :label-width="formLabelWidth">
          <el-select v-model="Edit_form.major" placeholder="请选择系别">
              <el-option label="软件工程" value="软件工程"></el-option>
              <el-option label="计算机科学与技术" value="计算机科学与技术"></el-option>
              <el-option label="英语" value="英语"></el-option>
              <el-option label="舞蹈" value="舞蹈"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班级" :label-width="formLabelWidth">
          <el-select v-model="Edit_form.classes" placeholder="请选择班级">
              <el-option label="软件1181" value="软件1181"></el-option>
              <el-option label="软件1182" value="软件1182"></el-option>
              <el-option label="软件1183" value="软件1183"></el-option>
              <el-option label="软件1184" value="软件1184"></el-option>
              <el-option label="软件卓越1181" value="软卓1181"></el-option>
              <el-option label="英卓1181" value="英卓1181"></el-option>
              <el-option label="舞蹈1181" value="舞蹈1181"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog_1 = false">取 消</el-button>
        <el-button type="primary" @click="sureEdit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {getAll,getAllAdmins,getAllUsers,getUser,updatedUserInfo,addAdmin,deleteAdmin} from '@/API/api';
export default {
  name: 'User',
  data () {
    return {
       input:'',
       dialog_1: false,
       formLabelWidth: '70px',
       istable_0:false,
       istable_1:true,
       istable_2:false,
       istable_3:false,
       all:[],
       allAdmin:[],
       allUser:[],
       Edit_form:{
         userNumber:'',
         username:'',
         gender:0,
         phone:'',
         classes:'',
         academy:'',
         major:''
       },
       tableData: [{
          username:'小米',
          userNumber:'201811701413',
          gender:1,
          phone:'13735545336',
          academy:'数学与计算机学院',
          major:'软件工程',
          classes:'软件1181',
        }]
      }
  },
  components: {},
  created(){
    // 获取用户信息
    this.getAllInfo();
  },
  methods: {
    //获取所有用户信息
    async getAllInfo(){
      let data=await getAll();
      this.all=this.switchGender(data.datas);
      this.tableData=this.all;
    },
    // 获取所有管理员信息
    async getAllAdminInfo(){
      let data=await getAllAdmins();
      this.allAdmin=this.switchGender(data.datas);
      this.tableData=this.allAdmin;
    },
    // 获取所有普通用户信息
    async getAllPtyhInfo(){
      let data=await getAllUsers();
      this.allUser=this.switchGender(data.datas);
      this.tableData=this.allUser;
    },
    //根据账号获取单个用户信息
    async getUserInfo(num){
      console.log(num)
      let number=new FormData();
      let arr=[];
      number.append('userNumber',num);
      let data=await getUser(number);
      arr.push(this.switchGender(data.data));
      this.tableData=arr;
    },
    //将性别信息转化为中文含义,返回数组
    switchGender(list){
      for(let i=0;i<list.length;i++){
        if(list[i].gender==1){
          list[i].gender='男';
        }else{
          list[i].gender='女';
        }
      }
      return list;
    },
     //将性别信息转化为代表数字，返回对象
    NumGender(obj){
        if(obj.gender=='男'){
          obj.gender=1;
        }else{
          obj.gender=0;
        }
      return obj;
    },
    //搜索用户
    search(){
      this.getUserInfo(this.input);
      this.istable_0=true;
    },
    //编辑用户信息
    handleEdit(index,row){
      this.dialog_1=true;
      //  console.log(index, row);
       this.Edit_form=row;
    },
    //确定提交编辑
    async sureEdit(){
      this.dialog_1=false;
      let gender=0;
      let editForm=new FormData();
      if(this.Edit_form.gender=='男'){
        gender=1;
      }else{
        gender=0;
      }
      console.log(this.Edit_form);
      editForm.append('userNumber',this.Edit_form.userNumber);
      editForm.append('username',this.Edit_form.username);
      editForm.append('phone',this.Edit_form.phone);
      editForm.append('gender',gender);
      editForm.append('classes',this.Edit_form.classes);
      editForm.append('academy',this.Edit_form.academy);
      editForm.append('major',this.Edit_form.major);
      let res=await updatedUserInfo(editForm);
      if(res.code==200){
        this.$message.success(res.title);
        //更新页面数据
        this.lookUser();
      }else{
        this.$message.error(res.title);
      }
      console.log(res)
    },
    //查看管理员按钮
    lookAdmin(){
      this.istable_0=false;
      this.istable_1=false;
      this.istable_2=true;
      this.istable_3=false;
      this.getAllAdminInfo();
      // console.log(this.allAdmin)
    },
    //新增管理员按钮——展示所有普通用户页面
    addAdminBtn(){
      this.istable_0=false;
      this.istable_1=false;
      this.istable_2=false;
      this.istable_3=true;
      this.getAllPtyhInfo();
      // console.log(this.allUser)
    },
    // 查看所有所有人
    lookUser(){
      // this.input="";
      this.istable_0=false;
      this.istable_1=true;
      this.istable_2=false;
      this.istable_3=false;
      this.tableData=this.all;
    },
    //删除用户
    handleDelete(index,row){
       this.$confirm('是否确定删除该用户?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          console.log('删除失败！');
        });
       console.log(index, row);
    },
    //添加管理员
    async addAdmin(index,row){
      let number=new FormData();
      number.append('userNumber',row.userNumber);
      let res=await addAdmin(number);
      if(res.code==200){
        this.$message.success(res.title);
        //更新页面数据
        this.addAdminBtn();
      }else{
        this.$message.error(res.title);
      }
    },
    //删除管理员
    deleteAdmin(index,row){
      this.$confirm('是否确定删除该管理员?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let number=new FormData();
          number.append('userNumber',row.userNumber);
          // console.log(number.get('userNumber'))
          deleteAdmin(number).then((res)=>{
            if(res.code==200){
              this.$message.success(res.title);
              //更新页面数据
              this.lookAdmin();
            }else{
              this.$message.error(res.title)
            }
          })
        }).catch(() => {
          console.log('删除失败！');        
        });
    }
  }
}
</script>

<style scoped>
.User,.box-card {
    width: 100%;
    height: 100%;
}
.input_box{
  margin:20px 0;
  text-align: left;
}
.el-input{
  width:300px;
  margin:0 10px;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
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
.dialog-footer{
  margin-top: -10px;
  margin-bottom: 20px;
  text-align: center;
}
.dialog-footer .el-button{
  width: 100px;
}
.editBtn{
  margin-left:0;
}
.el-radio-group{
  margin-left: -190px;
}
</style>
