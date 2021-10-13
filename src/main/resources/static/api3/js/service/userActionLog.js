/**
    @author: elva
    @description: 사용자 행동로그 모듈
 **/
/***************************** polyfill ****************************/
/* closest polyfill */
if (!Element.prototype.matches)
    Element.prototype.matches = Element.prototype.msMatchesSelector ||
        Element.prototype.webkitMatchesSelector;

if (!Element.prototype.closest) {
    Element.prototype.closest = function (s) {
        var el = this;
        if (!document.documentElement.contains(el)) return null;
        do {
            if (el.matches(s)) return el;
            el = el.parentElement || el.parentNode;
        } while (el !== null && el.nodeType === 1);
        return null;
    };
}
/* string capitalize polyfill */
String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

/* jquery serializeObejct polyfill */
$.fn.serializeObject = function () {
    "use strict"
    var result = {}
    var extend = function (i, element) {
        var node = result[element.name]
        if ("undefined" !== typeof node && node !== null) {
            if ($.isArray(node)) {
                node.push(element.value)
            } else {
                result[element.name] = [node, element.value]
            }
        } else {
            result[element.name] = element.value
        }
    };

    $.each(this.serializeArray(), extend)
    return result
};

/***************************** custom function ****************************/

/* object parse */
var jsonParse = function (param) {
    if (typeof param !== "object") {
        param = JSON.parse(param);
        if (typeof param === "object" && param.constructor.name !== "Array") {
            for (var key in param) {
                param[key] = jsonParse(param[key]);
            }
        }
    }
    return param;
};
/* object copy */
var copyObject = function (target) { //객체 copy


    if (typeof target === "object" && target.constructor.name !== "Array") {
        var resultObj = {};

        for (var i in target) {
            if (typeof target[i] === "object" && target[i].constructor.name !== "Array") {
                resultObj[i] = copyObject(target[i]);
            }
            resultObj[i] = target[i];
        }
        return resultObj;
    }
};

/***************************** 상수 ****************************/

var API = {
    dev: 'https://dev-cir-act.withinapi.com',
    standby: 'https://dev-cir-act.withinapi.com',
    prod: 'https://cir-act.withinapi.com'
};

var SERVICE_DOMAIN = {
    dev: /(.+)\.abouthere.kr/,
    standby: /(?:standby)(.+).goodchoice.kr/,
    prod: /^(?!standby)(.+)\.goodchoice.kr/
};

var SERVICE = "YG";


/***************************** log ****************************/

var matchRegex = function (target, regex) {

    return regex.test(target);
};

var getApi = function () {
    var curLocation = window.location.hostname;
    var api = (function () {
        for (var i in SERVICE_DOMAIN) {
            if (matchRegex(curLocation, SERVICE_DOMAIN[i])) {
                return API[i];
            }
        }
    })();

    return api;
};

