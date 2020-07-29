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
          <el-form-item >
            <el-button icon="el-icon-plus" type="primary" @click="handleAdd">新增</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="page-bd">
      <!-- 表格数据 -->
      <template>
        <el-table :data="tableData" style="width: 100%" size="small" border>
          <el-table-column label="序号" type="index"></el-table-column>
          <el-table-column label="机构名称">
            <template slot-scope="scope">
              <span @click="handleTip(scope.row)" class="on">{{scope.row.title}}</span>
            </template>
          </el-table-column>
          <el-table-column label="联系老师" prop="linkMan"></el-table-column>
          <el-table-column label="联系电话" prop="tele"></el-table-column>
          <el-table-column label="上传时间" prop="createTime"></el-table-column>
          <el-table-column label="审核时间" prop="auditTime"></el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <template v-if="scope.row.state === '0'">
                <span class="on">待审核</span>
              </template>
              <template v-if="scope.row.state === '2'">
                <span class="in" @click="handleStage(scope.row)">审核不通过</span>
              </template>
              <template v-if="scope.row.state === '1'">
                <span class="on" @click="handleStage(scope.row)">审核通过</span>
              </template>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <template>
                <el-button size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
              </template>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <!-- 审核节点 -->
    <template>
      <el-dialog top="40px" title :visible.sync="dialogFormVisible">
        <span slot="title" class="dialog-title">审核节点</span>
        <el-table :data="checkData" style="width: 100%" size="small" border>
          <el-table-column label="审核编号" type="index" width="100"></el-table-column>
          <el-table-column label="审核结果">
            <template slot-scope="scope">
              <template v-if="scope.row.auditState === 1">
                <span class="on">通过</span>
              </template>
              <template v-if="scope.row.auditState === 2">
                <span class="in">不通过</span>
              </template>
            </template>
          </el-table-column>
          <el-table-column label="审核时间" prop="createTime"></el-table-column>
          <el-table-column label="审核意见" prop="objection"></el-table-column>
        </el-table>
      </el-dialog>
    </template>
  </div>
</template>

<script>
import service from "@/api";
import pageMixins from "@/mixins/page";
export default {
  mixins: [pageMixins],
  data() {
    return {
      query: {},
      tableData: [],
      checkData: [],
      totalCount: "",
      dialogFormVisible: false
    };
  },
  mounted() {
    this.organList();
  },

  activated() {
    this.organList();
  },

  methods: {
    // 列表
    async organList() {
      let res = await service.organList();
      if (res.errorCode === 0) {
        this.tableData = res.data.list;
        this.totalCount = res.data.total;
      }
    },
    // 添加
    handleAdd() {
      this.$router.push({
        path: "/organEntry/add"
      });
    },
    // 查看
    handleTip(row) {
      this.$router.push({ path: `/organEntry/details/${row.id}` });
    },
    // 审核
    async handleStage(row) {
      let res = await service.checkInst(row.id);
      if (res.errorCode === 0) {
        this.dialogFormVisible = true;
        this.checkData = res.data;
      }
    },
    // 编辑
    handleEdit(row) {
      this.$router.push({ path: `/organEntry/edit/${row.id}` });
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