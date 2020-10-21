import ax from '../axios';

// 新增作息表
export function addRent(params,config) {
  return ax.post('/rest', params, config)
  .then(res => res.data)
  .catch(err => console.log(err))
}

// 查询作息列表
export function scheduleData(params, config) {
  return ax.get(`/rest/${params}`, config)
  .then(res => res.data)
  .catch(err => console.log(err))
}

// 查询作息表详情
export function rentDetails(params, config) {
  return ax.get(`/rest/${params.schoolId}/${params.tempId}`, config)
  .then(res => res.data)
  .catch(err => console.log(err))
}

// 删除作息表详情
export function deleteRent(params, config) {
  return ax.post(`/rest/delete`, params, config)
  .then(res => res.data)
  .catch(err => console.log(err))
}

// 删除作息表详情
export function userRent(params, config) {
  return ax.post(`/rest/active`, params, config)
  .then(res => res.data)
  .catch(err => console.log(err))
}








//班级课表列表展示(没用)
export function queryScheduleList(params, config) {
  return ax.post('/action/mod-xiaojiao/weixin/schedule/queryScheduleList.do', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//查询学校课表模板(没用)
export function queryScheduleTemplateAll(params, config) {
  return ax.post('/action/mod-xiaojiao/weixin/schedule/queryScheduleTemplateAll.do', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//查询课表模板详情(没用)
export function queryScheduleTemplateDetail(params, config) {
  return ax.post('/action/mod-xiaojiao/weixin/schedule/queryScheduleTemplateDetail.do', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//新增模板(没用)
export function addScheduleTemplate(params, config) {
  return ax.post('/action/mod-xiaojiao/weixin/schedule/addScheduleTemplate.do', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//新增课表(没用)
export function addSchedule(params, config) {
  return ax.post('/action/mod-xiaojiao/weixin/schedule/addSchedule.do', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//修改课表(没用)
export function updateSchedule(params, config) {
  return ax.post('/action/mod-xiaojiao/weixin/schedule/updateSchedule.do', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//删除课表(没用)
export function deteleSchedule(params, config) {
  return ax.post('/action/mod-xiaojiao/weixin/schedule/deteleSchedule.do', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//查询默认时间模板(没用)
export function queryTeplateDefault(params, config) {
  return ax.post('/action/mod-xiaojiao/weixin/schedule/queryTeplateDefault.do', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}
