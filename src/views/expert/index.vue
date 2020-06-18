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
          <el-form-item label="审核状态">
            <el-select v-model="query.status" placeholder="请选择作品类型">
              <el-option
                v-for="item in passStatus"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="专家姓名" prop="title">
            <el-input v-model="query.name"></el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="query.typeId" placeholder="请选择类型">
              <el-option
                v-for="item in listType"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-search" type="primary" @click="handleSearch">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-search" type="primary" @click="handleAdd">新增</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="page-bd">
      <el-table :data="tableData" style="width: 100%" size="small" border>
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column label="专家名称" prop="name"></el-table-column>
        <el-table-column label="类别">
          <template slot-scope="scope">
            <span>{{scope.row.typeName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="简介" width="200">
          <template slot-scope="scope">
            <span @click="handleUrl(scope.row.id)" class="on">查看详情</span>
          </template>
        </el-table-column>
        <el-table-column label="审核节点" width="200">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 0" class="on" @click="handleCheck(scope.row)">未审核</span>
            <span v-if="scope.row.status === 1" class="on" @click="handleCheck(scope.row)">审核通过</span>
            <span v-if="scope.row.status === 2" class="off" @click="handleCheck(scope.row)">审核不通过</span>
          </template>
        </el-table-column>
        <el-table-column label="审核时间" prop="auditTime"></el-table-column>
        <el-table-column label="操作" width="250">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleVote(scope.row.id)"
              v-if="scope.row.status === 0"
            >审核</el-button>
            <el-button size="mini" plain type="info" @click="handleEdit(scope.row.id)">编辑</el-button>
            <el-button size="mini" plain type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
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
    <template>
      <el-dialog
        width="60%"
        top="40px"
        title="专家详情"
        :visible.sync="dialogFormVisible"
        :modal-append-to-body="false"
      >
        <el-form ref="form" :model="obj" label-width="80px">
          <el-form-item label="活动名称">
            <img class="img" alt :style="{backgroundImage: `url(${obj.logo})`}" />
          </el-form-item>
          <el-form-item label="专家姓名">
            <span>{{obj.name}}</span>
          </el-form-item>
          <el-form-item label="类别">
            <span>{{obj.typeName}}</span>
          </el-form-item>
          <el-form-item label="简介">
            <el-input type="textarea" v-model="obj.intro" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="代表作">
            <div class="represent">
              <p
                v-for="(img, index) in obj.images"
                :key="index"
                :style="{backgroundImage: `url(${img})`}"
              ></p>
            </div>
          </el-form-item>
          <template v-if="expertStatus">
            <el-form-item label="是否通过" prop="name">
              <el-radio-group v-model="form.status">
                <el-radio :label="1">通过</el-radio>
                <el-radio :label="2">不通过</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="审核意见" prop="verifyDescrition">
              <el-input type="textarea" v-model="form.comment" :rows="5" placeholder="审核意见"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button size="small" @click="dialogFormVisible = false">取消</el-button>
              <el-button size="small" type="primary" @click="checkForm('check')">审核</el-button>
            </el-form-item>
          </template>
        </el-form>
      </el-dialog>
    </template>

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
      expertStatus: false,
      isShow: false, //判断dialog弹窗是新增还是编辑
      formLabelWidth: "100px",
      query: {
        pageSize: 20,
        pageNum: 1,
        name: "",
        status: "-1",
        typeId: "0"
      },
      form: {
        comment: "",
        id: 0,
        status: 1
      },
      listType: [{ id: "0", name: "全部" }],
      tableData: [],
      totalCount: 0,
      tableDataPass: [],
      passStatus: [
        {
          id: "-1",
          name: "全部"
        },
        {
          id: "0",
          name: "待审核"
        },
        {
          id: "1",
          name: "通过"
        },
        {
          id: "2",
          name: "拒绝"
        }
      ],
      obj: {
        logo: ""
      }
    };
  },
  methods: {
    handleSearch() {
      this.query.pageNum = 1;
      this.expertList(this.query);
    },
    handleCurrentChange(curr) {
      this.query.pageNum = curr;
      this.expertList(this.query);
    },
    handleSizeChange(size) {
      this.query.pageSize = size;
      this.expertList(this.query);
    },
    handleAdd() {
      this.$router.push({ path: `/expert/add/9527` });
    },
    handleEdit(id) {
      this.$router.push({
        path: "/expert/edit/9527",
        query: {
          id
        }
      });
    },
    handleCheck(row) {
      this.dialogFormVisiblePass = true;
      this.checkExppert(row.id);
    },

    async checkExppert(params) {
      let res = await service.checkExppert(params, {
        headers: { "Content-Type": "application/json" }
      });
      if (res.errorCode === 0) {
        this.tableDataPass = res.data;
      } else if (res.errorCode === 404) {
        this.tableDataPass = [];
      }
    },

    async checkForm() {
      let res = await service.expertCheck(this.form, {
        headers: { "Content-Type": "application/json" }
      });
      if (res.errorCode === 0) {
        this.dialogFormVisible = false;
        this.$message({ message: `审核成功`, type: "success" });
        this.expertList(this.query);
      } else {
        this.$message({ message: `${res.errorMsg}` });
      }
    },

    handleVote(id) {
      this.expertStatus = true;
      this.dialogFormVisible = true;
      this.form.id = id;
      this.expertDetails(id);
    },
    handleUrl(id) {
      this.expertStatus = false;
      this.dialogFormVisible = true;
      this.expertDetails(id);
    },

    //查询所有行为
    async expertList(params = {}) {
      let res = await service.expertList(params, {
        headers: { "Content-Type": "application/json" }
      });
      if (res.errorCode === 0) {
        this.tableData = res.data.list;
        this.totalCount = res.data.total;
      } else if (res.errorCode === 404) {
        this.tableData = [];
      }
    },

    // 作品类型
    async expertType(params = {}) {
      let res = await service.workType({
        headers: { "Content-Type": "application/json" }
      });
      if (res.errorCode === 0) {
        this.listType = this.listType.concat(res.data);
      }
    },
    //编辑系统默认行为
    async expertDetails(params) {
      let res = await service.expertDetails(params, {
        headers: { "Content-Type": "application/json" }
      });
      if (res.errorCode === 0) {
        this.obj = res.data;
      }
    },
    //删除系统默认行为
    async goodVote(id) {
      let res = await service.deleteLogic(id, {
        headers: { "Content-Type": "application/json" }
      });
      if (res.errorCode === 0) {
        this.$message({ message: `投票成功`, type: "success" });
        this.expertList(this.query);
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
    },

    handleDelete(id) {
      this.$confirm(`确定删除吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.expertDelete(id);
        })
        .catch(error => {
          return false;
        });
    },

    async expertDelete(id) {
      let res = await service.expertDelete(id);
      if (res.errorCode === 0) {
        this.$message("删除成功");
        this.expertList(this.query);
      } else {
        this.$message(res.errorMsg);
      }
    }
  },
  activated() {
    this.expertList(this.query);
    this.expertType();
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
.represent {
  display: flex;
  align-items: center;
  > p {
    width: 150px;
    height: 100px;
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: center center;
  }
}

.img {
  display: block;
  width: 100px;
  height: 100px;
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center center;
  border-radius: 100%;
}
</style>
