$(function () {
    // 遮罩层的消失于隐藏
    $('.header .main-cat').click(function () {
        $('.mask').toggle();
        return false;    
    })

    $('.mask .close').click(function () {
        $('.mask').hide();
    })

   
    // 白菜价标题请求渲染
    $.ajax({
        url: 'http://mmb.ittun.com/api/getbaicaijiatitle',
        type: 'get',
        success: function (obj) {
            var html = template('menulist', obj);
            $('.menu-content').html(html);
        }
    })


    //图片轮播
    var gallery = mui('.mui-slider');
    gallery.slider({
        interval: 5000//自动轮播周期，若为0则不自动播放，默认为0；
    });


    function render(id, tpl, ele) {
        $.ajax({
            url: 'http://mmb.ittun.com/api/getbaicaijiaproduct',
            type: 'get',
            data: {
                titleid: id
            },
            success: function (obj) {
                // console.log(obj);
                var html = template(tpl, obj);
                $(ele).html(html);
            }
        })
    }
    //首页热销请求
    render(1, 'hot', '.mui-scroll');
    // $.ajax({
    //     url: 'http://mmb.ittun.com/api/getbaicaijiaproduct',
    //     type: 'get',
    //     data: {
    //         titleid: 1
    //     },
    //     success: function (obj) {
    //         console.log(obj);
    //         var html = template('hot', obj);
    //         $('.mui-scroll').html(html);
    //     }
    // })


    // 首页上架优惠信息列表请求---->19包邮的接口
    render(2, 'discount', '.goods-list ul');


    //置顶栏
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 400) {
            $('.gotop').fadeIn();
        } else {
            $('.gotop').fadeOut();
        }
    })

    //置顶的点击事件
    $('.gotop').click(function () {
        $('html,body').animate({
            scrollTop: 0
        }, 500)
    })
     
})