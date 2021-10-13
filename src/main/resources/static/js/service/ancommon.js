var commonJs = {
    koreanRegex : /[^A-Za-z0-9_ㄱ-ㅎ|ㅏ-ㅣ|가-힣\s]/ig //특수문자 삭제용으로 사용
}

function get_version_of_IE() {
    var word;
    var version = 'N/A';

    var agent = navigator.userAgent.toLowerCase();
    var name = navigator.appName;

    // IE old version ( IE 10 or Lower )
    if (name == 'Microsoft Internet Explorer') word = 'msie ';
    else {
        // IE 11
        if (agent.search('trident') > -1) word = 'trident/.*rv:';
        // IE 12  ( Microsoft Edge )
        else if (agent.search('edge/') > -1) word = 'edge/';
    }

    var reg = new RegExp(word + '([0-9]{1,})(\\.{0,}[0-9]{0,1})');

    if (reg.exec(agent) != null) version = RegExp.$1 + RegExp.$2;

    return version;
}

if (Number(get_version_of_IE()) < 9) {
    if (
        confirm(
            "'여기어때'에서 지원하지 않는 브라우저로 접속하셨습니다.\n\n안전한 접속을 위해서 최신 브라우저로 접속해주세요.\n\n※ '확인'을 누르시면 최신 브라우저 다운로드 페이지로 이동합니다.\n※ '취소'를 누르시면 현재 페이지를 종료합니다."
        )
    ) {
        location.replace('http://browsehappy.com/?locale=ko_KR');
    } else {
        window.open('about:blank', '_self').close();
    }
}

Date.prototype.format = function (f) {
    if (!this.valueOf()) return ' ';

    var weekName = [
        '일요일',
        '월요일',
        '화요일',
        '수요일',
        '목요일',
        '금요일',
        '토요일'
    ];
    var d = this;

    return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function ($1) {
        switch ($1) {
            case 'yyyy':
                return d.getFullYear();
            case 'yy':
                return (d.getFullYear() % 1000).zf(2);
            case 'MM':
                return (d.getMonth() + 1).zf(2);
            case 'dd':
                return d.getDate().zf(2);
            case 'E':
                return weekName[d.getDay()];
            case 'HH':
                return d.getHours().zf(2);
            case 'hh':
                return ((h = d.getHours() % 12) ? h : 12).zf(2);
            case 'mm':
                return d.getMinutes().zf(2);
            case 'ss':
                return d.getSeconds().zf(2);
            case 'a/p':
                return d.getHours() < 12 ? '오전' : '오후';
            default:
                return $1;
        }
    });
};

String.prototype.string = function (len) {
    var s = '',
        i = 0;
    while (i++ < len) {
        s += this;
    }
    return s;
};
String.prototype.zf = function (len) {
    return '0'.string(len - this.length) + this;
};
Number.prototype.zf = function (len) {
    return this.toString().zf(len);
};

var XSSfilter = function (content) {
    return content
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;')
        .replace(/\\/g, '\\\\');
};

$.extend({
    xResponse: function (url, data, options) {
        data = data === undefined ? '' : data;

        var defaults = {
            type: 'get',
            dataType: 'json',
            loading: false,
            async: true,
            message: '정상적인 접근이 아닙니다.'
        };

        options = $.extend({}, defaults, options);

        var ajax = $.ajax({
            url: url,
            type: options.type,
            data: data,
            dataType: options.dataType,
            async: options.async,
            cache: false,
            error: function (x, e) {
                // TODO: 삼성폰에서만 발생하는 에러팝업
                if (navigator.userAgent.match('SAMSUNG') == null)
                    alert_Msg(options.message);
                console.log(options.message);
            }
        });

        return ajax;
    }
});

/* 인풋 리셋 버튼 */
function btn_reset() {
    $(
        '.inp_type_1 input, .inp_type_2 input, .inp_wrap input, .mobile .wrap_inp input'
    ).each(function () {
        var html = '<button type="button" class="reset_val">초기화</button>';

        if ($(this).parent().hasClass('remove')) {
            null;
        } else {
            $(this).parent().append(html);

            var wrap = $(this).parent();

            $('.reset_val').each(function () {
                $(this).click(function () {
                    var wrap = $(this).parent();
                    $('input', wrap).val('');
                    $(this).removeClass('show');
                    $('input', wrap).focus();
                });
            });

            $(this).on('input', function () {
                $('button', wrap).addClass('show');
            });

            $(this).focus(function () {
                $(this).parent().addClass('inp_ok');

                var this_val = $(this).val();
                if (this_val == '') {
                    null;
                } else {
                    $('button', wrap).addClass('show');
                }
            });
            $(this).blur(function () {
                $(this).parent().removeClass('inp_ok');
            });
        }
    });
}

