import ax from '../axios';


// 资金充值
export function thinkList(params, config) {
  return ax.post(`/logic/list`, params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// // 获取机构余额
export function addLogic(params, config) {
  return ax.post(`/logic`, params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}

export function updateLogic(params, config) {
  return ax.put(`/logic`, params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}

export function deleteLogic(params, config) {
  return ax.delete(`/logic/${params}`, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}

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
