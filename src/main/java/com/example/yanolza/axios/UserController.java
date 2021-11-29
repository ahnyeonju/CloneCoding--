package com.example.yanolza.axios;


import com.example.yanolza.controller.Utility;
import com.example.yanolza.model.entity.TbMem;
import com.example.yanolza.security.data.TbMemDTO;
import com.example.yanolza.security.login.TbMemberService;
import com.example.yanolza.service.TbMemApiService;
import lombok.AllArgsConstructor;
import net.bytebuddy.utility.RandomString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;

@AllArgsConstructor
@Controller
@RequestMapping("/userindex")  //  /userindex를 기준으로 설정
public class UserController {

    private final TbMemApiService tbMemApiService;

    @Autowired
    private JavaMailSender mailSender; // 비밀번호 재설정 이메일 발송하기 위해서 필요한 클래스

    // 유저 메인 페이지-----------------------------------------------------------
    @GetMapping("/") 
    public String userindex() {
        return "userhtml/index"; // 파일안의 html을 리턴해서 읽어옴
    }
    // 유저 메인 페이지 끝~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~



//========================================more 더보기=============================================//


    // 더보기 - 이벤트 페이지-------------------------------------------------------
    @GetMapping("/event")
    public String event() {
        return "userhtml/more/event";
    }
    // 더보기 - 이벤트 페이지 끝~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


    // 더보기 - 이벤트11 페이지-------------------------------------------------------
    @GetMapping("/event11")
    public String event11() {
        return "userhtml/more/eventView/event11";
    }
    // 더보기 - 이벤트11 페이지 끝~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


    // 더보기 - 이벤트12 페이지-------------------------------------------------------
    @GetMapping("/event12")
    public String event12() {
        return "userhtml/more/eventView/event12";
    }
    // 더보기 - 이벤트12 페이지 끝~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


    // 더보기 - 이벤트13 페이지-------------------------------------------------------
    @GetMapping("/event13")
    public String event13() {
        return "userhtml/more/eventView/event13";
    }
    // 더보기 - 이벤트13 페이지 끝~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


    // 더보기 - 이벤트14 페이지-------------------------------------------------------
    @GetMapping("/event14")
    public String event14() {
        return "userhtml/more/eventView/event14";
    }
    // 더보기 - 이벤트14 페이지 끝~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


    // 더보기 - 이벤트15 페이지-------------------------------------------------------
    @GetMapping("/event15")
    public String event15() {
        return "userhtml/more/eventView/event15";
    }
    // 더보기 - 이벤트15 페이지 끝~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


    // 더보기 - 이벤트16 페이지-------------------------------------------------------
    @GetMapping("/event16")
    public String event16() {
        return "userhtml/more/eventView/event16";
    }
    // 더보기 - 이벤트16 페이지 끝~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


    // 더보기 - 이벤트17 페이지-------------------------------------------------------
    @GetMapping("/event17")
    public String event17() {
        return "userhtml/more/eventView/event17";
    }
    // 더보기 - 이벤트17 페이지 끝~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


    // 더보기 - 이벤트18 페이지-------------------------------------------------------
    @GetMapping("/event18")
    public String event18() {
        return "userhtml/more/eventView/event18";
    }
    // 더보기 - 이벤트17 페이지 끝~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


    // 더보기 - 이벤트19 페이지-------------------------------------------------------
    @GetMapping("/event19")
    public String event19() {
        return "userhtml/more/eventView/event19";
    }
    // 더보기 - 이벤트19 페이지 끝~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


    // 더보기 - 이벤트20 페이지------------------------------------------------------
    @GetMapping("/event20")
    public String event20() {
        return "userhtml/more/eventView/event20";
    }
    // 더보기 - 이벤트20 페이지 끝~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~



    // 더보기 - 자주묻는질문 페이지---------------------------------------------------
    @GetMapping("/faq") 
    public String faq() {
        return "userhtml/more/faq";
    }
    // 더보기 - 자주묻는질문 페이지 끝~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


    // 더보기 - 자주묻는질문26 페이지---------------------------------------------------
    @GetMapping("/faq26") 
    public String faq26() {
        return "userhtml/more/faq/26";
    }
    // 더보기 - 자주묻는질문26 페이지 끝~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


