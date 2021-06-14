<template>
  <div class="equipment_inquiry">
    <el-card class="box-card">
        <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/User' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/equipment' }">器材管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/equipment_inquiry' }">器材查询</el-breadcrumb-item>
        <el-breadcrumb-item>收费标准</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="return">
            <el-button type="success" @click="return_eq" >返回</el-button>
          </div>
        <div class="container">      
          <div class="eq-nav">
             <el-button type="primary" @click="show('charge')">收费标准</el-button>
             <el-button type="primary" @click="show('rent')">租借器材</el-button>
             <el-button type="primary" @click="show('rent_detail')">租借详细查询</el-button>
             <el-button type="primary" @click="show('repair')">维修信息</el-button>
             <el-button type="primary" @click="show('compensate')">赔偿标准</el-button>
          </div>
          <!-- 收费标准 -->
          <div  v-show="this.flag.charge">
            <el-form ref="charge_form" :model="charge_form" label-width="80px" class="checkContext">
              <el-form-item label="器材名称:">
                <el-input v-model="charge_form.name"></el-input>
              </el-form-item>              
              <el-form-item>
                <el-button type="primary" @click="charge">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
          <!-- 租借器材 -->
          <div v-show="this.flag.rent">
            <el-table
              :data="tableData"
              border
              style="width: 100%">
              <el-table-column
                type="index"
                label="序号"
                width="100">
              </el-table-column>
              <el-table-column
                prop="name"
                label="租用人姓名"
                width="200">
              </el-table-column>
              <el-table-column
                prop="phone"
                label="联系方式"
                width="200">
              </el-table-column>
              <el-table-column
                prop="rent_eq"
                label="租借器材"
                width="200"
                >
                </el-table-column>
              <el-table-column
                prop="rent_num"
                label="租用数量"
                width="100"
                >
                </el-table-column>
                <el-table-column
                prop="rent_long"
                label="租用时长"
                width="100"
                >
                </el-table-column>
                <el-table-column
                prop="rent_time"
                label="租用时间"
                width="250"
                >
                </el-table-column>                
              <el-table-column label="操作">
                <template slot-scope="scope">                 
                  <el-button
                    size="mini"
                    type="success"
                    @click.stop="handle_write(scope.$index, scope.row,scope.row.id)">回收</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <!-- 租用详细查询 -->
          <div  v-show="this.flag.rent_detail">
            <el-form  label-width="100px" class="checkContext">
              <el-form-item label="租用人学号:">
                <el-input v-model="rent_detail_num"></el-input>
              </el-form-item>              
              <el-form-item>
                <el-button type="primary" @click="rentDetail">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
          <!-- 维修信息 -->
          <div v-show="this.flag.repair">
            <el-table
              :data="repair_form"
              border
              style="width: 100%">
              <el-table-column
                type="index"
                label="序号"
                width="100">
              </el-table-column>
              <el-table-column
                prop="name"
                label="器材名称"
                width="300">
              </el-table-column>              
              <el-table-column
                prop="num"
                label="维修数量"
                >
                </el-table-column>                              
            </el-table>
          </div>
          <!-- 赔偿标准 -->
          <div  v-show="this.flag.compensate">
            <el-form  label-width="80px" class="checkContext">
              <el-form-item label="器材名称:">
                <el-input v-model="compensate_form_name"></el-input>
              </el-form-item>              
              <el-form-item>
                <el-button type="primary" @click="compensate">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Equipment',
  data () {
    return {
      tableData: [{
          id:1,
          name:'张三',
          phone:12345678910,
          rent_eq:'篮球',
          rent_long:3,
          rent_time:'2020.01.05 16：22',
          rent_num:2,
          rent_money:2,          
        }],
      now:'charge',
      rent_detail_num:null,
      compensate_form_name:null,
      flag:{
        charge:true,
        rent:false,
        rent_detail:false,
        repair:false,
        compensate:false,
      },
      charge_form:{
        name:null
      },
      formLabelWidth: '120px',
      compensate_form:{
        name:'张三',
        stu_num:123456789,
        phone:123456,
        type:1,
        num:2,
        time:'16:00-18:00',
        rent:20
      },
      repair_form:[
        {
        id:1,
        name:'张三',
        num:5
      }
      ]
    }
  },
  components: {},
  methods: {
    show(key){
      this.flag[this.now]=false;
      this.flag[key]=true;
      this.now=key;
    },
    charge() {//收费标准
        
    },
      // 租借器材
    rent(){

    },
    // 租用详细查询
    rentDetail(){

    },
    // 报修器材
    repair(){

    },
    // 赔偿
    compensate(){

    },
    return_eq(){
      this.$router.push('/equipment')
    }
  }
}
</script>

<style  scoped>
.equipment_inquiry,.box-card {
    width: 100%;
    height: 100%;
}
.container{
  margin: 50px 30px;
}
.eq-nav{
  text-align: right;
  margin-bottom: 50px;
}
.eq-nav .el-button{
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
