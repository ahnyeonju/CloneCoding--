function get_version_of_IE() {

	var word;
	var version = "N/A";

	var agent = navigator.userAgent.toLowerCase();
	var name = navigator.appName;

	// IE old version ( IE 10 or Lower )
	if (name == "Microsoft Internet Explorer") word = "msie ";

	else {
		// IE 11
		if (agent.search("trident") > -1) word = "trident/.*rv:";

		// IE 12  ( Microsoft Edge )
		else if (agent.search("edge/") > -1) word = "edge/";
	}

	var reg = new RegExp(word + "([0-9]{1,})(\\.{0,}[0-9]{0,1})");

	if (reg.exec(agent) != null) version = RegExp.$1 + RegExp.$2;

	return version;
}

if (Number(get_version_of_IE()) < 9) {
	if (confirm("'여기어때'에서 지원하지 않는 브라우저로 접속하셨습니다.\n\n안전한 접속을 위해서 최신 브라우저로 접속해주세요.\n\n※ '확인'을 누르시면 최신 브라우저 다운로드 페이지로 이동합니다.\n※ '취소'를 누르시면 현재 페이지를 종료합니다.")) {
		location.replace('http://browsehappy.com/?locale=ko_KR');
	} else {
		window.open("about:blank", "_self").close();
	}
}

Date.prototype.format = function (f) {
	if (!this.valueOf()) return " ";

	var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
	var d = this;

	return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function ($1) {
		switch ($1) {
			case "yyyy": return d.getFullYear();
			case "yy": return (d.getFullYear() % 1000).zf(2);
			case "MM": return (d.getMonth() + 1).zf(2);
			case "dd": return d.getDate().zf(2);
			case "E": return weekName[d.getDay()];
			case "HH": return d.getHours().zf(2);
			case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
			case "mm": return d.getMinutes().zf(2);
			case "ss": return d.getSeconds().zf(2);
			case "a/p": return d.getHours() < 12 ? "오전" : "오후";
			default: return $1;
		}
	});
};

String.prototype.string = function (len) { var s = '', i = 0; while (i++ < len) { s += this; } return s; };
String.prototype.zf = function (len) { return "0".string(len - this.length) + this; };
Number.prototype.zf = function (len) { return this.toString().zf(len); };

var XSSfilter = function (content) {
	return content
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#039;")
		.replace(/\\/g, "\\\\");
};

//Jquery 쿠키 JSON list
(function ($) {
	$.fn.extend({
		cookieList: function (cookieName, expires, key) {
			key = key === undefined ? 'adr' : key;
			expires = expires === undefined ? 360 : expires;

			return {
				add: function (val) {
					var array = this.items();

					if (!this.xIsNumber(this.hasitem(val))) {
						array.push(val);

						var inStr = JSON.stringify(array);
						$.cookie(cookieName, inStr, { expires: expires, path: '/' });
					} else {
						this.setFirst(this.hasitem(val));
					}
					if (this.length() > 5) this.remove(0);
				},
				setFirst: function (index) {
					var items = this.items();
					var new_item = items[index];

					if (index != -1) {
						items.splice(index, 1);
						items.push(new_item);
						$.cookie(cookieName, JSON.stringify(items), { expires: expires, path: '/' });
					}
				},
				remove: function (index) {
					var items = this.items();

					if (index != -1) {
						items.splice(index, 1);
						$.cookie(cookieName, JSON.stringify(items), { expires: expires, path: '/' });
					}
				},
				indexOf: function (val) {
					return this.items().indexOf(val);
				},
				clear: function () {
					$.cookie(cookieName, null, { expires: 0, path: '/' });
				},
				items: function () {
					var cookie = $.cookie(cookieName);
					return typeof (cookie) == 'string' ? JSON.parse(cookie) : [];
				},
				hasitem: function (val) {
					for (var k in this.items()) {
						var entry1 = JSON.stringify(this.items()[k][key]);
						var val1 = JSON.stringify(val[key]);
						if (val1 == entry1) {
							//console.log("key:"+k);
							return k;
						}
					}
				},
				length: function () {
					return this.items().length;
				},
				xIsNumber: function (str) {
					var num_check = /^[0-9]*$/;

					if (num_check.test(str)) {
						return true;
					} else {
						return false;
					}
				}
			};
		}
	});
})(jQuery);

var yeogiUser = {
	idCheck: function (id) {
		var regExp = /[0-9a-zA-Z][_0-9a-zA-Z-]*@[_0-9a-zA-Z-]+(\.[_0-9a-zA-Z-]+){1,2}$/;
		return regExp.test(id);
	},

	pwCheck: function (pw) {
		pw = pw.trim();
		if (pw == '') return false;
		return true;
	}
};

// 앞자리 0
function xZeros(n, digits) {
	var zero = '';
	n = n.toString();

	if (n.length < digits) {
		for (var i = 0; i < digits - n.length; i++)
			zero += '0';
	}
	return zero + n;
}

$.extend({
	xResponse: function (url, data, options) {
		data = data === undefined ? '' : data;

		var defaults = {
			type: 'post',
			dataType: 'json',
			loading: false,
			async: false,
			// message: '정상적인 접근이 아닙니다.'
		};

		options = $.extend({}, defaults, options);

		var ajax = $.ajax({
			url: url,
			type: options.type,
			data: data,
			dataType: options.dataType,
			async: options.async,
			cache: false,
			error: function (x, e) {
				// // TODO: 삼성폰에서만 발생하는 에러팝업
				// if (navigator.userAgent.match('SAMSUNG') == null) alert_Msg(options.message);
				// console.log(options.message);
			}
		});

		return ajax;
	}
});