/* 상단으로 버튼 */
function moveTop() {
    $('html, body').animate({scrollTop: 0}, 600);
}

/* Spinner */
function spinner_show() {
    // Show
    var target_parent = $('.add_spin');
    if ($('.spinner').length == 0) {
        target_parent.append('<div class="spinner"><span></span></div>');
    }
    $('.spinner').fadeIn(250);
}
function spinner_hide() {
    // Hide
    $('.spinner').fadeOut(250);
}

/* 시스템 메세지 팝업 */
function align_vertical() {
    // 시스템 팝업 세로 정렬
    var target = $('.popup_cont');
    var pop_h = target.height();
    var val = pop_h / 2;
    target.css('margin-top', -val);
}

function align_verticalAll(target) {
    // 공통 세로 정렬
    var target = $('.' + target);
    var pop_h = target.height();
    var val = pop_h / 2;
    target.css('margin-top', -val);
}

function pop_ok(reload) {
    // 시스템 팝업 확인버튼
    $('.alert_msg').fadeOut(200);
    $('.alert_msg').remove();
    if (reload) location.reload(true);
}

function alert_Msg(msg, link, url, reload) {
    // 시스템 팝업
    var msgStr = msg.toString();
    if (link == 1) {
        // 링크용
        var content =
            '<div class="alert_msg box_shadow"><div class="msg popup_cont"><div class="text">' +
            msgStr +
            '</div><div class="btn_center"><a href="' +
            url +
            '">확인</a></div></div></div>';
    } else {
        // 기본
        var content =
            '<div class="alert_msg box_shadow"><div class="msg popup_cont"><div class="text">' +
            msgStr +
            '</div><div class="btn_center"><button onclick="pop_ok(' +
            reload +
            ');">확인</button></div></div></div>';
    }
    $('body').append(content);
    $('.alert_msg').fadeIn(200);
    align_vertical();
}

function pop_twobtn(el, msg, name1, name2, function_1, function_2) {
    // 2버튼 팝업 - 엘리먼트 네임 /메세지 / 버튼1 이름 / 버튼2 이름 / 버튼1 펑션 / 버튼2 펑션
    var msgStr = msg.toString();
    $('.pop_twobtn').remove();
    var content =
        '<div class="layer popup_cont pop_twobtn ' +
        el +
        '"><div class="text">' +
        msgStr +
        '</div><div class="btn_wrap"><button onclick="' +
        function_1 +
        '">' +
        name1 +
        '</button><button onclick="' +
        function_2 +
        '" class="col_mint">' +
        name2 +
        '</button></div></div>';
    $('body').append(content);
    $('.' + el).fadeIn(200);
    $('.bg_dimm').fadeIn(150);
    align_vertical();
}

function eventPopup(message, buttonName, url) {
    // 이벤트 팝업

    var content =
        '<div class="alert_msg box_shadow"><div class="msg popup_cont"><div class="text">' +
        message +
        '</div><div class="btn_center"><a href="' +
        url +
        '" target="_blank">' +
        buttonName +
        '</a><a href="#none" class="button-close">닫기</a></div></div></div>';

    $('body').append(content);
    $('.alert_msg').fadeIn(200);
    align_vertical();
}

/* 모바일 메뉴 오픈 */
var iscroll_03;
function iscroll_run_03() {
    iscroll_03 = new IScroll('.scroll_nav', {
        interactiveScrollbars: true,
        shrinkScrollbars: 'scale',
        fadeScrollbars: true,
        click: true,
        mouseWheel: true
    });
}
function nav_open() {
    // 열기
    $('.menu_wrap').show();
    $('.gnb_opacity').fadeIn(250);
    $('.menu_wrap .menu').stop().animate({left: 0, right: 56}, '100');
    iscroll_run_03();
    iscroll_03.refresh();
    $('.menu_wrap').bind('touchmove', function (i) {
        i.preventDefault();
    });
    $('.gnb_opacity').bind('touchmove', function (i) {
        i.preventDefault();
    });
}

/* HTML,BODY Prevent */
function prevent_on() {
    $('body').addClass('lock_on');
    $('html').addClass('lock_on');
}
function prevent_off() {
    $('body').removeClass('lock_on');
    $('html').removeClass('lock_on');
}

/* TODO: //검색 오픈 */
var iscroll_04;
function iscroll_run_04() {
    // iscroll 검색창
    iscroll_04 = new IScroll('.scroll_srch', {
        scrollbars: true,
        mouseWheel: true,
        interactiveScrollbars: true,
        shrinkScrollbars: 'scale',
        click: true
    });
}

