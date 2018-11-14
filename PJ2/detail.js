/**
 * Created by Chanyeol on 2017/6/25.
 */
window.addEventListener("load",function (){
    function getCookie(c_name){
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
    var uid=getCookie("uid");

    var id = window.location.href.split("=");
    var xhr = new XMLHttpRequest();
    xhr.open("post", "detail.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    var data = "type=getInfo&id="+id[1];
    xhr.send(data);
    xhr.onload = function () {
        var res = xhr.responseText;
        console.log(res);
        var obj = JSON.parse(res);
        console.log(obj);
        var details = document.getElementsByClassName("details");
        var img = document.getElementById("picture");
        img.setAttribute("src","travel-images/medium/"+obj["path"]);
        document.getElementById("title").innerText = obj["title"];
        document.getElementById("vicetitle").innerText = obj["username"];
        if (obj["description"] == null) {
            document.getElementById("description1").innerHTML = "No Description";
        }
        else {
            document.getElementById("description1").innerHTML = obj["description"];
        }
        details[0].innerText = "Country："+obj["country"];
        details[1].innerText = "City："+obj["city"];
        details[2].innerText = "Longitude："+obj["longitude"];
        details[3].innerText = "Latitude："+obj["latitude"];
    }
    document.getElementById("add").addEventListener("click",function (){
        var xhr = new XMLHttpRequest();
        xhr.open("post", "detail.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send("type=add&id="+id[1]+"&uid="+uid);
        xhr.onload = function () {
            var res = xhr.responseText;
            console.log(res);
            document.getElementById("back2").style.visibility="visible";
            document.getElementById("back1").style.visibility="hidden";
        }
        var xhr2 = new XMLHttpRequest();
        xhr2.open("post", "detail.php", true);
        xhr2.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr2.send("type=number&id="+id[1]);
        xhr2.onload = function () {
            var res = xhr2.responseText;
            var obj = JSON.parse(res);
            var likeNumber = document.getElementById("likeNumber");
            likeNumber.innerText = obj;
        }
    });
    document.getElementById("added").addEventListener("click",function (){
        var xhr = new XMLHttpRequest();
        xhr.open("post", "detail.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send("type=added&id="+id[1]+"&uid="+uid);
        xhr.onload = function () {
            var res = xhr.responseText;
            if(res=="success"){
                document.getElementById("back1").style.visibility="visible";
                document.getElementById("back2").style.visibility="hidden";
            }
        }
        var xhr2 = new XMLHttpRequest();
        xhr2.open("post", "detail.php", true);
        xhr2.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr2.send("type=number&id="+id[1]);
        xhr2.onload = function () {
            var res = xhr2.responseText;
            var obj = JSON.parse(res);
            var likeNumber = document.getElementById("likeNumber");
            likeNumber.innerText = obj;
        }
    });

    var xhr1 = new XMLHttpRequest();
    xhr1.open("post", "detail.php", true);
    xhr1.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr1.send("type=check&id="+id[1]+"&uid="+uid);
    xhr1.onload = function () {
        var res = xhr1.responseText;
        var obj = JSON.parse(res);
        console.log(res);
        if(obj == "0"){
            document.getElementById("back1").style.visibility="visible";
            document.getElementById("back2").style.visibility="hidden";
        }else {
            document.getElementById("back1").style.visibility="hidden";
            document.getElementById("back2").style.visibility="visible";
        }
    }

    var xhr2 = new XMLHttpRequest();
    xhr2.open("post", "detail.php", true);
    xhr2.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr2.send("type=number&id="+id[1]);
    xhr2.onload = function () {
        var res = xhr2.responseText;
        var obj = JSON.parse(res);
        var likeNumber = document.getElementById("likeNumber");
        likeNumber.innerText = obj;
    }
});