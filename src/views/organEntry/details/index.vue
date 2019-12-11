<template>
  <div class="page">
    <div class="page-bd">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="机构名称" prop="title">
          <el-input v-model="form.title" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="机构标签" prop="instTypes">
          <el-checkbox-group v-model="form.instTypes">
            <el-checkbox
              v-for="(item,index) in organTypes"
              :key="index"
              :label="item.id"
              :name="item.name"
              :disabled="true"
            >{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="联系老师" prop="linkMan">
          <el-input v-model="form.linkMan" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="tele">
          <el-input v-model="form.tele" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="机构地址" prop="address">
          <el-input v-model="form.address" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="详细地址" prop="streetAddress" :disabled="true">
          <el-input v-model="form.streetAddress"></el-input>
        </el-form-item>
        <el-form-item label="课程介绍" prop="courseIntroduction">
          <el-input type="textarea" v-model="form.courseIntroduction" :rows="6" :disabled="true"></el-input>
          <div class="upload">
            <div class="show">
              <li v-for="(item,index) in form.courseImages" :key="index">
                <div
                  class="img"
                  :style="{backgroundImage: 'url(' + item + ')', backgroundSize:'cover'}"
                ></div>
              </li>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="机构简介" prop="introduction">
          <el-input type="textarea" v-model="form.introduction" :rows="6" :disabled="true"></el-input>
          <div class="upload">
            <div class="show">
              <li v-for="(item,index) in form.introImages" :key="index">
                <div
                  class="img"
                  :style="{backgroundImage: 'url(' + item + ')', backgroundSize:'cover'}"
                ></div>
              </li>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="学生作品">
          <el-input type="textarea" v-model="form.environment" :rows="6" :disabled="true"></el-input>
          <div class="upload">
            <div class="show">
              <li v-for="(item,index) in form.envImages" :key="index">
                <div
                  class="img"
                  :style="{backgroundImage: 'url(' + item + ')', backgroundSize:'cover'}"
                ></div>
              </li>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="是否通过" v-if="status==='check'">
          <el-radio-group v-model="state">
            <el-radio label="1">通过</el-radio>
            <el-radio label="2">不通过</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="审核意见" v-if="state ==='2'">
          <el-input type="textarea" v-model="objection" :rows="6"></el-input>
        </el-form-item>
        <el-form-item v-if="status==='check'">
          <el-button>取消</el-button>
          <el-button type="primary" @click="onSubmit('form')">确定</el-button>
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
        instTypes: []
      },
      organTypes: [],
      objection: "",
      state: "1",
      status: ""
    };
  },
  mounted() {
    this.status = this.$route.query.status;
    this.organDetails(this.$route.params.id);
    this.organType();
  },
  methods: {
    async organDetails(params) {
      let res = await service.organDetails(params);
      if (res.errorCode === 0) {
        this.form = res.data;
      }
    },
    async organType() {
      let res = await service.organType();
      if (res.errorCode === 0) {
        this.organTypes = res.data;
      }
    },

    async onSubmit() {
      let data = {
        id: this.$route.params.id,
        objection: this.objection,
        state: this.state
      };
      let res = await service.checkOrgan(data, {
        headers: { "Content-Type": "application/json" }
      });
      if (res.errorCode === 0) {
        this.$router.push({
          path: "/organManage/allOrganManage"
        });
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
        width: 100%;
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
