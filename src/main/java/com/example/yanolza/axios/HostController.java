package com.example.yanolza.axios;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@AllArgsConstructor
@Controller
@RequestMapping("/hosthousemain")  //  /hosthousemain을 기준으로 설정
public class HostController {



    // 호스트 메인 페이지-----------------------------------------------------------
    @GetMapping("/") 
    public String hosthousemain() {
        return "hosthtml/hosthousemain"; // 파일안의 html을 리턴해서 읽어옴
    }


    //메인 페이지 host id값을 받아 입장 후 모든 곳에서 getmapping

    // 호스트 메인 페이지 끝~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~



    //1 마이페이지 페이지-------------------------------------------------------------
    @GetMapping("/mypageregist")
    public String mypageregist() {
        return "hosthtml/mypageregist";
    }


    //안연주 경로 바꿔야함★★★
    //마이페이지 페이지 host id값을 받아 입장 하면 cssjs경로가..
    @RequestMapping(value="/mypageregist/{id}", method= RequestMethod.GET)
    public String mypageregist_2(@PathVariable("id") Integer id, Model model) {
        model.addAttribute("id", id);
        return "hosthtml/mypageregist";
    }


    // 마이페이지 페이지 끝~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~



    //2 소개작성 페이지----------------------------------------------------------------
    @GetMapping("/introwrite")
    public String introwrite() {
        return "hosthtml/introwrite";
    }


    //소개작성 페이지 id값
    @RequestMapping(value="/introwrite/{id}", method= RequestMethod.GET)
    public String introwrite_2(@PathVariable("id") Integer id, Model model) {
        model.addAttribute("id", id);
        return "hosthtml/introwrite";
    }

    // 소개작성 페이지 끝~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~



    //3 이용규칙 페이지-----------------------------------------------------------------
    @GetMapping("/guestdetail")
    public String guestdetail() {
        return "hosthtml/guestdetail";
    }

    //이용규칙 페이지 id값
    @RequestMapping(value="/guestdetail/{id}", method= RequestMethod.GET)
    public String guestdetail_2(@PathVariable("id") Integer id, Model model) {
        model.addAttribute("id", id);
        return "hosthtml/guestdetail";
    }
    // 이용규칙 페이지 끝~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~



    // 객실관리 페이지-----------------------------------------------------------------
    @GetMapping("/guestroom")
    public String guestroom() {
        return "hosthtml/guestroom";
    }


    //객실관리 페이지 id값
    @RequestMapping(value="/guestroom/{id}/{hostid}", method= RequestMethod.GET)
    public String guestroom_2(@PathVariable("id") Integer id,@PathVariable("hostid") Integer hostid, Model model) {
        model.addAttribute("id", id);
        model.addAttribute("hostid", hostid);
        return "hosthtml/guestroom";
    }
    // 객실관리 페이지 끝~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~



    // 객실관리 - 객실추가 페이지--------------------------------------------------------
    @GetMapping("/guestroomregist")
    public String guestroomregist() {
        return "hosthtml/guestroomregist";
    }

    //객실관리 객실추가 페이지 id값
    @RequestMapping(value="/guestroomregist/{id}", method= RequestMethod.GET)
    public String guestroomregist_2(@PathVariable("id") Integer id, Model model) {
        model.addAttribute("id", id);
        return "hosthtml/guestroomregist";
    }
    // 객실관리 - 객실추가 페이지 끝~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~



    // 객실관리 - 객실디테일 페이지--------------------------------------------------------
    @GetMapping("/guestroomdetail")
    public String guestroomdetail() {
        return "hosthtml/guestroomdetail";
    }

    //객실관리 객실디테일 페이지 id값 이거뭐지 뭔가 guestroom guestroomdetail 차이가있나요 필요한것만 써주고 매핑주석해주세요
    @RequestMapping(value="/guestroomdetail/{id}", method= RequestMethod.GET)
    public String guestroomdetail_2(@PathVariable("id") Integer id, Model model) {
        model.addAttribute("id", id);
        return "hosthtml/guestroomdetail";
    }
    // 객실관리 - 객실디테일 페이지 끝~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~



    // 객실관리 - 객실수정 페이지--------------------------------------------------------
    @GetMapping("/guestroomedit")
    public String guestroomedit() {
        return "hosthtml/guestroomedit";
    }


