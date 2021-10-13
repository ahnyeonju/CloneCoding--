// 모바일 웹 접속 구분
function isWebMobile() {
    var filter = "win16|win32|win64|mac|macintel";
    if (navigator.platform) {
        if (filter.indexOf(navigator.platform.toLowerCase()) < 0) {
            return 'M';
        } else {
            return 'W';
        }
    }
}

/* 예약내역 팝업 공통 */
function pop_reserve(el) {
    var $el = $('.' + el);
    prevent_scroll();
    $('.bg_dimm').fadeIn(150);
    $el.fadeIn(150);
    align_verticalAll(el);
}

/* 쿠폰선택 팝업 Iscroll */
var iscroll_cp; // 지역카테고리

function iscroll_run_cp() {
    iscroll_cp = new IScroll('.iscroll_cp', {
        mouseWheel: true,
        interactiveScrollbars: true,
        shrinkScrollbars: 'scale',
        fadeScrollbars: true,
        click: true
    });
}

// 쿠폰팝업 모달
function pop_coupon() {
    prevent_on();
    prevent_scroll();
    $('.pop_coupon').fadeIn(150);
    $('.bg_dimm').fadeIn(150);
    iscroll_run_cp(); // iscroll
    $('.fix_title').bind('touchmove', function (i) { i.preventDefault() }); // 타이틀 터치 방지
}

/* 숙소이용규칙 및 취소/환불규정 Iscroll */
var iscroll_policy; // 지역카테고리

function iscroll_run_policy01() {
    iscroll_policy = new IScroll('.pop_agree_01 .fix_cont', {
        mouseWheel: true,
        interactiveScrollbars: true,
        shrinkScrollbars: 'scale',
        fadeScrollbars: true,
        click: true
    });
}

function pop_agree_01() { // 숙소이용규칙 및 취소/환불규정 동의
    prevent_on();
    prevent_scroll();
    $('.pop_agree_01').fadeIn(150);
    $('.bg_dimm').fadeIn(150);
    iscroll_run_policy01(); // iscroll
    $('.fix_title').bind('touchmove', function (i) { i.preventDefault() }); // 타이틀 터치 방지
}

/* 개인정보 제 3자 제공 Iscroll */
var iscroll_policy_02; // 지역카테고리

function iscroll_run_policy02() {
    iscroll_policy_02 = new IScroll('.pop_agree_02 .fix_cont', {
        mouseWheel: true,
        interactiveScrollbars: true,
        shrinkScrollbars: 'scale',
        fadeScrollbars: true,
        click: true
    });
}

function pop_agree_02() { // 개인정보 수집 및 이용동의 팝업
    prevent_on();
    prevent_scroll();
    $('.pop_agree_02').fadeIn(150);
    $('.bg_dimm').fadeIn(150);
    iscroll_run_policy02(); // iscroll
    $('.fix_title').bind('touchmove', function (i) { i.preventDefault() }); // 타이틀 터치 방지
}

function pop_agree_03() { // 개인정보 제 3자 제공 동의 팝업
    prevent_on();
    prevent_scroll();
    $('.pop_agree_03').fadeIn(150);
    $('.bg_dimm').fadeIn(150);
    // iscroll_run_policy02(); // iscroll
    $('.fix_title').bind('touchmove', function (i) { i.preventDefault() }); // 타이틀 터치 방지
}

function pop_agree_04() { // 만 14세 이상 확인
    prevent_on();
    prevent_scroll();
    $('.pop_agree_04').fadeIn(150);
    $('.bg_dimm').fadeIn(150);
    // iscroll_run_policy02(); // iscroll
    $('.fix_title').bind('touchmove', function (i) { i.preventDefault() }); // 타이틀 터치 방지
}

/* 연박구매총액 팝업 */
var iscroll_price;

function iscroll_run_price() {
    iscroll_price = new IScroll('.iscroll_price', {
        mouseWheel: true,
        interactiveScrollbars: true,
        shrinkScrollbars: 'scale',
        fadeScrollbars: true,
        click: true
    });
}

function pop_price() {
    var cnt = $('.pop_price ul li').length;

    if (cnt < 3) { // 2개 이하일때
        $('.pop_price .content').addClass('height_align');
    } else {
        null;
    }
    prevent_scroll();
    $('.pop_price').fadeIn(150);
    $('.bg_dimm').fadeIn(150);
    iscroll_run_price(); // iscroll
    $('.fix_title').bind('touchmove', function (i) { i.preventDefault() }); // 타이틀 터치 방지
    align_verticalAll('pop_price');
}

