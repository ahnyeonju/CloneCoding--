/**
 * @ Author: Keen
 * @ Create Time: 2020-01-27
 * @ Description: 패스워드 Validate
 */

var passwordControl = (function () {

    // 라벨 이벤트
    var addLabelEvents = function () {
        $('input[type="password"]').each(function () {
            visibleResetButton($(this));
        });
    };

    // input 핸들
    var visibleResetButton = function (target) {
        target.on('keyup', function (e) {
            var resetButton = target.next('button');
            if (e.target.value === '') {
                handleResetButton.hide(resetButton);
            } else {
                handleResetButton.show(resetButton);
            }
        });
    };

    // 리셋 버튼 핸들
    var handleResetButton = {
        show: function (target) {
            target.addClass('button__display');
        },
        hide: function (target) {
            target.removeClass('button__display');
        },
        init: function () {
            $('.input-area-form button').each(function () {
                $(this).click(function () {
                    var targetInput = $(this).prev('input');
                    targetInput.focus();
                    targetInput[0].value = '';

                    validatePass.fail();

                    handleResetButton.hide($(this));

                    if ($(this).data('hide-message') === false) {
                        validateMessage.warning($(this).prev(), '비밀번호를 한번 더 입력해 주세요.');
                        return
                    } else {
                        validateMessage.hide($(this).prev());
                    }
                });
            });
        }
    };

    // 밸리데이션 체크
    var validateCheck = function (target) {

        // 정규식 : 공백 체크
        var checkSpace = /\s/;

        // 정규식 : 숫자만 체크
        var checkOnlyNumber = /^[0-9]+$/;

        // 정규식 : 영어만 체크
        var checkOnlyEnglish = /^[a-zA-Z]+$/;

        // 정규식 : 한글 체크
        var checkKorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g;

        // 정규식 : 특수문자만 체크
        var checkOnlySpecialCharacters = /[^가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9]/gi;

        // 정규식 : 영어 + 숫자만 체크
        var checkEnglishAndNumber = /^(?=.*[a-zA-Z])(?=.*[0-9])/;

        // 정규식 : 영어 + 특수문자만 체크
        var checkEnglishAndSpecialCharacters = /^(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9])/;

        // 정규식 : 숫자 + 특수문자만 체크
        var checkNumberAndSpecialCharacters = /^(?=.*[0-9])(?=.*[^a-zA-Z0-9])/;

        // 정규식 : 숫자 + 특수문자 + 영어 3조합 체크
        var checkAll = /^(?=.*[0-9])(?=.*[^a-zA-Z0-9])(?=.*[a-zA-Z])/;

        // Input 포커스 아웃시 체크
        target.blur(function (e) {
            var value = e.target.value;

            // 공백 체크 & 6자 미만 체크
            if (checkSpace.test(value) || value.length <= 5) {
                validateMessage.warning(target, '6~15자 영문,숫자,특수문자를 입력해주세요.');
                return;
            }

            // 6자 이상 입력시 Hide
            if (value.length >= 6) {
                validateMessage.hide(target);
            }
        });

        // Input 입력시 체크
        target.on('change keyup paste', function (e) {
            var value = e.target.value;

            // 공백 체크
            if (checkSpace.test(value)) {
                validateMessage.warning(target, '띄어쓰기 없이 입력해주세요.');
                return;
            }

            // 6자 미만 체크
            if (value.length <= 5) {
                validateMessage.default(target, '최소 6자 이상 입력해주세요.');
                return;
            }

            // 10자 이상
            if (value.length >= 10) {
                validateMessage.default(target, '보안 수준 높음');
                return;
            }

            // 6자 ~ 7자
            if (value.length >= 6) {

                // 8자 이상
                if (value.length >= 8) {

                    // 3조합 이상
                    if (checkAll.test(value)) {
                        validateMessage.default(target, '보안 수준 높음');
                        return;
                    }

                    // 영문, 숫자 조합
                    if (checkEnglishAndNumber.test(value)) {
                        validateMessage.default(target, '보안 수준 보통 : 특수문자 미포함');
                        return;
                    }

                    // 영문, 특수문자 조합
                    if (checkEnglishAndSpecialCharacters.test(value)) {
                        validateMessage.default(target, '보안 수준 보통 : 숫자 미포함');
                        return;
                    }

                    // 숫자, 특수문자 조합
                    if (checkNumberAndSpecialCharacters.test(value)) {
                        validateMessage.default(target, '보안 수준 보통 : 영문 미포함');
                        return;
                    }

                    // 숫자만 입력
                    if (checkOnlyNumber.test(value)) {
                        validateMessage.default(target, '보안 수준 보통 : 영문,특수문자 미포함');
                        return;
                    }

                    // 영문만 입력
                    if (checkOnlyEnglish.test(value)) {
                        validateMessage.default(target, '보안 수준 보통 : 숫자,특수문자 미포함');
                        return;
                    }

                    // 특수문자만 입력
                    if (checkOnlySpecialCharacters.test(value)) {
                        validateMessage.default(target, '보안 수준 보통 : 영문,숫자 미포함');
                        return;
                    }
                }

                // 3조합 이상
                if (checkAll.test(value)) {
                    validateMessage.default(target, '보안 수준 낮음');
                    return;
                }

                // 영문, 숫자 조합
                if (checkEnglishAndNumber.test(value)) {
                    validateMessage.default(target, '보안 수준 낮음 : 특수문자 미포함');
                    return;
                }

                // 영문, 특수문자 조합
                if (checkEnglishAndSpecialCharacters.test(value)) {
                    validateMessage.default(target, '보안 수준 낮음 : 숫자 미포함');
                    return;
                }

                // 숫자, 특수문자 조합
                if (checkNumberAndSpecialCharacters.test(value)) {
                    validateMessage.default(target, '보안 수준 낮음 : 영문 미포함');
                    return;
                }

                // 숫자만 입력
                if (checkOnlyNumber.test(value)) {
                    validateMessage.default(target, '보안 수준 낮음 : 영문,특수문자 미포함');
                    return;
                }

                // 영문만 입력
                if (checkOnlyEnglish.test(value)) {
                    validateMessage.default(target, '보안 수준 낮음 : 숫자,특수문자 미포함');
                    return;
                }

                // 특수문자만 입력
                if (checkOnlySpecialCharacters.test(value)) {
                    validateMessage.default(target, '보안 수준 낮음 : 영문,숫자 미포함');
                    return;
                }
            }
        });
    }

    // 밸리데이션 체크 (동일 값)
    var validateCheckSame = function () {
        var prevTarget = $('input[data-prev-password]');
        var nextTarget = $('input[data-next-password]');

        // 새 비밀번호 체크
        prevTarget.on('change keyup paste', function () {
            var prevValue = $(this).val();
            var nextValue = $('input[data-next-password]').val();

            validatePass.fail();

            if (prevValue === nextValue) {
                validatePass.success();
                validateMessage.hide(nextTarget);
                return;
            }
        });

        // 새 비밀번호 확인 체크
        nextTarget.on('change keyup paste', function () {
            var prevValue = $('input[data-prev-password]').val();
            var nextValue = $(this).val();

            validatePass.fail();

            if (nextValue === '') {
                validateMessage.warning(nextTarget, '비밀번호를 한번 더 입력해 주세요.');
                return;
            }

            if (prevValue === nextValue) {
                validatePass.success();
                validateMessage.hide(nextTarget);
                return;
            } else {
                validateMessage.warning(nextTarget, '비밀번호가 일치하지 않습니다.');
                return;
            }
        });

        // 새 비밀번호 블러 체크
        nextTarget.blur(function (e) {
            if ($(this).val() === '') {
                validateMessage.warning(nextTarget, '비밀번호를 한번 더 입력해 주세요.');
            }
        });
    }

    // 밸리데이션 성공 체크
    var validatePass = {
        success: function () {
            var target = $('.button-wrap__full button');
            target.attr('disabled', false);
        },
        fail: function () {
            var target = $('.button-wrap__full button');
            target.attr('disabled', true);
        }
    }

    // 밸리데이션 메세지
    var validateMessage = {
        showMessageElement: function (target, message, className) {
            var targetLabel = target.parent().next();
            targetLabel.removeClass('input-area-message__default input-area-message__safe input-area-message__warning');
            targetLabel.addClass('input-area-message__show ' + className + '');
            targetLabel.text(message);
        },
        hide: function (target) {
            target.parent().next().removeClass('input-area-message__show');
        },
        default: function (target, message) {
            this.showMessageElement(target, message, 'input-area-message__default');
        },
        warning: function (target, message) {
            this.showMessageElement(target, message, 'input-area-message__warning');
        }
    }

    // submit버튼 클릭 제어
    var onClickSubmit = function () {
        var target = $('button[data-button-change]');
        target.click(function () {

            // Ajax 통신
            $.ajax({
                type: 'POST',
                async: false,
                cache: false,
                url: '',
                dataType: 'json',
                success: function (data) {
                    console.log(data);
                },
                error: function (error) {
                    console.error(error);
                }
            });
        });
    };

    // Agent 체크
    var checkAgent = function () {

        var ua = navigator.userAgent.toLowerCase(),
            isAndroid = ua.indexOf("android") > -1;
        iOS = ua.match(/(iphone|ipod|ipad)/);

        if (isAndroid) $('body').addClass('android');
        if (iOS) $('body').addClass('ios');
    };

    // 초기화
    var init = (function () {
        var validateTarget = $('input[data-prev-password]');
        addLabelEvents();               // 애니메이션 라벨
        handleResetButton.init();       // 리셋 버튼 초기호
        validateCheck(validateTarget);  // 밸리데이션 1
        validateCheckSame();            // 밸리데이션 2 (same check)
        // onClickSubmit();                // submit 버튼 이벤트
        checkAgent();                   // 에이전트 체크 (완료 페이지 버튼 숨김)
    })();

})();
