/* 당첨자 확인 iscroll */
var pop_vue = null;

new Vue({
    el: '#winner_list',
    created: function () {
        pop_vue = this;
    },
    data: function () {
        return {
            result: []
        }
    },
    methods: {
        searchTerm: function (search) {
            var _self = this;

            $.xResponse('/more/get_win_confirm_non', search).done(function (data) {
                _self.result = $.extend({}, data.result);
            });
        }
    }
});

function pop_win(url) { // 열기
    var parser = $('<a href="' + url + '"></a>');

    pop_vue.searchTerm(parser[0].search.substring(1));

    $('.pop_win').fadeIn(150);
    $('.bg_dimm').fadeIn(150);

    setTimeout(function () {
        var iscroll_win;
        iscroll_win = new IScroll('.iscroll_win', {
            mouseWheel: true,
            interactiveScrollbars: true,
            shrinkScrollbars: 'scale',
            fadeScrollbars: true,
            click: true
        });
    }, 200);
    //	iscroll_win.refresh();
}

function get_event_list() {
    var hash = window.location.hash;
    var cur_page = xReturnNumber(hash.replace('#', ''));

    new Vue({
        el: '#event',
        created: function () {
            var settings = {
                page: cur_page
            };

            settings = this.searchTerm(settings);
            get_no_total_pagination(settings, this, '#pagination')
        },
        data: function () {
            return {
                result: [],
                page: hash.replace('#', '')
            }
        },
        methods: {
            searchTerm: function (settings) {
                var _self = this;

                $.xResponse('/more/get_event_non', settings).done(function (data) {
                    _self.result = $.extend({}, data.result);
                    _self.page = settings.page;

                    settings['total_page'] = data.total_page;
                });

                return settings;
            }
        }
    });
}

function get_notice_list() {
    var hash = window.location.hash;
    //var cur_page = xReturnNumber(hash.replace('#', ''));

    new Vue({
        el: '#notices',
        created: function () {
            var settings = {
                // page: cur_page
                page: 1
            };

            settings = this.searchTerm(settings);
            get_no_total_pagination(settings, this, '#notice_pagination');
        },
        data: function () {
            return {
                result: [],
                page: hash.replace('#', '')
            }
        },
        methods: {
            searchTerm: function (settings) {
                var _self = this

                $.xResponse('/more/get_notice_non', settings).done(function (data) {
                    _self.result = $.extend({}, data.result);
                    _self.page = settings.page;

                    settings['total_page'] = data.total_page;
                });

                return settings;
            }
        }
    });
}

function get_notice_release_list() {
    var hash = window.location.hash;
    //var cur_page = xReturnNumber(hash.replace('#', ''));

    new Vue({
        el: '#notice_release',
        created: function () {
            var settings = {
                //page: cur_page
                page: 1
            };

            settings = this.searchTerm(settings);
            get_no_total_pagination(settings, this, '#notice_release_pagination');
        },
        data: function () {
            return {
                result: [],
                page: hash.replace('#', '')
            }
        },
        methods: {
            searchTerm: function (settings) {
                var _self = this

                $.xResponse('/more/get_notice_release_non', settings).done(function (data) {
                    _self.result = $.extend({}, data.result);
                    _self.page = settings.page;

                    settings['total_page'] = data.total_page;
                });

                return settings;
            }
        }
    });
}

