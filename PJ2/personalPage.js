window.addEventListener("load", function () {
    var img = document.getElementsByClassName("img");
    var title = document.getElementsByClassName("title");
    var hre = document.getElementsByClassName("href");
    var link = document.getElementsByClassName("link");
    var content = document.getElementsByClassName("content");
    var PostImg = document.getElementsByClassName("PostImg");
    var post = document.getElementsByClassName("post");
    var description = document.getElementsByClassName("description");
    var deleteBT = document.getElementsByClassName("delete");
    var modifyBT = document.getElementsByClassName("modify");
    var modify_link = document.getElementsByClassName("modify_link");

    var uidLogin = getCookie("uid");
    var uid = window.location.href.split("=");

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

    function getPosts() {
        var xhr = new XMLHttpRequest();
        xhr.open("post", "personalPost.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send("type=personal" +"&uid="+uid[1]);
        xhr.onload = function () {
            var result = xhr.responseText;
            console.log(result);
            var obj = JSON.parse(result);

            for(var i = 0; i < 5;i++){
                post[i].setAttribute("hidden","hidden");
                img[i].setAttribute("hidden","hidden");
                PostImg[i].setAttribute("hidden","hidden");
                content[i].setAttribute("hidden","hidden");
                deleteBT[i].setAttribute("hidden","hidden");
                modifyBT[i].setAttribute("hidden","hidden");
                modify_link[i].removeAttribute("href");
                description[i].style.borderBottomColor = "#FFFFFF";
                if(i < 2)
                    title[i+1].setAttribute("hidden","hidden");
            }
            if(result=="[]"){
                title[0].innerText = "No result";
            }else if (obj.length != 0) {
                title[0].className = "title";
                for (var i = 0; i < obj.length; i++) {
                    post[i].removeAttribute("hidden");
                    content[i].removeAttribute("hidden");
                    img[i].removeAttribute("hidden");
                    PostImg[i].removeAttribute("hidden");
                    title[i].removeAttribute("hidden");
                    if(uid[1] == uidLogin) {
                        deleteBT[i].removeAttribute("hidden");
                        deleteBT[i].value = obj[i]["PostID"];
                        deleteBT[i].addEventListener("click", deletePost);
                        modifyBT[i].removeAttribute("hidden");
                        modify_link[i].setAttribute("href", "modify.html?PostID=" + obj[i]["PostID"]);
                    }
                    description[i].style.borderBottomColor = "#EDEDED";

                    if(obj[i]["PhotoPath"] != null) {
                        img[i].setAttribute("src", obj[i]["PhotoPath"]);
                    }else{
                        img[i].setAttribute("src", "photos/blank.jpeg");
                    }
                    title[i].innerText = obj[i]["Name"];
                    hre[i].setAttribute("href", "personalPage.html?uid=" + obj[i]["UID"]);
                    link[i].setAttribute("href", "personalPage.html?uid=" + obj[i]["UID"]);
                    content[i].innerText = obj[i]["Text"];
                    if(obj[i]["Photo_File"] != null) {
                        PostImg[i].setAttribute("src", obj[i]["Photo_File"]);
                    }else{
                        PostImg[i].removeAttribute("src");
                    }

                }
            }else{
                for (var i = 0; i < 3; i++) {
                    post[i].style.display="none";
                }
            }
        };
    }
    getPosts();

    function getGroups() {
        var title = document.getElementsByClassName("title2");
        var group = document.getElementsByTagName("tr");
        var xhr = new XMLHttpRequest();
        xhr.open("post", "personalGroups.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send("uid=" + uid[1]);
        xhr.onload = function () {
            var result = xhr.responseText;
            console.log(result);
            var obj = JSON.parse(result);

            if (obj.length != 0) {
                for (var i = 0; i < obj.length; i++) {
                    group[i + 6].style.display = "block";
                    title[i].innerText = obj[i]["Name"];
                    title[i].setAttribute("href", "group.html");
                }
                for(var j = 11; j >= 6 + obj.length; j--){
                    group[j].style.display = "none";

                }
            }else{
                for(var j = 11; j >= 6; j--){
                    group[j].style.display = "none";

                }
            }
        };
    }
    getGroups();

    function getEvents() {
        var title = document.getElementsByClassName("title3");
        var event = document.getElementsByTagName("tr");

        var xhr = new XMLHttpRequest();
        xhr.open("post", "personalEvents.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send("uid=" + uid[1]);
        xhr.onload = function () {
            var result = xhr.responseText;
            console.log(result);
            var obj = JSON.parse(result);

            if (obj.length != 0) {
                for (var i = 0; i < obj.length; i++) {
                    event[i + 13].style.display = "block";
                    title[i].innerText = obj[i]["Name"];
                    //title[i].setAttribute("href", "detail.html?eid=" + obj[i]["EID"]);
                }
                for(var j = 18; j >= 13 + obj.length; j--){
                    event[j].style.display = "none";
                }
            }else{
                for(var j = 18; j >= 13; j--){
                    event[j].style.display = "none";
                }
            }
        };


    }
    getEvents();

    function deletePost(){
        console.log(this.value);
        var xhr = new XMLHttpRequest();
        xhr.open("post", "deletePost.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send("PostID=" + this.value);
        xhr.onload = function () {
            var result = xhr.responseText;
            console.log(result);
        }
        getPosts();
    }


});