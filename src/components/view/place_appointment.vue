<template>
  <div class="place_appointment">
    <el-card class="box-card">
        <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/User' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/place' }">场地管理</el-breadcrumb-item>
        <el-breadcrumb-item >场地预约</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="return">
            <el-button type="success" @click="return_ap" >返回</el-button>
          </div>
        <div class="container">      
          <div class="ap-nav">
          <el-radio-group v-model="now" @change="show">
            <el-radio-button label='personal'>个人预约</el-radio-button>
            <el-radio-button label='special' v-show="isShow">特殊预约</el-radio-button>
            <el-radio-button label='my'>我的预约</el-radio-button>
          </el-radio-group>
          </div>
          <!-- 个人预约 -->
          <div  v-show="this.flag.personal">
            <el-form  label-width="80px" class="checkContext" ref="personala" :model="personala" :rules="rule">
              <el-form-item label="学号" :label-width="formLabelWidth" prop="std">
                    <el-input v-model.number="personala.std" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
                    <el-input v-model="personala.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="联系方式" :label-width="formLabelWidth" prop="phone">
                    <el-input v-model.number="personala.phone" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="场地类型" :label-width="formLabelWidth" prop="type">
                <el-select v-model="personala.type" placeholder="请选择场地" @change="choose_type(0)">
                  <el-option label="羽毛球场" value=0></el-option>
                  <el-option label="兵乓球场" value=1></el-option>
                  <el-option label="台球场" value=2></el-option>
                  <el-option label="篮球场" value=3></el-option>
                  <el-option label="保龄球场" value=4></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="场地名称" :label-width="formLabelWidth" v-show="this.placeName" prop="pname">
                <el-select v-model="personala.pname" placeholder="请选择">
                  <el-option :value="item.placeName" :label="item.placeName" v-for="(item,i) in place_name" :key="i"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="日期" :label-width="formLabelWidth" prop="day">
                <el-select v-model="personala.day" placeholder="请选择">
                  <el-option label="星期一" value=1></el-option>
                  <el-option label="星期二" value=2></el-option>
                  <el-option label="星期三" value=3></el-option>
                  <el-option label="星期四" value=4></el-option>
                  <el-option label="星期五" value=5></el-option>
                  <el-option label="星期六" value=6></el-option>
                  <el-option label="星期日" value=7></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="时间" :label-width="formLabelWidth" prop="time">
                <el-select v-model="personala.time" placeholder="请选择">
                  <el-option label="8:00~10:00" value="8:00~10:00"></el-option>
                  <el-option label="10:00~12:00" value="10:00~12:00"></el-option>
                  <el-option label="14:00~16:00" value="14:00~16:00"></el-option>
                  <el-option label="16:00~18:00" value="16:00~18:00"></el-option>
                  <el-option label="18:00~20:00" value="18:00~20:00"></el-option>
                  <el-option label="20:00~22:00" value="20:00~22:00"></el-option>
                </el-select>
              </el-form-item>            
              <el-form-item>
                <el-button type="primary" @click="personal('personala')">提交</el-button>
              </el-form-item>
            </el-form>
          </div>          
          <!-- 特殊预约 -->
          <div v-show="this.flag.special">
            <el-form  label-width="80px" class="checkContext" :rules="rule" ref="speciala" :model="speciala">
               <el-form-item label="预约类型" :label-width="formLabelWidth" prop="appointType">
                <el-select v-model="speciala.appointType" placeholder="请选择">
                  <el-option label="上课" value=2></el-option>
                  <el-option label="校队" value=3></el-option>
                  <el-option label="比赛" value=4></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="学工号" :label-width="formLabelWidth" prop="std">
                    <el-input v-model.number="speciala.std" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
                    <el-input v-model="speciala.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="联系方式" :label-width="formLabelWidth" prop="phone">
                    <el-input v-model.number="speciala.phone" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="场地类型" :label-width="formLabelWidth" prop="type">
                <el-select v-model="speciala.type" placeholder="请选择" @change="choose_type(1)">
                  <el-option label="羽毛球场" value=0></el-option>
                  <el-option label="兵乓球场" value=1></el-option>
                  <el-option label="台球场" value=2></el-option>
                  <el-option label="篮球场" value=3></el-option>
                  <el-option label="保龄球场" value=4></el-option>
                </el-select>
              </el-form-item>  
              <el-form-item label="场地名称" :label-width="formLabelWidth" v-show="this.specialName" prop="pname">
                <el-select v-model="speciala.pname" placeholder="请选择">
                  <el-option :value="item.placeName" :label="item.placeName" v-for="(item,i) in speciala_name" :key="i"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="日期" :label-width="formLabelWidth" prop="day">
                <el-select v-model="speciala.day" placeholder="请选择">
                  <el-option label="星期一" value=1></el-option>
                  <el-option label="星期二" value=2></el-option>
                  <el-option label="星期三" value=3></el-option>
                  <el-option label="星期四" value=4></el-option>
                  <el-option label="星期五" value=5></el-option>
                  <el-option label="星期六" value=6></el-option>
                  <el-option label="星期日" value=7></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="时间" :label-width="formLabelWidth" prop="time">
                <el-select v-model="speciala.time" placeholder="请选择">
                  <el-option label="8:00~10:00" value="8:00~10:00"></el-option>
                  <el-option label="10:00~12:00" value="10:00~12:00"></el-option>
                  <el-option label="14:00~16:00" value="14:00~16:00"></el-option>
                  <el-option label="16:00~18:00" value="16:00~18:00"></el-option>
                  <el-option label="18:00~20:00" value="18:00~20:00"></el-option>
                  <el-option label="20:00~22:00" value="20:00~22:00"></el-option>
                </el-select>
              </el-form-item>           
              <el-form-item>
                <el-button type="primary" @click="special('speciala')">提交</el-button>
              </el-form-item>
            </el-form>
          </div>
          <!-- 我的预约 -->
          <div  v-show="this.flag.my">
            <el-table
              :data="my"
              style="width: 100%">             
              <el-table-column
                prop="username"
                label="姓名"
                width="150">
              </el-table-column>
              <el-table-column
                prop="userNumber"
                label="一卡通号码"
                width="200">
              </el-table-column>
              <el-table-column
                prop="phone"
                label="联系方式"
                width="200">
              </el-table-column>
              <el-table-column
                prop="type"
                label="场地类型"
                width="150"
                >
              </el-table-column>
              <el-table-column
                prop="placeName"
                label="场地名称"
                width="150"
                >
              </el-table-column>
              <el-table-column
                prop="week"
                label="租用日期"
                width="100"
                >
              </el-table-column>
              <el-table-column
                prop="timeZone"
                label="租用时间"
                width="150"
                >
              </el-table-column>               
              <el-table-column label="操作">
                <template slot-scope="scope">                 
                  <el-button
                    size="mini"
                    type="success"
                    @click.stop="change(scope.row.id)">修改</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    @click.stop="retreat(scope.row)">退订</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>

          <el-dialog title="修改预约" :visible.sync="updateVisible">
            <el-form :model="update_form" class="checkContext" :rules="rule" ref="update_form">
              <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
                <el-input v-model="update_form.username" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="联系方式" :label-width="formLabelWidth" prop="phone">
                <el-input v-model="update_form.phone" autocomplete="off"></el-input>
              </el-form-item>             
            </el-form>                       
            <div slot="footer" class="dialog-footer">
              <el-button @click="updateVisible = false">取 消</el-button>
              <el-button type="primary" @click="update_appoint('update_form')">提 交</el-button>
            </div>
          </el-dialog>
        </div>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios';
