$(function () {

    // AND,IOS 체크
    var ua = navigator.userAgent.toLowerCase(),
        isAndroid = ua.indexOf("android") > -1;
    iOS = ua.match(/(iphone|ipod|ipad)/);
    if (isAndroid) {
        $('body').addClass('and');
    }
    if (iOS) {
        $('body').addClass('ios');
    }

    // GNB 그림자 추가
    var shadow_dom = '<span class="shadow_dom">&nbsp;</span>';

    $('.head_title').append(shadow_dom);

    $(window).scroll(function () {
        titleAddShadow();
    });

    function titleAddShadow() {

        var win_scroll_position = $(window).scrollTop(),
            target = $('.head_title .shadow_dom'),
            win_scroll_value = win_scroll_position;

        if (win_scroll_position < 100) {
            opacity_value = win_scroll_position / 100;
            target.css('opacity', opacity_value);
        } else {
            target.css('opacity', '1');
        }

    }

    function init() {
        titleAddShadow();
    }

    init();

});

// aws 사용자 행동 로그 적용 공용 함수  js -> php -> aws-sdk -> loging
// json = array 로 주면 php 에서 json 으로 변환
function putKinesisRecord(arr) {

    if (!arr || arr == undefined) return;
    // aws userActionLog putRecord - kinesis
    console.log('call old action log');
    /*$.ajax({
        type: 'POST'
        , cache: false
        , url: '/reservation/js_put_action_log'
        , dataType: 'json'
        , data: { 'json' : arr }
        , success: function(data) {
            console.log(data);
        }
        , error: function(jqXHR, textStatus, errorThrown) {
            var errorMsg = 'status(code) : ' + jqXHR.status + '\n';
            errorMsg += 'statusText : ' + jqXHR.statusText + '\n';
            errorMsg += 'responseText : ' + jqXHR.responseText + '\n';
            errorMsg += 'textStatus : ' + textStatus + '\n';
            errorMsg += 'errorThrown : ' + errorThrown;
            console.log(errorMsg);
        }
    });*/
}

/**
 * @author: hazel
 * @date: 2018-07-09
 * @method: popup
 *
 * 웹뷰 기본 팝업 공통 모듈화
 *
 * @usage
 *  1. popup 열기 popup.show(msg, buttons, options)
 *      1-1. 기본형(확인 버튼) : popup.show('메시지');
 *      1-2. custom 버튼 1개
 *          var buttons = [{text: "버튼 텍스트", onclick: "클릭시 호출 function()"}];
 *          popup.show('버튼 1개', button);
 *      1-3. custom 버튼 2개
 *          var buttons = [{text: "버튼 텍스트", onclick: "클릭시 호출 function()"}, {text:"닫기", onclick:"popup.close();"}];
 *          popup.show('버튼 2개', button);
 *  2. popup 닫기
 *      popup.close();
 * */
var popup = (function () {
    var buttonClass = '';
    var buttonNameAddNew = '';
    var buttonItemClass = 'btn-primary';

    setConfig = function (msg, buttons, options) {

        if (buttons === undefined) {
            //이미 팝업이 있으면 append 시키지 않음
            if ($('#popup-message .btn_one').length > 0 || $('#popup-message .btn_two').length > 0) {
                return false;
            }

            $('#popup-message .content').append('<div class="btn_one btns-wrap btn-row"><button type="button" class="' + "btn-primary" + '"  onclick="popup.close();">닫기</button></div>');
        } else {


            if (buttons.length === 1) {
                buttonClass = 'btn_one';
                buttonNameAddNew = ' btns-wrap btn-row';
            } else {
                buttonClass = 'btn_two';
                buttonNameAddNew = ' btns-wrap btn-half';
            }

            //이미 팝업이 있으면 append 시키지 않음
            if ($('#popup-message .btn_one').length > 0 || $('#popup-message .btn_two').length > 0) {
                return false;
            }

            $('#popup-message .content').append('<div class="' + buttonClass + '"></div>');
            $(' .' + buttonClass).addClass(buttonNameAddNew);
            buttons.forEach(function (button, i) {
                if (buttonClass === 'btn_one') {
                    buttonItemClass = 'btn-primary';
                } else {
                    buttonItemClass = i === 0 ? 'btn-secondary' : 'btn-primary';
                }
                //buttonItemClass = i === 0 ? 'btn-primary' : 'btn-secondary';
                $('#popup-message ' + ' .' + buttonClass).append('<button type="button" class="' + buttonItemClass + '" onclick="' + button.onclick + '">' + button.text + '</button>');
            });
            if (options) {
                //console.log(options)
                $('#popup-message .content').prepend(options)
            }
        }



        $('#popup-message .txt div').html(msg);
    };

    show = function () {

        unPreventTouchmove();

        if ($('#popup-message').length === 0) {

            return;
        } else if ($('#popup-message').hasClass('dialog')) {
            $('#popup-message.dialog').addClass('show');
        } else {
            $('#popup-message').show();
            $('#popup-message').addClass('show');
        }

        preventTouchmove();
        alignPopup();
    };

    touchMove = function (e) {
        e.preventDefault();
    }

    preventTouchmove = function () {
        document.addEventListener('touchmove', touchMove, { passive: false });
    };

    unPreventTouchmove = function () {
        document.removeEventListener('touchmove', touchMove);
    };

    alignPopup = function () {
        $('.layerpop .content').each(function () {
            if ($(this).parent().hasClass('dialog')) {
                return;
            }
            var this_height = $(this).height();
            var half_height = this_height / 2;
            $(this).css('margin-top', -half_height);
        });
    };

    close = function () {
        //console.log('close')
        if ($('#popup-message').length === 0 || $('#popup-message').css('display') == 'none') {
            //console.log('pop.close return')
            return;
        }
        $('#popup-message').hide();
        $('#popup-message').removeClass('show');

        if ($('#popup-message').find($('.dialog-title'))) {
            $('.dialog-title').remove()
        }
        $('#popup-message .txt div').html('');

        if ($('#popup-message .btn_one').length >= 1) {
            $('#popup-message .btn_one').remove();
        }

        if ($('#popup-message .btn_two').length >= 1) {
            $('#popup-message .btn_two').remove();
        }

        unPreventTouchmove();
    };

    return {
        show: function (msg, buttons, options, optionTit) {
            setConfig(msg, buttons, options, optionTit);
            show();
        },
        close: function () {
            close();
        }
    };
})();

