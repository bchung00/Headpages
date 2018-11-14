/**
 * Created by Chanyeol on 2017/6/25.
 */
/**
 * Created by Chanyeol on 2017/6/24.
 */
window.addEventListener("load", function() {
    var otherHot = document.getElementById("otherHot");
    var newUpload = document.getElementById("newUpload");
    var data = "key=1";
    var url1 = "MediumPhoto.php";
    var url2 = "SmallPhoto.php";
    var url3 = "BigPhoto.php";
    function setCookie(c_name,value,expiredays)
    {
        var exdate=new Date()
        exdate.setDate(exdate.getDate()+expiredays)
        document.cookie=c_name+ "=" + value +
            ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
    }
    setCookie("uid","");
    //大图
    var xhr2 = new XMLHttpRequest();
    xhr2.open("post", url3, true);
    xhr2.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr2.send(data);
    xhr2.onload = function () {
        var res = xhr2.responseText;
        var obj = JSON.parse(res);
        var img = document.getElementsByClassName("big");
        var link = document.getElementsByClassName("hotLink");
        var hre = document.getElementsByClassName("href");
        var title = document.getElementsByClassName("description");
        var link1 = document.getElementById("link1");
        for(var i =0;i<3;i++){
            title[i].innerText = obj[i]["Title"];
            img[i].setAttribute("src","travel-images/medium/"+obj[i]["PATH"]);
            link[i].setAttribute("href","login.html");
            hre[i].setAttribute("href","login.html");
        }
        link1.setAttribute("href", "css/csslider.css");
    };

    //otherHot
    var xhr1 = new XMLHttpRequest();
    function refresh_command(){
        var res = xhr1.responseText;
        console.log(res);
        var obj = JSON.parse(res);
        var img = document.getElementsByClassName("medium");
        var link = document.getElementsByClassName("otherHotLink");
        var description = document.getElementsByClassName("smalldescription");
        var title = document.getElementsByClassName("smalltitle");
        for(var i =0;i<6;i++){
            description[i].innerText = obj[i]["Description"];
            title[i].innerText = obj[i]["Title"];
            img[i].setAttribute("src","travel-images/square-medium/"+obj[i]["PATH"]);
            img[i].setAttribute("title",obj[i]["Title"]);
            link[i].setAttribute("href","login.html");}
    }

    xhr1.open("post", url1, true);
    xhr1.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr1.send(data);
    xhr1.onload = function(){
        refresh_command();
    }
    //更新按钮
    otherHot.addEventListener("click",function () {
        xhr1.open("post", url1, true);
        xhr1.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr1.send(data);
        xhr1.onload = function () {
            refresh_command();
        }
    });

    //newUpload
    var xhr = new XMLHttpRequest();
    xhr.open("post", url2, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(data);
    xhr.onload = function () {
        var res = xhr.responseText;
        var obj = JSON.parse(res);
        var img = document.getElementsByClassName("small");
        var link = document.getElementsByClassName("newUploadLink");
        for(var i =0;i<20;i++){
            img[i].setAttribute("src","travel-images/square-small/"+obj[i]["PATH"]);
            img[i].setAttribute("title",obj[i]["Title"]);
            link[i].setAttribute("href","login.html");
        }
    };
    //点更新之后的更新
    newUpload.addEventListener("click",function () {
        xhr.open("post", url2, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(data);

        xhr.onload = function () {
            var res = xhr.responseText;
            var obj = JSON.parse(res);
            console.log(obj);
            var img = document.getElementsByClassName("small");
            var link = document.getElementsByClassName("newUploadLink");
            for(var i =0;i<20;i++){
                img[i].setAttribute("src","travel-images/square-small/"+obj[i]["PATH"]);
                img[i].setAttribute("title",obj[i]["Title"]);
                link[i].setAttribute("href","login.html");
            }
        }});
});