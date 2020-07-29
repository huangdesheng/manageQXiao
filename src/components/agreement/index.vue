<template>
  <div class="agreement">
      <div>
        <h2>协议书</h2>
        <p>

        </p>
       <div>
          <el-radio v-model="radio" text-color="#409EFF" label="1">我已仔细阅读以上协议书，同意相关协议</el-radio>
          <el-button type="primary" @click="handleAgreement">确认提交协议</el-button>
       </div>
      </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      radio:'1'
    }
  },
  methods:{
    handleAgreement() {
      this.$emit('handleAgreement')
    }
  }
}
</script>

<style lang="less" scoped>
    .agreement{
      width:100vw;
      height:100vh;
      position: fixed;
      left:0;
      top:0;
      z-index:1000;
      background:rgba(0, 0, 0, 0.3);
      display: flex;
      justify-content: center;
      align-items: center;
      >div{
        width:50%;
        height:75%;
        background: #fff;
        padding: 0px 40px;
        border-radius:20px;
        >h2{
          text-align: center;
          height:10%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        >p{
          height:75%;
          border:1px solid #999;
          overflow-y: auto;
        }
        >div{
          height:15%;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      }
    }

    .el-radio{
      color:#409EFF;
    }
</style>