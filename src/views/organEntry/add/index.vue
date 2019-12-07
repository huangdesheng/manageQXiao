<template>
  <div class="page">
    <div class="page-bd">
      <el-form ref="form" :model="form" label-width="80px" :rules="rules">
        <el-form-item label="机构名称" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="机构标签" prop="instTypes">
          <el-checkbox-group v-model="form.instTypes">
            <el-checkbox
              v-for="(item,index) in organTypes"
              :key="index"
              :label="item.id"
              :name="item.name"
            >{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="联系老师" prop="linkMan">
          <el-input v-model="form.linkMan"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="tele">
          <el-input v-model="form.tele"></el-input>
        </el-form-item>
        <el-form-item label="机构地址" prop="address">
          <el-input v-model="form.address"></el-input>
        </el-form-item>

        <el-form-item label="课程介绍" prop="courseIntroduction">
          <el-input type="textarea" v-model="form.courseIntroduction" :rows="6"></el-input>
          <div class="upload">
            <div class="show">
              <li v-for="(item,index) in form.courseImages" :key="index">
                <div
                  class="img"
                  :style="{backgroundImage: 'url(' + item + ')', backgroundSize:'cover'}"
                ></div>
                <div class="delete" @click="deleteImg(item,1)">
                  <i class="el-icon-close"></i>
                </div>
              </li>
            </div>

            <div class="add" v-if="form.courseImages.length<3">
              <input @change="fileChange($event,1)" type="file" id="upload_file" multiple />
              <div>
                <i class="el-icon-plus"></i>
              </div>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="机构简介" prop="introduction">
          <el-input type="textarea" v-model="form.introduction" :rows="6"></el-input>
          <div class="upload">
            <div class="show">
              <li v-for="(item,index) in form.introImages" :key="index">
                <div
                  class="img"
                  :style="{backgroundImage: 'url(' + item + ')', backgroundSize:'cover'}"
                ></div>
                <div class="delete" @click="deleteImg(item,2)">
                  <i class="el-icon-close"></i>
                </div>
              </li>
            </div>

            <div class="add" v-if="form.introImages.length<3">
              <input @change="fileChange($event,2)" type="file" id="upload_file" multiple />
              <div>
                <i class="el-icon-plus"></i>
              </div>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="学生作品">
          <el-input type="textarea" v-model="form.environment" :rows="6"></el-input>
          <div class="upload">
            <div class="show">
              <li v-for="(item,index) in form.envImages" :key="index">
                <div
                  class="img"
                  :style="{backgroundImage: 'url(' + item + ')', backgroundSize:'cover'}"
                ></div>
                <div class="delete" @click="deleteImg(item,3)">
                  <i class="el-icon-close"></i>
                </div>
              </li>
            </div>

            <div class="add" v-if="form.envImages.length<3">
              <input @change="fileChange($event,3)" type="file" id="upload_file" multiple />
              <div>
                <i class="el-icon-plus"></i>
              </div>
            </div>
          </div>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit('form')">申请入驻</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import service from "@/api";
export default {
  data() {
    return {
      form: {
        title: "",
        linkMan: "",
        tele: "",
        address: "",
        instTypes: [],
        courseIntroduction: "",
        introduction: "",
        environment: "",
        courseImages: [],
        introImages: [],
        envImages: []
      },
      organTypes: [],
      rules: {
        title: [{ required: true, message: "请输入活动名称", trigger: "blur" }],

        instTypes: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个机构标签",
            trigger: "change"
          }
        ],
        linkMan: [
          { required: true, message: "请输入联系老师", trigger: "blur" }
        ],
        tele: [{ required: true, message: "联系方式不能为空" }],
        address: [
          { required: true, message: "请输入机构地址", trigger: "blur" }
        ],

        courseIntroduction: [
          { required: true, message: "请填写课程介绍", trigger: "blur" }
        ],
        introduction: [
          { required: true, message: "请填写机构简介", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    this.organType();
  },
  methods: {
    async organType() {
      let res = await service.organType();
      if (res.errorCode === 0) {
        this.organTypes = res.data;
      }
    },
    // 图片上传
    fileChange(file, index) {
      this.moreUpload(file, index);
    },
    async moreUpload(content, index) {
      var fileLength = Array.from(content.target.files);
      var formData = new FormData();

      if (index === 1) {
        if (
          fileLength.length > 3 ||
          this.form.courseImages.length + fileLength.length > 3
        ) {
          alert("超过上传数量");
          return false;
        }
      } else if (index === 2) {
        if (
          fileLength.length > 3 ||
          this.form.introImages.length + fileLength.length > 3
        ) {
          alert("超过上传数量");
          return false;
        }
      } else if (index === 3) {
        if (
          fileLength.length > 9 ||
          this.form.envImages.length + fileLength.length > 9
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
      console.log(res);
      // let res = await service.moreUploadTwo(formData, config);
      if (res.errorCode === 0) {
        //   document.getElementById("upload_file").value = "";
        //   let imgs = [];
        //   res.data.forEach(element => {
        //     imgs.push(element.photoUrl);
        //   });
        let imgs = [];
        res.data.forEach(element => {
          imgs.push(element.url);
        });
        if (index === 1) {
          this.form.courseImages = this.form.courseImages.concat(imgs);
        } else if (index === 2) {
          this.form.introImages = this.form.introImages.concat(imgs);
        } else if (index === 3) {
          this.form.envImages = this.form.envImages.concat(imgs);
        }
      }
    },
    onSubmit(form) {
      this.$refs[form].validate(valid => {
        console.log(valid);
        if (valid) {
          if (this.form.courseImages.length === 0) {
            this.$message("请上传课程照片");
            return false;
          }
          this.addInst();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    async addInst() {
      let res = await service.addInst(this.form, {
        headers: { "Content-Type": "application/json" }
      });
      if (res.errorCode === 0) {
        this.$router.push({
          path: "/organEntry/organInfo"
        });
      } else {
        this.$message(res.errorMsg);
      }
    },

    async deleteImg(url, index) {
      console.log(url);
      let res = await service.deletePicture(url);
      console.log(res);
      if (res.errorCode === 0) {
        if (index === 1) {
          this.form.courseImages = this.form.courseImages.filter(
            elem => elem !== url
          );
          console.log(this.form.courseImages);
        } else if (index === 2) {
          this.form.introImages = this.form.introImages.filter(
            elem => elem !== url
          );
        } else if (index === 3) {
          this.form.envImages = this.form.envImages.filter(
            elem => elem !== url
          );
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
.page-bd {
  padding-top: 20px;
  display: flex;
  justify-content: center;
}
.el-form {
  width: 80%;
}
.upload {
  display: flex;
  width: 100%;
  margin-top: 10px;
  .add {
    height: 120px;
    width: 160px;
    border: 1px solid #ccc;
    position: relative;
    left: 0;
    top: 0;
    input {
      opacity: 0;
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 1;
      opacity: 0;
    }
    div {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 0;
    }
  }
  .show {
    display: flex;
    list-style: none;
    flex-wrap: wrap;
    li {
      width: 240px;
      height: 120px;
      margin-right: 10px;
      position: relative;
      left: 0;
      top: 0;
      .img  {
        width: 100%; //         width: 100%;
        height: 100%;
        background-repeat: no-repeat;
        background-position: center center;
      }
      .delete {
        width: 20px;
        height: 20px;
        position: absolute;
        right: -5px;
        top: -5px;
        background: #999;
        border-radius: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        i {
          font-size: 16px;
          color: #fff;
        }
      }
    }
  }
}
.el-input {
  width: 400px;
}

.el-textarea {
  width: 400px;
}
</style>