import ax from '../axios';

//积分流水
export function creditList(params, config) {
  return ax.post('/credit', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}


//积分管理
export function creditManage(params, config) {
  return ax.get('/credit', config)
    .then(res => res.data)
    .catch(e => console.log(e));
}
