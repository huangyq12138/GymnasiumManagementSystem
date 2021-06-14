<template>
  <div class="place_inquiry">
    <el-card class="box-card">
        <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/User' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/place' }">场地管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/place_check' }">场地查询</el-breadcrumb-item>
        <el-breadcrumb-item>类型查询</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="return">
            <el-button type="success" @click="return_pl" >返回</el-button>
          </div>
        <div class="container">      
          <div class="pl-nav">
             <el-button type="primary" @click="show('type')">类型查询</el-button>
             <el-button type="primary" @click="show('free_field')">空闲场地</el-button>
             <el-button type="primary" @click="show('free_time')">空闲时间</el-button>
             <el-button type="primary" @click="show('fielf_detail')">场地详细</el-button>
             <el-button type="primary" @click="show('standard')">收费标准</el-button>
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
                <el-button type="primary" @click="charge">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
          <!-- 空闲场地 -->
          <div v-show="this.flag.free_field">
            <el-form  label-width="80px" class="checkContext"  ref="freeField" :model="freeField">
              <el-form-item label="场地类型" :label-width="formLabelWidth">
                <el-select v-model="freeField.type" placeholder="羽毛球场">
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
                <el-button type="primary" @click="charge">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
          <!-- 空闲时间 -->
          <div  v-show="this.flag.free_time">
            <el-form  label-width="80px" class="checkContext"  ref="freeTime" :model="freeTime">
              <el-form-item label="场地类型" :label-width="formLabelWidth">
                <el-select v-model="freeTime.type" placeholder="羽毛球场">
                  <el-option label="羽毛球场" value=0></el-option>
                  <el-option label="兵乓球场" value=1></el-option>
                  <el-option label="台球场" value=2></el-option>
                  <el-option label="篮球场" value=3></el-option>
                  <el-option label="保龄球场" value=4></el-option>
                </el-select>
              </el-form-item>  
              <el-form-item label="场地名称" :label-width="formLabelWidth">
                <el-select v-model="freeTime.name" placeholder="羽毛球场A">
                  <el-option label="羽毛球场A" value=1></el-option>
                  <el-option label="兵乓球场" value=2></el-option>
                </el-select>
              </el-form-item>                   
              <el-form-item>
                <el-button type="primary" @click="charge">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
          <!-- 场地详细 -->
          <div v-show="this.flag.fielf_detail">
            <el-form  label-width="80px" class="checkContext"  ref="freeDetail" :model="freeDetail">
              <el-form-item label="场地类型" :label-width="formLabelWidth">
                <el-select v-model="freeDetail.type" placeholder="羽毛球场">
                  <el-option label="羽毛球场" value=0></el-option>
                  <el-option label="兵乓球场" value=1></el-option>
                  <el-option label="台球场" value=2></el-option>
                  <el-option label="篮球场" value=3></el-option>
                  <el-option label="保龄球场" value=4></el-option>
                </el-select>
              </el-form-item>  
              <el-form-item label="场地名称" :label-width="formLabelWidth">
                <el-select v-model="freeDetail.name" placeholder="羽毛球场A">
                  <el-option label="羽毛球场A" value=1></el-option>
                  <el-option label="兵乓球场" value=2></el-option>
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
              </el-form-item>
              <el-form-item label="时间" :label-width="formLabelWidth">
                <el-select v-model="freeDetail.time" placeholder="请选择">
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
                <el-button type="primary" @click="charge">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
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
              <el-form-item label="场地名称" :label-width="formLabelWidth">
                <el-select v-model="standardm.name" placeholder="羽毛球场A">
                  <el-option label="羽毛球场A" value=1></el-option>
                  <el-option label="兵乓球场" value=2></el-option>
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
                <el-button type="primary" @click="charge">查询</el-button>
              </el-form-item>
            </el-form>
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
                time:null
            },
            standardm:{
                type:null,
                name:null,
                day:null,
                time:null
            },
            formLabelWidth: '120px',
            now:"type"
        }
    },
    methods:{
        show(key){
            this.flag[this.now]=false;
            this.flag[key]=true;
            this.now=key;
        },
        charge(){

        },
        return_pl(){
          this.$router.push('/place')
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
