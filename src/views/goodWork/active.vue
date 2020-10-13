<template>
  <div class="page">
    <div class="page-hd">
      <div class="page-form">
        <el-form
          class="demo-form-inline"
          :inline="true"
          size="small"
          label-width="100px"
          label-position="left"
        >
          <el-form-item label="网络拉票期:">
            <el-select v-model="netQuery.periodDay" placeholder="请选择时间周期" @change="changeTime(1)">
              <el-option
                v-for="item in timeList"
                :key="item.periodDay"
                :label="item.name"
                :value="item.periodDay"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="专家评审期:">
            <el-select
              v-model="expertQuery.periodDay"
              placeholder="请选择时间周期"
              @change="changeTime(2)"
            >
              <el-option
                v-for="item in timeList"
                :key="item.periodDay"
                :label="item.name"
                :value="item.periodDay"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="平台投票期:">
            <el-select
              v-model="platformQuery.periodDay"
              placeholder="请选择时间周期"
              @change="changeTime(3)"
            >
              <el-option
                v-for="item in timeList"
                :key="item.periodDay"
                :label="item.name"
                :value="item.periodDay"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>

        <div class="auto_check">
          <h2>审核方式</h2>
          <div>
            <el-switch
              @change="handleCheckStatus"
              style="display: block"
              v-model="checkStatus"
              inactive-text="自动审核">
            </el-switch>
          </div>
         
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import service from "@/api";
export default {
  name: "behavior",
  data() {
    return {
      checkStatus:false,
      netQuery: {
        periodDay: "7",
        periodType: 1
      },
      expertQuery: {
        periodDay: "7",
        periodType: 2
      },
      platformQuery: {
        periodDay: "7",
        periodType: 3
      },
      timeList: [
        { periodDay: "7", name: "7天" },
        { periodDay: "15", name: "15天" },
        { periodDay: "30", name: "30天" },
        { periodDay: "60", name: "60天" },
        { periodDay: "90", name: "90天" },
        { periodDay: "180", name: "180天" }
      ]
    };
  },
  methods: {
    //新增系统默认行为
    async eventTime(params = {}) {
      let res = await service.eventTime(params, {
        headers: { "Content-Type": "application/json" }
      });
      if (res.errorCode === 0) {
        this.eventTypes();
      }
    },

    // 选择时间周期
    changeTime(value) {
      if (value === 1) {
        this.eventTime(this.netQuery);
      } else if (value === 2) {
        this.eventTime(this.expertQuery);
      } else {
        this.eventTime(this.platformQuery);
      }
    },

    async eventTypes() {
      let res = await service.eventTypes({
        headers: { "Content-Type": "application/json" }
      });
      if (res.errorCode === 0) {
        this.netQuery.periodDay = `${res.data[0].periodDay}`;
        this.expertQuery.periodDay = `${res.data[1].periodDay}`;
        this.platformQuery.periodDay = `${res.data[2].periodDay}`;
      }
    },
    // 获取审核状态
    async getAutoStatus() {
      let res = await service.getAutoStatus()
      if(res.errorCode === 0) {
        this.changeCheckStatus = res.data.active
      }
    },
    async handleCheckStatus() {
      let res = await service.changeCheckStatus({active:this.changeCheckStatus},{
        headers: { "Content-Type": "application/json" }
      })
    },
    
  },
  mounted() {
    this.eventTypes();
    this.getAutoStatus()
  }
};
</script>
<style lang="less" scoped>
.on {
  color: blue;
}

.off {
  color: red;
}
h2{
  display: flex;
  align-items: center;
}
h2::before {
  content:'';
  width:3px;
  height:15px;
  background:#409EFF;
  margin-right:10px;
  border-radius:50px;
}

.auto_check{
  margin-top:40px;
  >div{
     width:200px;
     
     box-shadow: 0px -3px 6px rgba(191, 191, 191, 0.25);
     padding:20px;
     margin-top:20px;
     background:#fff;
     font-size:16px;
     color:#333;
     border-radius:4px;
  }
}

.auto_check /deep/ .el-switch__label *{
  font-size:17px;
}

 .auto_check /deep/ .el-switch__label.is-active{
   color:#333
 }
</style>
