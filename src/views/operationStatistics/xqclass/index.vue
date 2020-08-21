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
          <el-form-item>
             <el-date-picker
              v-model="query.startArr"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
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
        <el-table-column label="时间" prop="day" align="center"></el-table-column>
        <el-table-column label="通知" prop="noticeCount" align="center"></el-table-column>
        <el-table-column label="作业" prop="homeworkCount" align="center"></el-table-column>
        <el-table-column label="速报" prop="freshCount" align="center"></el-table-column>
           <el-table-column label="食谱" prop="recipeCount" align="center"></el-table-column>
        <el-table-column label="班级圈" prop="circleCount" align="center"></el-table-column>
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
        keyword: "",
        startArr:[],
        startDate: "",
        endDate: "",
      },
      tableData: [],
      totalCount: 0,
    };
  },
  methods: {
    handleSearch() {
      this.query.pageNum = 1;
      this.query.startDate = this.query.startArr[0]
      this.query.endDate = this.query.startArr[1]
      this.xqClassStatistics(this.query);
    },
    handleCurrentChange(curr) {
      this.query.pageNum = curr;
      this.xqClassStatistics(this.query);
    },
    handleSizeChange(size) {
      this.query.pageSize = size;
      this.xqClassStatistics(this.query);
    },
    //查询所有行为
    async xqClassStatistics(params = {}) {
      let res = await service.xqClassStatistics(params, {
        headers: { "Content-Type": "application/json" }
      });
      if (res.errorCode === 0) {
        this.tableData = res.data.list;
        this.totalCount = res.data.total;
      }
    },
  },
  mounted() {
    this.xqClassStatistics(this.query);
  },
  activated() {
    this.xqClassStatistics(this.query);
  }
};
</script>
<style lang="less" scoped>

</style>
