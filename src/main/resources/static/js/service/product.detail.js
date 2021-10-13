// 팝업 - 멤버쉽 혜택
var iscroll_mem;
function iscroll_run_mem() {
    iscroll_mem = new IScroll('.pop_mem .iscroll_cp', {
        mouseWheel: true,
        interactiveScrollbars: true,
        shrinkScrollbars: 'scale',
        fadeScrollbars: true,
        click: true
    });
}
function pop_mem() {
    prevent_scroll();
    $('.pop_mem').fadeIn(150);
    $('.bg_dimm').fadeIn(150);
    iscroll_run_mem(); // iscroll
    $('.fix_title').bind('touchmove', function (i) { i.preventDefault() }); // 타이틀 터치 방지
}

// 팝업 - 이벤트
var iscroll_evt;
function iscroll_run_evt() {
    iscroll_evt = new IScroll('.pop_evt .iscroll_cp', {
        mouseWheel: true,
        interactiveScrollbars: true,
        shrinkScrollbars: 'scale',
        fadeScrollbars: true,
        click: true
    });
}
function pop_evt() {
    prevent_scroll();
    $('.pop_evt').fadeIn(150);
    $('.bg_dimm').fadeIn(150);
    iscroll_run_evt(); // iscroll
    $('.fix_title').bind('touchmove', function (i) { i.preventDefault() }); // 타이틀 터치 방지
}

function pop_useinfo() {
    prevent_scroll();
    $('.pop_useinfo').fadeIn(150);
    $('.bg_dimm').fadeIn(150);
    iscroll_run_useinfo(); // iscroll
    iscroll_useinfo.refresh(); // iscroll refresh
    $('.fix_title').bind('touchmove', function (i) { i.preventDefault() }); // 타이틀 터치 방지
}

function pop_room_detail(data_no) {
    prevent_scroll();
    $('.pop_useinfo[data-room-detail=' + data_no + ']').fadeIn(150);
    $('.bg_dimm').fadeIn(150);
    var iscroll = "iscroll_" + data_no;
    iscroll = new IScroll('.scroll_' + data_no, {
        mouseWheel: true,
        interactiveScrollbars: true,
        shrinkScrollbars: 'scale',
        fadeScrollbars: true,
        click: true,
    });
    $('.fix_title').bind('touchmove', function (i) { i.preventDefault() }); // 타이틀 터치 방지
}

/* 객실상세 갤러리 높이 수정*/
function gallery_height_align() {
    setTimeout(function () {
        $('.swiper-wrapper').each(function () {
            var this_height = $('li:eq(0) img', this).height();
            $('li img', this).parent().parent().css('height', this_height);
        });
    }, 300);
}

