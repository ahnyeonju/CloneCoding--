/**
 * Created by helloworld on 2017-04-18.
 */
/* Iscroll */
var iscroll_01; // 지역카테고리
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

var iscroll_05; // 내위치 재설정 검색창
var iscroll_05_visible; // Iscroll 제어 변수

function iscroll_run_05() {
    iscroll_05 = new IScroll('.srp_recommend_srch .scroll_srch', {
        scrollbars: true,
        mouseWheel: true,
        interactiveScrollbars: true,
        shrinkScrollbars: 'scale',
        click: true
    });
    return iscroll_05;
}

function location_layer_open(e, m) {
    var win_w = $(window).width();
    if (win_w < 1024) {
        e.preventDefault();
        if (m == 'mo') {
            $('.city_child').eq($('.city li .fix').parent().index()).show(); // 첫 노출 지역 다시 보임
            $('.area_pop').fadeIn(150);
            iscroll_run_01(); // 지역 카테고리 1 iscroll
            iscroll_run_02(); // 지역 카테고리 2 iscroll
            $('.fix_title').bind('touchmove', function (i) { i.preventDefault() }); // 타이틀 터치 방지
        }
    } else {
        e.preventDefault();
        if (m == 'pc') {
            $('.city_child').eq($('.city li .fix').parent().index()).show(); // 첫 노출 지역 다시 보임
            $('.area_pop').fadeIn(150);
            iscroll_run_01(); // 지역 카테고리 1 iscroll
            iscroll_run_02(); // 지역 카테고리 2 iscroll
            $('.fix_title').bind('touchmove', function (i) { i.preventDefault() }); // 타이틀 터치 방지
        }
    }
}

// TODO: 기타 스크립트
/* 거리순/추천순 팝업 */
function sort_open() {
    prevent_scroll();
    $('.bg_dimm').fadeIn(150);
    $('.pop_sort').fadeIn(150);
    align_verticalAll('pop_sort');
}

function location_layer_close() {
    $('.bg_opacity_trans').hide();
    $('.sub_top .area .btn_area').removeClass('on');
    $('.area_pop').fadeOut(150);
    $('.city_child').eq($('.city li .fix').parent().index()).show(); // 첫 노출 지역 다시 보임
}

/* 지역 닫기 */
function area_close() {
    iscroll_01.destroy();
    iscroll_02.destroy();
    $('.area_pop').fadeOut(150);

}

// TODO: 카테고리별 명칭
var get_category_name = function (adcno) {
    var ad_category = {
        1: "모텔",
        2: "호텔",
        3: "펜션",
        4: "리조트",
        5: "캠핑",
        6: "게스트하우스",
        7: "한옥스테이",
        96: "여기추천",
        97: "페이백",
        98: "지역추천",
        99: "내주변",
        100: "검색",
    };

    return ad_category[adcno];
}

// 정렬 관련 스크립트 종료

function get_map_location(html) {
    var locations = [];
    var overlap = [];
    var win_w = $(window).width();

    if ($('#poduct_list_area li a[data-alat]').length > 0) {
        $('#poduct_list_area li a[data-alat]').each(function () {
            if (parseFloat($(this).data('alat')) > 0 && parseFloat($(this).data('alat')) > 0) {
                var item = [];
                var ano = $(this).data('ano');
                var src = $(this).find('img').data('original');
                var alt = $(this).find('img').attr('alt');
                var name = $(this).find('div.name strong').text();
                var price = $(this).find('div.price .map_html').html();
                var url = $(this).attr('href');

                if (overlap.indexOf(ano) == -1) {
                    overlap.push(ano);

                    var distance = $(this).data('distance').toString().split('.');
                    var f = 1;

                    if (distance.length > 1)
                        f = Math.pow(10, distance[1].length);

                    item[0] = html.clone();
                    item[0].find('a').attr('href', url);

                    if (win_w < 1024) { // Mobile - 정보 미노출
                        item[0].find('p.pic').css('backgroundImage', 'url(' + src + ')');
                        item[0].find('.cate').html(get_category_name($(this).data('adcno')));
                        item[0].find('strong.ellip').html(name);
                        item[0].find('div.price').html(price);
                    } else { // PC - 정보 노출
                        item[0].find('.map_pic').css('backgroundImage', 'url(' + src + ')');
                        item[0].find('div.name p').html(get_category_name($(this).data('adcno')));
                        item[0].find('div.name strong').html(name);
                        item[0].find('div.price').html(price);
                        item[0] = item[0].prop('outerHTML');
                    }

                    item[1] = $(this).data('alat');
                    item[2] = $(this).data('alng');
                    item[3] = $(this).data('affiliate');
                    item[4] = $(this).data('distance');
                    item[5] = Math.ceil(parseFloat($(this).data('distance')) * f);

                    locations.push(item);
                }
            }
        });

        locations.sort(function (a, b) {
            return a[5] < b[5] ? -1 : a[5] > b[5] ? 1 : 0;
        });
    } else {
        alert_Msg('현재 조건에 맞는 숙소가 없습니다.');
        close_layer();
    }

    return locations;
}

