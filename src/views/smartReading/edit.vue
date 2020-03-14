<template>
  <div class="page">
    <div class="page-hd"></div>
    <div class="page-bd">
      <div class="portalweb">
        <template>
          <el-row :gutter="10">
            <el-col :span="24">
              <div class="page-form">
                <el-form
                  class="demo-form-inline"
                  :inline="true"
                  ref="form"
                  :model="form"
                  label-width="120px"
                  label-position="left"
                >
                  <el-form-item
                    label="文章标题"
                    prop="title"
                    :rules="[
                    { required: true, message: '请输入文章标题', trigger: 'blur' }
                  ]"
                  >
                    <el-input placeholder="请输入文章标题" v-model="form.title"></el-input>
                  </el-form-item>
                </el-form>
                <!-- <el-row>
                  <el-button type="primary" size="small" @click="formSubmit('form')">保存</el-button>
                </el-row>-->
              </div>
            </el-col>
          </el-row>
        </template>
        <template>
          <el-row :gutter="10">
            <el-col :span="24">
              <div class="page-form">
                <el-form
                  class="demo-form-inline"
                  :inline="true"
                  ref="form"
                  :model="form"
                  label-width="120px"
                  label-position="left"
                >
                  <el-form-item
                    label="文章简介"
                    prop="intro"
                    :rules="[
                    { required: true, message: '请输入文章简介', trigger: 'blur' }
                  ]"
                  >
                    <el-input placeholder="请输入文章简介" v-model="form.intro"></el-input>
                  </el-form-item>
                </el-form>
                <!-- <el-row>
                  <el-button type="primary" size="small" @click="formSubmit('form')">保存</el-button>
                </el-row>-->
              </div>
            </el-col>
          </el-row>
        </template>
        <template>
          <el-row :gutter="10">
            <el-col :span="24">
              <div class="page-form">
                <el-form
                  class="demo-form-inline"
                  :inline="true"
                  ref="form"
                  :model="form"
                  label-width="120px"
                  label-position="left"
                >
                  <el-form-item label="文章类型">
                    <el-select v-model="form.type" placeholder="请选择类型">
                      <el-option
                        v-for="(item,index) in typeList"
                        :key="index"
                        :label="item.typeName"
                        :value="item.typeId"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
              </div>
            </el-col>
          </el-row>
        </template>
        <template>
          <el-row :gutter="10">
            <el-col :span="24">
              <div class="page-form">
                <el-form
                  class="demo-form-inline"
                  :inline="true"
                  ref="form"
                  :model="form"
                  label-width="120px"
                  label-position="left"
                >
                  <el-form-item label="封面大图">
                    <div class="out">
                      <div v-if="form.banner =='' || form.banner ==null">
                        <i class="el-icon-plus"></i>
                      </div>
                      <div v-else style="border:none" class="img">
                        <img alt :style="{backgroundImage: `url(${form.banner})`}" />
                        <!-- <input type="file" @change="upploadImg" /> -->
                      </div>
                      <input type="file" @change="upploadImg" />
                    </div>
                  </el-form-item>
                </el-form>
                <!-- <el-row>
                  <el-button type="primary" size="small" @click="formSubmit('form')">保存</el-button>
                </el-row>-->
              </div>
            </el-col>
          </el-row>
        </template>
        <template>
          <el-row v-loading="loadding" class="em_ps">
            <div class="edit-container">
              <p style="width:120px">内容</p>
              <quill-editor
                v-model="form.content"
                ref="myQuillEditor"
                :options="editorOption"
                @blur="onEditorBlur($event)"
                @focus="onEditorFocus($event)"
                @change="onEditorChange($event)"
                class="edi"
              ></quill-editor>
            </div>
          </el-row>
          <!-- 图片上传组件辅助-->
          <el-upload
            :with-credentials="true"
            list-type="picture-card"
            class="avatar-uploader"
            name="files"
            ref="upload"
            accept="image/jpeg, image/gif, image/png, image/bmp"
            action="qxiao-cms/action/mod-xiaojiao/image/filesUpload.do"
            :multiple="false"
            :show-file-list="false"
            :auto-upload="true"
            :on-success="handleImageOneSuccess"
            :before-upload="beforeImageUpload"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </template>
        <template>
          <el-row :gutter="10" style="margin-top:-40px">
            <el-col :span="24">
              <div class="page-form">
                <el-form
                  class="demo-form-inline"
                  :inline="true"
                  ref="form"
                  :model="form"
                  label-width="120px"
                  label-position="left"
                >
                  <el-form-item label="文章url" prop="url">
                    <el-input placeholder="请输入文章url" v-model="form.url"></el-input>
                  </el-form-item>
                </el-form>
              </div>
            </el-col>
          </el-row>
        </template>
        <template>
          <el-row :gutter="10">
            <el-col :span="24">
              <div class="page-form">
                <el-form
                  class="demo-form-inline"
                  :inline="true"
                  ref="form"
                  :model="form"
                  label-width="120px"
                  label-position="left"
                >
                  <el-form-item label="推送年级">
                    <el-select
                      v-model="form.grades"
                      :multiple="true"
                      filterable
                      allow-create
                      default-first-option
                      placeholder="请选择推送年级"
                      v-if="!checked"
                    >
                      <el-option
                        v-for="(item,index) in gradeList"
                        :key="index"
                        :label="item.gradeName"
                        :value="item.gradeId"
                      ></el-option>
                    </el-select>

                    <span class="all" :style="{marginLeft:checked?0:'40px'}">
                      <el-checkbox v-model="checked" @change="allGrade">推送全部年级</el-checkbox>
                    </span>
                  </el-form-item>
                </el-form>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-button type="primary" size="small" @click="formSubmit('form')">保存</el-button>
          </el-row>
        </template>
      </div>
    </div>
    <div class="page-ft"></div>
  </div>