// Main ---------------------------------------------------------------------------------------------------------------S
$(function () {

    /* 이용정보 숙박일때 숨김 */
    var time_drag = $('.time_drag #usetime').length;
    if (time_drag !== 1) {
        $('.time_drag').hide();
        $('.info_chkin h3').css('margin-top', '0');
    }

    if ($('.alert_msg_content').length > 0) {
        alert_Msg($('.alert_msg_content').html());
    }

    /* 여행 유형 옆에 ? 버튼 */
    $('.list_wrap .question_mark').click(function () {
        var content = '<p class="pop_add box_shadow">"업무" : 회사 관리자 예약 내역 확인 가능<br>"개인" : 본인만 예약 내역 확인 가능<br>'
            + '<span class="emphasis">여기어때 앱 접속 후 "내 정보 > 예약/구매 내역"에서 선택하신 여행유형을 변경하실 수 있습니다.</span></p>';
        $(this).append(content);
        $('.pop_add').stop().fadeIn(200);
        setTimeout(function () {
            $('.pop_add').fadeOut(200);
            setTimeout(function () {
                $('.pop_add').remove();
            }, 200);
        }, 1000);
    });

    /* 여행 유형 버튼 효과 */
    var biztrip = $('#order_form input[name=biztrip]');
    $("#travel_type button").each(function (e) {
        $(this).click(function () {
            $('#travel_type button').removeClass('on');
            $(this).addClass('on');

            // 여행유형 업무선택시
            if ($(this).hasClass('business')) {
                $(biztrip).val('Y');
            } else {
                $(biztrip).val('N');
            }
        });
    });

    /* 도보,차량 버튼 효과 */
    var parking = $('#order_form input#reqUser_visitType');
    $('.visit .parking_type_btn').each(function (e) {
        $(this).click(function () {
            $('.visit .parking_type_btn').removeClass('on');
            $(this).addClass('on');

            // 방문방법  차량선택시
            if ($(this).hasClass('car')) {
                $(parking).val('CAR');
                $('#parking_comment span').css("visibility", "visible");
            } else {
                $(parking).val('WALK');
                $('#parking_comment span').css("visibility", "hidden");
            }

        });
    });

    /* 이용시간 */
    var idx = 0;
    var start_hash = '';
    //for(var i = Number($('input[name=use_start_time]').val());i<Number($('input[name=use_end_time]').val());i++){
    for (var i = Number($('input[name=use_start_time]').val()); i < Number($('input[name=use_end_time]').val()); i++) {
        if (Number($('input[name=server_time]').val()) == i) start_hash = idx;
        idx++;
    }

    $('#usetime').owlCarousel({
        dragEndSpeed: 300,
        stagePadding: 16,
        loop: false,
        margin: 0,
        nav: false,
        responsive: {
            0: {
                items: 4
            },
            360: {
                items: 5
            },
            412: {
                items: 6
            },
            480: {
                items: 7
            },
            520: {
                items: 8
            },
            768: {
                items: 10
            },
            1024: {
                items: 8
            }
        },
        startPosition: start_hash
    });

    // TODO: 입실시간 클릭
    $(".time_drag").on('click', '.owl-carousel button.item', function (e) {
        e.preventDefault();
        if ($(this).hasClass("disable")) return false;

        $(".owl-carousel button.item").removeClass("enable");	//초기화
        $item_obj = $(this).parent();

        var use_stime = $item_obj.find('.item').attr("times");
        var use_etime = $item_obj.next().find('.item').attr("times");

        // 무한대실 이요일 경우 시간 늘리기
        var unlimit_msg = '';
        if (Number($('#maxUnlimitedRentHour').val()) > 0) {
            if (Number($('#availableUnlimitedRentEndHour').val()) >= Number($item_obj.find('.item').attr("times"))) {
                Number($('input[name=dayuse_time]').val($('#maxUnlimitedRentHour').val()));
                unlimit_msg = '(무한대실) ';
            } else {
                Number($('input[name=dayuse_time]').val($('input[name=old_dayuse_time]').val()));
            }
        }

        var $button_length = $('.owl-carousel button.item').length;
        var $current_index = $('.owl-carousel button.item').index($(this));

        // 이용시간 활성화
        for (var i = 0; i < Number($('input[name=dayuse_time]').val()); i++) {
            if (i == 0) use_stime = Number($item_obj.find('.item').attr("times"));
            if ($current_index + i >= $button_length - 1) continue;

            $item_obj.find('.item').addClass('enable');

            use_etime = Number($item_obj.find('.item').attr("times")) + 1;

            $item_obj = $item_obj.next();
        }

        $('.use_time').text(use_stime + ":00 - " + use_etime + ":00");
        $('.title rol').eq(0).text('');
        $('.title rol').eq(1).text('이용');
        $('.dayuse').text(unlimit_msg + $(".owl-carousel button.enable").length);
        if (Number($(".owl-carousel button.enable").length) < Number($('input[name=dayuse_time]').val())) {
            alert_Msg(use_stime + "시에 입실하시면<br>" + $(".owl-carousel button.enable").length + "시간 이용하실 수 있습니다.");
        }

        //var last_chkin_date = new Date($('#checkin_date').val());
        var last_chkin_date = safariDate($('#checkin_date').val());
        last_chkin_date.setHours(use_stime);
        var last_etime = Number(use_etime) > 24 ? Math.floor(Number(use_etime) / 13) : use_etime;
        //var last_chkout_date = new Date($('#order_form').find('input[name=checkin_date]').val());
        var last_chkout_date = safariDate($('#checkin_date').val());

        last_chkout_date.setHours((last_etime));
        if (last_etime < 9 && last_etime > 3) last_chkout_date.setDate(last_chkin_date.getDate() + 1);

        //var refund_can_date = new Date($('#order_form').find('input[name=checkin_date]').val());
        var refund_can_date = safariDate($('#checkin_date').val());
        refund_can_date.setHours(last_chkin_date.getHours() - 3);
        var agree = $('#order_config_form input[name=agree]').val();
        var agree_reserve_keep = $('#order_config_form input[name=agree_reserve_keep]').val();
        var join = $('#order_form input[name=uno]').val();
        var room_service_type = $('#order_config_form input[name=room_service_type]').val();
        var nowtime = new Date().getTime();
        var body_text = chkinDateFormat('YMDPERIOD', refund_can_date) + "까지<b>취소 및 환불 가능 (1일 1회)</b>";
        // 취소시간 불가
        if (refund_can_date.getTime() < nowtime) {
            body_text = chkinDateFormat('YMDPERIOD', refund_can_date) + "이후 <br>취소 및 환불 불가합니다.";
            //if(agree_reserve_keep=='Y')body_text = chkinDateFormat('YMDPERIOD',refund_can_date)+"이후 <br>취소 시 쿠폰 교환 가능(1일1회).";		//예약연기
        }
        // 당일,미리예약 체크
        var alReady = false;
        var nowDate = new Date();
        nowDate.setHours(nowDate.getHours() - 3);
        if (last_chkin_date.getDate() > nowDate.getDate()) {
            alReady = true;
        }

        // 환불 미동의
        if (agree == 'N') {
            body_text = "<b>취소 및 환불이 불가한 숙소입니다.</b>";
        }
        // 비회원
        if (!join) {
            body_text = "<b>비회원이므로 결제 시 취소 및 환불이 불가합니다.</b>";
        }
        // 페이백
        if (room_service_type == 2) body_text = "<b>취소 및 환불이 불가한 숙소입니다.</b>";

        $('#order_form').find('input[name=rentTime]').val($(".owl-carousel button.enable").length);

        body_text = "<span id='chkin_cancel_date'>" + body_text + "</span>";
        $('span[name=useText]').text('');
        $("#rentCheckinHour").val(use_stime);
        $("#rentCheckoutHour").val(use_etime);
        var nowHour = new Date().getHours();
        $('#chkin_print_date').html("<span>체크인</span> <b> " + (!alReady && Number(nowHour) < 3 ? "지금 체크인 하셔야 합니다." : chkinDateFormat('MDKR', last_chkin_date)) + "</b>");
        $('#chkout_print_date').html("<span>체크아웃</span> <b> " + chkinDateFormat('MDKR', last_chkout_date) + "</b>");
        $('#chkin_cancel_date').html(body_text);
        $('#dayuse_select').val("Y");
    });

    // 결제수단 선택
    $('.pay_select select').change(function () {
        $('#order_form input[name=pay_type]').val($(this).val());
    });

    // TODO: 카카오페이 결제페이지 리사이즈처리
    $(window).resize(function () {
        if ($('#kakaopay_layer').length > 0) {
            $('#kakaopay_layer').css({ position: 'absolute' }).css({
                left: ($(window).width() - $('#kakaopay_layer').outerWidth()) / 2
            });
        }
    });


    /*$('.select_type_1').on('change', function () {
        if(Number($('.select_type_1').val()) == 5) {
            alert_Msg('휴대폰 결제는 점검중입니다. <br>다른 결제수단을 이용해 주세요.');
            return false;
        }
    })*/
});
// Main ---------------------------------------------------------------------------------------------------------------E

// #1.결제하기
function payment_confirm() {
    //var regName =  /^[가-힣]{2,4}|[a-zA-Z]{2,10}\s[a-zA-Z]{2,10}$/;
    var regName = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|\*]+$/;
    var regPhone = /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/;
    var buyer = $('input[name=do_user_name]');
    var buyer_phone = $('input[name=do_user_tel]');
    var login_on = $('#order_form input[name=uno]').val() ? true : false;
    var parkingChk = $('.visit .parking_type_btn.on').hasClass('on');
    var adcno = $('#order_form input[name=adcno]').val();
    //var parkingUse = $('input[name=park_access]').val();

    /*if(Number($('.select_type_1').val()) == 5) {
        alert_Msg('휴대폰 결제는 점검중입니다. <br>다른 결제수단을 이용해 주세요.');
        return false;
    }*/
    if (!buyer.val()) {
        alert_Msg('예약자 이름을 입력해주세요.');
        return false;
    }
    if (regName.test(buyer.val()) == false) {
        alert_Msg('예약자 이름은 한글,영문,숫자만 입력이 가능합니다.');
        return false;
    }
    if (Number(buyer.val().length) > 20) {
        $('.inp_info_02 .from_name').show();
        alert_Msg('예약자 이름은 20자 이하로 입력해주세요.');
        return false;
    }
    if (!buyer_phone.val()) {
        alert_Msg('휴대폰 번호를 입력해 주세요.');
        return false;
    }

    if (regPhone.test(buyer_phone.val()) == false) {
        alert_Msg('휴대폰 번호를 확인해 주세요.');
        return false;
    }

    if ($('#verificationCode').length > 0) {
        if (buyer_phone.data('phoneverify') != 'Y'
            || buyer_phone.data('phoneverify') === undefined) {
            alert_Msg('휴대폰 번호 미인증 되었습니다.');
            return false;
        }
    }

    if ($('#order_form').find('input[name=checkin_type]').val() == 1) {
        if ($('input[name=dayuse_select]').val() == "N") {
            alert_Msg('이용시간을 선택해주세요.');
            return false;
        }
    }

    if ($("#travel_type").length != 0 && !$('#travel_type').find('button').hasClass('on')) {
        alert_Msg('여행 유형을 선택해 주세요.');
        return false;
    }

    buyer_phone.val(buyer_phone.val().replace(/\-/ig, ''));

    // 도보 체크
    /*if(adcno==1 && parkingUse!=undefined){
        if(!parkingChk){
            alert_Msg('<b>방문 방법</b>을 선택해주세요.<br> 도보 / 차량');
            return false;
        }
    }*/
    if (!categorySaleTimeCheck()) {
        return false;
    }

    // 약관 체크
    if ($('.guest_chk_area').length == 1) {
        // 비회원
        if ($('.agree input[name=checkOne]:checked').length !== 4) {
            alert_Msg('필수 이용 동의 항목에 동의(체크)해주세요.');
            return false;
        }
    } else {
        // 회원
        if ($('.agree input[name=checkOne]:checked').length !== 3) {
            alert_Msg('필수 이용 동의 항목에 동의(체크)해주세요.');
            return false;
        }
    }

    // 예약내역 확인 팝업
    pop_reserve('reserve_chk');
}