var UserLog = function (appDatas) {

    var _this = this;


    var getElementData = function (elementParam, param) {
        return getClosestElement(elementParam, param) ? getClosestElement(elementParam, param).dataset["log" + param.capitalize()] : "";
    };

    var setElementsData = function (element, action) {
        var eachLog = copyObject(_this.logData);

        eachLog['action'] = action;
        eachLog['pg'] = getElementData(element, 'page');
        eachLog['section'] = getElementData(element, 'section');
        eachLog['item'] = getElementData(element, 'item');
        eachLog['createTime'] = moment().format('YYYY-MM-DD HH:mm:ss') || "";

        return eachLog;
    };

    var actionEvents = {
        'load': function (target) {
            var eachLog = {};

            window.addEventListener('load', function () {
                eachLog = copyObject(_this.logData);

                eachLog = setElementsData(target, 'load');

                _this.sendLog(eachLog);
            });
        },
        'tap': function (target) {
            var eachLog = {};

            target.addEventListener('click', _.debounce(function (e) {
                e.stopPropagation();

                eachLog = setElementsData(e.target, 'tap');

                _this.sendLog(eachLog);
            }, 400, true));
        },
        'h-scroll': function (target) {
            var eachLog = {};

            window.addEventListener('load', function () {

                if (target.swiper) {
                    target.swiper.on('touchMove', _.debounce(function (e) {
                        e.stopPropagation();
                        eachLog = setElementsData(target, 'h-scroll');
                        eachLog['item'] = this.slides[this.realIndex].getAttribute('data-action-item') || "";

                        _this.sendLog(eachLog);

                    }, 400, true));
                }
            });
        },
        'h-scroll-auto': function (target) {
            var eachLog = {};

            window.addEventListener('load', function () {
                if (target.swiper && target.swiper.autoplay.running) {
                    target.swiper.on('autoplay', function () {

                        eachLog = setElementsData(target, 'h-scroll-auto');
                        eachLog['item'] = this.slides[this.realIndex].getAttribute('data-action-item') || "";

                        _this.sendLog(eachLog);
                    });
                }
            });
        },
        'v-scroll': function (target) {
            var eachLog = {};

            window.addEventListener('scroll', _.debounce(function (e) {
                e.stopPropagation();

                eachLog = setElementsData(target, 'v-scroll');

                _this.sendLog(eachLog);
            }, 400, true));
        },
        'appear': function (target) {
            var eachLog = {};
            var elementPosition = 0;
            var elementHeight = 0;
            var screenHeight = 0;

            var isAppear = function () {
                var start = (window.pageYOffset + screenHeight > elementPosition);
                var end = (window.pageYOffset < elementPosition + elementHeight);

                return start && end;
            };


            window.addEventListener('load', function () {
                elementPosition = target.offsetTop;
                elementHeight = target.offsetHeight;
                screenHeight = screen.height;

                if (isAppear()) {
                    eachLog = setElementsData(target, 'appear');

                    _this.sendLog(eachLog);
                }

                window.addEventListener('scroll', _.debounce(function (e) {
                    e.stopPropagation();
                    if (isAppear()) {
                        eachLog = setElementsData(target, 'appear');

                        _this.sendLog(eachLog);
                    }
                }, 800, false));
            });
        }
    };

    var init = function () {
        _this.logData = formatData(appDatas);
        _this.reservationLog = reservationLog;

        addEventHandler();
    };

    var getClosestElement = function (element, logCategory) {
        var dataAttribute = '[data-log-' + logCategory + "]";
        var sectionElement = element.closest(dataAttribute);

        return sectionElement;
    };

    var updateToProperKey = function (properKey, wrongKey, targetLog) {
        if (targetLog[wrongKey]) {
            targetLog[properKey] = targetLog[wrongKey];

            delete targetLog[wrongKey];
        }
        return targetLog;
    };

    var setPocType = function () {// app에서 report-data를 주지않으면 user-agent로 pocType 정의함.
        var ua = navigator.userAgent.toLowerCase(),
            isAndroid = ua.indexOf("android") > -1,
            iOS = ua.match(/(iphone|ipod|ipad)/);

        return (isAndroid || iOS) ? 'W' : 'P';
    };

    var setAppLog = function (param) {
        var log = {};

        for (var key in param) {
            log[key] = param[key];
        }

        return log;
    };

    var setWebLog = function () {
        var log = {};

        log['pocType'] = setPocType();
        log['userAgent'] = navigator.userAgent || "";

        return log;
    };

    var getAppDatasFromLocation = function () { //현재 위치에서 추출할 수 있는 데이터 추출 return object
        var curLocation = decodeURI(window.location.search);
        var query = curLocation.slice(curLocation.indexOf('?') + 1);
        var keyPairArr = query.split('&');
        var obj = {},
            idx = 0,
            key = '',
            val = '';

        for (var i = keyPairArr.length; i--;) {
            idx = keyPairArr[i].indexOf('=');
            key = keyPairArr[i].slice(0, idx);
            val = keyPairArr[i].slice(idx + 1);

            switch (key) {
                case 'uosgubn':
                    obj['pocType'] = val;
                    break;
                case 'version':
                    obj['appVersion'] = val;
                    break;
                case 'deviceid':
                    obj['dId'] = val;
                    break;
            }
        }
        return Object.keys(obj).length && obj;
    };
    var isObject = function (obj) {
        return (typeof obj === "object") && (obj.constructor.name !== "Array");
    }

    var formatData = function (param) { // 로그데이터 형태를 형식화한다.
        var log = {};

        if (param) {
            param = window.decodeURIComponent(param).replace(/"{\\/g, '{').replace(/}"/g, '}').replace(/\\"/g, '"');
            param = JSON.parse(param);
        } else {
            param = getAppDatasFromLocation();
        }

        // report-data가 있다면
        if (typeof param === 'object' && param.constructor.name !== "Array") {
            log = setAppLog(param);
        } else {
            log = setWebLog();
        }

        log['service'] = SERVICE;

        return log;
    };

    var isLastWordSymbol = function (str) { //마지막 문자가 특수문자인가? true, false
        var lastWord = str.charCodeAt(str.length - 1);

        return !(lastWord > 96 && lastWord < 123);
    };

    var deleteLastSymbol = function (str) {
        return isLastWordSymbol(str) ? str.slice(0, str.length - 1) : str;
    };

    var deleteSymbol = function (str) {
        var regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\_+<>@\#$%&\\\=\(\'\"]/gi;
        var text = str.trim().replace(/\s/g, '').replace(regExp, ';');

        return isLastWordSymbol(text) ? deleteLastSymbol(text) : text;
    };

    var deleteEmptyArray = function (arr) {
        var result = [];
        for (var i = 0, len = arr.length; i < arr.length; i++) {
            if (arr[i].length !== 0) {
                result.push(arr[i]);
            }
        }

        return result;
    };


    var getEventLists = function (param) {
        var lists = [];

        try {
            if (!param) { //param string 이 없을때
                throw new Error('error occurs:should input right data attribute');
            }
            lists = deleteEmptyArray(deleteSymbol(param).split(';'));
            return lists;
        } catch (e) {
            console.error(e.message);
            return false;
        }
    };

    var addEventHandler = function () {

        var eventArr = [];
        var actionElements = document.querySelectorAll('[data-user-action]');

        for (var i = 0; i < actionElements.length; i++) {
            eventArr = getEventLists(actionElements[i].dataset.userAction);

            if (eventArr) {
                eventArr.forEach(function (actionName) {
                    if (actionEvents.hasOwnProperty(actionName)) {
                        actionEvents[actionName](actionElements[i]);
                    } else {
                        console.error('error occurs:should input right data-attribute');
                    }
                })
            }
        }
    };

    //custom 로그

    var sendCustomLog = function (param) {
        try {
            if (!param || !_this.logData) {
                throw new Error('error occurs: should input log data');
            }
            var log = setCustomLog(param, copyObject(_this.logData));
            _this.sendLog(log);

        } catch (e) {
            console.error(e.message);
        }
    };

    var setCustomLog = function (param, target) {

        if (typeof param === "object" && param.constructor.name !== "Array") {
            for (var prop in param) {
                if (target[prop]) {
                    target[prop] = setCustomLog(param[prop], target[prop]);
                } else {
                    target[prop] = param[prop];
                }

            }
        }

        return target;
    };

    /************************* custom function *********************/
    // 예약
    var reservationLog = (function () {

        var time = {
            format: function (param, options) {
                if (!this.isValidTimeFormat(param, options.format)) {
                    return this.convertTimeFormat(param, options.chk);
                }
                return param;
            },
            isValidTimeFormat: function (param, format) {
                return moment(param, format, true).isValid();
            },
            convertTimeFormat: function (param, chk) {
                var elem = "#dayuse_" + chk;
                var time = document.querySelector(elem + '> i').nextSibling.textContent;

                return param + " " + time + ":00";
            }
        };

        var setAcmType = function (checkinType) {
            return checkinType === "1" ? "rent" : "stay";
        };

        var setDate = function (date, chk) {
            var timeFormat = "YYYY-MM-DD HH:mm:ss";

            return time.format(date, { format: timeFormat, chk: chk });
        };

        var setVisitWay = function (parking) {
            return parking === "Y" ? "car" : "walk";
        };

        var setPayWay = function (paymentNo) {
            var payType = '';

            switch (paymentNo) {
                case '5':
                    payType = 'mobile';
                    break;
                case '10':
                    payType = 'kakao';
                    break;
                case '11':
                    payType = 'nice';
                    break;
                case '12':
                    payType = 'payco';
                    break;
                case '14':
                    payType = 'naver';
                    break;
                case '18':
                    payType = 'nicebiz';
                    break;
                case '19':
                    payType = 'toss';
                    break;
            }
            return payType;
        };

        var setReservationLog = function (param) {
            var reservationDatas = {
                acmType: setAcmType(param.checkin_type),
                sDate: setDate(param.checkin_date, "chkin"),
                eDate: setDate(param.checkout_date, "chkout"),
                visitWay: setVisitWay(param.do_parking_type), // Y or N
                coupon: param.do_use_coupon,
                couponType: param.do_cpnis_no,
                point: param.do_use_point,
                price: param.do_original_price,
                mileage: param.do_use_mileage,
                totalPrice: param.payment_price,
                payWay: setPayWay(param.pay_type) // string
            };

            return reservationDatas;
        };

        var setLog = function (param, target) {
            if (typeof param === "object") {
                target = setCustomLog(param, target);
                target.createTime = moment().format('YYYY-MM-DD HH:mm:ss');
                target.value = setReservationLog(param.value);

                return target;
            } else {
                console.log('check type for action log');
            }
        };

        var send = function (param) {
            try {
                if (!param || !_this.logData) {
                    throw new Error('error occurs: should input log data');
                }
                var log = setLog(param, copyObject(_this.logData));
                _this.sendLog(log);
            } catch (e) {
                console.error(e.message);
            }
        };

        return {
            send: send
        }
    })();

    init();

    return {
        sendReservation: _this.reservationLog.send,
        sendLog: sendCustomLog
    }
}

UserLog.prototype.sendLog = function (payload) {
    if (!payload || (typeof payload !== "object" || payload.constructor.name !== "Object")) return;

    // [예외사항] prodData와 prodDetailData 만 object를 string으로 넘겨준다.
    payload.prodData = JSON.stringify(payload.prodData);
    payload.prodDetailData = JSON.stringify(payload.prodDetailData);

    $.ajax({
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        contentType: "application/json; charset=utf-8",
        url: getApi(),
        dataType: 'json',
        data: JSON.stringify(payload),
        beforeSend: function (xhr, settings) {
            return true;
        },
        success: function (data) {
            console.log(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            var errorMsg = 'status(code) : ' + jqXHR.status + '\n';
            errorMsg += 'statusText : ' + jqXHR.statusText + '\n';
            errorMsg += 'textStatus : ' + JSON.stringify(textStatus) + '\n';
            errorMsg += 'errorThrown : ' + errorThrown;
            console.log(errorMsg);
        }
    });
};
