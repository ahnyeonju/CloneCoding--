var msgArray = new Array(Array(), Array());

msgArray[0][0] = '새 비밀번호를 입력해주세요.';//'새 비밀번호가 비어있을 경우'
msgArray[0][1] = '새 비밀번호를 한번 더 입력해 주세요.';//'새 비밀번호 확인이 비어있을 경우'
msgArray[0][2] = '새 비밀번호가 일치하지 않습니다.';//'새비밀번호 와 새비밀번호확인이 같지 않을 경우'

msgArray[1][0] = '비밀번호를 입력해주세요.';
msgArray[1][1] = '비밀번호를 한번 더 입력해 주세요.';
msgArray[1][2] = '비밀번호가 일치하지 않습니다.';

var msg_key = 0;

//이메일 패턴 검사
function email_validate(perform) {
	var value = $('#gcuseremail').val();
	$('#gcuseremail_msg').css("color", "red");
	var rtn = false;
	var pattern = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
	if (value.length <= 0) {
		if (perform) $('#gcuseremail_msg').html('이메일 주소를 입력해주세요.');
	} else if (!pattern.test(value)) {
		if (perform) $('#gcuseremail_msg').html('이메일 주소를 확인해주세요.');
	} else {
		if (perform) $('#gcuseremail_msg').empty();
		rtn = true;
	}

	return rtn;
}

//기존 비밀번호 검사
function original_pw_validate(perform) {
	var value = $('#original_pw').val();
	var rtn = false;
	if (value.length <= 0) {
		if (perform) $('#original_pw_msg').html('기존 비밀번호를 입력해 주세요.');
	} else {
		if (perform) $('#original_pw_msg').empty();
		rtn = true;
	}

	return rtn;
}

//새 비밀번호 검사
function new_pw_validate(color, perform) {
	var value = $('#new_pw').val();

	var rtn = false;

	if (value.length <= 0) {
		if (perform) $('#new_pw_msg').html(msgArray[msg_key][0]);
	} else if (value.length < 8) {
		if (perform) $('#new_pw_msg').html('사용불가 : 최소 8자 이상 입력해주세요.');
	} else if (pwPatternCheck(value) < 2) {
		if (perform) $('#new_pw_msg').html('사용불가 : 영문,숫자,특수문자 중 2가지 이상을 조합해주세요.');
	} else {
		if (perform) $('#new_pw_msg').html('사용가능 : 안전한 비밀번호입니다.');
		color = 'blue';
		rtn = true;
	}

	if (perform) $('#new_pw_msg').css('color', color);
	return rtn;
}

