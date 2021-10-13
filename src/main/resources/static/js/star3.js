
// 별 클릭하면 1점씩 채워지는 function
$(".star").on('click',function(){ 
    var idx = $(this).index();
    $(".star").removeClass("on");
      for(var i=0; i<=idx; i++){
         $(".star").eq(i).addClass("on");
        //  여기가 input hidden
         $('input[name=star_score]').attr('value',i+1);
    }
  });

  // let ahn_sel_date = this.startDate.format('YYYY-MM-DD');
  // let ahn_sel_date2 = this.endDate.format('YYYY-MM-DD');
  // console.log(ahn_sel_date);
  // console.log(ahn_sel_date2);
  // $('input[name=ahn_sel_date]').attr('value',ahn_sel_date);
  // $('input[name=ahn_sel_date2]').attr('value',ahn_sel_date2);