<template>
  <div class="page">
    <div class="page-hd">
      <div class="page-form">
        <el-form
          class="demo-form-inline"
          :inline="true"
          :model="query"
          size="small"
          label-width="70px"
          label-position="left"
        >
          <el-form-item label="行为类型">
            <el-select v-model="query.actionType" placeholder="请选择类型">
              <el-option
                v-for="item in listType"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-search" type="primary" @click="handleSearch">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="page-bd">
      <el-table :data="tableData" style="width: 100%" size="small" border>
        <el-table-column label="序号" type="index" align="center"></el-table-column>
        <el-table-column label="行为名称" prop="title" align="center"></el-table-column>
        <el-table-column label="行为类型" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.actionType === 0">系统推荐行为</span>
            <span v-else-if="scope.row.actionType === 1">自定义行为</span>
            <span v-else-if="scope.row.actionType === 2">班级行为</span>
          </template>
        </el-table-column>
        <el-table-column label="使用人数" prop="userCount" align="center"></el-table-column>
      </el-table>
    </div>
    <div class="page-ft">
      <!-- 分页 -->
      <div class="qx-pagination" v-if="totalCount">
        <el-pagination
          background
          small
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="query.pageNum"
          :page-size="query.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount"
        ></el-pagination>
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
        pageSize: 20,
        pageNum: 1,
        actionType:'100'
      },
      tableData: [],
      totalCount: 0,
      listType: [
        { id: "100", name: "全部"},
        { id: "1", name: "自定义行为"},
        { id: "2", name: "班级行为"},
        { id: "0", name: "系统推荐行为"}
      ],
    };
  },
  methods: {
    handleSearch() {
      this.query.pageNum = 1;
      this.behaviorStatistics(this.query);
    },
    handleCurrentChange(curr) {
      this.query.pageNum = curr;
      this.behaviorStatistics(this.query);
    },
    handleSizeChange(size) {
      this.query.pageSize = size;
      this.behaviorStatistics(this.query);
    },
    //查询所有行为
    async behaviorStatistics(params = {}) {
      let res = await service.behaviorStatistics(params, {
        headers: { "Content-Type": "application/json" }
      });
      if (res.errorCode === 0) {
        this.tableData = res.data.list;
        this.totalCount = res.data.total;
      }
    }
  },
  activated() {
    this.behaviorStatistics(this.query);
  }
};
</script>
<style lang="less" scoped>
.el-table td,.el-table th {
  text-align: center !important;
}
</style>
