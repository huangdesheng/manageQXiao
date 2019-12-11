import ax from '../axios';


// 资金充值
export function payMoney(params, config) {
  return ax.post(`/pay`, params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 获取机构余额
export function organMoney(params, config) {
  return ax.get(`/balance`, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 获取交易流水
export function billList(params, config) {
  return ax.post(`/balance/bill`, params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 
export function allList(params, config) {
  return ax.post(`/balance`, params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}