// 콤마삽입
function comma(str) {
	str = String(str);
	return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}

// 문자열 숫자 반환
function xReturnNumber(str) {
	var num_check = /^[0-9]*$/;

	if (num_check.test(str)) {
		if (str.length == 0) return 0;
		return parseInt(str)
	} else {
		return 0;
	}
}

/* 인풋 리셋 버튼 */
function btn_reset() {

	$('.inp_type_1 input, .inp_type_2 input, .inp_wrap input, .mobile .wrap_inp input').each(function () {
		var html = '<button type="button" class="reset_val">초기화</button>';

		if ($(this).parent().hasClass('remove')) {
			null;
		} else {
			$(this).parent().append(html);

			var wrap = $(this).parent();

			$('.reset_val').each(function () {
				$(this).click(function () {

					var wrap = $(this).parent();
					$('input', wrap).val('');
					$(this).removeClass('show');
					$('input', wrap).focus();

				});
			});

			$(this).on('input', function () {
				$('button', wrap).addClass('show');
			});

			$(this).focus(function () {
				$(this).parent().addClass('inp_ok');

				var this_val = $(this).val();
				if (this_val == "") {
					null;
				}
				else {
					$('button', wrap).addClass('show');
				}
			});
			$(this).blur(function () {
				$(this).parent().removeClass('inp_ok');
			});
		}

	});
}

/* 상단으로 버튼 */
function moveTop() {
	$("html, body").animate({ scrollTop: 0 }, 600);
}

/* 페이지 전체 로드후 */
window.onload = function () {
	$('.spinner').fadeOut(250);
	$('.wrap').addClass('show');
	//$('footer').addClass('show');
	pic_resize();
	btn_reset();
}

/* Spinner */
function spinner_show() { // Show
	var target_parent = $('.add_spin');
	if ($('.spinner').length == 0) {
		target_parent.append('<div class="spinner"><span></span></div>');
	}
	$('.spinner').fadeIn(250);
}
function spinner_hide() { // Hide
	$('.spinner').fadeOut(250);
}
spinner_show();

/* Lazyload Image */
function lazyload() {
	$(".pc img.lazy").lazyload({ effect: "fadeIn" });
	$(".mobile img.lazy").lazyload();
}

/* 시스템 메세지 팝업 */
function align_vertical() { // 시스템 팝업 세로 정렬
	var target = $('.popup_cont');
	var pop_h = target.height();
	var val = pop_h / 2
	target.css('margin-top', -val);
}

function align_verticalAll(target) { // 공통 세로 정렬
	var target = $('.' + target);
	var pop_h = target.height();
	var val = pop_h / 2
	target.css('margin-top', -val);
}

function pop_ok(reload) { // 시스템 팝업 확인버튼
	$('.alert_msg').fadeOut(200);
	$('.alert_msg').remove();
	if (reload) location.reload(true);
}

// [홈] 비회원 예약 내역조회
$.reserveDetail_guest = function () {
	var regPhone = /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/;
	var regDono = /^([0-9]+)$/;
	var uphone = $('form[name=reserveDetail_guest] input[name=uphone]').val();
	var do_no = $('form[name=reserveDetail_guest] input[name=do_no]').val();

	if (regPhone.test(uphone) == false) {
		$('form[name=reserveDetail_guest] input[name=uphone]').next().show();
		$('form[name=reserveDetail_guest] input[name=uphone]').parent().addClass('inp_error');
		$('form[name=reserveDetail_guest] input[name=uphone]').parent().find('span').html('휴대폰번호를 올바르게 입력해주세요.');
		return false;
	}

	$('form[name=reserveDetail_guest] input[name=uphone]').parent().removeClass('inp_error');
	$('form[name=reserveDetail_guest] input[name=uphone]').parent().find('span').hide();
	$('form[name=reserveDetail_guest] input[name=uphone]').parent().find('span').html('');

	if (regDono.test(do_no) == false) {
		$('form[name=reserveDetail_guest] input[name=do_no]').next().show();
		$('form[name=reserveDetail_guest] input[name=do_no]').parent().addClass('inp_error');
		$('form[name=reserveDetail_guest] input[name=do_no]').parent().find('span').html('예약번호를 올바르게 입력해주세요.');
		return false;
	}

	pop_ok();

	$('form[name=reserveDetail_guest] input[name=do_no]').parent().removeClass('inp_error');
	$('form[name=reserveDetail_guest] input[name=do_no]').parent().find('span').hide();
	$('form[name=reserveDetail_guest] input[name=do_no]').parent().find('span').html('');

	$.ajax({
		type: 'POST',
		async: false,
		cache: false,
		url: '/reservation/isReserveCheck_non',
		dataType: 'json',
		data: $('form[name=reserveDetail_guest]').serialize(),
		success: function (data) {
			if (data.code == 200) {
				location.href = '/my/reserveList/' + do_no;
			} else {
				alert_Msg('예약내역이 존재하지 않습니다.');
			}
		},
		error: function (request, status, error) {
			// alert("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
		}
	});
}

