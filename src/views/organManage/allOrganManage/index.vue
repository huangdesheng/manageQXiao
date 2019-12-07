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
          <el-form-item label="卡券类型">
            <el-select v-model="query.checkStatus" clearable placeholder="请选择设备状态">
              <el-option
                v-for="item in checkList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
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
                <span @click="handleStage(scope.row)" class="in">审核不通过</span>
              </template>
              <template v-if="scope.row.state === '1'">
                <span @click="handleStage(scope.row)" class="on">审核通过</span>
              </template>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <template>
                <el-button
                  size="mini"
                  type="primary"
                  @click="btnCheck(scope.row)"
                  v-if="scope.row.state == '0'"
                >审核</el-button>
                <el-button
                  size="mini"
                  type="primary"
                  v-if="scope.row.status === '1'"
                  @click="upDownBnt(scope.row)"
                >下线</el-button>
                <el-button
                  size="mini"
                  type="primary"
                  v-if="scope.row.status === '0'"
                  @click="upDownBnt(scope.row)"
                >上线</el-button>
              </template>
            </template>
          </el-table-column>
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
      query: {
        checkStatus: 0,
        name: ""
      },
      checkList: [
        { value: 0, label: "全部" },
        { value: 1, label: "审核中" },
        { value: 0, label: "审核不通过" },
        { value: 1, label: "审核通过" }
      ],
      tableData: [],
      checkData: [],
      totalCount: 20,
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
    async organList() {
      let res = await service.organList();
      if (res.errorCode === 0) {
        this.tableData = res.data.list;
        this.totalCount = res.data.total;
      }
    },
    // 查询
    handleCheck() {},
    // 查看
    handleTip(row) {
      this.$router.push({
        path: `/organEntry/details/1`,
        query: { status: "check" }
      });
    },
    // 审核
    async handleStage(row) {
      let res = await service.checkInst(row.id);
      if (res.errorCode === 0) {
        this.dialogFormVisible = true;
        this.checkData = res.data;
      }
    },
    async upDownBnt(row) {
      let res = await service.updateUD(row.id);

      if (res.errorCode === 0) {
        this.organList();
      } else {
        this.$message(res.errorMsg);
      }
    },
    // 审核
    btnCheck(row) {
      this.$router.push({
        path: `/organEntry/details/${row.id}`,
        query: { status: "check" }
      });
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