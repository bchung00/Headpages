window.addEventListener("load",function (){
    var warning = document.getElementById("warning");
    var location = document.getElementById("location");
    var date = document.getElementById("date");
    var time = document.getElementById("time");
    var text = document.getElementById("text");
    var img = document.getElementById("picture");
    var tr = document.getElementsByTagName("tr");

    var PostID = window.location.href.split("=");
    var home = document.getElementById("home");
    var uid = getCookie("uid");
    home.setAttribute("href","personalPage.html?uid="+uid);

    var xhr = new XMLHttpRequest();
    xhr.open("post", "modify.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    var data = "PostID=" + PostID[1] + "&type=getInfo";
    xhr.send(data);
    xhr.onload = function () {
        var res = xhr.responseText;
        console.log(res);
        var obj = JSON.parse(res);
        console.log(obj);
        location.value = obj[0]["Location"];
        time.value = obj[0]["Time"];
        date.value = obj[0]["Date"];
        text.value = obj[0]["Text"];
        if(obj[0]["Photo_File"] != null) {
            img.setAttribute("src", obj[0]["Photo_File"]);
            tr[1].removeAttribute("hidden");
        }else{
            tr[1].setAttribute("hidden", "hidden");
        }
    }

    document.getElementById("btSubmit").onclick = function () {
        if(time == null || time.value.match(/^(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d$/)){
            fetch("modify.php?type=modify&PostID="+PostID[1]+ "&location=" + location.value + "&time=" + time.value + "&date=" + date.value+ "&text=" + text.value).then(function(rsp) {
                return rsp.text();
            }).then(function(data) {
                console.log(data);
                if(data=="success"){
                    alert("Success!");
                    var uid = getCookie("uid");
                    window.location.href = "personalPage.html?uid=" + uid;
                }else {
                    warning.innerText = " * Failed!";
                }
            });
        }else
            warning.innerText = " * Time Has Wrong Format!";

    };

    function getCookie(c_name) {
        if (document.cookie.length>0)
        {
            c_start=document.cookie.indexOf(c_name + "=")
            if (c_start!=-1)
            {
                c_start=c_start + c_name.length+1
                c_end=document.cookie.indexOf(";",c_start)
                if (c_end==-1) c_end=document.cookie.length
                return document.cookie.substring(c_start,c_end);
            }
        }
        return ""
    }
});