// 개인정보 처리방침 > 액티비티 서비스 제공업체 리스트 팝업
var openActivityListPopup = (function () {

    var activityTotalPage = '';

    var show = function () {
        $('#activityListPopup').fadeIn(200);
        ajaxContentLoadActivity(1);
        pageViewDefault();
    };

    var hide = function () {
        $('#activityListPopup').fadeOut(200);
    };

    function ajaxContentLoadActivity(offset) {
        if (offset == null || offset == "") offset = 1;

        $.ajax({
            type: 'GET',
            async: false,
            cache: false,
            url: 'https://activity-host.withinapi.com/public/hosts/names?pageNo=' + offset + '&listSize=22',
            dataType: 'json',
            success: function (data) {
                var totalpage = data.totalPage;
                var dataLength = data.results.length;
                $('#activityListPopup ul li').remove();
                for (i = 0; i < dataLength; i++) {
                    var activityData = data.results[i],
                        html = '<li>' + activityData + '</li>';
                    $('#activityListPopup ul').append(html);
                }
                activityTotalPage = totalpage;
            },
            error: function (request, status, error) {
                console.log(request, status, error);
            }
        })
    }

    $(document).on('click', '#activityListPopup .paging a', function () {

        var thisOffset = '',
            findActiveIndex = '',
            findActive = '';

        (function () {
            thisOffset = $(this).text();
            findActiveIndex = $('#activityListPopup .paging').children('.on').index();
            findActive = findActiveIndex + 1;
        })();

        // active 클릭 방지
        if (thisOffset == findActive) {
            return;
        }

        if ($(this).hasClass('prev') || $(this).hasClass('next')) {

            var beforeActiveIndexString = $('#activityListPopup .paging').children('.on').text(),
                beforeActiveIndex = parseInt(beforeActiveIndexString);

            // Prev 클릭
            if ($(this).hasClass('prev')) {

                if (beforeActiveIndex == 2) {
                    pageViewDefault();
                } else if (beforeActiveIndex == 3) {
                    pageViewFour(2);
                } else {
                    if (beforeActiveIndex == activityTotalPage) {
                        $('#activityListPopup .next').show();
                        $('#activityListPopup .paging a').removeClass('on');
                        $('#activityListPopup .paging a').eq(-3).addClass('on');
                    } else if (beforeActiveIndex == activityTotalPage - 1) {
                        $('#activityListPopup .paging a').removeClass('on');
                        $('#activityListPopup .paging a').eq(-4).addClass('on');
                    } else {
                        pageViewFive(beforeActiveIndex - 1);
                    }
                }
                ajaxContentLoadActivity(beforeActiveIndex - 1);
            }

            // Next 클릭
            if ($(this).hasClass('next')) {
                if (beforeActiveIndex == 1) {
                    pageViewFour(2);
                } else if (beforeActiveIndex == 2) {
                    pageViewFive(3);
                } else {
                    if (beforeActiveIndex == activityTotalPage - 2) {
                        $('#activityListPopup .paging a').removeClass('on');
                        $('#activityListPopup .paging a').eq(-3).addClass('on');
                    } else if (beforeActiveIndex == activityTotalPage - 1) {
                        $('#activityListPopup .paging a').removeClass('on');
                        $('#activityListPopup .paging a').eq(-2).addClass('on');
                        $('#activityListPopup .next').hide();
                    } else {
                        pageViewFive(beforeActiveIndex + 1);
                    }
                }
                ajaxContentLoadActivity(beforeActiveIndex + 1);
            }
        } else {
            // 숫자 클릭
            var thisOffset = parseInt($(this).text());

            if (thisOffset == 1) {
                pageViewDefault();
            } else if (thisOffset == 2) {
                pageViewFour(2);
            } else {
                // 마지막 & 마지막 전
                if (thisOffset == activityTotalPage - 1) {
                    pageViewFiveLast(thisOffset);
                } else if (thisOffset == activityTotalPage) {
                    $('#activityListPopup .paging a').removeClass('on');
                    $(this).addClass('on');
                    $('#activityListPopup .next').hide();
                } else {
                    pageViewFive(thisOffset);
                }
            }
            ajaxContentLoadActivity(thisOffset);
        }
    });

    function pageViewDefault() {
        var changePage = '<a href="#no" class="prev" style="display:none;">&lt;</a>';
        changePage = '<a href="#no" class="on">1</a>';
        changePage += '<a href="#no">2</a>';
        changePage += '<a href="#no">3</a>';
        changePage += '<a href="#no" class="next">&gt;</a>';
        $('#activityListPopup .paging a').remove();
        $('#activityListPopup .paging').html(changePage);
    }

    function pageViewFour(thisOffset) {
        var thisOffsetFirst = thisOffset - 1,
            thisOffsetNext = thisOffset + 1,
            thisOffsetLast = thisOffset + 2;

        var changePage = '<a href="#no" class="prev">&lt;</a>';
        changePage += '<a href="#no">' + thisOffsetFirst + '</a>';
        changePage += '<a href="#no" class="on">' + thisOffset + '</a>';
        changePage += '<a href="#no">' + thisOffsetNext + '</a>';
        changePage += '<a href="#no">' + thisOffsetLast + '</a>';
        changePage += '<a href="#no" class="next">&gt;</a>';
        $('#activityListPopup .paging a').remove();
        $('#activityListPopup .paging').html(changePage);
    }

    function pageViewFive(thisOffset) {
        var thisOffsetFirst = thisOffset - 2,
            thisOffsetPrev = thisOffset - 1,
            thisOffsetLast = thisOffset + 2,
            thisOffsetNext = thisOffset + 1;

        var changePage = '<a href="#no" class="prev">&lt;</a>';
        changePage += '<a href="#no">' + thisOffsetFirst + '</a>';
        changePage += '<a href="#no">' + thisOffsetPrev + '</a>';
        changePage += '<a href="#no" class="on">' + thisOffset + '</a>';
        changePage += '<a href="#no">' + thisOffsetNext + '</a>';
        changePage += '<a href="#no">' + thisOffsetLast + '</a>';
        changePage += '<a href="#no" class="next">&gt;</a>';
        $('#activityListPopup .paging a').remove();
        $('#activityListPopup .paging').html(changePage);
    }

    function pageViewFiveLast(thisOffset) {
        var thisOffsetFirst = thisOffset - 3,
            thisOffsetPrevBefore = thisOffset - 2,
            thisOffsetPrev = thisOffset - 1,
            thisOffsetLast = thisOffset + 1;

        var changePage = '<a href="#no" class="prev">&lt;</a>';
        changePage += '<a href="#no">' + thisOffsetFirst + '</a>';
        changePage += '<a href="#no">' + thisOffsetPrevBefore + '</a>';
        changePage += '<a href="#no">' + thisOffsetPrev + '</a>';
        changePage += '<a href="#no" class="on">' + thisOffset + '</a>';
        changePage += '<a href="#no">' + thisOffsetLast + '</a>';
        changePage += '<a href="#no" class="next">&gt;</a>';
        $('#activityListPopup .paging a').remove();
        $('#activityListPopup .paging').html(changePage);
    }

    return {
        show: show,
        hide: hide,
    }
})();

