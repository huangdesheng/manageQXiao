import ax from '../axios';


// 资金充值
export function workList(params, config) {
  return ax.post(`/works`, params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 获取机构余额
export function workType(config) {
  return ax.get(`/works/tag`, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 审核节点
export function checkPass(params, config) {
  return ax.get(`/works/audit/${params}`, params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 投票
export function goodVote(params, config) {
  return ax.post(`/works/vote/${params}`, params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 审核
export function auditWork(params, config) {
  return ax.post(`/works/audit`, params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}

export function eventTime(params, config) {
  return ax.post(`/works/event`, params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}

//作品活动周期
export function eventTypes(config) {
  return ax.get(`/works/event`, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// // 
// export function allList(params, config) {
//   return ax.post(`/balance`, params, config)
//     .then(res => res.data)
//     .catch(e => console.log(e));
// }
