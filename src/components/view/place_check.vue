<template>
  <div class="place_inquiry">
    <el-card class="box-card">
        <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/User' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/place' }">场地管理</el-breadcrumb-item>
        <el-breadcrumb-item >场地查询</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="return">
            <el-button type="success" @click="return_pl" >返回</el-button>
          </div>
        <div class="container">      
          <div class="pl-nav">
            <el-radio-group v-model="now" @change="show">
              <el-radio-button label='type'>类型名称查询</el-radio-button>
              <el-radio-button label='free_field'>空闲场地</el-radio-button>
              <el-radio-button label='free_time'>空闲时间</el-radio-button>
              <el-radio-button label='fielf_detail'>场地详细</el-radio-button>
              <el-radio-button label='standard'>收费标准</el-radio-button>
            </el-radio-group>             
          </div>
          <!-- 类型查询 -->
          <div  v-show="this.flag.type">
            <el-form  label-width="80px" class="checkContext">
              <el-form-item label="场地类型" :label-width="formLabelWidth">
                <el-select v-model="place_type" placeholder="请选择场地">
                  <el-option label="羽毛球场" value=0></el-option>
                  <el-option label="兵乓球场" value=1></el-option>
                  <el-option label="台球场" value=2></el-option>
                  <el-option label="篮球场" value=3></el-option>
                  <el-option label="保龄球场" value=4></el-option>
                </el-select>
              </el-form-item>           
              <el-form-item>
                <el-button type="primary" @click="check_type">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
          <!-- 类型查询结果 -->
          <el-dialog title="查询结果" :visible.sync="type_check">
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
                  prop="placeName"
                  label="场地名称">
                </el-table-column> 
                <el-table-column label="操作" width="100">
                  <template slot-scope="scope">                 
                    <el-button
                      size="mini"
                      type="danger"
                      @click.stop="handleDelete(scope.row)">删除</el-button>
                  </template>
                </el-table-column>            
              </el-table>
          </el-dialog>

          <!-- 空闲场地 -->
          <div v-show="this.flag.free_field">
            <el-form  label-width="80px" class="checkContext"  ref="freeField" :model="freeField">
              <el-form-item label="场地类型" :label-width="formLabelWidth">
                <el-select v-model="freeField.type" placeholder="请选择">
                  <el-option label="羽毛球场" value=0></el-option>
                  <el-option label="兵乓球场" value=1></el-option>
                  <el-option label="台球场" value=2></el-option>
                  <el-option label="篮球场" value=3></el-option>
                  <el-option label="保龄球场" value=4></el-option>
                </el-select>
              </el-form-item>  
              <el-form-item label="日期" :label-width="formLabelWidth">
                <el-select v-model="freeField.day" placeholder="请选择">
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
                <el-select v-model="freeField.time" placeholder="请选择">
                  <el-option label="8：00~10：00" value="8：00~10：00"></el-option>
                  <el-option label="10：00~12：00" value="10：00~12：00"></el-option>
                  <el-option label="14：00~16：00" value="14：00~16：00"></el-option>
                  <el-option label="16：00~18：00" value="16：00~18：00"></el-option>
                  <el-option label="18：00~20：00" value="18：00~20：00"></el-option>
                  <el-option label="20：00~22：00" value="20：00~22：00"></el-option>
                </el-select>
              </el-form-item>           
              <el-form-item>
                <el-button type="primary" @click="check_place">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
          <!-- 空闲场地查询结果 -->
          <el-dialog title="查询结果" :visible.sync="free_field_check">
              <el-table
                :data="free_field_data"
                border
                style="width: 100%">
                <el-table-column
                  type="index"
                  label="序号"
                  width="200">
                </el-table-column>
                <el-table-column
                  prop="placeName"
                  label="场地名称">
                </el-table-column>                             
              </el-table>
          </el-dialog>

          <!-- 空闲时间 -->
          <div  v-show="this.flag.free_time">
            <el-form  label-width="80px" class="checkContext"  ref="freeTime" :model="freeTime">
              <el-form-item label="场地类型" :label-width="formLabelWidth">
                <el-select v-model="freeTime.type" placeholder="请选择" @change="choose_type">
                  <el-option label="羽毛球场" value=0></el-option>
                  <el-option label="兵乓球场" value=1></el-option>
                  <el-option label="台球场" value=2></el-option>
                  <el-option label="篮球场" value=3></el-option>
                  <el-option label="保龄球场" value=4></el-option>
                </el-select>
              </el-form-item>  
              <el-form-item label="场地名称" :label-width="formLabelWidth" v-show="this.freeTimeName">
                <el-select v-model="freeTime.name" placeholder="请选择">
                  <el-option :value="item.placeName" :label="item.placeName" v-for="(item,i) in free_time_name" :key="i"></el-option>
                </el-select>
              </el-form-item>                   
              <el-form-item>
                <el-button type="primary" @click="free_time">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
          <!-- 空闲时间查询结果 -->
          <el-dialog title="查询结果" :visible.sync="free_time_check">
              <el-table
                :data="free_time_data"
                border
                style="width: 100%">
                <el-table-column
                  type="index"
                  label="序号"
                  width="200">
                </el-table-column>
                <el-table-column
                  prop="week"                  
                  label="日期">
                  <!-- <template slot-scope="scope">
                    <span>{{this.week[scope.row.week+1]}}</span>
                  </template> -->
                </el-table-column>    
                <el-table-column
                  prop="timeZone"
                  label="时间">
                </el-table-column>                         
              </el-table>
          </el-dialog> 

          <!-- 场地详细 -->
          <div v-show="this.flag.fielf_detail">
            <el-form  label-width="80px" class="checkContext"  ref="freeDetail" :model="freeDetail">
              <el-form-item label="场地类型" :label-width="formLabelWidth">
