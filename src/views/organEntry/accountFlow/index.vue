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
            <el-select v-model="query.type" clearable placeholder="请选择业务类型">
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
              v-model="startArr"
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
          <el-table-column label="业务类型" prop="name">
            <template slot-scope="scope" min-width="30">
              <template v-if="scope.row.type === 1">
                <span>在线充值</span>
              </template>
              <template v-if="scope.row.state === 2">
                <span>优惠券核销</span>
              </template>
              <template v-if="scope.row.state === 2">
                <span>体验券核销</span>
              </template>
            </template>
          </el-table-column>
          <el-table-column label="流水号" prop="orderNumber"></el-table-column>
          <el-table-column label="发生时间" prop="tradeTime"></el-table-column>
          <el-table-column label="收支金额(元)" prop="amount"></el-table-column>
          <el-table-column label="账户结余(元)" prop="balance"></el-table-column>
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
import service from "@/api";
import pageMixins from "@/mixins/page";
export default {
  mixins: [pageMixins],
  data() {
    return {
      startArr: [],
      query: {
        type: 0,
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
      tableData: [],
      totalCount: ""
    };
  },
  mounted() {
    this.billList();
  },
  methods: {
    async billList() {
      if (this.startArr.length === 0) {
        this.query.startTime = "";
        this.query.endTime = "";
      } else {
        this.query.startTime = this.startArr[0];
        this.query.endTime = this.startArr[1];
      }
      let res = await service.billList(this.query, {
        headers: { "Content-Type": "application/json" }
      });

      if (res.errorCode === 0) {
        this.tableData = res.data.list;
        this.totalCount = res.data.total;
      } else if (res.errorCode === -1) {
      } else if (res.errorCode === 404) {
        this.tableData = [];
        this.totalCount = "";
      } else {
        this.$message(res.errorMsg);
      }
    },
    handleCheck() {
      this.billList();
    },
    handleCurrentChange(curr) {
      this.query.page = curr;
      this.billList();
    },
    handleSizeChange(size) {
      this.query.pageSize = size;
      this.billList();
    },
    handleSearch() {
      this.billList();
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