/* jQuery */
$(function () {
    if ($('.comment div').length > 0) {
        if ($('.comment div').height() > 52) {
            $('.comment button').text('더보기');
            $('.comment div').addClass('clamp');
        } else {
            $('.comment button').remove();
        }
    }

    /* IE 버그 픽스 */
    if (navigator.appName == 'Microsoft Internet Explorer' || !!(navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/rv:11/)) || (typeof $.browser !== "undefined" && $.browser.msie == 1)) {
        //객실상세 갤러리 높이 수정
        $('.theme').addClass('ie_fix');
        gallery_height_align();
        $(window).resize(function () {
            gallery_height_align();
            $('.theme').removeClass('ie_fix');
        });

    }

    /* 비제휴점 체크후 셋팅 */
    if ($('#content').hasClass('inert_room')) {
        $('.tab button').eq(1).addClass('on');
        $('.inert_room .detail_info').show();
        $('.inert_room .detail_info a').eq(1).hide();
    }

    setTimeout(function () {
        $('#default_info_tab').trigger('click');
    }, 100);

    /* 모바일 갤러리 */
    $('.swiper-default').each(function () {
        var target = $(this);
        $(this).swiper({
            paginationClickable: true,
            preloadImages: false,
            lazyLoading: true,
            loop: false,
            speed: 200,
            longSwipesRatio: 0.1,
            onSlideChangeEnd: function (swiper) {
                var this_idx = swiper.activeIndex;
                $('.index p span', target).eq(0).html(this_idx + 1); // idx값 변경
            }
        });
    });

    /* 탭메뉴 */
    var tab_menu_btn = $('.tab button');
    tab_menu_btn.each(function (e) {
        $(this).click(function () {
            if ($(this).index()) {
                $('.reserve_none').hide();
            } else {
                $('.reserve_none').show();
            }
            tab_menu_btn.removeClass('on');
            $(this).addClass('on');
            $('article').removeClass('on').eq(e).addClass('on');
        });
    });

    /* 호텔 모바일 이벤트 타이틀 클릭시 */
    $('.event_link').each(function (e) {
        $('section', $(this)).click(function (i) {
            i.preventDefault();
            var win_w = $(window).width();
            if (win_w > 1023) { // PC
                if ($(this).hasClass('gra_mint_2')) {
                    pop_mem(); // 모텔 이벤트
                } else {
                    pop_evt(); // 호텔 이벤트
                }
            } else { // Mobile
                if ($(this).hasClass('on')) {
                    $(this).removeClass('on');
                    $(this).next().hide();
                } else { // PC
                    $('.event_link section').removeClass('on');
                    $('.event_link div').hide();
                    $(this).addClass('on');
                    $(this).next().show();
                }
            }
        });
    });

    /* 사장님한마디 더보기 */
    $('.comment button').click(function () {
        var text = $(this).text();
        var target = $('.comment div');
        if (text == "더보기") {
            $(this).text('접기');
            target.removeClass('clamp');
        } else {
            $(this).text('더보기');
            target.addClass('clamp');
        }
    });

    /* 리사이즈 */
    pic_resize();
    $(window).resize(function () {
        pic_resize(); // 썸네일 이미지 리사이즈
    });

    /* 객실상세 > 갤러리 */
    $('.index_mobile').each(function () { // 각 갤러리 초기 설정
        var items = $('li', this).length;
        $('.index span', this).eq(0).text('1');
        $('.index span', this).eq(1).text(items);
    });

    /* 객실안내 예약 내부 */
    $('.gallery_m .nav').each(function () { // PC 내부용
        $(this).owlCarousel({
            loop: false,
            margin: 0,
            items: 1,
            lazyLoad: true,
            nav: true
        });

        $(this).on('changed.owl.carousel', function (event) { // Mobile Index 값 변경
            var this_idx = event.item.index;
            //            console.log(this_idx);
            var this_next = $(this).next();
            $('span', this_next).eq(0).html(this_idx + 1)

            //			var current = (event.item.index + 1) - event.relatedTarget._clones.length / 2;
            //			var allItems = event.item.count;
            //			if (current > allItems || current == 0) {
            //				current = allItems - (current % allItems);
            //				$(this).next().children('span').eq(0).text('1');
            //			}else{
            //				$(this).next().children('span').eq(0).text(current);
            //			}
        });

    });

    /* 갤러리 PC 용 */
    var gallery_pc_cnt = $('.gallery_pc .gallery-top li').length;

    if (gallery_pc_cnt > 4) { // 5장 이상

        $('.gallery_pc	.gallery-thumbs li').slice(0, 5).addClass(''); // 초기 셋팅

        var galleryTop = new Swiper('.gallery-top', {
            speed: 200,
            spaceBetween: 0,
            loop: true,
            loopedSlides: 4, //looped slides should be the same,
            preloadImages: false,
            lazyLoading: true,
            effect: 'fade',
            simulateTouch: false

        });

        var galleryThumbs = new Swiper('.gallery-thumbs', {
            nextButton: '.gallery_pc .swiper-button-prev',
            prevButton: '.gallery_pc .swiper-button-next',
            speed: 150,
            spaceBetween: 0,
            slidesPerView: 4,
            touchRatio: 0.2,
            loop: true,
            loopedSlides: 4, //looped slides should be the same
            slideToClickedSlide: true,
            preloadImages: false,
            lazyLoading: true,
        });
        galleryTop.params.control = galleryThumbs;
        galleryThumbs.params.control = galleryTop;

    } else { // 4장 이하

        $('.gallery_pc .gallery-thumbs').addClass('fix-4');

        var galleryTop = new Swiper('.gallery-top', {
            spaceBetween: 0,
            loop: false,
            preloadImages: false,
            lazyLoading: true,
            simulateTouch: false

        });

        var galleryThumbs = new Swiper('.gallery-thumbs', {
            spaceBetween: 0,
            slidesPerView: 4,
            loop: false,
            preloadImages: false,
            lazyLoading: true,
        });
        galleryTop.params.control = galleryThumbs;
        galleryThumbs.params.control = galleryTop;
        $('.gallery_pc .swiper-button-next, .gallery_pc .swiper-button-prev').hide();

        var $nav_list = $('.gallery_pc .gallery-thumbs li'); // 클릭시
        $nav_list.each(function (e) {
            $(this).click(function () {
                if ($(this).hasClass('swiper-slide-active')) {
                    null;
                } else {
                    var img_src = $('img', this).attr('src');
                    $('.gallery-top li img').attr('src', img_src);
                    $('.gallery-top li img').attr('data-original', img_src);
                    $nav_list.removeClass('swiper-slide-active');
                    $(this).addClass('swiper-slide-active');
                }
            });
        });
    }

    $('.room .pic_view').each(function () { // PC 갤러리 열기
        $(this).click(function () {
            if (!$(this).hasClass('pic_empty')) {
                $(this).parent().addClass('on');
                setTimeout(function () {
                    $('.room_info .room.on .cal_bg,	.room_info .room.on .pic_wrap').addClass('visible');
                }, 300);
            }
        });
        $()
    });

    $('.room .cal_bg button').each(function () { // PC 갤러리 닫기
        $(this).click(function () {
            $(this).parent().parent().removeClass('on');
            $(this).parent().removeClass('visible');
            //			$('.room_info .room.on .cal_bg,	.room_info .room.on .pic_wrap').removeClass('visible');
        });
    });

    $('.detail_info .category').each(function (e) { // 숙소정보 열기
        $(this).click(function (i) {
            i.preventDefault();
            if ($(this).hasClass('on')) {
                $('.detail_info .category').removeClass('on');
                $('.detail_info section').hide();
            } else {
                $('.detail_info .category').removeClass('on');
                $('.detail_info section').hide();
                $(this).addClass('on');
                $(this).next('section').show();
            }

        });
    });


    $('.theme ul > li').each(function () { // 테마 제목 CSS 수정
        if ($('.gallery_theme', this).length > 0) {
            $(this).addClass('has_gall');
        }
    });

    /* 요금테이블 가로 조정 */
    $('table').each(function () { // 테이블 TH 가로 조절
        var th_cnt = $('th', this).length;
        var th_w = 100 / th_cnt;
        if (th_cnt == 2) { // th 2개일때
            $('th:first-child', this).css('width', '35%');
        } else {
            $('th', this).css('width', th_w + "%");
        }
    });

    $(".product_date").on('change', function (event) {
        var select_date = JSON.parse($(this).val());

        if (jsDayCheck(select_date.start) === true ||
            jsDayCheck(select_date.end) === true) {
            if ($(".product_date").length > 0) {

                let _start = moment(select_date.start);
                let _end = moment(select_date.end);
                let _diffDays = _end.diff(_start, 'days');

                $('#sel_date').val(select_date.start);

                if (_diffDays > 7) {
                    select_date.end = _start.add(7, 'days').format('YYYY-MM-DD');
                    $('#sel_date2').val(select_date.end);
                    alert_Msg('최대 7박 선택 가능합니다.', 1, window.location.pathname + '?sel_date=' + select_date.start + '&sel_date2=' + select_date.end + '&ano=' + $('#ano').val() + '&adcno=' + $('#adcno').val());
                } else {
                    if (_diffDays <= 0) {
                        select_date.end = _start.add(1, 'days').format('YYYY-MM-DD');
                    }
                    $('#sel_date2').val(select_date.end);
                    $('#product_filter_form').submit();
                }
            }

        }
    });

    get_review_list();
    build_theme_list($('#ano').val());
    room_detail_async.init();

    if ($('.special_popup').length > 0) {
        alert_Msg($('.special_popup').html());
    }

    if ($('.naver_popup').length > 0) {
        alert_Msg($('.naver_popup').html());
    }
});
/* ///////jQuery */

