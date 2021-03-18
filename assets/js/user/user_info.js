$(function () {
    //入口函数
    //1校验数据

    let form = layui.form;

    form.verify({

        nickname: function (value) {

            if (value.length > 6) {
                return '用户昵称为1~6位'
            }
        }


    });
    //用户渲染
    initUserInfo()
    let layer = layui.layer;
    //封装函数
    function initUserInfo() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',

            success: (res) => {
                // console.log(res);
                // 判定成功失败给提示
                if (res.status !== 0) {
                    return layer.msg(res.message)

                }
                //成功,渲染
                form.val('formUserInfo',res.data)

            }
        })
    }

    //重置按钮
    $('#btnReset').on('click', function (e) {
        //阻止默认
        e.preventDefault();

        //重新渲染
        initUserInfo()

    })
    //修改用户信息
    $('.layui-form').on('submit', function (e) {

        //阻止默认
        e.preventDefault();

        //x发送ajax请求参数
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            //dataType:json ,jsonp 请求JS文件 
            success: (res) => {
                //  console.log(res);
                //判断是否成功给提示
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                //成功
                layer.msg('修改成功')
                // 调用中更新头像的方法
                window.parent.getUserInfo()
            }
        })
    })


})