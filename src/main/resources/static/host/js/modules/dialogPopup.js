/**
 * @ Author: Keen
 * @ Create Time: 2019-11-08
 * @ Description: 다이얼로그 유도 팝업
 */

function getDomainForCookieShare(){
  var host = location.hostname;
  if(host.indexOf('abouthere.kr') != -1){
    return '.abouthere.kr';
  }
  return '.goodchoice.kr';
}

// 하단 다이얼로그 팝업
var popupDialog = (function() {

  var defaultCookie = $.cookie('dialogDefaultPopup');

  var init = function() {
    if (!$('body').hasClass('mobile')) return;

    if (cookieCheck()) {
      makeCookie();
      appendHtml();
      setTimeout(function(){ show() }, 0);
      addEventHidePopup();
    }
  };

  var cookieCheck = function() {

    var kcode = $.cookie('k_code');
    if (kcode) {
    	if (kcode.indexOf("ns_") === 0) return false;
    	if (kcode.indexOf("nv_hotel") === 0) return false; // 네이버 호텔 유입시 설치 유도 레이어 제거
    }
    return ! defaultCookie;
  };

  // 앱 설치 유도 다이얼로그 팝업 - 모델 없는 앱아이콘 ver
  var appendHtml = function() {
    var dialogHTML = '<div class="popup-dialog">';
          dialogHTML += '<div class="popup-dialog-content">';
            dialogHTML += '<div class="popup-dialog-content__align">';
              dialogHTML += '<button type="button" data-dialog-close>닫기</button>';
              dialogHTML += '<div class="popup-dialog-content-inner">';
              dialogHTML += '<img src="https://image.goodchoice.kr/images/web_v3/img_app.png" alt="여기어때 콩이">';
              dialogHTML += '<p><span>2,000만명의 선택!</span>여기어때 앱에서<br/>추가할인 받으세요</p>';
            dialogHTML += '</div>';
            dialogHTML += '<a href="#none" onclick="goAppStore(' + "'dialog'" + ')" class="link-main">앱으로 보기 &gt;<i></i></a>';
            dialogHTML += '<p class="link-sub"><a href="#none" data-dialog-close>모바일 웹으로 계속 보기</a></p>';
            dialogHTML += '</div>';
          dialogHTML += '</div>';
          dialogHTML += '<div class="popup-dialog-virtual-dom" data-dialog-close></div>';
        dialogHTML += '</div>';
    $('body').append(dialogHTML);
  }

  // 앱 설치 유도 다이얼로그 팝업 - 모델 ver
  // var appendHtml = function() {
  //   var dialogHTML = '<div class="popup-dialog">';
  //   dialogHTML += '<div class="popup-dialog-content">';
  //   dialogHTML += '<div class="popup-dialog-content__align">';
  //   dialogHTML += '<button type="button" data-dialog-close>닫기</button>';
  //   dialogHTML += '<a href="#none" onclick="goAppStore(' + "'dialog'" + ')"  class="link-main" alt="앱다운받기"></a>';
  //   dialogHTML += '<a href="#none" data-dialog-close class="link-sub" alt="모바일 웹으로 계속 보기"></a>';
  //   dialogHTML += '</div>';
  //   dialogHTML += '</div>';
  //   dialogHTML += '<div class="popup-dialog-virtual-dom" data-dialog-close></div>';
  //   dialogHTML += '</div>';
  //   $('body').append(dialogHTML);
  // }

  var show = function() {
    var target = $('.popup-dialog');
    target.show();
    setTimeout(function(){
      target.addClass('popup-dialog-show');
    },300);
  };

  var addEventHidePopup = function() {
    var target = $('.popup-dialog');
    $('[data-dialog-close]').click(function(){
      target.removeClass('popup-dialog-show');
        setTimeout(function(){
        target.hide();
        showTopBanner();
      },500);
    });
  };

  var showTopBanner = function() {
    popupTopBanner.appendHtml();
    popupTopBanner.show();
    window.scrollTo(0,0);
  };

  var makeCookie = function() {
    var domain = getDomainForCookieShare();
    $.cookie('dialogDefaultPopup', 'show', { expires: 1, domain: domain });
  }

  return {
    init: init
  }
})();

// 상단 띠배너 팝업
var popupTopBanner = (function() {

  var defaultCookie = $.cookie('dialogDefaultPopup');
  var bannerCookie = $.cookie('bannerPopup');

  // 초기화
  var init = function() {
    if (!$('body').hasClass('mobile')) return;

    if (cookieCheck()) {
      appendHtml();
      show();
    }
  };

  // 쿠키 체크
  var cookieCheck = function() {
    var kcode = $.cookie('k_code');

		if (bannerCookie) return false;
		if (kcode && kcode.indexOf("nv_hotel") === 0) return false; // 네이버 호텔 유입시 설치 유도 레이어 제거
		if (defaultCookie || kcode && kcode.indexOf("ns_") === 0) return true;
  };

  // HTML 생성
  var appendHtml = function() {

    var topBannerHTML = '<div class="mobile_appdown">'
                    + '<button type="button">닫기</button>'
                    + '<p class="js-app-text">지금 앱 다운받고<br/><b>매일 할인쿠폰</b> 받으세요!</p>'
                    + '<a href="javascript:goAppStore()" class="down_and appdown_link" title="여기어때 안드로이드앱 다운로드">다운로드</a>'
                    + '<a href="javascript:goAppStore()" class="down_ios appdown_link" title="여기어때 아이폰앱 다운로드">다운로드</a>'
                    + '</div>'
    $('.wrap').prepend(topBannerHTML);
    addEventHidePopup();
  }

  // 노출
  var show = function() {
    var target = $('.mobile_appdown');
    target.show();
  };

  // 닫기 이벤트
  var addEventHidePopup = function() {
    $('.mobile_appdown button').click(function(){
      $('.mobile_appdown').remove();
      makeCookie();
    });
  };

  // 쿠키 생성
  var makeCookie = function() {
    var domain = getDomainForCookieShare();
    // if (cookieCheck()) {
    //   $.cookie('bannerPopup', 'ns', { expires: 1 }); // 네이버 지식쇼핑
    // } else {
      $.cookie('bannerPopup', 'default', { expires: 1, domain: domain }); // 기본
    // }
  }

  return {
    init: init,
    appendHtml: appendHtml,
    show: show
  }
})();

// 초기화
popupDialog.init();
popupTopBanner.init();
