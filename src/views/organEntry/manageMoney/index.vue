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
            <h2>{{money.totalTopUp}}</h2>
          </div>
          <div>
            <p>已使用金额(元)</p>
            <h2>{{money.spendAmount}}</h2>
          </div>
          <div>
            <p>账户金额(元)</p>
            <h2>{{money.balance}}</h2>
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
                <el-input v-model="form.value" type="number" placeholder="请输入充值金额"></el-input>
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
import service from "@/api";
export default {
  data() {
    return {
      img: "",
      form: {
        value: ""
      },
      money: {
        balance: 0.0,
        spendAmount: 0.0,
        totalTopUp: 0.0
      }
    };
  },
  mounted() {
    this.organMoney();
  },
  methods: {
    async organMoney() {
      let res = await service.organMoney();
      console.log(res);
      if (res.errorCode === 0) {
        this.money = res.data;
        console.log(res);
      } else if (res.errorCode === -1) {
      } else if (res.errorCode === 404) {
      } else {
        this.$message(res.errorMsg);
      }
    },
    async onSubmit() {
      if (this.form.value <= 0) {
        this.$message("金额必须大于0");
        return false;
      }
      let res = await service.payMoney(
        { amount: this.form.value },
        {
          headers: { "Content-Type": "application/json" }
        }
      );
      if (res.errorCode === 0) {
        this.img = res.data.url;
      } else {
        this.img = "";
        this.$message(res.errorMsg);
      }
    }
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