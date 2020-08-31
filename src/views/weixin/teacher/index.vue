<template>
  <div
    class="page"
    v-loading="loading"
    element-loading-text="正在导入"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
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
          <el-form-item label="班级">
            <el-select v-model="query.classId" placeholder="选择班级">
              <el-option
                v-for="(item,index) in classListCheck"
                :key="index"
                :label="item.className"
                :value="item.classId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="老师姓名">
            <el-input v-model="query.teacherName" placeholder="请输入老师姓名" maxlength="10"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="small" icon="el-icon-search" type="primary" @click="handleSearch">查询</el-button>
            <el-button size="small" icon="el-icon-plus" type="primary" @click="handleAdd">新增</el-button>
            <!-- accept=".doc,.docx,.xls,.xlsx,.ppt,.pptx,.pdf,.zip,.rar" -->
            <el-upload
              class="upload-excel"
              ref="excel"
              list-type="text"
              :multiple="false"
              :with-credentials="true"
              :show-file-list="false"
              action
              accept=".xls, .xlsx"
              :before-upload="beforeUpload"
            >
              <el-button size="small" icon="el-icon-plus" type="primary">文件导入上传</el-button>
            </el-upload>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="page-bd">
      <el-table :data="tableData" style="width: 100%" size="small">
        <el-table-column label="序号" prop="teacherId"></el-table-column>
        <el-table-column label="老师姓名" prop="teacherName"></el-table-column>
        <el-table-column label="性别" prop="sex">
          <template slot-scope="scope">
            <span v-if="scope.row.sex === 1">男</span>
            <span v-else>女</span>
          </template>
        </el-table-column>
        <el-table-column label="手机号" prop="tel"></el-table-column>
        <el-table-column label="职务类别" prop="type">
          <template slot-scope="scope">
            <span v-if="scope.row.admin === 0">老师</span>
            <span v-else>管理员</span>
          </template>
        </el-table-column>
        <el-table-column label="任教班级" prop="className">
          <template slot-scope="scope">
            <el-dropdown>
              <el-button size="mini" type="primary">
                查看
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-for="(name,index) in scope.row.classList"
                  :key="index"
                >{{ name.className }}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDel(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page-ft">
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
    </div>

    <!-- 新增 or 编辑 -->
    <el-dialog top="40px" title :visible.sync="dialogFormVisible">
      <span slot="title" class="dialog-title">{{ isShow ? '新增': '编辑' }}</span>
      <el-form
        :rules="rules"
        ref="form"
        :model="form"
        status-icon
        size="small"
        :label-width="formLabelWidth"
      >
        <el-form-item label="老师名称" prop="teacherName">
          <el-input v-model="form.teacherName" placeholder="输入老师名称"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="form.sex" placeholder="选择性别">
            <el-option
              v-for="(item,index) in sexList"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号" prop="tel">
          <el-input v-model="form.tel" placeholder="输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="是否是管理员" prop="admin">
          <el-radio v-model="radio" label="0">否</el-radio>
          <el-radio v-model="radio" label="1">是</el-radio>
        </el-form-item>

        <el-row :gutter="5" v-for="(items,index) in form.classList" :key="index">
          <el-col :span="8">
            <el-form-item label="任教班级" prop="classId">
              <el-select
                collapse-tags
                v-model="items.classId"
                value-key="classId"
                placeholder="选择任教班级"
              >
                <el-option
                  v-for="(item,index) in classList.filter(item=>item.classId != 0)"
                  :key="index"
                  :label="item.className"
                  :value="item.classId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="类别" prop="classAdmin">
              <el-select v-model="items.classAdmin" placeholder="选择职位类别">
                <el-option
                  v-for="(item,index) in typeList"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item>
              <el-button
                size="mini"
                icon="el-icon-delete"
                circle
                type="danger"
                @click="handleDeleteteacher(index)"
              ></el-button>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item>
          <el-button icon="el-icon-plus" size="mini" type="primary" @click="handleAddTeacher">新增任教班级</el-button>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogFormVisible = false">取消</el-button>
        <el-button size="small" type="primary" @click="submitForm('form')">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import service from "@/api";
import { sex, type } from "@/mixins";
import pageMixins from "@/mixins/page";
import { isPhone } from "@/utils/validator";
export default {
  name: "teacher",
  mixins: [sex, type, pageMixins],
  data() {
    return {
      query: {
        grade: 0,
        classId: 0,
        teacherName: "",
        schoolId: this.$route.params.id
      },
      form: {
        teacherName: "",
        sex: 1,
        tel: "",
        type: 1,
        classIds: [],
        admin: 1,
        classList: []
      },
      classLists: [
        {
          classId: 0,
          classAdmin: 0
        }
      ],
      radio: "0",
      rules: {
        teacherName: [
          {
            required: true,
            message: "输入老师名称",
            trigger: "blur"
          }
        ],
        sex: [
          {
            required: true,
            message: "选择性别",
            trigger: "blur"
          }
        ],
        tel: [
          {
            required: true,
            message: "手机号不能为空",
            trigger: "blur"
          },
          {
            required: true,
            validator: isPhone,
            trigger: "blur"
          }
        ],
        type: [
          {
            required: true,
            message: "选择职位类别",
            trigger: "blur"
          }
        ],
        classIds: [
          {
            required: true,
            message: "选择任教班级",
            trigger: "blur"
          }
        ]
      },

      classList: [],
      classListCheck:[],

      innerUrl: "",
      loading: false
    };
  },
  methods: {
    //上传文件之前
    async beforeUpload(file) {
      let schoolId = this.$route.params.id; //微信端学校Id
      let fileName = [];
      fileName = file.name.split(".");
      const extension = fileName[fileName.length - 1] === "xls";
      const extensions = fileName[fileName.length - 1] === "xlsx";
      if (!extension && !extensions) {
        this.$message({
          message: "文件只能是xls、xlsx格式!",
          type: "warning"
        });
      }
      if (extension || extensions) {
        let config = {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        };
        let uploadForm = new FormData();
        uploadForm.append("file", file);
        uploadForm.append("schoolId", schoolId);
        this.loading = true;
        let res = await service.teacherBatchAdd(uploadForm, config);
        if (res.errorCode === 0) {
          if (res.data) {
            this.innerUrl = res.data;
            window.location.href = this.innerUrl;
          } else {
            this.$alert("导入成功", "提示", {
              confirmButtonText: "确定",
              type: "success"
            });
          }
          this.queryTeachers(thi.query);
          this.loading = false;
        } else if (res.errorCode === 1) {
          this.loading = false;
        }
      }
      return extension || extensions;
    },
    handleCurrentChange(curr) {
      this.query.page = curr;
      this.queryTeachers(this.query);
    },
    handleSizeChange(size) {
      this.query.pageSize = size;
      this.queryTeachers(this.query);
    },
    handleSearch() {
      this.queryTeachers(this.query);
    },
    handleAdd() {
      this.dialogFormVisible = true;
      this.radio = "0"
      this.form = {
        classList: [{ classId: "", classAdmin: "" }]
      };
      this.isShow = true;
    },
    //  新增任教老师
    handleAddTeacher() {
      this.form.classList.push({ classId: "", classAdmin: "" });
    },
    // 移除任教老师
    handleDeleteteacher(index) {
      this.form.classList.splice(index, 1);
    },
    handleEdit(row) {
      // let { classNames, ...args } = row;
      // let classIds = classNames.map(item => item.classId);
      this.isShow = false;
      this.dialogFormVisible = true;
      this.form = row;
      this.radio = this.form.admin.toString()
    },
    handleDel(row) {
      this.$confirm(`确定删除吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteTeacher(row.teacherId,row.schoolId);
        })
        .catch(error => {
          return false;
        });
    },
    submitForm(formName) {
      console.log(this.form);
      this.$refs[formName].validate(valid => {
        if (valid) {
          let schoolId = this.$route.params.id;
          Object.assign(this.form, { schoolId, admin: parseInt(this.radio) });
          if (this.isShow) {
            this.addTeacher(this.form);
          } else {
            this.updateTeacher(this.form);
          }
        }
      });
    },
    //查询老师列表（微信端）
    async queryTeachers(params = {}) {
      let res = await service.queryTeachers(params, {
        headers: { "Content-Type": "application/json" }
      });
      if (res.errorCode === 0) {
        this.tableData = res.data.data;
        this.totalCount = res.data.totalCount;
      }
    },
    //录入老师信息（微信端）
    async addTeacher(params = {}) {
      let res = await service.addTeacher(params, {
        headers: { "Content-Type": "application/json" }
      });
      if (res.errorCode === 0) {
        this.dialogFormVisible = false;
        this.$refs.form.resetFields();
        this.queryTeachers(this.query);
      } else {
        this.$message({
          message: res.errorMsg
        });
      }
    },
    //删除老师信息（微信端）
    async deleteTeacher(teacherId,schoolId) {
      let res = await service.deleteTeacher(
        { teacherId,schoolId },
        {
          headers: { "Content-Type": "application/json" }
        }
      );
      if (res.errorCode === 0) {
        this.queryTeachers(this.query);
      }
    },
    //编辑老师信息（微信端）
    async updateTeacher(params = {}) {
      let res = await service.updateTeacher(params, {
        headers: { "Content-Type": "application/json" }
      });
      if (res.errorCode === 0) {
        this.dialogFormVisible = false;
        this.$refs.form.resetFields();
        this.queryTeachers(this.query);
      }
    },
    //查询班级列表（微信端）
    async querySchoolClass() {
      let schoolId = this.$route.params.id;
      let res = await service.querySchoolClass(
        { schoolId },
        {
          headers: { "Content-Type": "application/json" }
        }
      );
      if (res.errorCode === 0) {
        this.classList = res.data
        this.classListCheck = res.data.concat([{classId:0,className:'全部'}]);
        // this.query.classId = res.data[0].classId;
      }
    }
  },
  // mounted() {
  //   this.queryTeachers(this.query);
  //   this.querySchoolClass();
  // },

  activated() {
     this.queryTeachers(this.query);
     this.querySchoolClass();
  }
};
</script>
<style lang="less" scoped>
.upload-excel {
  display: inline-block;
  margin-left: 10px;
}
.page {
  height: 100%;
}
</style>
