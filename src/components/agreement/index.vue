<template>
  <div class="agreement">
    <div>
      <h2>【小Q智慧】广告投放平台使用协议</h2>
      <p v-html="word">
      </p>
      <div>
        <el-radio v-model="radio" text-color="#409EFF" label="1"
          >我已仔细阅读以上协议书，同意相关协议</el-radio
        >
        <el-button type="primary" @click="handleAgreement"
          >确认提交协议</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import {word} from '@/mixins/text'
export default {
  data() {
    return {
      radio: "1",
    };
  },
  mixins:[word],
  mounted() {
    // let str = '因本协议所生之相关争议，仲裁地点为广州。<br />相关争议应单独仲裁，不得与任何其它方的争议在任何仲裁中合并处理，该仲裁裁决是终局的，对各方均有约束力。<br />'
    //   // var text_value=str.replace("。<br />","。<br /><br />")
    //    var text_value=str.replace(/。<br />/g,'。<br /><br />'); 
    //   // var text_value= this.text.replace("=","#");
    //     console.log(text_value)

  },
  methods: {
    handleAgreement() {
      this.$emit("handleAgreement");
    },
    handleText() {
    
    }
  }
};
</script>

<style lang="less" scoped>
.agreement {
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  > div {
    width: 60%;
    height: 75%;
    background: #fff;
    padding: 0px 40px;
    border-radius: 20px;
    > h2 {
      text-align: center;
      height: 10%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    > p {
      height: 75%;
      border: 1px solid #999;
      overflow-y: auto;
      line-height: 30px;
      padding:0 20px;
    }
    > div {
      height: 15%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}

.el-radio {
  color: #409eff;
}
</style>
