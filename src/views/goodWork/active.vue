<template>
  <div class="page">
    <div class="page-hd">
      <div class="page-form">
        <el-form
          class="demo-form-inline"
          :inline="true"
          :model="eventType"
          size="small"
          label-width="70px"
          label-position="left"
        >
          <el-form-item label="时间周期">
            <el-select v-model="query.eventType" placeholder="请选择时间周期" @change="changeTime">
              <el-option
                v-for="item in timeList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
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
      query: {
        eventType: "forever"
      },

      timeList: [
        { id: "forever", name: "长期" },
        { id: "year", name: "年份" },
        { id: "quarter", name: "季度" }
      ]
    };
  },
  methods: {
    //新增系统默认行为
    async eventTime(params = {}) {
      let res = await service.eventTime(params, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      });
      if (res.errorCode === 0) {
      }
    },
    changeTime(value) {
      this.eventTime({ eventType: value });
    },

    async eventTypes() {
      let res = await service.eventTypes({
        headers: { "Content-Type": "application/json" }
      });
      if (res.errorCode === 0) {
        this.query.eventType = res.data.eventType;
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
