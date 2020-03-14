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
                  <el-form-item label="文章标题" prop="title">
                    <el-input placeholder="请输入文章标题" v-model="form.title" :disabled="true"></el-input>
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
                  <el-form-item label="文章简介" prop="intro">
                    <el-input placeholder="请输入文章简介" v-model="form.intro" :disabled="true"></el-input>
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
                    <el-select v-model="form.type" placeholder="请选择类型" :disabled="true">
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
              <div class="content" v-html="form.content">{{form.content}}</div>
            </div>
          </el-row>
          <!-- 图片上传组件辅助-->
          <!-- <el-upload
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
          </el-upload>-->
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
                  <el-form-item label="文章url" prop="url">
                    <el-input placeholder="请输入文章url" v-model="form.url" :disabled="true"></el-input>
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
                      multiple
                      filterable
                      allow-create
                      default-first-optionplaceholder="请选择推送年级"
                      :disabled="true"
                      v-if="!checked"
                    >
                      <el-option
                        v-for="(item,index) in gradeList"
                        :key="index"
                        :label="item.gradeName"
                        :value="item.gradeId"
                      ></el-option>
                    </el-select>
                    <span class="all" :style="{marginLeft:checked?0:'40px'}" v-else>
                      <el-checkbox v-model="checked" :disabled="true">推送全部年级</el-checkbox>
                    </span>
                  </el-form-item>
                </el-form>
              </div>
            </el-col>
          </el-row>
          <!-- <el-row>
            <el-button type="primary" size="small" @click="formSubmit('form')">保存</el-button>
          </el-row>-->
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
        title: "",
        url: "",
        intro: "",
        grades: [],
        type: 1
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
  methods: {
    async articleDetails(params) {
      let res = await service.articleDetails(params, {
        headers: { "Content-Type": "application/json" }
      });
      if (res.errorCode === 0) {
        console.log(res.data);
        this.form = res.data;
        if (res.data.grades.length == 14) {
          this.checked = true;
        } else {
          this.checked = false;
        }
      }
      console.log(res);
    }
  },
  mounted() {
    this.articleDetails(this.$route.query.id);
  },
  activated() {
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

.content {
  max-height: 390px;
  overflow: auto;
  padding: 10px;
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