// #2. 결제진행
function payment_run() {

    var buyer = $('input[name=do_user_name]').val();
    var buyer_phone = $('input[name=do_user_tel]').val();
    var oneDay1stCancel = $('input[name=oneDay1stCancel]').val();
    var pay_type_array = [2, 5, 6, 10, 11, 12, 14];						// payment type 2 : 이니시스, 5 : 모빌리언스, 6 : 포인트/쿠폰, 10 : 카카오페이, 11 : 나이스페이, 12 : PAYCO, 14 : 네이버페이
    $('#order_form input[name=buyer]').val(buyer);
    $('#order_form input[name=buyer_phone]').val(buyer_phone);

    if ($("input[name=pay_process]").val() == "Y") {
        close_layer();
        alert_Msg('결제 진행중 입니다.');
        return false;
    }
    // console.log($("#order_form").serialize());
    // 임시
    $("input[name=pay_process]").val("Y");
    $.ajax({
        type: 'POST'
        , async: true
        , cache: false
        , url: '/reservation/setReservationReady_non'
        , dataType: 'json'
        , data: $("#order_form").serialize()
        , success: function (data) {
            if (data.rtv.code != "0000") {
                $("input[name=pay_process]").val("N");

                alert_Msg(data.rtv.msg);

                if (data.rtv.code == "9998") {
                    close_layer();
                } else {
                    //history.back();
                }
                //common_popup('원인을 알수 없는 오류입니다. 고객행복센터에 문의바랍니다.');
                return false;
            }
            var ele = data.params;
            if ($.inArray(Number(ele.do_pay_type), pay_type_array) != undefined) {
                payment_submit(data);
                return false;
            }
        }
        , error: function (jqXHR, textStatus, errorThrown) {
            var errorMsg = 'status(code) : ' + jqXHR.status + '\n';
            errorMsg += 'statusText : ' + jqXHR.statusText + '\n';
            errorMsg += 'responseText : ' + jqXHR.responseText + '\n';
            errorMsg += 'textStatus : ' + textStatus + '\n';
            errorMsg += 'errorThrown : ' + errorThrown;
            alert_Msg(errorMsg);
            return false;
        }
    });

}

// #3. PG 사 오픈 결제 시작
function payment_submit(data) {
    $("input[name=pay_process]").val("N");

    var pay_type_array = [2, 5, 6, 10, 11, 12, 14];						// payment type 2 : 이니시스, 5 : 모빌리언스, 6 : 포인트/쿠폰, 10 : 카카오페이, 11 : 나이스페이, 12 : PAYCO, 14 : 네이버페이
    var pay_type_form = { 2: 'inicis_pay', 5: 'mobilians_pay', 6: 'pay_form', 10: 'kakao_pay_form', 11: 'nice_card_pay_form', 12: 'payco_pay_form', 13: 'pay_form', 14: 'naver_pay_form' };						// payment type 2 : 이니시스, 5 : 모빌리언스, 10 : 카카오페이, 11 : 나이스페이, 12 : PAYCO, 14 : 네이버페이

    if (data.rtv.code != "0000")
        return false;

    var formObj = pay_type_form[data.params.do_pay_type];

    $.each(data.params, function (formName, formValue) {
        $("#" + formObj + " input[name='" + formName + "']").val(formValue);
    });

    // 웹 전용
    var os_type = $('input[name=escrow_os_type]').val();
    if (os_type) {
        $("#order_form input[name='payment_price']").val($("#order_form input[name='fix_payment_price']").val());
        $("#order_form input[name='do_use_point']").val(0);
        $("#order_form input[name='do_use_mileage']").val(0);
        $("#order_form input[name='do_use_coupon']").val(0);
        $("#order_form input[name='do_cpnis_no']").val('');
        $("#order_form input[name='stamp_coupon']").val('N');
    }
    // 웹 전용

    switch (Number(data.params.PAYMENT_TYPE)) {
        case 2:		// 이니시스
            fnInicisSubmit(data.params.ORDER_URL + data.params.P_PAY_METHOD + "/");
            break;
        case 5:		// 휴대폰 결제
            // alert_Msg('휴대폰 결제는 점검중입니다. <br>다른 결제수단을 이용해 주세요.');
            fnMobiliansSubmit();
            break;
        case 10:		// 카카오페이
            getTxnId();
            break;
        case 11:		// 나이스페이
            if (isWebMobile() == 'W') {
                nicepayStart(); // PC
            } else {
                fnNiceCardSubmit(); // MOBILE
            }
            break;
        case 12:		// PAYCO
            if ($('#order_url').val()) {
                payCoUpdateNo();
            } else {
                payCoSubmit();
            }
            break;
        case 14:		// 네이버 페이
            naverPaySubmit(data.params);
            break;
        case 6:
        case 13:
            // 결제
            $("#" + formObj).submit();
            break;
    }
}