function alert_Msg(msg, link, url, reload) { // 시스템 팝업
	var msgStr = msg.toString();
	if (link == 1) { // 링크용
		var content = '<div class="alert_msg box_shadow"><div class="msg popup_cont"><div class="text">' + msgStr + '</div><div class="btn_center"><a href="' + url + '">확인</a></div></div></div>'
	} else { // 기본
		var content = '<div class="alert_msg box_shadow"><div class="msg popup_cont"><div class="text">' + msgStr + '</div><div class="btn_center"><button onclick="pop_ok(' + reload + ');">확인</button></div></div></div>'
	}
	$('body').append(content);
	$('.alert_msg').fadeIn(200);
	align_vertical();
}

function pop_twobtn(el, msg, name1, name2, function_1, function_2) { // 2버튼 팝업 - 엘리먼트 네임 /메세지 / 버튼1 이름 / 버튼2 이름 / 버튼1 펑션 / 버튼2 펑션
	var msgStr = msg.toString();
	$('.pop_twobtn').remove();
	var content = '<div class="layer popup_cont pop_twobtn ' + el + '"><div class="text">' + msgStr + '</div><div class="btn_wrap"><button onclick="' + function_1 + '">' + name1 + '</button><button onclick="' + function_2 + '" class="col_mint">' + name2 + '</button></div></div>'
	$('body').append(content);
	$('.' + el).fadeIn(200);
	$('.bg_dimm').fadeIn(150);
	align_vertical();
}

function eventPopup(message, buttonName, url) { // 이벤트 팝업

	// var content = '<div class="alert_msg box_shadow"><div class="msg popup_cont"><div class="text">' + message + '</div><div class="btn_center"><a href="' + url + '" target="_blank">' + buttonName + '</a><a href="#none" class="button-close">닫기</a></div></div></div>'
	//
	// $('body').append(content);
	// $('.alert_msg').fadeIn(200);
	// align_vertical();
}

/* 모바일 메뉴 오픈 */
var iscroll_03;
function iscroll_run_03() {
	iscroll_03 = new IScroll('.scroll_nav', {
		interactiveScrollbars: true,
		shrinkScrollbars: 'scale',
		fadeScrollbars: true,
		click: true,
		mouseWheel: true
	});
}
function nav_open() { // 열기
	$('.menu_wrap').show();
	$('.gnb_opacity').fadeIn(250);
	$('.menu_wrap .menu').stop().animate({ left: 0, right: 56 }, '100');
	iscroll_run_03();
	iscroll_03.refresh();
	$('.menu_wrap').bind('touchmove', function (i) { i.preventDefault() });
	$('.gnb_opacity').bind('touchmove', function (i) { i.preventDefault() });
}

/* HTML,BODY Prevent */
function prevent_on() {
	$('body').addClass('lock_on');
	$('html').addClass('lock_on');
}
function prevent_off() {
	$('body').removeClass('lock_on');
	$('html').removeClass('lock_on');
}

/* 상세조건(필터) 오픈 */
function filter_open() {
	$('.bg_opacity').fadeIn(150);
	$('.filter_wrap').fadeIn(150);
	$('body').append('<div class="bg_opacity"></div>');
	prevent_on();
}
function filter_close() { // 닫기
	$('.filter_wrap').fadeOut(150);
	$('.bg_opacity').remove();
	prevent_off();
	prevent_scroll_off();
}

/* TODO: //검색 오픈 */
var iscroll_04;
function iscroll_run_04() { // iscroll 검색창
	iscroll_04 = new IScroll('.scroll_srch', {
		scrollbars: true,
		mouseWheel: true,
		interactiveScrollbars: true,
		shrinkScrollbars: 'scale',
		click: true
	});
}

