<template>
  <div class="page">
    <div class="page-hd"></div>
    <div class="page-bd">
      <div class="portalweb">
        <template>
          <el-row :gutter="4">
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
                  <el-form-item label="专家头像">
                    <div class="photo">
                      <div v-if="form.logo =='' || form.logo == null">
                        <i class="el-icon-plus"></i>
                      </div>
                      <div v-else style="border:none" class="img">
                        <img alt :style="{backgroundImage: `url(${form.logo})`}" class="photoImg" />
                      </div>
                      <input type="file" @change="upploadImg($event,1)" />
                    </div>
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
                  <el-form-item
                    label="专家名称"
                    prop="name"
                    :rules="[
                    { required: true, message: '专家名称不能为空', trigger: 'blur' }
                  ]"
                  >
                    <el-input placeholder="请输入专家名称" v-model="form.name" style="width:500px;"></el-input>
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
                  <el-form-item label="专家类别">
                    <el-select v-model="form.typeId" placeholder="请选择类别">
                      <el-option
                        v-for="(item,index) in typeList"
                        :key="index"
                        :label="item.name"
                        :value="item.id"
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
                  <el-form-item
                    label="手机号码"
                    prop="phone"
                    :rules="[
                    { required: true, message: '手机号码不能为空', trigger: 'blur' }
                  ]"
                  >
                    <el-input
                      placeholder="请输入手机号码"
                      v-model.number="form.phone"
                      style="width:500px;"
                    ></el-input>
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
                  <el-form-item
                    label="专家简介"
                    prop="intro"
                    :rules="[
                    { required: true, message: '专家简介不能为空', trigger: 'blur' }
                  ]"
                  >
                    <el-input
                      placeholder="请输入专家简介"
                      v-model="form.intro"
                      style="width:500px;"
                      type="textarea"
                      :rows="8"
                    ></el-input>
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
                      <div>
                        <div style="border:none" class="img" v-if="form.images.length>0">
                          <div v-for="(item,index) in form.images" :key="index">
                            <i class="el-icon-close" @click="handleDelete(index)"></i>
                            <img alt :style="{backgroundImage: `url(${item})`}" />
                          </div>
                        </div>

                        <div v-if="form.images.length < 3" class="addPic">
                          <div>
                            <i class="el-icon-plus"></i>
                          </div>
                          <input type="file" @change="upploadImg($event,2)" multiple />
                        </div>
                      </div>
                    </div>
                  </el-form-item>
                </el-form>
              </div>
            </el-col>
          </el-row>
        </template>

        <template>
          <el-row>
            <el-button @click="handleCancel('form')" classs class="btn cancel">取消</el-button>
            <el-button type="primary" @click="handleAdd('form')" class="btn submit">保存</el-button>
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
import { toolbarOptions } from "@/utils/tools";
import { mapActions } from "vuex";

export default {
  name: "portalAdd",
  inject: ["reload"], //注入依赖
  data() {
    return {
      list: [0],
      active: 0,
      checked: false,
      query: {
        menuName: "",
        contentText: []
      },
      form: {},
      loadding: false,
      typeList: []
    };
  },

  mounted() {
    this.expertType();
    this.expertDetails(this.$route.query.id);
  },
  methods: {
    // 作品类型
    async expertType(params = {}) {
      let res = await service.workType({
        headers: { "Content-Type": "application/json" }
      });
      if (res.errorCode === 0) {
        this.typeList = res.data;
        this.form.typeId = res.data[0].id;
      }
    },

    //编辑系统默认行为
    async expertDetails(id) {
      let res = await service.expertDetails(id, {
        headers: { "Content-Type": "application/json" }
      });
      if (res.errorCode === 0) {
        this.form = res.data;
      }
    },
    //保存菜单内容
    handleAdd(formName) {
      if (this.form.logo == "") {
        this.$message.error("请上传专家头像");
        return false;
      }
      if (this.form.name == "") {
        this.$message.error("专家姓名不能为空");
        return false;
      }
      if (this.form.intro == "") {
        this.$message.error("专家简介不能为空");
        return false;
      }
      if (this.form.phone === "") {
        this.$message.error("手机号码不能为空");
        return false;
      }
      if (this.form.images.length === 0) {
        this.$message.error("请上传代表作");
        return false;
      }
      this.expertUpdate(this.form);
    },

    async expertUpdate(params = {}) {
      let res = await service.expertUpdate(params, {
        headers: { "Content-Type": "application/json" }
      });
      if (res.errorCode === 0) {
        this.$router.go(-1);
      } else if (res.errorCode === 1) {
        this.$message(res.errorMsg);
      }
    },
    async upploadImg(img, index) {
      var fileLength = Array.from(img.target.files);
      var formData = new FormData();

      if (index === 1) {
      } else if (index === 2) {
        if (
          fileLength.length > 3 ||
          this.form.images.length + fileLength.length > 3
        ) {
          alert("超过上传数量");
          return false;
        }
      }

      for (var i = 0; i < fileLength.length; i++) {
        var file = fileLength[i];
        formData.append("files", file);
      }

      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      let res = await service.filesUpload(formData, config);
      if (res.errorCode === 0) {
        if (index === 1) {
          this.form.logo = res.data[0].url;
        } else if (index === 2) {
          let arr = [];
          res.data.forEach(element => {
            arr.push(element.url);
          });
          this.form.images = this.form.images.concat(arr);
        }
      }
    },
    handleDelete(index) {
      this.form.images.splice(index, 1);
    }
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

.out,
.photo {
  > div {
    display: flex;
    width: 50vw;
  }
}

.addPic {
  position: relative;
  left: 0;
  top: 0px;
  background: #fff;
  width: 200px;
  height: 150px;
  > div {
    width: 100%;
    height: 100%;
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
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    opacity: 0;
  }
}

.img {
  display: flex;
  > div {
    width: 200px;
    height: 150px;
    position: relative;
    left: 0;
    top: 0;
    margin-right: 20px;
    > i {
      position: absolute;
      right: -10px;
      top: -10px;
      font-size: 24px;
      color: #999;
    }
    > img {
      width: 100%;
      height: 100%;
      display: block;
      background-size: 100%;
      background-repeat: no-repeat;
      background-position: center center;
    }
  }
}

.photo {
  width: 100px;
  height: 100px;
  border-radius: 100%;
  background: #fff;
  > div {
    width: 100%;
    height: 100%;
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

.photoImg {
  width: 100px;
  height: 100px;
  display: block;
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center center;
  border-radius: 100%;
}

.btn {
  width: 150px;
}

.cancel {
  margin-left: 120px;
  margin-right: 20px;
}

i {
  font-size: 24px;
  color: #999;
}
</style>
