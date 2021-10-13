// 약관 동의 전체 체크
Kakao.init(_KAKAOTALK_APP_KEY);

var FB = null;

window.fbAsyncInit = function () {
    FB.init({
        appId: _FACEBOOK_APP_ID,
        cookie: true,
        xfbml: true,
        version: 'v2.10'
    });
    FB.AppEvents.logPageView();
};

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

var getFacebookInfo = function (response) {
    spin_dimm();

    var access_token = response.authResponse.accessToken;

    FB.api('/me?fields=id,email', function (response) {
        response.access_token = access_token;
        response[csrf_name] = $('#loginForm input[name="' + csrf_name + '"]').val();

        $.xResponse('/user/facebookLoginProcess', response).done(function (result) {
            if (result.code == 200 || result.code == 302) {
                window.location.href = result.data.url;
            } else {
                spin_dimm_off();

                FB.logout(function (response) {
                    // user is now logged out
                });

                alert_Msg(result.message, 0, '', 1);
            }
        });
    }, { scope: 'email' });
};

var csrf_name = $('meta[name="csrf-name"]').attr('content');
$(function () {
    $('#kakao-login-btn').click(function () {
        Kakao.Auth.login({
            success: function (authObj) {

                spin_dimm();

                Kakao.API.request({
                    url: '/v2/user/me',
                    success: function (res) {
                        var kkaData = JSON.parse(JSON.stringify(res));

                        kkaData.email = kkaData.kakao_account.email;
                        kkaData.access_token = authObj.access_token;
                        kkaData.refresh_token = authObj.refresh_token;
                        kkaData[csrf_name] = $('#loginForm input[name="' + csrf_name + '"]').val();

                        $.xResponse('/user/kakaoLoginProcess', kkaData).done(function (result) {
                            if (result.code == 200 || result.code == 302) {
                                window.location.href = result.data.url;
                            } else {
                                spin_dimm_off();

                                Kakao.Auth.logout();

                                alert_Msg(result.message, 1, result.data.url);
                            }
                        });
                    }
                });
            },
            fail: function (err) {
                spin_dimm_off();

                Kakao.Auth.logout();

                alert_Msg("카카오톡 로그인 실패", 0, '', 1);
            }
        });
    });

    $('#facebook-login-btn').click(function () {
        FB.getLoginStatus(function (response) {
            if (response.status === 'connected') {
                getFacebookInfo(response)
            } else {
                FB.login(function (response) {
                    if (response.status === 'connected') {
                        getFacebookInfo(response);
                    }
                }, { scope: 'email' });
            }
        });
    });

    $("#loginForm").validate({
        lang: 'ko',
        //debug: true,
        onkeyup: function (element) {
            $(element).valid();
        },
        onblur: function (element) {
            $(element).valid();
        },
        errorPlacement: function (error, element) {
            // Add the `help-block` class to the error element
            error.addClass("help-block");

            if (element.prop("type") === "checkbox") {
                error.insertAfter(element.parent("label"));
            } else {
                error.insertAfter(element);
            }
        },
        highlight: function (element, errorClass, validClass) {
            if (!$(element).parents(".form-errors").hasClass("form-password-rule"))
                $(element).parents(".form-errors").addClass("inp_error").removeClass("has-success");
            $('.form-password-rule').addClass('inp_error');
            $('[data-js-validate-email]').attr('disabled', true);
        },
        unhighlight: function (element, errorClass, validClass) {
            if (!$(element).parents(".form-errors").hasClass("form-password-rule"))
                $(element).parents(".form-errors").addClass("has-success").removeClass("inp_error");
            $('[data-js-validate-email]').attr('disabled', false);
        }
    });

});

function logoutSNS() {
    setTimeout(function () {

        if (Kakao !== undefined) {
            Kakao.Auth.logout();
        }

        if (FB !== undefined) {
            FB.getLoginStatus(function (response) {
                if (response.status === 'connected') {
                    FB.logout(function (response) {
                        // user is now logged out
                    });
                }
            });
        }

        window.location.href = '/';
    }, 300);
}

$(function () {
    var selectWayLength = $('.select_way li').length;

    if (selectWayLength >= 2) {
        $('.select_way_phone').attr('checked', true);
    } else {
        $('.select_way_email').attr('checked', true);
    }
});