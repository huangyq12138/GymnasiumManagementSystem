<template>
  <div class="Equipment">
    <el-card class="box-card">
        <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>器材管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="container">
          <div class="eq-nav">
             <el-button type="primary" @click="formVisible = true">器材新增</el-button>
             <el-button type="primary" @click="rentVisible = true">器材租用</el-button>
             <el-button type="primary" @click="repairVisible = true">器材报修</el-button>
             <el-button type="primary" @click="inquiry">器材查询</el-button>
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
                prop="rent_num"
                label="现已租用数量"
                width="180"
                >
                </el-table-column>
                <el-table-column
                prop="rent_money"
                label="租金/元/小时"
                width="180"
                >
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">                 
                  <el-button
                    size="mini"
                    type="success"
                    @click.stop="handle_write(scope.$index, scope.row,scope.row.id)">编辑</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          
          <!-- 器材新增 -->
          <el-dialog title="新增器材" :visible.sync="formVisible">
            <el-form :model="form" class="checkContext">
              <el-form-item label="器材名称" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off" ></el-input>
              </el-form-item>
              <el-form-item label="购进数量" :label-width="formLabelWidth">
                <el-input v-model="form.number" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="购进金额" :label-width="formLabelWidth">
                <el-input v-model="form.money" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="租金/元/个" :label-width="formLabelWidth">
                <el-input v-model="form.rent_money" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="损坏/元/个" :label-width="formLabelWidth">
                <el-input v-model="form.damage_num" autocomplete="off" ></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="formVisible = false">取 消</el-button>
              <el-button type="primary" @click="newEq">提 交</el-button>
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
                  <el-option label="篮球" value=0></el-option>
                  <el-option label="足球" value=1></el-option>
                  <el-option label="排球" value=2></el-option>
                  <el-option label="羽毛球" value=3></el-option>
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
export default {
  name: 'Equipment',
  data () {
    return {
      tableData: [{
          id:1,
          name:'篮球',
          number:200,
          rent_num:20,
          rent_money:2,          
        },{
          id:1,
          name:'篮球',
          number:200,
          rent_num:20,
          rent_money:2,          
        },{
          id:1,
          name:'篮球',
          number:200,
          rent_num:20,
          rent_money:2,          
        }, 
        {
          id:1,
          name:'篮球',
          number:200,
          rent_num:20,
          rent_money:2,          
      }],
      formVisible:false,
      form: {        
        name:'篮球',
        number:200,
        money:null,
        rent_damage_num:20,
        rent_money:2,
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
      }
    }
  },
  components: {},
  methods: {
    write(index, row,id) {//编辑
        console.log(index, row,id);
    },
      // 提交新增器材
    newEq(){
      this.formVisible = false;
    },
    // 租用器材
    rentEq(){
      this.rentVisible = false;
    },
    // 报修器材
    repairEq(){
      this.repairVisible = false;
    },
    // 跳转查询
    inquiry(){
      this.$router.push('/equipment/inquiry')
    }
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