function get_maker(type) {
    switch (type) {
        case 'grey':
            return new daum.maps.MarkerImage(	// 마커 회색
                '//image.goodchoice.kr/images/web_v3/ico_map_1.png',
                new daum.maps.Size(30, 32),
                {}
            );
            break;
        case 'green':
            return new daum.maps.MarkerImage(	// 마커 녹색
                '//image.goodchoice.kr/images/web_v3/ico_map_2.png',
                new daum.maps.Size(30, 32),
                {}
            );
            break;
        case 'red':
            return new daum.maps.MarkerImage(	// 마커 빨강
                '//image.goodchoice.kr/images/web_v3/ico_map_3.png',
                new daum.maps.Size(38, 47),
                {}
            );
            break;
    }
}

// TODO: 지도 관련 스크립트 시작
/* 지도 Mobile */
function pop_map_m() {
    $('.srp_recommend_srch').hide();
    $('.pop_relocation').fadeOut(150);
    $('.bg_dimm').addClass('bg_dimm_map').fadeIn(150);
    $('.pop_map').fadeIn(150);
    $('.pop_map .title span').html('지도보기');
    $('.pop_m_room').empty();
    $('.pop_m_room').append('<ul class="owl-carousel"></ul>');
    $('.pop_map .btn_set').hide();

    var html = $('<li><a href="#"><p class="pic">&nbsp;</p><span class="cate"></span>' +
        '<strong class="ellip"></strong><div class="price"></div></a></li>');

    var locations = get_map_location(html);
    var positionList = getGeoPosition();
    var udlat = '37.566623558063924';
    var udlng = '126.97846305099483';

    if (positionList.length > 0) {
        udlat = positionList[positionList.length - 1].lat;
        udlng = positionList[positionList.length - 1].lon;
    }

    var map = new daum.maps.Map($('.inner_map')[0], {
        level: 9,
        center: new daum.maps.LatLng(udlat, udlng),
        mapTypeId: daum.maps.MapTypeId.ROADMAP,
        draggable: true,
        scrollwheel: true,
        tileAnimation: false
    });

    var marker, i, on_maker;
    var markers = [];
    var bounds = new daum.maps.LatLngBounds();

    var win_w = $(window).width();

    for (i = 0; i < locations.length; i++) {
        marker = new daum.maps.Marker({
            position: new daum.maps.LatLng(locations[i][1], locations[i][2]),
            clickable: true,
            zIndex: 5,
            image: locations[i][3] == 1 ? get_maker('green') : get_maker('grey') // 마커 커스텀 삽입
        });

        markers.push(marker);
        bounds.extend(marker.getPosition());
        marker.setMap(map);

        locations[i][0].find('a').attr('data-idx', i);

        $('.pop_m_room .owl-carousel').append(locations[i][0]);

        daum.maps.event.addListener(marker, 'click', (function (marker, i) {
            return function () {
                if (win_w < 1024) { // Mobile - 정보 미노출
                    if ($('.pop_m_room').css('display') == 'none')
                        $('.pop_m_room').fadeIn(250);

                    if (on_maker !== undefined) {
                        on_maker.setImage(locations[i][3] == 1 ? get_maker('green') : get_maker('grey'));
                        on_maker.setZIndex(5);
                    }

                    on_maker = marker;
                    marker.setImage(get_maker('red'));
                    marker.setZIndex(101);

                    map.setCenter(marker.getPosition());
                    displayAddress(map.getCenter());

                    $('.pop_m_room .owl-carousel').trigger('to.owl.carousel', i)
                }
            }

        })(marker, i));
    }

    displayAddress(map.getCenter());
    map.relayout();

    function displayAddress(_latlng) {
        var position = _latlng.getLat() + ',' + _latlng.getLng();

        $.xResponse('/product/srp_search', { action: 'location', location: position, page: 1, size: 1, distance: 1 }).done(function (_result) {
            if (_result.code != 200) {
                console.log("search error :: " + _result.code);
                return;
            }

            if (_result.data == null || _result.data.total_count == 0 || _result.data.list.length == 0) {
                $('.pop_map .address').html('주소 정보가 없습니다.');
                return;
            }

            $('.pop_map .address').html(_result.data.list[0].jibunFullAddr);
        });
    };

    var hTimer = null;

    daum.maps.event.addListener(map, 'dragstart', function () {
        if (hTimer !== null) {
            clearTimeout(hTimer);
            hTimer = null;
        }
    });

    daum.maps.event.addListener(map, 'dragend', function () {
        hTimer = setTimeout(function () {
            displayAddress(map.getCenter());
        }, 2000);
    });

    daum.maps.event.addListener(map, 'bounds_changed', function (event) {
        if (locations.length < 2)
            this.setLevel(4);
    });

    $('.pop_m_room .owl-carousel').owlCarousel({ // Swipe
        stagePadding: 16,
        nav: false,
        center: true,
        items: 2,
        loop: locations.length > 1,
        margin: 15,
        responsive: {
            0: {
                items: 1.1
            },
            480: {
                items: 1.5
            },
            580: {
                items: 1.8
            },
            680: {
                items: 2
            }
        },
        onDragged: function (property) {
            var current = $(property.target)
                .find(".owl-item")
                .eq(property.item.index)
                .find('a').data('idx');

            if (on_maker !== undefined) {
                on_maker.setImage(locations[current][3] == 1 ? get_maker('green') : get_maker('grey'));
                on_maker.setZIndex(5);
            }

            on_maker = markers[current];
            markers[current].setImage(get_maker('red'));
            markers[current].setZIndex(101);

            map.setCenter(markers[current].getPosition());
            displayAddress(map.getCenter());
        }
    });

}

