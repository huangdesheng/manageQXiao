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
          <el-form-item label="课程名称" prop="title">
            <el-input v-model="query.keyword" placeholder="请输入课程名称"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="query.state">
              <el-option
                v-for="item in courseLists"
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
            <el-button type="primary" @click="handleAdd">新增课程</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="page-bd">
      <el-table :data="tableData" style="width: 100%" size="small" border>
        <el-table-column label="序号" type="index" align="center"></el-table-column>
        <el-table-column label="课程名称" prop="title" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="handleEdit(scope.row.id,1)">{{scope.row.title}}</el-button>
          </template>
        </el-table-column>
        <el-table-column label="课程标签" prop="tag" align="center"></el-table-column>
        <el-table-column label="添加日期" prop="createTime" align="center"></el-table-column>
        <el-table-column label="内容数" prop="programCount" align="center"></el-table-column>
        <el-table-column label="观看人数" prop="viewCount" align="center"></el-table-column>
        
        <el-table-column label="状态" align="center">
           <template slot-scope="scope">
            <span v-if="scope.row.status === 0">未发布</span>
            <span v-if="scope.row.status === 1">发布中</span>
          </template>
         
        </el-table-column>
        <el-table-column label="推荐首页" align="center">
          <template slot-scope="scope" v-if="scope.row.status === 1">
            <el-button size="mini" type="text" v-if="scope.row.recommend === 1" @click="handleRecommend(scope.row.id)">取消</el-button>
            <el-button size="mini" type="text" v-else-if="scope.row.recommend === 0" @click="handleRecommend(scope.row.id)">推荐</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="550">
          <template slot-scope="scope">
            <el-button size="mini" type="text" v-if="scope.row.status === 0" @click="handleSend(scope.row.id)">发布</el-button>
            <el-button size="mini" type="text" @click="handleEdit(scope.row.id)">编辑</el-button>
            <el-button size="mini" type="text" @click="handleAddContent(scope.row.id)">上传内容</el-button>
            <el-button size="mini" type="text" style="color:#FC7878" @click="handleDeleteCourse(scope.row.id)">删除</el-button>
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

    <!-- 新增 和 编辑 课程-->
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="form">
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
        <el-form-item label="课程内容" :label-width="formLabelWidth">
          <el-input v-model="form.intro" autocomplete="off" type="textarea" rows="6" placeholder="请输入课程内容"></el-input>
        </el-form-item>
        <el-form-item label="课程标签" :label-width="formLabelWidth">
          <div class="type" v-for="(item,index) in form.tags" :key="index">
             <el-input v-model="item.value" autocomplete="off"></el-input>
             <i class="el-icon-delete" color="red" @click="handleDelete(index)"></i>
          </div>
          <el-button type="primary" @click="handleAddType">新增标签</el-button>
        </el-form-item>
        <el-form-item label="年级选择" :label-width="formLabelWidth">
          <el-select v-model="form.grades" :multiple="true">
            <el-option v-for="(item,index) in gradeList" :key="item.value" :label="item.text" :value="item.value" :disabled="index === gradeList.length-1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </div>
    </el-dialog>
    
    <!-- 查看详情 -->
    <el-dialog title="课程预览" :visible.sync="dialogFormVisibleCheck" custom-class="check">
      <el-form :model="form">
        <el-form-item label="课程主图" :label-width="formLabelWidth">
          <div class="photo">
            <div v-if="form.cover === '' || form.cover === null">
              <i class="el-icon-plus"></i>
            </div>
            <div v-else style="border:none" class="img">
              <img alt :style="{backgroundImage: `url(${form.cover})`}" class="photoImg" />
            </div>
          </div>
        </el-form-item>
        <el-form-item label="课程标题" :label-width="formLabelWidth">
          <!-- <el-input v-model="form.title" autocomplete="off"></el-input> -->
          <p class="p">{{form.title}}</p>
        </el-form-item>
        <el-form-item label="课程简介" :label-width="formLabelWidth">
          <p class="p">{{form.intro}}</p>
          <!-- <el-input v-model="form.intro" autocomplete="off" type="textarea" rows="6"></el-input> -->
        </el-form-item>
        <el-form-item label="课程标签" :label-width="formLabelWidth">
          <div class="check_type">
            <span v-for="(item,index) in form.tags" :key="index" class="check_span">{{item.value}}</span>
          </div>
             <!-- <el-input v-model="item.value" autocomplete="off"></el-input> -->
             <!-- <i class="el-icon-delete" color="red" @click="handleDelete(index)"></i> -->
         
          <!-- <el-button type="primary" @click="handleAddType">新增标签</el-button> -->
        </el-form-item>
        <el-form-item label="年级选择" :label-width="formLabelWidth">
          <div class="check_type">
            <span v-for="(item,index) in form.grades" :key="index" class="check_span">{{gradeList[item-1].text}}</span>
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

    <!-- 新增 和 编辑 内容 -->
    <el-dialog :title="title" :visible.sync="FormVisibleContentStatus">
      <el-form :model="formContent">
        <el-form-item label="课程主图" :label-width="formLabelWidth">
          <div class="photo">
            <div v-if="formContent.cover === '' || formContent.cover === null">
              <i class="el-icon-plus"></i>
            </div>
            <div v-else style="border:none" class="img">
              <img alt :style="{backgroundImage: `url(${formContent.cover})`}" class="photoImg" />
            </div>
            <input type="file" @change="uploadImg($event,2)" />
          </div>
        </el-form-item>
        <el-form-item label="课程标题" :label-width="formLabelWidth">
          <el-input v-model="formContent.title" autocomplete="off" placeholder="请输入课程标题"></el-input>
        </el-form-item>

        <el-form-item label="上传视频" :label-width="formLabelWidth">
          <div class="photo">
            <div v-if="formContent.videoImg === '' && !videoStatus" class="video">
              <i class="el-icon-plus"></i>
              <span>上传视频</span>
            </div>
            <el-progress type="circle" :percentage="percentage" v-else-if="formContent.videoImg === ''&& videoStatus"></el-progress>
            <div v-else style="border:none" class="img">
              <img alt :style="{backgroundImage: `url(${formContent.videoImg})`}" class="photoImg" />
            </div>
            <input type="file" @change="uploadVideo($event,1)" accept="video/*" capture="camcorder"/>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="FormVisibleContentStatus = false">取 消</el-button>
        <el-button type="primary" @click="handleContentSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import service from "@/api";
