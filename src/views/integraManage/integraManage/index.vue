<template>
  <div class="page">
    <div class="page-hd">
      <div>
        <div class="hd-title flex">
          <span></span>
          <h3>积分管理</h3>
        </div>
        <div class="hd-content">
          <div>
            <p>平台累计总积分(元)</p>
            <h2>{{params.totalCredit}}</h2>
          </div>
          <div>
            <p>未使用积分(元)</p>
            <h2>{{params.unusedCredit}}</h2>
          </div>
          <div>
            <p>已使用积分(元)</p>
            <h2>{{params.usedCredit}}</h2>
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
      params: {
        totalCredit: 0,
        unusedCredit: 0,
        usedCredit: 0
      }
    };
  },
  mounted() {
    this.creditManage();
  },

  methods: {
    async creditManage() {
      let res = await service.creditManage();
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
  border: 1px solid #ccc;
  margin-top: 20px;
  > div {
    margin: 30px;
    flex: 1;
    text-align: center;
    border-right: 1px solid #ccc;
    &:nth-of-type(3) {
      border-right: none;
    }
    p {
      font-size: 20px;
    }
    h2 {
      margin-top: 20px;
      font-size: 30px;
      font-weight: 600;
    }
  }
}
</style>