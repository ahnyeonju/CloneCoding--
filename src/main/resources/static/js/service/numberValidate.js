/**
 * @ Author: Keen
 * @ Create Time: 2019-11-21
 * @ Description: 인증번호 Validate
 */

var numberValidate = (function () {

    var maxLength = undefined;
    targetInput = undefined,
        sendButton = undefined,
        isServing = false,
        setSeconds = undefined,
        timeId = null,
        retryTimeCheck = null,
        isRetryAccept = true;

    // Input Validate
    var enableButton = function (target) {
        target.attr('disabled', false);
    };

    var disableButton = function (target) {
        target.attr('disabled', true);
    };

    var readonlyInput = {
        enable: function (target) {
            target.attr('readonly', true);
        },
        disable: function (target) {
            target.attr('readonly', false);
        }
    };

    var useInputValidate = function (targetInput, sendButton) {

        targetInput.on('change keyup paste', function (e) {
            var inputLength = e.target.value.length;

            var sliceValue = function () {
                e.target.value = e.target.value.slice(0, maxLength);
                inputLength = e.target.value.length;
            };

            if (inputLength >= 4) {
                sliceValue();
                enableButton(sendButton);
            } else {
                disableButton(sendButton);
            }
        });
    };

    // Submit Handler
    var onSubmit = function (targetInput, sendButton) {
        // sendButton.on('click', function(e) {
        //     e.preventDefault();
        //     if (isServing === true) return;
        //     isServing = true;
        //     serverCheck(targetInput);
        //     console.log('submit');
        // });
    };

    // 서버 체크
    var serverCheck = function (targetInput) {
        console.log('check');
        var getNumber = targetInput[0].value;

        // 성공
        var requestSuccess = function () {

        };

        // 실패
        var requestFailure = function () {
            alert_Msg('인증번호가 올바르지 않습니다.');
            isServing = false;
        };

        // 테스트용
        requestFailure();

        // Ajax 통신
        // $.ajax({
        //     type: 'POST',
        //     async: false,
        //     cache: false,
        //     url: '',
        //     dataType: 'json',
        //     success: function (data) {
        //         console.log(data);
        //     },
        //     error: function (error) {
        //         console.error(error);
        //     }
        // });
    };

    // 인증번호 카운트
    var timeCount = (function () {

        var sendButton = $('[data-js-submit-phone]');
        var targetElement = $('[data-js-time-count]');
        var targetInput = $('[data-js-phonenumber]');

        // 재전송
        var cancelSend = function () {
            $(targetElement).html('');
            $('.error-wrap span').html('입력시간을 초과하였습니다.<br/>인증번호를 재전송해주세요.').show();
            disableButton(sendButton);
            readonlyInput.enable(targetInput)
        };

        // 카운트 초기화
        var clearTimeCount = function () {
            if (timeId !== null) {
                clearInterval(timeId);
            }

            var finalTime = buildTimeFormat(setSeconds);

            $(targetElement).html(finalTime);

        };

        // 시간 포맷 설정
        var buildTimeFormat = function (seconds) {
            function str_pad_left(string, pad, length) {
                return (new Array(length + 1).join(pad) + string).slice(-length);
            }

            return str_pad_left(Math.floor(seconds / 60), '0', 2) +
                ':' + str_pad_left(Math.floor(seconds % 60), '0', 2);
        };

        // 카운트 노출
        var printTimeCount = function () {
            var finalTime = buildTimeFormat(setSeconds);

            targetElement.html(finalTime);

            setSeconds--;

            if (setSeconds < 0) {
                clearTimeCount();
                cancelSend();
                targetElement.html('00:00');
            }
        };

        var runCounting = function () {
            timeId = setInterval(printTimeCount, 1000);
        };

        // 리셋
        var reset = function () {
            setSeconds = 180;
            clearTimeCount();
            runCounting();
        };

        // 초기화
        var init = (function () {
            runCounting();
        })();

        return {
            reset: reset
        }
    })();

    // 재전송
    var retryConfirm = (function () {

        var onClick = function (retryButton) {

            retryButton.click(function () {
                if (isRetryAccept === true) {
                    retry();
                    isRetryAccept = false;
                } else {
                    var currentDate = new Date();
                    var diffTime = Math.abs(retryTimeCheck - currentDate);
                    var setTime = 60000; // 60초

                    if (diffTime < setTime) {
                        setTimeout(function () {
                            toastPop('1분 후에 다시 시도해 주세요.');
                        }, 0);
                    } else {
                        retry();
                        isRetryAccept = true
                    }
                }
            });
        };

        var retry = function () {
            retryTimeCheck = new Date();
            $('.error-wrap span').html('');
            $.ajax({
                type: 'GET',
                dataType: 'JSON',
                cache: false,
                async: false,
                url: '/user/retrySendPhoneAuthProcess',
                success: function (data) {
                    if (data.code != 200) {
                        toastPop(data.message);
                    } else {
                        toastPop('인증번호가 재전송되었습니다.');
                        $('#phone').val(data.data)
                        timeCount.reset();
                        readonlyInput.disable($('[data-js-phonenumber]'));
                        $('[data-js-phonenumber]').val('').focus();
                        disableButton($('[data-js-submit-phone]'));
                    }
                },
                error: function (data) {
                    console.log(data);
                    alert("개발자에게 문의하시기 바랍니다.");
                }
            })

        };

        var init = function (retryButton, targetInput) {
            targetInput = targetInput;
            onClick(retryButton);
        };

        return {
            init: init
        }

    })();

    // 초기화
    var initialize = (function () {
        setSeconds = 180;
        maxLength = 4;
        var targetInput = $('[data-js-phonenumber]');
        var sendButton = $('[data-js-submit-phone]');
        var retryButton = $('[data-js-retry]');

        useInputValidate(targetInput, sendButton);
        onSubmit(targetInput, sendButton);
        retryConfirm.init(retryButton);

    })();

})();
