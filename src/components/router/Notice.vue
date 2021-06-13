<template>
  <div class="Notice">
    <el-card class="box-card">
        <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>公告管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="container">
          <div class="top">
            <el-select v-model="value" placeholder="请选择公告类型">
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
                prop="context"
                label="内容">
              </el-table-column>
              <el-table-column
                prop="date"
                label="发布时间"
                width="180"
                >
              </el-table-column>
              <el-table-column label="操作" width="100">
                <template slot-scope="scope">                 
                  <el-button
                    size="mini"
                    type="danger"
                    @click.stop="handleDelete(scope.$index, scope.row,scope.row.id)">删除</el-button>
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
                 <p>发布时间:</p>{{this.detailContext.date}}
                </div>
                <div>
                 <p>公告内容:</p>{{this.detailContext.context}}
                </div>
             </div>
          </el-dialog>

          <!-- 添加公告 -->
          <el-dialog title="添加公告" :visible.sync="formVisible">
            <el-form :model="form">
              <el-form-item label="公告类型" :label-width="formLabelWidth">
                <el-select v-model="form.type" placeholder="请选择公告类型" class="checkContext">
                  <el-option label="场馆公告" value="0"></el-option>
                  <el-option label="馆内设施罚款公告" value="1"></el-option>
                  <el-option label="裁判简介" value="2"></el-option>
                  <el-option label="其他公告" value="3"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="公告内容" :label-width="formLabelWidth">
                <el-input v-model="form.context" autocomplete="off" type="textarea"
  :rows="4" class="checkContext"></el-input>
              </el-form-item>
              
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="formVisible = false">取 消</el-button>
              <el-button type="primary" @click="formVisible = false">确 定</el-button>
            </div>
          </el-dialog>
        </div>
    </el-card>
    
  </div>
</template>

<script>
import axios from 'axios';
import {getNotice} from '@/API/api'
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
        }],
        value: '',
       tableData: [{
          id:1,
          date: '2016-05-02',
          type: '王小虎',
          context: '上海市普陀区金沙江路 1518 弄'
        }, {
          id:1,
          date: '2016-05-02',
          type: '王小虎',
          context: '上海市普陀区金沙江路 1518 弄'
        }, {
          id:1,
          date: '2016-05-02',
          type: '王小虎',
          context: '上海市普陀区金沙江路 1518 弄'
        }, {
          id:1,
          date: '2016-05-02',
          type: '王小虎',
          context: '上海市普陀区金沙江路 1518 弄'
        }],
        dialogVisible: false,
        detailContext:{
          id:1,
          date: '2016-05-02',
          type: '王小虎',
          context: '上海市普陀区金沙江路 1518 弄'
        },
        formVisible:false,
        form: {        
          type: null,
          context:''
        },
        formLabelWidth: '120px'
    }
  },
  components: {},
  mounted(){
    this.get_notice()
  },
  methods: {
    handleDelete(index, row,id) {//删除
        console.log(index, row,id);
      },
    //详情
    detail(row){
      console.log(row);
      this.detail=row;
      this.dialogVisible=true;
    },
    async get_notice(){
      let data=await getNotice()
      console.log(data);
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
