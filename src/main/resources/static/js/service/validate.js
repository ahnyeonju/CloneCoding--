$.validator.addMethod("passwdsecuritylevel", function (value, element, param) {
    var length = $.isArray(value) ? value.length : this.getLength(value, element);
    var message = "보안 수준 낮음";

    $(element).parents(".form-password-rule").addClass("inp_error").removeClass("has-success");
    $(element).addClass("help-block");

    if (length >= 8) {
        if (length >= 10) {
            message = "보안 수준 높음";
        } else if (/^(?=.*[a-zA-Z])(?=.*[-/:;()₩&@\".,?!‘\[\]{}#%\^*+=_\|~<>$€£¥•])(?=.*[0-9]).{8,10}$/.test(value)) {
            message = "보안 수준 높음";
        } else {
            message = "보안 수준 보통";

            var item = [];

            if (! /^(?=.*[0-9]).{8,10}$/.test(value)) {
                item.push('숫자');
            }

            if (! /^(?=.*[a-zA-Z]).{8,10}$/.test(value)) {
                item.push('영문');
            }

            if (! /^(?=.*[-/:;()₩&@\".,?!‘\[\]{}#%\^*+=_\|~<>$€£¥•]).{8,10}$/.test(value)) {
                item.push('특수문자');
            }

            if (item.length > 0) {
                message += ": " + item.join(', ') + " 미포함";
            }
        }

    } else {
        message = "보안 수준 낮음";

        var item = [];

        if (! /^(?=.*[0-9]).{6,8}$/.test(value)) {
            item.push('숫자');
        }

        if (! /^(?=.*[a-zA-Z]).{6,8}$/.test(value)) {
            item.push('영문');
        }

        if (! /^(?=.*[-/:;()₩&@\".,?!‘\[\]{}#%\^*+=_\|~<>$€£¥•]).{6,8}$/.test(value)) {
            item.push('특수문자');
        }

        if (item.length > 0) {
            message += ": " + item.join(', ') + " 미포함";
        }
    }

    this.showLabel(element, message);

    return this.optional(element) || length >= param;
}, $.validator.format("최소 {0}자 이상 입력해 주세요."));

$.validator.addMethod("passwdspace", function (value, element) {
    return this.optional(element) || value.search(/\s/) == -1;
}, $.validator.format("띄어쓰기 없이 입력해 주세요."));

$.validator.addMethod("email", function (value, element) {

    if ($(element).is(":focus")) {
        $(element).next('label').css("color", "gray");
    } else {
        $(element).next('label').css("color", "red");
    }

    return this.optional(element) || /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/.test(value);
}, $.validator.format("이메일 주소를 확인해주세요."));

$.validator.addMethod("phonenumber", function (value, element) {
    return this.optional(element) || /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?([0-9]{3,4})-?([0-9]{4})$/.test(value);
}, $.validator.format("휴대폰 번호 형식이 아닙니다."));

$.validator.addMethod("phoneverify", function (value, element, param) {
    var phoneverify = $(element).data('phoneverify');

    return this.optional(element) || !((phoneverify != 'Y' || phoneverify == undefined) && $(param).val() != value);
}, $.validator.format("미인증 휴대폰 번호 입니다."));

$.validator.addMethod("validemail", function (value, element) {
    var csrf_name = $('meta[name="csrf-name"]').attr('content');
    var flag = true;

    $.ajax({
        url: '/user/joinEmailCheck',
        type: 'post',
        data: {
            uid: value,
            token: $('input[name="' + csrf_name + '"]').val()
        },
        dataType: 'json',
        async: false,
        cache: false,
        success: function (result) {
            if (result.code == 202) {
                flag = false;
            } else {
                if (result.code != 200)
                    alert_Msg(result.message);
            }
        },
        error: function (x, e) {
            alert_Msg('정상적인 접근이 아닙니다.');
        }
    });

    return flag; // 0: show error massege
}, $.validator.format("이미 등록된 이메일입니다."));


$.validator.addMethod("nicknameCheck", function (value, element) {
    var length = $.isArray(value) ? value.length : this.getLength(value, element);

    this.showLabel(element, '추천 닉네임이에요!');

    return this.optional(element) || length > 0;
}, $.validator.format("닉네임을 입력하세요."));

$.validator.addMethod("spaceChar", function (value, element) {
    return this.optional(element) || value.search(/\s/) == -1;
}, $.validator.format("공백은 입력 할 수 없습니다."));

$.validator.addMethod("specialChar", function (value, element) {
    return this.optional(element) || ! /^(?=.*[-/:;()₩&@\".,?!‘\[\]{}#%\^*+=_\|~<>$€£¥•])/.test(value);
}, $.validator.format("특수문자는 입력 할 수 없습니다."));