function validate() {
    //var regName =  /^[가-힣]{2,4}|[a-zA-Z]{2,10}\s[a-zA-Z]{2,10}$/;
    var regName = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|\*]+$/;
    var regPhone = /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/;
    var buyer = $('input[name=do_user_name]');
    var buyer_phone = $('input[name=do_user_tel]');
    var login_on = $('#order_form input[name=uno]').val() ? true : false;
    var parkingChk = $('.visit .parking_type_btn.on').hasClass('on');
    var adcno = $('#order_form input[name=adcno]').val();
    //var parkingUse = $('input[name=park_access]').val();

    /*if(Number($('.select_type_1').val()) == 5) {
  alert_Msg('휴대폰 결제는 점검중입니다. <br>다른 결제수단을 이용해 주세요.');
  return false;
  }*/

    if ($('#reservationType').val() == 'RENT') {
        if ($('#dayuse_select').val() == "N") {
            alert_Msg('이용시간을 선택해주세요.');
            return false;
        }
    }

    if (!buyer.val()) {
        alert_Msg('예약자 이름을 입력해주세요.');
        return false;
    }
    if (regName.test(buyer.val()) == false) {
        alert_Msg('예약자 이름은 한글,영문,숫자만 입력이 가능합니다.');
        return false;
    }
    if (Number(buyer.val().length) > 20) {
        $('.inp_info_02 .from_name').show();
        alert_Msg('예약자 이름은 20자 이하로 입력해주세요.');
        return false;
    }
    if (!buyer_phone.val()) {
        alert_Msg('휴대폰 번호를 입력해 주세요.');
        return false;
    }

    if (regPhone.test(buyer_phone.val()) == false) {
        alert_Msg('휴대폰 번호를 확인해 주세요.');
        return false;
    }

    if ($('#verificationCode').length > 0) {
        if (buyer_phone.data('phoneverify') != 'Y' || buyer_phone.data('phoneverify') === undefined) {
            alert_Msg('휴대폰 번호 미인증 되었습니다.');
            return false;
        }
    }

    if ($("div.visit").find('.parking_type_btn').length != 0 && !$('div.visit').find('.parking_type_btn').hasClass('on')) {
        alert_Msg('<b>방문 방법</b>을 선택해주세요.<br> 도보 / 차량');
        return false;
    }

    if ($("#travel_type").length != 0) {
        if (!$('#travel_type').find('button').hasClass('on')) {
            alert_Msg('여행 유형을 선택해 주세요.');
            return false;
        }
        $("#reqUser_biztrip").val($('#travel_type button.on').hasClass('business') ? 'true' : 'false');
    }

    buyer_phone.val(buyer_phone.val().replace(/\-/ig, ''));

    var payTypeOption = $("section.pay_select select option[value=" + $('#order_form #reqPayment_paymentType').val() + "]");
    if (payTypeOption.attr("minPirce") > $("#reqAmount_paymentAmount")) {
        alert_Msg(payTypeOption.text() + ' 최소 결제금액은 ' + payTypeOption.attr("minPirce") + "원 이상부터 가능합니다.");
        return false;
    }

    // 약관 체크
    if ($('.guest_chk_area').length == 1) {
        // 비회원
        if ($('.agree input[name=checkOne]:checked').length !== 4) {
            alert_Msg('필수 이용 동의 항목에 동의(체크)해주세요.');
            return false;
        }
    } else {
        // 회원
        if ($('.agree input[name=checkOne]:checked').length !== 3) {
            alert_Msg('필수 이용 동의 항목에 동의(체크)해주세요.');
            return false;
        }
    }

    $("#reqUser_phone").val(buyer_phone.val());

    $.ajax({
        type: 'POST'
        , async: true
        , cache: false
        , url: $("#order_form").attr("action")
        , dataType: 'json'
        , data: $("#order_form").serialize()
        , success: function (data) {


            if (data.code == 'SUCCESS') {
                var response = data.result,
                    resValidOrder = response.resValidOrder,
                    refundMessage = "";
                $("#orderAttemptKey").val(response.orderAttemptKey);
                if ($("#reqPayment_paymentType").val() == 'POINT') {
                    redirectUrl = '/reservation/pointProcess/' + response.orderAttemptKey;
                } else {
                    redirectUrl = response.nextRedirectUrl;
                }

                $("#refund_policy *").remove();

                if ($("#facilityCategory").val() == 'MOTEL') {
                    if (resValidOrder.isCancelableFacility) {
                        if ($("#inAdvance").val() == '1') {
                            refundMessage += "<li class='dot_txt'>미리예약은 체크인 기준 1일 전까지 취소 가능합니다.</li>";
                        } else {
                            refundMessage += "<li class='dot_txt'>당일예약은 체크인 시간 기준 3시간 전까지 취소 가능합니다.</li>";
                        }
                    } else {
                        refundMessage += "<li class='dot_txt'><b style='color: red;'>취소 및 환불이 불가</b>합니다.</li>";
                    }
                    refundMessage += "<li class='dot_txt'>예약 후 15분 이내 고객행복센터로 취소 요청 시 100% 환불 가능합니다.</li>";
                } else {
                    if (resValidOrder.confirmationType > 0) {
                        refundMessage += "<li class='dot_txt'>해당 예약은 예약대기 상태 입니다. <b style='color: red;'>예약대기</b> 상태에서는 객실을 이용할 수 없으며, 예약이 완료되면 문자로 발송됩니다.</li>";
                    }
                    refundMessage += "<li class='dot_txt'>미성년자는 보호자 동반 시 투숙이 가능합니다.</li>";
                    if (resValidOrder.isCancelableProduct) {
                        refundMessage += "<li class='dot_txt'><b style='color: red;'>취소 및 환불 규정</b>에 따라 취소수수료 부과 및 취소불가 될 수 있습니다.</li>";
                    } else {
                        refundMessage += "<li class='dot_txt'><b style='color: red;'>취소 및 환불이 불가</b>합니다.</li>";
                    }
                }

                /*
                if($("#facilityCategory").val() === 'MOTEL') {
                        refundMessage += "<li class='dot_txt'>숙소 사정에 의해 취소 발생 시 100% 환불이 가능합니다.</li>";

                        if (resValidOrder.isCancelableFacility) { // 취소 가능 제휴점
                            if (resValidOrder.isAfterCheckinTime) { // 입실 시간 지났을 때
                                refundMessage += "<li class='dot_txt'>입실 시간이 이미 지났기 때문에 <b style='color: red;'>지금 예약하면 예약 후 15분 이내에만 취소 가능합니다.</b></li>";
                            } else {
                                if (resValidOrder.isEarlybird) { // 미리 예약
                                    refundMessage += "<li class='dot_txt'>미리예약은 <b style='color: red;'>체크인 기준 1일 전까지 취소 가능합니다. (모텔은 예약 후 1시간 이내에는 무조건 취소 가능합니다. 단, 입실시간 후에는 취소불가)</b></li>";
                                } else {
                                    if (resValidOrder.isCancelableTime) { // 취소 가능 기간
                                        refundMessage += "<li class='dot_txt'>당일예약은 <b style='color: red;'>체크인 시간 기준 3시간 전까지 취소 가능합니다. (모텔은 예약 후 1시간 이내에는 무조건 취소 가능합니다. 단, 입실시간 후에는 취소불가)</b></li>";
                                    } else {
                                        refundMessage += "<li class='dot_txt'>체크인 시간까지 채 3시간이 남지 않았기 때문에 <b style='color: red;'>지금 예약하면 예약 후 1시간 이내에만 취소 가능합니다. (단, 입실 시간 후에는 취소 불가)</b></li>";
                                    }
                                }
                            }
                        } else { // 취소 불가 제츄점
                            refundMessage += "<li class='dot_txt'>[취소 불가 업소] <b style='color: red;'>취소/환불이 불가합니다.</b></li>";
                        }
                    } else { // 비모텔이면
                        if(resValidOrder.confirmationType > 0) { // 업체가 예약확정하는 상품
                            refundMessage += "<li class='dot_txt'>해당 예약은 숙소 승인 후 예약 확정 됩니다. <b style='color: red;'>확정대기</b> 상태에서는 예약취소 및 객실이용이 불가능하며, 예약이 확정되면 문자로 알려드립니다.</li>";
                        }

                        refundMessage += "<li class='dot_txt'>19세 미만 청소년은 보호자 동반 시 투숙이 가능합니다.</li>";

                        if (resValidOrder.isCancelableProduct) { // 취소 가능한 상품
                            if (resValidOrder.isCancelableFacility) { // 앱내취소 허용업체
                                refundMessage += "<li class='dot_txt'><b style='color: red;'>취소/환불 규정</b>에 따라 앱내에서 예약취소 가능한 상품입니다. 예약취소 시 취소수수료가 발생할 수 있습니다.</li>";
                            } else {
                                refundMessage += "<li class='dot_txt'><b style='color: red;'>앱내취소 불가한 숙소 입니다.<br/>취소가 필요한 경우 고객행복센터 전화를 통해진행할 수 있습니다. </b></li>" +
                                    "<li class='dot_txt'><b style='color: red;'>취소/환불 규정</b>에 따라 취소수수료가 발생할 수 있습니다.</li>";
                            }
                        } else {
                            refundMessage += "<li class='dot_txt'><b style='color: red;'>취소 및 환불이 불가한 상품입니다.</b></li>";
                        }
                    }
                 */
                $("#refund_policy").append(refundMessage);
                $('#chkin_print_date').html("<span>체크인</span> <b> " + chkinDateFormat('MDKR', new Date(data.result.resValidOrder.checkinDate.replace('T', ' ').replace(/-/g, '/'))) + "</b>");
                $('#chkout_print_date').html("<span>체크아웃</span> <b> " + chkinDateFormat('MDKR', new Date(data.result.resValidOrder.checkoutDate.replace('T', ' ').replace(/-/g, '/'))) + "</b>");
                pop_reserve('reserve_chk');

            } else {
                if (data.errorMessage) {
                    if (data.errorMessage.goOut == true) {
                        alert_Msg(data.message, 1, '/');
                    } else if (data.errorMessage.pageReload == true) {
                        alert_Msg(data.message, 2, '', true);
                    } else {
                        alert_Msg(data.message);
                    }
                } else {
                    alert_Msg(data.message);
                }
            }
            return false;
        }
        , error: function (jqXHR, textStatus, errorThrown) {
            return false;
        }
        , beforeSend: function () {
            $("#pay_background").show();
            spinner_show();
        }
        , complete: function () {
            $("#pay_background").hide();
            spinner_hide();
        }

    });

    // 예약내역 확인 팝업
    // pop_reserve('reserve_chk');
}

var redirectUrl = "";
function auth_payment() {
    switch ($("#reqPayment_paymentType").val()) {
        case "POINT":
            spinner_show();
            $("#pay_frame").attr("src", redirectUrl);
            break;
        default:
            if ($(document.body).hasClass('mobile')) {
                //$("#pay_mobile_frame").attr("src", redirectUrl);
                spinner_show();
                location.replace(redirectUrl);
                return;
            } else {
                if ($("#reqPayment_paymentType").val() == 'NAVER') {
                    openPaymentWindow(740, 800);
                    return;
                } else {
                    $("#pay_frame").attr("src", redirectUrl);
                }
            }
            open_payment();
    }
}

var paymentWindow;
function openPaymentWindow(width, height) {
    $("#pay_background").show();
    // 새창에 대한 세팅(옵션)
    var settings = 'toolbar=0,directories=0,status=no,menubar=0,scrollbars=1,resizable=no,height=' + height + 'px,width=' + width + 'px,left=100,top=100';
    paymentWindow = window.open(redirectUrl, "newWindow", settings);
    if (paymentWindow == null || paymentWindow.closed) {
        alert_msg("팝업 차단을 해제 해주세요.");
    } else {
        setTimeout(closePaymentWindow, 1000);
    }
}

function closePaymentWindow() {
    if (paymentWindow == null || paymentWindow.closed) {
        $("#pay_background").hide();
    } else {
        setTimeout(closePaymentWindow, 1000);
    }
}


