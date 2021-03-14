$(function () {
    //点击注册隐藏登录
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()

    })

    //点击登录隐藏测试
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()

    })
    //自定义密码校验
    let form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        //重复密码校验
        repwd: function (value) {
            let pwd = $('.reg-box input[name=password]').val()
            console.log(pwd);

            if (value !== pwd) { return '两次密码不一致,请重新输入' }

        }
    })
    //注册窗口
    let layer = layui.layer
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/api/reguser',
            data: {
                username: $('.reg-box input[name=username]').val(),
                password: $('.reg-box input[name=password]').val(),
            },
            // dataType:json ,//jsonp 请求JS文件 
            success: (res) => {
                console.log(res);

                if (res.status != 0) {
                    return layer.msg(res.message);
                }
                layer.msg('注册成功')

                $("#link_login").click();
                $("#form_reg")[0].reset();
            }
        }
        )

    })

    //登录窗口
    $('#form_login').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            // dataType:json ,//jsonp 请求JS文件 
            success: (res) => {
                console.log(res);

                if (res.status != 0) {
                    return layer.msg(res.message);
                }
                layer.msg('注册成功')

                localStorage.setItem('token', res.token);
                location.href = "/index.html";
            }
        }
        )

    })
})