
var nicknames = [];
var openInfos = ['unick'];
var notReguired = ['uname'];

function mypageVerify() {
	clearTimecount();
	cencelSend();

	$('#phone_number-error').html('인증되었습니다.')
}


// 이벤트 바인딩
function bindEvents() {
	var $inputElement = $('input[data-input]'),
		$editBtn = $('.btns-wrap__edit-btn'),
		$submitBtn = $('.btns-wrap__submit-btn'),
		$editCancelBtn = $('.btns-wrap__cancel-btn');

	// input element 에 대한 이벤트
	$inputElement.each(function () {
		$(this).on('focus input', function (e) {
			e.preventDefault();
			e.stopPropagation();
			$('input[data-input]').not(e.target).each(function (e) {
				detachValidation(this);
			});
			attachValidation(e.target);
		});
	});

	//수정버튼 클릭시
	$editBtn.on('click', function (e) {

		toggleModifyingBlock(e, e.target)
	});

	//수정완료버튼 클릭시
	$submitBtn.on('click', function (e) {
		var targetInput = $(e.target).parents('.pw_input').find('input')[0];
		$(targetInput).focus();
		updateMyInfo(e.target);
	});

	//수정취소버튼 클릭시
	$editCancelBtn.on('click', function (e) {
		cancelEdit(e, e.target);
		toggleModifyingBlock(e, e.target)
	});

	//휴대폰번호 포커스아웃 시에 초기화
	$(document).on('keyup', phoneNumberId, function () {
		var str = $(this).val().replace(/[^0-9]/gi, '');

		clearTimecount();
		cencelSend();

		$(this).data('phoneverify', 'N');
		$(this).val(str.replace(regExp, "$1$2$3"));

		if (regExp.exec(str) == null || $(sendButtonId).hasClass('dbclicked')) {
			$(sendButtonId).removeClass('active');
		} else {
			$(sendButtonId).addClass('active');
		}
	});
}
//렌더링 후 실행된다
function rendered() {
	$('.modifying-section').hide();
	$('#verificationCode').hide();

	//폼 각각을 검사
	$('form').each(function () {
		validateForm(this);
	});
	bindEvents();
}

function recommendNicknames() {
	$.post('/verification/recommendNicknames', function (result) {
		if (result.code != 200) {
			toastPop(result.message);
			return false;
		}

		nicknames = result.data.nicknames;

		nicknames = shuffle(nicknames);
		var $unickElement = $('input[data-input="unick"]'),
			label = $unickElement.parent().addClass("inp_error").find('label');

		if (label.length > 0) {
			label.addClass('default_label_txt icon-ic_downwards_arrow').html('추천 닉네임이에요!')
		} else {
			$unickElement.after('<label id="unick-error" ' +
				'class="error help-block default_label_txt icon-ic_downwards_arrow" ' +
				'for="unick">추천 닉네임이에요!</label>')
		}

		$unickElement.val(nicknames[0]);
		spin_dimm_off();

		$unickElement.on('input', function () {
			if ($(this).val() == '') {
				return false;
			} else {
				$('#unick-error').hide().removeClass('default_label_txt icon-ic_downwards_arrow');
			}
		});
	});
}

// 정보를 업데이트한다.
function updateMyInfo(eventOccuringObject) {
	var _this = eventOccuringObject;
	var targetInput = $(_this).parents('.pw_input').find('input')[0];
	var targetInputName = targetInput.getAttribute('data-input');
	var selectorName = 'form[data-form=' + targetInputName + '] ' + 'input[name=' + targetInputName + ']';
	var targetForm = document.querySelector(selectorName);

	targetForm.setAttribute('value', targetInput.value);
	targetForm.value = targetInput.value;
}

function changeNickname() {
	if (nicknames.length == 0) {
		spin_dimm();
		recommendNicknames();
		return false;
	}

	nicknames = shuffle(nicknames);

	var $unickElement = $('input[data-input="unick"]'),
		label = $unickElement.parent().addClass("inp_error").find('label');

	if (label.length > 0) {
		label.addClass('default_label_txt icon-ic_downwards_arrow').html('추천 닉네임이에요!')
	} else {
		$unickElement.after('<label id="unick-error" ' +
			'class="error help-block default_label_txt icon-ic_downwards_arrow" ' +
			'for="unick">추천 닉네임이에요!</label>')
	}

	$unickElement.val(nicknames[0]);
	$('#unick-error').show();
}

function validateForm(element) {
	//폼 밸리데이션
	$(element).validate({
		lang: 'ko',
		// debug: true,
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
		},
		unhighlight: function (element, errorClass, validClass) {
			if (!$(element).parents(".form-errors").hasClass("form-password-rule"))
				$(element).parents(".form-errors").addClass("has-success").removeClass("inp_error");
		}
	});
}

// 각각의 수정되는 블럭 토글
function toggleModifyingBlock(e, targetElement) {
	var _this = targetElement || this;
	$(_this).parent().toggleClass("modifying");
	$(_this).parent().prev('.modifying-section').toggle();
}

//수정 취소
function cancelEdit(e, targetElement) {
	var _this = targetElement || this;
	var inputElement = $(_this).parents('.pw_input').find('input')[0];
	var existingUserInfo = $(_this).parents('.pw_input').find('.pw_input__title > .title__uinfo')[0].innerText;
	var isOpenInfo = (function () {
		for (var i = 0; i < openInfos.length; i++) {
			return inputElement.getAttribute('id') == openInfos[i];
		}
	})();

	inputElement.value = isOpenInfo ? existingUserInfo : '';
	detachValidation(inputElement);
	removeError(_this);
}

//해당 input 엘리먼트에 벨리데이션을 붙인다.
function attachValidation(target) {
	var $parentElement = $(target).parent();
	var isNotRequired = (function () {
		for (var i = 0; i < notReguired.length; i++) {
			return target.getAttribute('id') == notReguired[i];
		}
	})();

	if (!isNotRequired && !$parentElement.hasClass('has-success')) {
		target.setAttribute('required', true);
		$(target).addClass('required');
	}
}

//해당 input 엘리먼트에 붙은 밸리데이션을 제거한다.
function detachValidation(target) {
	$(target).parent().removeClass('inp_error');
}

//에러 삭제한다.
function removeError(target) {
	var $targetParent = $(target).parents('.pw_input');
	var errorBlock = $targetParent.find('.inp_error')[0];
	var errorMessage = $targetParent.find('.error.help-block')[0];
	var digitBlock = $targetParent.find('#verificationCode');
	var checkedButton = $targetParent.find('.btn_checked')[0];

	$(errorBlock).removeClass('inp_error');
	$(errorMessage).remove();
	$(digitBlock).hide();
	$(checkedButton).hide();
}
$(function () {
	rendered();
});
