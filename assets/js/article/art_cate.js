$(function () {

    initArtCateList()

    //封装函数
    function initArtCateList() {

        $.ajax({
            method: 'get',
            url: '/my/article/cates',

            success: (res) => {
                console.log(res);

                let htmlStr = template('tpl-art-cate', { data: res.data });
                $('tbody').html(htmlStr)


            }
        })
    }

    //利用框架显示添加文章分类列表
    let layer = layui.layer;
    let indexAdd = null
    $("#btnAdd").on('click', function () {
        indexAdd = layer.open({
            type: 1,
            title: '添加文章分类',
            area: ['500px', "260px"],
            content: $('#dialog-add').html(),
        })
    })

    //提交文章分类添加(事件委托)
    $('body').on('submit', '#form-add', function (e) {

        //阻止默认
        e.preventDefault();
        //发送ajax
        $.ajax({
            method: 'post',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            //dataType:json ,jsonp 请求JS文件 
            success: (res) => {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                initArtCateList()
                layer.msg('添加成功')
                layer.close(indexAdd)
            }
        })
    })

    //编辑表单
    let indexEdit = null;
    let form = layui.form;
    $('tbody').on('click', '.btn-edit', function () {

        indexEdit = layer.open({
            type: 1,
            title: '添加文章分类',
            area: ['500px', "260px"],
            content: $('#dialog-edit').html(),
        })
        let Id = $(this).attr('data-id')
        $.ajax({
            method: 'get',
            url: '/my/article/cates/' + Id,

            success: (res) => {
                console.log(res);
                form.val('form-edit', res.data)
            }
        })
    })

    //编辑提交
    $('body').on('submit', '#form-edit', function (e) {
        //阻止默认
        e.preventDefault();

        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            //dataType:json ,jsonp 请求JS文件 
            success: (res) => {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                initArtCateList()
                layer.msg('修改成功')
                layer.close(indexEdit)
            }
        })
    })
    //删除按钮
    $('tbody').on('click', '.btn-delete', function () {
        let Id = $(this).attr('data-id');

        layer.confirm('是否删除?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                method: 'get',
                url: '/my/article/deletecate/' + Id,
                
                //dataType:json ,jsonp 请求JS文件 
                success: (res) => {
                    // console.log(res);
                    if (res.status!==0) {
                        return layer.msg(res.message)
                    }
                    initArtCateList()
                    layer.msg('删除成功')
                    layer.close(inedx)
                }
            })
        })

    })

})