function open_payment() {
    if ($(document.body).hasClass('mobile')) {
        $("#pay_mobile_box").show();
    } else {
        var payWidth = "100%";
        var payHeight = "100%";
        var payBoxMargin = "100px auto";
        var payFrameBackground = "#fff";

        switch ($("#reqPayment_paymentType").val()) {
            case "PAYCO":
                payWidth = "660px";
                payHeight = "505px";
                break;
            case "NAVER":
                payWidth = "740px";
                payHeight = "800px";
                break;
            case "CELLPHONE":
                payWidth = "660px";
                payHeight = "610px";
                break;
            case "CARD":
            case "CARD_BIZ":
                payBoxMargin = "0";
                payFrameBackground = "none";
                break;
        }

        $("#pay_box").css("width", payWidth);
        $("#pay_box").css("height", payHeight);
        $("#pay_box").css("margin", payBoxMargin);
        $("#pay_frame").css("width", payWidth);
        $("#pay_frame").css("height", payHeight);
        $("#pay_frame").css("background", payFrameBackground);
        $("#pay_background").show();
        $("#pay_box").show();
        // 카드 결제사 페이지 사이즈 오류로 추가
        setTimeout(function () {
            $("#pay_frame").css("width", (parseInt($("#pay_frame").css("width").replace('px', '')) + 1) + 'px');
        }, 1000);
        setTimeout(function () {
            $("#pay_frame").css("width", (parseInt($("#pay_frame").css("width").replace('px', '')) - 1) + 'px');
        }, 2000);
    }
}

function close_payment() {
    if ($(document.body).hasClass('mobile')) {
        $("#pay_mobile_box").hide();
        $("#pay_mobile_frame").attr("src", "#");
    } else {
        $("#pay_box").css("width", "0px");
        $("#pay_box").css("height", "0px");
        $("#pay_frame").css("width", "0px");
        $("#pay_frame").css("height", "0px");
        $("#pay_background").hide();
        $("#pay_box").hide();
        $("#pay_frame").attr("src", "about:blank");
    }
}

function cancel_payment() {
    close_payment();
    spinner_hide();
    alert_Msg("결제를 취소했습니다.");
}

function fail_payment(message) {
    close_payment();
    spinner_hide();
    alert_Msg(message, 2, '', true);
}

function success_payment() {
    close_payment();
    if ($("#userType").val() == 'GUEST') {
        alert_Msg("정상 예약되었습니다.", 1, '/user/guestReservation')
    } else {
        alert_Msg("정상 예약되었습니다.", 1, '/my/reserveList')
    }
}

function payment_change(obj) {
    $('#order_form #reqPayment_paymentType').val($(obj).children(":selected").val());
}

// 예약자이름, 휴대폰 번호 체크
function reserveVadlidationCheck(mode) {
    var regName = /^[가-힣]{2,4}|[a-zA-Z]{2,10}\s[a-zA-Z]{2,10}$/;
    regName = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|\*]+$/;
    var regPhone = /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/;
    var buyer = $('input[name=do_user_name]');
    var buyer_phone = $('input[name=do_user_tel]');

    if (mode == 'name') {
        //console.log(regName.test(buyer.val()));
        if (regName.test(buyer.val()) == false) {
            $('.alert_txt[data-show=name]').css('visibility', '');
            $('.alert_txt[data-show=name]').text('한글,영문,숫자만 입력이 가능합니다.');
            return false;
        } else {
            $('.inp_info_02 .from_name').hide();
        }
        if (Number(buyer.val().length) > 20) {
            $('.alert_txt[data-show=name]').css('visibility', '');
            $('.alert_txt[data-show=name]').text('20자 이하로 입력해주세요.');
            return false;
        } else {
            $('.alert_txt[data-show=name]').css('visibility', 'hidden');
        }
        $("#reqUser_visitorName").val(buyer.val());
    }

    if (mode == 'tel') {
        if (regPhone.test(buyer_phone.val()) == false) {
            $('.alert_txt[data-show=tel]').css('visibility', '');
            $('.alert_txt[data-show=tel]').text('휴대폰 번호를 확인해 주세요.');
            return false;
        } else {
            $('.alert_txt[data-show=tel]').css('visibility', 'hidden');
        }
        $("#reqUser_phone").val(buyer_phone.val());
    }
}

function categorySaleTimeCheck() {
    var category = $('#order_form input[name=adcno]').val();
    var chkindate = $('#order_config_form input[name=chkindate]').val();
    var hotel_category = ['3', '4', '5'];
    if ($.inArray(category, hotel_category) >= 0) category = 2;
    var check = true;
    var saleTime = { 1: 3, 2: 2, 6: 10 };
    var chkin = new Date(chkindate);
    var nowTime = new Date();
    // 모텔 3시, 호텔 2시, 게스트하우스 10시
    if (nowTime.getTime() > chkin.getTime() && nowTime.getHours() > Number(saleTime[category]) && nowTime.getHours() < 9) {
        check = false;
    }
    var return_date = (chkin.getMonth() + 1) + "월" + chkin.getDate() + "일";
    if (!check) alert(return_date + "예약이 마감되었습니다.\n다른 날짜로 변경해주세요.");
    return check;
}

function setUseTimeHTML(param) {
    var use_time = '';		//이용시간 text
    var dayuse = '';		//대실이용시간
    var server_time = '';	//now
    var target_html = $('#usetime');	//append tag
    var chkin = '';
    var chkout = '';
    var chkin_time = '';
    var chkout = '';
    var currentdate = new Date();
    var datetime = currentdate.getTime();
    var chkinTime = new Date(param.dpod_chkin_date);
    chkinTime = chkinTime.setMonth(chkinTime.getMonth() + 1);
    if (param.dpod_chkin_date == undefined || param.dpod_chkout_date == undefined || param.dpod_dayuse_time == undefined) {
        alert_Msg('필수값 에러 입니다. 고객행복센터에 문의하세요.');
        return false;
    }

    if (chkinTime > datetime) param.server_time = 9;

    chkin = new Date(param.dpod_chkin_date);
    chkout = new Date(param.dpod_chkout_date);

    chkin_time = chkin.getHours();
    chkout_time = chkout.getHours();
    if (Number(chkin_time) > Number(chkout_time)) chkout_time = chkout_time + 24;


    $('.dayuse').text(param.dpod_dayuse_time);

    owl.trigger('destroy.owl.carousel').empty();

    $('#usetime').children().remove();
    var idx = 0;
    var start_hash = '';
    for (var i = Number(chkin_time); i < Number(chkout_time); i++) {
        var enable = "disable";
        if (Number(param.server_time) < i && i <= (chkout_time - 2)) enable = "";
        $('#usetime').append("<button class='item " + enable + "' times=" + i + " dpod_no=" + param.dpod_no + " uno=" + $('#order_form').find('input[name=uno]').val() + ">" + i + ":00</button>");
        if (Number(param.server_time) == i) start_hash = idx;
        idx++;
    }
    owl_option.startPosition = start_hash;
    owl.owlCarousel(owl_option);
}

function safariDate(sel_date) {
    var date = sel_date,
        values = date.split(/[^0-9]/),
        year = parseInt(values[0], 10),
        month = parseInt(values[1], 10) - 1, // Month is zero based, so subtract 1
        day = parseInt(values[2], 10),
        hours = parseInt(values[3] ? values[3] : 0, 10),
        minutes = parseInt(values[4] ? values[4] : 0, 10),
        seconds = parseInt(values[5] ? values[5] : 0, 10),
        formattedDate;

    formattedDate = new Date(year, month, day, hours, minutes, seconds);
    return formattedDate;
}

// 요일 구하기 (한글)
function weekKr(week) {
    if (week < 0) return false;
    var week_string = { 0: "일", 1: "월", 2: "화", 3: "수", 4: "목", 5: "금", 6: "토" };
    return week_string[week];
}

// 체크인 날짜 format
function chkinDateFormat(format, date) {
    if (!date) return false;
    var dates = new Date(date);
    var dataStr;
    switch (format) {
        case 'MDKR':
            dateStr = str_pad(dates.getMonth() + 1, 2) + "월" + str_pad(dates.getDate(), 2) + "일" + "(" + weekKr(dates.getDay()) + ") " + str_pad(dates.getHours(), 2) + ":" + str_pad(dates.getMinutes(), 2);
            break;
        case 'YMDPERIOD':
            dateStr = dates.getFullYear() + "." + str_pad(dates.getMonth() + 1, 2) + "." + str_pad(dates.getDate(), 2) + "." + " (" + weekKr(dates.getUTCDay()) + ") " + str_pad(dates.getHours(), 2) + ":" + str_pad(dates.getMinutes(), 2);
            break;
    }

    return dateStr;
}

