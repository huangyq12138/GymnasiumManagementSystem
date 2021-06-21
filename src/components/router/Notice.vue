<template>
  <div class="Notice">
    <el-card class="box-card">
        <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>公告管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="container">
          <div class="top">
            <el-select v-model="value" placeholder="请选择公告类型" @change="change_type">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-button type="primary" @click="formVisible = true">添加公告</el-button>
          </div>
          <div class="context">
            <el-table
              :data="tableData"
              border
              style="width: 100%" @row-click="detail">
              <el-table-column
                type="index"
                label="序号"
                width="100">
              </el-table-column>
              <el-table-column
                prop="type"
                label="类型"
                width="200">
              </el-table-column>
              <el-table-column
                prop="content"
                label="内容">
              </el-table-column>
              <el-table-column
                prop="time"
                label="发布时间"
                width="180"
                >
              </el-table-column>
              <el-table-column label="操作" width="100">
                <template slot-scope="scope">                 
                  <el-button
                    size="mini"
                    type="danger"
                    @click.stop="handleDelete(scope.$index,scope.row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>

          <!-- 详情 -->
          <el-dialog
            title="公告详情"
            :visible.sync="dialogVisible"
            width="30%">
             <div class="detail">
               <div>
                 <p>公告类型:</p>{{this.detailContext.type}}
                </div>
                <div>
                 <p>发布时间:</p>{{this.detailContext.time}}
                </div>
                <div>
                 <p>公告内容:</p>{{this.detailContext.content}}
                </div>
             </div>
          </el-dialog>

          <!-- 添加公告 -->
          <el-dialog title="添加公告" :visible.sync="formVisible">
            <el-form :model="form" :rules="form_rules" ref="form">
              <el-form-item label="公告类型" :label-width="formLabelWidth" prop="type">
                <el-select v-model="form.type" placeholder="请选择公告类型" class="checkContext">
                  <el-option label="场馆公告" value=0></el-option>
                  <el-option label="馆内设施罚款公告" value=1></el-option>
                  <el-option label="裁判简介" value=2></el-option>
                  <el-option label="其他公告" value=3></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="公告内容" :label-width="formLabelWidth" prop="content">
                <el-input v-model="form.content" autocomplete="off" type="textarea"
  :rows="4" class="checkContext"></el-input>
              </el-form-item>
              
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="formVisible = false">取 消</el-button>
              <el-button type="primary" @click="add_notice('form')">确 定</el-button>
            </div>
          </el-dialog>
        </div>
    </el-card>
    
  </div>
</template>

<script>
import axios from 'axios';
import {getNotice,addNotice,getNoticeType,deleteNotice} from '@/API/api'
export default {
  name: 'Notice',
  data () {
    return {
        options: [{
          value: 0,
          label: '场馆公告'
        }, {
          value: 1,
          label: '馆内设施罚款公告'
        }, {
          value: 2,
          label: '裁判简介'
        }, {
          value: 3,
          label: '其他公告'
        },{
          value: 9,
          label: '全部'
        }],
        value: '',
        tableData: [],
        dialogVisible: false,
        detailContext:{
          id:null,
          time: null,
          type: null,
          content:null
        },
        formVisible:false,
        form: {        
          type: null,
          content:''
        },
        formLabelWidth: '120px',
        form_rules:{
          content: [
              { required: true, message: '请输入内容', trigger: 'blur' }
            ],
          type:[
              { required: true, message: '请选择公告类型', trigger: 'change' }
          ]
        }
    }
  },
  components: {},
  mounted(){
    this.get_notice()
  },
  methods: {
    handleDelete(i,id) {//删除
        let that=this;
        this.$confirm('确定删除该公告?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params=new FormData();
          params.append("id",id)
          deleteNotice(params).then(
            res=>{
              if(res.code==200){
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                that.tableData.splice(i)
              }else{
                this.$message.error('删除失败，请重试');
              }  
            }
          )
                  
        })
      },
    //详情
    detail(row){
      console.log(row);
      this.detailContext=row;
      this.dialogVisible=true;
    },
    // 获得所有公告
    async get_notice(){
      let data=await getNotice()
      this.tableData=data.datas
      for(let i=0;i<this.tableData.length;i++){
          this.tableData[i].type=this.options[this.tableData[i].type].label
      }
    },
    async change_type(){
        if(this.value!=9){
          let params=new FormData();
          params.append("type",this.value)
          let data=await getNoticeType(params) 
          if(data.code==200){
            this.tableData=data.datas
            for(let i=0;i<this.tableData.length;i++){
                this.tableData[i].type=this.options[this.tableData[i].type].label
            }
          }   
        }else{
          this.get_notice();
        }       
    },
    // 添加公告
    async add_notice(formname){
      
      this.$refs[formname].validate((valid) => {
          if (valid) {
            let params=new FormData();           
            var myDate = new Date();
            let time=myDate.toLocaleDateString(); 
            params.append("type",this.form.type)
            params.append("content",this.form.content)
            params.append("time",time)
            addNotice(params).then(
              res=>{
                if(res.code==200){
                  this.formVisible=false;
                  this.$message({
                    message: '添加成功',
                    type: 'success'
                  });
                  location.reload();
                }else{
                  this.$message.error('添加失败，请重试');
                }
              }
            )
          } else {
            return false;
          }
        });
    }
  }
}
</script>

<style scoped>
.Notice,.box-card {
    width: 100%;
    height: 100%;
}
.container{
  margin: 50px 30px;
}
.top{
  text-align: left;
  margin-left: 30px;
  margin-bottom: 50px;
}
.top .el-button{
  margin-left: 150px;
}

.detail{
  font-size: 16px;
  text-align: left;
  margin: 10px 20px;
}
.detail div{
  margin-bottom: 18px;
}
.detail p{
  display: inline-block;
  font-weight: bold;
  margin-right: 30px;
}
.checkContext{
  width: 400px;
}
</style>
