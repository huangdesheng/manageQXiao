<template>
  <div class="page">
    <div class="page-hd">
      <div class="page-form">
        <el-form
          class="demo-form-inline"
          size="small"
          :inline="true"
          :model="query"
          label-width="70px"
          label-position="left"
        >
          <el-form-item label="课程名称" prop="parentTitle">
            <el-input v-model="query.parentTitle" placeholder="请输入课程名称"></el-input>
          </el-form-item>
          <el-form-item label="内容名称" prop="keyword" placeholder="请输入内容名称">
            <el-input v-model="query.keyword"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="query.state">
              <el-option
                v-for="item in statusList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
         
          <el-form-item>
            <el-button type="primary" @click="handleSearch">查询</el-button>
          </el-form-item>
           <el-form-item>
            <el-button type="primary" @click="handleAdd">上传内容</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="page-bd">
      <el-table :data="tableData" style="width: 100%" size="small" border>
        <el-table-column label="序号" type="index" align="center"></el-table-column>
         <el-table-column label="课程名称" prop="parentTitle" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="handleCourseDetailt(scope.row.parentId)">{{scope.row.parentTitle}}</el-button>
          </template>
        </el-table-column>
        <el-table-column label="内容名称" prop="title" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="handleEdit(scope.row.id,1)">{{scope.row.title}}</el-button>
          </template>
        </el-table-column>
        <el-table-column label="添加日期" prop="createTime" align="center"></el-table-column>
        <el-table-column label="观看人数" prop="viewCount" align="center"></el-table-column>
        
        <el-table-column label="状态" align="center">
           <template slot-scope="scope">
            <span v-if="scope.row.status === 0">未发布</span>
            <span v-if="scope.row.status === 1">发布中</span>
          </template>
        </el-table-column>
        <el-table-column label="热度榜" align="center">
          <template slot-scope="scope" v-if="scope.row.status === 1">
            <el-button size="mini" type="text" v-if="scope.row.recommend === 1" @click="handleRecommend(scope.row.id)">取消</el-button>
            <el-button size="mini" type="text" v-else-if="scope.row.recommend === 0" @click="handleRecommend(scope.row.id)">推荐</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="550">
          <template slot-scope="scope">
            <el-button size="mini" type="text" v-if="scope.row.status === 0" @click="handleSend(scope.row.id)">发布</el-button>
            <el-button size="mini" type="text" @click="handleEdit(scope.row.id)">编辑</el-button>
            <el-button size="mini" type="text" style="color:#FC7878" @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page-ft">
      <!-- 分页 -->
      <div class="qx-pagination" v-if="totalCount">
        <el-pagination
          background
          small
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="query.pageNum"
          :page-size="query.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount"
        ></el-pagination>
      </div>
    </div>

    <!-- 新增 和 编辑 -->
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="课程名称" :label-width="formLabelWidth" v-if="programLists.length">
          <el-select v-model="form.parentId" placeholder="请选择课程">
            <el-option v-for="item in programLists" :key="item.parentId" :label="item.parentTitle" :value="item.parentId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="课程主图" :label-width="formLabelWidth">
          <div class="photo">
            <div v-if="form.cover === '' || form.cover === null">
              <i class="el-icon-plus"></i>
            </div>
            <div v-else style="border:none" class="img">
              <img alt :style="{backgroundImage: `url(${form.cover})`}" class="photoImg" />
            </div>
            <input type="file" @change="uploadImg($event,1)" />
          </div>
        </el-form-item>
        <el-form-item label="课程标题" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off" placeholder="请输入课程标题"></el-input>
        </el-form-item>

        <el-form-item label="上传音频" :label-width="formLabelWidth">
          <div class="photo">
            <div v-if="form.contentUrl === '' && !videoStatus" class="audit">
              <i class="el-icon-plus"></i>
              <span>上传音频</span>
            </div>
            <el-progress type="circle" :percentage="percentage" v-else-if="form.contentUrl === ''&& videoStatus"></el-progress>
            <!-- <div v-else style="border:none" class="img">
              <img alt :style="{backgroundImage: `url(${form.videoImg})`}" class="photoImg" />
            </div> -->
           
            <audio :src="form.contentUrl" v-else controls width="400px" id="audio" autoplay></audio>
            <input type="file" @change="uploadVideo($event,1)" accept="audio/*" capture="camcorder"/>
          </div>
        </el-form-item>
        
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </div>
    </el-dialog>
    
    <!-- 查看详情 -->
    <el-dialog :visible.sync="dialogFormVisibleCheck" custom-class="check" @closed="handleClosed">
      <div>
        <audio :src="form.contentUrl" controls autoplay style="width= 100%; height=100%; object-fit: fill" id="audio"></audio>
      </div>
    </el-dialog>


    <!-- 查看课程详情 -->
    <el-dialog title="课程预览" :visible.sync="FormVisibleCourseStatus" v-if="obj">
      <el-form :model="obj">
        <el-form-item label="课程主图" :label-width="formLabelWidth">
          <div class="photo">
            <div v-if="obj.cover === '' || obj.cover === null">
              <i class="el-icon-plus"></i>
            </div>
            <div v-else style="border:none" class="img">
              <img alt :style="{backgroundImage: `url(${obj.cover})`}" class="photoImg" />
            </div>
          </div>
        </el-form-item>
        <el-form-item label="课程标题" :label-width="formLabelWidth">
          <!-- <el-input v-model="form.title" autocomplete="off"></el-input> -->
          <p class="p">{{obj.title}}</p>
        </el-form-item>
        <el-form-item label="课程内容" :label-width="formLabelWidth">
          <p class="p">{{obj.intro}}</p>
          <!-- <el-input v-model="form.intro" autocomplete="off" type="textarea" rows="6"></el-input> -->
        </el-form-item>
        <el-form-item label="课程标签" :label-width="formLabelWidth">
          <div class="check_type">
            <span v-for="(item,index) in obj.tags" :key="index" class="check_span">{{item.value}}</span>
          </div>
             <!-- <el-input v-model="item.value" autocomplete="off"></el-input> -->
             <!-- <i class="el-icon-delete" color="red" @click="handleDelete(index)"></i> -->
         
          <!-- <el-button type="primary" @click="handleAddType">新增标签</el-button> -->
        </el-form-item>
        <el-form-item label="年级选择" :label-width="formLabelWidth">
          <div class="check_type">
            <span v-for="(item,index) in obj.grades" :key="index" class="check_span">{{gradeList[item].text}}</span>
          </div>
             <!-- <el-input v-model="item.value" autocomplete="off"></el-input> -->
             <!-- <i class="el-icon-delete" color="red" @click="handleDelete(index)"></i> -->
         
          <!-- <el-button type="primary" @click="handleAddType">新增标签</el-button> -->
        </el-form-item>
        <!-- <el-form-item label="年级选择" :label-width="formLabelWidth">
          <el-select v-model="form.grades" :multiple="true">
            <el-option v-for="item in gradeList" :key="item.value" :label="item.text" :value="item.value"></el-option>
          </el-select>
        </el-form-item> -->
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import service from "@/api";
import axios from "axios";
import { statusList } from '@/mixins/index'
export default {
  data() {
    return {
      query: {
        pageSize: 20,
        pageNum: 1,
        state:0,
        keyword:'',
        parentTitle:'',
        id:this.$route.query.id
      },
      dialogFormVisible:false,
      dialogFormVisibleCheck:false,
      videoStatus:false,
      percentage:0,
      tableData: [],
      formLabelWidth: '120px',
      gradeList:[],
      title:'',
      form:{
          cover: "",
          storyId:this.$route.query.id,
          title: "",
          contentUrl:"",
          duration:''
      },
      totalCount:0,
      obj:{},
      FormVisibleCourseStatus:false,
      programLists:[]
    };
  },
  mixins:[statusList],
  methods: {
    async handleCourseDetailt(id) {
      let res = await service.storyDetails(id)
      if(res.errorCode === 0) {
        this.obj = res.data
        this.FormVisibleCourseStatus = true
      }
    },
    // 年级查询
    async queryGradeList() {
      let res = await service.queryGradeList(4, {
        headers: { "Content-Type": "application/json" },
      });
      if (res.errorCode === 0) {
       this.gradeList = res.data.concat([{text:'',value:''}])
      }
    },
    async programStoryTitle() {
      let res = await service.programStoryTitle()
      if(res.errorCode === 0) {
        this.programLists = res.data
      }
    },
    // 添加内容
    handleAdd() {
      this.title = '上传内容'
      this.form = {
        cover: "",
        storyId:this.$route.query.id,
        title: "",
        contentUrl:'',
        duration:''
      }
      this.dialogFormVisible = true
    },
    // 上传图片
    async uploadImg(img, index) {
      var fileLength = Array.from(img.target.files);
      var formData = new FormData();
      formData.append("files", fileLength[0]);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      let res = await service.filesUpload(formData, config);
      if (res.errorCode === 0) {
          this.form.cover = res.data[0].url;
      }
    },
    // 上传视频
    async uploadVideo(file) {
      if(file.target.files.length){
        this.percentage = 0
        this.form.contentUrl =''
        var formData = new FormData(); //构造一个 FormData，把后台需要发送的参数添加
        // if (file) {
          formData.append("file", file.target.files[0]); //接口需要传递的参数
        // }
        axios({
          method: "post",
          url: "https://video.qxiao.net/api/upload/audio",
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data"
          },
          onUploadProgress: progressEvent => {
            this.videoStatus = true
            let complete = (progressEvent.loaded / progressEvent.total * 100 | 0)
            console.log(complete)
            if(complete>2){
              this.percentage = complete-5
            }
          },
        }).then(res => {
          if (res.data.errorCode === 0) {
            this.form.contentUrl = res.data.data.audioUrl;
            this.form.duration = res.data.data.duration
            this.progressValue = 100
            this.videoStatus = false
          }
        });
      }
    },
    // 提交内容
    async handleSubmit() {
      let {title, cover, contentUrl,parentId} = this.form
      if(title.trim().length === 0 || cover === '' || contentUrl === '',parentId === '') {
        this.$message('请填写完整信息内容')
        return false
      }
      let res = await service.addStoryProgram(this.form,{
        headers: {
         "Content-Type": "application/json"
        }
      })
      if(res.errorCode === 0) {
        var audio = document.getElementById('audio')
        audio.pause()
        this.dialogFormVisible = false
        this.storyProgramList(this.query)
      }
    },
    
    // 编辑课程
    async handleEdit(id, status) {
      let res = await service.programStoryDetails(id)
      if(res.errorCode === 0) {
        this.form = res.data
        if(status){
           this.dialogFormVisibleCheck = true
        }else{
          this.title = '编辑内容'
          this.dialogFormVisible = true
        }
      }
    },

     handleDelete(id) {
       let that = this
      this.$confirm(`确定删除吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      .then(function() {
          that.storyProgramDelete(id);
      })
      .catch(error => {
        return false;
      });
    },

    // 删除课程
    async storyProgramDelete(id) {
      let res = await service.storyProgramDelete({
        id
      },{
        headers: {
         "Content-Type": "application/json"
        }
      })
      if( res.errorCode === 0 ) {
        this.storyProgramList(this.query)
      }
    },

    // 发布
    handleSend(id) {
      let that = this
      this.$confirm(`确定发布该课程吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(function() {
          that.publishStoryProgram(id);
        })
        .catch(error => {
          return false;
        });
    },

    // 发布
    async publishStoryProgram(id) {
       let res = await service.publishStoryProgram({
        id
      },{
        headers: {
         "Content-Type": "application/json"
        }
      })
      if( res.errorCode === 0 ) {
        this.storyProgramList(this.query)
      }
    },
   
    // 推荐
    async handleRecommend (id) {
      let res = await service.recommendStoryProgram({
        id
      },{
        headers: {
         "Content-Type": "application/json"
        }
      })
      if( res.errorCode === 0 ) {
        this.storyProgramList(this.query)
      }
    },

    handleSearch() {
      this.query.pageNum = 1;
      this.storyProgramList(this.query)
    },
    handleCurrentChange(curr) {
      this.query.pageNum = curr;
      this.storyProgramList(this.query)
    },
    handleSizeChange(size) {
      this.query.pageSize = size;
      this.storyProgramList(this.query)
    },
    async storyProgramList(params) {
      let res = await service.storyProgramList(params, {
        headers: { "Content-Type": "application/json" },
      });
      if (res.errorCode === 0) {
        this.tableData = res.data.list;
        this.totalCount = res.data.totalCount;
      }else{
        this.tableData = [];
        this.totalCount = 0
      }
    },
    handleClosed() {
      let audio =  document.getElementById('audio')
      audio.pause()
    }
  },
  activated() {
    this.storyProgramList(this.query)
    this.queryGradeList()
    this.programStoryTitle()
  }
};
</script>
<style lang="less" scoped>
.el-table td,.el-table th {
  text-align: center !important;
}

