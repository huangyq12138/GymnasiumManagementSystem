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
            <el-radio-button label='special'>特殊预约</el-radio-button>
            <el-radio-button label='my'>我的预约</el-radio-button>
          </el-radio-group>
          </div>
          <!-- 个人预约 -->
          <div  v-show="this.flag.personal">
            <el-form  label-width="80px" class="checkContext" ref="personala" :model="personala">
              <el-form-item label="学号" :label-width="formLabelWidth">
                    <el-input v-model="personala.std" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="姓名" :label-width="formLabelWidth">
                    <el-input v-model="personala.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="联系方式" :label-width="formLabelWidth">
                    <el-input v-model="personala.phone" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="场地类型" :label-width="formLabelWidth">
<<<<<<< HEAD
                <el-select v-model="personala.type" placeholder="请选择场地">
=======
                <el-select v-model="personala.type" placeholder="请选择场地" @change="choose_type">
>>>>>>> xq
                  <el-option label="羽毛球场" value=0></el-option>
                  <el-option label="兵乓球场" value=1></el-option>
                  <el-option label="台球场" value=2></el-option>
                  <el-option label="篮球场" value=3></el-option>
                  <el-option label="保龄球场" value=4></el-option>
                </el-select>
              </el-form-item>
<<<<<<< HEAD
              <el-form-item label="场地名称" :label-width="formLabelWidth">
                <el-select v-model="personala.pname" placeholder="羽毛球场A">
                  <el-option label="羽毛球场A" value=1></el-option>
                  <el-option label="兵乓球场" value=2></el-option>
=======
              <el-form-item label="场地名称" :label-width="formLabelWidth" v-show="this.placeName">
                <el-select v-model="personala.pname" placeholder="请选择">
                  <el-option :value="item.placeName" :label="item.placeName" v-for="(item,i) in place_name" :key="i"></el-option>
>>>>>>> xq
                </el-select>
              </el-form-item>
              <el-form-item label="日期" :label-width="formLabelWidth">
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
              <el-form-item label="时间" :label-width="formLabelWidth">
                <el-select v-model="personala.time" placeholder="请选择">
<<<<<<< HEAD
                  <el-option label="星期一" value=1></el-option>
                  <el-option label="星期二" value=2></el-option>
                  <el-option label="星期三" value=3></el-option>
                  <el-option label="星期四" value=4></el-option>
                  <el-option label="星期五" value=5></el-option>
                  <el-option label="星期六" value=6></el-option>
                  <el-option label="星期日" value=7></el-option>
=======
                  <el-option label="8：00~10：00" value="8:00~10:00"></el-option>
                  <el-option label="10：00~12：00" value="10:00~12:00"></el-option>
                  <el-option label="14：00~16：00" value="14:00~16:00"></el-option>
                  <el-option label="16：00~18：00" value="16:00~18:00"></el-option>
                  <el-option label="18：00~20：00" value="18:00~20:00"></el-option>
                  <el-option label="20：00~22：00" value="20:00~22:00"></el-option>
>>>>>>> xq
                </el-select>
              </el-form-item>            
              <el-form-item>
                <el-button type="primary" @click="personal">提交</el-button>
              </el-form-item>
            </el-form>
          </div>          
          <!-- 特殊预约 -->
          <div v-show="this.flag.special">
            <el-form  label-width="80px" class="checkContext"  ref="speciala" :model="speciala">
              <el-form-item label="场地类型" :label-width="formLabelWidth">
                <el-select v-model="speciala.type" placeholder="羽毛球场">
                  <el-option label="羽毛球场" value=0></el-option>
                  <el-option label="兵乓球场" value=1></el-option>
                  <el-option label="台球场" value=2></el-option>
                  <el-option label="篮球场" value=3></el-option>
                  <el-option label="保龄球场" value=4></el-option>
                </el-select>
              </el-form-item>  
              <el-form-item label="场地名称" :label-width="formLabelWidth">
                <el-select v-model="speciala.name" placeholder="羽毛球场A">
                  <el-option label="羽毛球场A" value=1></el-option>
                  <el-option label="兵乓球场" value=2></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="日期" :label-width="formLabelWidth">
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
              <el-form-item label="时间" :label-width="formLabelWidth">
                <el-select v-model="speciala.time" placeholder="请选择">