// 문자열 숫자 반환
function xReturnNumber(str) {
    var num_check = /^[0-9]*$/;

    if (num_check.test(str)) {
        if (str.length == 0) return 0;
        return parseInt(str);
    } else {
        return 0;
    }
}

function srch_open() {
    var timerId = 0;
    var win_w = $(window).width();
    var mask_element =
        '<div class="srch_mask" onclick="srch_close();">&nbsp;</div>';

    $('.pc .recommend_srch').append(mask_element);
    $('.pc .srch_mask').addClass('on');

    if (win_w > 1023) {
        // PC
        if ($('.pc .srch_bar').css('display') == 'block') {
            if ($('#keyword').val().length > 0)
                window.location.href =
                    window.yeogiDomain +
                    '/product/result?keyword=' +
                    encodeURI($('#keyword').val());
            else alert_Msg('검색어가 없습니다. <br>검색어를 입력하세요.');

            return false;
        } else {
            $('.pc .btn_srch')
                .stop()
                .animate({right: 797}, '150', function () {
                    $('.pc .srch_bar').fadeIn(150);
                    $('.srch_bar .wrap_inp input').focus();
                });
            $('.recommend_srch').fadeIn(150);
            $('.gnb_pc').fadeOut(150);
        }
    } else {
        // Mobile
        $('.mobile .srch_bar').fadeIn(150);
        $('.mobile .recommend_srch').fadeIn(150);

        $('.srch_bar .wrap_inp .btn_srch').on('click', function () {
            if ($('#keyword').val().length > 0)
                window.location.href =
                    window.yeogiDomain +
                    '/product/result?keyword=' +
                    $('#keyword').val();
            else alert_Msg('검색어가 없습니다. <br>검색어를 입력하세요.');
        });
    }

    $('.recommend_srch .default').hide();
    // FIXME: 수정필요
    if (!window.isFechingRecommend) {
        spinner_show();
        console.log('isFechingRecommend:', window.isFechingRecommend);
        window.isFechingRecommend = true;
        $.xResponse(window.baseUrl + '/v1/search/recommend', null, {
            type: 'GET'
        })
            .done(function (result) {
                if (result.count > 0) {
                    var items = [];
                    $.each(result.data, function (k, recommend) {
                        items.push(
                            '<li><a href="' +
                                window.yeogiDomain +
                                '/product/result?keyword=' +
                                recommend +
                                '">' +
                                recommend +
                                '</a></li>'
                        );
                    });

                    $('.recommend_srch .default ul').html(items.join(''));
                    $('.recommend_srch .default').show();
                }
            })
            .always(function () {
                console.log('always:', window.isFechingRecommend);
                window.isFechingRecommend = false;
                spinner_hide();
            });
    }

    $('#keyword').off('keyup');
    $('#keyword').on('keyup', function () {
        var keyword = XSSfilter($(this).val());

        $('.recommend_srch .default').hide();
        $('.recommend_srch .chain').show();

        if (xReturnNumber(timerId) > 0) window.clearTimeout(timerId);

        timerId = window.setTimeout(function () {
            if (keyword.length > 0) {
                $.xResponse(
                    window.baseUrl + '/v3/search/autocomplete',
                    {keyword: keyword},
                    {async: true}
                ).done(function (result) {
                    if (result.data.yeogi.length > 0) {
                        if (win_w > 1023) {
                            // PC
                            $('.recommend_srch .scroll_srch').show();
                        } else {
                            $('.mobile .recommend_srch').show();
                        }

                        var items = [];
                        $.each(result.data.yeogi, function (k, autocomplete) {
                            var href = '';
                            if (autocomplete.type == 'AD') {
                                href =
                                    window.yeogiDomain +
                                    '/product/detail?ano=' +
                                    autocomplete.id;
                            } else if (autocomplete.atcType == 'product') {
                                href =
                                    window.yeogiDomain +
                                    '/product/detail?ano=' +
                                    autocomplete.id;
                            } else {
                                var query_string =
                                    '?keyword=' + autocomplete.displayText;

                                if (
                                    autocomplete.type == 'CATEGORY' ||
                                    autocomplete.type == 'AREA'
                                )
                                    query_string +=
                                        '&type=' + autocomplete.type;

                                href =
                                    window.yeogiDomain +
                                    '/product/result' +
                                    query_string;
                            }
                            
                            var tranlatedText = keyword.replace(commonJs.koreanRegex,'');
                            items.push(
                                '<li><a href="' +
                                    href +
                                    '" >' +
                                    autocomplete.displayText.replace(
                                        new RegExp(tranlatedText, 'ig'),
                                        '<b>' + tranlatedText + '</b>'
                                    ) +
                                    '</a></li>'
                            );
                        });

                        $('.recommend_srch .chain ul').html(items.join(''));

                        iscroll_04.refresh(); // iscroll refresh
                    } else {
                        if (win_w > 1023) {
                            // PC
                            $('.recommend_srch .scroll_srch').hide();
                        } else {
                            $('.mobile .recommend_srch').hide();
                        }

                        $('.recommend_srch .chain').hide();
                    }
                });
            } else {
                if (win_w > 1023) {
                    // PC
                    $('.recommend_srch .scroll_srch').show();
                } else {
                    $('.mobile .recommend_srch').show();
                }

                $('.recommend_srch .default').show();
                $('.recommend_srch .chain ul').html('');
            }

            timerId = 0;
        }, 200);
    });

    $('#keyword').off('keydown');
    $('#keyword').keydown(function (key) {
        if (key.keyCode == 13) {
            if ($(this).val().length > 0)
                window.location.href =
                    window.yeogiDomain +
                    '/product/result?keyword=' +
                    encodeURI($(this).val());
            else alert_Msg('검색어가 없습니다.  <br>검색어를 입력하세요.');
        }
    });

    iscroll_run_04(); // iscroll Run
}

