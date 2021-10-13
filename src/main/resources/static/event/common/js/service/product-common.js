/**
 * @ Author: Keen
 * @ Create Time: 2019-09-20
 * @ Description: 이벤트 기획전 공통 JS
 * @ S3 : static.goodchoice.kr/event/common/js/service
 */

var eventControl = (function () {

    // JSON API 호출
    var apiCall = function (eventNumber, currentDate, serverURL, service,) {
        if (!eventNumber) throw new Error("이벤트 넘버를 인자값에 추가해주세요.");
        if (typeof eventNumber !== 'number') throw new Error("이벤트 넘버의 타입은 Number 입니다");
        if (!currentDate) throw new Error("현재 시각 누락 currentDate (YYYY-MM-DD HH:mm:ss)");

        var currentDate = currentDate;

        var hotelTimeCurrentDate = currentDate.split(' ')[0];

        $.ajax({
            type: 'GET',
            url: serverURL + eventNumber + '/productData.json',
            dataType: 'json',
            success: function (result) {
                initialize(result);
                console.log(result)
            },
            error: function (error) {
                if (error.status === 403 || error.status === 404) {
                    console.error('JSON Data의 넘버 또는 경로를 확인해주세요');
                } else {
                    console.error(error);
                }
                $('.event-vue').hide();
            }
        });

        // 호텔타임 블랙 마크 제거
        if (service === 'hoteltime') {
            $('.mark-black').hide();
        }

        // 초기화
        var initialize = function (result) {

            // 기본 이벤트 데이터
            var eventData = result.eventData;

            // 이벤트 데이터 가공 (Sort - divCode / 지역별)
            var dataSort = (function () {

                // 1차 Sort (divCode)
                var eventDataSort = eventData.sort(function (a, b) {
                    if (a.divCode < b.divCode) return -1;
                });

                // 2차 Sort (seq - 지역별)
                var products = function () {
                    var temp = [];
                    $.each(eventDataSort, function (i) {
                        temp.push(eventDataSort[i].section.sort(function (a, b) {
                            if (a.seq < b.seq) return -1;
                        }));
                    });
                    return temp;
                }

                // 네비게이션 생성
                var navigationGenerator = (function () {

                    var navigationHeight = 48, // 기본 50px 에서 - 2를 적용
                        navigation = [],
                        targetIndex = undefined,
                        isScrolling = false,
                        useCheck = [];

                    // 네비게이션 사용 확인
                    $.each(eventDataSort, function (i) {

                        useCheck.push(eventDataSort[i].useNavigator);

                        if (eventDataSort[i].useNavigator === "Y") {
                            $.each(eventDataSort[i].section, function (i, v) {
                                navigation.push(v.title);
                            });
                            targetIndex = i;
                        }
                    });

                    // 네비게이션 체크후 실행
                    useCheck.forEach(function (i) {
                        if (i === 'Y') navigationExecute();
                    });

                    function navigationExecute() {
                        var navigationHTML = '<div class="navigation"><div class="navigation-inner"></div></div>';
                        var detectAtatchElement = $('.event-vue > div').eq(targetIndex);
                        var brazeActionName = 'regionTap';

                        detectAtatchElement.prepend(navigationHTML);

                        $.each(navigation, function (i, v) {
                            var buttonHTML = '<button type="button" data-braze="' + brazeActionName + '">' + v + '</button>';
                            $('.navigation-inner').append(buttonHTML);
                        });

                        $('.navigation-inner button').eq(0).addClass('button__active');

                        // 네비게이션 버튼 클릭 이벤트
                        setTimeout(function () {
                            $('.navigation-inner button').each(function (i) {
                                $(this).click(function () {
                                    if (isScrolling === true) return;
                                    isScrolling = true;

                                    var targetElements = $(this).closest('[data-product]').children('div');
                                    var targetOffsetTop = Math.ceil(targetElements.eq(i + 1).offset().top);

                                    $.scrollTo(targetOffsetTop - navigationHeight, 500);

                                    setTimeout(function () {
                                        isScrolling = false;
                                    }, 500);
                                });
                            });
                        }, 0);

                        // 네비게이션 탭 Active 이벤트
                        var scrollActiveTab = function () {
                            var windowScrollY = window.scrollY,
                                targetOffset = document.querySelector('.navigation').offsetTop,
                                bottomOffset = document.querySelector('.event-bottom').offsetTop,
                                navigationHeight = $('.navigation').height(),
                                productOffsets = [];

                            if (targetOffset < windowScrollY) {
                                $('.navigation-inner').addClass('navigation__fixed');
                            } else {
                                $('.navigation-inner').removeClass('navigation__fixed');
                            }

                            if (windowScrollY > bottomOffset - navigationHeight) {
                                $('.navigation-inner').removeClass('navigation__fixed');
                            }

                            $('.navigation').closest('[data-product]').children('div').each(function () {
                                targetsOffset = Math.ceil($(this).offset().top);
                                productOffsets.push(targetsOffset);
                            });

                            for (i = 1; i < productOffsets.length; i++) {
                                if (windowScrollY > productOffsets[i] - navigationHeight) {
                                    $('.navigation-inner .button__active').removeClass();
                                    $('.navigation-inner button').eq(i - 1).addClass('button__active');
                                }
                            }
                        }

                        window.addEventListener('scroll', scrollActiveTab);
                    }

                })();

                return {
                    products: products
                }
            })();

            // Vue 인스턴스 생성
            makeVueInstance(dataSort.products(), eventNumber, hotelTimeCurrentDate, service);
        }
    }

    // Vue 인스턴스
    var makeVueInstance = function (data, eventNumber, hotelTimeCurrentDate, service) {

        var data = {
            mainProducts: data[0],
            subProducts: data[1],
            thirdProducts: data[2],
            fourthProducts: data[3],
            fifthProducts: data[4],
            sixthProducts: data[5],
            yeogiScheme: ["yeogi://details?schemetype=detail&anim=2&ano=", "&adcno=2"],
            imagePath: serverURL + eventNumber + '/images/product/',
            hotelScheme: ["hoteltime://eventceonresult?type=detail&sale_date=" + hotelTimeCurrentDate + "&id="],
            activityScheme: "yeogi://details?schemetype=act_product&anim=2&productUid=",
            service: service,
        }

        var vueInstance = new Vue({
            el: '.event-vue',
            data: function () {
                return data
            },
            mounted: function () {
                // 윈도우 상단으로
                window.scrollTo(0, 0);

                $('img.lazy').lazyload({
                    threshold: 800,
                    effect: "fadeIn"
                });

                setTimeout(function () {
                    document.querySelector('.event-vue').classList.add('event-vue__show');
                }, 100);
            },
            methods: {
                // 클래스 메소드
                makeClassName: function (type, index) {
                    var type = type === 'main' ? 'main_' : 'sub_';
                    return type + index;
                },
                // 상품 노출 설정
                visibleProduct: function (startedAt, endedAt) {
                    return moment.duration(moment(startedAt, 'YYYY-MM-DD HH:mm')
                        .diff(currentDate))
                        .asMinutes() < 0 &&
                        moment.duration(moment(endedAt, 'YYYY-MM-DD HH:mm')
                            .diff(currentDate))
                            .asMinutes() > 0 ||
                        startedAt[0] === '' &&
                        endedAt[0] === '';
                },
                computedBadge: function (badge) {
                    var arrayBadge = badge.split('#');
                    return arrayBadge;
                },
                noticeConvert: function (str) {
                    var re = /\n/g;
                    var text = str.replace(re, "<br />");
                    return text;
                },
                productTypeCheck: function (productType, productIndex) {
                    // 기본
                    if (productType[0] === "accommodation") {
                        return this._data.yeogiScheme[0] + productIndex + this._data.yeogiScheme[1];
                    }
                    // 액티비티
                    if (productType[0] === "activity") {
                        return this._data.activityScheme + productIndex;
                    }
                },
                subAreaLinkCheck: function (yeogiLink, hotelTimeLink) {
                    if (this._data.service === 'hoteltime') {
                        return hotelTimeLink;
                    } else {
                        return yeogiLink;
                    }
                },
                areaLinkCheck: function (yeogiLink, hotelTimeLink) {
                    if (this._data.service === 'hoteltime') {
                        return hotelTimeLink;
                    } else {
                        return yeogiLink;
                    }
                }
            }
        });
    };

    return {
        apiCall: apiCall
    }

})();