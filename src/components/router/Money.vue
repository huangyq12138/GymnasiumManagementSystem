<template>
  <div class="Money">
    <el-card class="box-card">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>运营管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="header_box">
          <el-date-picker
            v-model="year"
            type="year"
            class="picker"
            placeholder="选择年">
          </el-date-picker>
          <el-date-picker
            v-model="month"
            type="month"
            class="picker"
            placeholder="选择月">
          </el-date-picker>
          <el-button type="primary" @click="lookPieBtn()">查看饼状图</el-button>
          <el-button type="primary" @click="lookBarBtn()">查看柱状图</el-button>
        </div>
        <div class="content">
          <div v-show="isChart" ref="PieChart" :style="{width: '1200px', height: '500px'}">
          </div>
          <div v-show="!isChart" ref="BarChart" :style="{width: '1200px', height: '500px'}"></div>
        </div>
        <div class="footer">
          本月馆内共&nbsp;&nbsp;支出:<span>1500</span>元&nbsp;&nbsp;收入:<span>1200</span>元
        </div>
    </el-card>
  </div>
</template>

<script>
var echarts = require('echarts')
export default {
  name: 'Money',
  data () {
    return {
        year: '',
        month: '',
        isChart:true,
        option:{
                title: {
                    text: '海大体育馆运营信息',
                    subtext: '2021年05月',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                },
                series: [
                    {
                        name: '费用类型',
                        type: 'pie',
                        radius: '50%',
                        data: [
                            {value: 1048, name: '购置器材花费'},
                            {value: 735, name: '租借场地收费'},
                            {value: 580, name: '租借器材收费'},
                            {value: 484, name: '器材损坏赔偿费'}
                        ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
        },
        Bardata:{
          legend: {},
          tooltip: {},
          dataset: {
              source: [
                  ['product', '购置器材花费', '租借场地收费', '租借器材收费','器材损坏赔偿费'],
                  ['1', 43.3, 85.8, 93.7,49.9],
                  ['2', 83.1, 73.4, 55.1,90.0],
                  ['3', 86.4, 65.2, 82.5,19.8],
                  ['4', 72.4, 53.9, 39.1,75.5]
              ]
          },
          xAxis: {type: 'category',name:'日期'},
          yAxis: {name:'金额/元'},
          // Declare several bar series, each will be mapped
          // to a column of dataset.source by default.
          series: [
              {type: 'bar'},
              {type: 'bar'},
              {type: 'bar'},
              {type: 'bar'}
          ]
      },
    }
  },
  components: {},
  mounted(){
    this.creatPie();
    this.creatBar();
  },
  methods: {
    //查看饼状图按钮
    lookPieBtn(){
      this.isChart=true;
    },
    //查看柱状图按钮
    lookBarBtn(){
      this.isChart=false;
    },
    //创建饼状图
    creatPie(){
      echarts.init(this.$refs.PieChart).setOption(this.option);
    },
    //创建柱状图
    creatBar(){
      echarts.init(this.$refs.BarChart).setOption(this.Bardata);
    }
  }
}
</script>

<style scoped>
.Money,.box-card {
    width: 100%;
    height: 100%;
}
.header_box{
  text-align: left;
  margin:20px 10px 0 10px;
}
.header_box .picker{
  margin-right: 10px;
}
.content{
  margin-top:20px;
  height:460px;
  overflow: hidden;
}
.footer{
  color:#444;
  text-align: right;
  font-size: 14px;
  margin-right: 50px;
  margin-top: 10px;
  font-family: SimHei;
}
</style>