.photo {
  width: 100px;
  height: 100px;
  border-radius: 100%;
  background: #fff;
  display: flex;
  align-items: center;
  > div {
    width: 100px;
    height: 100px;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    // border:1px solid #f6f6f6;
    background: #f6f6f6;
  }

  > input {
    width: 100px;
    height: 100px;
    // border: 10px solid #dcdfe6;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    opacity: 0;
  }
}

.photoImg {
  width: 100px;
  height: 100px;
  display: block;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  // border-radius: 100%;
}

.page /deep/ .type {
  display: flex;
  align-items: center;
  margin-bottom:10px;
  width: 300px;
  >i{
    font-size:30px;
    color:#FC7878;
    margin-left:20px;
  }
}

.check{
  
  div{
    display: flex;
    justify-content: center;
    // width: 1200px;
    height:100px;
    margin:0 auto;
  }
}


.p{
  font-size:15px;
  color:#606266
}

.photo /deep/ .el-progress-circle{
  width:100px !important;
  height:100px !important;
}

.page /deep/ .el-progress{
  background: #fff;
}

.audit{
  width: 120px !important;
  height:60px !important;
  background:#f6f6f6 !important;
  color:#0099ff !important;
  span{
    margin-left:10px;
  }
}

.check_span{
    background: #f6f6f6;
    padding:5px 20px;
    margin-right:10px;
}
</style>