// TODO: 세그먼트 값
var segments = function (key) {
    var segments;
    var path = window.location.pathname;

    if (path.search('/') == 0)
        path = path.replace('/', '');

    segments = path.split("/");

    if (segments.length == 1)
        segments[1] = 'index';

    if (key === undefined)
        return segments;

    return segments[key];
}

function list_show() { // 숙박서비스 제공업체 리스트 팝업 - show
    $('#yeogiListPopup').fadeIn(200);
    $(window).bind("touchmove", function (e) { e.preventDefault(); }); // 모바일 스크롤 억제

    new Vue({
        el: '#ajax_ad_list',
        created: function () {
            var settings = {
                page: 1
            };

            settings = this.searchTerm(settings);
            get_no_total_pagination(settings, this, '#pagination', false);
        },
        data: function () {
            return {
                result: [],
                page: 1
            }
        },
        methods: {
            searchTerm: function (settings) {
                var _self = this

                $.xResponse('/more/get_term_ad_list_non', settings).done(function (data) {
                    _self.result = $.extend({}, data.result);
                    _self.page = settings.page;

                    settings['total_page'] = data.total_page;
                });

                return settings;
            }
        }
    });
}

function list_close() { // 숙박서비스 제공업체 리스트 팝업 - close
    $('#yeogiListPopup').fadeOut(200);
    $(window).unbind("touchmove"); // 모바일 스크롤 해제
}