import {appointPlace,placeType,appointInfo,modifyAppoint,cancelAppoint,appointSpecial} from '@/API/api'
export default {
    data(){
        return{
            isShow:true,
            flag:{
                personal:true,
                special:false,
                my:false,
            },
            formLabelWidth: '120px',
            now:"personal",
            personala:{
                std:null,
                name:null,
                phone:null,
                type:null,
                pname:null,
                day:null,
                time:null
            },
            speciala:{
                std:null,
                name:null,
                phone:null,
                type:null,
                name:null,
                day:null,
                time:null,
                appointType:null
            },
            my:[],
            key:"personal",
            week:["星期一","星期二","星期三","星期四","星期五","星期六","星期日"],
            placeName:false,
            specialName:false,
            place_name:[],
            updateVisible:false,
            speciala_name:[],
            update_form:{
              phone:null,
              username:null,
              id:null
            },
            rule:{
              username:[
                  { required: true, message: '请输入名字', trigger: 'blur' },
              ],
              appointType:[
                  { required: true, message: '请选择预约类型', trigger: 'change' }
              ],
              type:[
                  { required: true, message: '请选择场地类型', trigger: 'change' }
              ],
              std:[
                  { required: true, message: '请输入学号', trigger: 'blur' },
                  { pattern: /(\d){12}/, message: '学工号格式不正确',trigger: 'blur'},
                  { type: 'number', message: '该项必须为数字值'},
              ],
              name:[
                  { required: true, message: '请输入名字', trigger: 'blur' },
              ],
              phone:[
                  { required: true, message: '请输入手机号', trigger: 'blur' },
                  { type: 'number', message: '该项必须为数字值'},
                  { pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/, message: '手机号格式不正确',trigger: 'blur'} 
              ],
              pname:[
                  { required: true, message: '请选择场地名称', trigger: 'change' }
              ],
              day:[
                  { required: true, message: '请选择日期', trigger: 'change' }
              ],
              time:[
                  { required: true, message: '请选择时间', trigger: 'change' }
              ]
            },
            types:["羽毛球场","兵乓球场","台球场","篮球场","保龄球场"],
        }
    },
    created(){
      this.getRole();
    },
    methods:{
        //获取角色
        getRole(){
          if(sessionStorage.getItem("role")=='ROLE_user'){
            this.isShow=false;
          };
        },
        // 个人预约
        async personal(formName){
          this.$refs[formName].validate((valid) => {
          if (valid) {
            let params=new FormData();
            params.append("appointType",1)
            params.append("placeType",this.personala.type)
            params.append("username",this.personala.name)
            params.append("phone",this.personala.phone)
            params.append("userNumber",this.personala.std)
            params.append("placeName",this.personala.pname)
            params.append("week",this.personala.day)
            params.append("timeZone",this.personala.time)
            appointPlace(params).then(
              data=>{
                console.log(data);
                if(data.code==200){
                  this.$message({
                    message: '预约成功',
                    type: 'success'
                  });
                }else if(data.code==500){
                  this.$message.error('该场地'+data.title+'请预约其他');
                }
                else{
                  this.$message.error('预约失败，请重试');
                } 
              }
            )
          } else {
            return false;
          }
        });
        },
        async choose_type(i){
          let params=new FormData();
          if(i==0){
            params.append("placeType",this.personala.type)
             let data=await placeType(params)          
             this.place_name=data.datas;
             this.placeName=true
          }else{
            console.log(1);
            params.append("placeType",this.speciala.type)
            let data=await placeType(params) 
            this.speciala_name=data.datas;
            console.log(data); 
            this.specialName=true
          } 
          
        },
        // 特殊预约
        async special(formName){
          this.$refs[formName].validate((valid) => {
          if (valid) {
            let params=new FormData();
            params.append("appointType",this.speciala.appointType)
            params.append("placeType",this.speciala.type)
            params.append("adminName",this.speciala.name)
            params.append("adminNumber",this.speciala.std)
            params.append("phone",this.speciala.phone)
            params.append("placeName",this.speciala.pname)
            params.append("week",this.speciala.day)
            params.append("timeZone",this.speciala.time)
            appointSpecial(params).then(
              data=>{
                if(data.code==200){
                  this.$message({
                    message: '预约成功',
                    type: 'success'
                  });
                }else if(data.code==500){
                  this.$message.error('该场地'+data.title+'请预约其他');
                }
                else{
                  this.$message.error('预约失败，请重试');
                } 
              }
            )
          } else {
            return false;
          }
        });
        },
        // 查询我的预约信息
        async my_info(){
          let params=new FormData();
          let userNumber=sessionStorage.getItem("userNumber");
          console.log(userNumber);
          params.append("userNumber",userNumber)
          let data=await appointInfo(params) 
          this.my=data.datas;
          for(let i=0;i<this.my.length;i++){
            this.my[i].week=this.week[this.my[i].week-1]
            Object.assign(this.my[i],{"type":this.types[this.my[i].placeType]})
          }
        },
        show(){
            if(this.now=='my'){
              this.my_info();
            }
            this.flag[this.key]=false;
            this.flag[this.now]=true;
            this.key=this.now;           
        },
        return_ap(){
          this.$router.push('/place')
        },
        // 修改预约
        async update_appoint(formName){
           this.$refs[formName].validate((valid) => {
            if (valid) {
              let params=new FormData();
              params.append("appointId",this.update_form.id)
              params.append("username",this.update_form.username)
              params.append("phone",this.update_form.phone)
             modifyAppoint(params).then(
               data=>{
                 if(data.code==200){
                  this.$message({
                    message: '修改成功',
                    type: 'success'
                  });
                  this.my_info();
                  this.updateVisible=false;                 
                }else{
                  this.$message.error('修改失败，请重试');
                } 
               }
             )
            } else {
              return false;
            }
          });
         
          
          // console.log(data);
        },
        change(id){
          this.update_form.id=id;
          this.updateVisible=true;
        },
        // 取消预约
        retreat(row){
          this.$confirm('是否确定取消预约?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params=new FormData();
          params.append("appointId",row.id)
          params.append("placeName",row.placeName)
          params.append("placeType",row.placeType)
          cancelAppoint(params).then(
            res=>{
              console.log(res);
              if(res.code==200){
                this.my_info();
                this.$message({
                  type: 'success',
                  message: '已成功取消!'
                });
              }else{
                this.$message({
                  type: 'info',
                  message: '取消失败！请重试'
                }); 
              }
            }
          )                    
        })
        }
    }
}
</script>

<style scoped>
.place_appointment,.box-card {
    width: 100%;
    height: 100%;
}
.container{
  margin: 0px 30px;
}
.ap-nav{
  text-align: right;
  margin-bottom: 30px;
}
.ap-nav .el-button{
  margin-right: 20px;
}
.checkContext{
  text-align: left;
}
.checkContext .el-input,.checkContext .el-select{
  width: 400px;
  margin-left: 30px;
}
.checkContext .el-button{
  margin-top: 20px;
}
.return{
  text-align: right;
  margin: 0px 20px 20px 20px;
}
</style>>