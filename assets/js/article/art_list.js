$(function () {

    //时间优化
    template.defaults.imports.dateFormat = function (dateStr) {
        let dt = new Date(dateStr);
        let y = dt.getFullYear();
        let m = padZero(dt.getMonth() + 1);
        let d = padZero(dt.getDate());

        let hh = padZero(dt.getHours());
        let mm = padZero(dt.getMinutes());
        let ss = padZero(dt.getSeconds());

        return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
    }
    function padZero(num) {
        return num < 10 ? "0" + num : num
    }

    //定义提交的参数
    let q = {
        pagenum: 1,    //	是	int	页码值:    //
        pagesize: 2,   //	是	int	每页显示多少条数据
        cate_id: '',    //否	string	文章分类的 Id
        state: '',  //	否	string	文章的状态，可选值有：已发布、草稿
    }

    //初始化加载文章列表
    let layer = layui.layer;
    initTable()
    function initTable() {
        $.ajax({
            method: 'get',
            url: '/my/article/list',
            data: q,
            //dataType:json ,jsonp 请求JS文件 
            success: (res) => {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                //成功就渲染页面
                let htmlStr = template('tpl-table', { data: res.data })
                $('tbody').html(htmlStr)
                renderPage(res.total)
            }
        })
    }

    // 初始化分类
    let form = layui.form;
    initCate()
    function initCate() {
        $.ajax({
            method: 'get',
            url: '/my/article/cates',
            //dataType:json ,jsonp 请求JS文件 
            success: (res) => {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                let htmlStr = template('tpl-cate', { data: res.data })
                $('[name=cate-id]').html(htmlStr)
                form.render();
            }
        })
    }
    //筛选功能
    $('#form-searsh').on('submit', function (e) {
        //阻止默认
        e.preventDefault();
      let cate_id =$('[name=cate_id]').val()  
      q.cate_id=cate_id
      let state =$('[name=state]').val()      
      q.state=state
      initTable()
    })


   //分页
   let laypage = layui.laypage;
   function renderPage(total) {
       laypage.render({
           elem: 'pageBox',
           count: total,
           limit: q.pagesize,
           curr: q.pagenum,
           layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
           limits: [2, 3, 5, 10],
           jump: function (obj, first) {


               //首次不执行
               if (!first) {
                   //do something
                   q.pagenum = obj.curr;
                   q.pagesize = obj.limit;
                   initTable();

               }
           }
       })
   }
    //删除
    // let layer = layui.layer;
    $('tbody').on('click', '.btn-delete', function () {
        let Id = $(this).attr('data-id')
        layer.confirm('是否删除?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                url: '/my/article/delete/' + Id,

                success: (res) => {
                    // console.log(res);
                    if (res.status != 0) {
                        return layer.msg(res.message)
                    }
                    layer.msg('成功')
                    if ($('.btn-delete').length == 1 && q.pagenum > 1) {
                        q.pagenum--;

                    }
                    initTable()
                    layer.close(index)

                }
            })
        })
    })



})