// 적립카드 팝업
function saveCardPopup(ano, uno) {
    var popUrl = "https://api3.goodchoice.kr/my/saveCardDetail?ano=" + ano + "&uno=" + uno;
    var popOption = "width=530, height=590, resizable=no, scrollbars=yes, status=no, location=no, menubar=no, directories=no;";
    var savecardWindow = window.open(popUrl, "", popOption);

    //savecardWindow.document.write('<iframe src="'+popUrl+'" frameborder="0" width="530" height="590" marginwidth="0" marginheight="0" scrolling="yes">');
}

/* php STR_PAD  */
function str_pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

// 할인 정보 사용시 포인트,마일리지
function sales_use(type) {
    var typeObj = { 'point': 'point', 'mileage': 'mileage', 'coupon': 'coupon' };
    var type_str = { 'point': '포인트', 'mileage': '숙소 마일리지', 'coupon': '쿠폰' };
    var min_mileage = $('input[name=min_mileage]').val();						// 마일리지
    var min_point = 1000;														// 포인트
    var minimum = typeObj[type] == 'point' ? min_point : min_mileage;				// 최소 할인 금액
    var sales_button = $('#' + typeObj[type] + 'Btn');								// 할인 버튼
    var sales_val = $('#' + typeObj[type] + 'Val');									// 할인 금액 노출 element
    var payment_value_view = $('.in_price');									// 총 결제 금액/ 구매 총액 element
    var sales_price = $('#order_form input[name=fix_do_use_' + typeObj[type] + ']').val();		// 결제 폼 - 할인 금액 input
    var payment_price = $('#order_form input[name=payment_price]').val();					// 결제 폼 - 결제금액 input
    var fix_payment_price = $('#order_form input[name=fix_payment_price]').val();			// 고정 결제금액 ( 취소시 사용 )
    var fix_sales_price = $('#order_form input[name=fix_do_use_' + typeObj[type] + ']').val();	// 고정 할인금액 ( 취소시 사용 )
    var os_type = $('input[name=escrow_os_type]').val();

    if (os_type) {
        payment_value_view = $('.in_price_app');
    }
    // 쿠폰할인 으로 이미 사용일 경우 처리
    var alreadyUseChk = Object.keys(typeObj);
    var alreadyState = false;
    for (var i = 0; i < alreadyUseChk.length; i++) {
        if ($('#order_config_form input[name=use_' + alreadyUseChk[i] + ']').val() && Number(payment_price) == 0 && sales_button.text() != '사용취소') {
            alreadyState = true;
        }
    }

    if (alreadyState) return false;

    // 할인금액 제한 체크
    if (Number(sales_price) > 0 && Number(sales_price) < Number(minimum)) {
        alert_Msg(type_str[type] + '는 ' + minimum + '원 이상부터 사용가능합니다.');
        return false;
    }

    // 사용 취소
    if (sales_button.text() == '사용취소') {
        var buymoney = $('#order_form input[name=do_use_' + typeObj[type] + ']').val();
        var viewmoney = payment_value_view.text().replace("원", "").replace(",", "");
        sales_val.text("-");																// 할인금액 사용 text "-" 으로 초기화
        sales_button.html(type_str[type] + " 사용 " + cust_number_format(fix_sales_price));		// 할인 버튼 변경
        $('#order_form input[name=payment_price]').val(Number(buymoney) + Number(viewmoney));					//결제 폼 결제금액 복구
        $('#order_form input[name=do_use_' + typeObj[type] + ']').val(0);						//결제 폼 포인트 복구
        payment_value_view.text(cust_number_format(Number(buymoney) + Number(viewmoney)) + "원");				//결제금액 노출 text 복구
        $('#order_form input[name=pay_type]').val(11);										//결제수단 초기화 포인트/마일리지/쿠폰(6) -> 신용카드-nicepay(11)
        $('.pay_select').show();
        $('#order_config_form input[name=use_' + typeObj[type] + ']').val(false);

        // 사용
    } else {
        // 결제금액 이상일경우
        if (Number(payment_price) <= Number(sales_price)) {
            sales_price = Number(payment_price);
            payment_price = 0;
            $('#order_form input[name=pay_type]').val(6);
            $('.pay_select').hide();
            // 할인금액이 결제금액 미만일경우
        } else if (Number(payment_price) > Number(sales_price)) {
            payment_price = Number(payment_price) - Number(sales_price);
        }

        sales_val.text("-" + cust_number_format(sales_price) + "P");
        $('#order_form input[name=payment_price]').val(payment_price);
        $('#order_form input[name=do_use_' + typeObj[type] + ']').val(sales_price);
        payment_value_view.text(cust_number_format(payment_price) + "원");
        sales_button.text('사용취소');

        $('#order_config_form input[name=use_' + typeObj[type] + ']').val(true);
    }
}

