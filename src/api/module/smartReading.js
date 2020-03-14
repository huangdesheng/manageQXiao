import ax from '../axios';

export function articleList(params, config) {
  return ax.post('/article/list', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}

export function addArticle(params, config) {
  return ax.post('/article', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}
export function editArticle(params, config) {
  return ax.put('/article', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}

export function deleteArticle(params, config) {
  return ax.delete(`/article/${params}`, params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}


export function articleDetails(params, config) {
  return ax.get(`/article/${params}`, params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}
