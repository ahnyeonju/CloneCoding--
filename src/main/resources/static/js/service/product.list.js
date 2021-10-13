/**
 * Created by helloworld on 2017-04-18.
 */
$(function () {
    var win_w = $(window).width();

    $('div.wrap header').addClass('recommend_header');

    $(window).resize(function () {
        location_layer_close();

        if ($(window).width() < 1024) { // 모바일
            $('.btn_area').bind('click touchstart', function (e) { // 클릭 & 터치
                location_layer_open(e, 'mo');
            });

            $('.area_pop .city > li > a').click(function (e) {
                var index = $('.area_pop .city > li > a').index($(this));

                if (!$('.area_pop .area_wrap').hasClass('area_etc')) {
                    e.preventDefault();
                }

                $('.city_child').hide();
                $('.city_child').eq(index).show();
                $('.city li .fix').removeClass('fix on');
                $(this).addClass('fix on');
            });

            $('.area_pop').on('mouseleave', location_layer_close); // PC 지역선택 마우스 아웃
        } else { // PC
            /* 지역선택 노출 */
            $('.btn_area').bind('mouseenter', function (e) {	 // 마우스 엔터
                var opacity = '<div class="bg_opacity_trans">&nbsp;</div>'
                $('body').append(opacity);
                location_layer_open(e, 'pc');
                $('.bg_opacity_trans').click(function () {
                    location_layer_close();
                });
            });


            $('.area_pop .city > li > a').mouseenter(function () {
                var index = $('.area_pop .city > li > a').index($(this));

                $('.city_child').hide();
                $('.city_child').eq(index).show();
                $('.city li .fix').removeClass('fix on');
                $(this).addClass('fix on');
            });

            $('.area_pop .city > li > a').click(function (e) {
                if (!$('.area_pop .area_wrap').hasClass('area_etc')) {
                    e.preventDefault();
                }
            });

            $('.area_pop').on('mouseleave', location_layer_close); // PC 지역선택 마우스 아웃
        }

    });


    if (win_w < 1024) { // 모바일

        $('.btn_area').bind('click touchstart', function (e) { // 클릭 & 터치
            location_layer_open(e, 'mo');
        });

        $('.area_pop .city > li > a').click(function (e) {
            var index = $('.area_pop .city > li > a').index($(this));

            if (!$('.area_pop .area_wrap').hasClass('area_etc')) {
                e.preventDefault();
            }

            $('.city_child').hide();
            $('.city_child').eq(index).show();
            $('.city li .fix').removeClass('fix on');
            $(this).addClass('fix on');
        });

        $('.area_pop').on('mouseleave', location_layer_close); // PC 지역선택 마우스 아웃
    } else { // PC

        /* 지역선택 노출 */
        $('.btn_area').bind('mouseenter', function (e) {	 // 마우스 엔터
            var opacity = '<div class="bg_opacity_trans">&nbsp;</div>'
            $('body').append(opacity);
            location_layer_open(e, 'pc');
            $('.bg_opacity_trans').click(function () {
                location_layer_close();
            });
        });


        $('.area_pop .city > li > a').mouseenter(function () {
            var index = $('.area_pop .city > li > a').index($(this));

            $('.city_child').hide();
            $('.city_child').eq(index).show();
            $('.city li .fix').removeClass('fix on');
            $(this).addClass('fix on');
        });

        $('.area_pop .city > li > a').click(function (e) {
            if (!$('.area_pop .area_wrap').hasClass('area_etc')) {
                e.preventDefault();
            }
        });

        $('.area_pop').on('mouseleave', location_layer_close); // PC 지역선택 마우스 아웃
    }

});