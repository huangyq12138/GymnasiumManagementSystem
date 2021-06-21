<template>
  <div class="Contest">
    <el-card class="box-card">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>赛事管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 搜索框 -->
        <div class="input_box">
           <el-select v-model="pid" placeholder="请选择体育类型"
              @change="searchContest(pid)">
            <el-option
              v-for="item in C_TypeList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
           <el-button type="primary" @click="AddContestBtn()" v-show="isShow_3">添加赛事</el-button>
           <el-button type="primary" @click="AllContestInfo()">查询所有赛事</el-button>
           <el-button type="primary" @click="back()" v-show="isShow_2">返回</el-button>
        </div>
        <!-- 赛事表格 -->
        <el-table
          v-show="isShow_1"
          :data="tableData"
          style="width: 100%"
          height="470"
          v-loading="loading"
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
            label="场地类型"
            prop="placeType">
          </el-table-column>
          <el-table-column
            label="场地名称"
            prop="placeName">
          </el-table-column>
          <el-table-column
            label="日期"
            prop="week">
          </el-table-column>
          <el-table-column
            label="时间"
            prop="timeZone">
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
                {{detailCon.name}}
              </td>
              <td class="column" width="200px" v-show="isShow_3">
              </td>
          </tr>
          <tr>
              <td class="column">
                体育类别
              </td>
              <td class="column">
                {{detailCon.type}}
              </td>
              <td class="column" v-show="isShow_3">
              </td>
          </tr>
          <tr>
              <td class="column">
                场地类型
              </td>
              <td class="column">
                {{detailCon.placeType}}
              </td>
              <td class="column" v-show="isShow_3">
              </td>
          </tr>
          <tr>
              <td class="column">
                场地名称
              </td>
              <td class="column">
                {{detailCon.placeName}}
              </td>
              <td class="column" v-show="isShow_3">
              </td>
          </tr>
          <tr>
              <td class="column">
                日期
              </td>
              <td class="column">
                {{detailCon.week}}
              </td>
              <td class="column" v-show="isShow_3">
              </td>
          </tr>
          <tr>
              <td class="column">
                时间
              </td>
              <td class="column">
                {{detailCon.timeZone}}
              </td>
              <td class="column" v-show="isShow_3">
              </td>
          </tr>
          <tr>
              <td class="column">
                裁判
              </td>
              <td class="column">
                <span v-for="(item,i) in detailCon.judge" :key="i">&nbsp;{{item}}&nbsp;</span>
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
                <span v-for="(item,i) in detailCon.equipment" :key="i">&nbsp;{{item}}&nbsp;</span>
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
          <el-select v-model="Addform.type" placeholder="请选择体育类型">
            <el-option v-for="(item,i) in peTypeList" :key="i" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="场地类型" :label-width="formLabelWidth">
         <el-select v-model="Addform.placeType" placeholder="请选择场地类型"
         @change="queryPlaceByType(Addform.placeType)">
            <el-option v-for="(item,i) in placeTypeList" :key="i" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="场地编号" :label-width="formLabelWidth">
          <el-select v-model="Addform.placeName" placeholder="请选择场地编号" @change="checkPlaceName">
            <el-option v-for="(item,i) in placeList" :key="i" :label="item.placeName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期" :label-width="formLabelWidth">
          <el-select v-model="Addform.week" placeholder="请选择时间段" @change="checkDay">
            <el-option v-for="(item,i) in weekList" :label="item.name" :value="item.value" :key="i"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间" :label-width="formLabelWidth">
          <el-select v-model="Addform.timeId" placeholder="请选择时间段" @change="onSelectedDrug">
            <el-option v-for="(item,i) in timeZone" :key="i" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog_1 = false">取 消</el-button>
        <el-button type="primary" @click="sureAddContest">确 定</el-button>
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
        <el-table-column label="姓名" width="360px">
           <template slot-scope="scope">
             {{JugmentList[scope.$index]}}
           </template>
           </el-table-column>
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
            label="裁判"
            :key="domain.key"
            :prop="'domains.' + index + '.value'"
            :label-width="formLabelWidth"
          >
            <el-input v-model="domain.value" placeholder="请输入裁判姓名"></el-input>
            <!-- <el-button
              type="danger" 
              icon="el-icon-delete" 
              @click.prevent="removeDomain1(domain)"
              size="mini"
              style="height:40px">
            </el-button> -->
          </el-form-item>
        </div>
        
      </el-form>
      <div slot="footer" class="dialog-footer">
        <!-- <el-button @click="addDomain1">新增一名</el-button> -->
        <el-button @click="dialog_4 = false">取 消</el-button>
        <el-button type="primary" @click="sureAddConJudge">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加赛事器材 -->
    <el-dialog title="新增器材" :visible.sync="dialog_5" width="600px">
      <el-form :model="AddEquipData"  class="editDialog" style="width:450px" :inline="true" :rules="rules" ref='AddEquipData'>
        <el-form-item label="赛事名称" :label-width="formLabelWidth">
          <el-input :value="contestName" disabled style="width:350px"></el-input>
        </el-form-item>
        <div class="addDialog">
            <el-form-item label="器材类型" :label-width="formLabelWidth" class="floatBox">
            <el-select v-model="AddEquipData.type" placeholder="请选择器材类型" @change="setMaxNum($event)">
                <el-option v-for="(item ,i) in equipmentsList" :key="i" :label="item.name" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="数量" label-width="40px" class="floatBox" prop="number">
              <el-input type="text" :max="maxNum" min="0" v-model="AddEquipData.number" autocomplete="off">
              </el-input>
            </el-form-item>
            <div class="tipNumber">该器材的最大存储量为{{maxNum}}</div>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <!-- <el-button @click="addDomain2">新增一类</el-button> -->
        <el-button @click="dialog_5 = false">取 消</el-button>
        <el-button type="primary" @click="sureAddConEquip('AddEquipData')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {getAllContests,getContest,getConByType,getAllConType,addContest,deleteContest,getJudge,addJudge,deleteJudge,getConEquip,addConEquip,deleteConEquip,placeType,placeFree,freeTime,getAllPlaceType,equipmentAll} from '@/API/api';
