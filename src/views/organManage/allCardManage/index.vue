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
            <el-select v-model="query.type" clearable placeholder="请选择设备状态">
              <el-option
                v-for="item in cardList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="有限期">
            <el-select v-model="query.forever" clearable placeholder="请选择设备状态">
              <el-option
                v-for="item in timeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="活动标题">
            <el-input v-model="query.title" placeholder="请输入活动标题" maxlength="10"></el-input>
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
          <el-table-column label="机构类型" prop="instTitle"></el-table-column>
          <el-table-column label="类型" prop="name">
            <template slot-scope="scope" min-width="30">
              <span v-if="scope.row.type === 1">优惠券</span>
              <span v-if="scope.row.type === 2">体验券</span>
            </template>
          </el-table-column>
          <el-table-column label="活动标题" prop="title"></el-table-column>
          <el-table-column label="有效期">
            <template slot-scope="scope" min-width="30">
              <span v-if="scope.row.forever == 1">永久</span>
              <span v-if="scope.row.type === 2">{{scope.row.startTime}}至{{scope.row.endTime}}</span>
            </template>
          </el-table-column>
          <el-table-column label="发布时间" prop="issueTime"></el-table-column>
          <el-table-column label="发布数量" prop="issueNumber" min-width="40"></el-table-column>
          <el-table-column label="领券数量" prop="receiveNumber" min-width="40"></el-table-column>
          <el-table-column label="核销数量" min-width="40">
            <template slot-scope="scope" min-width="30">
              <template>
                <span @click="handleStage(scope.row)" class="on">{{scope.row.chargeNumber}}</span>
              </template>
            </template>
          </el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope" min-width="30">
              <template v-if="scope.row.state === 0">
                <span>未发布</span>
              </template>
              <template v-if="scope.row.state === 1">
                <span>展示中</span>
              </template>
              <template v-if="scope.row.state === 2">
                <span>下架</span>
              </template>
            </template>
          </el-table-column>

          <el-table-column label="操作" min-width="150">
            <template slot-scope="scope">
              <template>
                <el-button
                  size="mini"
                  type="primary"
                  @click="handleDown(scope.row)"
                  v-if="scope.row.state == 1"
                >下架</el-button>
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

    <!-- 新增或编辑 -->
    <!-- <template>
      <el-dialog top="40px" title :visible.sync="dialogFormVisible">
        <span slot="title" class="dialog-title">{{word}}</span>
        <el-form
          :model="addQuery"
          size="small"
          label-width="120px"
          label-position="left"
          :rules="rules"
          ref="addQuery"
          class="form_class"
        >
          <el-form-item label="卡券类型" prop="cardTypeStatus">
            <el-select v-model="addQuery.cardTypeStatus" clearable placeholder="请选择设备状态">
              <el-option
                v-for="item in cardTypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="卡券标题" prop="title">
            <el-input v-model="addQuery.title" placeholder="请输入卡券标题" maxlength="10"></el-input>
          </el-form-item>
          <el-form-item label="卡券内容" prop="desc">
            <el-input type="textarea" v-model="addQuery.desc" :rows="6" placeholder="请输入卡券内容"></el-input>
          </el-form-item>

          <el-form-item label="活动时间" prop="cardStatus">
            <el-select
              v-model="addQuery.cardStatus"
              clearable
              placeholder="请选择卡券类型"
              style="margin-right:30px;"
            >
              <el-option
                v-for="item in addQueryList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-date-picker
              v-model="addQuery.startTime"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
              v-if="addQuery.cardStatus==1"
            ></el-date-picker>
          </el-form-item>

          <el-form-item label="优惠面额(元)" prop="price" v-if="addQuery.cardTypeStatus==0">
            <el-input v-model="addQuery.price" placeholder="请输入优惠面额" maxlength="10"></el-input>
          </el-form-item>
          <el-form-item label="体验面额(元)" prop="price" v-if="addQuery.cardTypeStatus==1">
            <el-input v-model="addQuery.price" placeholder="请输入优惠面额" maxlength="10"></el-input>
          </el-form-item>
          <el-form-item label="发行数量(张)" prop="num">
            <el-input v-model="addQuery.num" placeholder="请输入优惠面额" maxlength="10"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button @click="dialogFormVisible = false">取消</el-button>
            <el-button type="primary" @click="onSubmit('addQuery')">保存</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </template>-->

    <!-- 核销 -->
    <!-- <template>
      <el-dialog top="40px" title :visible.sync="dialogWriteVisible">
        <span slot="title" class="dialog-title">卡券核销</span>
        <el-form
          :model="write"
          size="small"
          label-width="80px"
          label-position="left"
          class="form_class"
        >
          <el-form-item label="卡券标题" prop="title">
            <el-input v-model="write.code" placeholder="请输入卡券标题" maxlength="10"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="btnWrite">确认核销</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </template>-->

    <!-- 优惠券预览 -->
    <template>
      <el-dialog top="40px" title :visible.sync="dialogPrwViewVisible">
        <span slot="title" class="dialog-title">优惠券预览</span>
        <div class="cardAdvan">
          <div>
            <div class="left">
              <p>优惠券</p>
            </div>
            <div class="right">
              <div class="r-t">
                <div>
                  <span>优惠</span>
                  <span>500</span>
                </div>
                <div>
                  <p>庆祝德生三周年</p>
                  <p>时间：2019.10.20-2019.12.30</p>
                </div>
              </div>
              <p class="r-b">涌现出很多教育教学方式。课程改革的核心理念之一就是在教学中渗透情感态度与涌现出很多教育教学方式。课程改革的核心理念之一就是在教学中渗</p>
            </div>
          </div>
        </div>
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
        title: "",
        type: "",
        code: "",
        forever: ""
      },
      cardList: [
        { value: "", label: "全部" },
        { value: 1, label: "优惠券" },
        { value: 2, label: "体验券" }
      ],
      timeList: [
        { value: "", label: "全部" },
        { value: 1, label: "永久" },
        { value: 0, label: "自定义" }
      ],
      tableData: [],
      totalCount: "",
      // 卡券新增
      // dialogFormVisible: false,
      addQuery: {
        cardStatus: 0,
        title: "",
        desc: "",
        cardTypeStatus: 0,
        startTime: [],
        endTime: "",
        price: 0,
        num: 0
      },
      // 核销
      write: {
        code: ""
      },
      // dialogWriteVisible: false,

      // 优惠券预览
      dialogPrwViewVisible: false
    };
  },
  mounted() {
    this.couponList();
  },
  activated() {
    this.couponList();
  },

  methods: {
    async couponList() {
      let res = await service.couponList(this.query, {
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
      this.couponList();
    },

    handleCurrentChange(curr) {
      this.query.page = curr;
      this.couponList();
    },
    handleSizeChange(size) {
      this.query.pageSize = size;
      this.couponList();
    },
    handleSearch() {
      this.couponList();
    },
    // 查询
    handleStage(row) {
      this.$router.push({
        path: `/organManage/verificationDetails/${row.id}`
      });
    },
    // 确认核销
    // btnWrite() {
    //   console.log("确认核销");
    // },
    // 下架
    async handleDown(row) {
      let res = await service.couponDown(row.id, {
        headers: { "Content-Type": "application/json" }
      });
      if (res.errorCode === 0) {
        this.couponList();
      } else if (res.errorCode === -1) {
      } else if (res.errorCode === 404) {
      } else {
        this.$message(res.errorMsg);
      }
    }

    // handleCheck() {
    //   console.log("查询");
    // },

    // handleSizeChange() {
    //   console.log("上一页");
    // },

    // handleCurrentChange() {
    //   console.log("下一页");
    // },
    // onSubmit(addQuery) {
    //   this.$refs[addQuery].validate(valid => {
    //     console.log(valid);
    //     if (valid) {
    //       alert("submit!");
    //     } else {
    //       console.log("error submit!!");
    //       return false;
    //     }
    //   });
    // }
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

.form_class {
  .el-input {
    width: 400px;
  }

  .el-textarea {
    width: 400px;
  }
}

.cardAdvan {
  width: 100%;
  display: flex;
  justify-content: center;
  color: #fff;
  > div {
    width: 640px;
    height: 230px;
    background: linear-gradient(
      150deg,
      rgba(249, 146, 146, 1) 0%,
      rgba(255, 93, 93, 1) 100%
    );
    border-radius: 10px;
    display: flex;
    .left {
      width: 150px;
      height: 100%;
      display: flex;
      justify-content: center;
      border-right: 1px dashed #fff;
      p {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 30px;
        height: 100%;
        font-size: 25px;
        color: #fff;
      }
    }
  }
}
.right {
  margin: 20px 20px;
}
.r-t {
  display: flex;
  align-items: center;
  > div {
    &:nth-of-type(1) {
      span {
        color: #fff;
        &:nth-of-type(1) {
          font-size: 20px;
        }
        &:nth-of-type(2) {
          font-size: 80px;
        }
      }
    }
    &:nth-of-type(2) {
      margin-left: 20px;
      p {
        font-size: 20px;
        &:nth-of-type(2) {
          font-size: 14px;
          margin-top: 10px;
        }
      }
    }
  }
}

.r-b {
  margin-top: 15px;
  font-size: 16px;
  line-height: 25px;
}
</style>