//3자리 콤마
function cust_number_format(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

var couponButtonTitle = "";
//#5 팝업 - 쿠폰선택
function coupon() {
    if (couponButtonTitle == "") {
        couponButtonTitle = $('#couponBtn').text();
    }
    if ($("#reqCoupon_couponIssueId").val() > 0) {
        $("#couponVal").text("-");
        $('#couponBtn').text(couponButtonTitle);
        $("#reqCoupon_couponIssueId").val('0');
        $("#reqCoupon_couponType").val('');
        $("#reqCoupon_couponDiscountType").val('');
        $("#reqCoupon_amount").val('0');
        $("#reqAmount_paymentAmount").val(parseInt($("#reqAmount_paymentAmount").val()) + parseInt($("#reqAmount_couponAmount").val()));
        $("#reqAmount_couponAmount").val('0');
        $("span.in_price").text(numberWithCommas($("#reqAmount_paymentAmount").val()) + "원");
        $("span.in_price_app").text(numberWithCommas($("#reqAmount_paymentAmount").val()) + "원");
        if (parseInt($("#reqAmount_point").val()) > 0) {
            use_point(true);
        }
        paymentCheck();
        return false;
    }

    pop_coupon();

    var btn_Target = $('.gra_coupon li button[data-cpn-use]');
    btn_Target.each(function () {
        $(this).click(function () {
            btn_Target.removeClass('on');
            $(this).addClass('on');
        });
    });
}

function use_point(force_use) {
    var amount = parseInt($("#havePoint").val());
    if (amount == 0) return false;

    if (force_use) {
        $("#reqAmount_paymentAmount").val(parseInt($("#originalTotalPrice").val()) - parseInt($("#reqAmount_couponAmount").val()));
        $("#reqAmount_point").val(0);
    }

    if (parseInt($("#reqAmount_point").val()) == 0) {
        var paymentAmount = parseInt($("#reqAmount_paymentAmount").val());
        if (paymentAmount == 0) {
            $("#pointBtn").text("포인트 사용 " + numberWithCommas(amount) + "P");
            $("#pointVal").text("-");
            return false;
        }

        var usePoint = 0;
        if (amount >= paymentAmount) {
            usePoint = paymentAmount;
            paymentAmount = 0;
        } else {
            usePoint = amount;
            paymentAmount = paymentAmount - amount;
        }

        $("#reqAmount_paymentAmount").val(paymentAmount)
        $("#reqAmount_point").val(usePoint)

        $("span.in_price").text(numberWithCommas(paymentAmount) + "원");
        $("span.in_price_app").text(numberWithCommas(paymentAmount) + "원");
        $("#pointBtn").text("사용취소");
        $("#pointVal").text("-" + numberWithCommas(usePoint) + "P");
    } else {
        var paymentAmount = parseInt($("#reqAmount_paymentAmount").val());
        var usePoint = parseInt($("#reqAmount_point").val());
        paymentAmount = paymentAmount + usePoint;
        usePoint = 0;
        $("#reqAmount_paymentAmount").val(paymentAmount)
        $("#reqAmount_point").val(usePoint)

        $("span.in_price").text(numberWithCommas(paymentAmount) + "원");
        $("span.in_price_app").text(numberWithCommas(paymentAmount) + "원");
        $("#pointBtn").text("포인트 사용 " + numberWithCommas(amount) + "P");
        $("#pointVal").text("-");
    }
    paymentCheck();

}

function coupon_item_select_new(cpnis_no, couponAmount, couponType, couponDiscountType) {
    if ($("#reqCoupon_couponIssueId").val() == 0) {
        $('#couponBtn').text('사용취소');
    }
    var paymentAmount = parseInt($("#originalTotalPrice").val());
    if (paymentAmount < couponAmount) {
        couponAmount = paymentAmount;
        paymentAmount = 0;
    } else {
        paymentAmount = paymentAmount - couponAmount;
    }
    $("span.in_price").text(numberWithCommas(paymentAmount) + "원");
    $("span.in_price_app").text(numberWithCommas(paymentAmount) + "원");

    $("#couponVal").text("-" + numberWithCommas(couponAmount) + 'P');
    $("#reqCoupon_couponIssueId").val(cpnis_no);
    $("#reqCoupon_couponType").val(couponType);
    $("#reqCoupon_couponDiscountType").val(couponDiscountType);
    $("#reqCoupon_amount").val(couponAmount);
    $("#reqAmount_paymentAmount").val(paymentAmount);
    $("#reqAmount_couponAmount").val(couponAmount);
    if (parseInt($("#reqAmount_point").val()) > 0) {
        use_point(true);
    }
    close_layer();
    paymentCheck();
}

function paymentCheck() {
    if ($("#reqAmount_paymentAmount").val() == '0') {
        $("section.pay_select").hide();
        $("#reqPayment_paymentType").val("POINT");
    } else {
        $("section.pay_select").show();
        $('#reqPayment_paymentType').val($("section.pay_select > select.select_type_1 > option:selected").val());
    }

}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// 쿠폰 선택시 적용
function coupon_item_select(cpnis_no, cpn_benefit) {
    var type = 'coupon';
    var typeObj = { 'point': 'point', 'mileage': 'mileage', 'coupon': 'coupon' };
    var type_str = { 'point': '포인트 사용', 'mileage': '숙소 마일리지 사용', 'coupon': '사용 가능 쿠폰' };
    var sales_button = $('#' + typeObj[type] + 'Btn');								// 할인 버튼
    var sales_val = $('#' + typeObj[type] + 'Val');									// 할인 금액 노출 element
    var payment_value_view = $('.in_price');									// 총 결제 금액/ 구매 총액 element
    var sales_price = $('#order_form input[name=fix_do_use_' + typeObj[type] + ']').val();		// 결제 폼 - 할인 금액 input
    var payment_price = $('#order_form input[name=payment_price]').val();					// 결제 폼 - 결제금액 input
    var fix_payment_price = $('#order_form input[name=fix_payment_price]').val();			// 고정 결제금액 ( 취소시 사용 )
    var fix_sales_price = $('#order_form input[name=fix_do_use_' + typeObj[type] + ']').val();	// 고정 할인금액 ( 취소시 사용 )

    // 쿠폰할인 으로 이미 사용일 경우 처리
    var alreadyUseChk = Object.keys(typeObj);
    var alreadyState = false;

    var os_type = $('input[name=escrow_os_type]').val();

    if (os_type) {
        payment_value_view = $('.in_price_app');
    }
    for (var i = 0; i < alreadyUseChk.length; i++) {
        if ($('#order_config_form input[name=use_' + alreadyUseChk[i] + ']').val() && Number(payment_price) == 0 && sales_button.text() != '사용취소') {
            alreadyState = true;
        }
    }
    if (alreadyState) return false;

    close_layer();

    // 사용 취소
    if (sales_button.text() == '사용취소') {
        var buymoney = $('#order_form input[name=do_use_' + typeObj[type] + ']').val();
        var viewmoney = payment_value_view.text().replace("원", "").replace(",", "");

        sales_val.text("-");																// 할인금액 사용 text "-" 으로 초기화
        sales_button.html(type_str[type] + " " + cust_number_format(fix_sales_price));		// 할인 버튼 변경
        $('#order_form input[name=payment_price]').val(Number(buymoney) + Number(viewmoney));					//결제 폼 결제금액 복구
        $('#order_form input[name=do_use_' + typeObj[type] + ']').val(0);						//결제 폼 포인트 복구
        payment_value_view.text(cust_number_format(Number(buymoney) + Number(viewmoney)) + "원");				//결제금액 노출 text 복구
        $('#order_form input[name=pay_type]').val(11);										//결제수단 초기화 포인트/마일리지/쿠폰(6) -> 신용카드-nicepay(11)
        $("#pay_form input[name='stamp_coupon']").val('N');
        $("#order_form input[name='stamp_coupon']").val('N');
        $("#order_form input[name='do_cpnis_no']").val('');
        $('.pay_select').show();
        $('#order_config_form input[name=use_' + typeObj[type] + ']').val(false);
        // 사용
    } else {
        $.ajax({
            type: 'POST',
            url: '/reservation/getCouponInfo_non',
            data: { 'uno': $('#order_form input[name=uno]').val(), 'cpnis_no': cpnis_no, 'cpn_benefit': cpn_benefit },
            dataType: 'json',
            success: function (data) {
                if (data.rtv == true) {
                    var info = data.info;
                    if (info.overcnt > 0) {
                        alert_Msg('쿠폰은 1일 1회 사용 가능합니다.');
                        return false;
                    }
                    if (info.cpn_benefit == "0") { // [스탬프] 최종결제금액을 0원을 만든다
                        $("#pay_form input[name='stamp_coupon']").val('Y');
                        $("#order_form input[name='stamp_coupon']").val('Y');
                        $("#order_form input[name='do_cpnis_no']").val(info.cpnis_no);
                        $("#pay_form input[name='stamp_coupon_no']").val(info.cpnis_no);
                        sales_price = Number(payment_price);
                        payment_price = 0;
                        $('#order_form input[name=pay_type]').val(6);
                        $('.pay_select').hide();
                    } else if (info.cpn_benefit == "2") { // 할인율할인
                        cpn_dc_rate = Number(info.cpn_dc_rate);
                        sales_price = Math.floor((payment_price * cpn_dc_rate / 100) / 10) * 10;
                        cpn_max_price = Number(info.cpn_max_price);
                        if (cpn_max_price > 0 && sales_price > info.cpn_max_price) {
                            sales_price = info.cpn_max_price;
                        }
                        $("#order_form input[name='do_cpnis_no']").val(info.cpnis_no);
                    } else {
                        sales_price = info.cpn_dc_price;
                        $("#order_form input[name='do_cpnis_no']").val(info.cpnis_no);
                    }

                    // 결제금액 초과일경우
                    if (Number(payment_price) <= Number(sales_price) && info.cpn_benefit != "0") {
                        sales_price = Number(payment_price);
                        payment_price = 0;
                        $('#order_form input[name=pay_type]').val(6);
                        $('.pay_select').hide();
                        // 할인금액이 결제금액 이하일경우
                    } else if (Number(payment_price) > Number(sales_price)) {
                        payment_price = Number(payment_price) - Number(sales_price);
                    }

                    sales_val.text("-" + cust_number_format(sales_price) + "P");
                    $('#order_form input[name=payment_price]').val(payment_price);
                    $('#order_form input[name=do_use_' + typeObj[type] + ']').val(sales_price);
                    payment_value_view.text(cust_number_format(payment_price) + "원");
                    sales_button.text('사용취소');
                } else {
                    alert_Msg('다시 시도해주세요.');
                    return false;
                }

            },
            error: function () {
                alert_Msg('다시 시도해주세요.');
            }
        });
    }
}

/*이니시스*/
function fnInicisSubmit(inicis_action) {
    var order_form = document.inicis_pay;
    order_form.method = 'POST';
    order_form.action = inicis_action;
    order_form.submit();
}

/*모빌리언스*/
function fnMobiliansSubmit() {
    //아래와 같이 ext_inc_comm.js에 선언되어 있는 함수를 호출
    MCASH_PAYMENT(document.mobilians_pay);
    return false;
}

/*나이스페이*/
function fnNiceCardSubmit() {
    document.charset = 'euc-kr';
    document.nice_card_pay_form.method = "post";
    document.nice_card_pay_form.action = "https://web.nicepay.co.kr/smart/paySmart.jsp"; // 모바일
    document.nice_card_pay_form.submit();
    return false;
}

/*나이스페이PC*/
function nicepayStart() {
    //document.nice_card_pay_form.target = "_blank"; // PC[새창]
    document.nice_card_pay_form.action = "/reservation/getNicepayReturn"; // PC
    goPay(document.nice_card_pay_form);
    return false;
}

function nicepaySubmit() {
    document.nice_card_pay_form.submit();
}

function nicepayClose() {
    close_layer();
    $("input[name=pay_process]").val("N");
    //alert_Msg("결제가 취소되었습니다.");
}

/*카카오페이 submit */
var submitFunc = function cnspaySubmit(data) {
    if (data.RESULT_CODE === '00') {

        // 부인방지토큰은 기본적으로 name="NON_REP_TOKEN"인 input박스에 들어가게 되며, 아래와 같은 방법으로 꺼내서 쓸 수도 있다.
        // 해당값은 가군인증을 위해 돌려주는 값으로서, 가맹점과 카카오페이 양측에서 저장하고 있어야 한다.
        // var temp = data.NON_REP_TOKEN;

        document.kakao_pay_form.submit();

    } else if (data.RESULT_CODE === 'KKP_SER_002') {
        // X버튼 눌렀을때의 이벤트 처리 코드 등록
        //alert_Msg(data.RESULT_MSG);
        //location.href = $('input[name=cancel_url]').val();
        $("input[name=pay_process]").val("N");
    } else {
        if (data.RESULT_CODE == '557') alert_Msg('카카오페이 인증완료 후 다시 시도해 주세요.');
        else {
            alert(data.RESULT_MSG);
        }
        //location.href = $('input[name=cancel_url]').val();
    }
};

/*카카오페이 인증요청 */
function getTxnId() {
    // form에 iframe 주소 세팅
    document.kakao_pay_form.target = "txnIdGetterFrame";
    document.kakao_pay_form.action = "/reservation/getTxnId_non";
    document.kakao_pay_form.acceptCharset = "utf-8";
    if (document.kakao_pay_form.canHaveHTML) { // detect IE
        document.charset = kakao_pay_form.acceptCharset;
    }

    if (isWebMobile() == 'W') {
        document.kakao_pay_form.prType.value = "WPM";
        document.kakao_pay_form.channelType.value = "4";
    } else {
        document.kakao_pay_form.prType.value = "MPM";
        document.kakao_pay_form.channelType.value = "2";
    }

    // post로 iframe 페이지 호출
    document.kakao_pay_form.submit();
    // kakao_pay_form의 타겟, action을 수정한다

    document.kakao_pay_form.target = "";
    document.kakao_pay_form.action = $('#kakao_pay_form input[name=FORM_ACTION]').val();
    document.kakao_pay_form.acceptCharset = "utf-8";
    if (document.kakao_pay_form.canHaveHTML) { // detect IE
        document.charset = kakao_pay_form.acceptCharset;
    }

    // getTxnId.jsp의 onload 이벤트를 통해 cnspay() 호출
}


/* 카카오페이 cnspay  를 통해 결제를 시작합니다. */
function cnspay() {
    close_layer();

    // TO-DO : 가맹점에서 해줘야할 부분(TXN_ID)과 KaKaoPay DLP 호출 API
    // 결과코드가 00(정상처리되었습니다.)
    if (document.kakao_pay_form.resultCode.value == '00') {
        // TO-DO : 가맹점에서 해줘야할 부분(TXN_ID)과 KaKaoPay DLP 호출 API
        kakaopayDlp.setTxnId(document.kakao_pay_form.txnId.value);

        //kakaopayDlp.setChannelType('WPM', 'TMS'); // PC결제
        kakaopayDlp.setChannelType('MPM', 'WEB'); // 모바일 웹(브라우저)결제
        //kakaopayDlp.addRequestParams({ MOBILE_NUM : '010-'}); // 초기값 세팅

        kakaopayDlp.callDlp('kakaopay_layer', document.kakao_pay_form, submitFunc);
    } else {
        alert_Msg('[RESULT_CODE] : ' + document.kakao_pay_form.resultCode.value + '<br>[RESULT_MSG] : ' + document.kakao_pay_form.resultMsg.value);
    }
}

/* 페이코 결제  */
function payCoSubmit() {

    var deviceType = isWebMobile();

    /*if(deviceType=='W'){
        $("#payco_pay_form").attr('action', '/reservation/payco_reserve_non');
        $("#payco_pay_form").submit();
        return false;
    }*/

    $("#payco_pay_form input[name=deviceType]").val(deviceType);

    // localhost 로 테스트 시 크로스 도메인 문제로 발생하는 오류
    $.support.cors = true;
    $.ajax({
        type: "POST",
        url: "/reservation/payco_reserve_non",
        data: $("#payco_pay_form").serialize(),
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function (data) {
            var rs = JSON.parse(data);

            if (rs.code == '0') {
                $('#order_num').val(rs.result.reserveOrderNo);
                $('#order_url').val(rs.result.orderSheetUrl);
                payCoUpdateNo();
            }
        },
        error: function (request, status, error) {
            console.log("err :: " + error);
            //에러코드
            alert_Msg("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
            return false;
        }
    });
}
/* 페이코 결제  */
function payCoUpdateNo() {
    $.ajax({
        type: "POST",
        url: "/reservation/payco_updateNo_non",
        data: $("#payco_pay_form").serialize(),
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",

        success: function (data) {
            order();
        },
        error: function (request, status, error) {
            //에러코드
            alert_Msg("code:" + request.status + "<br>" + "message:" + request.responseText + "<br>" + "error:" + error);
            return false;
        }
    });
}

// 페이코 결제 오류
function order() {
    var order_Url = $('#order_url').val();

    if (order_Url) {
        location.href = order_Url;
        /*if(isWebMobile()=='W'){
            window.open(order_Url, 'popupPayco', 'top=100, left=300, width=727px, height=512px, resizble=no, scrollbars=yes');
        }else{
            location.href = order_Url;
        }*/
    }
    else alert_Msg("결제과정에서 장애가 발생했습니다. 다시 이용해 주세요.");
}

/* 네이버페이 결제  */
function naverPaySubmit(mode) {
    var serviceRealDomain = isWebMobile() == 'W' ? "https://pay.naver.com/payments/" : "https://m.pay.naver.com/payments/";
    //var serviceRealDomain = "https://test-m.pay.naver.com/payments/"; // TODO: 개발모드 (모바일)
    //var serviceRealDomain = "https://test-pay.naver.com/payments/"; // TODO: 개발모드 (PC)
    var domain = serviceRealDomain;

    $.support.cors = true;
    $.ajax({
        type: "POST",
        url: "/reservation/naverPayReady_non",
        data: $("#naver_pay_form").serialize(),
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function (data) {
            var rs = JSON.parse(data);
            if (rs.code == "Success") {
                if (rs.body.reserveId) {
                    document.location = domain + rs.body.reserveId;
                }
                else alert_Msg("code:<br>" + "message:reserveId를 못 받았습니다.\n");
            } else {
                alert_Msg("code:" + rs.code + "<br>" + "message:" + rs.message + "<br>");
            }
        },
        error: function (request, status, error) {
            //에러코드
            alert_Msg("code:" + request.status + "<br>" + "message:" + request.responseText + "<br>" + "error:" + error);
            return false;
        }
    });
}

function list_show() { // 숙박서비스 제공업체 리스트 팝업 - show
    $('.business_pop').fadeIn(200);
    $(window).bind("touchmove", function (e) { e.preventDefault(); }); // 모바일 스크롤 억제

    new Vue({
        el: '#ajax_ad_list',
        created: function () {
            var settings = {
                page: 1
            };

            settings = this.searchTerm(settings);
            get_no_total_pagination(settings, this, '#pagination', false);
        },
        data: function () {
            return {
                result: [],
                page: 1
            }
        },
        methods: {
            searchTerm: function (settings) {
                var _self = this

                $.xResponse('/more/get_term_ad_list_non', settings).done(function (data) {
                    _self.result = $.extend({}, data.result);
                    _self.page = settings.page;

                    settings['total_page'] = data.total_page;
                });

                return settings;
            }
        }
    });
}

function list_close() { // 숙박서비스 제공업체 리스트 팝업 - close
    $('.business_pop').fadeOut(200);
    $(window).unbind("touchmove"); // 모바일 스크롤 해제
}

// 약관 동의 전체 체크
function allCheckFunc(obj) {
    $("[name=checkOne]").prop("checked", $(obj).prop("checked"));
}

// 체크박스 체크시 전체선택 체크 여부
function oneCheckFunc(obj) {

    var allObj = $("[name=checkAll]");
    var objName = $(obj).attr("name");

    if ($(obj).prop("checked")) {
        checkBoxLength = $("[name=" + objName + "]").length;
        checkedLength = $("[name=" + objName + "]:checked").length;

        if (checkBoxLength == checkedLength) {
            allObj.prop("checked", true);
        } else {
            allObj.prop("checked", false);
        }
    }
    else {
        allObj.prop("checked", false);
    }
}

$(function () {
    $("[name=checkAll]").click(function () {
        allCheckFunc(this);
    });
    $("[name=checkOne]").each(function () {
        $(this).click(function () {
            oneCheckFunc($(this));
        });
    });
});
function reserveVerify() {
    clearTimecount();
    cencelSend();
}