function srch_open() {
	var timerId = 0;
	var win_w = $(window).width();
	var mask_element = '<div class="srch_mask" onclick="srch_close();">&nbsp;</div>';

	$('.pc .recommend_srch').append(mask_element);
	$('.pc .srch_mask').addClass('on');

	if (win_w > 1023) { // PC
		if ($('.pc .srch_bar').css('display') == 'block') {
			if ($('#keyword').val().length > 0)
				window.location.href = "/product/result?keyword=" + encodeURI($('#keyword').val());
			else
				alert_Msg('검색어가 없습니다. <br>검색어를 입력하세요.');

			return false;
		} else {
			$('.pc .btn_srch').stop().animate({ right: 797 }, '150', function () {
				$('.pc .srch_bar').fadeIn(150);
				$('.srch_bar .wrap_inp input').focus();
			});
			$('.recommend_srch').fadeIn(150);
			$('.gnb_pc').fadeOut(150);
		}
	} else { // Mobile
		$('.mobile .srch_bar').fadeIn(150);
		$('.mobile .recommend_srch').fadeIn(150);

		$('.srch_bar .wrap_inp .btn_srch').on('click', function () {
			if ($('#keyword').val().length > 0)
				window.location.href = "/product/result?keyword=" + $('#keyword').val();
			else
				alert_Msg('검색어가 없습니다. <br>검색어를 입력하세요.');
		});
	}

	$('.recommend_srch .default').hide();
	$.xResponse('/product/get_recommend_non').done(function (result) {
		if (result.count > 0) {
			var items = [];
			$.each(result.data, function (k, recommend) {
				items.push('<li><a href="/product/result?keyword=' + recommend + '">' + recommend + '</a></li>');
			});

			$('.recommend_srch .default ul').html(items.join(''));
			$('.recommend_srch .default').show();
		}
	});

	$('#keyword').off('keyup');
	$('#keyword').on('keyup', function () {
		var keyword = XSSfilter($(this).val());

		$('.recommend_srch .default').hide();
		$('.recommend_srch .chain').show();

		if (xReturnNumber(timerId) > 0)
			window.clearTimeout(timerId);

		timerId = window.setTimeout(function () {
			if (keyword.length > 0) {
				$.xResponse('/product/get_autocomplete_non', { keyword: keyword }, { async: true }).done(function (result) {
					if (result.data.yeogi.length > 0) {
						if (win_w > 1023) { // PC
							$('.recommend_srch .scroll_srch').show();
						} else {
							$('.mobile .recommend_srch').show();
						}

						var items = [];
						$.each(result.data.yeogi, function (k, autocomplete) {
							var href = '';
							if (autocomplete.type == 'AD') {
								href = '/product/detail?ano=' + autocomplete.id;
							} else if (autocomplete.atcType == 'product') {
								href = '/product/detail?ano=' + autocomplete.id;
							}
							else {
								var query_string = '?keyword=' + autocomplete.displayText;

								if (autocomplete.type == 'CATEGORY' || autocomplete.type == 'AREA')
									query_string += '&type=' + autocomplete.type;

								href = '/product/result' + query_string;
							}


							items.push(
								'<li><a href="' + href + '" >' +
								autocomplete.displayText.replace(new RegExp(keyword, 'ig'), "<b>" + keyword + "</b>") +
								'</a></li>'
							);
						});

						$('.recommend_srch .chain ul').html(items.join(''));

						iscroll_04.refresh(); // iscroll refresh
					} else {
						if (win_w > 1023) { // PC
							$('.recommend_srch .scroll_srch').hide();
						} else {
							$('.mobile .recommend_srch').hide();
						}

						$('.recommend_srch .chain').hide();
					}
				});
			} else {
				if (win_w > 1023) { // PC
					$('.recommend_srch .scroll_srch').show();
				} else {
					$('.mobile .recommend_srch').show();
				}

				$('.recommend_srch .default').show();
				$('.recommend_srch .chain ul').html('');
			}

			timerId = 0;
		}, 200);
	});

	$('#keyword').off('keydown');
	$('#keyword').keydown(function (key) {
		if (key.keyCode == 13) {
			if ($(this).val().length > 0)
				window.location.href = "/product/result?keyword=" + encodeURI($(this).val());
			else
				alert_Msg('검색어가 없습니다.  <br>검색어를 입력하세요.');
		}
	});

	iscroll_run_04(); // iscroll Run
}

function srch_result_open() { // 검색결과 진입시 노출바
	var timerId = 0;
	var win_w = $(window).width();
	if (win_w > 1023) { // PC
		null;
	} else { // Mobile
		$('.mobile .srch_bar').fadeIn(150);
		$('.mobile .srch_bar input').val($('#keyword_input').val());

		$('.srch_bar .wrap_inp button').on('click', function () {
			if ($('#keyword').val().length > 0)
				window.location.href = "/product/result?keyword=" + encodeURI($('#keyword').val());
			else
				alert_Msg('검색어가 없습니다. <br>검색어를 입력하세요.');
		});

		$('#keyword').off('keyup');
		$('#keyword').on('keyup', function () {
			var keyword = XSSfilter($(this).val());

			$('.recommend_srch .default').hide();
			$('.recommend_srch .chain').hide();
			$('.mobile .recommend_srch').hide();

			if (xReturnNumber(timerId) > 0)
				window.clearTimeout(timerId);

			timerId = window.setTimeout(function () {
				if (keyword.length > 0) {
					$.xResponse('/product/get_autocomplete_non', { keyword: keyword }, { async: true }).done(function (result) {
						if (result.count > 0) {
							$('.recommend_srch .chain').show();
							$('.mobile .recommend_srch').show();

							var items = [];
							$.each(result.data.yeogi, function (k, autocomplete) {
								var query_string = '?keyword=' + autocomplete.keyword;

								if (autocomplete.type == 'CATEGORY' || autocomplete.type == 'AREA')
									query_string += '&type=' + autocomplete.type;

								items.push(
									'<li><a href="/product/result' + query_string + '" >' +
									autocomplete.keyword.replace(new RegExp(keyword, 'ig'), "<b>" + keyword + "</b>") +
									'</a></li>'
								);
							});

							$('.recommend_srch .chain ul').html(items.join(''));

						}
					});
				}

				timerId = 0;
			}, 200);
		});

		$('#keyword').off('keydown');
		$('#keyword').keydown(function (key) {
			if (key.keyCode == 13) {
				if ($(this).val().length > 0)
					window.location.href = "/product/result?keyword=" + encodeURI($(this).val());
				else
					alert_Msg('검색어가 없습니다.  <br>검색어를 입력하세요.');
			}
		});

		$('#keyword').off('focus');
		$('#keyword').focus(function () {
			setTimeout((function (el) {
				var strLength = el.value.length;
				if (strLength > 0)
					$('#keyword').trigger('keyup');

				return function () {
					if (el.setSelectionRange !== undefined) {
						el.setSelectionRange(strLength, strLength);
					} else {
						$(el).val(el.value);
					}
				}
			}(this)), 0);
		});

	}
}

