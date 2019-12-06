<template>
  <div class="page">
    <div class="page-hd">
      <div>
        <div class="hd-title flex">
          <span></span>
          <h3>资金管理</h3>
        </div>
        <div class="hd-content">
          <div>
            <p>充值总额(元)</p>
            <h2>8000</h2>
          </div>
          <div>
            <p>已使用金额(元)</p>
            <h2>8000</h2>
          </div>
          <div>
            <p>账户金额(元)</p>
            <h2>8000</h2>
          </div>
        </div>
      </div>
    </div>
    <div class="page-bd">
      <div>
        <div class="hd-title flex">
          <span></span>
          <h3>在线充值</h3>
        </div>

        <div class="bd-content">
          <div>
            <el-form ref="form" :model="form" label-width="120px">
              <el-form-item label="充值金额 (元)" class="first">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" class="btn" @click="onSubmit">充值</el-button>
              </el-form-item>
            </el-form>
            <div class="payImg">
              <div class="img" :style="{backgroundImage: 'url(' +img+ ')', backgroundSize:'cover'}"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      img:
        "http://192.168.18.253:8081/upload/2018-12-08/content/bcede52f-617d-4a86-839b-32431de1fc62.JPG",
      form: {
        name: "",
        img:
          "http://192.168.18.253:8081/upload/2018-12-08/content/bcede52f-617d-4a86-839b-32431de1fc62.JPG"
      }
    };
  }
};
</script>

<style lang="less" scoped>
.page-hd,
.page-bd {
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

.page-bd {
  margin-top: 40px;
}

.bd-content {
  > div {
    display: flex;
    .el-form {
      width: 400px;
      margin-right: 200px;
      .first {
        margin: 100px 0;
      }
    }
    .payImg {
      display: flex;
      justify-content: center;
      align-items: center;
      div {
        width: 400px;
        height: 400px;
        background-repeat: no-repeat;
        background-position: center center;
      }
    }
  }
}

.btn {
  width: 200px;
}
</style>