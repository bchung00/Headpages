window.addEventListener("load", function() {
    var email = document.getElementById("username");
    var password = document.getElementById("password");
    var login = document.getElementById("login");

    function setCookie(c_name,value,expiredays)
    {
        var exdate=new Date()
        exdate.setDate(exdate.getDate()+expiredays)
        document.cookie=c_name+ "=" + value +
            ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
    }
    login.onclick = function submitAccount(){
        var keys=document.cookie.match(/[^ =;]+(?=\=)/g);
        if (keys) {
            for (var i = keys.length; i--;)
                document.cookie=keys[i]+'=0;expires=' + new Date(0).toUTCString()
        }
        fetch("AdminLogin.php?username="+ username.value + "&password=" + password.value).then(function(rsp) {
            return rsp.text();
        }).then(function(data) {
            console.log(data);
            if(!(data == "" || data == undefined || data == null)){
                setCookie("aid",data,1);
                window.location.href="index.html";
            }else{
                document.getElementById("warning").innerHTML="  * Wrong Email/Password!";
                password.value="";
            }
        });
    }
});