//服务器地址优化
let baseURL = "http://api-breakingnews-web.itheima.net"

//ajax方法拼接url地址
$.ajaxPrefilter(function (options) {
    options.url = baseURL + options.url;
})