/* 지도 PC */
function pop_map_pc() {
    $('.srp_recommend_srch').hide();
    $('.pop_relocation').fadeOut(150);
    $('.bg_dimm').addClass('bg_dimm_map').fadeIn(150);
    $('.pop_map').fadeIn(150);
    $('.pop_map .title span').html('지도보기');
    $('.pop_map .btn_set').hide();

    var bg_src = '//image.goodchoice.kr/images/web_v3/re_1.png'; // 이미지 링크

    var html = $('<div class="map_info"><a href="#"><div class="map_pic" style="background-image:url(' + bg_src + ')">&nbsp;</div>' +
        '<div class="map_stage"><div class="name"><p></p><strong></strong></div>' +
        '<div class="price"></div></div>' +
        '</a></div>');

    var locations = get_map_location(html);
    var positionList = getGeoPosition();
    var udlat = '37.566623558063924';
    var udlng = '126.97840605405327';

    if (positionList.length > 0) {
        udlat = positionList[positionList.length - 1].lat;
        udlng = positionList[positionList.length - 1].lon;
    }

    var map = new daum.maps.Map($('.inner_map')[0], {
        level: 9,
        center: new daum.maps.LatLng(udlat, udlng),
        mapTypeId: daum.maps.MapTypeId.ROADMAP,
        draggable: true,
        scrollwheel: true,
        tileAnimation: false
    });

    var marker, i, on_maker;
    var bounds = new daum.maps.LatLngBounds();
    var infowindow = new daum.maps.InfoWindow();

    for (i = 0; i < locations.length; i++) {
        marker = new daum.maps.Marker({
            position: new daum.maps.LatLng(locations[i][1], locations[i][2]),
            clickable: true,
            image: locations[i][3] == 1 ? get_maker('green') : get_maker('grey') // 마커 커스텀 삽입
        });

        bounds.extend(marker.getPosition());
        marker.setMap(map);

        daum.maps.event.addListener(marker, 'click', (function (marker, i) {
            return function () {
                if (on_maker !== undefined) {
                    on_maker.setImage(locations[i][3] == 1 ? get_maker('green') : get_maker('grey'));
                    on_maker.setZIndex(5);
                }

                on_maker = marker;
                marker.setImage(get_maker('red'));
                marker.setZIndex(9999);

                infowindow.setContent(locations[i][0]);
                infowindow.open(map, marker);

                var parent = $('.gm-style-iw').parent();
                parent.addClass('custom_info');
                var div_cnt = $('.custom_info div').length;

                for (var a = 0; a < div_cnt; a++) {
                    $('.custom_info div').eq(a).addClass('custom_' + a);
                }

                map.setCenter(marker.getPosition());
                displayAddress(map.getCenter());
            }
        })(marker, i));
    }

    displayAddress(map.getCenter());
    map.relayout();

    function displayAddress(_latlng) {
        var position = _latlng.getLat() + ',' + _latlng.getLng();

        $.xResponse('/product/srp_search', { action: 'location', location: position, page: 1, size: 1, distance: 1 }).done(function (_result) {
            if (_result.code != 200) {
                console.log("search error :: " + _result.code);
                return;
            }

            if (_result.data == null || _result.data.total_count == 0 || _result.data.list.length == 0) {
                $('.pop_map .address').html('주소 정보가 없습니다.');
                return;
            }

            $('.pop_map .address').html(_result.data.list[0].jibunFullAddr);
        });
    };

    var hTimer = null;

    daum.maps.event.addListener(map, 'dragstart', function () {
        if (hTimer !== null) {
            clearTimeout(hTimer);
            hTimer = null;
        }
    });

    daum.maps.event.addListener(map, 'dragend', function () {
        hTimer = setTimeout(function () {
            displayAddress(map.getCenter());
        }, 2000);
    });

    daum.maps.event.addListener(map, 'bounds_changed', function (event) {
        if (locations.length < 2)
            this.setLevel(4);
    });
}

