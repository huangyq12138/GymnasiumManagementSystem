<template>
  <div class="Contest">
    <el-card class="box-card">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>赛事管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 搜索框 -->
        <div class="input_box">
           <el-select v-model="value" placeholder="请选择体育类型">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
           <el-button type="primary" @click="AddContestBtn()">添加赛事</el-button>
           <el-button type="primary" @click="back()" v-show="isShow_2">返回</el-button>
        </div>
        <!-- 赛事表格 -->
        <el-table
          v-show="isShow_1"
          :data="tableData"
          style="width: 100%"
          height="470"
          stripe>
          <el-table-column
            type="index"
            width="50">
          </el-table-column>
          <el-table-column
            label="名称"
            prop="name">
          </el-table-column>
          <el-table-column
            label="体育类型"
            prop="type">
          </el-table-column>
          <el-table-column
            label="场地"
            prop="place">
          </el-table-column>
          <el-table-column
            label="时间"
            prop="time">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button
                size="mini"
                type="primary"
                class="editBtn"
                @click="lookDetail(scope.$index, scope.row)">查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 详情表格 -->
        <table 
        class="myTable"
        v-show="isShow_2">
          <tr>
              <td class="column" width="250px">
                名称
              </td>
              <td class="column">
              </td>
              <td class="column" width="200px" v-show="isShow_3">
              </td>
          </tr>
          <tr>
              <td class="column">
                体育类别
              </td>
              <td class="column">
              </td>
              <td class="column" v-show="isShow_3">
              </td>
          </tr>
          <tr>
              <td class="column">
                场地
              </td>
              <td class="column">
              </td>
              <td class="column" v-show="isShow_3">
              </td>
          </tr>
          <tr>
              <td class="column">
                时间
              </td>
              <td class="column">
              </td>
              <td class="column" v-show="isShow_3">
              </td>
          </tr>
          <tr>
              <td class="column">
                裁判
              </td>
              <td class="column">
              </td>
              <td class="column" v-show="isShow_3">
                <el-button
                size="mini"
                type="success"
                class="editBtn"
                @click="updateJugment()">修改</el-button>
                <el-button
                size="mini"
                type="primary"
                class="editBtn"
                @click="addJugment()">添加</el-button>
              </td>
          </tr>
          <tr>
              <td class="column">
                器材
              </td>
              <td class="column">
              </td>
              <td class="column" v-show="isShow_3">
                <el-button
                size="mini"
                type="success"
                class="editBtn"
                @click="updateEquip()">修改</el-button>
                <el-button
                size="mini"
                type="primary"
                class="editBtn"
                @click="addEquip()">添加</el-button>
              </td>
          </tr>
      </table>
      <div class="deleteBtnBox" v-show="isShow_2&&isShow_3">
        <el-button
          size="mini"
          type="danger"
          class="editBtn"
          @click="deleteContest()">
          删除该赛事
        </el-button>
      </div>
    </el-card>
    <!-- 添加赛事 -->
    <el-dialog title="新增赛事" :visible.sync="dialog_1" width="600px">
      <el-form :model="Addform"  class="editDialog">
        <el-form-item label="赛事名称" :label-width="formLabelWidth">
          <el-input v-model="Addform.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="体育类型" :label-width="formLabelWidth">
          <el-input v-model="Addform.type" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="场地类型" :label-width="formLabelWidth">
         <el-select v-model="Addform.placeType" placeholder="请选择场地类型">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="场地编号" :label-width="formLabelWidth">
          <el-select v-model="Addform.number" placeholder="请选择场地编号">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期" :label-width="formLabelWidth">
          <el-select v-model="Addform.date" placeholder="请选择时间段">
            <el-option label="星期一" value="0"></el-option>
            <el-option label="星期二" value="1"></el-option>
            <el-option label="星期三" value="2"></el-option>
            <el-option label="星期四" value="3"></el-option>
            <el-option label="星期五" value="4"></el-option>
            <el-option label="星期六" value="5"></el-option>
            <el-option label="星期日" value="6"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间" :label-width="formLabelWidth">
          <el-select v-model="Addform.time" placeholder="请选择时间段">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog_1 = false">取 消</el-button>
        <el-button type="primary" @click="dialog_1 = false">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改器材 -->
    <el-dialog title="赛事器材" :visible.sync="dialog_2" width="600px">
      <el-table :data="EquipList" height="340px" class="DialogTable">
        <el-table-column
          type="index"
          width="50">
        </el-table-column>
        <el-table-column property="type" label="类型" width="220"></el-table-column>
        <el-table-column property="number" label="数量" width="150"></el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button
                type="danger" 
                icon="el-icon-delete" 
                circle
                @click="DeleteEquip(scope.$index, scope.row)"
                size="mini">
                </el-button>
            </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <!-- 修改裁判 -->
    <el-dialog title="赛事裁判" :visible.sync="dialog_3" width="600px">
      <el-table :data="JugmentList" height="340px" class="DialogTable">
        <el-table-column
          type="index"
          width="50">
        </el-table-column>
        <el-table-column property="name" label="姓名" width="360px"></el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button
                type="danger" 
                icon="el-icon-delete" 
                circle
                @click="DeleteJugment(scope.$index, scope.row)"
                size="mini">
                </el-button>
            </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <!-- 添加赛事裁判 -->
    <el-dialog title="新增裁判" :visible.sync="dialog_4" width="600px">
      <el-form v-model="AddJugmentData"  class="Add_Dialog">
        <el-form-item label="赛事名称" :label-width="formLabelWidth">
          <el-input :value="contestName" disabled></el-input>
        </el-form-item>
        <div class="addDialog">
          <el-form-item
            v-for="(domain, index) in AddJugmentData.domains"
            :label="'裁判' + index"
            :key="domain.key"
            :prop="'domains.' + index + '.value'"
            :rules="{
              required: true, message: '姓名不能为空', trigger: 'blur'
            }"
            :label-width="formLabelWidth"
          >
            <el-input v-model="domain.value" placeholder="请输入裁判姓名" style="width:250px"></el-input>
            <el-button
              type="danger" 
              icon="el-icon-delete" 
              @click.prevent="removeDomain1(domain)"
              size="mini"
              style="height:40px">
            </el-button>
          </el-form-item>
        </div>
        
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDomain1">新增一名</el-button>
        <el-button @click="dialog_4 = false">取 消</el-button>
        <el-button type="primary" @click="dialog_4 = false">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加赛事器材 -->
    <el-dialog title="新增器材" :visible.sync="dialog_5" width="600px">
      <el-form v-model="AddEquipData"  class="editDialog" style="width:450px" :inline="true">
        <el-form-item label="赛事名称" :label-width="formLabelWidth">
          <el-input :value="contestName" disabled style="width:350px"></el-input>
        </el-form-item>
        <div class="addDialog">
          <div 
            v-for="(domain, index) in AddEquipData.domains" 
            :key="domain.key" 
            >
            <el-form-item label="器材类型" :label-width="formLabelWidth" class="floatBox">
            <el-select v-model="domain.type" placeholder="请选择器材类型">
                <el-option label="羽毛球拍" value="shanghai"></el-option>
                <el-option label="篮球" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="数量" label-width="40px" class="floatBox">
              <el-input v-model="domain.number" autocomplete="off"></el-input>
            </el-form-item>
            <el-button
                type="danger" 
                icon="el-icon-delete" 
                @click.prevent="removeDomain2(domain)"
                size="mini"
                style="height:40px">
              </el-button>
          </div>    
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDomain2">新增一类</el-button>
        <el-button @click="dialog_5 = false">取 消</el-button>
        <el-button type="primary" @click="dialog_5 = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Contest',
  data () {
    return {
      isShow_1:true,
      isShow_2:false,
      isShow_3:true,
      dialog_1:false,
      dialog_2:false,
      dialog_3:false,
      dialog_4:false,
      dialog_5:false,
      contestName:'海大杯羽毛球赛',
      formLabelWidth:'70px',
      options: [{
          value: '1',
          label: '羽毛球'
        }, {
          value: '2',
          label: '乒乓球'
        }, {
          value: '3',
          label: '保龄球'
        }, {
          value: '4',
          label: '篮球'
        }, {
          value: '5',
          label: '排球'
        }],
      value: '',
      tableData:[{
        name:'海大杯',
        type:'羽毛球',
        place:'羽毛球场B3',
        time:'周一16：00-18：00',
      },
      {
        name:'海大杯',
        type:'篮球',
        place:'篮球场B3',
        time:'周一16：00-18：00',
      }
      ],
      DetailData:[
        {key:1,value:33},
        {key:2,value:11},
        {key:3,value:22},
        {key:4,value:33},
      ],
      Addform:{},
      EquipList:[
        {
          type:'羽毛球拍',
          number:'10'
        }
      ],
      JugmentList:[
        {
          name:'黎明'
        },
      ],
      AddEquipData:{
          domains: [{
            value: ''
          }],
        },
      AddJugmentData:{
          domains: [{
            type:'',
            number:'',
          }],
        },
    }
  },
  components: {},
  methods: {
    //添加赛事按钮
    AddContestBtn(){
      this.dialog_1=true;
    },
    //查看赛事详情
    lookDetail(){
      this.isShow_1=false;
      this.isShow_2=true;
    },
    //返回主表格
    back(){
      this.isShow_1=true;
      this.isShow_2=false;
    },
    //删除赛事
    deleteContest(){
      this.$confirm('该操作不可逆！是否确定删除该赛事？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
        }).catch(() => {
          console.log('删除失败！');
        });
      })
    },
    //修改裁判按钮
    updateJugment(){
      this.dialog_3=true
    },
    //添加裁判按钮
    addJugment(){
      this.dialog_4=true
    },
    //修改器材按钮
    updateEquip(){
      this.dialog_2=true
    },
    //添加器材按钮
    addEquip(){
      this.dialog_5=true
    },
    //删除器材
    DeleteEquip(index,row){
      this.$confirm('是否确定删除该器材配置?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          console.log('删除失败！');
        });
       console.log(index, row);
    },
    //删除裁判
    DeleteJugment(index,row){
      this.$confirm('是否确定删除该裁判?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          console.log('删除失败！');
        });
       console.log(index, row);
    },
    //删除域名1
    removeDomain1(item) {
      var index = this.AddJugmentData.domains.indexOf(item)
      if (index !== -1) {
        this.AddJugmentData.domains.splice(index, 1)
      }
    },
    // 新增域名1
    addDomain1() {
      this.AddJugmentData.domains.push({
        value: '',
        key: Date.now()
      });
    },
    //删除域名2
    removeDomain2(item) {
      var index = this.AddEquipData.domains.indexOf(item)
      if (index !== -1) {
        this.AddEquipData.domains.splice(index, 1)
      }
    },
    // 新增域名2
    addDomain2() {
      this.AddEquipData.domains.push({
        value: '',
        key: Date.now()
      });
    }
  }
}
</script>

