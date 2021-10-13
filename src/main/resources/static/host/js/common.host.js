$(document).ready(function () {

    //모달 팝업 (로그인 이벤트용) 오늘 하루 보지 않기
   $(".modal-check-event").change(function() {
        $.cookie($(this).attr("name"), $(this).prop('checked'), {
            path: '/',
            expires: 1
        });
    });

   //모달 팝업 (공지용) 오늘 하루 보지 않기
   $(".modal-check").change(function() {
        $.cookie($(this).attr("name"), $(this).prop('checked'), {
            path: '/',
            expires: 1
        });
    });
    //모달 팝업 (추가용) 오늘 하루 보지 않기
    $(".modal-check2").change(function() {
        $.cookie($(this).attr("name"), $(this).prop('checked'), {
            path: '/',
            expires: 1
        });
    });    
    //모달 팝업 (추가용) 오늘 하루 보지 않기
    $(".modal-check3").change(function() {
        $.cookie($(this).attr("name"), $(this).prop('checked'), {
            path: '/',
            expires: 1
        });
    });

   //모달 팝업 (공지용) 이동처리
    $("#modal-popup").draggable({
        handle: ".modal-header"
    });

    //팝업이동, 닫기
    $(".popup").draggable({ handle: "h1" });
    $(".popup .btn_close, .popup .btn_cancel").click(function(){
        $(this).closest('.popup').fadeOut(200);
        $("body").removeClass("modal-open");
        $("#bg_opacity").fadeOut(300);
    });

    //레이어 팝업 over
    $(".popup_over").each(function(idx){
        $(".popup_over_"+(idx+1)).mouseover(function(e){
            var pos_x = e.clientX - ($("#popup_over_"+(idx+1)).width());
            $("#popup_over_"+(idx+1)).css({'left':pos_x, 'top':e.clientY+10}).stop().fadeIn(300);
        }).mouseout(function(){
            $(".popup_over").stop().fadeOut();
        });
    });

    // 레이어 팝업 모달
    $(document).on('click','*[data-role=popup]',function() {
        $('#hiddenframe').attr('src',$(this).attr('data-href'));
        $('#popup > h1').html($(this).attr('data-title'));
    });

    // 레이어 팝업 프레임 연동처리
    $('#hiddenframe').load(function() {
        var content = $('#hiddenframe').contents().find('body').html();

        if (content.length !== 0) {
            $('body').css('overflow','hidden');
            $('#popup').find('.cont').html(content);
            $('#hiddenframe').contents().find('body').html('');

            var pop_x = -$('#popup').width() / 2;
            var pop_y = -$('#popup').height() / 2;

            $('#popup-container').css('display','block');
            $('#popup').css({'margin-left':pop_x}).fadeIn(100);

            $(window).on('resize',function() {
                var overlay_height = $('#popup').height()+200;
                if ($(window).height() > overlay_height) overlay_height = $(window).height();
                $('#popup-container .popup-overlay').css('height',overlay_height);
            });

            $(window).resize();
        }
    });

    $('#popup-container .popup-overlay,#popup .popup-close').click(function(){
        $('#popup-container').fadeOut(100);
        $('body').css('overflow','auto');
        $(window).off('resize');
    });

    $('.header nav ul li').bind("mouseover", function () {
        var sub = $(this).find('.sub');
        var sub_li = $(this).find('.sub li a');

        sub.css('display', 'block');
        sub_li.css('display', 'block');
        sub.addClass('open');
    });

    $('.header nav ul li').bind("mouseleave", function () {
        $('.sub').css('display', 'none');
        $('.sub li a').css('display', 'none');
        $('.sub').removeClass('open');
    });

    $('.header nav ul li ul.sub li').bind("mouseover", function(){
       $(this).find('a').css('color', '#00bfa5');
       $(this).find('a').css('font-weight', '600');
    });

    $('.header nav ul li ul.sub li').bind("mouseleave", function(){
       $(this).find('a').css('color', '#777');
       $(this).find('a').css('font-weight', 'normal');
    });

    // footer 링크 처리

    $('.footer-layer .withinnovation').on('click', function(){
        window.open('//www.withinnovation.co.kr/?page_id=320', '_blank');
    });

    $('.footer-layer .usage').on('click', function(){
        window.open('/terms?cate=usage', '_self');
    });

    $('.footer-layer .privacy').on('click', function(){
        window.open('/terms?cate=privacy', '_self');
    });

    $('.footer-layer .goodchoice').on('click', function(){
        window.open('//www.goodchoice.kr/', '_blank');
    });

    $('.footer-layer .facebook').on('click', function(){
        window.open('//www.facebook.com/goodchoiceofficial', '_blank');
    });

    $('.footer-layer .blog').on('click', function(){
        window.open('//blog.gccompany.co.kr', '_blank');
    });

    $('.footer-layer .youtube').on('click', function(){
        window.open('//www.youtube.com/channel/UCLI1HOVJdhWdVl9pT__g2Zw?app=desktop', '_blank');
    });

    // 이미지 레이지로드
    $('img.lazy').lazyload({
        threshold: 200,
        effect: 'fadeIn'
    });

    $.postJSON = function (url, data, func) {
        $.post(url, data, func, "json")
                .fail(function (res) {
                    notify('에러가 발생했습니다.', 'danger');
                });
    };

    $('#mypage').on('click', function(){
        $(location).attr('href', '/my');
    });

    $('#logout').on('click', function(){
        $(location).attr('href', '/userindex/');
    });

    $('.menu-section').bind('mouseover', function(){
        $('.nav-vertical2').css('display', 'none');
    });

    $('.menu-section').bind('mouseleave', function(){
        $('.nav-vertical2').css('display', 'inline-block');
    });


    //footer 이슈 처리

    if ($(window).height() > 1120) {
        var footer_height = $(window).height() - $('.container').height() - 130;

        $('footer').css('height', footer_height);
        $('footer').css('background', '#252525');
    }

    $(window).resize(function () {
        if ($(window).height() > 1120) {
            var footer_height = $(window).height() - $('.container').height() - 130;

            $('footer').css('height', footer_height);
            $('footer').css('background', '#252525');
        } else {
            $('footer').css('height', 120);
            $('footer').css('background', '#252525');
        }
    });

    //FIXME : 상단 네비 스크롤시 감추는 부분.. 하지만 이슈가 있을듯 하다..

    // var isScroll;
    // var lastScrollTop = 0;
    // var delta = 5;
    // var navbarHeight = $('header').outerHeight();

    // $(window).scroll(function(event){
    //     isScroll = true;
    // });

    // setInterval(function() {
    //     if (isScroll) {
    //         hasScrolled();
    //         isScroll = false;
    //     }
    // }, 0);

    // function hasScrolled() {
    //     var st = $(this).scrollTop();

    //     if (Math.abs(lastScrollTop - st) <= delta)
    //         return;
    //     if (st > lastScrollTop && st > navbarHeight){
    //         $('.nav-init').css('display', 'none');
    //         $('#host_header').css('height', '80');
    //     } else {
    //         if(st + $(window).height() < $(document).height()) {
    //             $('.nav-init').css('display', 'block');
    //             $('#host_header').css('height', '130');
    //         }
    //     } lastScrollTop = st;
    // }

    // 툴팁 노출
    setTimeout(function(){
        $('.td_tooltip').mouseenter(function(){
            $('.pop',this).show();
        })
        .mouseleave(function(){
            $('.pop',this).hide();
        });                    
    },0);
});