/* 지도로 위치 설정 */
function select_map() {

    $('#srp_keyword').val('');
    $('.srp_recommend_srch').hide();
    $('.srp_default').show();
    $('.pop_map').addClass('location_reset');
    $('.pop_relocation').fadeOut(150);
    $('.bg_dimm').fadeIn(150);
    $('.pop_map').fadeIn(150);
    $('.pop_map .title span').html('위치설정');

    var positionList = getGeoPosition();
    var udlat = '37.566623558063924';
    var udlng = '126.97840605405327';

    if (positionList.length > 0) {
        udlat = positionList[positionList.length - 1].lat;
        udlng = positionList[positionList.length - 1].lon;
    }

    var map = new daum.maps.Map($('.inner_map')[0], {
        level: 4,
        center: new daum.maps.LatLng(udlat, udlng),
        mapTypeId: daum.maps.MapTypeId.ROADMAP,
        draggable: true,
        scrollwheel: true,
        tileAnimation: false
    });

    $('<div class="marker_fix"></div>').appendTo('.pop_map'); // 고정 마커

    displayAddress(map.getCenter());

    function displayAddress(_latlng) {
        var position = _latlng.getLat() + ',' + _latlng.getLng();

        $.xResponse('/product/srp_search', { action: 'location', location: position, page: 1, size: 1, distance: 1 }).done(function (_result) {
            if (_result.code != 200) {
                console.log("search error :: " + _result.code);
                return;
            }

            if (_result.data == null || _result.data.total_count == 0 || _result.data.list.length == 0) {
                $('.pop_map .address').html('주소 정보가 없습니다.');
                // $('.pop_map .btn_set').hide();
                return;
            }

            $('.pop_map .address').html(_result.data.list[0].jibunFullAddr);
            $('.pop_map .btn_set').show();
        });
    };

    //지도정보 얻어오기
    $('.pop_map .btn_set').click(function () {
        var position = map.getCenter();
        setGeoPosition(position.getLat(), position.getLng());
        //location.reload(true);
        location.replace(window.location.origin + window.location.pathname);
    });

    var hTimer = null;

    daum.maps.event.addListener(map, 'dragstart', function () {
        if (hTimer !== null) {
            clearTimeout(hTimer);
            hTimer = null;
        }
    });

    daum.maps.event.addListener(map, 'dragend', function () {
        hTimer = setTimeout(function () {
            displayAddress(map.getCenter());
        }, 2000);
    });

    // 주소검색 취소 클릭시
    $('.pop_map .srp_srch_bar .btn_cancel').click(function () { // 취소버튼 클릭시
        $('#srp_keyword').val('').blur();
        $('.reset_val').removeClass('show');
        $('.srp_srch_bar').removeClass('focused');
        $('.srp_recommend_srch').hide();
        srpRecommentRefresh();
    });

    // 주소검색 엔터
    $("#srp_keyword").on('keydown', function (e) {
        if (e.which == 13) {
            e.preventDefault();
            var $thisValue = $('#srp_keyword').val();

            // 빈값일때
            if ($thisValue == "") {
                srpInputClear();
            }

            if (iscroll_05_visible === true && iscroll_05 !== undefined) {
                iscroll_05.destroy();
            }

            if (iscroll_05_visible === undefined) {
                iscroll_05_visible = true;
                $('.srp_recommend_srch .srp_chain').show();
            }


            var keyword = XSSfilter(this.value);

            if (keyword.length <= 0) return;

            select_map_search(keyword);

            $('.srp_recommend_srch .srp_chain ul li').off('click');
            $('.srp_recommend_srch .srp_chain ul li').on('click', function (e) {
                var target = e.currentTarget,
                    position = new daum.maps.LatLng(
                        parseFloat(target.firstChild.getAttribute('data-lat')),
                        parseFloat(target.firstChild.getAttribute('data-lng'))
                    );

                $(this).addClass('selected');
                $('#srp_keyword').val(target.textContent);

                map.setCenter(position);
                displayAddress(map.getCenter());

                $('#srp_keyword').val('').blur();
                $('.reset_val').removeClass('show');
                $('.srp_srch_bar').removeClass('focused');
                $('.srp_recommend_srch').hide();
                srpRecommentRefresh();

            });
        }
    });

    // 주소검색 포커스
    var $srpKeyword = document.getElementById('srp_keyword');

    $srpKeyword.onfocus = srpKeywordEvent;

    function srpKeywordEvent() {

        var $thisParent = document.querySelector('.srp_srch_bar');
        $thisParent.classList.add('focused');
        $('.location_reset .srp_recommend_srch').show();

        if ($(this).val() == '') {
            select_map_reset();
        }
    }
}