function srch_result_open() {
    // 검색결과 진입시 노출바
    var timerId = 0;
    var win_w = $(window).width();
    if (win_w > 1023) {
        // PC
        null;
    } else {
        // Mobile
        $('.mobile .srch_bar').fadeIn(150);
        $('.mobile .srch_bar input').val($('#keyword_input').val());

        $('.srch_bar .wrap_inp button').on('click', function () {
            if ($('#keyword').val().length > 0)
                window.location.href =
                    window.yeogiDomain +
                    '/product/result?keyword=' +
                    encodeURI($('#keyword').val());
            else alert_Msg('검색어가 없습니다. <br>검색어를 입력하세요.');
        });

        $('#keyword').off('keyup');
        $('#keyword').on('keyup', function () {
            var keyword = XSSfilter($(this).val());

            $('.recommend_srch .default').hide();
            $('.recommend_srch .chain').hide();
            $('.mobile .recommend_srch').hide();

            if (xReturnNumber(timerId) > 0) window.clearTimeout(timerId);

            timerId = window.setTimeout(function () {
                if (keyword.length > 0) {
                    $.xResponse(
                        window.baseUrl + '/v3/search/autocomplete',
                        {keyword: keyword},
                        {async: true}
                    ).done(function (result) {
                        if (result.count > 0) {
                            $('.recommend_srch .chain').show();
                            $('.mobile .recommend_srch').show();

                            var items = [];
                            $.each(
                                result.data.yeogi,
                                function (k, autocomplete) {
                                    var query_string =
                                        '?keyword=' + autocomplete.keyword;

                                    if (
                                        autocomplete.type == 'CATEGORY' ||
                                        autocomplete.type == 'AREA'
                                    )
                                        query_string +=
                                            '&type=' + autocomplete.type;

                                    items.push(
                                        '<li><a href=' +
                                            window.yeogiDomain +
                                            '"/product/result' +
                                            query_string +
                                            '" >' +
                                            autocomplete.keyword.replace(
                                                new RegExp(keyword, 'ig'),
                                                '<b>' + keyword + '</b>'
                                            ) +
                                            '</a></li>'
                                    );
                                }
                            );

                            $('.recommend_srch .chain ul').html(items.join(''));
                        }
                    });
                }

                timerId = 0;
            }, 200);
        });

        $('#keyword').off('keydown');
        $('#keyword').keydown(function (key) {
            if (key.keyCode == 13) {
                if ($(this).val().length > 0)
                    window.location.href =
                        window.yeogiDomain +
                        '/product/result?keyword=' +
                        encodeURI($(this).val());
                else alert_Msg('검색어가 없습니다.  <br>검색어를 입력하세요.');
            }
        });

        $('#keyword').off('focus');
        $('#keyword').focus(function () {
            setTimeout(
                (function (el) {
                    var strLength = el.value.length;
                    if (strLength > 0) $('#keyword').trigger('keyup');

                    return function () {
                        if (el.setSelectionRange !== undefined) {
                            el.setSelectionRange(strLength, strLength);
                        } else {
                            $(el).val(el.value);
                        }
                    };
                })(this),
                0
            );
        });
    }
}

function srch_close() {
    // 닫기
    var win_w = $(window).width();

    $('#keyword').val(''); // 값 초기화
    $('.recommend_srch .chain').hide();
    $('.srch_mask').remove();
    if (win_w > 1023) {
        //PC
        $('.pc .srch_bar').fadeOut(150);
        $('.pc .btn_srch').stop().animate({right: 396}, '150');
        $('.pc .gnb_pc').fadeIn(150);
        $('.recommend_srch').fadeOut(150);
    } else {
        // Mobile
        $('.fix_srch').fadeOut(150); // 검색결과페이지 검색바 숨김
        $('.mobile .srch_bar').fadeOut(150);
        $('.mobile .recommend_srch').fadeOut(150);
        prevent_off();
    }
}

