/**
 * @ Create Time: 2021-03-15
 * @ Description: Braze 신규 공통 모듈, 기존 eventBraze.js 참조
 * @ Description: APP 웹뷰 window.onload 함수 내부에서 호출
 * <script type="text/javascript" src="https://api3.goodchoice.kr/js/service/evtBraze.js"></script>
 * evtBraze.init(이벤트번호);
 * @ action type : 기존 eventBraze 참조
 */
let evtBraze = {
    eventNo: 0
    , eventBrazeRootTagName: 'eventPromotion'
    , requestData: {}
    , requestDetail: {}
    , init: function (evtNo, evtRTag = evtBraze.eventBrazeRootTagName) {
        this.eventNo = evtNo;
        this.eventBrazeRootTagName = evtRTag;
        this.load();
        this.addEvent();
    }
    , resetData: function () {
        this.requestDetail = {}, this.requestData = {};
    }
    , mobileDevice: {
        android: function () { return navigator.userAgent.toLowerCase().match(/android/i) == null ? false : true; }
        , ios: function () { return navigator.userAgent.toLowerCase().match(/(iphone|ipod|ipad)/i) == null ? false : true; }
    }
    , addEvent: function () {
        let targetBraze = document.querySelectorAll('[data-braze]');
        targetBraze.forEach(function (target) {
            target.addEventListener('click', function () {
                evtBraze.makeData(target);
            });
        });
    }
    , load: function () {
        this.action('load', this.eventBrazeRootTagName);
    }
    , makeData: function (data) {
        let actName = data.getAttribute('data-braze');
        if (actName.indexOf('_') > 0) {
            try {
                actName = (actName.split('_')[0]).concat(this.eventNo).concat('_').concat(actName.split('_')[1]);
            } catch (e) {
                actName = actName.concat(this.eventNo);
            }
        } else {
            actName = actName.concat(this.eventNo);
        }
        this.action(actName, this.eventBrazeRootTagName);
    }
    , sendData: function (data) {
        console.log('sendData : ' + JSON.stringify(data))
        try {
            if (this.mobileDevice.android()) {
                window.Android.appBrazeEventLog(JSON.stringify(data));
            } else {
                window.webkit.messageHandlers.appBrazeEventLog.postMessage(JSON.stringify(data));
            }
        } catch (e) {
            console.error('sendData error : ' + e);
        }
    }
    , action: function (actName, eventName) {
        this.resetData();
        if (this.mobileDevice.android()) {
            this.requestDetail.eventNo = this.eventNo;
            this.requestDetail.action = actName;
            this.requestData.eventName = eventName;
            this.requestData.data = this.requestDetail;
        } else {
            this.requestData.eventName = eventName;
            this.requestData.eventNo = this.eventNo;
            this.requestData.action = actName;
        }
        this.sendData(this.requestData);
    }
    , cpnDownload: function (cpnCode) {
        this.resetData();
        this.requestDetail.eventNo = this.eventNo;
        this.requestDetail.cpnDate = evtBraze.getToDate();
        this.requestDetail.cpnCode = cpnCode;
        // this.requestDeatail.cpnDownload = requestCpnData;
        this.requestData.eventName = 'cpnDownload';
        this.requestData.data = this.requestDetail;
        this.sendData(this.requestData);
    }
    , auth: function (authCode) {
        this.resetData();
        this.requestDetail.eventNo = this.eventNo;
        this.requestDetail.CI_auth = authCode;
        this.requestData.eventName = 'eventPromotion';
        this.requestData.data = this.requestDetail;
        this.sendData(this.requestData);
    }
    , refreshUserInfo: function () {
        this.resetData();
        this.requestData.eventName = 'refreshUserInfo';
        try {
            if (this.mobileDevice.android()) {
                window.Android.refreshUserInfo(JSON.stringify(this.requestData));
            } else {
                window.webkit.messageHandlers.refreshUserInfo.postMessage(JSON.stringify(this.requestData));
            }
        } catch (e) {
            console.error(e);
        }
    }
    , getToDate: function () {
        let date = new Date(), year = date.getFullYear(), month = ('0' + (1 + date.getMonth())).slice(-2), day = ('0' + date.getDate()).slice(-2);
        let returnVal = '';
        try {
            returnVal = moment().format();
        } catch (e) {
            returnVal = ''.concat(year).concat('-').concat(month).concat('-').concat(day);
        }
        return returnVal;
    }
};