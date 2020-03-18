import ax from '../axios';


// 题目列表
export function thinkList(params, config) {
  return ax.post(`/logic/list`, params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 新增题目
export function addLogic(params, config) {
  return ax.post(`/logic`, params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 编辑题目
export function updateLogic(params, config) {
  return ax.put(`/logic`, params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}


// 删除题目
export function deleteLogic(params, config) {
  return ax.delete(`/logic/${params}`, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 题目详情
export function logicDetails(params, config) {
  return ax.get(`/logic/${params}`, params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// // 
// export function allList(params, config) {
//   return ax.post(`/balance`, params, config)
//     .then(res => res.data)
//     .catch(e => console.log(e));
// }
