<template>
  <div class="page">
    <!-- <header class="page-hd">
      <div>
        <div class="hd-title flex">
          <span></span>
          <h3>清理数据</h3>
        </div>
      </div>
    </header> -->

    <section>
      <el-form :inline="true"
               :model="form"
               class="demo-form-inline">
        <el-form-item label="清理数据">
          <el-input v-model="form.phone"
                    placeholder="请输入手机号码 "></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="handleSubmit">清理</el-button>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script>
import service from "@/api";
export default {
  data() {
    return {
      form: {
        phone: "",
      },
    };
  },

  methods: {
    handleSubmit() {
      this.$confirm("此操作将永久删除数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.deleteData();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    async deleteData() {
      let res = await service.deleteData(this.form, {
        headers: { "Content-Type": "application/json" },
      });
      if (res.errorCode === 0) {
        this.form.phone = "";
        this.$message({
          type: "info",
          message: "数据已删除",
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.page {
  margin: 40px 0 0 !important;
}
.hd-title {
  display: flex;
  align-items: center;
  padding: 20px 0;
  span {
    display: block;
    width: 2px;
    height: 20px;
    background: rgba(0, 153, 255, 1);
  }
  h3 {
    flex: 1;
    margin-left: 10px;
  }
}

section {
  font-size: 26px;
  padding: 40px 20px;
}
</style>