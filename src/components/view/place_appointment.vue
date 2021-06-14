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
                <el-select v-model="personala.type" placeholder="请选择场地">
                  <el-option label="羽毛球场" value=0></el-option>
                  <el-option label="兵乓球场" value=1></el-option>
                  <el-option label="台球场" value=2></el-option>
                  <el-option label="篮球场" value=3></el-option>
                  <el-option label="保龄球场" value=4></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="场地名称" :label-width="formLabelWidth">
                <el-select v-model="personala.pname" placeholder="羽毛球场A">
                  <el-option label="羽毛球场A" value=1></el-option>
                  <el-option label="兵乓球场" value=2></el-option>
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
                  <el-option label="星期一" value=1></el-option>
                  <el-option label="星期二" value=2></el-option>
                  <el-option label="星期三" value=3></el-option>
                  <el-option label="星期四" value=4></el-option>
                  <el-option label="星期五" value=5></el-option>
                  <el-option label="星期六" value=6></el-option>
                  <el-option label="星期日" value=7></el-option>
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
                  <el-option label="星期一" value=1></el-option>
                  <el-option label="星期二" value=2></el-option>
                  <el-option label="星期三" value=3></el-option>
                  <el-option label="星期四" value=4></el-option>
                  <el-option label="星期五" value=5></el-option>
                  <el-option label="星期六" value=6></el-option>
                  <el-option label="星期日" value=7></el-option>
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
                prop="name"
                label="姓名"
                width="150">
              </el-table-column>
              <el-table-column
                prop="std"
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
                prop="pname"
                label="场地名称"
                width="150"
                >
              </el-table-column>
              <el-table-column
                prop="day"
                label="租用日期"
                width="150"
                >
              </el-table-column>
              <el-table-column
                prop="time"
                label="租用时长"
                width="150"
                >
              </el-table-column>               
              <el-table-column label="操作">
                <template slot-scope="scope">                 
                  <el-button
                    size="mini"
                    type="success"
                    @click.stop="change(scope.$index, scope.row,scope.row.id)">修改</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    @click.stop="retreat(scope.$index, scope.row,scope.row.id)">退订</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
    </el-card>
  </div>
</template>

<script>
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
        }
    },
    methods:{
        // 个人预约
        personal(){

        },
        // 特殊预约
        special(){

        },
        show(){
            this.flag[this.key]=false;
            this.flag[this.now]=true;
            this.key=this.now;
        },
        return_ap(){
          this.$router.push('/place')
        },
        change(i,row,id){

        },
        retreat(i,row,id){

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
  margin-top: 50px;
}
.return{
  text-align: right;
  margin: 0px 20px 40px 20px;
}
</style>>