//비밀번호 패턴 검사
function pwPatternCheck(value) {
	var val = 0;

	var pattern1 = /[0-9]/;
	var pattern2 = /[a-zA-Z]/;
	var pattern3 = /[#&\\+\-%@=:;,.”^`~_|!?*$#<>()\[\]]/;// 원하는 특수문자 추가 제거

	if (pattern1.test(value)) val++;//숫자포함 ok

	if (pattern2.test(value)) val++;//영문포함 ok

	if (pattern3.test(value)) val++;//특수문자 포함 ok

	return val;
}

//새 비밀번호 확인 검사
function new_pw_re_validate(perform) {
	var new_pw = $('#new_pw').val();
	var new_pw_re = $('#new_pw_re').val();

	var rtn = false;
	if (new_pw_re.length <= 0) {
		if (perform) $('#new_pw_re_msg').html(msgArray[msg_key][1]);
	} else if (new_pw != new_pw_re) {
		if (perform) $('#new_pw_re_msg').html(msgArray[msg_key][2]);
	} else {
		if (perform) $('#new_pw_re_msg').empty();
		rtn = true;
	}
	return rtn;
}

//----------------------------------버튼 활성화/비활성화--------------------------
//전체검사해서 버튼 활성화/비활성화 (회원가입)
function join_BtnDisabled_validate() {
	if (!email_validate(false) ||
		!new_pw_validate('red', false) ||
		!new_pw_re_validate(false)) {//하나라도 검사에 통과하지 못했다면 버튼 비활성화
		btnDisabled($('.btn_user_submit'));
	} else {
		//모두 통과했다면 활성화
		btnEnabled($('.btn_user_submit'));
	}
}

//전체검사해서 버튼 활성화/비활성화 (마이페이지, 오래된 비밀번호 변경)
function myPage_BtnDisabled_validate() {

	if (!original_pw_validate(false) ||
		!new_pw_validate('red', false) ||
		!new_pw_re_validate(false)) {//하나라도 검사에 통과하지 못했다면 버튼 비활성화
		btnDisabled($('.btn_user_submit'));
	} else {
		//모두 통과했다면 활성화
		btnEnabled($('.btn_user_submit'));
	}
}

//전체검사해서 버튼 활성화/비활성화 (휴대폰/이메일 비밀번호 찾기)
function changePw_BtnDisabled_validate() {
	if (!new_pw_validate('red', false) ||
		!new_pw_re_validate(false)) {
		//하나라도 검사에 통과하지 못했다면 버튼 비활성화
		btnDisabled($('.btn_user_submit'));
	} else {
		//모두 통과했다면 활성화
		btnEnabled($('.btn_user_submit'));
	}
}

function btnDisabled(obj) {
	obj.prop("disabled", true);
	obj.css("background-color", "#fafafa");
	obj.css("color", "rgba(0,0,0,0.16)");
	obj.css('border', 'none');
}

function btnEnabled(obj) {
	obj.prop("disabled", false);
	obj.css("background-color", "rgba(255,0,85,1)");
	obj.css("color", "#fff");
}

//------------------SUBMIT-----------------------------------
//마이페이지 submit
function myFormSubmit() {
	if (!original_pw_validate(true)) return;
	if (!new_pw_validate('red', true)) return;
	$('#new_pw_msg').empty();
	if (!new_pw_re_validate(true)) return;

	//기존비밀번호 비교
	var new_pw = $('#new_pw').val();
	var original_pw = $('#original_pw').val();
	if (new_pw == original_pw) {
		$('#new_pw_msg').css('color', 'red');
		$('#new_pw_msg').html('기존 비밀번호와 다른 비밀번호를 입력해주세요.');
		return;
	}

	$.post('/my/originalPwCheck', { "original_pw": original_pw }, function (data) {
		try {
			var code = data.code;
			if (code != 200) {
				$('#original_pw_msg').html('기존 비밀번호가 일치하지 않습니다.');
			} else {
				$("#mypageForm").submit();
			}
		} catch (e) {
			console.log('Exception : ', e);
		}

	}, 'json');
}

//비번변경 켐페인 submit
function campaignMypageFormSubmit() {
	if (!original_pw_validate(true)) return;
	if (!new_pw_validate('red', true)) return;
	$('#new_pw_msg').empty();
	if (!new_pw_re_validate(true)) return;

	//기존비밀번호 비교
	var new_pw = $('#new_pw').val();
	var original_pw = $('#original_pw').val();
	if (new_pw == original_pw) {
		$('#new_pw_msg').css('color', 'red');
		$('#new_pw_msg').html('기존 비밀번호와 다른 비밀번호를 입력해주세요.');
		return;
	}

	$.post('/my/originalPwCheck', { "original_pw": original_pw }, function (data) {
		try {
			var code = data.code;
			if (code != 200) {
				$('#original_pw_msg').html('기존 비밀번호가 일치하지 않습니다.');
			} else {
				$("#campaignMypageForm").submit();
			}
		} catch (e) {
			console.log('Exception : ', e);
		}

	}, 'json');
}

//비밀번호 찾기, 휴대폰 & 이메일 공통 submit
function changePwSubmit() {
	if (!new_pw_validate('red', true)) return;
	$('#new_pw_msg').empty();
	if (!new_pw_re_validate(true)) return;

	$("#loginForm").submit();
}


