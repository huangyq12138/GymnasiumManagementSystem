<template>
  <div class="Place">
    <el-card class="box-card">
        <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>场地管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="container">
          <div class="pl-nav">
             <el-button type="primary">场地类型</el-button>
             <el-button type="primary" @click="add_placeform = true">添加场地</el-button>
             <el-button type="primary" @click="tocheck">查询场地</el-button>
             <el-button type="primary" @click="toappointment">场地预约</el-button>
          </div>
           <div class="context">
            <el-table
              :data="type_data"
              border
              style="width: 100%">
              <el-table-column
                type="index"
                label="序号"
                width="200">
              </el-table-column>
              <el-table-column
                prop="type"
                label="场地类型">
              </el-table-column>             
            </el-table>
          </div>
          
          <!-- 添加场地 -->
          <el-dialog title="添加场地" :visible.sync="add_placeform">
            <el-form :model="addplace_form" class="checkContext">             
              <el-form-item label="场地类型" :label-width="formLabelWidth">
                <el-select v-model="addplace_form.type" placeholder="请选择类型">
                  <el-option label="羽毛球场" value=0></el-option>
                  <el-option label="兵乓球场" value=1></el-option>
                  <el-option label="台球场" value=2></el-option>
                  <el-option label="篮球场" value=3></el-option>
                  <el-option label="保龄球场" value=4></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="场地名称" :label-width="formLabelWidth">
                <el-input v-model="addplace_form.name" autocomplete="off"></el-input>
              </el-form-item>              
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="add_placeform= false">取 消</el-button>
              <el-button type="primary" @click="add_place">提 交</el-button>
            </div>
          </el-dialog>
        </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Place',
  data () {
    return {
      add_placeform:false,
      formLabelWidth: '120px',
      type_data:[
        {"type":"篮球场"}
      ],
      addplace_form:{
        type:null,
        name:null
      }
    }
  },
  components: {},
  methods: {
    // 添加场地
    add_place(){

    },
    // 查询场地
    tocheck(){
      this.$router.push('/place/check')
    },
    // 预约场地
    toappointment(){
      this.$router.push('/place/appointment')
    }
  }
}
</script>

<style scoped>
.Place,.box-card {
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
.checkContext .el-input,.checkContext .el-select{
  width: 600px;
}
</style>
