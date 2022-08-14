let delImgArr = []


window.onload = function() {
    var httpRequest;

    let idChkBool = false;
    let pwChkBool = false;
    let upd_pwChkBool = false;

    let idBox = document.querySelector('#id');
    let pwBox = document.querySelector('#pw');
    let pwChkBox = document.querySelector('#pwChk');

    let updPwBox = document.querySelector('#upd_pw');
    let updPwChkBox = document.querySelector('#upd_pwChk');

    let idChkBtn = document.querySelector("#idChkBtn");
    let pwChkBtn = document.querySelector("#pwChkBtn");
    let updPwChkBtn = document.querySelector("#upd_pwChkBtn");
    let signupBtn = document.querySelector("#signup_btn");
    let loginBtn = document.querySelector("#login_btn");

    let findPwBtn = document.querySelector("#findpw_btn");


    let updForm = document.getElementById('upd_form')
    let userDataUpdBtn = document.querySelector("#upd_btn");
    let pwModBtn = document.querySelector("#upd_pwModBtn");



    // ID 유효성 컨트롤: 회원 가입 여부 체크
    idChkBtn.addEventListener('click', () => {
        var userId = document.querySelector("#id").value;

        if (isEmpty(userId)) {
             alert("아이디를 입력해주세요.");
        } else {
            httpRequest = new XMLHttpRequest();
            httpRequest.onreadystatechange = () => {
                if (httpRequest.readyState === XMLHttpRequest.DONE) {
                      if (httpRequest.status === 200) {
                        var result = httpRequest.response;
                         if (result > 0) {
                          document.querySelector("#idChkAlert > .red").classList.remove('none');
                         } else {
                            document.querySelector("#idChkAlert > .porintColor").classList.remove('none');
                            document.querySelector("#idChkAlert > .red").classList.add('none');
                            idBox.readOnly = true; // 재수정 불가를 위한 readOnly 활성화
                            idChkBool = true;
                         }
                      } else {
                        alert('Request Error');
                      }
                }
            };
            httpRequest.open('GET', '/idDupChk?' + "userId=" + userId);
            httpRequest.send();
        }
    });

    // 아이디 재설정
    idBox.addEventListener('click', () => {
        if (idChkBool == true) {
            if (confirm("아이디를 재설정하시겠습니까? 아이디 중복 확인을 다시 받으셔야 합니다.")) {
                idChkBool = false;
                document.querySelector("#idChkAlert > .porintColor").classList.add('none');
                idBox.value = "";
                idBox.readOnly = false;
                idBox.focus;
            }
       }
     });

    // PW 유효성 컨트롤: 패스워드 일치 여부 체크
    pwChkBtn.addEventListener('click', () => {

        const pwMatched = pw.value === pwChk.value
        const pwExped = pwExp(pw.value)

        if ( isEmpty(pw.value) || isEmpty(pwChk.value) ) {
            document.querySelector("#pwChkAlert > .red > .alert-text").innerText = "패스워드를 입력하세요."
            document.querySelector("#pwChkAlert > .red").classList.remove('none');
            pwChkBool = false;
        } else

        if(!pwMatched) {
            document.querySelector("#pwChkAlert > .red > .alert-text").innerText = "비밀번호가 일치하지 않습니다."
            document.querySelector("#pwChkAlert > .red").classList.remove('none');
            pwChkBool = false;
        } else

        if (!pwExped) {
            document.querySelector("#pwChkAlert > .red > .alert-text").innerText = "영문, 숫자, 특수문자를 혼합하여 입력해주세요."
            document.querySelector("#pwChkAlert > .red").classList.remove('none');
            pwChkBool = false;
        } else

        if(pwMatched && pwExped) {
            pwChkBool = true;
            document.querySelector("#pwChkAlert > .porintColor").classList.remove('none');
            document.querySelector("#pwChkAlert > .red").classList.add('none');
            pwBox.readOnly = true;
            pwChkBox.readOnly = true;
        }
    });

    // 회원정보 수정 비밀번호 재설정
    pwBox.addEventListener('click', () => {
        if (pwChkBool == true) {
            if (confirm("비밀번호를 재설정하시겠습니까? 패스워드 확인을 다시 받으셔야 합니다.")) {
                pwChkBool = false;
                pwBox.value = "";
                pwBox.readOnly = false;
                pwChkBox.value = "";
                pwChkBox.readOnly = false;
                pwBox.focus;
                document.querySelector("#pwChkAlert > .porintColor").classList.add('none');
            }
       }
     });

    // 비밀번호 수정 유효성 체크
   upd_pwChkBtn.addEventListener('click', () => {

        const pwMatched = upd_pw.value === upd_pwChk.value
        const pwExped = pwExp(upd_pw.value)

        if ( isEmpty(upd_pw.value) || isEmpty(upd_pwChk.value) ) {
            document.querySelector("#upd_pwChkAlert > .red > .alert-text").innerText = "패스워드를 입력하세요."
            document.querySelector("#upd_pwChkAlert > .red").classList.remove('none');
            upd_pwChkBool = false;
        }else

        if(!pwMatched) {
            document.querySelector("#upd_pwChkAlert > .red > .alert-text").innerText = "비밀번호가 일치하지 않습니다."
            document.querySelector("#upd_pwChkAlert > .red").classList.remove('none');
            upd_pwChkBool = false;
        }else

        if (!pwExped) {
            document.querySelector("#upd_pwChkAlert > .red > .alert-text").innerText = "영문, 숫자, 특수문자를 혼합하여 입력해주세요."
            document.querySelector("#upd_pwChkAlert > .red").classList.remove('none');
            upd_pwChkBool = false;
        }

        if(pwMatched && pwExped) {
            upd_pwChkBool = true;
            document.querySelector("#upd_pwChkAlert > .porintColor").classList.remove('none');
            document.querySelector("#upd_pwChkAlert > .red").classList.add('none');
            updPwBox.readOnly = true;
            updPwChkBox.readOnly = true;
        }

    });

    // 회원정보 수정 비밀번호 재설정
    updPwBox.addEventListener('click', () => {
        if (upd_pwChkBool == true) {
            if (confirm("비밀번호를 재설정하시겠습니까? 패스워드 확인을 다시 받으셔야 합니다.")) {
                upd_pwChkBool = false;
                updPwBox.value = "";
                updPwBox.readOnly = false;
                updPwChkBox.value = "";
                updPwChkBox.readOnly = false;
                updPwBox.focus;
                document.querySelector("#upd_pwChkAlert > .porintColor").classList.add('none');
            }
       }
     });

    // 회원 가입 버튼 유효성 컨트롤: stateHandler
    signupBtn.addEventListener('click', () => {
      if (chkAll()) {
        alert("유효성 테스트 통과");
        emailValid();
      } else {
        alert("유효성 테스트 미통과");
        event.preventDefault();
      }
    });


   userDataUpdBtn.addEventListener('click', () => {
        if (updChkAll()) {
            document.querySelector('#userUpdBox').classList.add('none');
            $dim(false);
            if(!delImgArr.isEmpty){
                for (const i in delImgArr ){
                 $.ajax({
                        data:{"delImgFileNm" : delImgArr[i]},
                        type:"GET",
                        url:"/delImgFile",
                        success:function(data) {
                           console.log("이미지 삭제 완료");
                        },
                        error:function(request, status, error) {
                            console.log("이미지 삭제 실패");
                        }
                    })
                }
            }
            updForm.submit();
        } else {
           alert("비밀번호를 확인하세요.")
           event.preventDefault();
         }
   })

    function chkAll() {
        if(idChkBool && pwChkBool) {
           return true;
        }else{
           return false;
        }
    }

    function updChkAll() {
        let passMod = (document.querySelector('#upd_pw').value.length > 0 || document.querySelector('#upd_pwChk').value.length > 0 ) ? true : false
        // 비밀번호 입력 확인

        // 비밀번호 수정 여부 체크
        if((passMod && upd_pwChkBool) || (!passMod && !upd_pwChkBool)){
               return true;
        }else{
               return false;
        }
    }

    function pwExp(pw) {
         let num = pw.search(/[0-9]/g);
         let eng = pw.search(/[a-z]/ig);
         let spe = chkSpecialChar(pw) ? 0 : -1;

        if(num < 0 || eng < 0 || spe < 0 ){
            return false;
        }else {
            return true;
        }

    }

   loginBtn.addEventListener('click', () => {
        var id = document.getElementById("login_id").value;
        var password = document.getElementById("login_pw").value;

        if(id.length == 0) {
          alert("아이디를 입력하세요.");
          return false
        }

        if(id.length == 0) {
          alert("비밀번호를 입력하세요.");
          return false
        }

        $.ajax({
            url:"/authCheck",
            data : {"login_Id":id},
            type:"GET",
            success:function(data) {
                if (data.idExist=="0") {
                    alert("존재하지 않는 아이디입니다.");
                } else {
                    if (data.authKey!="Y") {
                        alert("메일 인증이 완료되지 않았습니다.");
                    } else {
                        document.getElementById("login_form").submit();
                    }
                }
            },
            error:function(request, status, error) {
            	alert("실패");
            }
        })
    })

    findPwBtn.addEventListener('click', () => {

        let id = document.querySelector("#findpw_Id").value

        $.ajax({
            url:"/idDupChk",
            data : {"userId": id},
            type:"GET",
            success:function(data) {
                if (data == 0) {
                  document.querySelector("#findPwAlert > .red").classList.remove('none');
                }else{
                  chgePwEmail(id);
                }
            },
            error:function(request, status, error) {
            	alert("실패");
            }
        })

    })

}


