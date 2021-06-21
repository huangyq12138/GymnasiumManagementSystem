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
            <el-form :model="detail_form" class="checkContext" :rules="rule" ref="detail_form">
              <el-form-item label="器材名称" :label-width="formLabelWidth">
                {{this.detail_form.name}}
              </el-form-item>
              <el-form-item label="可用器材数" :label-width="formLabelWidth" prop="cnumber">
                <el-input v-model="detail_form.cnumber" autocomplete="off" placeholder="请输入更新后的数量"></el-input>
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
              <el-button type="primary" @click="equipment_update('detail_form')">提 交</el-button>
            </div>
          </el-dialog>

          <!-- 器材新增 -->
          <el-dialog title="新增器材" :visible.sync="formVisible">
            <el-form :model="form" class="checkContext" :rules="rule" ref="form">
              <el-form-item label="器材类型" :label-width="formLabelWidth" prop="type">
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
              <el-form-item label="购进数量" :label-width="formLabelWidth" prop="number">
                <el-input v-model="form.number" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="购进金额" :label-width="formLabelWidth" prop="rates">
                <el-input v-model="form.rates" autocomplete="off"></el-input>
              </el-form-item>             
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="formVisible = false">取 消</el-button>
              <el-button type="primary" @click="equipment_add('form')">提 交</el-button>
            </div>
          </el-dialog>

          <!-- 器材租用 -->
          <el-dialog title="器材租用" :visible.sync="rentVisible">
            <el-form :model="rent_form" class="checkContext" :rules="rule" ref="rent_form">
              <el-form-item label="租用人姓名" :label-width="formLabelWidth" prop="name">
                <el-input v-model="rent_form.name" autocomplete="off" ></el-input>
              </el-form-item>
              <el-form-item label="租用人学号" :label-width="formLabelWidth" prop="stu_num">
                <el-input v-model="rent_form.stu_num" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="联系方式" :label-width="formLabelWidth" prop="phone">
                <el-input v-model="rent_form.phone" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="租用器材" :label-width="formLabelWidth" prop="type">
                <el-select v-model="rent_form.type" placeholder="请选择器材">
                  <el-option label="羽毛球拍" value=0></el-option>
                  <el-option label="毽子" value=1></el-option>
                  <el-option label="排球" value=2></el-option>
                  <el-option label="篮球" value=3></el-option>
                  <el-option label="足球" value=4></el-option>
                  <el-option label="乒乓球" value=5></el-option>
                  <el-option label="保龄球" value=6></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="租用数量" :label-width="formLabelWidth" prop="num">
                <el-input v-model="rent_form.num" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="租用时长" :label-width="formLabelWidth" prop="time">
                <el-input v-model="rent_form.time" autocomplete="off" placeholder="不足一小时按一小时收费"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="rentVisible = false">取 消</el-button>
              <el-button type="primary" @click="rentEq('rent_form')">提 交</el-button>
            </div>
          </el-dialog>

          <!-- 器材报修 -->
          <el-dialog title="器材报修" :visible.sync="repairVisible">
            <el-form :model="repair_form" class="checkContext" :rules="rule" ref="repair_form">             
              <el-form-item label="器材类型" :label-width="formLabelWidth" prop="type">
                <el-select v-model="repair_form.type" placeholder="请选择器材">
                  <el-option label="羽毛球拍" value=0></el-option>
                  <el-option label="毽子" value=1></el-option>
                  <el-option label="排球" value=2></el-option>
                  <el-option label="篮球" value=3></el-option>
                  <el-option label="足球" value=4></el-option>
                  <el-option label="乒乓球" value=5></el-option>
                  <el-option label="保龄球" value=6></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="报修数量" :label-width="formLabelWidth" prop="num">
                <el-input v-model="repair_form.num" autocomplete="off"></el-input>
              </el-form-item>              
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="repairVisible = false">取 消</el-button>
              <el-button type="primary" @click="repairEq('repair_form')">提 交</el-button>
            </div>
          </el-dialog>
        </div>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios';
