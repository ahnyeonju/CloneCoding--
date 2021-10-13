$(function(){
    // Validation
    $.validator.addMethod("pw_samechar", function (value, element) {
        var check = /([a-zA-Z0-9\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'])\1\1/;
        return this.optional(element) || !check.test(value);
    });
     
    $.validator.addMethod("pw_check", function(value, element) {
        return this.optional(element) || /^(?=.*[a-zA-Z])(?=.*[#\&\\+\-%@=\/\\\:;,\.\'\"\^`~\_|\!\/\?\*$#<>()\[\]\{\}])(?=.*[0-9])/.test(value);
    });
    // $.validator.addMethod("pw_samechar_not", function(value, element, param) {
    //     return this.optional(element) || value != $(param).val();
    // });
         
     $('.validate_pw').validate({
        rules : {
            new_pw : {
                    pw_samechar : true,
                    required : true,
                    pw_check : true,
                    minlength: 8
            },
            new_pw_re : {
                    required : true,
                    equalTo : '#new_pw'
            }
        },
        messages : {
            new_pw : {
                    required : '새로운 비밀번호를 입력해주세요.',
                    pw_samechar : '4자 이상 동일문자를 연속적으로 사용할 수 없습니다.',
                    minlength : '영문, 숫자, 특수문자를 포함한 8자리 이상 입력해 주세요.',
                    pw_check : '영문, 숫자, 특수문자를 포함한 8자리 이상 입력해 주세요.'
            },
            new_pw_re : {
                    required : '확인을 위해 새 비밀번호를 입력해 주세요.',
                    equalTo : '새 비밀번호와 일치하지 않습니다.'
            }
        },
        submitHandler: function(form) {
            $.ajax({
                method : 'POST',
                url : '/auth/setPassword',
                data : $("#my-form").serialize(),
                dataType : 'json',
                success : function(res) {
                    if ( res.success_check ) {
                        alert(res.msg);
                        $('#pw_change').modal('hide');
                    } else {
                        alert(res.msg);
                    }
                },
                error : function() {
                    alert('오류가 발생하였습니다. 잠시후 다시 시도해주세요.');
                }
            });
        }
    });

    $('#pw_change').on('click', function() {
        $.getJSON('/auth/setExtendPassword', function(result){
            alert(result.msg);
        });
    });
});