    // 더보기 - 자주묻는질문27 페이지---------------------------------------------------
    @GetMapping("/faq27") 
    public String faq27() {
        return "userhtml/more/faq/27";
    }
    // 더보기 - 자주묻는질문27 페이지 끝~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


    // 더보기 - 자주묻는질문28 페이지---------------------------------------------------
    @GetMapping("/faq28") 
    public String faq28() {
        return "userhtml/more/faq/28";
    }
    // 더보기 - 자주묻는질문28 페이지 끝~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


    // 더보기 - 자주묻는질문29 페이지---------------------------------------------------
    @GetMapping("/faq29") 
    public String faq29() {
        return "userhtml/more/faq/29";
    }
    // 더보기 - 자주묻는질문29 페이지 끝~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


    // 더보기 - 자주묻는질문30 페이지---------------------------------------------------
    @GetMapping("/faq30") 
    public String faq30() {
        return "userhtml/more/faq/30";
    }
    // 더보기 - 자주묻는질문30 페이지 끝~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


    // 더보기 - 자주묻는질문32 페이지---------------------------------------------------
    @GetMapping("/faq32") 
    public String faq32() {
        return "userhtml/more/faq/32";
    }
    // 더보기 - 자주묻는질문32 페이지 끝~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


    // 더보기 - 자주묻는질문33 페이지---------------------------------------------------
    @GetMapping("/faq33") 
    public String faq33() {
        return "userhtml/more/faq/33";
    }
    // 더보기 - 자주묻는질문33 페이지 끝~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


    // 더보기 - 자주묻는질문36 페이지---------------------------------------------------
    @GetMapping("/faq36") 
    public String faq36() {
        return "userhtml/more/faq/36";
    }
    // 더보기 - 자주묻는질문36 페이지 끝~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


    // 더보기 - 1:1문의 페이지--------------------------------------------------------
    @GetMapping("/inquiry") 
    public String inquiry() {
        return "userhtml/more/inquiry";
    }
    // 더보기 -  1:1문의  페이지 끝~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


    // 더보기 - 공지사항 페이지---------------------------------------------------------
    @GetMapping("/notice") 
    public String notice() {
        return "userhtml/more/notice";
    }
    // 더보기 - 공지사항 페이지 끝~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


    // 더보기 - 혁신 프로젝트 페이지-----------------------------------------------------
    @GetMapping("/project") 
    public String project() {
        return "userhtml/more/project";
    }
    // 더보기 - 혁신 프로젝트 페이지 끝~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


    // 더보기 - 혁신 프로젝트01 페이지-----------------------------------------------------
    @GetMapping("/project01") 
    public String project01() {
        return "userhtml/more/project/project01";
    }
    // 더보기 - 혁신 프로젝트01 페이지 끝~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


    // 더보기 - 혁신 프로젝트02 페이지-----------------------------------------------------
    @GetMapping("/project02") 
    public String project02() {
        return "userhtml/more/project/project02";
    }
    // 더보기 - 혁신 프로젝트02 페이지 끝~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


    // 더보기 - 혁신 프로젝트03 페이지-----------------------------------------------------
    @GetMapping("/project03") 
    public String project03() {
        return "userhtml/more/project/project03";
    }
    // 더보기 - 혁신 프로젝트03 페이지 끝~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


    // 더보기 - 혁신 프로젝트04 페이지-----------------------------------------------------
    @GetMapping("/project04") 
    public String project04() {
        return "userhtml/more/project/project04";
    }
    // 더보기 - 혁신 프로젝트04 페이지 끝~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


    // 더보기 - 혁신 프로젝트05 페이지-----------------------------------------------------
    @GetMapping("/project05") 
    public String project05() {
        return "userhtml/more/project/project05";
    }
    // 더보기 - 혁신 프로젝트05 페이지 끝~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


    // 더보기 - 혁신 프로젝트06 페이지-----------------------------------------------------
    @GetMapping("/project06") 
    public String project06() {
        return "userhtml/more/project/project06";
    }
    // 더보기 - 혁신 프로젝트06 페이지 끝~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


