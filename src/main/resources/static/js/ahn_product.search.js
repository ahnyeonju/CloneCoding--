/**
 * Created by helloworld on 2017-04-18.
 */
 $(function () {

    lazyload();

    var min_price = xReturnNumber($("#min_price").val());
    var max_price = xReturnNumber($("#max_price").val());

    if (min_price == 0)
        min_price = xReturnNumber($("#slider").data('min')) * 10000;
    if (max_price == 0)
        max_price = xReturnNumber($("#slider").data('max')) * 10000;

    var min_title = min_price / 10000;
    var max_title = max_price / 10000;
    var amount_title = min_title + '만원 이상';

    /* 슬라이더 */
    $("#slider").slider({
        range: true,
        min: xReturnNumber($("#slider").data('min')) * 10000,
        max: xReturnNumber($("#slider").data('max')) * 10000,
        step: 10000,
        values: [min_price, max_price],
        slide: function (event, ui) {
            if ((ui.values[0] + 10000) >= ui.values[1]) {
                return false;
            }

            $("#min_price").val(ui.values[0]);
            $("#max_price").val(ui.values[1]);

            min_title = xReturnNumber(ui.values[0]) / 10000;
            max_title = xReturnNumber(ui.values[1]) / 10000;

            amount_title = min_title + '만원 이상';

            if (max_title < xReturnNumber($("#slider").data('max'))) {
                amount_title = min_title + '만원 ~ ' + max_title + '만원';
            }

            $("#amount").val(amount_title);
        }
    });

    if (max_title < xReturnNumber($("#slider").data('max'))) {
        amount_title = min_title + '만원 ~ ' + max_title + '만원';
    }

    $("#amount").val(amount_title);

    /* 추천순 버튼 가로 정렬 */
    var sort_btn = $('.top_sort .pc .btn_wrap button');
    var sort_btn_cnt = sort_btn.length;
    switch (sort_btn_cnt) {
        case 2:
            sort_btn.parent().removeClass('width_4');
            sort_btn.parent().removeClass('width_3');
            sort_btn.parent().addClass('width_2');
            break;

        case 3:
            sort_btn.parent().removeClass('width_4');
            sort_btn.parent().removeClass('width_2');
            sort_btn.parent().addClass('width_3');
            break;

        default:
            sort_btn.parent().removeClass('width_2');
            sort_btn.parent().removeClass('width_3');
            sort_btn.parent().addClass('width_4');
    }

    $('.top_sort .pc .btn_wrap button').each(function () {
        $(this).click(function () {
            $('.top_sort .pc .btn_wrap button').removeClass('on');
            $(this).addClass('on');
            $('#sort').val($(this).data('sort'));
            $('#product_filter_form').submit();
        });
    });

    if ($('button.badge_benefit').length > 0) {
        $('button.badge_benefit').on('click', function () {
            if ($(this).hasClass('on')) {
                $(this).find('input[type="checkbox"]').prop('checked', true);
            } else {
                $(this).find('input[type="checkbox"]').prop('checked', false);
            }
        })
    }

    $('.cnt_people button').on('click', function () {
        var per = xReturnNumber($('#persons').val());
        var def = xReturnNumber($('.cnt_people').data('def'));
        var min = xReturnNumber($('.cnt_people').data('min'));
        var max = xReturnNumber($('.cnt_people').data('max'));

        if (per == 0)
            per = def;

        if ($(this).hasClass('dn')) {
            if (min < per) {
                per--;
            }
        }

        if ($(this).hasClass('up')) {
            if (max > per) {
                per++;
            }
        }

        if (max <= per) {
            $('.cnt_people button.up').addClass('disable');
        } else if (min <= per) {
            $('.cnt_people button.up').removeClass('disable');
        }

        if (max >= per) {
            $('.cnt_people button.dn').removeClass('disable');
        } else if (min >= per) {
            $('.cnt_people button.dn').addClass('disable');
        }

        $('.cnt_people span').html(per);
        $('#persons').val(per);
    });


    $(window).resize(function () { // 리사이즈시 지도 팝업 숨김
        $('.bg_dimm_map').hide();
        $('.pop_m_room').hide();
    });

    $('.pop_sort li button').on('click', function (e) {
        e.preventDefault();

        $('#sort').val($(this).data('sort'));

        $('#product_filter_form').submit();
        close_layer(); // 닫기
    });



    // JSON.parse 버튼이벤트 겹쳐 주석
    // if ($(".product_date").length > 0) {

    //     $(".product_date").on('change', function (event) {
    //         var select_date = JSON.parse($(this).val());

    //         if (jsDayCheck(select_date.start) === true ||
    //             jsDayCheck(select_date.end) === true) {
    //             if ($(".product_date").length > 0) {
    //                 let _start = moment(select_date.start);
    //                 let _end = moment(select_date.end);
    //                 let _diffDays = _end.diff(_start, 'days');

    //                 var input = {};

    //                 input['sel_date'] = select_date.start;
    //                 input['sel_date2'] = select_date.end;

    //                 if ($('#keyword_input').length > 0) {
    //                     input['keyword'] = $('#keyword_input').val();
    //                 }

    //                 if (_diffDays > 7) {
    //                     input['sel_date2'] = _start.add(7, 'days').format('YYYY-MM-DD');

    //                     alert_Msg('최대 7박 선택 가능합니다.', 1, window.location.pathname + '?' + build_query(input, 5))
    //                 } else {
    //                     if (_diffDays <= 0) {
    //                         input['sel_date2'] = _start.add(1, 'days').format('YYYY-MM-DD');
    //                     }
    //                     window.location.href = window.location.pathname + '?' + build_query(input, 5);
    //                 }
    //             }
    //         }
    //     });
    // }
});
