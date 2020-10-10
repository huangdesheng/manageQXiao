<template>
  <div class="page">
    <div class="page-hd">
      <div class="page-form">
        <el-form class="demo-form-inline"
                 :inline="true"
                 :model="query"
                 size="small"
                 label-width="70px"
                 label-position="left">
          <el-form-item label="班级名称">
            <el-input v-model="query.className"
                      placeholder="请输入标签名称"
                      maxlength="10"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="small"
                       icon="el-icon-search"
                       type="primary"
                       @click="handleSearch">查询</el-button>
            <el-button size="small"
                       icon="el-icon-plus"
                       type="primary"
                       @click="handleAdd">新增</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="page-bd">
      <el-table :data="tableData"
                style="width: 100%"
                size="small">
        <el-table-column label="序号"
                         prop="classId"></el-table-column>
        <el-table-column label="年级名称"
                         prop="gradeName"></el-table-column>
        <el-table-column label="班级名称"
                         prop="className"></el-table-column>
        <el-table-column label="班级简介"
                         prop="intro"
                         v-if="schoolType === 2"></el-table-column>
        <el-table-column label="班级状态"
                         prop="intro">
          <template slot-scope="scope">
            <span v-if="scope.row.classState === 1">正常</span>
            <span v-if="scope.row.classState === 2">已封存</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini"
                       type="text"
                       @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini"
                       type="text"
                       @click="handleDel(scope.row)"
                       style="color:#f78989">删除</el-button>
            <el-button size="mini"
                       type="text"
                       v-if="scope.row.classState === 1"
                       @click="handleBlock(scope.row)">毕业封班</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- <div class="
                       page-ft">
    </div> -->
    <!-- 新增 or 编辑 -->
    <el-dialog top="40px" title :visible.sync="dialogFormVisible"> 
      <span slot="title" class="dialog-title">{{ isShow ? '新增': '编辑' }}</span>
      <el-form ref="form" :model="form"  status-icon  size="small" :label-width="formLabelWidth">
        <el-form-item label="班级头像"  class="flex" v-if="schoolType === 2">         
          <div class="photo">
            <div v-if="form.logo == '' || form.logo == null">
              <i class="el-icon-plus"></i>
            </div>
            <div v-else style="border:none" class="img">
              <img alt :style="{backgroundImage: `url(${form.logo})`}" class="photoImg" />
            </div>
            <input type="file"  @change="upploadImg($event)" />
          </div>
        </el-form-item>
        <el-form-item label="班级类型" prop="classType" :rules="[{ required: true, message: '选择班级类型', trigger: 'blur' }]">
          <el-select v-model="form.classType"  placeholder="请选择对应的班级类型"  @change="handleSelectGrade">
            <el-option v-for="item in classType"
                       :key="item.classtype"
                       :label="item.text"
                       :value="item.classtype"></el-option>
          </el-select>
        </el-form-item>
        <template v-if="form.classType">
          <el-form-item label="年级" prop="grade" :rules="[{ required: true, message: '选择年级', trigger: 'blur' }]">
            <el-select v-model="form.grade"  placeholder="选择年级">
              <el-option v-for="item in gradeList"
                        :key="item.value"
                        :label="item.text"
                        :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="班级号" v-if="form.classType === 1">
            <el-select v-model="form.classNo"  placeholder="请选择对应班级">
              <el-option v-for="item in classCodeList"
                        :key="item.value"
                        :label="item.text"
                        :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="班级名称"
                        prop="className"
                        :rules="[ { required: true, message: '请输入班级名称', trigger: 'blur' }]" v-else>
            <el-input v-model="form.className"
                      placeholder="请输入班级名称"></el-input>
          </el-form-item>
        </template>
        <el-form-item label="班级简介"
                      v-if="schoolType === 2"
                      prop="intro"
                      :rules="[ { required: true, message: '简介不能为空', trigger: 'blur'}]">
          <el-input v-model="form.intro"
                    placeholder="最多十五字"
                    maxlength="15"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button size="small"
                   @click="dialogFormVisible = false">取消</el-button>
        <el-button size="small"
                   type="primary"
                   @click="submitForm('form')">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import service from "@/api";