//레이어 팝업
var popup = function(idx){
    var pop_x = -($("#popup_"+idx).width() / 2);
    var pop_y = -($("#popup_"+idx).height() / 2);
    $(".popup").css({'z-index':1031});
    $("#bg_opacity").fadeIn();
    $("#popup_"+idx).css({'margin-left':pop_x, 'margin-top':pop_y, 'z-index':1032}).fadeIn();
    $("body").addClass("modal-open");
}

//통계용 csv 다운로드
function exportCsvDown(tableId, fileName) {
    var defaultUrl = "/index/csv_export";
    var tableJson = JSON.stringify($('#' + tableId).tableToJSON());
    var strForm = "<form id='send_form' name='send_form' method='post' action='" + defaultUrl + "'>";
    strForm += "<input type='hidden' id='table_json' name='table_json'>";
    strForm += "<input type='hidden' id='file_name' name='file_name'>";
    strForm += "</form>";
    $(document.body).append(strForm);
    $("#table_json").val(tableJson);
    $("#file_name").val(fileName);
    $("#send_form").submit();
}

//숫자형 3자리 , 추가
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
//콤마 제거
function uncomma(x) {
    return x.toString().replace(/[^\d]+/g, '');
}

function inputNumberFormat(obj) {
    obj.value = numberWithCommas(uncomma(obj.value));
}