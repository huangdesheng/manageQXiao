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
            <el-button icon="el-icon-plus" type="primary" @click="handleAdd">新增</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="page-bd">
      <el-table :data="tableData" style="width: 100%" size="small" border align="center">
        <el-table-column label="序号" type="index" align="center"></el-table-column>
        <el-table-column label="时间" prop="createTime" width="200" align="center"></el-table-column>
        <el-table-column label="内容" prop="content" align="center"></el-table-column>
      
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
             <el-button
              size="mini"
              type="text"
              v-if="scope.row.status === 1"
            >使用中</el-button>
             <el-button
              size="mini"
              type="text"
              @click="handleUser(scope.row.id)"
               v-if="scope.row.status === 0"
            >使用</el-button>
            <el-button
              size="mini"
              type="text"
              @click="handleEdit(scope.row)"
            >编辑</el-button>
            <el-button
              size="mini"
              type="text"
              style="color:red"
              @click="handleDel(scope.row.id)"
              v-if="scope.row.status === 0"
            >删除</el-button>
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
      <span slot="title" class="dialog-title">{{ isShow ? '新增': '编辑' }}</span>
      <el-form ref="form" :model="form" status-icon size="small" label-width="0px">
        <el-form-item>
          <el-input v-model="form.content" placeholder="输入动态语句" maxlength="15"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="dialogFormVisible=false">取消</el-button>
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
        pageNum: 1,
        pageSize: 10
      },
      form: {
       content:''
      },
      tableData: [],
      totalCount: 0
    };
  },
  methods: {
    handleSearch() {
      this.query.page = 1;
      this.sloganList(this.query);
    },
    handleCurrentChange(curr) {
      this.query.page = curr;
      this.sloganList(this.query);
    },
    handleSizeChange(size) {
      this.query.pageSize = size;
      this.sloganList(this.query);
    },
    handleAdd() {
      this.isShow = true;
      this.dialogFormVisible = true;
      this.form = {};
    },
    handleEdit(row) {
      this.isShow = false;
      this.dialogFormVisible = true;
      this.form = Object.assign({}, row);
      console.log(this.form)
    },
    handleDel(id) {
      this.$confirm(`确定删除吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteSlogan(id);
        })
        .catch(error => {
          return false;
        });
    },
  
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.isShow) {
            this.addSlogan(this.form);
          } else {
            this.updateSlogan(this.form);
          }
        }
      });
    },
    //查询所有行为
    async sloganList(params = {}) {
      let res = await service.sloganList(params, {
        headers: { "Content-Type": "application/json" }
      });
      if (res.errorCode === 0) {
        this.tableData = res.data.list;
        this.totalCount = res.data.total;
      }
    },
    //编辑系统默认行为
    async updateSlogan(params = {}) {
      let res = await service.updateSlogan(params, {
        headers: { "Content-Type": "application/json" }
      });
      if (res.errorCode === 0) {
        this.dialogFormVisible = false;
        this.$refs.form.resetFields();
        this.sloganList(this.query);
      }
    },
    //删除系统默认行为
    async deleteSlogan(id) {
      let res = await service.deleteSlogan(
        { id },
        {
          headers: { "Content-Type": "application/json" }
        }
      );
      if (res.errorCode === 0) {
        this.sloganList(this.query);
      }
    },

    async handleUser(id) {
       let res = await service.userSlogan({id}, {
        headers: { "Content-Type": "application/json" }
      });
      if (res.errorCode === 0) {
        this.sloganList(this.query);
      }
    },
    //新增系统默认行为
    async addSlogan(params = {}) {
      let res = await service.addSlogan(params, {
        headers: { "Content-Type": "application/json" }
      });
      if (res.errorCode === 0) {
        this.dialogFormVisible = false;
        this.$refs.form.resetFields();
        this.sloganList(this.query);
      }
    }
  },
  mounted() {
    this.sloganList(this.query);
  }
};
</script>
<style lang="less" scoped>
</style>