function login() {
    document.querySelector('#loginBox').classList.remove('none');
    document.querySelector('#joinBox').classList.add('none');
    document.querySelector('#userUpdBox').classList.add('none');
    $dim();
}

function signUp() {
    document.querySelector('#signUpBox').classList.remove('none');
    document.querySelector('#joinBox').classList.add('none');
    document.querySelector('#loginBox').classList.add('none');
    document.querySelector('#userUpdBox').classList.add('none');
    $dim();
}

function findPw() {
    document.querySelector('#findPwBox').classList.remove('none');
    document.querySelector('#loginBox').classList.add('none');
    $dim();
}

function userUpd() {
    document.querySelector('#userUpdBox').classList.remove('none');
    document.querySelector('#bar-chk').checked = false;
    $dim();
}

function userWithdraw() {
    let withdrawal = confirm("탈퇴하시겠습니까?")

    if (withdrawal) {
        location.href = "/user/withdraw"
    }
}

function memPopUpClose() {
    document.querySelector('#signUpBox').classList.add('none');
    document.querySelector('#loginBox').classList.add('none');
    document.querySelector('#userUpdBox').classList.add('none');
    document.querySelector('#findPwBox').classList.add('none');
    $dim(false);
    location.reload();
}

// 회원가입 이메일 인증
function emailValid() {
    var email_Id = document.getElementById('id').value;

    $.ajax({
        data:{"email_Id":email_Id},
        type:"GET",
        url:"/authMailSend",
        success:function(data) {
            document.getElementById('reg_form').submit();
        },
        error:function(request, status, error) {
            alert("실패");
        }
    })
}


// 비밀번호 이메일 인증
function chgePwEmail(userId) {

    $.ajax({
        data:{"user_id":userId},
        type:"GET",
        url:"/pwMailSend",
        success:function(data) {
            alert("임시 비밀번호 변경 링크가 발송됩니다. 이메일을 확인하세요!")
        },
        error:function(request, status, error) {
            alert("실패");
        }
    })
}



// 이미지 삭제
function imgDel(delImgFileNm) {
    let selector = 'p[id="' + delImgFileNm +'"]';
    $(selector).parent().hide();
    delImgArr.push(delImgFileNm)
}


// ------------------------ 공통 관련 부분



/*
 * 작성자 : 서은빈
 * 주민등록번호 뒷 첫번째 자리로 년대를 return
 * param : Number
 * return : Bool
 * 날짜 : 2022-08-06
 * */

function getBirthYear() {
}
