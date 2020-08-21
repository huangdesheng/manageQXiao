function handleDate(dateNow, intervalDays) {
  let oneDayTime = 24 * 60 * 60 * 1000;
  let list = [];
  let lastDay;
  lastDay = new Date(dateNow.getTime() - intervalDays * oneDayTime);
  list.push(formateDate(lastDay));
  list.push(formateDate(dateNow));
  return list;
}

function formateDate(time) {
  let year = time.getFullYear()
  let month = time.getMonth() + 1
  let day = time.getDate()
  if (month < 10) {
    month = '0' + month
  }
  if (day < 10) {
    day = '0' + day
  }
  return year + '-' + month + '-' + day
}


function timestampToTime(timestamp) {
  var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var D = date.getDate() + ' ';
  return Y + M + D
}

export {
  handleDate,
  timestampToTime
}