<style scoped>
.Contest,.box-card {
    width: 100%;
    height: 100%;
}
.input_box{
  margin:20px 0;
  text-align: left;
}
.el-select{
  width:300px;
  margin:0 10px;
}

.myTable {
  border-collapse: collapse;
  margin: 0 10px;
  width: 98%;
  text-align: center;
}
.myTable td,
.myTable th {
  border: 1px solid #cad9ea;
  color: #666;
  height:50px;
}
.editDialog{
  margin:0 auto;
  width:400px;
}
.editDialog .el-form-item{
  margin:0;
  padding:0;
  padding-bottom: 16px;
}
.editDialog .el-select,.el-input{
  width:300px;
}
.dialog-footer{
  margin-top: -10px;
  margin-bottom: 20px;
  text-align: center;
}
.dialog-footer .el-button{
  width: 100px;
}
.editBtn{
  margin-left:0;
}
.DialogTable{
  margin:10px auto;
  width:500px;
}
.addDialog{
  height: 230px;
  overflow-y: auto;
}
.Add_Dialog{
  height: 300px;
  margin:0 auto;
  width:400px;
  overflow: hidden;
}
.floatBox{
  display: inline-block;
}
.floatBox .el-input{
  width:94px;
}
.floatBox .el-select{
  width:150px;
  margin-left: 0;
}
.deleteBtnBox{
  text-align: right;
  margin-top: 10px;
  margin-right: 17px;
}
</style>
