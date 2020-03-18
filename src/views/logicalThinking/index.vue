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
          <el-form-item label="主题元素" prop="title">
            <el-input v-model="query.topicElement"></el-input>
          </el-form-item>
          <el-form-item label="可择元素" prop="title">
            <el-input v-model="query.optionalElement"></el-input>
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
        <el-table-column label="题目" prop="title"></el-table-column>
        <el-table-column label="主题元素" prop="topicElement"></el-table-column>
        <el-table-column label="可择元素" prop="optionalElement"></el-table-column>
        <el-table-column label="答题人数" prop="answerCount"></el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDel(scope.row.id)">删除</el-button>
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
      <span slot="title" class="dialog-title">{{ isShow ? '题目录入': '编辑题目' }}</span>
      <el-form ref="form" :model="form" status-icon size="small" :label-width="formLabelWidth">
        <el-form-item
          label="题目"
          prop="title"
          :rules="[
          { required: true, message: '请输入题目', trigger: 'blur' }
        ]"
        >
          <el-input v-model="form.title" placeholder="请输入题目"></el-input>
        </el-form-item>
        <el-form-item label="主题元素">
          <!-- <el-input v-model="form.topicElement" placeholder="请输入主题元素"></el-input>
          <el-input v-model="form.topicElement" placeholder="请输入主题元素"></el-input>
          <el-input v-model="form.topicElement" placeholder="请输入主题元素"></el-input>-->

          <div class="demo-input-size">
            <el-input placeholder="请输入内容" suffix-icon="el-icon-date" v-model="form2.topicElement_a"></el-input>
            <el-input placeholder="请输入内容" suffix-icon="el-icon-date" v-model="form2.topicElement_b"></el-input>
            <el-input placeholder="请输入内容" suffix-icon="el-icon-date" v-model="form2.topicElement_c"></el-input>
            <!-- <el-input placeholder="请输入内容" suffix-icon="el-icon-date" v-model="input4"></el-input> -->
          </div>
        </el-form-item>
        <el-form-item label="可择元素">
          <div class="demo-input-size">
            <el-input
              placeholder="请输入内容"
              suffix-icon="el-icon-date"
              v-model="form2.optionalElement_a"
            ></el-input>
            <el-input
              placeholder="请输入内容"
              suffix-icon="el-icon-date"
              v-model="form2.optionalElement_b"
            ></el-input>
            <el-input
              placeholder="请输入内容"
              suffix-icon="el-icon-date"
              v-model="form2.optionalElement_c"
            ></el-input>
            <el-input
              placeholder="请输入内容"
              suffix-icon="el-icon-date"
              v-model="form2.optionalElement_d"
            ></el-input>
            <el-input
              placeholder="请输入内容"
              suffix-icon="el-icon-date"
              v-model="form2.optionalElement_e"
            ></el-input>
            <!-- <el-input placeholder="请输入内容" suffix-icon="el-icon-date" v-model="input4"></el-input> -->
          </div>
          <!-- <el-input v-model="form.optionalElement" placeholder="请输入可择元素"></el-input> -->
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="submitForm('form')">提交</el-button>
      </span>
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
      isShow: false, //判断dialog弹窗是新增还是编辑
      formLabelWidth: "100px",
      query: {
        pageSize: 20,
        optionalElement: "",
        pageNum: 1,
        topicElement: ""
      },
      form2: {
        topicElement_a: "",
        topicElement_b: "",
        topicElement_c: "",
        optionalElement_a: "",
        optionalElement_b: "",
        optionalElement_c: "",
        optionalElement_d: "",
        optionalElement_e: ""
      },
      form: {
        optionalElement: [],
        topicElement: [],
        title: ""
      },

      tableData: [],
      totalCount: 0
    };
  },
  methods: {
    handleSearch() {
      this.query.pageNum = 1;
      this.thinkList(this.query);
    },
    handleCurrentChange(curr) {
      this.query.pageNum = curr;
      this.thinkList(this.query);
    },
    handleSizeChange(size) {
      this.query.pageSize = size;
      this.thinkList(this.query);
    },
    handleAdd() {
      this.isShow = true;
      this.dialogFormVisible = true;
      this.form = { title: "", optionalElement: [], topicElement: [] };
      this.form2 = {
        topicElement_a: "",
        topicElement_b: "",
        topicElement_c: "",
        optionalElement_a: "",
        optionalElement_b: "",
        optionalElement_c: "",
        optionalElement_d: "",
        optionalElement_e: ""
      };
    },
    handleEdit(row) {
      this.isShow = false;
      this.dialogFormVisible = true;
      this.logicDetails(row.id);
      // this.form = Object.assign({}, row);
    },

    async logicDetails(id) {
      let res = await service.logicDetails(id);
      if (res.errorCode === 0) {
        this.form2 = {
          topicElement_a: res.data.topicElement[0],
          topicElement_b: res.data.topicElement[1],
          topicElement_c: res.data.topicElement[2],
          optionalElement_a: res.data.optionalElement[0],
          optionalElement_b: res.data.optionalElement[1],
          optionalElement_c: res.data.optionalElement[2],
          optionalElement_d: res.data.optionalElement[3],
          optionalElement_e: res.data.optionalElement[4]
        };
        this.form = Object.assign({}, res.data);
      }
      console.log(res);
    },
    handleDel(actionId) {
      this.$confirm(`确定删除吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteLogic(actionId);
        })
        .catch(error => {
          return false;
        });
    },
    // handleAddRules() {
    //   this.form.rules.push({ ruleId: 0, ruleContent: "" });
    // },
    // handleRemoveRules(index) {
    //   return this.form.rules.splice(index, 1);
    // },
    submitForm(formName) {
      this.form.topicElement = [
        this.form2.topicElement_a,
        this.form2.topicElement_b,
        this.form2.topicElement_c
      ];

      this.form.optionalElement = [
        this.form2.optionalElement_a,
        this.form2.optionalElement_b,
        this.form2.optionalElement_c,
        this.form2.optionalElement_d,
        this.form2.optionalElement_e
      ];
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
    async thinkList(params = {}) {
      let res = await service.thinkList(params, {
        headers: { "Content-Type": "application/json" }
      });
      if (res.errorCode === 0) {
        this.tableData = res.data.list;
        this.totalCount = res.data.total;
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
      } else {
        this.$message({ message: `${res.errorMsg}`, type: "warnning" });
      }
    },
    //删除系统默认行为
    async deleteLogic(actionId) {
      let res = await service.deleteLogic(actionId, {
        headers: { "Content-Type": "application/json" }
      });
      if (res.errorCode === 0) {
        this.thinkList(this.query);
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
      } else {
        this.$message({ message: `${res.errorMsg}`, type: "warnning" });
      }
    }
  },
  mounted() {
    this.thinkList(this.query);
  }
};
</script>
<style lang="less" scoped>
.demo-input-size {
  display: flex;
  > .el-input {
    margin-right: 20px;
  }
}
</style>
