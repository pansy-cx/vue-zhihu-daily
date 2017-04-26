import Vue from 'vue';

// 改变图片路径
Vue.prototype.replace = function (value) {
  if(value) {
    let change = value.replace(/https?:\/\/p/g,'https://images.weserv.nl/?url=p');
    return change;
  }
}
// 时间格式化
Vue.prototype.dateFormat = function(value) {
  let sysDate = new Date();
  let sysYear = sysDate.getFullYear();
  let sysMonth = sysDate.getMonth()+1 < 10 ? '0'+(sysDate.getMonth()+1) : sysDate.getMonth()+1;
  let sysDay = sysDate.getDate();
  let t = [sysYear, sysMonth, sysDay].join('/');   //系统日期

  let year = value.slice(0,4);
  let month = value.slice(4,6);
  let day = value.slice(6,8);
  let date = [year, month, day].join('/');
  let index = new Date(date).getDay();
  let week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

  if(date == t) {
    return '今日新闻';
  }else {
    return month + '月' + day + '日' + ' ' + week[index];
  }
}

//格式化时间戳
Vue.prototype.jsondate = function(timeStamp, fmt) { 
  if (!timeStamp) {
    return ''
  }
  var _timeStamp = parseInt(timeStamp)
  if (_timeStamp.toString().length === 10) {
    _timeStamp *= 1000
  }
  !fmt && (fmt = 'yyyy-MM-dd')

  var t = new Date(_timeStamp)

  var o = {
    'M+': t.getMonth() + 1, // 月份
    'd+': t.getDate(),      // 日
    'h+': t.getHours(),     // 小时
    'm+': t.getMinutes(),   // 分
    's+': t.getSeconds(),   // 秒
    'q+': Math.floor((t.getMonth() + 3) / 3), // 季度
    'S': t.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (t.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
  }
  return fmt
}

//空格变换行
Vue.prototype.wrap = function(value) {
  value = value.replace(/\s/g,'<br>');
  return value;
}