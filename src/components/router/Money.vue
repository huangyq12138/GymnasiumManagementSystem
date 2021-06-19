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
            format="yyyy年"
            class="picker"
            placeholder="选择年"
            @change="changeYear()">
          </el-date-picker>
          <el-date-picker
            v-model="month"
            type="month"
            format="MM月"
            class="picker"
            placeholder="选择月"
            @change="changeMonth()">
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
          本月馆内共&nbsp;&nbsp;支出:<span>{{outMoney}}</span>元&nbsp;&nbsp;收入:<span>{{inMoney}}</span>元
        </div>
    </el-card>
  </div>
</template>

<script>
import {getMoney,getPieInfo,getBarChart} from '@/API/api'
var echarts = require('echarts')
export default {
  name: 'Money',
  data () {
    return {
        year: '',
        month: '',
        myYear:'',
        myMonth:'',
        outMoney:0,
        inMoney:0,
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
                            {value: 1048, name: '租借场地收费'},
                            {value: 735, name: '购置器材花费'},
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
                  ['product', '场地被使用收费', '购置器材花费', '租借器材收费','用户损坏器材的赔偿金'],
                  ['1', 0,0,0],
                  ['2', 0,0,0],
                  ['3', 0,0,0],
                  ['4', 0,0,0],
                  ['5', 0,0,0],
                  ['6', 0,0,0],
                  ['7', 0,0,0],
                  ['8', 0,0,0],
                  ['9', 0,0,0],
                  ['10', 0,0,0],
                  ['11', 0,0,0],
                  ['12', 0,0,0],
                  ['13', 0,0,0],
                  ['14', 0,0,0],
                  ['15', 0,0,0],
                  ['16', 0,0,0],
                  ['17', 0,0,0],
                  ['18', 0,0,0],
                  ['19', 0,0,0],
                  ['20', 0,0,0],
                  ['21', 0,0,0],
                  ['22', 0,0,0],
                  ['23', 0,0,0],
                  ['24', 0,0,0],
                  ['25', 0,0,0],
                  ['26', 0,0,0],
                  ['27', 0,0,0],
                  ['28', 0,0,0],
                  ['29', 0,0,0],
                  ['30', 0,0,0],
                  ['31', 0,0,0]
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
  created(){
    this.MonthInfo();
    this.lookPieBtn();
  },
  methods: {
    //查询该月营运总额
    async MonthInfo(){
      let date=new Date();
      this.myYear=date.getFullYear();
      this.myMonth=date.getMonth()+1;
      this.year=date;
      this.month=date;
      let data=this.initFormData();
      let res=await getMoney(data);
      // console.log(res);
      if(res.code==200){
        let list=res.datas;
        if(list.length==0){
          this.$message.info('该月份没有信息~~')
          // console.log(res.title)
        }else{
          for(let i=0;i<list.length;i++){
            if(list[i].type==1){
              this.outMoney=list[i].sumYM;
            }else{
              this.inMoney+=list[i].sumYM;
            }
          }
        }
      }else{
        console.log(res.title)
      }
    },
    //封装“月”、“年”数据
    initFormData(){
      let data=new FormData();
      data.append('month',this.myMonth);
      data.append('year',this.myYear);
      return data;
    },
    //点击选择月份
    changeMonth(){
      this.myMonth=this.month.getMonth()+1;
    },
    // 点击选择年份
    changeYear(){
      this.myYear=this.year.getFullYear();
    },
    //查看饼状图按钮
    async lookPieBtn(){
      this.isChart=true;
      //月份格式化
      let mm='';
      if(this.myMonth<10){
        mm='0'+this.myMonth;
      }else{
        mm=this.myMonth;
      }
      this.option.title.subtext=this.myYear+"年"+mm+"月";
      let data=this.initFormData();
      let res=await getPieInfo(data);
      if(res.code==200){
          if(res.datas.length==0){
            this.$message.info('该月份没有信息~~')
            // console.log(res.title)
          }else{
            let list=res.datas;
            // for(let i=0;i<list.length;i++){
            //   this.option.series[0].data[i]={value:list[i].value, name: list[i].name}
            // }
            this.option.series[0].data=[
              {value:list[1].value, name: list[1].name},
              {value:list[3].value, name: list[3].name},
              {value:list[0].value, name: list[0].name},
              {value:list[2].value, name: list[2].name}
            ]
            this.creatPie();
          }
        }else{
          console.log(res)
        }
    },
    //查看柱状图按钮
    async lookBarBtn(){
      this.isChart=false;
      let data=this.initFormData();
      let res=await getBarChart(data);
      if(res.code==200){
        if(res.datas.length==0){
          this.$message.info('该月份没有信息~~')
          console.log(res.title)
        }else{
          let list=res.datas;
          for(let i=0;i<list.length;i++){
            let index=list[i].day;
            this.Bardata.dataset.source[index]=[index,list[i].daySumType0,list[i].daySumType1,list[i].daySumType2,list[i].daySumType3];
            // for(let n=1;n<5;n++){
            //   this.Bardata.dataset.source[index].push()
            // }
            console.log(this.Bardata.dataset.source)
          }
          this.creatBar();
        }
      }else{
        console.log(res)
      }
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
