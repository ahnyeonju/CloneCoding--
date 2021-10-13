var timeId = null
var regExp = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?([0-9]{3,4})-?([0-9]{4})$/;
var setSeconds = 180;
var setSendSeconds = 60;

var sendCodeUrl = '/verification/sendCode';
var verifyCodeUrl = '/verification/verifyCode';

var phoneNumberId = '#phone_number';
var digitId = '#digit';
var certificationPoint = "#phone_certification_point";

var verificationCodeId = '#verificationCode';

var sendButtonId = 'button.btn_send.btn_confirm';
var sendOkButtonId = 'button.btn_ok.btn_confirm';
var sendcheckButtonId = 'button.btn_checked';
var timerId = '#verificationCode span.timer';

function buildTimeFormat(seconds) {
    function str_pad_left(string, pad, length) {
        return (new Array(length + 1).join(pad) + string).slice(-length);
    }

    return str_pad_left(Math.floor(seconds / 60), '0', 2) +
        ':' + str_pad_left(Math.floor(seconds % 60), '0', 2);
}

function printTimecount() { // 초 카운트
    var finalTime = buildTimeFormat(setSeconds);

    $(timerId).html(finalTime);

    setSeconds--;

    if (setSeconds < 0) { // 종료
        clearTimecount();
        cencelSend();

        toastPop('인증번호가 만료되었습니다. 재전송 해주시기 바랍니다.');
    }
}

function setTimecount() {
    clearTimecount();
    cencelSend();

    timeId = setInterval(printTimecount, 1000);

    if ($(verificationCodeId).css('display') == 'none') {
        $(verificationCodeId).fadeIn(250);
    }

    $(sendcheckButtonId).show();
    $(sendButtonId).html('재전송');
}

function clearTimecount() {
    if (timeId !== null) {
        clearInterval(timeId);
    }

    timeId = null;
    setSeconds = 180;

    var finalTime = buildTimeFormat(setSeconds);

    $(timerId).html(finalTime);
}

function cencelSend() {
    $(verificationCodeId).hide();
    $(digitId).val('');
    $(sendcheckButtonId).hide();
    $(sendOkButtonId).removeClass('active');
}

$(document).on('keyup', phoneNumberId, function () {
    var str = $(this).val().replace(/[^0-9]/gi, '');

    clearTimecount();
    cencelSend();

    $(this).data('phoneverify', 'N');
    $(this).val(str.replace(regExp, "$1$2$3"));

    if (regExp.exec(str) == null || $(sendButtonId).hasClass('dbclicked')) {
        $(sendButtonId).removeClass('active');
    } else {
        $(sendButtonId).addClass('active');
    }
});

$(document).on('keyup', digitId, function () {
    $(this).val($(this).val().replace(/[^0-9]/gi, ''));

    if ($(this).val().length != 4) {
        $(sendOkButtonId).removeClass('active');
    } else {
        $(sendOkButtonId).addClass('active');
    }
});

$(document).on('click', sendButtonId, function () {
    var data = {
        phone_number: $(phoneNumberId).val(),
        certification_point: $(certificationPoint).val()
    };

    if ($(this).hasClass('dbclicked')) {
        // cencelSend();
        toastPop("1분 후에 다시 시도해주세요.");

        return false;
    }

    if (data.phone_number.length == 0) {
        cencelSend();
        toastPop('휴대폰 번호를 입력하세요.');

        $(this).removeClass('active');

        return false;
    }

    if (regExp.exec(data.phone_number) == null) {
        cencelSend();
        toastPop('휴대폰 번호 형식이 아닙니다.');

        $(this).removeClass('active');

        return false;
    }

    $.post(sendCodeUrl, data, function (result) {
        $(sendButtonId).removeClass('active');

        if (result.code == 200) {
            $(sendButtonId).addClass('dbclicked');
            $(phoneNumberId).data('phoneverify', 'N');

            setTimecount();

            setTimeout(function () {
                $(sendButtonId).removeClass('dbclicked');
                $(sendButtonId).addClass('active');
            }, setSendSeconds * 1000);
        } else {
            cencelSend();
            toastPop(result.message);
        }
    });
});

$(document).on('click', sendOkButtonId, function () {
    spin_dimm();
    var type = $(this).data('verification-type');
    var next = $(this).data('verification-next');
    var argument = $(this).data('verification-argument');
    var data = {
        phone_number: $(phoneNumberId).val(),
        digit: $(digitId).val(),
        certification_point: $(certificationPoint).val()
    };

    if (data.phone_number.length == 0) {
        spin_dimm_off();

        toastPop('휴대폰 번호를 입력하세요.');

        $(sendOkButtonId).removeClass('active');
        $(phoneNumberId).data('phoneverify', 'N');

        return false;
    }

    if (regExp.exec(data.phone_number) == null) {
        spin_dimm_off();
        toastPop('휴대폰 번호 형식이 아닙니다.');

        $(sendOkButtonId).removeClass('active');
        $(phoneNumberId).data('phoneverify', 'N');

        return false;
    }

    $.post(verifyCodeUrl, data, function (result) {
        spin_dimm_off();
        $(sendOkButtonId).removeClass('active');

        if (result.code == 200) {
            $(phoneNumberId).data('phoneverify', 'Y');

            switch (type) {
                case 'call':
                    clearTimecount();
                    cencelSend();

                    window[next](argument);
                    break;
                case 'link':
                    window.location.href = next;
                    break;
                default:
                    window.location.href = '/';
            }
        } else {
            if (result.code == 302) {
                clearTimecount();
                cencelSend();
            }

            toastPop(result.message);
        }
    });
});