$(function () {
    switch (segments(1)) {
        case 'notice':
            get_notice_list();
            get_notice_release_list();
            break;
        case 'event':
            get_event_list();
            break;
    }

    /* 리스트 펼침 */
    var show_target = '.open_list li .list_que';
    $(document).on('click', show_target, function (e) {
        e.preventDefault();
        if ($(this).hasClass('open')) {
            $(this).next().hide();
            $(this).removeClass('open');
        } else {
            $(show_target).removeClass('open');
            $('.open_list .list_ans').hide();
            $(this).next().show();
            $(this).addClass('open');
        }
    });

    $('.tab .tab_btn').each(function (e) {
        $(this).click(function (i) {
            i.preventDefault();
            $('.tab .tab_btn').removeClass('active');
            $('.tab .tab_btn').eq(e).addClass('active');
            $('.tab_each').hide();
            $('.tab_each').eq(e).show();
            window.location.hash = '#1';
        });
    });

    /* FAQ */
    // 게시글 클릭 슬라이드
    $('.faq_list .list .link').each(function () {
        $(this).click(function () {
            var spd = 350;
            if ($(this).hasClass('on')) {
                $('.faq_list .list .link,.faq_list .list .ans').removeClass('on');
            }
            else {
                $('.faq_list .list .link,.faq_list .list .ans').removeClass('on');
                $(this).addClass('on');
                $(this).next().addClass('on');
            }
        });
    });

    /* 이용약관 */
    $('.button-policy').each(function () {

        var textShow = "보기 ▼",
            textHide = "닫기 ▲";

        $(this).click(function () {
            if ($(this).hasClass('active')) {
                $('span', this).text(textShow);
                $(this).removeClass('active').next().hide();
            } else {
                $('span', this).text(textHide);
                $(this).addClass('active').next().show();
            }
        });
    });

    $('.add_policy').each(function (e) {
        $(this).click(function (i) {
            i.preventDefault();
            var scroll_pos = $(this).offset().top;
            var txt = $('span', this).text();
            $('.terms article').not('.show').hide();
            if (txt === "보기") {
                $('span', this).text('닫기');
                $(this).next().show();
            } else {
                $('.add_policy span').text('보기');
            }

        });
    });

    /* 개인정보처리방침 슬라이드토글 */
    $('.title', '.terms').each(function () {
        $(this).on('click', function () {
            $(this).next('.content').slideToggle();
        })
    });

    /* 이용약관 탭메뉴 효과 */
    var terms_tab = $('.terms_wrap .top_link a');
    terms_tab.each(function (e) {
        var parent = $(this).parent().parent().parent();
        var d = parent.data('default');
        if ($(this).hasClass(d)) {
            terms_tab.removeClass('on');
            $(this).addClass('on');
            $('.terms').hide();
            $('.terms').eq(e).show();

            $('footer ul.link a[data-default]').each(function () {
                $(this).html($(this).text().replace(/(<([^>]+)>)/gi, ""));
            });

            var $link = $('footer ul.link a[data-default="' + d + '"]');

            $link.html('<strong>' + $link.text() + '</strong>');
        }
        /*$(this).click(function(i){
            i.preventDefault();
            terms_tab.removeClass('on');
            $(this).addClass('on');
            $('.terms').hide();
            $('.terms').eq(e).show();

            $('footer ul.link a[data-default]').each(function () {
                $(this).html($(this).text().replace(/(<([^>]+)>)/gi, ""));
            });

            var $link = $('footer ul.link a[data-default="'+ (e + 1) +'"]');

            $link.html('<strong>'+ $link.text() +'</strong>');
        });*/
    });

    /* 혁신 프로젝트 */
    var target = $('.open_link');
    target.each(function () {
        $(this).click(function (e) {
            e.preventDefault();
            if ($(this).hasClass('open')) {
                target.removeClass('open');
                $('.child_cont').hide();
            }
            else {
                target.removeClass('open');
                $('.child_cont').hide();
                $(this).addClass('open');
                $(this).next().show();
            }
        });
    });

    // 1:1문의 placeholder 제어
    $('.placeholder_txt').on('click', function () { // textarea 클릭시
        $(this).hide();
        $('.text_wrap textarea').focus();
    });

    $('#questionTextarea').blur(function () { // textarea 포커스 아웃시
        var textareaValue = $('#questionTextarea').val();
        if (textareaValue == '') {
            $('.placeholder_txt').show();
        } else {
            return null;
        }
    });
});

