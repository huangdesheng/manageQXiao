import ax from '../axios';
// 新增卡券
export function addCoupon(params, config) {
  return ax.post('/coupon', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 修改卡券
export function updateCoupon(params, config) {
  return ax.put('/coupon', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}


// 卡券列表搜索
export function couponList(params, config) {
  return ax.post('/coupon/search', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 卡券详情
export function couponDetails(params, config) {
  return ax.get(`/coupon/${params}`, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 发布下架
export function couponDown(params, config) {
  return ax.put(`/coupon/state/${params}`, params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 核销
export function chargeList(params, config) {
  return ax.post(`/coupon/charge/${params.id}`, params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 优惠券预览
export function previewCoupon(params, config) {
  return ax.get(`/coupon/preview/${params}`, params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 
export function chargeLists(params, config) {
  return ax.get(`/coupon/charge`, params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}
