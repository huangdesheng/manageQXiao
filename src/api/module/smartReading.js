import ax from '../axios';

export function articleList(params, config) {
  return ax.post('/article/list', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}