    //객실관리 객실수정 페이지 id값
    //id = roomid, hostid = hostid
    @RequestMapping(value="/guestroomedit/{id}", method= RequestMethod.GET)
    public String guestroomedit_2(@PathVariable("id") Integer id, Model model) {
        model.addAttribute("id", id);
        return "hosthtml/guestroomedit";
    }
    // 객실관리 - 객실수정 페이지 끝~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~



    // 리뷰관리 - 전체리뷰 페이지--------------------------------------------------------
    @GetMapping("/guestAllReview")
    public String guestAllReview() {
        return "hosthtml/guestAllReview";
    }


    //리뷰관리 전체리뷰 페이지 id값
    @RequestMapping(value="/guestAllReview/{id}/{hostid}", method= RequestMethod.GET)
    public String guestAllReview_2(@PathVariable("id") Integer id, @PathVariable("hostid") Integer hostid,Model model) {
        model.addAttribute("id", id);
        model.addAttribute("hostid", hostid);
        return "hosthtml/guestAllReview";
    }
    // 리뷰관리  - 전체리뷰 페이지 끝~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~



    // 리뷰관리 - 미답변리뷰 페이지------------------------------------------------------
    @GetMapping("/guestReview")
    public String guestReview() {
        return "hosthtml/guestReview";
    }

    //리뷰관리 미답변리뷰 페이지 id값
    @RequestMapping(value="/guestReview/{id}/{hostid}", method= RequestMethod.GET)
    public String guestReview_2(@PathVariable("id") Integer id, @PathVariable("hostid") Integer hostid, Model model) {
        model.addAttribute("id", id);
        model.addAttribute("hostid", hostid);
        return "hosthtml/guestReview";
    }
    // 리뷰관리  - 미답변리뷰 페이지 끝~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~



    // 리뷰관리 - 미답변리뷰 작성 페이지--------------------------------------------------
    @GetMapping("/guestReviewdetail")
    public String guestReviewdetail() {
        return "hosthtml/guestReviewdetail";
    }


    //리뷰관리 미답변리뷰 작성 페이지 id값
    @RequestMapping(value="/guestReviewdetail/{id}", method= RequestMethod.GET)
    public String guestReviewdetail_2(@PathVariable("id") Integer id, Model model) {
        model.addAttribute("id", id);
        return "hosthtml/guestReviewdetail";
    }
    // 리뷰관리  - 미답변리뷰 작성 페이지 끝~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~



    // 예약관리 - 실시간 예약현황 페이지--------------------------------------------------
    @GetMapping("/scheduleManagement")
    public String scheduleManagement() {
        return "hosthtml/scheduleManagement";
    }



    //예약관리 - 실시간 예약현황 페이지 hostid
    @RequestMapping(value="/scheduleManagement/{id}", method= RequestMethod.GET)
    public String scheduleManagement_2(@PathVariable("id") Integer id, Model model) {
        model.addAttribute("id", id);
        return "hosthtml/scheduleManagement";
    }


    // 예약관리 - 실시간 예약현황 페이지 끝~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~



    // 예약관리 - 예약관리 페이지---------------------------------------------------------
    @GetMapping("/book")
    public String book() {
        return "hosthtml/book";
    }
    // 예약관리 - 예약관리 페이지 끝~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~



    // 예약관리 - 예약관리 - 확인 페이지---------------------------------------------------------
    @GetMapping("/scheduleManagement6")
    public String scheduleManagement6() {
        return "hosthtml/scheduleManagement6";
    }
    // 예약관리 - 예약관리 - 확인 페이지 끝~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~



    // 예약관리 - 예약내역 페이지---------------------------------------------------------
    @GetMapping("/book2")
    public String book2() {
        return "hosthtml/book2";
    }
    // 예약관리 - 예약내역 페이지 끝~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~



    // 예약관리 - 예약내역 페이지---------------------------------------------------------
    @GetMapping("/scheduleManagement3")
    public String scheduleManagement3() {
        return "hosthtml/scheduleManagement3";
    }
    // 예약관리 - 예약내역 페이지 끝~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    // 이미지 테스트 페이지---------------------------------------------------------
    @GetMapping("/hostimg")
    public String hostimg() {
        return "hosthtml/hostimg";
    }


    @GetMapping("/hostimg_send")
    public String hostimg_send() {
        return "hosthtml/hostimg_send";
    }
    //이미지 테스트 끝======-----------





}
