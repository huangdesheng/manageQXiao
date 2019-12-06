<template>
  <div class="page">
    <div class="page-hd">
      <!-- 表单 -->
      <div class="page-form">
        <el-form
          class="demo-form-inline"
          :inline="true"
          :model="query"
          size="small"
          label-width="70px"
          label-position="left"
        >
          <el-form-item label="业务类型">
            <el-select v-model="query.cardStatus" clearable placeholder="请选择业务类型">
              <el-option
                v-for="item in cardList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="时间段">
            <el-date-picker
              v-model="query.startTime"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-plus" type="primary" @click="handleCheck">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="page-bd">
      <!-- 表格数据 -->
      <template>
        <el-table :data="tableData" style="width: 100%" size="small" border>
          <el-table-column label="序号" type="index"></el-table-column>
          <el-table-column label="业务类型" prop="name"></el-table-column>
          <el-table-column label="流水号" prop="teacherName"></el-table-column>
          <el-table-column label="发生时间" prop="phone"></el-table-column>
          <el-table-column label="手指金额" prop="time1"></el-table-column>
          <el-table-column label="账户结余" prop="time2"></el-table-column>
        </el-table>
      </template>
    </div>

    <div class="page-ft">
      <!-- 分页 -->
      <template>
        <div class="qx-pagination" v-if="totalCount">
          <el-pagination
            background
            small
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="query.page"
            :page-size="query.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalCount"
          ></el-pagination>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import pageMixins from "@/mixins/page";
export default {
  mixins: [pageMixins],
  data() {
    return {
      query: {
        cardStatus: 0,
        startTime: [],
        endTime: ""
      },
      cardList: [
        { value: 0, label: "全部" },
        { value: 1, label: "在线充值" },
        {
          value: 2,
          label: "优惠券核销"
        },
        {
          value: 3,
          label: "体验券核销"
        }
      ],

      tableData: [
        {
          name: "tony",
          teacherName: "刘德海",
          phone: "13411062173",
          time1: "2019-11-03",
          time2: "2019-12-03",
          status: 1
        },
        {
          name: "阳光培训击机构",
          teacherName: "黄德生",
          phone: "13411062173",
          time1: "2019-11-03",
          time2: "2019-12-03",
          status: 2
        },
        {
          name: "tony",
          teacherName: "黄德生",
          phone: "13411062173",
          time1: "2019-11-03",
          time2: "2019-12-03",
          status: 3
        }
      ],
      totalCount: 20
    };
  },

  methods: {
    handleAdd() {
      console.log("handleAdd");
    }
  }
};
</script>


<style lang="less" scoped>
.on {
  color: #409eff;
}

.in {
  color: red;
}
</style>