    // 더보기 - 혁신 프로젝트07 페이지-----------------------------------------------------
    @GetMapping("/project07") 
    public String project07() {
        return "userhtml/more/project/project07";
    }
    // 더보기 - 혁신 프로젝트07 페이지 끝~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


    // 더보기 - 혁신 프로젝트08 페이지-----------------------------------------------------
    @GetMapping("/project08") 
    public String project08() {
        return "userhtml/more/project/project08";
    }
    // 더보기 - 혁신 프로젝트08 페이지 끝~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


    // 더보기 - 혁신 프로젝트09 페이지-----------------------------------------------------
    @GetMapping("/project09") 
    public String project09() {
        return "userhtml/more/project/project09";
    }
    // 더보기 - 혁신 프로젝트09 페이지 끝~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


    // 더보기 - 혁신 프로젝트10 페이지-----------------------------------------------------
    @GetMapping("/project10") 
    public String project10() {
        return "userhtml/more/project/project10";
    }
    // 더보기 - 혁신 프로젝트10 페이지 끝~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~



    // 더보기 - 약관 및 정책 페이지-----------------------------------------------------
    @GetMapping("/terms") 
    public String terms() {
        return "userhtml/more/terms";
    }
    // 더보기 - 약관 및 정책  페이지 끝~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


    // 더보기 - 약관 및 정책 location 페이지---------------------------------------------
    @GetMapping("/location") 
    public String location() {
        return "userhtml/more/terms/location";
    }
    // 더보기 - 약관 및 정책 location 페이지 끝~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


    // 더보기 - 약관 및 정책 privacy 페이지----------------------------------------------
    @GetMapping("/privacy") 
    public String privacy() {
        return "userhtml/more/terms/privacy";
    }
    // 더보기 - 약관 및 정책 privacy  페이지 끝~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


    // 더보기 - 약관 및 정책 teenager 페이지----------------------------------------------
    @GetMapping("/teenager") 
    public String teenager() {
        return "userhtml/more/terms/teenager";
    }
    // 더보기 - 약관 및 정책 teenager 페이지 끝~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


//=====================================more 더보기 끝 ======================================//


    
//=====================================product ===========================================//    


    // 내주변 1_005 페이지----------------------------------------------
    @GetMapping("/1_005")
    public String product1005() {
        return "userhtml/product/1_005";
    }

    //host id값을 받아 입장
    @RequestMapping(value="/1_005/{id}/{tbMemId}", method= RequestMethod.GET)
    public String product1005_2(@PathVariable("id") Integer id, @PathVariable("tbMemId") Integer tbMemId, Model model) {
        model.addAttribute("id", id);
        model.addAttribute("tbMemId",tbMemId);
        return "userhtml/product/1_005";
    }
    // 내주변 1_005 페이지 끝~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


    // 내주변 list 페이지----------------------------------------------
    @GetMapping("/list")
    public String list() {
        return "userhtml/product/list";
    }
    // 내주변 list 페이지 끝~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


    // 내주변 room 페이지----------------------------------------------
    @GetMapping("/room")
    public String room() {
        return "userhtml/product/room";
    }
    // 내주변 room 페이지 끝~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


    // 내주변 search1 페이지----------------------------------------------
    @GetMapping("/1")
    public String search1() {
        return "userhtml/product/search/1";
    }
    // 내주변 search1 페이지 끝~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


    // 내주변 search2 페이지----------------------------------------------
    @GetMapping("/2")
    public String search2() {
        return "userhtml/product/search/2";
    }
    // 내주변 search2 페이지 끝~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


    // 내주변 search3 페이지----------------------------------------------
    @GetMapping("/3")
    public String search3() {
        return "userhtml/product/search/3";
    }
    // 내주변 search3 페이지 끝~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


    // 내주변 search4 페이지----------------------------------------------
    @GetMapping("/4")
    public String search4() {
        return "userhtml/product/search/4";
    }
    // 내주변 search4 페이지 끝~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


    // 내주변 search5 페이지----------------------------------------------
    @GetMapping("/5")
    public String search5() {
        return "userhtml/product/search/5";
    }
    // 내주변 search5 페이지 끝~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


