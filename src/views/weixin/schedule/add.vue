<template>
  <div class="page">
    <div class="layout">
    <header>
      <h2>制作学校作息表</h2>
      <div>
        <el-select v-model="value" placeholder="请选择作息表" :disabled="state ? true : false">
          <el-option
            :disabled="state ? true : false"
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
    </header>

    <section>
      <div class="content">
        <div class="title">
          <h5>输入作息名称</h5>
          <h5>作息时间段</h5>
          <h5>勾选为课程</h5>
          <h5>操作</h5>
        </div>

        <ul>
          <li v-for="(item, index) in list" :key="index">
            <div class="input"><el-input v-model="item.name" placeholder="例如：早操"></el-input></div>
            <div>
              <el-time-select
                placeholder="起始时间"
                v-model="item.startTime"
                :picker-options="{
                  start: '06:00',
                  step: '00:05',
                  end: '23:55'
                }">
              </el-time-select>
              <span class="to">至</span>
              <el-time-select
                placeholder="结束时间"
                v-model="item.endTime"
                :picker-options="{
                  start: '06:00',
                  step: '00:05',
                  end: '23:55',
                  minTime: item.startTime
                }">
              </el-time-select>
            </div>

            <div>
              <el-checkbox v-model="item.formal"></el-checkbox>
            </div>
            <div class="end"><span @click="handleDelete(index)" v-if="list.length>1">删除</span></div>
          </li>
        </ul>
      </div>
      <div class="btn"><el-button type="primary" @click="handleAdd">添加下一行</el-button></div>
    </section>  

    <footer>
      <el-button class="cancel" size="medium" @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="handleSumbit">保存</el-button>
    </footer>
    </div>
    
  </div>
</template>

<script>
import service from '@/api'
export default {
  data() {
    return {
      value:this.$route.query.state,
      state:this.$route.query.state,
      options:[
        {
          value:1,
          label:'第一学期作息表'
        },
        {
          value:2,
          label:'第二学期作息表'
        }
      ],
      list:[
        {
          name:'',
          startTime:'',
          endTime:'',
          formal:false
        }
      ]
    }
  },

  mounted() {
    // console.log(this.$route.query.state)
  },

  methods:{
    // 添加下一行
    handleAdd() {
      this.list.push({
          name:'',
          startTime:'',
          endTime:'',
          formal:false
      })
    },
    // 删除
    handleDelete(index) {
      this.list.splice(index, 1)
    },
    
    // 取消
    handleCancel() {
      this.list = [{
          name:'',
          startTime:'',
          endTime:'',
          formal:false
      }]
      this.$router.go(-1)
    },

    // 保存作息表
    handleSumbit() {
      let restScheduleDTOList = this.list.filter(item=>item.name.trim().length === 0 || item.startTime === '' || item.endTime === '' )
      if(restScheduleDTOList.length) {
        this.$message('填写课表名称或时间')
        return false
      }
      this.addRent()
    },

    async addRent() {
      let data = {
        restScheduleDTOList:this.list,
        term:this.value,
        schoolId:this.$route.query.schoolId
      }
      let res = await service.addRent(data,{
        headers: { "Content-Type": "application/json" }
      })
      if(res.errorCode === 0) {
        this.$router.go(-1)
        this.list = [
          {
          name:'',
          startTime:'',
          endTime:'',
          formal:false
      }
        ]
      }else if(res.errorCode === 902){
        this.$message('填写课表名称或时间')
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .page{
    background:#fff !important;
    height:100%;
    margin-bottom:0;
    margin-left:0;
    margin-right:0;
  }

  .layout {
     background:#fff !important;
     height:auto;
     padding-bottom:20px;
  }
  header{
    width:100%;
    h2 {
      text-align: center;
      margin:20px 0;
    }
    div{
      margin-left:5%;
    }
  }

  section{
    width:100%;
    margin-top:20px;
    .content{
      border:1px solid #ccc;
      width:80%;
      margin:0 auto;
      >div{
        display: flex;
        font-size:18px;
        h5 {
          width: 20%;
          padding:20px 0;
          text-align: center;
          border-right:1px solid #ccc;
          &:nth-of-type(2) {
            width:40%;
          }
         }
      }
      ul{
        width:100%;
        li{
          display: flex;
          border-top:1px solid #ccc;
          >div{
            display: flex;
            width: 20%;
            padding:10px 0;
            border-right:1px solid #ccc;
            align-items: center;
            justify-content: center;
            &:nth-of-type(2) {
              width:40%;
            }
          }
        }
      }
    }
  }

  .input /deep/ .el-input__inner {
    border:none
  }
  .to{
    margin:0px 10px;
  }
  .end{
    border-right:none;
    color:red
  }

  .btn,footer{
    width:80%;
    margin:10px auto;
  }

  footer{
    margin-top:30px;
    margin-bottom:20px;
    display: flex;
    justify-content: center;
    .el-button {
      padding-left:50px;
      padding-right:50px;
    }
  }

  .cancel{
    margin-right:100px;
  }
</style>