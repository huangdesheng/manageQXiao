<template>
  <div class="page">
    <div class="page-hd">
      <div>
        <div class="hd-title flex">
          <span></span>
          <h3>平台概括</h3>
        </div>
        <div class="hd-content">
          <div>
            <p>学校总数</p>
            <h2>{{params.schoolCount}}</h2>
          </div>
          <div>
            <p>班级总数</p>
            <h2>{{params.classCount}}</h2>
          </div>
          <div>
            <p>教师总人数</p>
            <h2>{{params.teacherCount}}</h2>
          </div>
          <div>
            <p>学生总人数</p>
            <h2>{{params.studentCount}}</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import service from "@/api";
export default {
  data() {
    return {
      params: {}
    };
  },
  mounted() {
    this.plaformData();
  },

  methods: {
    async plaformData() {
      let res = await service.plaformData();
      if (res.errorCode === 0) {
        this.params = res.data;
      } else if (res.errorCode === -1) {
      } else if (res.errorCode === 404) {
      } else {
        this.$message(res.errorMsg);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.page-hd {
  width: 100%;
  margin-top: 20px;
  > div {
    width: 98%;
    margin: 0 auto;
  }
}
.hd-title {
  display: flex;
  align-items: center;
  span {
    display: block;
    width: 2px;
    height: 20px;
    background: red;
  }
  h3 {
    flex: 1;
    margin-left: 10px;
  }
}

.hd-content {
  display: flex;
  justify-items: center;
  align-items: center;
  // border: 1px solid #ccc;
  margin-top: 20px;
  > div {
    margin: 30px;
    flex: 1;
    text-align: left;
    border-right: 1px solid #ccc;
    &:nth-of-type(4) {
      border-right: none;
    }
    p {
      font-size: 20px;
      text-align: left;
    }
    h2 {
      margin-top: 20px;
      font-size: 30px;
      font-weight: 600;
      color: #0099ff;
    }
  }
}
</style>