    // 내주변 search6 페이지----------------------------------------------
    @GetMapping("/6")
    public String search6() {
        return "userhtml/product/search/6";
    }
    // 내주변 search6 페이지 끝~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


    // 내주변 search7 페이지----------------------------------------------
    @GetMapping("/7")
    public String search7() {
        return "userhtml/product/search/7";
    }
    // 내주변 search7 페이지 끝~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


    // 내주변 search8 페이지----------------------------------------------
    @GetMapping("/8")
    public String search8() {
        return "userhtml/product/search/8";
    }
    // 내주변 search8 페이지 끝~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//=====================================product 끝 ==================================//



// =====================================reservation=================================//


    // 예약내역 checkout 페이지----------------------------------------------
    @GetMapping("/checkout")
    public String checkout() {
        return "userhtml/reservation/checkout";
    }


    //회원번호 룸번호
    //mem, room id값을 받아 입장 room은뭐지?
    @RequestMapping(value="/checkout/{tbMemId}/{id}/{tbRoomId}", method= RequestMethod.GET)
    public String checkout_2(@PathVariable("tbMemId") Integer tbMemId, @PathVariable("id") Integer id, @PathVariable("tbRoomId") Integer tbRoomId, Model model) {
        model.addAttribute("tbMemId", tbMemId);
        //이거 host id 임
        model.addAttribute("id", id);
        model.addAttribute("tbRoomId",tbRoomId);
        return "userhtml/reservation/checkout";
    }
    // 예약내역 checkout  페이지 끝~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


    // 예약내역 reservations 페이지----------------------------------------------
    @GetMapping("/reservations")
    public String reservations() {
        return "userhtml/reservation/reservations";
    }
    // 예약내역 reservations 페이지 끝~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~



// ================================reservation 끝=================================//



// ================================user2==========================================//
    private TbMemberService tbMemberService;

        @PostMapping("/signup")
        public String signup(TbMemDTO tbMemDTO){
            tbMemberService.save(tbMemDTO);
            return "userhtml/index";
        }



    // user2회원가입 join 페이지----------------------------------------------
    @GetMapping("/join")
    public String join() {
        return "userhtml/user2/join";
    }
    // user2회원가입 join 페이지 끝~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    // user2회원가입 passwordjoin 페이지----------------------------------------------
    @GetMapping("/passwordJoin")
    public String passwordJoin() {
        return "userhtml/user2/passwordjoin";
    }
    // user2회원가입 join 페이지 끝~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    // user2회원가입 login 페이지----------------------------------------------
    @GetMapping("/login")
    public String login() {
        return "userhtml/user2/login";
    }
    // user2회원가입 login 페이지 끝~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


    // user2회원가입 passwdPhoneConfirmProcess 페이지---------------------------
    @GetMapping("/passwdPhoneConfirmProcess")
    public String passwdPhoneConfirmProcess() {
        return "userhtml/user2/passwdPhoneConfirmProcess";
    }
    // user2회원가입 passwdPhoneConfirmProcess 페이지 끝~~~~~~~~~~~~~~~~~~~~~~~~~


    // user2회원가입 passwdResetNew 페이지---------------------------------------
    @GetMapping("/passwdResetNew")
    public String passwdResetNew() {
        return "userhtml/user2/passwdResetNew";
    }
    // user2회원가입 passwdResetNew 페이지 끝~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


    // user2회원가입 passwdResetStart 페이지--------------------------------------
    @GetMapping("/passwdResetStart")
    public String passwdResetStart() {
        return "userhtml/user2/passwdResetStart";
    }
    // user2회원가입 passwdResetStart 페이지 끝~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


    // user2회원가입 selectConfirm 페이지-----------------------------------------
    @GetMapping("/selectConfirm")
    public String selectConfirm() {
        return "userhtml/user2/selectConfirm";
    }
    // user2회원가입 selectConfirm 페이지 끝~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