/* 스크롤 막기 */
function prevent_scroll() {
    // $(window).bind('touchmove',function(e){e.preventDefault()	});
    window.addEventListener('touchmove', function (e) {
        e.preventDefault();
    });
}
function prevent_scroll_off() {
    // 해제
    $(window).unbind('touchmove');
}

/* 팝업 > 노출 */
function pop_layer_w(el) {
    // layer_w 공통 노출
    var target = $('.' + el);
    $('body').addClass('ovy_hide');
    $('html').addClass('ovy_hide');
    target.fadeIn(150);

    if ($(this).attr('href') !== undefined && $(this).attr('href') != '') {
        target.find('input[name="return_url"]').val($(this).attr('href'));
    }

    if (el == 'pop_mem_reserve') {
        target
            .find('.fix_title strong')
            .html('예약 내역 조회')
            .removeClass('logo');
        target.find('.link_half').hide();
        target.find('.link').show();
        target.find('.link a').attr('href', $(this).attr('href'));
    }

    if (el == 'pop_login') {
        target.find('.fix_title strong').html('여기어때').addClass('logo');
        target.find('.link_half').show();
        target.find('.link').hide();
        target.find('.link_half a').attr('href', $(this).attr('href'));
    }

    var i = 0;
    var f_input;
    //	if (target.find('input').length > 0) {
    //        target.find('input').each(function () {
    //            if ($(this).attr('type') != 'hidden') {
    //                if(i == 0)
    //                    f_input = $(this);
    //                i++;
    //                $(this).val('');
    //                $(this).trigger('focus');
    //
    //				setTimeout(function(){
    //					$('.and .pop_login').addClass('focus');
    //				},300);
    //
    //            }
    //        });
    //
    //        if (i > 0)
    //            f_input.focus();
    //    }

    prevent_scroll();
}

function layer_w_close() {
    // layer_w 공통 닫기
    $('body').removeClass('ovy_hide');
    $('html').removeClass('ovy_hide');
    $('.layer_w').hide();
    prevent_scroll_off();
}

/* 팝업닫기 공통*/
function close_layer() {
    // close_layer 클래스 닫기
    //	prevent_off();
    prevent_scroll_off();
    $('.bg_dimm').fadeOut(150);
    $('.layer').fadeOut(150);
    $('.close_layer').fadeOut(150);
    $('.marker_fix').remove();
    $('.pop_map').removeClass('location_reset');
}

/* 스핀바 + 마스트 + 스크롤 방지 */
function spin_dimm() {
    spinner_show();
    $('.bg_dimm_prevent').fadeIn(150);
    prevent_scroll();
}
function spin_dimm_off() {
    spinner_hide();
    $('.bg_dimm_prevent').fadeOut(150);
    prevent_scroll_off();
}

/* 팝업 - 사업자 정보 확인 */
function pop_licence() {
    var num = '7428600224';
    var url =
        'http://www.ftc.go.kr/info/bizinfo/communicationViewPopup.jsp?wrkr_no=' +
        num;
    window.open(url, 'communicationViewPopup', 'width=750, height=700;');
}

/* GNB 배경 */
function chk_gnb() {
    var scroll_val = $(window).scrollTop();
    if (scroll_val == 0) {
        $('header').removeClass('scroll');
    } else if (scroll_val > 400) {
        $('header').addClass('scroll');
        $('.btn_go_top').fadeIn(200);
    } else {
        $('header').addClass('scroll');
        $('.btn_go_top').fadeOut(200);
    }
}
chk_gnb();

// 쿠키 생성
function setCookie(cName, cValue, cDay) {
    var expire = new Date();
    expire.setDate(expire.getDate() + cDay);
    cookies = cName + '=' + escape(cValue) + '; path=/ '; // 한글 깨짐을 막기위해 escape(cValue)를 합니다.
    if (typeof cDay != 'undefined')
        cookies += ';expires=' + expire.toGMTString() + ';';
    document.cookie = cookies;
}

// 쿠키 가져오기
function getCookie(cName) {
    cName = cName + '=';
    var cookieData = document.cookie;
    var start = cookieData.indexOf(cName);
    var cValue = '';
    if (start != -1) {
        start += cName.length;
        var end = cookieData.indexOf(';', start);
        if (end == -1) end = cookieData.length;
        cValue = cookieData.substring(start, end);
    }
    return unescape(cValue);
}