<<<<<<< HEAD
                  <el-option label="星期一" value=1></el-option>
                  <el-option label="星期二" value=2></el-option>
                  <el-option label="星期三" value=3></el-option>
                  <el-option label="星期四" value=4></el-option>
                  <el-option label="星期五" value=5></el-option>
                  <el-option label="星期六" value=6></el-option>
                  <el-option label="星期日" value=7></el-option>
=======
                  <el-option label="8：00~10：00" value="8:00~10:00"></el-option>
                  <el-option label="10：00~12：00" value="10:00~12:00"></el-option>
                  <el-option label="14：00~16：00" value="14:00~16:00"></el-option>
                  <el-option label="16：00~18：00" value="16:00~18:00"></el-option>
                  <el-option label="18：00~20：00" value="18:00~20:00"></el-option>
                  <el-option label="20：00~22：00" value="20:00~22:00"></el-option>
>>>>>>> xq
                </el-select>
              </el-form-item>           
              <el-form-item>
                <el-button type="primary" @click="special">提交</el-button>
              </el-form-item>
            </el-form>
          </div>
          <!-- 我的预约 -->
          <div  v-show="this.flag.my">
            <el-table
              :data="my"
              border
              style="width: 100%">             
              <el-table-column
<<<<<<< HEAD
                prop="name"
=======
                prop="username"
>>>>>>> xq
                label="姓名"
                width="150">
              </el-table-column>
              <el-table-column
<<<<<<< HEAD
                prop="std"
=======
                prop="userNumber"
>>>>>>> xq
                label="一卡通号码"
                width="200">
              </el-table-column>
              <el-table-column
                prop="phone"
                label="联系方式"
                width="200">
              </el-table-column>
              <el-table-column
<<<<<<< HEAD
                prop="type"
=======
                prop="placeType"
>>>>>>> xq
                label="场地类型"
                width="150"
                >
              </el-table-column>
              <el-table-column
<<<<<<< HEAD
                prop="pname"
=======
                prop="placeName"
>>>>>>> xq
                label="场地名称"
                width="150"
                >
              </el-table-column>
              <el-table-column
<<<<<<< HEAD
                prop="day"
                label="租用日期"
                width="150"
                >
              </el-table-column>
              <el-table-column
                prop="time"
                label="租用时长"
=======
                prop="week"
                label="租用日期"
                width="100"
                >
              </el-table-column>
              <el-table-column
                prop="timeZone"
                label="租用时间"
>>>>>>> xq
                width="150"
                >
              </el-table-column>               
              <el-table-column label="操作">
                <template slot-scope="scope">                 
                  <el-button
                    size="mini"
                    type="success"
<<<<<<< HEAD
                    @click.stop="change(scope.$index, scope.row,scope.row.id)">修改</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    @click.stop="retreat(scope.$index, scope.row,scope.row.id)">退订</el-button>
=======
                    @click.stop="change(scope.row)">修改</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    @click.stop="retreat(scope.row)">退订</el-button>
>>>>>>> xq
                </template>
              </el-table-column>
            </el-table>
          </div>
<<<<<<< HEAD
=======

          <el-dialog title="修改预约" :visible.sync="updateVisible">
            <el-form :model="update_form" class="checkContext">
              <el-form-item label="用户名" :label-width="formLabelWidth">
                <el-input v-model="update_form.username" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="联系方式" :label-width="formLabelWidth">
                <el-input v-model="update_form.phone" autocomplete="off"></el-input>
              </el-form-item>             
            </el-form>                       
            <div slot="footer" class="dialog-footer">
              <el-button @click="updateVisible = false">取 消</el-button>
              <el-button type="primary" @click="update_appoint">提 交</el-button>
            </div>
          </el-dialog>
>>>>>>> xq
        </div>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios';
