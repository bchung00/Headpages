/**
 * Created by Chanyeol on 2017/6/25.
 */
window.addEventListener("load", function () {
    function all() {
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
        var uid=getCookie("uid");
        var img = document.getElementsByClassName("img");
        var title = document.getElementsByClassName("title");
        var description = document.getElementsByClassName("imgDescription");
        var section = document.getElementsByTagName("dt");
        var page = document.getElementById("pages");
        var link = document.getElementsByClassName("link");
        var hre = document.getElementsByClassName("href");
        var del = document.getElementsByClassName("delete_link");

        var xhr = new XMLHttpRequest();
        xhr.open("post", "favorite.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send("type=show&uid="+uid);
        xhr.onload = function () {
            var res = xhr.responseText;
            var obj = JSON.parse(res);
            console.log(res);
            if (obj.length == 0) {
                document.getElementById("hint").style.display = "block";
            }
            else {
                document.getElementById("hint").style.display = "none";
                for (var i = 0; i < obj.length; i++) {
                    section[i + 1].style.display = "block";
                    img[i].setAttribute("src", "travel-images/square-medium/" + obj[i]["PATH"]);
                    title[i].innerText = obj[i]["Title"];
                    description[i].innerText = obj[i]["Description"];
                    del[i].value = obj[i]["ImageID"];
                    hre[i].setAttribute("href", "detail.html?id=" + obj[i]["ImageID"]);
                    link[i].setAttribute("href", "detail.html?id=" + obj[i]["ImageID"]);

                    if (i == 4 || i == obj.length - 1) {
                        section[i + 1].style.border = "none";
                        break;
                    }
                }
                var pageNum = Math.ceil(obj.length / 5);
                while (page.firstElementChild){
                    page.removeChild(page.firstElementChild);
                }
                if(pageNum>1) {
                    for (var i = 1; i <= pageNum; i++) {
                        var newPage = document.createElement("div");
                        newPage.id = "page" + i;
                        newPage.innerText = i;
                        page.appendChild(newPage);
                        page.style.marginLeft = (54 - 2 * i) + "%";
                    }
                    for (var k = 1; k <= pageNum; k++) {
                        document.getElementById("page" + k).addEventListener("click", function () {
                            console.log(this.innerText + "is clicked");
                            console.log(pageNum);
                            var img = document.getElementsByClassName("img");
                            var title = document.getElementsByClassName("imgTitle");
                            var description = document.getElementsByClassName("imgDescription");
                            var section = document.getElementsByTagName("dt");
                            var del = document.getElementsByClassName("delete_link");
                            var page = document.getElementById("pages");
                            for (var i = 0; i < 5; i++) {
                                section[i + 1].style.display = "none";
                                img[i].setAttribute("src", "");
                                title[i].innerText = "";
                                del.value = "";
                                link[i].removeAttribute("href");
                                hre[i].removeAttribute("href");
                                description[i].innerText = "";
                            }

                            var picNum = obj.length - 5 * this.innerText + 5;
                            var currentPage = this.innerText * 5 - 5;
                            for (var i = 0; i < picNum; i++) {
                                if (i == 5) break;//如果大于三个则需要分页
                                section[i + 1].style.display = "block";
                                img[i].setAttribute("src", "travel-images/square-medium/" + obj[i + currentPage]["PATH"]);
                                title[i].innerText = obj[i + currentPage]["Title"];
                                del[i].value = obj[i + currentPage]["ImageID"];
                                link[i].setAttribute("href", "detail.html?id=" + obj[i+currentPage]["ImageID"]);
                                hre[i].setAttribute("href", "detail.html?id=" + obj[i]["ImageID"]);
                                description[i].innerText = obj[i + currentPage]["Description"];
                            }
                        });

                    }
                }
                //页码段 从search.js复制过来的

                //页码段结束
                /*
                 document.getElementById("hint").style.display = "none";
                 for (var i = 0; i < obj.length; i++) {
                 section[i + 1].style.display = "block";
                 img[i].setAttribute("src", "images/square-medium/" + obj[i]["PATH"]);
                 title[i].innerText = obj[i]["Title"];
                 del[i].value= obj[i]["ImageID"];
                 description[i].innerText = obj[i]["Description"];
                 if (i == 4 || i == obj.length - 1) {
                 section[i + 1].style.border = "none";
                 }
                 }*/
            }

        };
        var del = document.getElementsByClassName("delete_link");
        for (var i = 0; i < del.length; i++) {
            del[i].addEventListener("click", function () {
                console.log(this.value);
                var xhr = new XMLHttpRequest();
                xhr.open("post", "favorite.php", true);
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                xhr.send("type=delete&id=" + this.value + "&uid="+uid);
                xhr.onload = function () {
                    var res = xhr.responseText;
                    var obj = JSON.parse(res);
                    console.log(res);
                    for (var i = 0; i < 5; i++) {
                        section[i + 1].style.display = "none";
                        img[i].setAttribute("src", "");
                        title[i].innerText = "";
                        del[i].value = "";
                        link[i].removeAttribute("href");
                        hre[i].removeAttribute("href");
                        description[i].innerText = "";
                    }
                    if (obj.length == 0) {
                        document.getElementById("hint").style.display = "block";
                    }
                    else {
                        document.getElementById("hint").style.display = "none";

                        /*for (var i = 0; i < obj.length; i++) {
                         section[i + 1].style.display = "block";
                         img[i].setAttribute("src", "images/square-medium/" + obj[i]["PATH"]);
                         img[i].setAttribute("href", "detail.html?id=" + obj[i]["ImageID"]);
                         title[i].innerText = obj[i]["Title"];
                         del[i].value = obj[i]["ImageID"];
                         description[i].innerText = obj[i]["Description"];
                         if (i == 4 || i == obj.length - 1) {
                         section[i + 1].style.border = "none";
                         }
                         }
                         }*/
                        all();
                    };
                }});
        }
    }
    all();

});