// TODO: 이동할 쿠키를 생성한다. 다이렉트이동용
$.setAdCookie = function (setConfig) {
    var key = {_search: randomString()};
    setCookie(key._search, JSON.stringify(setConfig));
    return key._search;
};

function randomString() {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
    var string_length = 10;
    var randomstring = '';

    for (var i = 0; i < string_length; i++) {
        var rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum, rnum + 1);
    }

    return randomstring;
}

function str_pad(input, pad_length, pad_string, pad_type) {
    // *     example 1: str_pad('', 30, '-=', 'STR_PAD_LEFT');
    // *     returns 1: '-=-=-=-=-=-foo bar milk'
    // *     example 2: str_pad('foo bar milk', 30, '-', 'STR_PAD_BOTH');
    // *     returns 2: '------foo bar milk-----'

    var half = '',
        pad_to_go;

    var str_pad_repeater = function (s, len) {
        var collect = '',
            i;

        while (collect.length < len) {
            collect += s;
        }
        collect = collect.substr(0, len);

        return collect;
    };

    input += '';
    pad_string = pad_string !== undefined ? pad_string : ' ';

    if (
        pad_type != 'STR_PAD_LEFT' &&
        pad_type != 'STR_PAD_RIGHT' &&
        pad_type != 'STR_PAD_BOTH'
    ) {
        pad_type = 'STR_PAD_RIGHT';
    }
    if ((pad_to_go = pad_length - input.length) > 0) {
        if (pad_type == 'STR_PAD_LEFT') {
            input = str_pad_repeater(pad_string, pad_to_go) + input;
        } else if (pad_type == 'STR_PAD_RIGHT') {
            input = input + str_pad_repeater(pad_string, pad_to_go);
        } else if (pad_type == 'STR_PAD_BOTH') {
            half = str_pad_repeater(pad_string, Math.ceil(pad_to_go / 2));
            input = half + input + half;
            input = input.substr(0, pad_length);
        }
    }

    return input;
}

function toastPop(msg) {
    var content = '<div class="toast_pop"><div></div></div>';

    if (!$('.toast_pop').is(':visible')) {
        $('body').append(content);
        $('.toast_pop div').html(msg).css('visibility', 'visible');
        $('.toast_pop').addClass('show');
        setTimeout(function () {
            $('.toast_pop').remove();
        }, 2000);
    }
}

//스토어 랜딩 분기
function goAppStore(dialogCheck) {
    const cookie_kcode = getCookie('k_code'); //2.0: mkt_code^msid^device_type , 1.0: mkt_code only
    const isBtmPop = !!dialogCheck;
    const DAUM_SHOP_TOP = 'du_dush_2', //(채널링)카카오쇼핑 - 상단
        NAVER_SHOP_TOP = 'nj_njma_1', //(채널링)네이버지식쇼핑 - 상단
        CHAN_ETC_TOP = 'CH_CHPU_1', //채널링 그외 - 상단
        DAUM_DA_TOP = 'mo_DAUM_1', //다음DA - 상단
        DAUM_DA_BTM = 'mo_DAUM_2', //다음DA - 하단
        ETC_ALL_TOP = 'na_bsrh_1', //그외 - 상단
        ETC_ALL_BTM = 'na_bsrh_3'; //그외 - 하단
    const sp = cookie_kcode.split('^');
    let mktcode = '';
    if (sp.length > 1) {
        //2.0의 광고로 판단
        const _mktcode = sp[0].trim();
        const _msid = Number(sp[1].trim());
        if (_msid === 3) {
            // 다음DA:상/하단 분기
            mktcode = isBtmPop ? DAUM_DA_BTM : DAUM_DA_TOP;
        } else if (_msid === 4 && _mktcode.startsWith('ns_ne_') && !isBtmPop) {
            //네이버지식쇼핑:상단
            mktcode = NAVER_SHOP_TOP;
        } else if (_msid === 4 && _mktcode.startsWith('ns_ke_') && !isBtmPop) {
            //카카오쇼핑:상단
            mktcode = DAUM_SHOP_TOP;
        } else if (_msid === 4 && !isBtmPop) {
            //그외채널링 하위 그룹:상단
            mktcode = CHAN_ETC_TOP;
        }
    }
    if (!mktcode) mktcode = isBtmPop ? ETC_ALL_BTM : ETC_ALL_TOP;
    let _domain = document.domain.includes('.goodchoice.kr')
        ? 'm.goodchoice.kr'
        : 'dev-landing-mktpm.goodchoice.kr';
    location.href =
        location.protocol +
        '//' +
        _domain +
        '/main/adKeywordLanding/' +
        encodeMkt(mktcode);
}

