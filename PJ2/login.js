window.addEventListener("load", function() {
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    var login = document.getElementById("login");

    var strCookie=document.cookie;
    var arrCookie=strCookie.split("; ");
    for(var i=0;i<arrCookie.length;i++){
        var arr=arrCookie[i].split("=");
        if(arr[0]=='email'){
            email.value = arr[1];
        }else if(arr[0]=='password'){
            password.value = arr[1];
        }else{}
    }

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
        fetch("login.php?email="+ email.value + "&password=" + password.value).then(function(rsp) {
            return rsp.text();
        }).then(function(data) {
            console.log(data);
            if(!(data == "" || data == undefined || data == null)){
                setCookie("uid",data,1);
                window.location.href="personalPage.html?uid=" + data;
            }else{
                document.getElementById("warning").innerHTML="  * Wrong Email/Password!";
                password.value="";
            }
        });
    }
});