<<<<<<< HEAD
                <el-select v-model="freeDetail.placeType" placeholder="羽毛球场" @change="choose_type">
=======
                <el-select v-model="freeDetail.placeType" placeholder="请选择" @change="choose_type1">
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
                <el-select v-model="freeDetail.placeName" placeholder="羽毛球场A">
                  <el-option label="羽毛球场A" value=1></el-option>
                  <el-option label="兵乓球场" value=2></el-option>
=======
              <el-form-item label="场地名称" :label-width="formLabelWidth" v-show="this.weekTimeName">
                <el-select v-model="freeDetail.placeName" placeholder="请选择">
                  <el-option :value="item.placeName" :label="item.placeName" v-for="(item,i) in week_time_name" :key="i"></el-option>
>>>>>>> xq
                </el-select>
              </el-form-item>
              <el-form-item label="日期" :label-width="formLabelWidth">
                <el-select v-model="freeDetail.day" placeholder="请选择">
                  <el-option label="星期一" value=1></el-option>
                  <el-option label="星期二" value=2></el-option>
                  <el-option label="星期三" value=3></el-option>
                  <el-option label="星期四" value=4></el-option>
                  <el-option label="星期五" value=5></el-option>
                  <el-option label="星期六" value=6></el-option>
                  <el-option label="星期日" value=7></el-option>
                </el-select>
<<<<<<< HEAD
              </el-form-item>
              <el-form-item label="时间" :label-width="formLabelWidth">
                <el-select v-model="freeDetail.time" placeholder="请选择">
                  <el-option label="8：00~10：00" value="8：00~10：00"></el-option>
                  <el-option label="10：00~12：00" value="10：00~12：00"></el-option>
                  <el-option label="14：00~16：00" value="14：00~16：00"></el-option>
                  <el-option label="16：00~18：00" value="16：00~18：00"></el-option>
                  <el-option label="18：00~20：00" value="18：00~20：00"></el-option>
                  <el-option label="20：00~22：00" value="20：00~22：00"></el-option>
                </el-select>
              </el-form-item>                       
              <el-form-item>
                <el-button type="primary" @click="free_time">查询</el-button>