export default {
  name: 'Contest',
  data () {
    var validatenumber = (rule, value, callback) => {
      if (!value) {
          return callback(new Error('数量不能为空'));
      }
      setTimeout(() => {
        if (!Number.isInteger(parseInt(value))) {
          callback(new Error('请输入数字值'));
        } else {
          if (value>this.maxNum) {
            callback(new Error('数量超过最大存储量'));
          } else {
            callback();
          }
        }
      }, 100);
    };
    return {
      loading:true,
      isShow_1:true,
      isShow_2:false,
      isShow_3:true,
      dialog_1:false,
      dialog_2:false,
      dialog_3:false,
      dialog_4:false,
      dialog_5:false,
      cid:0,
      pid:0,
      contestName:'海大杯羽毛球赛',
      formLabelWidth:'70px',
      maxNum:0,
      typeList:[],
      peTypeList:[
        {name:'篮球',id:0},
        {name:'羽毛球',id:1},
        {name:'乒乓球',id:2},
        {name:'台球',id:3},
        {name:'毽子',id:4},
        {name:'其他',id:5},
      ],
      C_TypeList:[
        {name:'篮球赛',id:0},
        {name:'羽毛球赛',id:1},
        {name:'乒乓球赛',id:2},
        {name:'台球赛',id:3},
        {name:'毽子赛',id:4},
        {name:'其他',id:5},
      ],
      placeTypeList:[],
      placeList:[],
      timeList:[],
      placeName:'',
      weekList:[
        {name:'星期一',value:1},
        {name:'星期二',value:2},
        {name:'星期三',value:3},
        {name:'星期四',value:4},
        {name:'星期五',value:5},
        {name:'星期六',value:6},
        {name:'星期日',value:7},
      ],
      timeZone:[
        {name:'8:00~10:00',value:1},
        {name:'10:00~12:00',value:2},
        {name:'12:00~14:00',value:3},
        {name:'14:00~16:00',value:4},
        {name:'16:00~18:00',value:5},
        {name:'18:00~20:00',value:6},
        {name:'20:00~22:00',value:7},
      ],
      equipmentsList:[
        {value: 0,name: '羽毛球拍',number:0},
        {value: 1,name: '毽子',number:0},
        {value: 2,name: '排球',number:0},
        {value: 3,name: '篮球',number:0},
        {value: 4,name: '足球',number:0},
        {value: 5,name: '乒乓球',number:0},
        {value: 6,name: '保龄球',number:0},
      ],
      options: [],
      tableData:[{}],
      detailCon:{
        name:'',
        type:'',
        week:'',
        timeZone:'',
        placeType:'',
        placeName:'',
        judge:[],
        equipment:[]
      },
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
      AddJugmentData:{
          domains: [{
            value: ''
          }],
        },
      AddEquipData:{
            type:'',
            number:'',
        },
      rules: {
        number: [
          { validator: validatenumber, trigger: 'blur' }
        ]
      },
    }
  },
  components: {},
  created(){
    this.AllContestInfo();
    this.getAllEquip();
    this.queryPlaceType();
    this.getRole();
  },
  methods: {
    //获取角色
    getRole(){
      if(sessionStorage.getItem("role")=='ROLE_user'){
        this.isShow_3=false;
      };
    },
    //获取所有赛事信息
    async AllContestInfo(){
      let list=[];
      this.pid='';
      let res=await getAllContests();
      console.log(res);
      if(res.code==200){
        list=res.datas;
        for(let i=0;i<list.length;i++){
          let Tname=this.turnC_Type(list[i].type);
          list[i].type=Tname;
        }
        this.tableData=list;
        console.log(list)
        this.loading=false;
      }
    },
    //转化赛事类型为中文信息
    turnC_Type(t){
      let type="";
      for(let i=0;i<this.C_TypeList.length;i++){
        if(t==this.C_TypeList[i].id){
          type=this.C_TypeList[i].name;
        }
      }
      return type;
    },
    //获取所有的赛事类型
    async AllContestType(){
      let res=await getAllConType();
      console.log(res);
    },
    //获取所有器材信息
    async getAllEquip(){
      let res=await equipmentAll(); 
      // console.log(res);
      if(res.code==200){
        for(let i=0;i<this.equipmentsList.length;i++){
          this.equipmentsList[i].number=res.datas[i].number;
        }
      }else{
        console.log(res.title)
      }
    },
    //设置可选器材的最大值
    setMaxNum(e){
      this.maxNum=this.equipmentsList[e].number;
    },
    //根据类型查询赛事
    async searchContest(i){
      this.back();
      console.log(111);
      let type=new FormData();
      type.append('type',i)
      let res=await getConByType(type);
      // console.log(res);
      if(res.code==200){
        this.tableData=res.datas;
      }else{
        console.log(res.title);
      }
    },
    // 获取所有场地类型
    async queryPlaceType(){
      this.placeTypeList=[];
      let res=await getAllPlaceType();
      // console.log(res);
      if(res.code==200){
        let list=this.unique(res.datas.sort(this.sortNumber));
        for(let i=0;i<list.length;i++){
          this.TypeName=this.getTypeName(list[i]);
          this.placeTypeList.push({name:this.TypeName,id:list[i]});
        }
        // console.log(this.placeTypeList);
      }
    },
    //给场地类型赋值
    getTypeName(data){
      let name="";
      switch (data){
        case 0:
          name='羽毛球场';
          break;
        case 1:
          name='乒乓球场';
          break;
        case 2:
          name='台球场';
          break;
        case 3:
          name='篮球球场';
          break;
        case 4:
          name='保龄球场';
          break;
        default:
          name='其他';
      }
      return name;
    },
    //数组去重
    unique(arr){
        //Set数据结构，它类似于数组，其成员的值都是唯一的
        return Array.from(new Set(arr)); // 利用Array.from将Set结构转换成数组
    },
    // 从小到大排序
    sortNumber(a,b){
        return a - b;
    },
    // 取时间段下拉框的label值
    onSelectedDrug(val){
     let name = val ? this.timeZone.find(ele => ele.value === val).name: '';
     //根据场地查询空闲时间
     this.queryPlaceByTime(name, this.Addform.week,this.Addform.placeType);
    },
    //change星期下拉框
    checkDay(val){
      let timeSlot=[];
      console.log(this.Addform.placeName);
      if(this.Addform.placeName){
        for(let i=0;i<this.timeList.length;i++){
          if(this.timeList[i].week==val){
            timeSlot.push({name:this.timeList[i].timeZone,value:this.timeList[i].id})
          }
        }
        // console.log(timeSlot);
        this.timeZone=timeSlot;
      }
    },
    //获取场地名称下拉框的label值
    checkPlaceName(val){
      this.placeName=val ? this.placeList.find(ele => ele.id === val).placeName: '';
      //通过场地获取空闲时间
      this.queryP_TimeByType(this.Addform.placeType,this.placeName);
    },
    // 根据场地类型获取空闲时间段
    async queryP_TimeByType(type,name){
      let week=[];
      let nameList=[];
      let data=new FormData();
      data.append('placeType',type);
      data.append('placeName',name)
      let res=await freeTime(data);
      console.log(res);
      if(res.code==200){
        this.timeList=res.datas;
        for(let i=0;i<res.datas.length;i++){
          let wName=this.getWeekName(res.datas[i].week);
          //数组去重
          if(nameList.indexOf(wName)==-1){
            nameList.push(wName);
            week.push({name:wName,value:res.datas[i].week});
          }
        }
        // console.log(week);
        this.weekList=week;
      }
    },
    //获取星期名字
    getWeekName(data){
      let name='';
      switch(data){
        case 1:
          name='星期一';
          break;
        case 2:
          name='星期二';
          break;
        case 3:
          name='星期三';
          break;
        case 4:
          name='星期四';
          break;
        case 5:
          name='星期五';
          break;
        case 6:
          name='星期六';
          break;
        case 7:
          name='星期日';
          break;
      }
      return name;
    },
    // 根据时间段获取某种类型的空闲场地
    async queryPlaceByTime(time,week,type){
      let data=new FormData();
      data.append('placeType',type);
      data.append('timeZone',time);
      data.append('week',week);
      // console.log(data.get('week'));
      let res=await placeFree(data);
      // console.log(res);
      if(res.code==200){
        this.placeList=res.datas;
      }
    },
    // 根据场地类型查询场地
    async queryPlaceByType(type){
      let data=new FormData();
      data.append('placeType',type);
      let res=await placeType(data);
      console.log(res);
      if(res.code==200){
        this.placeList=res.datas;
      }
    },
    //添加赛事按钮
    AddContestBtn(){
      this.dialog_1=true;
      this.queryPlaceType();
    },
    //确定添加赛事
    async sureAddContest(){
      let form=new FormData();
      form.append('name',this.Addform.name);
      console.log(this.Addform);
      form.append('type',this.Addform.type);
      form.append('timeId',this.Addform.timeId);
      form.append('placeId',this.Addform.placeName);
      let res=await addContest(form);
      console.log(res);
      if(res.code==200){
        this.$message.success('添加成功！');
        dialog_1 = false;
        this.Addform={};
      }else{
        this.$message.error(res.title);
      }
    },
    //查看赛事详情
    lookDetail(index,row){
      this.cid=row.id;
      this.ContestJugment();
      this.ContestEquipment();
      this.detailCon.name=row.name;
      this.detailCon.type=row.type;
      this.detailCon.week=row.week;
      this.detailCon.timeZone=row.timeZone;
      setTimeout(() => {
        this.isShow_1=false;
        this.isShow_2=true;
      }, 1000);
    },
    // 通过id查询赛事
    async QueryContestById(){
      let id=new FormData();
      id.append('id',this.cid);
      let jList=this.ContestJugment();
      let eList= this.ContestEquipment();
      let res=await getContest(id);
      console.log(res);
      if(res.code==200){
        let obj=res.datas[0];
        let Tname=this.turnC_Type(obj.type);
        obj.type=Tname;
        console.log(this.detailCon);
      }
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
          let id=new FormData();
          id.append('id',this.cid);
          deleteContest(id).then((res)=>{
            if(res.code==200){
              this.$message.success(res.title);
              this.AllContestInfo();
              this.back();
            }else{
              this.$message.error(res.title);
            }
          })
      })
    },
    //查询该赛事的裁判
    async ContestJugment(){
      // console.log(this.cid);
      let id=new FormData();
      id.append('id',this.cid);
      let res=await getJudge(id);
      console.log(res);
      if(res.code==200){
        this.detailCon.judge=res.datas;
        this.JugmentList=res.datas;
        this.detailCon.judge=res.datas;
      }
    },
    // 查询该赛事的器材
    async ContestEquipment(){
      let id=new FormData();
      id.append('id',this.cid);
      let res=await getConEquip(id);
      console.log(res);
      if(res.code==200){
        this.detailCon.equipment=res.datas;
        this.EquipList=res.datas;
        this.detailCon.equipment=res.datas;
      }
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
    //确定添加器材
    sureAddConEquip(formName){
      this.$refs[formName].validate((valid)=>{
        if(valid){
          let data=new FormData();
          data.append('contestId',this.cid);
          data.append('equipId',this.AddEquipData.type);
          data.append('equipNumber',this.AddEquipData.number);
          addConEquip(data).then((res)=>{
            if(res.code==200){
              this.$message.success(res.title);
              this.ContestEquipment();
              this.dialog_5 = false;
            }else{
              console.log(res);
              this.$message.error(res.title);
            }
          });
        }else{
          this.$message.error('请检查给赛事配置的器材数量是否正确')
        }
      })
    },
    //确定添加裁判
    async sureAddConJudge(){
      let data=new FormData();
      data.append('contestId',this.cid);
      data.append('name',this.AddJugmentData.domains[0].value);
      let res=await addJudge(data);
      if(res.code==200){
        this.$message.success(res.title);
        this.ContestJugment();
        this.dialog_4 = false;
      }else{
        console.log(res);
        this.$message.error(res.title);
      }
    },
    //删除器材
    DeleteEquip(index,row){
      this.$confirm('是否确定删除该器材配置?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let id=new FormData();
          id.append('id',row.id);
          deleteConEquip(id).then((res)=>{
            if(res.code==200){
              this.$message.success(res.title);
              this.detailCon.equipment=this.ContestEquipment();
            }else{
              this.$message.error(res.title);
            }
          })
        }).catch(() => {
          console.log('删除失败！');
        });
      //  console.log(index, row);
    },
    //删除裁判
    DeleteJugment(index,row){
      this.$confirm('是否确定删除该裁判?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let id=new FormData();
          id.append('id',row.id);
          deleteJudge(id).then((res)=>{
            if(res.code==200){
              this.$message.success(res.title);
              this.detailCon.judge=this.ContestJugment();
            }else{
              this.$message.error(res.title);
            }
          })
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
  height: 80px;
  overflow-y: auto;
}
.Add_Dialog{
  margin:0 auto;
  width:400px;
  overflow: hidden;
}
.floatBox{
  display: inline-block;
}
.floatBox .el-input{
  width:115px;
}
.floatBox .el-select{
  width:182px;
  margin-left: 0;
}
.deleteBtnBox{
  text-align: right;
  margin-top: 10px;
  margin-right: 17px;
}
.tipNumber{
  color:#888;
  font-size: 12px;
  text-align: right;
  margin-right: 16px;
}
</style>
