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
          <el-form-item label="标题" prop="title">
            <el-input v-model="query.keyword"></el-input>
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
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="简介">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="handleEdit(scope.row.id)">查看详情</el-button>
            <!-- <el-button size="mini" type="primary" @click="handleEditArticle(scope.row.id)">编辑</el-button> -->
            <!-- <el-button size="mini" type="primary" @click="handleDeleteArticle(scope.row.id)">删除</el-button> -->
          </template>
        </el-table-column>
        <el-table-column label="文章链接" prop="url"></el-table-column>
        <el-table-column label="查看人数" prop="viewCount"></el-table-column>
        <el-table-column width="200" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="handleEditArticle(scope.row.id)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDeleteArticle(scope.row.id)">删除</el-button>
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
          label="主题元素"
          prop="topicElement"
          :rules="[
          { required: true, message: '请输入主题元素', trigger: 'blur' }
        ]"
        >
          <el-input v-model="form.topicElement" placeholder="请输入主题元素"></el-input>
        </el-form-item>
        <el-form-item
          label="可择元素"
          prop="optionalElement"
          :rules="[
          { required: true, message: '请输入可择元素', trigger: 'blur' }
        ]"
        >
          <el-input v-model="form.optionalElement" placeholder="请输入可择元素"></el-input>
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
        pageNum: 1,
        keyword: ""
      },
      form: {
        optionalElement: "",
        topicElement: ""
      },
      tableData: [],
      totalCount: 0
    };
  },
  methods: {
    handleSearch() {
      this.query.pageNum = 1;
      this.articleList(this.query);
    },
    handleCurrentChange(curr) {
      this.query.pageNum = curr;
      this.articleList(this.query);
    },
    handleSizeChange(size) {
      this.query.pageSize = size;
      this.articleList(this.query);
    },
    handleAdd() {
      this.$router.push({ path: `/smartReading/add/9527` });
    },
    handleEdit(id) {
      this.$router.push({
        path: "/smartReading/details/9527",
        query: {
          id
        }
      });
    },
    handleEditArticle(id) {
      this.$router.push({
        path: "/smartReading/edit/9527",
        query: {
          id
        }
      });
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
    async articleList(params = {}) {
      let res = await service.articleList(params, {
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
      }
    },
    handleDeleteArticle(id) {
      this.$confirm(`确定删除该文章吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteArticle(id);
        })
        .catch(error => {
          return false;
        });
    },
    async deleteArticle(id) {
      let res = await service.deleteArticle(id);
      if (res.errorCode === 0) {
        this.articleList(this.query);
      }
    }
  },
  mounted() {
    this.articleList(this.query);
  },
  activated() {
    this.articleList(this.query);
  }
};
</script>
<style lang="less" scoped>
</style>