</template>
<script>
import bus from "@/utils/bus";
import service from "@/api";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
import { toolbarOptions } from "@/utils/tools";
import { mapActions } from "vuex";

export default {
  name: "portalAdd",
  inject: ["reload"], //注入依赖
  components: {
    quillEditor
  },
  data() {
    return {
      list: [0],
      active: 0,
      checked: false,
      query: {
        menuName: "",
        contentText: []
      },
      form: {
        banner: "",
        content: "",
        id: 0,
        type: 1,
        title: "",
        url: "",
        intro: "",
        grades: []
      },
      loadding: false,
      content: "",
      editorOption: {
        placeholder: "请输入内容",
        modules: {
          toolbar: {
            container: toolbarOptions,
            handlers: {
              image: value => {
                if (value) {
                  // 触发input框选择图片文件
                  document.querySelector(".avatar-uploader input").click();
                } else {
                  this.editor.format("image", false);
                }
              }
            }
          }
        }
      },
      gradeList: [
        {
          gradeName: "一年级",
          gradeId: 1
        },
        {
          gradeName: "二年级",
          gradeId: 2
        },
        {
          gradeName: "三年级",
          gradeId: 3
        },
        {
          gradeName: "四年级",
          gradeId: 4
        },
        {
          gradeName: "五年级",
          gradeId: 5
        },
        {
          gradeName: "六年级",
          gradeId: 6
        },
        {
          gradeName: "七年级",
          gradeId: 7
        },
        {
          gradeName: "八年级",
          gradeId: 8
        },
        {
          gradeName: "九年级",
          gradeId: 9
        },
        {
          gradeName: "托班",
          gradeId: -4
        },
        {
          gradeName: "小班",
          gradeId: -3
        },
        {
          gradeName: "中班",
          gradeId: -2
        },
        {
          gradeName: "大班",
          gradeId: -1
        },
        {
          gradeName: "培训机构",
          gradeId: 0
        }
      ],
      typeList: [
        {
          typeName: "文章",
          typeId: 1
        },
        {
          typeName: "书目",
          typeId: 2
        }
      ]
    };
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  },
  watch: {
    active(newVal, oldVal) {
      console.log(newVal);
      console.log(oldVal);
    }
  },
  methods: {
    onEditorBlur() {},
    onEditorFocus() {},
    onEditorChange() {},
    // handleLiClick(index) {
    //   this.active = index;
    // },
    // handlePageDel() {
    //   let index = this.list.findIndex(elem => elem == this.active);
    //   this.list.splice(index, 1);
    // },
    // handlePageAdd() {
    //   if (this.list.length >= 3) {
    //     return;
    //   }
    //   this.list.push(this.active);
    // },
    //取出单条内容
    // handleGetSingleContent(curr) {
    //   let obj = this.query.contentText.find(elem => elem.page === curr);
    //   if (Object.keys(obj).length) {
    //     this.content = obj.content;
    //   }
    // },
    //保存单条内容
    // handleSaveSingleContent() {
    //   let obj = { page: this.active, content: this.content };
    //   let contentText = this.query.contentText;
    //   contentText.push(obj);
    //   this.content = "";
    //   this.active += 1;
    // },
    ...mapActions("tabs", ["removes"]),
    removeAction(route) {
      this.removes(route).then(res => {
        if (route.path === this.$route.path) {
          this.$router.push({ path: "/portalweb/menu/1" });
        }
      });
    },
    //保存菜单内容
    formSubmit(formName) {
      if (this.form.title == "") {
        this.$message.error("标题不能为空");
        return false;
      }
      if (this.form.intro == "") {
        this.$message.error("简介不能为空");
        return false;
      }
      if (this.form.banner == "") {
        this.$message.error("封面图不能为空");
        return false;
      }
      if (this.form.content == "") {
        this.$message.error("文章内容不能为空");
        return false;
      }
      this.editArticle(this.form);
    },
    handleImageOneSuccess(res, file, fileList) {
      if (res.errorCode === 0) {
        this.loadding = false;
        let index = this.editor.getSelection().index;
        // console.log(index);
        // 插入图片  res.data.url 为服务器返回的图片地址
        this.editor.insertEmbed(index, "image", res.data[0].url);
        this.editor.setSelection(length + 1);
        //插入成功后清除input的内容
        this.$refs.upload.clearFiles();
      } else {
        this.$message.error("图片插入失败");
      }
    },
    beforeImageUpload(file) {
      this.loadding = true;
    },
    escapeStringHTML(str) {
      str = str.replace(/&lt;/g, "<");
      str = str.replace(/&gt;/g, ">");
      return str;
    },
    async editArticle(params = {}) {
      let res = await service.editArticle(params, {
        headers: { "Content-Type": "application/json" }
      });
      if (res.errorCode === 0) {
        this.$router.go(-1);
      }
    },
    async upploadImg(img) {
      var formData = new FormData();
      var file = img.target.files[0];
      formData.append("files", file);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      let res = await service.filesUpload(formData, config);
      if (res.errorCode === 0) {
        this.form.banner = res.data[0].url;
      }
    },
    async articleDetails(params) {
      let res = await service.articleDetails(params, {
        headers: { "Content-Type": "application/json" }
      });
      if (res.errorCode === 0) {
        this.form = res.data;
        if (res.data.grades.length == 14) {
          this.checked = true;
        } else {
          this.checked = false;
        }
      }
      console.log(res);
    },
    allGrade() {
      if (this.checked) {
        let arr = [];
        this.gradeList.forEach(item => {
          arr.push(item.gradeId);
        });
        this.form.grades = arr;
      } else {
        this.form.grades = [];
      }
    }
  },
  mounted() {
    // bus.$on("collapse", msg => {
    //   return msg ? (this.collapse = false) : (this.collapse = true);
    // });
    // console.log(this.editor);
    this.articleDetails(this.$route.query.id);
  }
};
</script>
<style lang="less" scoped>
.quill-page-ul {
  display: flex;
  li {
    cursor: pointer;
    text-align: center;
    width: 30px;
    height: 30px;
    line-height: 30px;
    color: #333;
    margin-right: 5px;
    border-radius: 2px;
    background: #909399;
  }
  .curr {
    color: #fff;
    background: -webkit-gradient(
      linear,
      0% 0%,
      0% 100%,
      from(#3c8ce7),
      to(#0396ff)
    );
  }
}
.page-form {
  padding-right: 10px;
  display: flex;
  justify-content: space-between;
}
.quill-page {
  margin-bottom: 10px;
}
.portalweb {
  width: 1200px;
  margin: 0 auto;
  margin-bottom: 100px;
}
.edit-container {
  width: 100%;
  margin: 0 auto;
  // background-color: #fff;
  display: flex;
  > div {
    width: 700px;
    background: #ffffff;
  }
}
.avatar-uploader {
  opacity: 0;
  display: none;
}

.em_ps {
  height: 390px;
}

.out {
  width: 200px;
  height: 150px;
  position: relative;
  left: 0;
  top: 0px;
  background: #fff;
  > div {
    width: 100%;
    height: 100%;
    border: 1px solid #dcdfe6;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  > input {
    width: 100%;
    height: 100%;
    border: 10px solid #dcdfe6;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    opacity: 0;
  }
}

.img > img {
  width: 100%;
  height: 100%;
  display: block;
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center center;
}
</style>