function srch_close() { // 닫기
	var win_w = $(window).width();

	$('#keyword').val(""); // 값 초기화
	$('.recommend_srch .chain').hide();
	$('.srch_mask').remove();
	if (win_w > 1023) { //PC
		$('.pc .srch_bar').fadeOut(150);
		$('.pc .btn_srch').stop().animate({ right: 396 }, '150');
		$('.pc .gnb_pc').fadeIn(150);
		$('.recommend_srch').fadeOut(150);
	} else { // Mobile
		$('.fix_srch').fadeOut(150); // 검색결과페이지 검색바 숨김
		$('.mobile .srch_bar').fadeOut(150);
		$('.mobile .recommend_srch').fadeOut(150);
		prevent_off();
	}
}

/* 환경 체크 */
function chk_device() {
	var win_w = $(window).width();
	if (win_w > 1023) { // PC
		$('body').removeClass('mobile').addClass('pc');
	} else { // Mobile
		$('body').removeClass('pc').addClass('mobile');
	}
}
chk_device();

/* 스크롤 막기 */
function prevent_scroll() {
	$(window).bind('touchmove', function (e) { e.preventDefault() });
}
function prevent_scroll_off() { // 해제
	$(window).unbind('touchmove');
}

/* 팝업 > 노출 */
function pop_layer_w(el) {  // layer_w 공통 노출
	var target = $('.' + el);
	$('body').addClass('ovy_hide');
	$('html').addClass('ovy_hide');
	target.fadeIn(150);

	if ($(this).attr('href') !== undefined && $(this).attr('href') != '') {
		target.find('input[name="return_url"]').val($(this).attr('href'));
	}

	if (el == 'pop_mem_reserve') {
		target.find('.fix_title strong').html('예약 내역 조회').removeClass('logo');
		target.find('.link_half').hide();
		target.find('.link').show();
		target.find('.link a').attr('href', $(this).attr('href'));
	}

	if (el == 'pop_login') {
		target.find('.fix_title strong').html('여기어때').addClass('logo');
		target.find('.link_half').show();
		target.find('.link').hide();
		target.find('.link_half a').attr('href', $(this).attr('href'));
	}
	// 탈퇴팝업
	if (el == 'new_pop_withdraw') {
		withdrawInit(target);
	}
	var i = 0;
	var f_input;
	//	if (target.find('input').length > 0) {
	//        target.find('input').each(function () {
	//            if ($(this).attr('type') != 'hidden') {
	//                if(i == 0)
	//                    f_input = $(this);
	//                i++;
	//                $(this).val('');
	//                $(this).trigger('focus');
	//
	//				setTimeout(function(){
	//					$('.and .pop_login').addClass('focus');
	//				},300);
	//
	//            }
	//        });
	//
	//        if (i > 0)
	//            f_input.focus();
	//    }

	prevent_scroll();
}

function layer_w_close() { // layer_w 공통 닫기
	$('body').removeClass('ovy_hide');
	$('html').removeClass('ovy_hide');
	$('.layer_w').hide();
	prevent_scroll_off();
}

/* 팝업닫기 공통*/
function close_layer() { // close_layer 클래스 닫기
	//	prevent_off();
	prevent_scroll_off();
	$('.bg_dimm').fadeOut(150);
	$('.layer').fadeOut(150);
	$('.close_layer').fadeOut(150);
	$('.marker_fix').remove();
	$('.pop_map').removeClass('location_reset');
}

/* 스핀바 + 마스트 + 스크롤 방지 */
function spin_dimm() {
	spinner_show();
	$('.bg_dimm_prevent').fadeIn(150);
	prevent_scroll();
}
function spin_dimm_off() {
	spinner_hide();
	$('.bg_dimm_prevent').fadeOut(150);
	prevent_scroll_off();
}

/* 팝업 - 사업자 정보 확인 */
function pop_licence() {
	var num = '7428600224';
	var url = "http://www.ftc.go.kr/info/bizinfo/communicationViewPopup.jsp?wrkr_no=" + num;
	window.open(url, "communicationViewPopup", "width=750, height=700;");
}

/* GNB 배경 */
function chk_gnb() {
	var scroll_val = $(window).scrollTop();
	if (scroll_val == 0) {
		$('header').removeClass('scroll');
	} else if (scroll_val > 400) {
		$('header').addClass('scroll');
		$('.btn_go_top').fadeIn(200);
	} else {
		$('header').addClass('scroll');
		$('.btn_go_top').fadeOut(200);
	}
}
chk_gnb();

