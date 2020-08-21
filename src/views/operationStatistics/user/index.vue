<template>
  <div class="page">
    <header class="page-hd">
      <div>
        <div class="hd-title flex">
          <span></span>
          <h3>用户增长趋势图</h3>
        </div>

        <div class="select_timer">
          <el-radio-group v-model="day" @change="handleSumbit">
            <el-radio-button label="7">7天</el-radio-button>
            <el-radio-button label="15">15天</el-radio-button>
            <el-radio-button label="30">30天</el-radio-button>
          </el-radio-group>
          <el-date-picker
          @change="handlePickerDate"
          v-model="dateRange"
          :picker-options="pickerOptions"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
          </el-date-picker>
        </div>

        <div>
          <div id="myChart" :style="{height: '300px',width:'80%'}"></div>
        </div>
      </div>
    </header>

    <section>
      <div class="section_title">
        <div class="hd-title flex">
          <span></span>
          <h3>用户增长列表</h3>
        </div>
        <el-date-picker
          v-model="dateRange"
          :readonly="true"
          :picker-options="pickerOptions"
          type="daterange"
          range-separator="至"
          
          start-placeholder="开始日期"
          end-placeholder="结束日期">
          </el-date-picker>
      </div>
      <el-table
        :data="tableData"
        height="373"
        border
        style="width: 72%">
        <el-table-column
          prop="day"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="incrCount"
          label="新增用户人数"
          width="180">
        </el-table-column>
        <el-table-column
          prop="totalCount"
          label="累积用户人数">
        </el-table-column>
      </el-table>
    </section>
  </div>
</template>

<script>
import Vue from 'vue'
import echarts from 'echarts' //引入echarts
Vue.prototype.$echarts = echarts //引入组件
import {handleDate,timestampToTime} from '@/utils/handleDate'
import service from '@/api'
export default {
    name:'Echart',
    data () {
      return {
        value:'2020-04-08',
        day:'7',
        pickerMinDate: '',
        dateRange: handleDate(new Date(),7),
        pickerOptions: {
          onPick: ({ maxDate, minDate }) => {
            this.pickerMinDate = minDate.getTime()
            if (maxDate) {
              this.pickerMinDate = ''
            }
          },
          disabledDate: (time) => {
            if (this.pickerMinDate !== '') {
              const day30 = (30 - 1) * 24 * 3600 * 1000
              let maxTime = this.pickerMinDate + day30
              let minTime = this.pickerMinDate - day30;
              if (maxTime > new Date()) {
                maxTime = new Date()
              }
              return time.getTime() > maxTime||time.getTime() < minTime;
            }
            return time.getTime() > Date.now()
          }
        },
        tableData:[]
      }
    },
    mounted(){
      this.dateRange = handleDate(new Date(),this.day)
      this.userAnalysis(this.dateRange[0],this.dateRange[1])
    },
    methods: {
        async handleSumbit(num) {
          this.dateRange = handleDate(new Date(),parseInt(num))
          this.userAnalysis(this.dateRange[0],this.dateRange[1])
        },

        handlePickerDate($event) {
          this.dateRange = [timestampToTime($event[0]),timestampToTime($event[1])]
          this.userAnalysis(this.dateRange[0],this.dateRange[1])
        },
        drawLine(dayList,incrList){
            var myChart = this.$echarts.init(document.getElementById("myChart"))
            
            myChart.setOption({
              grid: {
                  left: "2.8%",
              },
              xAxis: {
                type: 'category',
                boundaryGap: false,
                data: dayList
              },
              yAxis: {
                type: 'value',
                minInterval: 1, //设置成1保证坐标轴分割刻度显示成整数。
              },
              series: [{
                  data:incrList,
                  type: 'line'
              }]
          });
        },

        async userAnalysis(startDate,endDate) {
          let res = await service.userAnalysis({
            startDate,
            endDate
          },{
           headers: { "Content-Type": "application/json" }
         })
          if(res.errorCode === 0) {
            let {dayList,incrList,statVOS} = res.data
            this.tableData = statVOS
            this.drawLine(dayList,incrList)
          }
        }
    }
}

</script>

<style lang="less" scoped>
.page{
  margin:40px 0 0 !important;
}
.hd-title {
  display: flex;
  align-items: center;
  padding:20px 0;
  span {
    display: block;
    width: 2px;
    height: 20px;
    background: rgba(0, 153, 255, 1);
  }
  h3 {
    flex: 1;
    margin-left: 10px;
  }
}

section{
  width:100%;
  .section_title{
    display: flex;
    align-items: center;
    >.hd-title{
      margin-right:30px;
    }
  }
}

header,section {
  background: #fff;
  padding:0 20px;
}

.select_timer {
  .el-radio-group{
    margin-right:30px;
  }
}
</style>