import {equipmentAll,equipmentUpdate,equipmentAdd,equipmentRepair,rentEquip} from '@/API/api'
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
        name:null,
        stu_num:null,
        phone:null,
        type:null,
        num:null,
        time:null
      },
      repairVisible:false,
      repair_form:{
        type:null,
        num:null
      },
      radio:0,
      type:['羽毛球拍','毽子','排球','篮球','足球','乒乓球','保龄球'],
      money:[3,1,2,5,4,2,6],
      updateVisible:false,
      detail_form:[],
      rule:{
              num:[
                  { required: true, message: '请输入数量', trigger: 'blur' }
              ],
              name:[
                  { required: true, message: '请输入姓名', trigger: 'blur' }
              ],
              type:[
                  { required: true, message: '请选择器材类型', trigger: 'change' }
              ],
              cnumber:[
                  { required: true, message: '请输入更新后的数量', trigger: 'blur' },
              ],
              number:[
                  { required: true, message: '请输入构进数量', trigger: 'blur' },
              ],
              rates:[
                  { required: true, message: '请输入购进金额', trigger: 'blur' },
              ],
              phone:[
                  { required: true, message: '请输入手机号', trigger: 'blur' },
              ],
              pname:[
                  { required: true, message: '请选择场地名称', trigger: 'change' }
              ],
              stu_num:[
                  { required: true, message: '请输入学号', trigger: 'blur' },
              ],
              time:[
                  { required: true, message: '请选择时间', trigger: 'blur' }
              ]
            },
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
    async equipment_update(formName){
          this.$refs[formName].validate((valid) => {
            if (valid) {
              let params=new FormData();
              params.append("type",this.detail_form.type)
              params.append("number",this.detail_form.cnumber)
              equipmentUpdate(params).then(
                data=>{                 
                  if(data.code==200){
                    this.equipment_all();
                    this.updateVisible=false;
                    this.$message({
                      type: 'success',
                      message: '更新成功!'
                    });
                  }else{
                    this.$message.error('更新失败！请重试！');
                  }
                }
              )
            } else {
              return false;
            }
          }); 
    },
      // 提交新增器材
    async equipment_add(formName){
      this.$refs[formName].validate((valid) => {
          if (valid) {
            let params=new FormData();
            params.append("type",this.form.type)
            params.append("number",this.form.number)
            params.append("rates",this.form.rates)
            equipmentAdd(params).then(
              data=>{
                console.log(data); 
                if(data.code==200){
                  this.equipment_all();
                  this.formVisible = false;
                }else{
                  this.$message.error('新增失败!请重试！');  
                }
              }
            ) 
          } else {
            return false;
          }
        });
    },
    // 租用器材
    rentEq(formName){      
      this.$refs[formName].validate((valid) => {
          if (valid) {
            let params=new FormData();
            params.append("duration",this.rent_form.time)
            params.append("equipType",this.rent_form.type)
            params.append("phone",this.rent_form.phone)
            params.append("rentNumber",this.rent_form.num)
            params.append("username",this.rent_form.name)
            params.append("userNumber",this.rent_form.stu_num)
            let num=this.rent_form.num*this.money[this.rent_form.type]*this.rent_form.time
            this.$confirm('该租用需要支付'+num+'元, 是否继续?', '提示', {
              confirmButtonText: '已经支付',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              rentEquip(params).then(
                data=>{
                  if(data.code==200){
                    this.equipment_all();
                    this.$message({
                      type: 'success',
                      message: '租用成功!'
                    });             
                  }else{
                    this.$message.error('租用失败!请重试！');           
                  }
                }
              )          
            })
          } else {
            return false;
          }
        });
      
      
      
      // this.rentVisible = false;
    },
    // 报修器材
    async repairEq(formName){
      this.$refs[formName].validate((valid) => {
          if (valid) {
            let params=new FormData();
            params.append("type",this.repair_form.type)
            params.append("serviceNum",this.repair_form.num)
            params.append("number",this.tableData[this.repair_form.type].number)
            equipmentRepair(params).then(
              data=>{
                if(data.code==200){
                  this.equipment_all();
                  this.$message({
                      type: 'success',
                      message: '报修成功!'
                    });
                  this.repairVisible = false;
                }else{
                  this.$message.error('报修失败！请重试！');
                }
              }
            )
          } else {
            return false;
          }
        });
      
      
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
