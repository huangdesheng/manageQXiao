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

// export function deleteLogic(params, config) {
//   return ax.delete(`/logic/${params}`, config)
//     .then(res => res.data)
//     .catch(e => console.log(e));
// }

// // 获取交易流水
// export function billList(params, config) {
//   return ax.post(`/balance/bill`, params, config)
//     .then(res => res.data)
//     .catch(e => console.log(e));
// }

// // 
// export function allList(params, config) {
//   return ax.post(`/balance`, params, config)
//     .then(res => res.data)
//     .catch(e => console.log(e));
// }
