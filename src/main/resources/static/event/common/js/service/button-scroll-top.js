/**
 * @ Author: Keen
 * @ Create Time: 2019-10-01
 * @ Description: 상단으로 버튼
 */

// 상단으로 버튼
var buttonTopControl = (function () {

    var buttonToggle = function () {
        var windowY = window.scrollY,
            scrollHeight = $(document).height(),
            scrollPosition = $(window).height() + $(window).scrollTop(),
            calculateScroll = (scrollHeight - scrollPosition) / scrollHeight,
            targetButton = $('.button-top');

        if (calculateScroll === 0) {
            targetButton.addClass('button-top__opacity');
        } else {
            targetButton.removeClass('button-top__opacity');
        }
        if (windowY > 500) {
            targetButton.addClass('button-top__active');
        } else {
            targetButton.removeClass('button-top__active');
        }
    }

    window.addEventListener('scroll', buttonToggle);

    var move = function () { window.scrollTo(0, 0); };

    return {
        move: move
    }
})();