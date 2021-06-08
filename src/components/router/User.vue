<template>
  <div class="User">
     <el-card class="box-card">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 搜索框 -->
        <div class="input_box">
           <el-input v-model="input" placeholder="请输入用户账号" clearable @blur="search($event)"></el-input>
           <el-button type="primary" @click="lookAdmin()">查看管理员</el-button>
           <el-button type="primary" @click="addAdminBtn()">添加管理员</el-button>
           <el-button type="primary" @click="lookUser()" v-show="istable_2||istable_3">返回</el-button>
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
                  <span>{{ props.row.number }}</span>
                </el-form-item>
                <el-form-item label="名字">
                  <span>{{ props.row.name }}</span>
                </el-form-item>
                <el-form-item label="性别">
                  <span>{{ props.row.gender }}</span>
                </el-form-item>
                <el-form-item label="身份">
                  <span>{{ props.row.identity }}</span>
                </el-form-item>
                <el-form-item label="联系方式">
                  <span>{{ props.row.phone }}</span>
                </el-form-item>
                <el-form-item label="学院">
                  <span>{{ props.row.academy }}</span>
                </el-form-item>
                <el-form-item label="专业">
                  <span>{{ props.row.marjoy }}</span>
                </el-form-item>
                <el-form-item label="班级">
                  <span>{{ props.row.class }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            label="账号"
            prop="number"
            width="200">
          </el-table-column>
          <el-table-column
            label="姓名"
            prop="name"
            width="150">
          </el-table-column>
          <el-table-column
            label="性别"
            prop="gender"
            width="120">
          </el-table-column>
          <el-table-column
            label="身份"
            prop="identity"
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
                <el-button 
                v-show="istable_1"
                type="danger" 
                icon="el-icon-delete" 
                circle
                @click="handleDelete(scope.$index, scope.row)"
                size="mini">
                </el-button>
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
          <el-input v-model="Edit_form.number" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="Edit_form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" :label-width="formLabelWidth">
          <el-input v-model="Edit_form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学院" :label-width="formLabelWidth">
          <el-select v-model="Edit_form.academy" placeholder="请选择学院">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="系别" :label-width="formLabelWidth">
          <el-select v-model="Edit_form.marjoy" placeholder="请选择系别">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班级" :label-width="formLabelWidth">
          <el-select v-model="Edit_form.class" placeholder="请选择班级">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog_1 = false">取 消</el-button>
        <el-button type="primary" @click="dialog_1 = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'User',
  data () {
    return {
       input:'',
       dialog_1: false,
       formLabelWidth: '70px',
       istable_1:true,
       istable_2:false,
       istable_3:false,
       Edit_form:{
         number:'',
         name:'',
         phone:'',
         class:'',
         academy:'',
         marjoy:''
       },
       tableData: [{
          name:'小米',
          number:'201811701413',
          gender:'女',
          identity:'学生',
          phone:'13735545336',
          academy:'数学与计算机学院',
          marjoy:'软件工程',
          class:'软件1181',
        }]
      }
  },
  components: {},
  methods: {
    //失焦即触发搜索
    search(e){},
    //编辑用户信息
    handleEdit(index,row){
      this.dialog_1=true;
       console.log(index, row);
    },
    //查看管理员按钮
    lookAdmin(){
      this.istable_1=false;
      this.istable_2=true;
      this.istable_3=false;
    },
    //新增管理员按钮
    addAdminBtn(){
      this.istable_1=false;
      this.istable_2=false;
      this.istable_3=true;
    },
    // 查看所有所有人
    lookUser(){
      this.istable_1=true;
      this.istable_2=false;
      this.istable_3=false;
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
    addAdmin(index,row){
      this.$message({
            type: 'success',
            message: '添加成功!'
          });
       console.log(index, row);
    },
    //删除管理员
    deleteAdmin(index,row){
      this.$confirm('是否确定删除该管理员?', '提示', {
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
</style>
