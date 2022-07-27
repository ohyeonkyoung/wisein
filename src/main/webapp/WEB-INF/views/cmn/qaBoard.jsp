<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<head>
    <link rel="stylesheet" href="resources/css/tipBoard.css">
    <link rel="stylesheet" href="https://uicdn.toast.com/tui-color-picker/latest/tui-color-picker.min.css">
    <link rel="stylesheet" href="https://uicdn.toast.com/editor-plugin-color-syntax/latest/toastui-editor-plugin-color-syntax.min.css">
    <link rel="stylesheet" href="https://uicdn.toast.com/editor/latest/toastui-editor.min.css" />
</head>
<body>
    <form autocomplete="off" id="qaBoardForm">
    <div class="content-wrap">
         <div class="select-wrap" style="position: absolute;">
            <c:if test="${empty qaListDTO.category}">
                <select id="category" name="category" >
                   <option value="FRONT">Front</option>
                   <option value="BACK">Back</option>
                   <option value="DB">DB</option>
                </select>
            </c:if>
            <c:if test="${!empty qaListDTO.category}">
                <c:out value="${qaListDTO.category}" />
            </c:if>
        </div>
        <p>
            <input type="text" size="210" id="subject" name="subject" placeholder="제목을 입력하세요" value="${qaListDTO.subject}" required style="width: 95%; margin-left: 73px;">
        </p>

        <div>내용</div>
        <div id="contents">
            <div id="editor">${qaListDTO.content}</div>
            <div id="viewer"></div>

            <input type="hidden" id="num" name="num" value="${qaListDTO.num}">
            <input type="hidden" id="parentNum" name="parentNum" value="${qaListDTO.parentNum}">
            <input type="hidden" id="content" name="content">
        </div>

        <div class="button-wrap">
            <c:if test="${empty qaListDTO.subject}">
                <input type="button" value="등록" onclick="reg()">
            </c:if>
            <c:if test="${!empty qaListDTO.subject}">
                <input type="button" value="수정" onclick="update()">
            </c:if>
            <input type="button" value="취소" onclick="cancel()">
       </div>
    </div>
    </form>

    <script src="https://uicdn.toast.com/tui-color-picker/latest/tui-color-picker.min.js"></script>
    <script src="https://uicdn.toast.com/editor/latest/toastui-editor-all.min.js"></script>
    <script src="https://uicdn.toast.com/editor-plugin-color-syntax/latest/toastui-editor-plugin-color-syntax.min.js"></script>
    <script>
        const { Editor } = toastui;
        const { colorSyntax } = Editor.plugin;

        const editor = new Editor({
                el: document.querySelector('#editor'),
                height: '749px',
                initialEditType: 'markdown',
                previewStyle: 'vertical',
                placeholder: '📌욕설이나 비방, 모욕, 선정성이 존재하는 사진이나 게시글은 업로드하지 말아주세요📌',
                plugins: [colorSyntax],
                hooks : {
                        addImageBlobHook: (blob, callback) => {
                                selectQaNum();
                                const imgURL = uploadImage(blob);
                             callback(imgURL , "alt-text");
                            }
                       }
            });

            function selectQaNum(){
                let num = document.querySelector("#num").value;
                if(num == ""){
                    num = 0;
                }
                $.ajax({
                    data:{num:num},
                    type:"POST",
                    url:"/selectQaNum",
                    async: false,
                })
                .done(function(data) {
                })
                .fail(function(err) {
                  alert(err);
                });
            };

            function uploadImage(blob){
                let dataImgUrl;
                let formData = new FormData();
                formData.append('image', blob);
                $.ajax({
                    url : '/qaImgUrlReg',
                    enctype: 'multipart/form-data',
                    type: 'POST',
                    data: formData,
                    processData: false,
                    contentType: false,
                    async: false,
                })
                .done(function(data) {
                    dataImgUrl = data;
                })
                .fail(function(err) {
                    alert(err);
                });
                    return dataImgUrl;
            };
    </script>

    <script>
        function reg(){
            var writer = '<c:out value="${member.id}" />';
            if(writer != ""){
                document.querySelector("#content").value = editor.getHTML();
                var num = document.querySelector("#num").value;
                var parentNum = document.querySelector("#parentNum").value;

                if(num == ""){document.querySelector("#num").value = 0;}
                if(parentNum == ""){document.querySelector("#parentNum").value = 0;}

                var form = document.getElementById("qaBoardForm");
                form.action = "/qaBoard";
                form.method = "POST";
                form.submit();
            } else if(writer == ""){
               alert("로그인 후 이용가능합니다.");
            }
        }
    </script>
    <script>
        function update(){
            Debugger
            const num = '<c:out value="${qaListDTO.num}" />';
            const subject = document.getElementById('subject').value;
            const content = editor.getHTML();
            Debugger
            $.ajax({
                data:{"num":num,"subject":subject,"content":content},
                type:"POST",
                url:"/qaUpdatePro",
                success:function(data) {
                    window.location.href = "/qaDetail?num=${qaListDTO.num}"
                },
                error:function(request, status, error) {
                    alert("실패");
                }
            })
        }
    </script>
    <script>
        function cancel(){
            if(confirm('진짜 취소하실꺼에여?🥺') == true){
                console.log('뒤로가기되찌롱');
                window.history.back()
            }
        }
    </script>
</body>
</html>
