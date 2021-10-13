// 모바일 웹 접속 구분
function isWebMobile() {
    var filter = 'win16|win32|win64|mac|macintel';
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
    // align_verticalAll(el);
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

function pop_agree_01() {
    // 숙소이용규칙 및 취소/환불규정 동의
    prevent_on();
    prevent_scroll();
    $('.pop_agree_01').fadeIn(150);
    $('.bg_dimm').fadeIn(150);
    iscroll_run_policy01(); // iscroll
    $('.fix_title').bind('touchmove', function (i) {
        i.preventDefault();
    }); // 타이틀 터치 방지
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

function pop_agree_02() {
    // 개인정보 수집 및 이용동의 팝업
    prevent_on();
    prevent_scroll();
    $('.pop_agree_02').fadeIn(150);
    $('.bg_dimm').fadeIn(150);
    iscroll_run_policy02(); // iscroll
    $('.fix_title').bind('touchmove', function (i) {
        i.preventDefault();
    }); // 타이틀 터치 방지
}

function pop_agree_03() {
    // 개인정보 제 3자 제공 동의 팝업
    prevent_on();
    prevent_scroll();
    $('.pop_agree_03').fadeIn(150);
    $('.bg_dimm').fadeIn(150);
    // iscroll_run_policy02(); // iscroll
    $('.fix_title').bind('touchmove', function (i) {
        i.preventDefault();
    }); // 타이틀 터치 방지

    new IScroll('.pop_agree_03 .fix_cont', {
        mouseWheel: true,
        interactiveScrollbars: true,
        shrinkScrollbars: 'scale',
        fadeScrollbars: true,
        click: true
    });
}

function pop_agree_04() {
    // 만 14세 이상 확인
    prevent_on();
    prevent_scroll();
    $('.pop_agree_04').fadeIn(150);
    $('.bg_dimm').fadeIn(150);
    // iscroll_run_policy02(); // iscroll
    $('.fix_title').bind('touchmove', function (i) {
        i.preventDefault();
    }); // 타이틀 터치 방지
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

    if (cnt < 3) {
        // 2개 이하일때
        $('.pop_price .content').addClass('height_align');
    } else {
        null;
    }
    prevent_scroll();
    $('.pop_price').fadeIn(150);
    $('.bg_dimm').fadeIn(150);
    iscroll_run_price(); // iscroll
    $('.fix_title').bind('touchmove', function (i) {
        i.preventDefault();
    }); // 타이틀 터치 방지
    align_verticalAll('pop_price');
}

// #2. 결제진행
function payment_run() {
    var buyer = $('input[name=do_user_name]').val();
    var buyer_phone = $('input[name=do_user_tel]').val();
    var oneDay1stCancel = $('input[name=oneDay1stCancel]').val();
    var pay_type_array = [2, 5, 6, 10, 11, 12, 14]; // payment type 2 : 이니시스, 5 : 모빌리언스, 6 : 포인트/쿠폰, 10 : 카카오페이, 11 : 나이스페이, 12 : PAYCO, 14 : 네이버페이
    $('#order_form input[name=buyer]').val(buyer);
    $('#order_form input[name=buyer_phone]').val(buyer_phone);

    if ($('input[name=pay_process]').val() == 'Y') {
        close_layer();
        alert_Msg('결제 진행중 입니다.');
        return false;
    }
    // console.log($("#order_form").serialize());
    // 임시
    $('input[name=pay_process]').val('Y');
    $.ajax({
        type: 'POST',
        async: true,
        cache: false,
        url: '/reservation/setReservationReady_non',
        dataType: 'json',
        data: $('#order_form').serialize(),
        success: function (data) {
            if (data.rtv.code != '0000') {
                $('input[name=pay_process]').val('N');

                alert_Msg(data.rtv.msg);

                if (data.rtv.code == '9998') {
                    close_layer();
                } else {
                    //history.back();
                }
                //common_popup('원인을 알수 없는 오류입니다. 고객행복센터에 문의바랍니다.');
                return false;
            }
            var ele = data.params;
            if (
                $.inArray(Number(ele.do_pay_type), pay_type_array) != undefined
            ) {
                payment_submit(data);
                return false;
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
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

function close_payment() {
    if ($(document.body).hasClass('mobile')) {
        $('#pay_mobile_box').hide();
        $('#pay_mobile_frame').attr('src', '#');
    } else {
        $('#pay_box').css('width', '0px');
        $('#pay_box').css('height', '0px');
        $('#pay_frame').css('width', '0px');
        $('#pay_frame').css('height', '0px');
        $('#pay_background').hide();
        $('#pay_box').hide();
        $('#pay_frame').attr('src', 'about:blank');
    }
}

function cancel_payment() {
    close_payment();
    spinner_hide();
    alert_Msg('결제를 취소했습니다.');
}

function fail_payment(message) {
    close_payment();
    spinner_hide();
    alert_Msg(message, 2, '', true);
}

function success_payment() {
    close_payment();
    if ($('#userType').val() == 'GUEST') {
        alert_Msg('정상 예약되었습니다.', 1, '/user/guestReservation');
    } else {
        alert_Msg('정상 예약되었습니다.', 1, '/my/reserveList');
    }
}

function payment_change(obj) {
    $('#order_form #reqPayment_paymentType').val(
        $(obj).children(':selected').val()
    );
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
    if (
        nowTime.getTime() > chkin.getTime() &&
        nowTime.getHours() > Number(saleTime[category]) &&
        nowTime.getHours() < 9
    ) {
        check = false;
    }
    var return_date = chkin.getMonth() + 1 + '월' + chkin.getDate() + '일';
    if (!check)
        alert(
            return_date + '예약이 마감되었습니다.\n다른 날짜로 변경해주세요.'
        );
    return check;
}

function setUseTimeHTML(param) {
    var use_time = ''; //이용시간 text
    var dayuse = ''; //대실이용시간
    var server_time = ''; //now
    var target_html = $('#usetime'); //append tag
    var chkin = '';
    var chkout = '';
    var chkin_time = '';
    var chkout = '';
    var currentdate = new Date();
    var datetime = currentdate.getTime();
    var chkinTime = new Date(param.dpod_chkin_date);
    chkinTime = chkinTime.setMonth(chkinTime.getMonth() + 1);
    if (
        param.dpod_chkin_date == undefined ||
        param.dpod_chkout_date == undefined ||
        param.dpod_dayuse_time == undefined
    ) {
        alert_Msg('필수값 에러 입니다. 고객행복센터에 문의하세요.');
        return false;
    }

    if (chkinTime > datetime) param.server_time = 9;

    chkin = new Date(param.dpod_chkin_date);
    chkout = new Date(param.dpod_chkout_date);

    chkin_time = chkin.getHours();
    chkout_time = chkout.getHours();
    if (Number(chkin_time) > Number(chkout_time))
        chkout_time = chkout_time + 24;

    $('.dayuse').text(param.dpod_dayuse_time);

    owl.trigger('destroy.owl.carousel').empty();

    $('#usetime').children().remove();
    var idx = 0;
    var start_hash = '';
    for (var i = Number(chkin_time); i < Number(chkout_time); i++) {
        var enable = 'disable';
        if (Number(param.server_time) < i && i <= chkout_time - 2) enable = '';
        $('#usetime').append(
            "<button class='item " +
            enable +
            "' times=" +
            i +
            ' dpod_no=' +
            param.dpod_no +
            ' uno=' +
            $('#order_form').find('input[name=uno]').val() +
            '>' +
            i +
            ':00</button>'
        );
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
    var week_string = {
        0: '일',
        1: '월',
        2: '화',
        3: '수',
        4: '목',
        5: '금',
        6: '토'
    };
    return week_string[week];
}

// 체크인 날짜 format
function chkinDateFormat(format, date) {
    if (!date) return false;
    var dates = new Date(date);
    var dataStr;
    switch (format) {
        case 'MDKR':
            dateStr =
                str_pad(dates.getMonth() + 1, 2) +
                '월' +
                str_pad(dates.getDate(), 2) +
                '일' +
                '(' +
                weekKr(dates.getDay()) +
                ') ' +
                str_pad(dates.getHours(), 2) +
                ':' +
                str_pad(dates.getMinutes(), 2);
            break;
        case 'YMDPERIOD':
            dateStr =
                dates.getFullYear() +
                '.' +
                str_pad(dates.getMonth() + 1, 2) +
                '.' +
                str_pad(dates.getDate(), 2) +
                '.' +
                ' (' +
                weekKr(dates.getUTCDay()) +
                ') ' +
                str_pad(dates.getHours(), 2) +
                ':' +
                str_pad(dates.getMinutes(), 2);
            break;
    }

    return dateStr;
}

// 적립카드 팝업
function saveCardPopup(ano, uno) {
    var popUrl =
        'https://api3.goodchoice.kr/my/saveCardDetail?ano=' +
        ano +
        '&uno=' +
        uno;
    var popOption =
        'width=530, height=590, resizable=no, scrollbars=yes, status=no, location=no, menubar=no, directories=no;';
    var savecardWindow = window.open(popUrl, '', popOption);

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
    var typeObj = { point: 'point', mileage: 'mileage', coupon: 'coupon' };
    var type_str = { point: '포인트', mileage: '숙소 마일리지', coupon: '쿠폰' };
    var min_mileage = $('input[name=min_mileage]').val(); // 마일리지
    var min_point = 1000; // 포인트
    var minimum = typeObj[type] == 'point' ? min_point : min_mileage; // 최소 할인 금액
    var sales_button = $('#' + typeObj[type] + 'Btn'); // 할인 버튼
    var sales_val = $('#' + typeObj[type] + 'Val'); // 할인 금액 노출 element
    var payment_value_view = $('.in_price'); // 총 결제 금액/ 구매 총액 element
    var sales_price = $(
        '#order_form input[name=fix_do_use_' + typeObj[type] + ']'
    ).val(); // 결제 폼 - 할인 금액 input
    var payment_price = $('#order_form input[name=payment_price]').val(); // 결제 폼 - 결제금액 input
    var fix_payment_price = $(
        '#order_form input[name=fix_payment_price]'
    ).val(); // 고정 결제금액 ( 취소시 사용 )
    var fix_sales_price = $(
        '#order_form input[name=fix_do_use_' + typeObj[type] + ']'
    ).val(); // 고정 할인금액 ( 취소시 사용 )
    var os_type = $('input[name=escrow_os_type]').val();

    if (os_type) {
        payment_value_view = $('.in_price_app');
    }
    // 쿠폰할인 으로 이미 사용일 경우 처리
    var alreadyUseChk = Object.keys(typeObj);
    var alreadyState = false;
    for (var i = 0; i < alreadyUseChk.length; i++) {
        if (
            $(
                '#order_config_form input[name=use_' + alreadyUseChk[i] + ']'
            ).val() &&
            Number(payment_price) == 0 &&
            sales_button.text() != '사용취소'
        ) {
            alreadyState = true;
        }
    }

    if (alreadyState) return false;

    // 할인금액 제한 체크
    if (Number(sales_price) > 0 && Number(sales_price) < Number(minimum)) {
        alert_Msg(
            type_str[type] + '는 ' + minimum + '원 이상부터 사용가능합니다.'
        );
        return false;
    }

    // 사용 취소
    if (sales_button.text() == '사용취소') {
        var buymoney = $(
            '#order_form input[name=do_use_' + typeObj[type] + ']'
        ).val();
        var viewmoney = payment_value_view
            .text()
            .replace('원', '')
            .replace(',', '');
        sales_val.text('-'); // 할인금액 사용 text "-" 으로 초기화
        sales_button.html(
            type_str[type] + ' 사용 ' + cust_number_format(fix_sales_price)
        ); // 할인 버튼 변경
        $('#order_form input[name=payment_price]').val(
            Number(buymoney) + Number(viewmoney)
        ); //결제 폼 결제금액 복구
        $('#order_form input[name=do_use_' + typeObj[type] + ']').val(0); //결제 폼 포인트 복구
        payment_value_view.text(
            cust_number_format(Number(buymoney) + Number(viewmoney)) + '원'
        ); //결제금액 노출 text 복구
        $('#order_form input[name=pay_type]').val(11); //결제수단 초기화 포인트/마일리지/쿠폰(6) -> 신용카드-nicepay(11)
        $('.pay_select').show();
        $('#order_config_form input[name=use_' + typeObj[type] + ']').val(
            false
        );

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

        sales_val.text('-' + cust_number_format(sales_price) + 'P');
        $('#order_form input[name=payment_price]').val(payment_price);
        $('#order_form input[name=do_use_' + typeObj[type] + ']').val(
            sales_price
        );
        payment_value_view.text(cust_number_format(payment_price) + '원');
        sales_button.text('사용취소');

        $('#order_config_form input[name=use_' + typeObj[type] + ']').val(true);
    }
}

//3자리 콤마
function cust_number_format(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function coupon_item_select_new(
    cpnis_no,
    couponAmount,
    couponType,
    couponDiscountType
) {
    if ($('#reqCoupon_couponIssueId').val() == 0) {
        $('#couponBtn').text('사용취소');
    }
    var paymentAmount = parseInt($('#originalTotalPrice').val());
    if (paymentAmount < couponAmount) {
        couponAmount = paymentAmount;
        paymentAmount = 0;
    } else {
        paymentAmount = paymentAmount - couponAmount;
    }
    $('span.in_price').text(numberWithCommas(paymentAmount) + '원');
    $('span.in_price_app').text(numberWithCommas(paymentAmount) + '원');

    $('#couponVal').text('-' + numberWithCommas(couponAmount) + 'P');
    $('#reqCoupon_couponIssueId').val(cpnis_no);
    $('#reqCoupon_couponType').val(couponType);
    $('#reqCoupon_couponDiscountType').val(couponDiscountType);
    $('#reqCoupon_amount').val(couponAmount);
    $('#reqAmount_paymentAmount').val(paymentAmount);
    $('#reqAmount_couponAmount').val(couponAmount);
    if (parseInt($('#reqAmount_point').val()) > 0) {
        use_point(true);
    }
    close_layer();
    paymentCheck();
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// 쿠폰 선택시 적용
function coupon_item_select(cpnis_no, cpn_benefit) {
    var type = 'coupon';
    var typeObj = { point: 'point', mileage: 'mileage', coupon: 'coupon' };
    var type_str = {
        point: '포인트 사용',
        mileage: '숙소 마일리지 사용',
        coupon: '사용 가능 쿠폰'
    };
    var sales_button = $('#' + typeObj[type] + 'Btn'); // 할인 버튼
    var sales_val = $('#' + typeObj[type] + 'Val'); // 할인 금액 노출 element
    var payment_value_view = $('.in_price'); // 총 결제 금액/ 구매 총액 element
    var sales_price = $(
        '#order_form input[name=fix_do_use_' + typeObj[type] + ']'
    ).val(); // 결제 폼 - 할인 금액 input
    var payment_price = $('#order_form input[name=payment_price]').val(); // 결제 폼 - 결제금액 input
    var fix_payment_price = $(
        '#order_form input[name=fix_payment_price]'
    ).val(); // 고정 결제금액 ( 취소시 사용 )
    var fix_sales_price = $(
        '#order_form input[name=fix_do_use_' + typeObj[type] + ']'
    ).val(); // 고정 할인금액 ( 취소시 사용 )

    // 쿠폰할인 으로 이미 사용일 경우 처리
    var alreadyUseChk = Object.keys(typeObj);
    var alreadyState = false;

    var os_type = $('input[name=escrow_os_type]').val();

    if (os_type) {
        payment_value_view = $('.in_price_app');
    }
    for (var i = 0; i < alreadyUseChk.length; i++) {
        if (
            $(
                '#order_config_form input[name=use_' + alreadyUseChk[i] + ']'
            ).val() &&
            Number(payment_price) == 0 &&
            sales_button.text() != '사용취소'
        ) {
            alreadyState = true;
        }
    }
    if (alreadyState) return false;

    close_layer();

    // 사용 취소
    if (sales_button.text() == '사용취소') {
        var buymoney = $(
            '#order_form input[name=do_use_' + typeObj[type] + ']'
        ).val();
        var viewmoney = payment_value_view
            .text()
            .replace('원', '')
            .replace(',', '');

        sales_val.text('-'); // 할인금액 사용 text "-" 으로 초기화
        sales_button.html(
            type_str[type] + ' ' + cust_number_format(fix_sales_price)
        ); // 할인 버튼 변경
        $('#order_form input[name=payment_price]').val(
            Number(buymoney) + Number(viewmoney)
        ); //결제 폼 결제금액 복구
        $('#order_form input[name=do_use_' + typeObj[type] + ']').val(0); //결제 폼 포인트 복구
        payment_value_view.text(
            cust_number_format(Number(buymoney) + Number(viewmoney)) + '원'
        ); //결제금액 노출 text 복구
        $('#order_form input[name=pay_type]').val(11); //결제수단 초기화 포인트/마일리지/쿠폰(6) -> 신용카드-nicepay(11)
        $("#pay_form input[name='stamp_coupon']").val('N');
        $("#order_form input[name='stamp_coupon']").val('N');
        $("#order_form input[name='do_cpnis_no']").val('');
        $('.pay_select').show();
        $('#order_config_form input[name=use_' + typeObj[type] + ']').val(
            false
        );
        // 사용
    } else {
        $.ajax({
            type: 'POST',
            url: '/reservation/getCouponInfo_non',
            data: {
                uno: $('#order_form input[name=uno]').val(),
                cpnis_no: cpnis_no,
                cpn_benefit: cpn_benefit
            },
            dataType: 'json',
            success: function (data) {
                if (data.rtv == true) {
                    var info = data.info;
                    if (info.overcnt > 0) {
                        alert_Msg('쿠폰은 1일 1회 사용 가능합니다.');
                        return false;
                    }
                    if (info.cpn_benefit == '0') {
                        // [스탬프] 최종결제금액을 0원을 만든다
                        $("#pay_form input[name='stamp_coupon']").val('Y');
                        $("#order_form input[name='stamp_coupon']").val('Y');
                        $("#order_form input[name='do_cpnis_no']").val(
                            info.cpnis_no
                        );
                        $("#pay_form input[name='stamp_coupon_no']").val(
                            info.cpnis_no
                        );
                        sales_price = Number(payment_price);
                        payment_price = 0;
                        $('#order_form input[name=pay_type]').val(6);
                        $('.pay_select').hide();
                    } else if (info.cpn_benefit == '2') {
                        // 할인율할인
                        cpn_dc_rate = Number(info.cpn_dc_rate);
                        sales_price =
                            Math.floor(
                                (payment_price * cpn_dc_rate) / 100 / 10
                            ) * 10;
                        cpn_max_price = Number(info.cpn_max_price);
                        if (
                            cpn_max_price > 0 &&
                            sales_price > info.cpn_max_price
                        ) {
                            sales_price = info.cpn_max_price;
                        }
                        $("#order_form input[name='do_cpnis_no']").val(
                            info.cpnis_no
                        );
                    } else {
                        sales_price = info.cpn_dc_price;
                        $("#order_form input[name='do_cpnis_no']").val(
                            info.cpnis_no
                        );
                    }

                    // 결제금액 초과일경우
                    if (
                        Number(payment_price) <= Number(sales_price) &&
                        info.cpn_benefit != '0'
                    ) {
                        sales_price = Number(payment_price);
                        payment_price = 0;
                        $('#order_form input[name=pay_type]').val(6);
                        $('.pay_select').hide();
                        // 할인금액이 결제금액 이하일경우
                    } else if (Number(payment_price) > Number(sales_price)) {
                        payment_price =
                            Number(payment_price) - Number(sales_price);
                    }

                    sales_val.text('-' + cust_number_format(sales_price) + 'P');
                    $('#order_form input[name=payment_price]').val(
                        payment_price
                    );
                    $(
                        '#order_form input[name=do_use_' + typeObj[type] + ']'
                    ).val(sales_price);
                    payment_value_view.text(
                        cust_number_format(payment_price) + '원'
                    );
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

// 약관 동의 전체 체크
function allCheckFunc(obj) {
    $('[name=checkOne]').prop('checked', $(obj).prop('checked'));
}

// 체크박스 체크시 전체선택 체크 여부
function oneCheckFunc(obj) {
    var allObj = $('[name=checkAll]');
    var objName = $(obj).attr('name');

    if ($(obj).prop('checked')) {
        checkBoxLength = $('[name=' + objName + ']').length;
        checkedLength = $('[name=' + objName + ']:checked').length;

        if (checkBoxLength == checkedLength) {
            allObj.prop('checked', true);
        } else {
            allObj.prop('checked', false);
        }
    } else {
        allObj.prop('checked', false);
    }
}

(function () {
    function initPage() {
        // Main ---------------------------------------------------------------------------------------------------------------S
        $(function () {
            // TODO: 카카오페이 결제페이지 리사이즈처리
            $(window).resize(function () {
                if ($('#kakaopay_layer').length > 0) {
                    $('#kakaopay_layer')
                        .css({ position: 'absolute' })
                        .css({
                            left:
                                ($(window).width() -
                                    $('#kakaopay_layer').outerWidth()) /
                                2
                        });
                }
            });
        });

        $('[name=checkAll]').click(function () {
            allCheckFunc(this);
        });
        $('[name=checkOne]').each(function () {
            $(this).click(function () {
                oneCheckFunc($(this));
            });
        });
        // Main ---------------------------------------------------------------------------------------------------------------E
    }
    $(document).ready(initPage);

    window.yeogiWeb = window.yeogiWeb || {};
    window.yeogiWeb.initFuncMap = window.yeogiWeb.initFuncMap || {};
    window.yeogiWeb.initFuncMap.reservation = initPage;
})();
