<template>
  <div class="page">
    <div class="page-bd">
      <!-- 表格数据 -->
      <template>
        <el-table :data="tableData" style="width: 100%" size="small" border>
          <el-table-column label="序号" type="index" width="80"></el-table-column>
          <el-table-column label="机构名称" prop="teacherName"></el-table-column>
          <el-table-column label="兑换码" prop="teacherName"></el-table-column>
          <el-table-column label="核销时间" prop="time1"></el-table-column>
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