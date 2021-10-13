
// 팝업 닫기
function layer_close(){
    $('.pop_common, .bg_opacity').fadeOut(150);
}

// 삭제하기 팝업 노출
function pop_review_del(){
    $('.pop_review_del').fadeIn(150);
    $('.bg_opacity').fadeIn(150);
}

//// 리뷰 팝업 (7일동안 보지않기)
//var $btn_close_review = $('.pop_review_info button');
//var cookiedata = document.cookie;
//
//function setCookie( name, value, expiredays ) { // 쿠키 설정
//    var todayDate = new Date();
//    todayDate.setDate( todayDate.getDate() + expiredays );
//    document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";"
//}
//
//if ( cookiedata.indexOf("pop_review_del=done") < 0 ){ // 쿠키 유무
//    $('.pop_review_info, .bg_opacity').show();
//    $('.pop_review_info').addClass('show');
//    
//}else{
//    $('.pop_review_info, .bg_opacity').hide();
//    $('.pop_review_info').removeClass('show');
//}
//
//$btn_close_review.click(function(){ // 닫기 버튼
//    if ($('#chk_review_info').is(':checked')){
//        setCookie( "pop_review_del", "done" , 7 );
//        $('.pop_review_info, .bg_opacity').fadeOut(150);
//        $('.pop_review_info').removeClass('show');
//    }else{
//        $('.pop_review_info, .bg_opacity').fadeOut(150);
//        $('.pop_review_info').removeClass('show');
//    }
//});

/* jQuery */
$(function(){

	// 리뷰 팝업
	$('.review_list .top').each(function(){
		$('.pop_open',this).mouseenter(function(e){
			var parent = $(this).parent()
			$('.pop:eq(0)',parent).fadeIn(200);
		});
		$('.pop',this).mouseleave(function(){
			$(this).fadeOut(200);
		});

		$('.pop_open_02',this).mouseenter(function(e){
			var parent = $(this).parent()
			$('.pop:eq(0)',parent).fadeIn(200);
		});
		$('.pop',this).mouseleave(function(){
			$(this).fadeOut(200);
		});
	});
	
    // 상세사유보기 토글 버튼
    $('.mo_memo_btn').on('click', function () {
        console.log('dd');
        var self = $(this);
        var $memo = $(this).next('.mo_memo').stop().slideToggle('fast', function () {
            if ($memo.css('display') == 'block') {
                self.text('상세사유닫기');
            } else {
                self.text('상세사유보기');
            }
        });
    });    

    // 리뷰 갤러리
	$('.pic .owl-carousel').each(function(){
        
		$(this).owlCarousel({ // 2개이상
			lazyLoad : true,
			slideSpeed : 800,
			stagePadding: 115,
			items:2,
			loop:false,
			margin:10,
        });
        
        setTimeout(function(){ // 이미지 Fade 효과
            $('.review_list .pic').addClass('show');
        },200);
    });    
    
});  