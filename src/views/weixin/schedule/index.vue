<template>
  <div class="page">
    <header class="page-hd" v-if="listLength < 2">
        <el-form class="demo-form-inline" :inline="true" size="small">
          <el-form-item>
            <el-button icon="el-icon-plus" type="primary" @click="handleAdd">新增课表</el-button>
          </el-form-item>
        </el-form>
    </header>

    <section class="page-bd">
       <el-table :data="tableData" style="width: 100%" size="small" border>
        <el-table-column label="序号" type="index"></el-table-column>          
        <el-table-column label="备注" prop="term">
          <template slot-scope="scope">
            <el-button size="mini" type="text" v-if="scope.row.term === 1">第一学期作息表</el-button> 
            <el-button size="mini" type="text" v-if="scope.row.term === 2">第二学期作息表</el-button>   
          </template>
        </el-table-column>
        <el-table-column label="作息时间段">
          <template slot-scope="scope">
            <el-button size="mini" type="text" class="on">{{scope.row.startTime}}</el-button> 
            <span class="to">-</span>
            <el-button size="mini" type="text" class="on">{{scope.row.endTime}}</el-button>   
          </template>
        </el-table-column>  
        <el-table-column label="上传时间" prop="createTime"></el-table-column>            
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-button size="mini" type="text" v-if="scope.row.active">使用中</el-button>   
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="handleUser(scope.row)" v-if="!scope.row.active">使用</el-button> 
            <el-button size="mini" type="text" @click="handleEdit(scope.row)">编辑</el-button>   
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>     
          </template>
        </el-table-column>
      </el-table>
    </section>
  </div>
</template>

<script>
import service from '@/api'
export default {
  data() {
    return {
      tableData: [], //表格数据
    }
  },

  
  computed:{
    listLength() {
      return this.tableData.length
    }
  },

  activated() {
   this.scheduleData()
  },

  methods:{
    async scheduleData() {
      let res = await service.scheduleData(this.$route.params.id)
      if(res.errorCode === 0) {
        this.tableData = res.data
      }else{
        this.tableData = []
      }
    },
    handleAdd() {
      let state
      if(this.tableData.length) {
        if(this.tableData[0].term === 1) {
          state = 2 
        }else{
          state = 1
        }
      }else{
        state = null
      }
      this.$router.push({
        path:'/weixin/schedule/add/1988',
        query:{
          schoolId:this.$route.params.id,
          state
        }
      })
    },

    async handleUser(item) {
      let res = await service.userRent({
        tempId:item.tempId,
        schoolId:item.schoolId
      },{
        headers: { "Content-Type": "application/json" }
      })
      if(res.errorCode === 0) {
        this.scheduleData()
      }
    },

    handleEdit(item) {
      let { tempId, schoolId, term } = item 
      this.$router.push({
        path:'/weixin/schedule/edit/1988',
        query:{
          tempId,
          schoolId,
          term
        }
      })
    },

    handleDelete(item) {
      let that = this;
      this.$confirm(`确定删除吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      .then(function() {
        that.deleteRent(item);
      })
      .catch(error => {
        return false;
      });
    },

    async deleteRent(item) {
      let res = await service.deleteRent({
        tempId:item.tempId,
        schoolId:item.schoolId
      },{
        headers: { "Content-Type": "application/json" }
      })

      if(res.errorCode === 0) {
        this.scheduleData()
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .on{
    color:#333;
  }

  .el-table /deep/ td{
    text-align: center;
  } 

  .el-table /deep/ th{
    text-align: center;
  } 
</style>