// 지도검색 클리어 시
function srpInputClear() {
    $('.srp_recommend_srch .srp_chain').hide();
    $('.srp_recommend_srch .srp_default').show();
}
// 지도 검색 갱신
function srpRecommentRefresh() {

    if (iscroll_05_visible == true) {
        iscroll_05_visible = undefined;
        iscroll_05.destroy();
    }
}

//주소검색 요청
function select_map_search(_keyword) {

    $.xResponse('/product/srp_search', { action: 'search', q: _keyword, district: true }).done(function (_result) {
        if (_result.code != 200) {
            console.log("search error :: " + _result.code);
            return;
        }

        if (_result.data.total_count == 0) return;

        var data = _result.data.list;
        var items = [];

        for (var i = 0; i < data.length; i++) {
            var item = data[i],
                addr = (item.jibunFullAddr.length == 0) ? item.roadFullAddr : item.jibunFullAddr;

            if (item.location == undefined) continue;
            if (addr.length == 0) continue;

            items.push(
                '<li>' +
                '<a href="#" data-lat="' + item.location.lat + '" data-lng="' + item.location.lon + '">' +
                addr.replace(new RegExp(_keyword, 'ig'), '<b>' + _keyword + '</b>') +
                '</a>' +
                '</li>'
            );
        }

        $('.srp_recommend_srch .srp_default').hide();
        $('.srp_recommend_srch .srp_chain ul li').remove();
        $('.srp_recommend_srch .srp_chain ul').append(items);
        $('.srp_recommend_srch .srp_chain').show();
        iscroll_run_05();
    });
};

//주소검색 디폴트로 리셋
function select_map_reset() {
    $('.srp_chain').hide();
    $('.srp_default').show();

    if (iscroll_05_visible === true) {
        iscroll_05.destroy();
    }
}

/* Pop - 내 위치 재설정 */
function pop_relocation() {
    prevent_scroll();
    $('.bg_dimm').fadeIn(150);
    $('.pop_relocation').fadeIn(150);
}

$(function () {
    /* 필터 혜택 */
    $('.badge_benefit').each(function () {
        $(this).click(function () {
            if ($(this).hasClass('on')) {
                $(this).removeClass('on');
            } else {
                $(this).addClass('on');
            }

        });
    });

    /* Srp 달력 위치 수정 */
    setTimeout(function () {
        if ($('.swipe_menu').is(':visible')) {
            $('body').addClass('srp_fix');
        }
    }, 200);

    $(window).resize(function () {
        area_align();

        if ($('.mobile .filter_wrap').css('display') === 'block') { // 상세조건 팝업 자동닫기
            filter_close();
        }
    });

});

/* 모바일 상단 지역명 하나일때 세로정렬 */
function area_align() {
    setTimeout(function () {
        if ($('.btn_area span').css('display') !== 'block') {
            $('.btn_area').addClass('align_vertical');
        }
        else {
            $('.btn_area').removeClass('align_vertical');
        }
    }, 200);
}
area_align();

/* 뱃지 공란 숨기기(ancommon.js) */
badgeHide();