/* Jquery */
$(function () {

	/* Android 체크 */
	var ua = navigator.userAgent.toLowerCase(),
		isAndroid = ua.indexOf("android") > -1;
	iOS = ua.match(/(iphone|ipod|ipad)/);
	if (isAndroid) {
		$('body').addClass('and');
	}
	if (iOS) {
		$('body').addClass('ios');
	}

	$('.click_prevent').each(function () { // a 태그 이동 막기
		$(this).click(function (e) {
			e.preventDefault();
		});
	});

	/* Input Focus 효과 */
	$('.inp_type_1 input').each(function () {
		$(this).focusin(function () { // 포커스 인
			$(this).parent().addClass('inp_focus');
			$('.and .pop_login').addClass('focus');
		});

		$(this).focusout(function () { // 포커스 아웃
			$(this).parent().removeClass('inp_focus');
			$('.and .pop_login').removeClass('focus');
		});
	});

	/* GNB 서브메뉴 노출 */
	$('.gnb_pc .over').each(function (e) {
		$(this).mouseenter(function () {
			$('ul', this).stop().fadeIn(150);
		});
		$(this).mouseleave(function () {
			$('ul', this).stop().fadeOut(150);
		});
	});

	/* 리사이즈 시 */
	$(window).resize(function () {
		var win_w = $(window).width()
		chk_device(); // PC/MOBILE 체크
		pic_resize();
		if (win_w > 1023) { // PC에서만
			srch_close(); // 검색바 초기화
			close_layer(); // 레이어 숨기기
			layer_w_close(); // 레이어 숨기기(_w)
		}
	});

	/* 모바일 메뉴 닫기 (배경 클릭) */
	$('.gnb_opacity').bind('touchstart click', function () {
		$('.menu_wrap').hide();
		$('.gnb_opacity').fadeOut(250);
		$('.menu_wrap .menu').stop().animate({ left: -1000, right: 1000 }, '100');
		$('.menu_wrap').unbind('touchmove');
		$('.gnb_opacity').unbind('touchmove');
		iscroll_03.destroy();
	});

	/* 모바일 메뉴 2depth */
	$('.has_ul').on('click', function (e) {
		e.preventDefault();
		if ($(this).hasClass('open')) {
			$(this).removeClass('open');
			$(this).next().hide();
			iscroll_03.refresh();
		} else {
			$(this).addClass('open');
			$(this).next().show();
			iscroll_03.refresh();
		}
	});

	/* 헤더 스크롤 효과 */
	$(window).scroll(function () {
		chk_gnb();
	});

	/* 필터 접기,모두 보기 버튼 효과 */
	$('.filter_wrap section strong button').each(function () {
		$(this).click(function () {
			if ($(this).hasClass('on')) {
				$(this).parent().next().removeClass('show');
				$(this).removeClass('on');
				$(this).text('모두 보기');
			} else {
				$(this).addClass('on');
				$(this).parent().next().addClass('show');
				$(this).text('접기');
			}
		});
	});

	/* 광고오버시 팝업 (차후 product.js 정리되면 이동) */
	$('.list_wrap .title span').each(function () {
		$(this).click(function () {
			var product_txt = $(this).prev().text();
			var content = '<p class="pop_add box_shadow">' + product_txt + ' 상품 광고입니다.</p>';
			$(this).append(content);
			$('.pop_add').stop().fadeIn(200);
			setTimeout(function () {
				$('.pop_add').fadeOut(200);
				setTimeout(function () {
					$('.pop_add').remove();
				}, 200);
			}, 1000);
		});
	});

	/* 이미지 누락업체 썸네일 조정 (차후 product.js 정리되면 이동) */
	$(".pic img[data-original*='list_none']").each(function () {
		$(this).css('width', '100%');
		$(this).css('height', '100%');
		$(this).css('margin', '0');
	});
});
/* //Jquery */

/* 썸네일 이미지 위치 수정 */
function pic_resize() { // 광고상품
	$('.list_wrap .align').each(function () {
		var this_h = $(this).height();
		var gap = this_h / 2;
		$(this).css('margin-top', -gap);
	});
	$('.list_4.adcno2 .pic img,.list_4.adcno1 .pic img').each(function () { // 해당리스트 가운데 정렬
		var this_width = $(this).width();
		$(this).css('margin-left', - (this_width / 2));
	});
}
/* //썸네일 이미지 위치 수정 */

// 쿠키 생성
function setCookie(cName, cValue, cDay) {
	var expire = new Date();
	expire.setDate(expire.getDate() + cDay);
	cookies = cName + '=' + escape(cValue) + '; path=/ '; // 한글 깨짐을 막기위해 escape(cValue)를 합니다.
	if (typeof cDay != 'undefined') cookies += ';expires=' + expire.toGMTString() + ';';
	document.cookie = cookies;
}

// 쿠키 가져오기
function getCookie(cName) {
	cName = cName + '=';
	var cookieData = document.cookie;
	var start = cookieData.indexOf(cName);
	var cValue = '';
	if (start != -1) {
		start += cName.length;
		var end = cookieData.indexOf(';', start);
		if (end == -1) end = cookieData.length;
		cValue = cookieData.substring(start, end);
	}
	return unescape(cValue);
}

// TODO: 이동할 쿠키를 생성한다. 다이렉트이동용
$.setAdCookie = function (setConfig) {
	var key = { '_search': randomString() };
	setCookie(key._search, JSON.stringify(setConfig));
	return key._search;
}

function randomString() {
	var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
	var string_length = 10;
	var randomstring = '';

	for (var i = 0; i < string_length; i++) {
		var rnum = Math.floor(Math.random() * chars.length);
		randomstring += chars.substring(rnum, rnum + 1);
	}

	return randomstring;
}