/**
 * 마케팅 랜딩 URL 구성시 필요한 코드해싱함수
 * @param mktcode : 원본 마케팅코드
 * @returns {string} 해싱 결과물
 */
function encodeMkt(mktcode) {
    //마케팅코드용 해시함수
    function hashMkt(orig, reverse) {
        if (typeof orig !== 'string') orig = String(orig);
        let orgKey =
                'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
            encKey =
                'sozmfnctkurqgviypexdawhjlbEBRALMUHTPCWVZXINFYQGJKODS8491357620';
        orig = reverse
            ? orig
                  .replace(/\*/gi, '+')
                  .replace(/\@/gi, '/')
                  .replace(/\-/gi, '=')
            : orig
                  .replace(/\+/gi, '*')
                  .replace(/\//gi, '@')
                  .replace(/\=/gi, '-');
        let source = reverse ? encKey : orgKey;
        let target = reverse ? orgKey : encKey;
        let result = '';
        for (let i = 0; i < orig.length; i++) {
            let c = orig.charAt(i);
            result += source.includes(c) ? target.charAt(source.indexOf(c)) : c;
        }
        return result;
    }
    return hashMkt(btoa(mktcode)); // mktcode -> base64 -> hash
}

/* 환경 체크 */
function chk_device() {
    var win_w = $(window).width();
    if (win_w > 1023) {
        // PC
        $('body').removeClass('mobile').addClass('pc');
    } else {
        // Mobile
        $('body').removeClass('pc').addClass('mobile');
    }
}
// app.html에서 최초 랜더링시 body에 태그추가
// chk_device();

// 링크 제어
function addEventHandlers() {
    $('header .nav_open').click(function () {
        // 메뉴 오픈
        nav_open();
    });
    $('header .srch_open').click(function () {
        // 검색 오픈
        srch_open();
    });

    $('.pop_login_open').click(function () {
        // 1:1문의, 모바일 포인트/쿠폰함 클릭시 로그인
        pop_layer_w.call(this, 'pop_login');
        return false;
    });

    $('.pop_mem_reserve_open2').click(function () {
        // 더보기 옆 아이콘 예약내역 조회
        pop_layer_w('pop_mem_reserve');
    });
    $('.pop_login_open').click(function () {
        pop_layer_w('pop_login');
        return false;
    });
    // Event snippet for WEB_다운로드_버튼 conversion page In your html page, add the snippet and call gtag_report_conversion when someone clicks on the chosen link or button.

    $('.appdown_link').on('click', function () {
        gtag('event', 'conversion', {
            send_to: 'AW-802163829/jxc6CN22x4MBEPWYwP4C'
        });
    });
}

function addGlobalErrorHandler() {
    if ($('script#errormsg').length > 0) {
        toastPop($('script#errormsg').text());
    }
}

//Jquery 쿠키 JSON list
function addCustomFunctionToJquery() {
    $.fn.extend({
        cookieList: function (cookieName, expires, key) {
            key = key === undefined ? 'adr' : key;
            expires = expires === undefined ? 360 : expires;

            return {
                add: function (val) {
                    var array = this.items();

                    if (!this.xIsNumber(this.hasitem(val))) {
                        array.push(val);

                        var inStr = JSON.stringify(array);
                        $.cookie(cookieName, inStr, {
                            expires: expires,
                            path: '/'
                        });
                    } else {
                        this.setFirst(this.hasitem(val));
                    }
                    if (this.length() > 5) this.remove(0);
                },
                setFirst: function (index) {
                    var items = this.items();
                    var new_item = items[index];

                    if (index != -1) {
                        items.splice(index, 1);
                        items.push(new_item);
                        $.cookie(cookieName, JSON.stringify(items), {
                            expires: expires,
                            path: '/'
                        });
                    }
                },
                remove: function (index) {
                    var items = this.items();

                    if (index != -1) {
                        items.splice(index, 1);
                        $.cookie(cookieName, JSON.stringify(items), {
                            expires: expires,
                            path: '/'
                        });
                    }
                },
                indexOf: function (val) {
                    return this.items().indexOf(val);
                },
                clear: function () {
                    $.cookie(cookieName, null, {expires: 0, path: '/'});
                },
                items: function () {
                    var cookie = $.cookie(cookieName);
                    return typeof cookie == 'string' ? JSON.parse(cookie) : [];
                },
                hasitem: function (val) {
                    for (var k in this.items()) {
                        var entry1 = JSON.stringify(this.items()[k][key]);
                        var val1 = JSON.stringify(val[key]);
                        if (val1 == entry1) {
                            //console.log("key:"+k);
                            return k;
                        }
                    }
                },
                length: function () {
                    return this.items().length;
                },
                xIsNumber: function (str) {
                    var num_check = /^[0-9]*$/;

                    if (num_check.test(str)) {
                        return true;
                    } else {
                        return false;
                    }
                }
            };
        }
    });
}

/* Jquery */
function executeSomethingAfterLoad() {
    /* Android 체크 */
    var ua = navigator.userAgent.toLowerCase(),
        isAndroid = ua.indexOf('android') > -1;
    iOS = ua.match(/(iphone|ipod|ipad)/);
    if (isAndroid) {
        $('body').addClass('and');
    }
    if (iOS) {
        $('body').addClass('ios');
    }

    $('.click_prevent').each(function () {
        // a 태그 이동 막기
        $(this).click(function (e) {
            e.preventDefault();
        });
    });

    /* Input Focus 효과 */
    $('.inp_type_1 input').each(function () {
        $(this).focusin(function () {
            // 포커스 인
            $(this).parent().addClass('inp_focus');
            $('.and .pop_login').addClass('focus');
        });

        $(this).focusout(function () {
            // 포커스 아웃
            $(this).parent().removeClass('inp_focus');
            $('.and .pop_login').removeClass('focus');
        });
    });

    // /* GNB 서브메뉴 노출 */
    $('.gnb_pc .over').each(function (e) {
        $(this).mouseenter(function () {
            $('ul', this).stop().fadeIn(150);
        });
        $(this).mouseleave(function () {
            $('ul', this).stop().fadeOut(150);
        });
    });

    /* 리사이즈 시 */
    $(window).resize(function () {
        console.log('resize');
        var win_w = $(window).width();
        chk_device(); // PC/MOBILE 체크
        // pic_resize();
        if (win_w > 1023) {
            // PC에서만
            srch_close(); // 검색바 초기화
            close_layer(); // 레이어 숨기기
            layer_w_close(); // 레이어 숨기기(_w)
        }
    });

    /* 모바일 메뉴 닫기 (배경 클릭) */
    $('.gnb_opacity').bind('touchstart click', function () {
        $('.menu_wrap').hide();
        $('.gnb_opacity').fadeOut(250);
        $('.menu_wrap .menu').stop().animate({left: -1000, right: 1000}, '100');
        $('.menu_wrap').unbind('touchmove');
        $('.gnb_opacity').unbind('touchmove');
        iscroll_03.destroy();
    });

    /* 모바일 메뉴 2depth */
    $('.has_ul').on('click', function (e) {
        e.preventDefault();
        if ($(this).hasClass('open')) {
            $(this).removeClass('open');
            $(this).next().hide();
            iscroll_03.refresh();
        } else {
            $(this).addClass('open');
            $(this).next().show();
            iscroll_03.refresh();
        }
    });

    /* 헤더 스크롤 효과 */
    $(window).scroll(function () {
        chk_gnb();
    });

    /* 필터 접기,모두 보기 버튼 효과 */
    $('.filter_wrap section strong button').each(function () {
        $(this).click(function () {
            if ($(this).hasClass('on')) {
                $(this).parent().next().removeClass('show');
                $(this).removeClass('on');
                $(this).text('모두 보기');
            } else {
                $(this).addClass('on');
                $(this).parent().next().addClass('show');
                $(this).text('접기');
            }
        });
    });

    /* 광고오버시 팝업 (차후 product.js 정리되면 이동) */
    $('.list_wrap .title span').each(function () {
        $(this).click(function () {
            var product_txt = $(this).prev().text();
            var content =
                '<p class="pop_add box_shadow">' +
                product_txt +
                ' 상품 광고입니다.</p>';
            $(this).append(content);
            $('.pop_add').stop().fadeIn(200);
            setTimeout(function () {
                $('.pop_add').fadeOut(200);
                setTimeout(function () {
                    $('.pop_add').remove();
                }, 200);
            }, 1000);
        });
    });

    /* 이미지 누락업체 썸네일 조정 (차후 product.js 정리되면 이동) */
    $(".pic img[data-original*='list_none']").each(function () {
        $(this).css('width', '100%');
        $(this).css('height', '100%');
        $(this).css('margin', '0');
    });
}
/* //Jquery */

(function () {
    function initPage() {
        $('.spinner').fadeOut(250);
        $('.wrap').addClass('show');
        btn_reset();
        addEventHandlers();
        addGlobalErrorHandler();
        addCustomFunctionToJquery();
        executeSomethingAfterLoad();
    }

    spinner_show();
    window.yeogiWeb = window.yeogiWeb || {};
    window.yeogiWeb.initFuncMap = window.yeogiWeb.initFuncMap || {};
    window.yeogiWeb.initFuncMap.common = initPage;
})();
