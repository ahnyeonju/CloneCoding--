function jsDayCheck(strValue)
{
    var chk1 = /^(19|20)\d{2}-([1-9]|1[012])-([1-9]|[12][0-9]|3[01])$/;
    var chk2 = /^(19|20)\d{2}-([0][1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/;

    if (strValue == "")
    {
        return false;
    }

    if (chk1.test(strValue) == false && chk2.test(strValue) == false)
    {
        return false;
    }

    var bDateCheck = true;
    var arrDate = strValue.split("-");
    var nYear = Number(arrDate[0]);
    var nMonth = Number(arrDate[1]);
    var nDay = Number(arrDate[2]);

    if (nYear < 1900 || nYear > 3000)
    { // 사용가능 하지 않은 년도 체크
        bDateCheck = false;
    }

    if (nMonth < 1 || nMonth > 12)
    { // 사용가능 하지 않은 달 체크
        bDateCheck = false;
    }

    // 해당달의 마지막 일자 구하기
    var nMaxDay = new Date(new Date(nYear, nMonth, 1) - 86400000).getDate();
    if (nDay < 1 || nDay > nMaxDay)
    { // 사용가능 하지 않은 날자 체크
        bDateCheck = false;
    }

    return bDateCheck;
}

$(function(){

	/* 달력 */
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1;	

	var oldMethod = $.datepicker._generateMonthYearHeader;
	$.datepicker._generateMonthYearHeader = function(){
		var html = $("<div />").html(oldMethod.apply(this,arguments));
		var monthselect = html.find(".ui-datepicker-month");
		monthselect.insertAfter(monthselect.next());
		return html.html();
	}

	$('.btn_date .date_view b').html(mm+'.'+''+dd+' - '+mm+'.'+''+dd); // 오늘 날짜 셋팅
	
	$('.btn_date').click(function(e){ // 트리거 클릭 
		e.preventDefault();
		dateopen_trigger();
	});

	$('.detail .btn_date').click(function(){
		$('.comiseo-daterangepicker').addClass('detail_picker');
		if ($('.comment div').hasClass('clamp')){
			null;
		}else{
			$('.comment button').trigger('click');
		}
	});

	$(".product_date").daterangepicker({ // Date Range Picker 
		dateFormat : 'mm.dd',
		applyButtonText : '선택 완료',
		datepickerOptions : {
			numberOfMonths : 1,
            minDate: 0,
            maxDate: 60
		}
	});

    if (jsDayCheck($('#sel_date').val()) === true ||
        jsDayCheck($('#sel_date2').val()) === true) {
        if ($(".product_date").length > 0) {
            /*var sel_date = $('#sel_date').val().split('-');
            var sel_date2 = $('#sel_date2').val().split('-');*/
            var sel_date = $('#product_filter_form').data('sel_date').split('-');
            var sel_date2 = $('#product_filter_form').data('sel_date2').split('-');

            var diff_day = (
                    Math.floor(new Date(sel_date2[0], (sel_date2[1] - 1), sel_date2[2], 0, 0, 0).getTime() / 1000) -
                    Math.floor(new Date(sel_date[0], (sel_date[1] - 1), sel_date[2], 0, 0, 0).getTime() / 1000)
                ) / 86400;

            $('.btn_date').find('.date_view b')
                .html(xReturnNumber(sel_date[1]) +'.'+ xReturnNumber(sel_date[2]) +' ~ '+ xReturnNumber(sel_date2[1]) +'.'+ xReturnNumber(sel_date2[2]));
            $('.btn_date').find('.date_view em')
                .html('&nbsp;·&nbsp;'+ diff_day +'박');

            $(".product_date").daterangepicker("setRange", {
                start: new Date(sel_date[0], (sel_date[1] - 1), sel_date[2], 0, 0, 0),
                end: new Date(sel_date2[0], (sel_date2[1] - 1), sel_date2[2], 0, 0, 0)
            });
        }
    }

	$(".product_date").on('daterangepickerclose', function(event, data) {  // 선택완료
		$('.bg_datepicker').hide();
		$('body html').css('overflow','hidden');
		prevent_scroll_off();
		$('.mobile').removeClass('ovy_hide');
	});
});

function dateopen_trigger(){ // Datepicker 오픈 트리거
	var title = "일정 선택"; 
	$('.comiseo-daterangepicker-triggerbutton').trigger('click');
	var html_content = '<div class="bg_datepicker"><strong class="title">'+title+'</strong></div>'
	$('body').append(html_content);
	$('.mobile').addClass('ovy_hide');
	prevent_scroll();
}
