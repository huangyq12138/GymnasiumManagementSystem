<template>
  <div class="Equipment">
    <el-card class="box-card">
        <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>器材管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="container">
          <div class="eq-nav">
            <el-radio-group v-model="radio" @change="choose">
              <el-radio-button label=0>全部器材</el-radio-button>
              <el-radio-button label=1>器材新增</el-radio-button>
              <el-radio-button label=2>器材租用</el-radio-button>
              <el-radio-button label=3>器材报修</el-radio-button>
              <el-radio-button label=4>器材查询</el-radio-button>
            </el-radio-group>
          </div>
           <div class="context">
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
                label="器材名称"
                width="200">
              </el-table-column>
              <el-table-column
                prop="number"
                label="可用器材数"
                width="200">
              </el-table-column>
              <el-table-column
                prop="rentNum"
                label="现已租用数量"
                width="180"
                >
                </el-table-column>
                <el-table-column
                prop="serviceNum"
                label="维修数量"
                width="180"
                >
                </el-table-column>
                <el-table-column
                prop="rates"
                label="租金/元/小时"
                width="180"
                >
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">                 
                  <el-button
                    size="mini"
                    type="success"
                    @click.stop="write(scope.row)">编辑数量</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <!-- 器材编辑 -->
          <el-dialog title="器材更新" :visible.sync="updateVisible">
            <el-form :model="detail_form" class="checkContext">
              <el-form-item label="器材名称" :label-width="formLabelWidth">
                {{this.detail_form.name}}
              </el-form-item>
              <el-form-item label="可用器材数" :label-width="formLabelWidth">
                <el-input v-model="detail_form.number" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="现已租用数" :label-width="formLabelWidth">
                {{this.detail_form.rentNum}}
              </el-form-item>
              <el-form-item label="租金/每个/元" :label-width="formLabelWidth">
                {{this.detail_form.rates}}
              </el-form-item>
              <el-form-item label="维修数量" :label-width="formLabelWidth">
                {{this.detail_form.serviceNum}}
              </el-form-item>              
            </el-form>                       
            <div slot="footer" class="dialog-footer">
              <el-button @click="updateVisible = false">取 消</el-button>
              <el-button type="primary" @click="equipment_update">提 交</el-button>
            </div>
          </el-dialog>

          <!-- 器材新增 -->
          <el-dialog title="新增器材" :visible.sync="formVisible">
            <el-form :model="form" class="checkContext">
              <el-form-item label="器材类型" :label-width="formLabelWidth">
                <el-select v-model="form.type" placeholder="请选择器材">
                  <el-option label="羽毛球拍" value=0></el-option>
                  <el-option label="毽子" value=1></el-option>
                  <el-option label="排球" value=2></el-option>
                  <el-option label="篮球" value=3></el-option>
                  <el-option label="足球" value=4></el-option>
                  <el-option label="乒乓球" value=5></el-option>
                  <el-option label="保龄球" value=6></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="购进数量" :label-width="formLabelWidth">
                <el-input v-model="form.number" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="购进金额" :label-width="formLabelWidth">
                <el-input v-model="form.rates" autocomplete="off"></el-input>
              </el-form-item>             
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="formVisible = false">取 消</el-button>
              <el-button type="primary" @click="equipment_add">提 交</el-button>
            </div>
          </el-dialog>

          <!-- 器材租用 -->
          <el-dialog title="器材租用" :visible.sync="rentVisible">
            <el-form :model="rent_form" class="checkContext">
              <el-form-item label="租用人姓名" :label-width="formLabelWidth">
                <el-input v-model="rent_form.name" autocomplete="off" ></el-input>
              </el-form-item>
              <el-form-item label="租用人学号" :label-width="formLabelWidth">
                <el-input v-model="rent_form.stu_num" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="联系方式" :label-width="formLabelWidth">
                <el-input v-model="rent_form.phone" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="租用器材" :label-width="formLabelWidth">
                <el-select v-model="rent_form.type" placeholder="请选择器材">
                  <el-option label="篮球" value=0></el-option>
                  <el-option label="足球" value=1></el-option>
                  <el-option label="排球" value=2></el-option>
                  <el-option label="羽毛球" value=3></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="租用数量" :label-width="formLabelWidth">
                <el-input v-model="rent_form.num" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="租用时间" :label-width="formLabelWidth">
                <el-input v-model="rent_form.time" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="应付租金" :label-width="formLabelWidth">
                <el-input v-model="rent_form.rent" autocomplete="off" disabled></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="rentVisible = false">取 消</el-button>
              <el-button type="primary" @click="rentEq">提 交</el-button>
            </div>
          </el-dialog>

          <!-- 器材报修 -->
          <el-dialog title="器材报修" :visible.sync="repairVisible">
            <el-form :model="repair_form" class="checkContext">             
              <el-form-item label="器材名称" :label-width="formLabelWidth">
                <el-select v-model="repair_form.type" placeholder="请选择器材">
