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
          <el-form-item label="机构名称">
            <el-input v-model="query.title" placeholder="请输入机构名称" maxlength="10"></el-input>
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
          <el-table-column label="机构名称" prop="title"></el-table-column>
          <el-table-column label="充值总额" prop="totalTopUp"></el-table-column>
          <el-table-column label="已使用金额" prop="spendAmount"></el-table-column>
          <el-table-column label="账户余额" prop="balance"></el-table-column>
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
      query: {
        title: ""
      },
      tableData: [],
      totalCount: ""
    };
  },

  mounted() {
    this.allList();
  },

  methods: {
    // 查询
    handleCheck() {
      console.log("handleAdd");
    },

    async allList() {
      let res = await service.allList(this.query, {
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
      this.allList();
    },
    handleCurrentChange(curr) {
      this.query.page = curr;
      this.allList();
    },
    handleSizeChange(size) {
      this.query.pageSize = size;
      this.allList();
    },
    handleSearch() {
      this.allList();
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