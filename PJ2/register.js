/**
 * Created by Chanyeol on 2017/6/20.
 */
window.addEventListener("load", function() {
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    var password2 = document.getElementById("password2");
    var name = document.getElementById("name");
    var submit = document.getElementById("submit");

    submit.onclick = function register(){
        if(password.value===password2.value){
            if(!email.value.match(/^[a-z0-9]+@([a-z0-9]+\.)+[a-z]{2,}$/i)) {
                document.getElementById("warning").innerHTML = " * Wrong Email!";
            }else if(password.value.match(/^[0-9]*$/)){
                document.getElementById("warning").innerHTML = " * Password too weak!";
            }else if(password.value.match(/^[A-Za-z]+$/)){
                document.getElementById("warning").innerHTML = " * Password too weak!";
            }
            else{
                fetch("register.php?email="+ email.value + "&password=" + password.value + "&name=" + name.value).then(function(rsp) {
                    return rsp.text();
                }).then(function(data) {
                    console.log(data);
                    if(!data){
                        document.getElementById("warning").innerHTML=" * Email Exist!";
                    }else{
                        alert("注册成功！");
                        window.location.href="login.html";
                    }
                });
            }
        }else{
            document.getElementById("warning").innerHTML=" * 密码不一致！";
            password.value="";
            password2.value="";
        }

    }


});
