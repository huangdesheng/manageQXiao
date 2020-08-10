import ax from '../axios';

//查询系统默认行为
export function queryAllAction(params, config) {
  return ax.post('/action/mod-xiaojiao/weixin/action/queryAllAction.do', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//编辑系统默认行为
export function updateDefault(params, config) {
  return ax.post('/action/mod-xiaojiao/weixin/action/updateDefault.do', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//删除系统默认行为
export function deleteAction(params, config) {
  return ax.post('/action/mod-xiaojiao/weixin/action/deleteAction.do', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//新增系统默认行为
export function addAction(params, config) {
  return ax.post('/action/mod-xiaojiao/weixin/action/addAction.do', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 查询动态标语
export function sloganList(params, config) {
  return ax.post('/slogan/list', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 新增动态标语
export function addSlogan(params, config) {
  return ax.post('/slogan', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 编辑动态标语
export function updateSlogan(params, config) {
  return ax.put('/slogan', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 删除动态标语
export function deleteSlogan(params, config) {
  return ax.delete(`/slogan/${params.id}`, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 新增动态标语
export function userSlogan(params, config) {
  return ax.post('/slogan/online', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}
