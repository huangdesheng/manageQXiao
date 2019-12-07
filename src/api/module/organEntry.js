import ax from '../axios';


// 新增入驻机构
export function addInst(params, config) {
  return ax.post('/inst', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 修改入驻机构
export function updateInst(params, config) {
  return ax.put('/inst', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 机构审核
export function checkOrgan(params, config) {
  return ax.post('/inst/audit', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 审核节点
export function checkInst(params, config) {
  return ax.get(`/inst/audit/${params}`, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 机构列表
export function organList(params, config) {
  return ax.post(`/inst/list`, params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 机构类型
export function organType(params, config) {
  return ax.get(`/inst/type`, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}


// 机构详情
export function organDetails(params, config) {
  return ax.get(`/inst/${params}`, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 上下线
export function updateUD(params, config) {
  return ax.put(`/inst/status/${params}`, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}
