$(() => {

    // 1.1 获取裁剪区域的 DOM 元素
    let $image = $('#image')
    // 1.2 配置选项
    let options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    //选择文件
    $('#btnChooseImage').on('click', function () {
        $("#file").click();
    })
    //图片裁切
    let layer = layui.layer;
    $('#file').on('change', function (e) {
        let file = e.target.files[0]
        if (file == undefined) {
            return layer.msg('请选择图片!   ')

        }
        let newImgURL = URL.createObjectURL(file)
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })


    //上传头像
    $('#btnUpload').on('click', function () {
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        $.ajax({
            method: 'post',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            //   dataType:json ,//jsonp 请求JS文件 
            success: (res) => {
                //    console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)

                }
                layer.msg('头像更换成功')
                window.parent.getUserInfo();
            }
        })
    })
})