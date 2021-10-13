/**
 * @ Author: Keen
 * @ Create Time: 2019-10-21
 * @ Description: 약관 JS
 */

var termsBasic = (function () {

	isLoading = false;
	var titleElements = document.querySelectorAll('.term-accordion-title');

	for (i = 0; i < titleElements.length; i++) {
		titleElements[i].addEventListener('click', function (e) {
			if (isLoading === true) false;
			isLoading = true;

			var targetParent = this.parentElement;

			if (targetParent.classList.contains('term-accordion__open')) {
				targetParent.classList.remove('term-accordion__open');
			} else {
				targetParent.classList.add('term-accordion__open');
			}
			isLoading = false;
		});
	}

	var tabItem = document.querySelectorAll('.terms_tab ul li');

	if (!tabItem.length) { // 탭 없으면 실행
		// Origin
		document.querySelector('.term-select').addEventListener('change', function () {
			var selectedIndex = this.options[this.selectedIndex].getAttribute('name');
			var termElements = document.querySelectorAll('.term-basic-wrap');
			for (i = 0; i < termElements.length; i++) {
				termElements[i].style.display = "none";
			}
			termElements[selectedIndex].style.display = "block";
		});
	} else if (tabItem.length === 2) { //탭 2개시 여기어때 앱에서 실행
		// NIKI
		document.querySelectorAll('.term-select').forEach(function (v) {
			v.addEventListener('change', function (e) {
				var selectedIndex = this.options[this.selectedIndex].getAttribute('name');
				var termElements = this.parentNode.parentNode.querySelectorAll('.term-basic-wrap');
				for (i = 0; i < termElements.length; i++) {
					termElements[i].style.display = "none";
				}
				termElements[selectedIndex].style.display = "block";
			});
		});
	} else { // 반응형 웹
		$('.term-select').each(function () {
			$(this).on('change', function () {
				var selectedIndex = this.options[this.selectedIndex].getAttribute('name');
				var termElements = $('.term-basic-wrap');

				for (i = 0; i < termElements.length; i++) {
					termElements[i].style.display = "none";
				}
				termElements[selectedIndex].style.display = "block";
			});
		});

		$('.term-select-location').each(function () {
			$(this).on('change', function () {
				var selectedIndex = this.options[this.selectedIndex].getAttribute('name');
				var termElements = $('.term-basic-wrap-location');

				for (i = 0; i < termElements.length; i++) {
					termElements[i].style.display = "none";
				}
				termElements[selectedIndex].style.display = "block";
			});
		});

		$('.term-select-privacy').each(function () {
			$(this).on('change', function () {
				var selectedIndex = this.options[this.selectedIndex].getAttribute('name');
				var termElements = $('.term-basic-wrap-privacy');

				for (i = 0; i < termElements.length; i++) {
					termElements[i].style.display = "none";
				}
				termElements[selectedIndex].style.display = "block";
			});
		});
	}

})();
