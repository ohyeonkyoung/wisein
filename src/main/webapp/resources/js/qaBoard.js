
        function reg(writer, category){
            //alert(writer);
            //alert(category);

            if(writer != ""){
                document.querySelector("#content").value = editor.getHTML();
                var num = document.querySelector("#num").value;
                var parentNum = document.querySelector("#parentNum").value;
                //var category = "";

                if(category != ""){
                    document.querySelector("#category").value = category;
                    document.querySelector("#updGubun").value = "Y";
                }
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

        function update(){
            document.querySelector("#content").value = editor.getHTML();

            var form = document.getElementById("qaBoardForm");
            form.action = "/qaUpdatePro";
            form.method = "POST";
            form.submit();
        }

        function cancel(){
            if(confirm('진짜 취소하실꺼에여?🥺') == true){
                console.log('뒤로가기되찌롱');
                window.history.back()
            }
        }