var map_load = false;

function init_map(lat, lng) {

    setTimeout(function () {

        if (!map_load) {
            var image_red = new daum.maps.MarkerImage(	// 마커 빨강
                '//image.goodchoice.kr/images/web_v3/ico_map_3.png',
                new daum.maps.Size(38, 47),
                {}
            );

            var map = new daum.maps.Map($('#google_maps')[0], {
                center: new daum.maps.LatLng(parseFloat(lat), parseFloat(lng)),
                level: 3,
                tileAnimation: false
            });

            var marker = new daum.maps.Marker({
                position: new daum.maps.LatLng(parseFloat(lat), parseFloat(lng)),
                image: image_red // 마커 커스텀 삽입
            });

            marker.setMap(map);

            daum.maps.event.addListener(map, 'idle', function () {
                map_load = true;
            });
        }

    }, 100);
}

// 별점 계산
function get_score_star(rateavg) {
    rateavg = Math.floor((parseFloat(rateavg) * 10) / 2);
    rateavg -= rateavg % 5;

    return str_pad(rateavg, 2, '0', 'STR_PAD_LEFT');
}

/**
 * 경과 시간 (string)
 */
function get_date_diff(regdate, ago) {
    var ptime = xReturnNumber(regdate),
        ctime = Math.floor(new Date().getTime() / 1000);

    // Elapsed time
    var etime = ctime - ptime;

    if (etime < 60) { return '방금 ' + ago; }

    var arrsec = {
        year: 365 * 24 * 60 * 60,
        month: 30 * 24 * 60 * 60,
        day: 24 * 60 * 60,
        hour: 60 * 60,
        minute: 60
    };

    var arrsec_str = {
        year: '년',
        month: '개월',
        day: '일',
        hour: '시간',
        minute: '분'
    };

    for (var key in arrsec) {
        var val = etime / arrsec[key];
        if (val >= 1) {
            var res = Math.floor(val);
            return res + arrsec_str[key] + ' ' + ago;
        }
    }

    return ago;
}

