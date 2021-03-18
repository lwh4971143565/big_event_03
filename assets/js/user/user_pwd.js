$(function(){
    //入口函数
    //1校验密码
    let form =layui.form;
    //layui中的内置方法来校验表单
    form.verify({
        pwd:[
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
        ],
        //不能与原密码一致
        newPwd:function(value){
            if (value ==$("[name=oldPwd]").val()) {
                return '新旧密码不能一致'
            }
        },
        rePwd:function(value){
            if (value !==$("[name=newPwd]").val() ) {
                return '两次密码必须一致'
            }
        }

    })


    //表单提交
    let layer=layui.layer;
    $('.layui-form').on('submit',function(e){
    //阻止默认
    e.preventDefault();

    $.ajax({
    method: 'post',
    url: '/my/updatepwd',       
    data: $(this).serialize(),
    //dataType:json ,jsonp 请求JS文件 
    success: (res) => {
     console.log(res);
     //判断是否成功
     if (res.status!==0) {
         return layer.msg(res.message)
     }
     layer.msg('修改成功')
     $('.layui-form')[0].reset();
     
     location.href="/login.html"
     
    }
    })



     })
})