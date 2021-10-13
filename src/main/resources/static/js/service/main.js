/* 롤링 배너 */
var swiper = new Swiper('.swiper-container', {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    speed: 450,
    loop: true,
    autoplay: 5000,
    autoplayDisableOnInteraction: false,
    simulateTouch: true
});

/* 메인 링크 */
var iscroll_01; // 지역카테고리 1
function iscroll_run_01() {
    iscroll_01 = new IScroll('.iscroll_01', {
        mouseWheel: true,
        interactiveScrollbars: true,
        shrinkScrollbars: 'scale',
        fadeScrollbars: true,
        click: true
    });
}

var iscroll_02; // 지역카테고리 2
function iscroll_run_02() {
    iscroll_02 = new IScroll('.iscroll_02', {
        mouseWheel: true,
        interactiveScrollbars: true,
        shrinkScrollbars: 'scale',
        fadeScrollbars: true,
        click: true
    });
}


// TODO: 지역 관련 스크립트 시작
// 시 리스트
var build_region_list = function (data, adcno) {
    var items = [];

    if (typeof data == 'object' && data.length > 0) {
        $.each(data, function (k, item) {
            if (item.recommend == 'Y') {
                items.push('<li><a href="/product/home/' + item.arino + '">' + item.ariname + '<span>HOT</span></a></li>');
            } else {
                items.push('<li><a href="/product/search/' + adcno + '/' + item.arino + '">' + item.ariname + '</a></li>');
            }
        });
    }

    $('.iscroll_02 .scroller').append(
        '<ul class="city_child">' + items.join('') + '</ul>'
    );
}

//도 리스트
var build_city_list = function (data, adcno) {
    var items = [];

    $('.iscroll_02 .scroller').empty();

    if (typeof data == 'object' && data.length > 0) {
        $.each(data, function (k, item) {
            if (adcno == 4 || adcno == 5 || adcno == 7)
                items.push('<li><a href="/product/search/' + adcno + '/' + item.arino + '" ' +
                    (k == 0 ? 'class="fix on"' : '') + '>' + item.ariname + '</a></li>');
            else
                items.push('<li><a href="/product/search/" ' + (k == 0 ? 'class="fix on"' : '') + '>' +
                    item.ariname +
                    '</a></li>');

            build_region_list(item.sub_list, adcno);
        });
    }

    $('.iscroll_01 .scroller').html(
        '<ul class="city">' + items.join('') + '</ul>'
    );

    $('.iscroll_01 .scroller a').click(function () {
        $('.iscroll_01 .scroller a').removeClass('on');
        $(this).addClass('on');
        iscroll_02.destroy();
        setTimeout(function () {
            iscroll_run_02();
        }, 200);
    });
}

// TODO: 메인 카테고리 아이콘 클릭
function location_layer_open(e) { // 링크
    if (e == 8) {
        window.location.href = '/product/earlybird';
        return false;
    }

    var win_w = $(window).width();
    if (win_w <= 1023) { // Mobile
        var positionList = getGeoPosition();
        var udlat = '37.566623558063924';
        var udlng = '126.97840605405327';

        if (positionList.length > 0) {
            udlat = positionList[positionList.length - 1].lat;
            udlng = positionList[positionList.length - 1].lon;
        }

        if (e == 4 || e == 5 || e == 7)
            $('.area_pop .area_wrap').addClass('area_etc');
        else
            $('.area_pop .area_wrap').removeClass('area_etc');

        $.xResponse('/product/get_location_non', {
            udlat: udlat,
            udlng: udlng,
            adcno: e
        }).done(function (result) {
            if (result.msg != 'OK')
                alert_Msg("정상적인 접근이 아닙니다.");

            build_city_list(result.data, e);
        });

        $('.area_pop').fadeIn(150);

        $('.city_child').hide();
        $('.city_child').eq(0).show();

        $('.area_pop .city > li > a').each(function (i) { // PC 지역선택 마우스 오버
            var win_w = $(window).width();
            if (win_w < 1024) { // 모바일
                $(this).click(function (a) {
                    if (e != 4 && e != 5 && e != 7) {
                        a.preventDefault();
                    }
                    $('.area_pop .city > li > a').removeClass('on');
                    $(this).addClass('on');
                    $('.city_child').hide();
                    $('.city_child').eq(i).show();
                });
            }
        });

        iscroll_run_01(); // 지역 카테고리 1 iscroll
        iscroll_run_02(); // 지역 카테고리 2 iscroll

        return false;
    }

    return true;
}

function location_layer_close() {
    $('.area_pop').fadeOut(150);
}

function area_close() { // 닫기
    $('.area_pop').fadeOut(150);
}
/* //메인 링크 */

$(function () {
    $('.wrap').addClass('main_wrap'); // 메인페이지용 클래스 추가

    $('#app_down_load_send').submit(function (e) {
        e.preventDefault();

        var frm = e.target;

        var str = frm.receiver.value.replace(/[^0-9]/gi, '');

        var regExp1 = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?([0-9]{3,4})-?([0-9]{4})$/;

        if (str.length == 0) {
            alert_Msg("휴대폰 번호를 입력해주세요.");
            frm.receiver.value = '';
            return false;
        }

        if (regExp1.exec(str) == null) {
            alert_Msg("올바른 휴대폰 번호를 입력해주세요.");
            frm.receiver.value = '';
            return false;
        }

        frm.receiver.value = str;

        $.xResponse('/home/app_sms_non', $(this).serializeArray()).done(function (result) {
            //if (result.code != '200')
            alert_Msg(result.msg, 0, '', true);
        });
    });

    $('.event_link li a').on('click', function (e) {
        e.preventDefault();

        if ($(this).attr('href').length > 0)
            window.open($(this).attr('href'), $(this).data('title'), 'width=400, height=600, menubar=no, status=no, toolbar=no, scrollbars=yes');
        else
            alert_Msg('앱에서만 참여 가능합니다.');
    });

    /* 레이지 로드 실행 */
    lazyload();
    /* //레이지 로드 실행 */

    // 링크 제어 
    $('.main_link a').each(function () {
        $(this).click(function () {
            var link_num = $(this).attr('menu-link');
            if (link_num) {
                return location_layer_open('' + link_num + '');
            }
        });
    });
});