function float_zero(rateavg) {
    var str_length = (parseFloat(rateavg) * 10) >= 100 ? 4 : 3;

    return str_pad(rateavg, str_length, '.0');
}

let room_detail_async = (function () {
    let container;
    function init() {
        container = new Vue({
            el: '#pop_room_description',
            data: function () {
                return {
                    items: [],
                }
            },
            methods: {
                show: function (room_id) {
                    let _self = this;
                    let _container = $("#pop_room_description");

                    prevent_scroll();
                    _container.fadeIn(150);
                    $(".bg_dimm").fadeIn(150);

                    $.xResponse('/product/room_detail_non/' + $('#ano').val(), {
                        armgno: room_id,
                        adcno: $("#adcno").val(),
                        sel_date: $("#sel_date").val(),
                        sel_date2: $("#sel_date2").val(),
                    }).done(function (data) {
                        _self.items = data.result;

                        $(".fix_title").bind('touchmove', function (i) { i.preventDefault() });
                        $('.spinner').fadeOut(250);
                    });
                }
            }, // methods
            updated: function () {
                let iscroll = new IScroll('#pop_room_description .iscroll_cp', {
                    mouseWheel: true,
                    interactiveScrollbars: true,
                    shrinkScrollbars: 'scale',
                    fadeScrollbars: true,
                    click: true,
                });
            }
        });
    }
    return {
        show: function (room_id) {
            $('.spinner').show(250);
            container.show(room_id)
        },
        init: init
    }
})();

