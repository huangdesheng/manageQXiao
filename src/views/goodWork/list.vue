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
          <el-form-item label="作品类型">
            <el-select v-model="query.tagId" placeholder="请选择作品类型">
              <el-option
                v-for="item in listType"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="学校名称" prop="title">
            <el-input v-model="query.schoolName"></el-input>
          </el-form-item>
          <el-form-item label="学生姓名" prop="title">
            <el-input v-model="query.studentName"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-search" type="primary" @click="handleSearch">查询</el-button>
            <el-button icon="el-icon-plus" type="primary" @click="handleAdd">新增</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="page-bd">
      <el-table :data="tableData" style="width: 100%" size="small">
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column label="作品标签" prop="tagName"></el-table-column>
        <el-table-column label="作品标题" width="200">
          <template slot-scope="scope">
            <span @click="handleUrl(scope.row.url)" class="on">{{scope.row.title}}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="作品标题" prop="title"></el-table-column> -->
        <el-table-column label="学生姓名" prop="studentName"></el-table-column>
        <el-table-column label="班级" prop="className"></el-table-column>
        <el-table-column label="学校名称" prop="schoolName"></el-table-column>
        <el-table-column label="投票数" prop="voteCount"></el-table-column>
        <!-- <el-table-column label="参赛状态" prop="answerCount"></el-table-column> -->
        <el-table-column label="审核节点" width="200">
          <template slot-scope="scope">
            <!-- <span @click="handleCheck(scope.row)" class="on">通过</span>
            <template slot-scope="scope">-->
            <span v-if="scope.row.auditStatus === 0" class="on" @click="handleCheck(scope.row)">未审核</span>
            <span v-if="scope.row.auditStatus === 1" class="on" @click="handleCheck(scope.row)">通过</span>
            <span v-if="scope.row.auditStatus === 2" class="off" @click="handleCheck(scope.row)">拒绝</span>
            <!-- </template> -->
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleVote(scope.row.id)">投票</el-button>
          </template>
        </el-table-column>
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
    <!-- dialog -->
    <el-dialog top="40px" :visible.sync="dialogFormVisible">
      <span slot="title" class="dialog-title">作品预览</span>
      <img :src="query.url" alt />
    </el-dialog>

    <el-dialog top="40px" :visible.sync="dialogFormVisiblePass">
      <span slot="title" class="dialog-title">审核节点</span>
      <el-table :data="tableDataPass" style="width: 100%" size="small">
        <el-table-column label="审核编号" type="index" width="200"></el-table-column>
        <el-table-column label="审核结果" width="200">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 0" class="on">未审核</span>
            <span v-if="scope.row.status === 1" class="on">通过</span>
            <span v-if="scope.row.status === 2" class="off">拒绝</span>
          </template>
        </el-table-column>
        <el-table-column label="审核时间" prop="date"></el-table-column>
        <el-table-column label="审核意见" prop="comment"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
import service from "@/api";
export default {
  name: "behavior",
  data() {
    return {
      dialogFormVisible: false,
      dialogFormVisiblePass: false,
      isShow: false, //判断dialog弹窗是新增还是编辑
      formLabelWidth: "100px",
      query: {
        pageSize: 20,
        pageNum: 1,
        schoolName: "",
        status: 1,
        studentName: "",
        tagId: "0"
      },
      form: {
        optionalElement: "",
        topicElement: ""
      },
      listType: [{ id: "0", name: "全部" }],
      tableData: [],
      totalCount: 0,
      tableDataPass: []
    };
  },
  methods: {
    handleSearch() {
      this.query.pageNum = 1;
      this.workList(this.query);
    },
    handleCurrentChange(curr) {
      this.query.pageNum = curr;
      this.workList(this.query);
    },
    handleSizeChange(size) {
      this.query.pageSize = size;
      this.workList(this.query);
    },
    handleAdd() {
      this.isShow = true;
      this.dialogFormVisible = true;
      this.form = { optionalElement: "", topicElement: "" };
    },
    handleCheck(row) {
      // this.isShow = false;
      this.dialogFormVisiblePass = true;
      this.checkPass(row.id);
    },

    async checkPass(params) {
      let res = await service.checkPass(params, {
        headers: { "Content-Type": "application/json" }
      });
      if (res.errorCode === 0) {
        this.tableDataPass = res.data;
      } else if (res.errorCode === 404) {
        this.tableDataPass = [];
        // this.totalCount = res.data.total;
      }
    },

    handleVote(id) {
      this.goodVote(id);
    },
    handleUrl(url) {
      this.dialogFormVisible = true;
      this.query.url = url;
    },
    // handleRemoveRules(index) {
    //   return this.form.rules.splice(index, 1);
    // },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.isShow) {
            this.addLogic(this.form);
          } else {
            this.updateLogic(this.form);
          }
        }
      });
    },
    //查询所有行为
    async workList(params = {}) {
      let res = await service.workList(params, {
        headers: { "Content-Type": "application/json" }
      });
      if (res.errorCode === 0) {
        this.tableData = res.data.list;
        this.totalCount = res.data.total;
      } else if (res.errorCode === 404) {
        this.tableData = [];
        // this.totalCount = res.data.total;
      }
    },

    // 作品类型
    async workType(params = {}) {
      let res = await service.workType({
        headers: { "Content-Type": "application/json" }
      });
      if (res.errorCode === 0) {
        this.listType = this.listType.concat(res.data);
      }
    },

    //编辑系统默认行为
    async updateLogic(params = {}) {
      let res = await service.updateLogic(params, {
        headers: { "Content-Type": "application/json" }
      });
      if (res.errorCode === 0) {
        this.dialogFormVisible = false;
        this.$refs.form.resetFields();
        this.thinkList(this.query);
      }
    },
    //删除系统默认行为
    async goodVote(id) {
      let res = await service.deleteLogic(id, {
        headers: { "Content-Type": "application/json" }
      });
      if (res.errorCode === 0) {
        this.$message({ message: `投票成功`, type: "success" });
        this.workList(this.query);
      } else {
        this.$message({ message: `${res.errorMsg}` });
      }
    },
    //新增系统默认行为
    async addLogic(params = {}) {
      console.log(params);
      let res = await service.addLogic(params, {
        headers: { "Content-Type": "application/json" }
      });
      if (res.errorCode === 0) {
        this.dialogFormVisible = false;
        this.$refs.form.resetFields();
        this.thinkList(this.query);
      }
    }
  },
  mounted() {
    this.workList(this.query);
    this.workType();
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