=======
              </el-form-item>                     
              <el-form-item>
                <el-button type="primary" @click="week_time">查询</el-button>
>>>>>>> xq
              </el-form-item>
            </el-form>
          </div>
          <el-dialog title="查询结果" :visible.sync="week_time_check">
              <el-table
                :data="week_time_data"
                border
                style="width: 100%">
                <el-table-column
                  type="index"
                  label="序号"
                  width="200">
<<<<<<< HEAD
                </el-table-column>
                <el-table-column
                  prop="week"                  
                  label="日期">
                  <!-- <template slot-scope="scope">
                    <span>{{this.week[scope.row.week+1]}}</span>
                  </template> -->
                </el-table-column>    
                <el-table-column
                  prop="timeZone"
                  label="时间">
=======
                </el-table-column>                   
                <el-table-column
                  prop="timeZone"
                  label="时间">
                </el-table-column>
                <el-table-column
                  prop="timeLong"
                  label="状态">
>>>>>>> xq
                </el-table-column>                         
              </el-table>
          </el-dialog>

          <!-- 收费标准 -->
          <div  v-show="this.flag.standard">
            <el-form  label-width="80px" class="checkContext"  ref="standardm" :model="standardm">
              <el-form-item label="场地类型" :label-width="formLabelWidth">
                <el-select v-model="standardm.type" placeholder="羽毛球场">
                  <el-option label="羽毛球场" value=0></el-option>
                  <el-option label="兵乓球场" value=1></el-option>
                  <el-option label="台球场" value=2></el-option>
                  <el-option label="篮球场" value=3></el-option>
                  <el-option label="保龄球场" value=4></el-option>
                </el-select>
              </el-form-item>  
              <el-form-item label="日期" :label-width="formLabelWidth">
                <el-select v-model="standardm.day" placeholder="请选择">
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
                <el-select v-model="standardm.time" placeholder="请选择">
                  <el-option label="8：00~10：00" value="8：00~10：00"></el-option>
                  <el-option label="10：00~12：00" value="10：00~12：00"></el-option>
                  <el-option label="14：00~16：00" value="14：00~16：00"></el-option>
                  <el-option label="16：00~18：00" value="16：00~18：00"></el-option>
                  <el-option label="18：00~20：00" value="18：00~20：00"></el-option>
                  <el-option label="20：00~22：00" value="20：00~22：00"></el-option>
                </el-select>
              </el-form-item>           
              <el-form-item>
                <el-button type="primary" @click="place_standard">查询</el-button>
              </el-form-item>
            </el-form>
          </div>         
        </div>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios';
