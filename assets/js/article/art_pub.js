$(function () {
    // 1.初始化文章分类
    let layer = layui.layer;
    let form = layui.form;
    initCate();
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                // console.log(res)
                if (res.status != 0) {
                    return layer.msg(res.message);
                }
                // 渲染
                let htmlStr = template("tpl-cate", { data: res.data })
                $("[name=cate_id]").html(htmlStr);
                // 对于 select 标签，赋值之后我们需要重新渲染
                // 单选 多选 下拉 赋值之后 需要重新渲染
                form.render();
            }
        })
    }

    // 2.初始化富文本编辑器
    initEditor()

    // 3.1. 初始化图片裁剪器
    var $image = $('#image')
    // 3.2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }
    // 3.3. 初始化裁剪区域
    $image.cropper(options)

    // 4.选择图片
    $("#btnChooseImage").on("click", function () {
        $("#coverFile").click();
    })

    // 5.选择文件，同步修改图片预览区
    $("#coverFile").on("change", function (e) {
        var file = e.target.files[0]
        // 非空校验
        if (file === undefined) {
            // $image
            // .cropper('destroy')  
            // .attr('src', "")
            return layer.msg("您可以选择一张图片，作为文章封面！")
        }
        var newImgURL = URL.createObjectURL(file)
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })

    // 6.参数状态值处理
    let state = "已发布";
    // $("#btnSave1").on("click", function () {
    //     state = "已发布";
    // })
    $("#btnSave2").on("click", function () {
        state = "草稿";
    })

    // 7.发布文章
    $("#form-pub").on("submit", function (e) {
        e.preventDefault();
        // 发布文章是上传文件操作，要使用 FormData 类型的数据
        let fd = new FormData(this);
        // 以有三个，在添加一个
        fd.append("state", state);
        // 还剩最后一个属性
        $image.cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
            width: 400,
            height: 280
        })
            .toBlob(function (blob) {       // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                fd.append("cover_img", blob);
                // console.log(...fd);
                // 封装发布文章的ajax
                publishArticle(fd);
            });
    });

    // 封装
    function publishArticle(fd) {
        $.ajax({
            method: 'POST',
            url: '/my/article/add',
            data: fd,
            // 两个false
            processData: false,
            contentType: false,
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                // 成功：提示，页面跳转
                layer.msg("恭喜您，发表文章成功！")
                // location.href = '/article/art_list.html';
                setTimeout(function () {
                    window.parent.document.querySelector("#art_list").click();
                }, 1000);
            }
        })
    }

})