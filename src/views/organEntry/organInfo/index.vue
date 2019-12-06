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
          <el-form-item>
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
              <span @click="handleTip(scope.row)" class="on">{{scope.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column label="联系老师" prop="teacherName"></el-table-column>
          <el-table-column label="联系电话" prop="phone"></el-table-column>
          <el-table-column label="上传时间" prop="time1"></el-table-column>
          <el-table-column label="审核时间" prop="time2"></el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <template v-if="scope.row.status === 1">
                <span class="on">待审核</span>
              </template>
              <template v-if="scope.row.status === 2">
                <span @click="handleStage(scope.row)" class="in">审核不通过</span>
              </template>
              <template v-if="scope.row.status === 3">
                <span @click="handleStage(scope.row)" class="on">审核通过</span>
              </template>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <template>
                <el-button size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
                <el-button size="mini" type="primary">下线</el-button>
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
        <el-table :data="tableData" style="width: 100%" size="small" border>
          <el-table-column label="审核编号" type="index" width="100"></el-table-column>
          <el-table-column label="审核结果" prop="name"></el-table-column>
          <el-table-column label="审核时间" prop="teacherName"></el-table-column>
          <el-table-column label="审核意见" prop="phone"></el-table-column>
        </el-table>
      </el-dialog>
    </template>
  </div>
</template>

<script>
import pageMixins from "@/mixins/page";
export default {
  mixins: [pageMixins],
  data() {
    return {
      query: {},
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
      totalCount: 20,
      dialogFormVisible: false
    };
  },

  methods: {
    handleAdd() {
      this.$router.push({
        path: "/organEntry/add"
      });
    },
    // 查看
    handleTip(row) {
      this.$router.push({ path: `/organEntry/details/1` });
    },
    // 审核
    handleStage(row) {
      this.dialogFormVisible = true;
    },
    // 编辑
    handleEdit() {
      this.$router.push({ path: `/organEntry/edit/1` });
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