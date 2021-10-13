$(document).ready(function () {
    lineChart();
    donutChart();
    pieChart();
    $(window).resize(function () {
        window.lineChart.redraw();
        window.donutChart.redraw();
        window.pieChart.redraw();
    });
});

function lineChart() {

    axios.get("/api/tbmem/mlist", {

    }).then(function (response) {

        console.log("전체회원");
        console.log(response);

        //2015년 가입
        let type2015 = 0;
        //2016년 가입
        let type2016 = 0;
        //2017년 가입
        let type2017 = 0;
        //2018년 가입
        let type2018 = 0;
        //2019년 가입
        let type2019 = 0;
        //2020년 가입
        let type2020 = 0;
        //2021년 가입
        let type2021 = 0;

        for (let i in response.data) {

            let $memRegdate = response.data[i].memRegdate;

            var memRegdate2 = $memRegdate.substring(0,4);

            switch (memRegdate2){
                case "2015":
                    type2015++
                    break;
                case "2016":
                    type2016++
                    break;
                case "2017":
                    type2017++
                    break;
                case "2018":
                    type2018++
                    break;
                case "2019":
                    type2019++
                    break;
                case "2020":
                    type2020++
                    break;
                default:
                    type2021++
                    break;
            }
        }

        window.lineChart = Morris.Line({
            element: 'line-chart',
            data: [{
                y: '2015',
                a: type2015,
                // b: 900000
            }, {
                y: '2016',
                a: type2016,
                // b: 650000
            }, {
                y: '2017',
                a: type2017,
                // b: 400000
            }, {
                y: '2018',
                a: type2018,
                // b: 650000
            }, {
                y: '2019',
                a: type2019,
                // b: 400000
            }, {
                y: '2020',
                a: type2020,
                // b: 650000
            }, {
                y: '2021',
                a: type2021,
                // b: 900000
            }],
            xkey: 'y',
            ykeys: ['a'],
            labels: ['Series A'],
            lineColors: ['#00bfa5'],
            lineWidth: '3px',
            resize: true,
            redraw: true

        });
    });
}

function donutChart() {

    axios.get("/api/host/hlist", {

    }).then(function (response){
        console.log(response);
        console.log("도넛차트")
        //모텔
        let type1 = 0;
        //호텔
        let type2 = 0;
        //펜션
        let type3 = 0;
        //리조트
        let type4 = 0;
        //게스트하우스
        let type5 = 0;
        // 캠핑
        let type6 = 0;
        // 한옥
        let type7 = 0;
        //그 외 이상한값
        let type8 = 0;
        for (let i in response.data){
            let $myType = response.data[i].myType;

            switch ($myType){
                case "모텔":
                    type1++
                    break;
                case "호텔":
                    type2++
                    break;
                case "펜션":
                    type3++
                    break;
                case "리조트":
                    type4++
                    break;
                case "게스트하우스":
                    type5++
                    break;
                case "캠핑":
                    type6++
                    break;
                case "한옥":
                    type7++
                    break;
                default:
                    type8++
                    break;
            }

        }
        console.log("모텔 : " +type1);
        console.log("호텔 : " +type2);
        console.log("펜션 : " +type3);
        console.log("리조트 : " +type4);
        console.log("게스트하우스 : " +type5);
        console.log("캠핑 : " +type6);
        console.log("한옥 : " +type7);
        console.log("그 외 : " +type8);



        window.donutChart = Morris.Donut({
            element: 'donut-chart',
            data: [{
                label: "모텔",
                value: type1
            }, {
                label: "호텔",
                value: type2
            }, {
                label: "펜션",
                value: type3
            }, {
                label: "리조트",
                value: type4
            }, {
                label: "게스트 하우스",
                value: type5
            }, {
                label: "한옥",
                value: type7
            }, {
                label: "그외",
                value: type8
            },
            ],
            backgroundColor: '#f2f5fa',
            labelColor: '#9C71FF',
            colors: ['#9C71FF', '#B693FF', '#E0DDFF', '#CFB9FF'],
            resize: true,
            redraw: true
        });

    });
}

function pieChart() {
    var paper = Raphael("pie-chart");
    paper.piechart(100, 100, 90, [18.373, 18.686, 2.867, 23.991, 9.592, 0.213], {
        legend: ["Windows/Windows Live", "Server/Tools", "Online Services", "Business", "Entertainment/Devices", "Unallocated/Other"]
    });
}