<<<<<<< HEAD
                  <el-option label="篮球" value=0></el-option>
                  <el-option label="足球" value=1></el-option>
                  <el-option label="排球" value=2></el-option>
                  <el-option label="羽毛球" value=3></el-option>
=======
                  <el-option label="羽毛球拍" value=0></el-option>
                  <el-option label="毽子" value=1></el-option>
                  <el-option label="排球" value=2></el-option>
                  <el-option label="篮球" value=3></el-option>
                  <el-option label="足球" value=4></el-option>
                  <el-option label="乒乓球" value=5></el-option>
                  <el-option label="保龄球" value=6></el-option>
>>>>>>> xq
                </el-select>
              </el-form-item>
              <el-form-item label="报修数量" :label-width="formLabelWidth">
                <el-input v-model="repair_form.num" autocomplete="off"></el-input>
              </el-form-item>              
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="repairVisible = false">取 消</el-button>
              <el-button type="primary" @click="repairEq">提 交</el-button>
            </div>
          </el-dialog>
        </div>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios';
import {equipmentAll,equipmentUpdate,equipmentAdd,equipmentRepair} from '@/API/api'
export default {
  name: 'Equipment',
  data () {
    return {
      tableData: [{
          name:'篮球',
          type:0,
          number:200,
          rentNum:20,
          serviceNum:2,
          rates:2          
        }],
      formVisible:false,
      form: {        
        type:null,
        number:null,
        rotes:null,
      },
      formLabelWidth: '120px',
      rentVisible:false,
      rent_form:{
        name:'张三',
        stu_num:123456789,
        phone:123456,
        type:1,
        num:2,
        time:'16:00-18:00',
        rent:20
      },
      repairVisible:false,
      repair_form:{
        type:null,
        num:null
      },
      radio:0,
      type:['羽毛球拍','毽子','排球','篮球','足球','乒乓球','保龄球'],
      updateVisible:false,
      detail_form:[]
    }
  },
  mounted () {
    this.equipment_all();
  },
  methods: {
    async equipment_all(){
          let data=await equipmentAll() 
          // console.log(data); 
          this.tableData=data.datas;
          for(let i=0;i<this.tableData.length;i++){
            this.tableData[i]["name"]=this.type[this.tableData[i].type];
          }
    },
    choose(){
      if(this.radio==1){
        this.formVisible = true;
      }
      else if(this.radio==2){
        this.rentVisible = true;
      }else if(this.radio==3){
         this.repairVisible = true
      }else if(this.radio==4){
        this.$router.push('/equipment_inquiry')
      }
    },
    write(row) {//编辑
        this.detail_form=row;
        this.updateVisible=true;
    },
    // 器材可用数量更新
    async equipment_update(){
          let params=new FormData();
          params.append("type",this.detail_form.type)
          params.append("number",this.detail_form.number)
          await equipmentUpdate(params) 
          this.updateVisible=false;
    },
      // 提交新增器材
    async equipment_add(){
          let params=new FormData();
          params.append("type",this.form.type)
          params.append("number",this.form.number)
          params.append("rates",this.form.rates)
          let data=await equipmentAdd(params) 
          console.log(data); 
          this.formVisible = false;
    },
    // 租用器材
    rentEq(){
      this.rentVisible = false;
    },
    // 报修器材
    async repairEq(){
      let params=new FormData();
      params.append("type",this.repair_form.type)
      params.append("serviceNum",this.repair_form.num)
      params.append("number",this.tableData[this.repair_form.type].number)
      let data=await equipmentRepair(params)
      console.log(data);
      this.repairVisible = false;
    },
  }
}
</script>

<style scoped>
.Equipment,.box-card {
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
.checkContext .el-input,.checkContext .el-select{
  width: 600px;
}
</style>