<<<<<<< HEAD
import {appointPlace} from '@/API/api'
=======
import {appointPlace,placeType,appointInfo,modifyAppoint,cancelAppoint,appointSpecial} from '@/API/api'
>>>>>>> xq
export default {
    data(){
        return{
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
                type:null,
                name:null,
                day:null,
                time:null
            },
<<<<<<< HEAD
            my:[
                {
                    name:"张三",
                    std:"201811001111",
                    phone:"12754733520",
                    type:"篮球场",
                    pname:"篮球场a",
                    day:"星期一",
                    time:"8：00-10：00",

                }
            ],
            key:"personal"
=======
            my:[],
            key:"personal",
            week:["星期一","星期二","星期三","星期四","星期五","星期六","星期日"],
            placeName:false,
            place_name:[],
            updateVisible:false,
            update_form:{
              phone:null,
              username:null
            }
>>>>>>> xq
        }
    },
    methods:{
        // 个人预约
<<<<<<< HEAD
        personal(){
          let params=new FormData();
          // params.append("placeType",this.standardm.type)
          // params.append("timeZone",this.standardm.time)
          // params.append("week",this.standardm.day)
          // let data=await appointPlace(params) 
          // console.log(data);
        },
        // 特殊预约
        special(){

        },
        show(){
            this.flag[this.key]=false;
            this.flag[this.now]=true;
            this.key=this.now;
=======
        async personal(){
          let params=new FormData();
          params.append("appointType",0)
          params.append("placeType",this.personala.type)
          params.append("username",this.personala.name)
          params.append("phone",this.personala.phone)
          params.append("userNumber",this.personala.std)
          params.append("placeName",this.personala.pname)
          params.append("week",this.personala.day)
          params.append("timeZone",this.personala.time)
          let data=await appointPlace(params)
          if(data.code==200){
            this.$message({
              message: '预约成功',
              type: 'success'
            });
          }else{
            this.$message.error('预约失败，请重试');
          } 
          console.log(data);
        },
        async choose_type(){
          let params=new FormData();
          params.append("placeType",this.personala.type)
          let data=await placeType(params)          
          this.place_name=data.datas;
          this.placeName=true
        },
        // 特殊预约
        special(){
          let params=new FormData();
          params.append("appointType",0)
          params.append("placeType",this.personala.type)
          params.append("username",this.personala.name)
          params.append("phone",this.personala.phone)
          params.append("userNumber",this.personala.std)
          params.append("placeName",this.personala.pname)
          params.append("week",this.personala.day)
          params.append("timeZone",this.personala.time)
          let data=await appointSpecial(params)
          if(data.code==200){
            this.$message({
              message: '预约成功',
              type: 'success'
            });
          }else{
            this.$message.error('预约失败，请重试');
          } 
          console.log(data);
        },
        // 查询我的预约信息
        async my_info(){
          let params=new FormData();
          params.append("userNumber",1)
          let data=await appointInfo(params) 
          this.my=data.datas;
          for(let i=0;i<this.my.length;i++){
            this.my[i].week=this.week[this.my[i].week-1]
          }
          console.log(data);
        },
        show(){
            if(this.now=='my'){
              this.my_info();
            }
            this.flag[this.key]=false;
            this.flag[this.now]=true;
            this.key=this.now;           
>>>>>>> xq
        },
        return_ap(){
          this.$router.push('/place')
        },
<<<<<<< HEAD
        change(i,row,id){

        },
        retreat(i,row,id){

=======
        // 修改预约
        async update_appoint(){
          let params=new FormData();
          // params.append("appointId",13)
          params.append("appointId",this.update_form.appointId)
          params.append("username",this.update_form.username)
          params.append("phone",this.update_form.phone)
          let data=await modifyAppoint(params)
          if(data.code==200){
            this.$message({
              message: '预约成功',
              type: 'success'
            });
            this.updateVisible=false;
          }else{
            this.$message.error('预约失败，请重试');
          } 
          // console.log(data);
        },
        change(row){
          this.update_form=row;
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
          // params.append("appointId",13)
          params.append("appointId",row.appointId)
          console.log(row);
          params.append("placeName",row.placeName)
          params.append("placeType",row.placeType)
          // params.append("placeType",0)
          cancelAppoint(params).then(
            res=>{
              if(res.code==200){
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
>>>>>>> xq
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
  margin: 50px 30px;
}
.ap-nav{
  text-align: right;
  margin-bottom: 50px;
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
<<<<<<< HEAD
  margin-top: 50px;
=======
  margin-top: 20px;
>>>>>>> xq
}
.return{
  text-align: right;
  margin: 0px 20px 40px 20px;
}
</style>>