import pageMixins from "@/mixins/page";
import { classTypeList, class_code } from "@/mixins/index.js"
export default {
  name: "class",
  mixins: [ pageMixins, classTypeList, class_code ],
  data() {
    return {
      schoolType: this.$route.query.schoolType,
      query: {
        className: "",
        schoolId: this.$route.params.id,
        grade: 0,
      },
      form: {
        className: "",
        grade: null,
        logo: "",
        intro: "",
        classType:'',
        classNo:''
      },
      logo: "",
      gradeList: [],
    };
  },
  methods: {
    // 班级查询
    handleSearch() {
      this.queryClasses(this.query);
    },
    handleAdd() {
      this.dialogFormVisible = true;
      this.form = {
        schoolType: this.schoolType,
        logo: "",
      };
      this.isShow = true;
    },
    handleEdit(row) {
      this.isShow = false;
      this.dialogFormVisible = true;
      console.log(row)
      // let {}
      this.form = Object.assign({}, row);
    },
    handleDel(row) {
      this.$confirm(`确定删除吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.deleteClass(row.classId);
        })
        .catch((error) => {
          return false;
        });
    },

    handleBlock(row) {
      this.$confirm(`封存班级将无法使用，请确认是否封存?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.blockClass(row.classId);
        })
        .catch((error) => {
          return false;
        });
    },

    //删除班级信息（微信端）
    async blockClass(classId) {
      let res = await service.blockClass(
        { classId, schoolId: this.$route.params.id },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (res.errorCode === 0) {
        this.queryClasses(this.query);
      }
    },

    //表单提交
    submitForm(formName) {
      console.log(this.form)
      if (this.form.logo == "" && this.schoolType === 2) {
        this.$message("请上传班级头像");
        return false;
      }
      let {classNo, className, classType} = this.form
      if(classType === 1) {
        if(classNo === '' || classNo === null || classNo === 0) {
          this.$message("请选择班级号");
          return false;
        }
      }else{
        if(className === '' || className === null) {
          this.$message("请输入班级名称");
          return false;
        }
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let schoolId = this.$route.params.id;
          Object.assign(this.form, { schoolId });
          if (this.isShow) {
            this.addClass(this.form);
          } else {
            this.updateClass(this.form);
          }
        }
      });
    },
    //查询班级列表（微信端）
    async queryClasses(params = {}) {
      let res = await service.queryClasses(params, {
        headers: { "Content-Type": "application/json" },
      });
      if (res.errorCode === 0) {
        this.tableData = res.data;
        // this.schoolType = res.data[0].schoolType
      }
    },
    //新增班级信息（微信端）
    async addClass(params = {}) {
      let res = await service.addClass(params, {
        headers: { "Content-Type": "application/json" },
      });
      if (res.errorCode === 0) {
        this.dialogFormVisible = false;
        this.queryClasses(this.query);
        // this.$refs.form.resetFields();
      }
    },
    //编辑班级信息（微信端）
    async updateClass(params = {}) {
      let res = await service.updateClass(params, {
        headers: { "Content-Type": "application/json" },
      });
      if (res.errorCode === 0) {
        // this.$refs.form.resetFields();
        this.dialogFormVisible = false;
        this.queryClasses(this.query);
      }
    },
    //删除班级信息（微信端）
    async deleteClass(classId) {
      let res = await service.deleteClass(
        { classId },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (res.errorCode === 0) {
        this.queryClasses(this.query);
      }
    },
    //年级查询
    handleSelectGrade(params) {
      this.$set(this.form, 'grade', null)
      this.$set(this.form, 'className', null)
      this.$set(this.form, 'classNo', null)
      this.queryGradeList(params)
    },

    async queryGradeList(params) {
      let res = await service.queryGradeList(params, {
        headers: { "Content-Type": "application/json" },
      });
      if (res.errorCode === 0) {
        this.gradeList = res.data;
      }
    },
    async upploadImg(img) {
      var fileLength = Array.from(img.target.files);
      var formData = new FormData();
      for (var i = 0; i < fileLength.length; i++) {
        var file = fileLength[i];
        formData.append("files", file);
      }
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      let res = await service.filesUpload(formData, config);
      if (res.errorCode === 0) {
        this.$set(this.form, "logo", res.data[0].url);
      } else if (res.errorCode === 1) {
        this.$message(res.errorMsg);
      }
    },
  },
  activated() {
    this.queryClasses(this.query);
    // this.queryGrade();
  },
};
</script>
<style lang="less" scoped>
.photo {
  width: 100px;
  height: 100px;
  border-radius: 100%;
  background: #fff;
  > div {
    width: 100px;
    height: 100px;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #dcdfe6;
    border-radius: 100%;
  }

  > input {
    width: 100px;
    height: 100px;
    border: 10px solid #dcdfe6;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    opacity: 0;
  }
}

.photoImg {
  width: 100px;
  height: 100px;
  display: block;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  border-radius: 100%;
}
</style>