import axios from "axios";
import { courseList } from '@/mixins/index'
export default {
  mixins:[courseList],
  data() {
    return {
      query: {
        pageSize: 20,
        pageNum: 1,
        state:0,
        keyword:''
      },
      dialogFormVisible:false,
      dialogFormVisibleCheck:false,
      // 内容上传
      FormVisibleContentStatus:false,
      videoStatus:false,
      percentage:0,
      formContent:{
          cover: "",
          parentId:this.$route.query.id,
          title: "",
          videoUrl:'',
          videoImg:'',
          duration:'',
          height:'',
          width:''
      },
      
      tableData: [],
      formLabelWidth: '120px',
      gradeList:[],
      title:'',
      form:{
        	cover: "",
          grades: [],
          id: 0,
          intro: "",
          tags: [
            { value: "" }
          ],
          title: ""
      },
      totalCount:0
    };
  },
  methods: {
    // 上传内容
    handleAddContent(id) {
      this.FormVisibleContentStatus = true;
      this.formContent = {
          cover: "",
          parentId:id,
          title: "",
          videoUrl:'',
          videoImg:'',
          duration:'',
          height:'',
          width:''
      }
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
        if(index === 1) {
          this.form.cover = res.data[0].url;
        }else if(index === 2) {
          this.formContent.cover = res.data[0].url;
        }
      }
    },
    
    // 视频上传
    async uploadVideo(file) {
      if(file.target.files.length){
        this.percentage = 0
        this.formContent.videoImg =''
        this.formContent.videoUrl = ''
        var formData = new FormData(); //构造一个 FormData，把后台需要发送的参数添加
        formData.append("file", file.target.files[0]); //接口需要传递的参数
        axios({
          method: "post",
          url: "https://video.qxiao.net/api/upload",
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
            this.formContent.videoImg = res.data.data.screenShotURL;
            this.formContent.videoUrl = res.data.data.videoURL;
            this.formContent.duration = res.data.data.duration
            this.formContent.height = res.data.data.height
            this.formContent.width = res.data.data.width
            this.percentage = 100
            this.videoStatus = false
          }
        });
      }
    },

    // 提交内容
    async handleContentSubmit() {
      let {title, cover, videoUrl} = this.formContent
      if(title.trim().length === 0 || cover === '' || videoUrl === '') {
        this.$message('请填写完整信息内容')
        return false
      }
      let res = await service.addProgram(this.formContent,{
        headers: {
         "Content-Type": "application/json"
        }
      })
      if(res.errorCode === 0) {
        this.FormVisibleContentStatus = false
        this.$router.push('/course/video/video-list')
      }
    },


    // 添加内容
    handleAdd() {
      this.title = '新增课程'
      this.form = {
        	cover: "",
          grades: [],
          id: null,
          intro: "",
          tags: [
            { value: "" }
          ],
          title: ""
      }
      this.dialogFormVisible = true
    },
    // 新增标签
    handleAddType(){
      this.form.tags.push({
        value:""
      })
    },
    // 删除标签
    handleDelete(index) {
      this.form.tags.splice(index, 1)
    },
    // 提交内容
    async handleSubmit() {
      let tagList = this.form.tags.filter(item => item.value === '')
      let {title, cover, intro} = this.form
      if(title.trim().length === 0 || cover === '' || intro.trim().length === 0 || tagList.length > 0) {
        this.$message('请填写完整信息内容')
        return false
      }
      console.log(this.form)
      let res = await service.addCourse(this.form,{
        headers: {
         "Content-Type": "application/json"
        }
      })
      if(res.errorCode === 0) {
        this.dialogFormVisible = false
        this.courseList(this.query)
      }
    },
    
    // 编辑课程
    async handleEdit(id, status) {
      let res = await service.courseDetails(id)
      if(res.errorCode === 0) {
        this.form = res.data
        if(status){
           this.dialogFormVisibleCheck = true
        }else{
          this.title = '编辑课程'
          this.dialogFormVisible = true
        }
      }
    },

    handleDeleteCourse(id) {
      let that = this
      this.$confirm(`确定删除吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(function() {
          that.deleteCourse(id);
        })
        .catch(error => {
          return false;
        });
    },

    // 删除课程
    async deleteCourse(id) {
      let res = await service.deleteCourse({
        id
      },{
        headers: {
         "Content-Type": "application/json"
        }
      })
      if( res.errorCode === 0 ) {
        this.courseList(this.query)
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
          that.publishCourse(id);
        })
        .catch(error => {
          return false;
        });
    },
    async publishCourse(id) {
       let res = await service.publishCourse({
        id
      },{
        headers: {
         "Content-Type": "application/json"
        }
      })
      if( res.errorCode === 0 ) {
        this.courseList(this.query)
      }
    },
   
    // 推荐
    async handleRecommend (id) {
      let res = await service.recommendCourse({
        id
      },{
        headers: {
         "Content-Type": "application/json"
        }
      })
      if( res.errorCode === 0 ) {
        this.courseList(this.query)
      }
    },


    handleSearch() {
      this.query.pageNum = 1;
      this.courseList(this.query)
    },
    handleCurrentChange(curr) {
      this.query.pageNum = curr;
      this.courseList(this.query)
    },
    handleSizeChange(size) {
      this.query.pageSize = size;
      this.courseList(this.query)
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

    async courseList(params) {
      let res = await service.courseList(params, {
        headers: { "Content-Type": "application/json" },
      });
      if (res.errorCode === 0) {
        this.tableData = res.data.list;
        this.totalCount = res.data.totalCount;
      }
    },
  },
  activated() {
    this.queryGradeList(this.query)
    this.courseList(this.query)
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

.check /deep/ .el-input__inner {
  border:none;
}

.check /deep/ .check_type{
  display: flex;
}

.check_span{
    background: #f6f6f6;
    padding:5px 20px;
    margin-right:10px;
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

.video{
  width: 120px !important;
  height:60px !important;
  background:#f6f6f6 !important;
  color:#0099ff !important;
  span{
    margin-left:10px;
  }
}
</style>
