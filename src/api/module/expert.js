import ax from '../axios';


// 资金充值
export function expertList(params, config) {
  return ax.post(`/expert`, params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}

export function checkExppert(params, config) {
  return ax.get(`/expert/audit/${params}`, params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}

export function expertType(params, config) {
  return ax.get(`/expert/type`, params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}

export function expertDetails(params, config) {
  return ax.get(`/expert/${params}`, params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}

export function expertCheck(params, config) {
  return ax.post(`/expert/audit`, params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 新增专家
export function expertAdd(params, config) {
  return ax.post(`/expert/save`, params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 专家信息更新
export function expertUpdate(params, config) {
  return ax.put(`/expert/update`, params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 删除专家
export function expertDelete(params, config) {
  return ax.delete(`/expert/${params}`, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}
