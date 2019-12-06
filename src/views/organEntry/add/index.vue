<template>
  <div class="page">
    <div class="page-bd">
      <el-form ref="form" :model="form" label-width="80px" :rules="rules">
        <el-form-item label="机构名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="机构标签" prop="type">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="美术" name="type"></el-checkbox>
            <el-checkbox label="舞蹈" name="type"></el-checkbox>
            <el-checkbox label="书法" name="type"></el-checkbox>
            <el-checkbox label="少儿编程" name="type"></el-checkbox>
            <el-checkbox label="音乐" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="联系老师" prop="teacher">
          <el-input v-model="form.teacher"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="机构地址" prop="address">
          <el-input v-model="form.address"></el-input>
        </el-form-item>

        <el-form-item label="课程介绍" prop="lesson">
          <el-input type="textarea" v-model="form.lesson" :rows="6"></el-input>
          <div class="upload">
            <div class="show">
              <li v-for="(item,index) in form.lessonPic" :key="index">
                <div
                  class="img"
                  :style="{backgroundImage: 'url(' + item.url + ')', backgroundSize:'cover'}"
                ></div>
              </li>
            </div>

            <div class="add" v-if="form.lessonPic.length<3">
              <input @change="fileChange($event,1)" type="file" id="upload_file" multiple />
              <div>
                <i class="el-icon-plus"></i>
              </div>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="机构简介" prop="intro">
          <el-input type="textarea" v-model="form.intro" :rows="6"></el-input>
          <div class="upload">
            <div class="show">
              <li v-for="(item,index) in form.introPic" :key="index">
                <div
                  class="img"
                  :style="{backgroundImage: 'url(' + item.url + ')', backgroundSize:'cover'}"
                ></div>
              </li>
            </div>

            <div class="add" v-if="form.introPic.length<3">
              <input @change="fileChange($event,2)" type="file" id="upload_file" multiple />
              <div>
                <i class="el-icon-plus"></i>
              </div>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="学生作品">
          <el-input type="textarea" v-model="form.work" :rows="6"></el-input>
          <div class="upload">
            <div class="show">
              <li v-for="(item,index) in form.workPic" :key="index">
                <div
                  class="img"
                  :style="{backgroundImage: 'url(' + item.url + ')', backgroundSize:'cover'}"
                ></div>
              </li>
            </div>

            <div class="add" v-if="form.workPic.length<3">
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
        name: "",
        teacher: "",
        phone: "",
        address: "",
        type: [],
        lesson: "",
        intro: "",
        work: "",
        lessonPic: [],
        introPic: [],
        workPic: []
      },

      rules: {
        name: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个机构标签",
            trigger: "change"
          }
        ],
        teacher: [
          { required: true, message: "请输入联系老师", trigger: "blur" }
        ],
        phone: [{ required: true, message: "联系方式不能为空" }],
        address: [
          { required: true, message: "请输入机构地址", trigger: "blur" }
        ],

        lesson: [
          { required: true, message: "请填写课程介绍", trigger: "blur" }
        ],
        intro: [{ required: true, message: "请填写机构简介", trigger: "blur" }]
      }
    };
  },
  methods: {
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
          this.form.lessonPic.length + fileLength.length > 3
        ) {
          alert("超过上传数量");
          return false;
        }
      } else if (index === 2) {
        if (
          fileLength.length > 3 ||
          this.form.introPic.length + fileLength.length > 3
        ) {
          alert("超过上传数量");
          return false;
        }
      } else if (index === 3) {
        if (
          fileLength.length > 9 ||
          this.form.workPic.length + fileLength.length > 9
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

        if (index === 1) {
          this.form.lessonPic = this.form.lessonPic.concat(res.data);
        } else if (index === 2) {
          this.form.introPic = this.form.introPic.concat(res.data);
        } else if (index === 3) {
          this.form.workPic = this.form.workPic.concat(res.data);
        }
      }
    },
    onSubmit(form) {
      this.$refs[form].validate(valid => {
        console.log(valid);
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
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
        right: 0;
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