/**
 * @author: hazel
 * @date: 2018-07-09
 * @method: go
 *
 * 자주 사용되는 이동 스키마 모듈화
 *
 * @usage
 *
 *  go.couponList();
 *  go.login();
 *  go.eventDetail({title:"이벤트 타이틀", aevno: "이벤트번호"});
 *  go.reservationDetail(예약번호);
 *
 * */
var go = (function () {

    moveTo = function (url) {
        popup.close();
        location.href = url;
    };

    return {
        couponList: function () {
            moveTo('yeogi://details?schemetype=coupon&anim=2');
        },
        login: function () {
            moveTo('yeogi://details?schemetype=login&anim=2');
        },
        eventList: function () {
            moveTo('yeogi://details?schemetype=event&anim=2');
        },
        eventDetail: function (event) {
            if (event.title === undefined || event.aevno === undefined) {
                return;
            }
            moveTo('yeogi://details?schemetype=eventdetail&anim=2&title=' + event.title + '&url=https://api3.goodchoice.kr/event3/main/adEventView?aevno=' + event.aevno);
        },
        friendInvitaion: function () {
            moveTo('yeogi://details?schemetype=friendinvitation&anim=2');
        },
        reservationList: function () {
            moveTo('yeogi://details?schemetype=reservationlist&anim=2');
        },
        reservationDetail: function (doNo) {
            moveTo('yeogi://details?schemetype=reservation&anim=2&do_no=' + doNo);
        },
        externalUrl: function (url) {
            moveTo('yeogi://details?schemetype=url&anim=2&url=' + url);
        },
        affiliateDetail: function (affiliate) {
            if (affiliate.ano === undefined || affiliate.adcno === undefined) {
                return;
            }
            var url = "yeogi://details?schemetype=detail&anim=2&ano=" + affiliate.ano + "&adcno=" + affiliate.adcno;
            if (affiliate.sel_date !== undefined) {
                url += "&sel_date=" + affiliate.sel_date;
            }
            if (affiliate.sel_date2 !== undefined) {
                url += "&sel_date2=" + affiliate.sel_date2;
            }

            moveTo(url);
        },
        kakaoShare: function (kakao) {
            moveTo('withcall://nativecall/kakaotalk_share_web?url=' + kakao.url + '&eventno=' + kakao.eventno + '&title=' + kakao.title + '&mode=' + kakao.mode + '&img=' + kakao.img + '&label=' + kakao.label + '&txt=');
        },
        setting: function () {
            moveTo('yeogi://details?schemetype=setting');
        }

    };
})();


//터치 막기
var touchMove = {
    bind: function () {
        $(window).bind('touchmove', function (e) {
            e.preventDefault()
        });
    },
    unbind: function () {
        $(window).unbind('touchmove');
    }
}


function Calendar(eventDate) {
    this.startDate = eventDate.startDate;
    this.endDate = eventDate.endDate;
}

Calendar.prototype.show = function (ano, monthMoveTo) {
    if (ano === undefined) {
        return false;
    }

    //업체번호,룸객실 셋팅 및 기존것 초기화
    if (ano > 0) {
        $('#day').val('');
        $('#ano').val('');
    } else {
        ano = $('#ano').val();
    }

    $.ajax({
        type: 'POST',
        cache: false,
        beforeSend: function () {
            $(window).bind('touchmove', function (e) { e.preventDefault() }); // 스크롤 막기
            $('.bg_opacity').addClass('show');
        },
        url: '/event3/main/getAdCalendar',
        dataType: 'json',
        data: { 'ano': ano, 'option': monthMoveTo, 'day': $('#day').val(), 'aevsday': this.startDate, 'aeveday': this.endDate },
        success: function (data) {
            //달력초기화
            $('.cal_table').empty();

            $('.adName').html(data.aname);
            $('.calYearMonth').html(data.calYearMonth);

            var beforeCheck = data.beforeCheck != 'ON' ? 'hidden' : 'visible';
            var nextCheck = data.nextCheck != 'ON' ? 'hidden' : 'visible';

            $('.before').css('visibility', beforeCheck);
            $('.next').css('visibility', nextCheck);

            $('.cal_table').append(data.addHtml);
            $('.calendar').addClass('show');

            $('#ano').val(data.ano);
            $('#day').val(data.day);
        },
        error: function (data) {
            console.log(data);
        }
    });
};

Calendar.prototype.close = function () {
    $('.calendar').removeClass('show');
    $('.bg_opacity').removeClass('show');
    $(window).unbind('touchmove'); // 스크롤 해제
};

