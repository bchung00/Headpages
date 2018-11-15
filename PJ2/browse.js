window.addEventListener("load", function () {

    function getPosts() {
        var img = document.getElementsByClassName("img");
        var title = document.getElementsByClassName("title");
        var hre = document.getElementsByClassName("href");
        var link = document.getElementsByClassName("link");
        var content = document.getElementsByClassName("content");
        var PostImg = document.getElementsByClassName("PostImg");

        function getCookie(c_name)
        {
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
        var type = "all";
        getObjs();

        document.getElementById("all").onclick = function () {
            type = "all";
            document.getElementById("all").classList.add("selected");
            document.getElementById("specific").classList.remove("selected");
            document.getElementById("mine").classList.remove("selected");
            getObjs()
        };
        document.getElementById("specific").onclick = function () {
            type = "friend";
            document.getElementById("all").classList.remove("selected");
            document.getElementById("specific").classList.add("selected");
            document.getElementById("mine").classList.remove("selected");
            getObjs()
        };
        document.getElementById("mine").onclick = function () {
            type = "mine";
            document.getElementById("all").classList.remove("selected");
            document.getElementById("specific").classList.remove("selected");
            document.getElementById("mine").classList.add("selected");
            getObjs()
        };

        function getObjs() {
            var uid = getCookie("uid");
            var xhr = new XMLHttpRequest();
            xhr.open("post", "browsePost.php", true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.send("type="+ type +"&uid="+uid);
            xhr.onload = function () {
                var result = xhr.responseText;
                console.log(result);
                var obj = JSON.parse(result);

                if (obj.length != 0) {
                    for (var i = 0; i < obj.length; i++) {
                        if(obj[i]["PhotoPath"] != null) {
                            img[i].setAttribute("src", obj[i]["PhotoPath"]);
                        }else{
                            img[i].setAttribute("src", "photos/blank.jpeg");
                        }
                        title[i].innerText = obj[i]["Name"];
                        hre[i].setAttribute("href", "detail.html?id=" + obj[i]["PostID"]);
                        link[i].setAttribute("href", "detail.html?id=" + obj[i]["PostID"]);
                        content[i].innerText = obj[i]["Text"];
                        if(obj[i]["Photo_File"] != null) {
                            PostImg[i].setAttribute("src", obj[i]["Photo_File"]);
                        }else{
                            PostImg[i].removeAttribute("src");
                        }

                    }
                }
            };
        }
    }
    getPosts();

    function getGroups() {
        var title = document.getElementsByClassName("title2");

        var xhr = new XMLHttpRequest();
        xhr.open("post", "browseGroup.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send("key=1");
        xhr.onload = function () {
            var result = xhr.responseText;
            console.log(result);
            var obj = JSON.parse(result);

            if (obj.length != 0) {
                for (var i = 0; i < obj.length; i++) {
                    title[i].innerText = obj[i]["Name"];
                    title[i].setAttribute("href", "detail.html?id=" + obj[i]["GID"]);
                }
            }
        };


    }
    getGroups();

    function getEvents() {
        var title = document.getElementsByClassName("title3");

        var xhr = new XMLHttpRequest();
        xhr.open("post", "browseEvent.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send("key=2");
        xhr.onload = function () {
            var result = xhr.responseText;
            console.log(result);
            var obj = JSON.parse(result);

            if (obj.length != 0) {
                for (var i = 0; i < obj.length; i++) {
                    title[i].innerText = obj[i]["Name"];
                    title[i].setAttribute("href", "detail.html?id=" + obj[i]["EID"]);
                }
            }
        };


    }
    getEvents();
});