function get_review_list() {
    // if (!$('#content').hasClass('motel_room')) {
    //     $('#review').remove();
    //     $('.tab button').eq(2).remove();
    //     return false;
    // }

    var hash = window.location.hash;
    var cur_page = xReturnNumber(hash.replace('#', ''));

    var review = new Vue({
        el: '#review',
        created: function () {
            var settings = {
                page: cur_page,
                ano: $('#ano').val()
            };

            settings = this.searchTerm(settings);
            get_no_total_pagination(settings, this);
        },
        data: function () {
            return {
                ratehouse: 0,
                rateprice: 0,
                rateservice: 0,
                rateavg: 0,
                ownercommcnt: 0,
                rate_textinfo: "",
                userstate: "N",
                count: 0,
                total_page_cnt: 0,
                items: [],
                score_star: 0,
                page: hash.replace('#', '')
            }
        },
        methods: {

            searchTerm: function (settings) {
                var _self = this;

                $.xResponse('/product/get_review_non', settings).done(function (data) {
                    _self.ratehouse = data.result.ratehouse;
                    _self.rateprice = data.result.rateprice;
                    _self.rateservice = data.result.rateservice;
                    _self.rateavg = float_zero(data.result.rateavg);
                    _self.ownercommcnt = data.result.ownercommcnt;
                    _self.rate_textinfo = data.result.rate_textinfo;
                    _self.userstate = data.result.userstate;
                    _self.count = data.result.count;
                    _self.total_page_cnt = data.result.total_page_cnt;
                    _self.items = data.result.items;
                    _self.score_star = data.result.score_star;
                    _self.page = settings.page;

                    $('#review_cnt em').html(comma(_self.count));

                    settings['total_page'] = data.total_page;

                    _self.$nextTick(function () {

                    });
                });

                return settings;
            }
        },
        updated: function () {

            var reviewSwiper = new Swiper('.swiper-type-3', {
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev',
                loop: false,
                speed: 200,
                grabCursor: true,
                longSwipesRatio: 0.1,
                slidesPerView: 2.2,
                spaceBetween: 16,
                breakpoints: {
                    480: {
                        slidesPerView: 1.3,
                        spaceBetween: 8
                    }
                }
            });

        }
    });
}

function build_theme_list(ano) {
    $('section.theme ul').empty();

    function getLocation(href) {
        var match = href.match(/^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)([\/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/);

        return match && {
            protocol: match[1],
            host: match[2],
            hostname: match[3],
            port: match[4],
            pathname: match[5],
            search: match[6],
            hash: match[7]
        }
    }

    function build_img_resize(imgpath, alt, cls, size, src) {
        alt = alt === undefined ? '' : alt;
        size = size === undefined ? '1000X500' : size;
        cls = cls === undefined ? '' : cls;
        src = src === undefined ? '//image.goodchoice.kr/images/web_v3/bg_trans.png' : src;

        var original = '//image.goodchoice.kr' +
            '/resize_' + size + 'x0' + imgpath;

        if (src == 'copy')
            src = original;

        return '<img class="swiper-lazy ' + cls + '" ' +
            'data-original="' + original + '" ' +
            'src="' + src + '" ' +
            'alt="' + alt + '" />';
    }

    var items = [];

    $.xResponse('/product/get_theme_list_non', { ano: ano }).done(function (result) {
        if (result.msg == 'OK') {

            $.each(result.data, function (k, theme) {
                var li = '<li><p class="title theme_' + theme.tmino + '">' + theme.tminame + '</p>';

                if (theme.images.length > 0) {
                    li += '<div class="gallery_theme"><div class="swiper-container swiper-type-2"><ul class="swiper-wrapper">';

                    $.each(theme.images, function (k, itme) {
                        li += '<li class="swiper-slide">' +
                            build_img_resize(itme.imgpath, theme.tminame, '', '272X181', 'copy') + '<div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div></li>';
                    });

                    li += '</ul><div class="swiper-button-next"></div><div class="swiper-button-prev"></div></div></div></div>';
                }

                li += '</li>';

                items.push(li);
            })

            $('section.theme ul').append(items.join(''));
        }
    });

    if (items.length == 0) {
        $('section.theme').remove();
        $('a.theme_category').remove();
    }

    // 테마 카테고리 갤러리 노출
    $('.theme_category').click(function () {
        $('.swiper-type-2').each(function () {
            $(this).swiper({
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev',
                preloadImages: false,
                lazyLoading: true,
                loop: false,
                speed: 200,
                grabCursor: true,
                longSwipesRatio: 0.1,
                slidesPerView: 2.2,
                spaceBetween: 16,
                breakpoints: {
                    480: {
                        slidesPerView: 1.3,
                        spaceBetween: 8
                    }
                }
            });
        });
    });

    // 리뷰 갤러리 노출
    $('.tab_review').click(function () {

        var reviewSwiper = new Swiper('.swiper-type-3', {
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            loop: false,
            speed: 200,
            grabCursor: true,
            longSwipesRatio: 0.1,
            slidesPerView: 2.2,
            spaceBetween: 16,
            breakpoints: {
                480: {
                    slidesPerView: 1.3,
                    spaceBetween: 8
                }
            }
        });

    });

    lazyload(); // 레이지로드

}
