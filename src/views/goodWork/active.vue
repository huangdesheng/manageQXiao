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
        { periodDay: "30", name: "30天" }
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
    }
  },
  mounted() {
    this.eventTypes();
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
</style>