    // user2회원가입 selectConfirmProcess 페이지-----------------------------------------
    @GetMapping("/selectConfirmProcess")
    public String selectConfirmProcess() {
        return "userhtml/user2/selectConfirmProcess";
    }
    // user2회원가입 selectConfirmProcess 페이지 끝~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


// ================================user2 끝 =========================================//
//============ 내정보 =====//
    @GetMapping("/mypage")
    public String mypage(){return "userhtml/my/mypage";}

    @GetMapping("/zzim")
    public String zzim(){return "userhtml/my/zzim";}

    @GetMapping("/review")
    public String review(){return "userhtml/my/review";}


    //reservations 페이지 에서
    //review host / room id값을 받아 입장
    @RequestMapping(value="/review/{id}/{tbRoomId}", method= RequestMethod.GET)
    public String review_2(@PathVariable("id") Integer id,@PathVariable("tbRoomId") Integer tbRoomId,  Model model) {
        model.addAttribute("id", id);
        model.addAttribute("tbRoomId", tbRoomId);
        return "userhtml/my/review";
    }
    // 비밀번호 재설정 관련 ==============================================================================================
    // 비밀번호재설정
    @GetMapping("/forgot_password")
    public String forgot_password() {
        return "userhtml/user2/forgot_password";
    }


    public void sendEmail(String recipientEmail, String link)
            throws MessagingException, UnsupportedEncodingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom("yanolza@yanolza.com", "여기어때팀");
        helper.setTo(recipientEmail);

        String subject = "여기어때 비밀번호 찾기메일입니다.";

        String content = "<p>안녕하세요</p>"
                + "<p>여기어때 팀 입니다</p>"
                + "<p>아래버튼을 클릭하여 비밀번호를 변경해주세요</p>"
                + "<p><a href=\"" + link + "\">비밀번호변경 링크</a></p>"
                + "<br>"
                + "<p>감사합니다."
                + "<p>본인이 아닐경우 고객센터로 신고바랍니다.</p>";
        //저 link를 클릭하면 비밀번호 재설정 페이지가 똭 떠야하는데...음;
        helper.setSubject(subject);

        helper.setText(content, true);

        mailSender.send(message);
    }

    //비밀번호 재설정 ↓ 이메일 입력하고 확인버튼 눌렀을 때
    @PostMapping("/forgot_password")
    public String processForgotPassword(HttpServletRequest request, Model model) {
        String email = request.getParameter("email"); //input 에서 입력한 email 값 받아옴;
        String token = RandomString.make(30); // 토큰 생성

        try {
            tbMemApiService.updateResetPasswordToken(token, email); // 토큰값 세팅 해줌
            String resetPasswordLink = Utility.getSiteURL(request) + "/userindex/reset_password?token=" + token; //링크 만들어줌?
            sendEmail(email, resetPasswordLink); // send 메소드 호출!
            model.addAttribute("message", "암호 재설정 링크가 이메일로 발송되었습니다.");

        } catch (UnsupportedEncodingException | MessagingException e) {
            model.addAttribute("error", "Error while sending email");
        }

        return "userhtml/user2/forgot_password";
    }


    //비밀번호 바꿔주는 페이지 get 토큰값 가져와야함
    @GetMapping("/reset_password")
    public String showResetPasswordForm(@Param(value = "token") String token, Model model) {
        TbMem tbMem = tbMemApiService.getByResetPasswordToken(token);
        model.addAttribute("token", token);
        if (tbMem == null) {
            model.addAttribute("message", "Invalid Token");
            return "userhtml/user2/message";
        }
        return "userhtml/user2/reset_password_form";
    }

    //비밀번호 재설정하고 확인버튼 누르면 ~
    @PostMapping("/reset_password")
    public String processResetPassword(HttpServletRequest request, Model model) {
        String token = request.getParameter("token");
        String password = request.getParameter("password");

        TbMem tbMem = tbMemApiService.getByResetPasswordToken(token);
        model.addAttribute("title", "Reset your password");

        if (tbMem == null) {
            model.addAttribute("message", "Invalid Token");
            return "message";
        } else { //↓ 찐 암호화된 비번 바꾸는거임;
            tbMemApiService.updatePassword(tbMem, password);

            model.addAttribute("message", "You have successfully changed your password.");
        }

        return "userhtml/index";
    }

}
