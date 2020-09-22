import ax from '../axios'


// 平台概括
export function plaformData(params, config) {
  return ax.get('/stats', params, config).then(res => res.data).catch(err => console.log(err))
}

// 班级分析
export function classAnalysis(params, config) {
  return ax.post('/stats/class', params, config).then(res => res.data).catch(err => console.log(err))
}

// 用户分析
export function userAnalysis(params, config) {
  return ax.post('/stats/user', params, config).then(res => res.data).catch(err => console.log(err))
}

// 小Q表现
export function starAnalysis(params, config) {
  return ax.post('/stats/star', params, config).then(res => res.data).catch(err => console.log(err))
}

// 行为统计
export function behaviorStatistics(params, config) {
  return ax.post('/stats/habit', params, config).then(res => res.data).catch(err => console.log(err))
}


// 奖励兑换
export function prizeStatistics(params, config) {
  return ax.post('/stats/prize', params, config).then(res => res.data).catch(err => console.log(err))
}

// 小Q班级分析
export function xqClassStatistics(params, config) {
  return ax.post('/stats/index', params, config).then(res => res.data).catch(err => console.log(err))
}


// 小Q班级分析
export function deleteData(params, config) {
  return ax.post('/user/delete', params, config).then(res => res.data).catch(err => console.log(err))
}