import {placeType,placeDelete,placeFree,freeTime,weekTime,placeStandard} from '@/API/api'
export default {
    data(){
        return{
            flag:{
                type:true,
                free_field:false,
                free_time:false,
                fielf_detail:false,
                standard:false
            },
            place_type:null,
            freeField:{
                type:null,
                day:null,
                time:null
            },
            freeTime:{
                type:null,
                name:null
            },
            freeDetail:{
                type:null,
                name:null,
                day:null,
<<<<<<< HEAD
                time:null
=======
>>>>>>> xq
            },
            standardm:{
                type:null,
                day:null,
                time:null
            },
            formLabelWidth: '120px',
            now:"type",
            key:"type",
            type_data:[],
            type_check:false,
            free_field_check:false,
            free_field_data:[],
            free_time_name:[],
            freeTimeName:false,
<<<<<<< HEAD
=======
            weekTimeName:false,
>>>>>>> xq
            free_time_check:false,
            free_time_data:[],
            week:["星期一","星期二","星期三","星期四","星期五","星期六","星期日"],
            week_time_check:false,
            week_time_data:[],
<<<<<<< HEAD
=======
            week_time_name:[],
>>>>>>> xq
        }
    },
    methods:{
        show(){
            this.flag[this.key]=false;
            this.flag[this.now]=true;            
            this.key=this.now;
        },
        // 获得场地名称
        async check_type(){
          let params=new FormData();
          params.append("placeType",this.place_type)
          let data=await placeType(params)
          this.type_data=data.datas;
          this.type_check=true;         
        },
        // 删除场地
        handleDelete(row){
          let that=this;
          this.$confirm('确定删除该场地?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params=new FormData();
          params.append("id",row.id)
          params.append("placeName",row.placeName)
          params.append("placeType",that.place_type)
          placeDelete(params).then(res=>{
            console.log(res);
            if(res.code==200){
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              that.type_check=false;
            }else{
              this.$message({
                type: 'info',
                message: '删除失败,'+res.message
              }); 
            }
          })
          
        })
        },
        // 空闲场地查询
        async check_place(){
          let params=new FormData();
          params.append("placeType",this.freeField.type)
          params.append("timeZone",this.freeField.time)
          params.append("week",this.freeField.day)
          let data=await placeFree(params)
          this.free_field_data=data.datas;
          this.free_field_check=true;   
        },
        // 返回
        return_pl(){
          this.$router.push('/place')
        },
        // 空闲时间查询 获取具体名称
        async choose_type(){
          let params=new FormData();
          params.append("placeType",this.freeTime.type)
          let data=await placeType(params)
          this.free_time_name=data.datas;
          this.freeTimeName=true
        },
<<<<<<< HEAD
        // 
        async free_time(){
          let params=new FormData();
          params.append("type",this.freeTime.type)
          params.append("placeName",this.freeTime.name)
          let data=await weekTime(params) 
          console.log(data);      
          // this.free_time_data=data.enabledTime;
          // for(let i=0;i<this.free_time_data.length;i++){
          //   this.free_time_data[i].week=this.week[this.free_time_data[i].week-1]
          // }
          // this.free_time_check=true;  
=======
        async choose_type1(){
          let params=new FormData();
          params.append("placeType",this.freeDetail.placeType)
          let data=await placeType(params)
          this.week_time_name=data.datas;
          this.weekTimeName=true
        },
        // 
        async free_time(){
          let params=new FormData();
          params.append("placeType",this.freeTime.type)
          params.append("placeName",this.freeTime.name)
          console.log(this.freeTime.type,this.freeTime.name);
          let data=await freeTime(params) 
          console.log(data);      
          this.free_time_data=data.datas;
          for(let i=0;i<this.free_time_data.length;i++){
            this.free_time_data[i].week=this.week[this.free_time_data[i].week-1]
          }
          this.free_time_check=true;  
        },
        async week_time(){
          let params=new FormData();
          params.append("placeType",this.freeDetail.placeType)
          params.append("placeName",this.freeDetail.placeName)
           params.append("week",this.freeDetail.day)
          let data=await weekTime(params) 
          console.log(data);      
          this.week_time_data=data.enabledTime;
          this.week_time_check=true;  
>>>>>>> xq
        },
        // 收费标准查询
        async place_standard(){
          let params=new FormData();
          params.append("placeType",this.standardm.type)
          params.append("timeZone",this.standardm.time)
          params.append("week",this.standardm.day)
          let data=await placeStandard(params) 
<<<<<<< HEAD
          console.log(data);
          this.$alert("20元", '价钱', {
=======
          // console.log(data);
          this.$alert(data.data+"元", '价钱', {
>>>>>>> xq
          confirmButtonText: '确定',          
        });
        }
    }
}
</script>

<style scoped>
.place_inquiry,.box-card {
    width: 100%;
    height: 100%;
}
.container{
  margin: 50px 30px;
}
.pl-nav{
  text-align: right;
  margin-bottom: 50px;
}
.pl-nav .el-button{
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
  margin-top: 50px;
}
.return{
  text-align: right;
  margin: 0px 20px 40px 20px;
}
</style>>