// 예약내역 삭제
function delReserve(do_no, e) {
	$(e).hide();

	$.ajax({
		type: 'POST',
		async: false,
		cache: false,
		url: '/reservation/removeReserveHistory_non',
		dataType: 'json',
		data: { 'do_no': do_no },
		success: function (data) {
			if (data.code == 200) {
				$('li.reserve-detail[data-dono=' + do_no + ']').remove();
				//cnt = Number($('#cancel_cnt').text().match(/([0-9]+)/)[0])-1;
				//$('#cancel_cnt').text(cnt+"건");
				close_layer();

				//if(cnt==0) location.reload(true);
			}
		},
		error: function (request, status, error) {
			$(e).show();
			close_layer();
			// alert("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
		}
	});
}

// 예약내역 심플 삭제
function delReserveSimple(do_no) {
	$.ajax({
		type: 'POST',
		async: false,
		cache: false,
		url: '/reservation/removeReserveHistory_non',
		dataType: 'json',
		data: { 'do_no': do_no },
		success: function (data) {
			if (data.code == 200) {
				location.replace('/my/reserveList');
			}
		},
		error: function (request, status, error) {
			$(e).show();
			close_layer();
			alert("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
		}
	});
}

function timeToDate(timestamp) {

	var date = new Date(Number(timestamp * 1000));
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();
	var hour = date.getHours();
	var min = date.getMinutes();
	var sec = date.getSeconds();

	var retVal = year + ". " + (month < 10 ? "0" + month : month) + ". " + (day < 10 ? "0" + day : day)

	return retVal
}

function str_pad(input, pad_length, pad_string, pad_type) {

	// *     example 1: str_pad('', 30, '-=', 'STR_PAD_LEFT');
	// *     returns 1: '-=-=-=-=-=-foo bar milk'
	// *     example 2: str_pad('foo bar milk', 30, '-', 'STR_PAD_BOTH');
	// *     returns 2: '------foo bar milk-----'

	var half = '',
		pad_to_go;

	var str_pad_repeater = function (s, len) {
		var collect = '',
			i;

		while (collect.length < len) {
			collect += s;
		}
		collect = collect.substr(0, len);

		return collect;
	};

	input += '';
	pad_string = pad_string !== undefined ? pad_string : ' ';

	if (pad_type != 'STR_PAD_LEFT' && pad_type != 'STR_PAD_RIGHT' && pad_type != 'STR_PAD_BOTH') {
		pad_type = 'STR_PAD_RIGHT';
	}
	if ((pad_to_go = pad_length - input.length) > 0) {
		if (pad_type == 'STR_PAD_LEFT') {
			input = str_pad_repeater(pad_string, pad_to_go) + input;
		} else if (pad_type == 'STR_PAD_RIGHT') {
			input = input + str_pad_repeater(pad_string, pad_to_go);
		} else if (pad_type == 'STR_PAD_BOTH') {
			half = str_pad_repeater(pad_string, Math.ceil(pad_to_go / 2));
			input = half + input + half;
			input = input.substr(0, pad_length);
		}
	}

	return input;
}


function get_no_total_pagination(settings, notices, el, scroll) {
	if (settings === undefined || Object.keys(settings).length == 0)
		return false;

	if (scroll === undefined)
		scroll = true;

	var per_page = 5;
	var total_page = xReturnNumber(settings.total_page);
	var cur_page = xReturnNumber(settings.page);

	if (cur_page == 0)
		cur_page = 1;

	var templete =
		'<div class="paging">' +
		'<button v-if="start_page > 1" class="prev" v-on:click="changePage(start_page - 1)">이전</button>' +

		'<template v-for="item in items" v-if="total_page > 1">' +
		'<button v-if="cur_page != item" v-on:click="changePage(item)">{{item}}</button>' +
		'<button v-else class="on" v-on:click="changePage(item)">{{item}}</button>' +
		'</template>' +

		'<button v-if="total_page > end_page" class="next" v-on:click="changePage(end_page + 1)">다음</button>' +
		'</div>';


	// 등록
	Vue.component('my-pagination', {
		template: templete,
		data: function () {
			var start_page = ((Math.floor((cur_page - 1) / per_page)) * per_page) + 1;
			var end_page = start_page + per_page - 1;
			var items = [];

			if (end_page >= total_page) end_page = total_page;
			if (total_page > 1) {
				for (var k = start_page; k <= end_page; k++) {
					items.push(k);
				}
			}

			return {
				per_page: per_page,
				cur_page: cur_page,
				total_page: total_page,
				start_page: start_page,
				end_page: end_page,
				items: items
			}
		},
		methods: {
			changePage: function (cur_page) {
				window.location.hash = cur_page;

				var start_page = ((Math.floor((cur_page - 1) / per_page)) * per_page) + 1;
				var end_page = start_page + per_page - 1;
				var items = [];
				var scroll_ul_top = $('#content').offset().top;

				if ($('body').hasClass('mobile')) {  // 페이징 타겟 엘리먼트 위치
					// Mobile
					var scroll_ul_top_val = scroll_ul_top;
				}
				else {
					// Pc
					var scroll_ul_top_val = scroll_ul_top - 72;
				}

				if (end_page >= total_page) end_page = total_page;
				if (total_page > 1) {
					for (var k = start_page; k <= end_page; k++) {
						items.push(k);
					}
				}

				settings['page'] = cur_page;

				notices.searchTerm(settings);

				this.cur_page = cur_page;
				this.start_page = start_page;
				this.end_page = end_page;
				this.items = items;

				$('.open_list li a').removeClass('open');
				$('.open_list div').hide();

				if (scroll) {
					$('html, body').animate({
						scrollTop: scroll_ul_top_val
					}, 250);
				}
			}
		}
	})

	if (el !== undefined) {
		new Vue({
			el: el
		})
	}
}

var build_query = function (obj, num_prefix, temp_key) {

	var output_string = []

	Object.keys(obj).forEach(function (val) {

		var key = val;

		num_prefix && !isNaN(key) ? key = num_prefix + key : ''

		var key = encodeURIComponent(key.replace(/[!'()*]/g, escape));
		temp_key ? key = temp_key + '[' + key + ']' : ''

		if (typeof obj[val] === 'object') {
			var query = build_query(obj[val], null, key)
			output_string.push(query)
		}

		else {
			var value = encodeURIComponent(obj[val].replace(/[!'()*]/g, escape));
			output_string.push(key + '=' + value)
		}

	})

	return output_string.join('&')

}

function input_validation(check, obj, msg) {
	if (obj.parent().find('span').length == 0) {
		obj.parent().append('<span></span>');
	}

	if (check) {
		obj.parent().find('span').show();
		obj.parent().addClass('inp_error');
		obj.parent().find('span').html(msg);
	} else {
		obj.parent().find('span').hide();
		obj.parent().removeClass('inp_error');
		obj.parent().find('span').html('');
	}

	return check;
}

function getCount(obj) {
	if (obj !== undefined) {
		return obj.length;
	}

	return 0;
}

// 투명배경 + 스핀바 + 텍스트
function spinnerText(msg) {

	var text = msg.toString();
	var content = '<div class="spinner_text"><div><div class="spinner_w"><span></span></div><p>' + text + '</p></div></div>'
	var space = '<div class="spinner_space">&nbsp;</div>'

	$('body').append(content); // 컨텐츠 삽입
	$(space).insertAfter('header'); // 공간 삽입
}

// 상품페이지 + 페이백 뱃지공란 숨기기
function badgeHide() {
	$('.badge').each(function () {
		var this_txt = $('span', this);
		if (this_txt.length == 0) {
			$(this).remove();
		}
	});
}

lazyload(); // 레이지로드

// 링크 제어
$(function () {
	$('header .nav_open').click(function () { // 메뉴 오픈
		nav_open();
	});
	$('header .srch_open').click(function () { // 검색 오픈
		srch_open();
	});
	$('.pop_guest_reserve_open').click(function () { // 비회원 예약내역 조회
		pop_layer_w.call(this, 'pop_guest_reserve'); return false;
	});

	$('.pop_mem_reserve_open, .mobile_reserve').click(function () { // 회원 예약내역 조회
		pop_layer_w.call(this, 'pop_mem_reserve'); return false;
	});

	$('.pop_login_open').click(function () { // 1:1문의, 모바일 포인트/쿠폰함 클릭시 로그인
		pop_layer_w.call(this, 'pop_login'); return false;
	});
	$('.pop_mem_reserve_open2').click(function () { // 더보기 옆 아이콘 예약내역 조회
		pop_layer_w('pop_mem_reserve');
	});
	$('.pop_logout_open').click(function () { // 로그아웃
		pop_twobtn('ell', '로그아웃 하시겠습니까?', '취소', '로그아웃', 'close_layer()', "logoutPro()"); return false;
	});
	$('.pop_login_open').click(function () {
		pop_layer_w('pop_login'); return false;
	});


});

function toastPop(msg) {

	var content = '<div class="toast_pop"><div></div></div>';

	if (!$('.toast_pop').is(':visible')) {
		$('body').append(content);
		$('.toast_pop div').html(msg).css('visibility', 'visible');
		$('.toast_pop').addClass('show');
		setTimeout(function () {
			$('.toast_pop').remove();
		}, 2000);
	}
}

$(function () {
	if ($('script#errormsg').length > 0) {
		toastPop($('script#errormsg').text())
	}
});

//    toastPop('일치하는 회원이 없습니다.');

function logoutPro() {
	window.location.href = '/userindex/';
}

function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {

		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

// 딥링크 prod.길버트 feat.킨
function deepLink() {
	var agent = navigator.userAgent.toLocaleLowerCase(),
		isIOS = /iphone|ipad/.test(agent),
		isAOS = /android/.test(agent),
		appUrl = "yeogi://details?schemetype=url&anim=2",   //앱을 실행시키기 위한 딥링크 스키마 - 앱 메인 딥링크
		marketIos = "https://itunes.apple.com/kr/app/id884043462?mt=8", //애플스토어 링크
		marketAos = "market://details?id=kr.goodchoice.abouthere&url=" + appUrl,
		alertMessage = "앱에서만 이용 가능합니다.",
		buttonName = "여기어때 앱으로 보기";

	if (isAOS) {
		eventPopup(alertMessage, buttonName, marketAos);
	} else if (isIOS) {
		location.href = appUrl;
		setTimeout(function () {
			eventPopup(alertMessage, buttonName, marketIos);
		}, 500);
	} else {
		alert_Msg(alertMessage);
	}

	$('body').on('click', '.button-close', function (e) {
		e.preventDefault();
		$(this).parent().fadeOut(250);
		setTimeout(function () {
			$('.alert_msg').remove();
		}, 100)
	});
}
