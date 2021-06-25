<template>
  <div class="equipment_inquiry">
    <el-card class="box-card">
        <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/User' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/equipment' }">器材管理</el-breadcrumb-item>
        <el-breadcrumb-item>器材查询</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="return">
            <el-button type="success" @click="return_eq" >返回</el-button>
          </div>
        <div class="container">      
          <div class="eq-nav">
             <el-radio-group v-model="radio" @change="show">
              <el-radio-button label='charge'>收费标准</el-radio-button>
              <el-radio-button label='rent' v-show="isShow">租借器材</el-radio-button>
              <el-radio-button label='rent_detail' v-show="isShow">租借详细查询</el-radio-button>
              <el-radio-button label='repair' v-show="isShow">维修信息</el-radio-button>
              <el-radio-button label='compensate'>赔偿标准</el-radio-button>
            </el-radio-group>
          </div>
          <!-- 收费标准 -->
          <div  v-show="this.flag.charge" class="charge">
            <el-form ref="charge_form" :model="charge_form" label-width="80px" class="checkContext">
              <el-form-item label="器材名称:">
                <el-select v-model="charge_form.type" placeholder="请选择器材">
                  <el-option label="羽毛球拍" value=0></el-option>
                  <el-option label="毽子" value=1></el-option>
                  <el-option label="排球" value=2></el-option>
                  <el-option label="篮球" value=3></el-option>
                  <el-option label="足球" value=4></el-option>
                  <el-option label="乒乓球" value=5></el-option>
                  <el-option label="保龄球" value=6></el-option>
                </el-select>
              </el-form-item>              
              <el-form-item>
                <el-button type="primary" @click="charge">查询</el-button>
              </el-form-item>
            </el-form>
            <p>注意：租用器材的最终价格=该器材标准租用收费 * 租用个数 * 租用时长</p>
          </div>
          <!-- 租借器材 -->
          <div v-show="this.flag.rent">
            <el-table
              :data="tableData"
              style="width: 100%">
              <el-table-column
                type="index"
                label="序号"
                width="100">
              </el-table-column>
              <el-table-column
                prop="username"
                label="租用人姓名"
                width="150">
              </el-table-column>
              <el-table-column
                prop="userNumber"
                label="租用人学号"
                width="180">
              </el-table-column>
              <el-table-column
                prop="phone"
                label="联系方式"
                width="180">
              </el-table-column>
              <el-table-column
                prop="eqname"
                label="租借器材"
                width="150"
                >
                </el-table-column>
              <el-table-column
                prop="rentNumber"
                label="租用数量"
                width="100"
                >
                </el-table-column>
                <el-table-column
                prop="duration"
                label="租用时长(小时)"
                width="120"
                >
                </el-table-column>
                <el-table-column
                prop="rentTime"
                label="租用时间"
                width="250"
                >
                </el-table-column>                
              <el-table-column label="操作">
                <template slot-scope="scope">                 
                  <el-button
                    size="mini"
                    type="success"
                    @click.stop="recovery(scope.$index,scope.row)">回收</el-button>
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
           <el-dialog title="查询结果" :visible.sync="detailVisible" width="65%">
            <el-table
              :data="detailData"
              style="width: 100%">
              <el-table-column
                type="index"
                label="序号"
                width="50">
              </el-table-column>
              <el-table-column
                prop="username"
                label="租用人姓名"
                width="100">
              </el-table-column>
              <el-table-column
                prop="userNumber"
                label="租用人学号"
                width="150">
              </el-table-column>
              <el-table-column
                prop="phone"
                label="联系方式"
                width="150">
              </el-table-column>
              <el-table-column
                prop="eqname"
                label="租借器材"
                width="100"
                >
                </el-table-column>
              <el-table-column
                prop="rentNumber"
                label="租用数量"
                width="100"
                >
              </el-table-column>
              <el-table-column
                prop="duration"
                label="租用时长(小时)"
                width="120"
                >
              </el-table-column>
              <el-table-column
                prop="rentTime"
                label="租用时间"
                width="200"
                >
              </el-table-column>                
              <el-table-column label="操作">
                <template slot-scope="scope">                 
                  <el-button
                    size="mini"
                    type="success"
                    @click.stop="recovery(scope.$index,scope.row)">回收</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-dialog>
          <!-- 维修信息 -->
          <div v-show="this.flag.repair">
            <el-table
              :data="repair_form"
              style="width: 100%">
              <el-table-column
                type="index"
                label="序号"
                width="100">
              </el-table-column>
              <el-table-column
                prop="type"
                label="器材名称"
                width="300">
              </el-table-column>              
              <el-table-column
                prop="serviceNum"
                label="维修数量"
                >
                </el-table-column>                              
            </el-table>
          </div>
          <!-- 赔偿标准 -->
          <div  v-show="this.flag.compensate">
            <el-form  label-width="80px" class="checkContext">
              <el-form-item label="器材名称:">
                <el-select v-model="compensate_form_name" placeholder="请选择器材">
                  <el-option label="羽毛球拍" value=0></el-option>
                  <el-option label="毽子" value=1></el-option>
                  <el-option label="排球" value=2></el-option>
                  <el-option label="篮球" value=3></el-option>
                  <el-option label="足球" value=4></el-option>
                  <el-option label="乒乓球" value=5></el-option>
                  <el-option label="保龄球" value=6></el-option>
                </el-select>
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
import {rentAll,equipmentCharge,rentDelete,rentFind,findRepaire} from '@/API/api'
export default {
  name: 'Equipment',
  data () {
    return {
      isShow:true,
      tableData: [],
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
        type:null
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
      repair_form:[],
      radio:'charge',
      key:'charge',
      type:['羽毛球拍','毽子','排球','篮球','足球','乒乓球','保龄球'],
      detailData:[],
      detailVisible:false
    }
  },
  components: {},
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
    show(){
      if(this.radio=='rent'){
          this.rent();
      }else if(this.radio=='repair'){
        this.repair();
      }
    this.flag[this.key]=false;
    this.flag[this.radio]=true;
    this.key=this.radio;    
    },
    async charge() {//收费标准
      if(this.charge_form.type==null){
        this.$alert("请先选择器材类型", '提示', {
          confirmButtonText: '确定',          
        });
      }else{
        let params=new FormData();
        params.append("type",this.charge_form.type)
        let data=await equipmentCharge(params) 
        if(data.code==200){
          this.$alert(data.data+"元", '价钱', {
            confirmButtonText: '确定',          
          });
        }else{
          this.$message.error('查询失败！请重试'); 
        } 
      }    
    },
      // 租借器材
    async rent(){
      let data=await rentAll()
      this.tableData=data.datas;
      for(let i=0;i<this.tableData.length;i++){
        Object.assign(this.tableData[i],{"eqname":this.type[this.tableData[i].equipType]})
      }
    },
    // 租用详细查询
    async rentDetail(){
      if(this.rent_detail_num==null){
        this.$alert("请先输入租用人学工号", '提示', {
          confirmButtonText: '确定',          
        });
      }else{
        let params=new FormData();
        params.append("userNumber",this.rent_detail_num)
        let data=await rentFind(params)
        if(data.code==200){
          this.detailData=data.datas;
          for(let i=0;i<this.detailData.length;i++){
          Object.assign(this.detailData[i],{"eqname":this.type[this.detailData[i].equipType]})
        }
          this.detailVisible=true;
        }else{
          this.$message.error('查询失败！请重试');  
        }
      }
    },
    // 查看维修器材
    async repair(){
      let data=await findRepaire()
      this.repair_form=data.datas;
      for(let i=0;i<this.repair_form.length;i++){
        this.repair_form[i].type=this.type[this.repair_form[i].type]
      }
    },
    // 赔偿
    async compensate(){
      if(this.compensate_form_name==null){
        this.$alert("请先选择查询器材类型", '提示', {
          confirmButtonText: '确定',          
        });
      }else{
        let params=new FormData();
        params.append("type",this.compensate_form_name)
        let data=await equipmentCharge(params) 
        if(data.code==200){
          let money=data.data*20;
          this.$alert(money+"元", '价钱', {
            confirmButtonText: '确定',          
          });
        }else{
          this.$message.error('查询失败！请重试'); 
        }
      }      
    },
    return_eq(){
      this.$router.push('/equipment')
    },
    // 器材回收
    recovery(i,row){
      this.$confirm('确定该器材已回收?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          let params=new FormData();
          params.append("id",row.id)
          params.append("eType",row.equipType)
          params.append("userNumber",row.userNumber)
          rentDelete(params).then(res=>{
            if(res.code==200){
              this.$message({
                type: 'success',
                message: '归还成功!'
              });
              if(this.radio!="rent"){                
                this.detailVisible=false;
              }else{
                this.rent()
              }
            }else{
              this.$message.error('归还失败！请重试！');
            }
          })
          
        })
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
.charge{
  text-align: left;
}
.charge>p{
  color: red;
  margin-top: 70px;
}
</style>>
