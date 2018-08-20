$(function () {
    mui('.products .mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });

    //首页跳转过来的js
    if (location.href.split('?')[1]) {
        var url = location.href.split('?')[1].split('=');
        // console.log(url);
        lists(url[1]);
    }

    $.ajax({
        url: 'http://mmb.ittun.com/api/getbaicaijiatitle',
        type: 'get',
        success: function (obj) {
            var html = template('menulist', obj);
            $('.menu .mui-scroll').html(html);

            len = $('.menu .mui-scroll a').length;

            if (location.href.split('?')[1]) {
                for (var i = 0; i < $('.menu a').length; i++) {
                    // console.log($('.menu a').eq(i).data('id') == url[1]);

                    if ($('.menu a').eq(i).data('id') == url[1]) {
                        $('.menu a').eq(url[1]).addClass('mui-active').siblings().removeClass('mui-active');
                    }
                }
            }


        }
    })


    // 列表清单请求
    function lists(id) {
        $.ajax({
            url: 'http://mmb.ittun.com/api/getbaicaijiaproduct',
            type: 'get',
            dataType: 'json',
            data: {
                titleid: id
            },
            success: function (obj) {


                var num = 0;
                if (mui('.products .mui-scroll-wrapper').scroll().y == 0) {
                    //下拉刷新
                    num = 3;
                } else {
                    //上拉加载
                    num = $('.products .mui-scroll ul li').length + 3;
                }

                obj.length = num;
                // console.log(obj);
                var html = template('lists', obj);
                $('.products .mui-scroll ul').html(html);

                mui(".products .mui-scroll-wrapper").pullRefresh().endPullupToRefresh();

            }
        })
    }

    //lists(0);
    // $('.menu .mui-scroll').on('tap', 'a', function () {
    //     var id = $(this).data('id');
    //     console.log(id);
    //     lists(id);
    // })



    //列表下拉刷新,上拉加载

    mui.init({
        pullRefresh: {
            container: '.products .mui-scroll-wrapper',//待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
            down: {
                style: 'circle',//必选，下拉刷新样式，目前支持原生5+ ‘circle’ 样式
                color: '#2BD009', //可选，默认“#2BD009” 下拉刷新控件颜色
                auto: true,//可选,默认false.首次加载自动上拉刷新一次
                callback: function () {

                    lists(0);
                    //  当数据加载成功之后，需要手动结束刷新状态
                    mui(".products .mui-scroll-wrapper").pullRefresh().endPulldownToRefresh();
                    mui.toast('刷新成功');
                } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            },
            up: {
                auto: true,//可选,默认false.自动上拉加载一次
                contentrefresh: "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
                contentnomore: '没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
                callback: function () {
                    lists(0);

                    mui.toast('加载成功');
                } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            }

        }
    });


    $('.menu .mui-scroll').on('tap', 'a', function () {
        // $('.products .mui-scroll-wrapper').scrollTop(0);
        var id = $(this).data('id');
        $('.products .mui-scroll ul').empty();
        lists(id);

        // $(this).addClass('mui-active').siblings().removeClass('mui-active');
    })


    //置顶栏
    $('.products').on('scroll', function () {
        // console.log(mui('.products .mui-scroll-wrapper').scroll().y);
        if (mui('.products .mui-scroll-wrapper').scroll().y < -400) {
            $('.products .gotop').fadeIn();
        } else {
            $('.products .gotop').fadeOut();
        }
    })

    //置顶的点击事件
    $('.products .gotop').on('tap', function () {
        mui('.products .mui-scroll-wrapper').scroll().scrollTo(0, 0, 100);//100毫秒滚动到顶

        //手动触发刷新
        mui(".products .mui-scroll-wrapper").pullRefresh().pulldownLoading();
    })

    $('.footer .gotop').on('tap', function () {
        mui('.products .mui-scroll-wrapper').scroll().scrollTo(0, 0, 100);//100毫秒滚动到顶

        //手动触发刷新
        mui(".products .mui-scroll-wrapper").pullRefresh().pulldownLoading();
    })
    //回到上一页
    $('.header .back').click(function () {
        history.back();
    })

})