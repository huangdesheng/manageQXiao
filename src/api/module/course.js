import ax from '../axios';

//新增和编辑课程
export function addCourse(params, config) {
  return ax.post('/course', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 删除课程
export function deleteCourse(params, config) {
  return ax.post('/course/delete', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 发布课程
export function publishCourse(params, config) {
  return ax.post('/course/publish', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 推荐课程
export function recommendCourse(params, config) {
  return ax.post('/course/recommend', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 课程列表
export function courseList(params, config) {
  return ax.post('/course/list', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 课程详情
export function courseDetails(params, config) {
  return ax.get(`/course/${params}`, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}


// 上传内容
export function addProgram(params, config) {
  return ax.post('/course/program', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 内容列表
export function programList(params, config) {
  return ax.post('/course/program/list', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 内容删除
export function programDelete(params, config) {
  return ax.post('/course/program/delete', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 发布内容
export function publishProgram(params, config) {
  return ax.post('/course/program/publish', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}


// 推荐内容
export function recommendProgram(params, config) {
  return ax.post('/course/program/recommend', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 内容详情
export function programDetails(params, config) {
  return ax.get(`/course/program/${params}`, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}



//新增和编辑故事
export function addStory(params, config) {
  return ax.post('/story', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 删除故事
export function deleteStory(params, config) {
  return ax.post('/story/delete', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 发布故事
export function publishStory(params, config) {
  return ax.post('/story/publish', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 推荐故事
export function recommendStory(params, config) {
  return ax.post('/story/recommend', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 课程故事
export function storyList(params, config) {
  return ax.post('/story/list', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 故事详情
export function storyDetails(params, config) {
  return ax.get(`/story/${params}`, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}



// 上传故事内容
export function addStoryProgram(params, config) {
  return ax.post('/story/program', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 故事内容列表
export function storyProgramList(params, config) {
  return ax.post('/story/program/list', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 故事内容删除
export function storyProgramDelete(params, config) {
  return ax.post('/story/program/delete', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 发布故事内容
export function publishStoryProgram(params, config) {
  return ax.post('/story/program/publish', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}


// 推荐故事内容
export function recommendStoryProgram(params, config) {
  return ax.post('/story/program/recommend', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 故事内容详情
export function programStoryDetails(params, config) {
  return ax.get(`/story/program/${params}`, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// Q学堂课程标题
export function programTitle(config) {
  return ax.get(`/course/title`, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 故事库课程标题
export function programStoryTitle(config) {
  return ax.get(`/story/title`, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 历史标签
export function courseTag(params,config) {
  return ax.get(`/course/tag/${params}`, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}




