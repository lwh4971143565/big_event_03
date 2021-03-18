//服务器地址优化
let baseURL = "http://api-breakingnews-web.itheima.net"

//ajax方法拼接url地址
$.ajaxPrefilter(function (options) {
    options.url = baseURL + options.url;

    //2对需要权限的接口配置头信息
    if (options.url.indexOf("/my/") !== -1) {
        options.headers = {
            Authorization: localStorage.getItem("token") || ''
        }
    }
    //拦截所有响应,判断身份
    options.complete = function (res) {

        let obj = res.responseJSON
        if (obj.status == 1 && obj.message == "身份认证失败") {
            localStorage.removeItem('token')
            //清空token
            location.href = "/login.html"
        }
    }




})
