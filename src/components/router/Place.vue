<template>
  <div class="Place">
    <el-card class="box-card">
        <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>场地管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="container">
          <div class="pl-nav">
          <el-radio-group v-model="radio" @change="choose">
            <el-radio-button label=1>场地类型</el-radio-button>
            <el-radio-button label=2 v-show="isShow">添加场地</el-radio-button>
            <el-radio-button label=3>查询场地</el-radio-button>
            <el-radio-button label=4>场地预约</el-radio-button>
          </el-radio-group>
          </div>
           <div class="context">
            <el-table
              :data="type_data"
              border
              style="width: 100%">
              <el-table-column
                type="index"
                label="序号"
                width="200">
              </el-table-column>
              <el-table-column
                prop="type"
                label="场地类型">
              </el-table-column>             
            </el-table>
          </div>
          
          <!-- 添加场地 -->
          <el-dialog title="添加场地" :visible.sync="add_placeform">
            <el-form :model="addplace_form" class="checkContext" :rules="addplace_rules" ref="addplace_form">             
              <el-form-item label="场地类型" :label-width="formLabelWidth" prop="placeType">
                <el-select v-model="addplace_form.placeType" placeholder="请选择类型">
                  <el-option label="羽毛球场" value=1></el-option>
                  <el-option label="兵乓球场" value=2></el-option>
                  <el-option label="台球场" value=3></el-option>
                  <el-option label="篮球场" value=4></el-option>
                  <el-option label="保龄球场" value=5></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="场地名称" :label-width="formLabelWidth" prop="placeName">
                <el-input v-model="addplace_form.placeName" autocomplete="off"></el-input>
              </el-form-item>              
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="add_placeform= false">取 消</el-button>
              <el-button type="primary" @click="add_place('addplace_form')">提 交</el-button>
            </div>
          </el-dialog>
        </div>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Place',
  data () {
    return {
      isShow:true,
      types:["羽毛球场","兵乓球场","台球场","篮球场","保龄球场"],
      add_placeform:false,
      formLabelWidth: '120px',
      type_data:[
        {type:"羽毛球场"},
        {type:"兵乓球场"},      
        {type:"台球场"},
        {type:"篮球场"},
        {type:"保龄球场"},
      ],
      addplace_form:{
        placeType:null,
        placeName:null
      },
      addplace_rules:{
        placeName: [
            { required: true, message: '请输入场地名称', trigger: 'blur' }
          ],
        placeType:[
            { required: true, message: '请选择场地类型', trigger: 'change' }
        ]
      },
      radio: 1,
    }
  },
  mounted(){
    // this.get_type();
    
  },
  created(){
    this.getRole();
  },
  methods: {
    //获取角色
    getRole(){
      if(sessionStorage.getItem("role")=='ROLE_user'){
        this.isShow=false;
      };
    },
    choose(){
      if(this.radio==2){
        this.add_placeform = true;
      }else if(this.radio==3){
         this.$router.push('/place_check')
      }else if(this.radio==4){
        this.$router.push('/place_appointment')
      }
    },
    // 添加场地
    async add_place(form){ 
      let that=this;           
      this.$refs[form].validate((valid) => {
          if (valid) {
            let place_data=new FormData()
            place_data.append("placeName",this.addplace_form.placeName)
            place_data.append("placeType",this.addplace_form.placeType)
            axios({          
              url:'http://47.97.164.97:8888/place/superAdmin/addPlace',
              method:"post",
              data:place_data,
              headers:{
                  'Content-Type':'multipart/form-data',
						      Authorization:localStorage.getItem('Authorization')     }
            })
            .then(function (response) {
              that.add_placeform= false;
              that.$message({
              message: '新增场地成功！',
              type: 'success'
            });
            })
            .catch(function (error) {
              that.$message.error('新增场地失败！');        
            })  
          } else {
            return false;
          }
        });
 
    }
  }
}
</script>

<style scoped>
.Place,.box-card {
    width: 100%;
    height: 100%;
}
.container{
  margin: 20px 20px;
}
.pl-nav{
  text-align: right;
  margin-bottom: 20px;
}
.pl-nav .el-button{
  margin-right: 20px;
}
.checkContext .el-input,.checkContext .el-select{
  width: 600px;
}
.active_type{
  background: #027DB4;
  border-color:#027DB4;
}
</style>
