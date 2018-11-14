window.addEventListener("load", function () {
    function all() {
        var img = document.getElementsByClassName("img");
        var title = document.getElementsByClassName("title");
        var section = document.getElementsByTagName("dt");
        var page = document.getElementById("pages");
        var hre = document.getElementsByClassName("href");
        var modify_link = document.getElementsByClassName("modify_link");
        var link = document.getElementsByClassName("link");
        var deleteBt = document.getElementsByClassName("delete");

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

        var uid = getCookie("uid");
        var xhr = new XMLHttpRequest();
        xhr.open("post", "my_photos.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send("type=show&uid="+uid);
        xhr.onload = function () {
            var result = xhr.responseText;
            console.log(result);
            var obj = JSON.parse(result);

            if (obj.length == 0) {
                document.getElementById("hint").style.display = "block";
            }
            else {
                document.getElementById("hint").style.display = "none";
                for (var i = 0; i < obj.length; i++) {
                    section[i + 1].style.display = "block";
                    img[i].setAttribute("src", "travel-images/square-medium/" + obj[i]["PATH"]);
                    title[i].innerText = obj[i]["Title"];
                    deleteBt[i].value = obj[i]["ImageID"];
                    hre[i].setAttribute("href", "detail.html?id=" + obj[i]["ImageID"]);
                    link[i].setAttribute("href", "detail.html?id=" + obj[i]["ImageID"]);
                    modify_link[i].setAttribute("href", "modify.html?id=" + obj[i]["ImageID"]);
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
                    }for (var k = 1; k <= pageNum; k++) {
                        document.getElementById("page" + k).addEventListener("click", function () {
                            console.log(this.innerText + "is clicked");
                            console.log(pageNum);
                            var img = document.getElementsByClassName("img");
                            var title = document.getElementsByClassName("imgTitle");
                            var description = document.getElementsByClassName("imgDescription");
                            var section = document.getElementsByTagName("dt");
                            var deleteBt = document.getElementsByClassName("a1");
                            var page = document.getElementById("pages");
                            for (var i = 0; i < 5; i++) {
                                section[i + 1].style.display = "none";
                                img[i].setAttribute("src", "");
                                title[i].innerText = "";
                                deleteBt[i].value = "";
                                hre[i].removeAttribute("href");
                                link[i].removeAttribute("href");
                                modify_link[i].removeAttribute("href");
                            }

                            var picNum = obj.length - 5 * this.innerText + 5;
                            var currentPage = this.innerText * 5 - 5;
                            for (var i = 0; i < picNum; i++) {
                                if (i == 5) break;//如果大于三个则需要分页
                                section[i + 1].style.display = "block";
                                img[i].setAttribute("src", "travel-images/square-medium/" + obj[i + currentPage]["PATH"]);
                                title[i].innerText = obj[i + currentPage]["Title"];
                                deleteBt[i].value = obj[i + currentPage]["ImageID"];
                                hre[i].setAttribute("href", "detail.html?id=" + obj[i]["ImageID"]);
                                link[i].setAttribute("href", "detail.html?id=" + obj[i+currentPage]["ImageID"]);
                                modify_link[i].setAttribute("href", "modify.html?id=" + obj[i+currentPage]["ImageID"]);
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
                 deleteBt[i].value= obj[i]["ImageID"];
                 description[i].innerText = obj[i]["Description"];
                 if (i == 4 || i == obj.length - 1) {
                 section[i + 1].style.border = "none";
                 }
                 }*/
            }

        };
        for (var i = 0; i < deleteBt.length; i++) {
            deleteBt[i].addEventListener("click", function () {
                console.log(this.value);
                var xhr = new XMLHttpRequest();
                xhr.open("post", "my_photos.php", true);
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                xhr.send("type=delete&id=" + this.value + "&uid=" + uid);
                xhr.onload = function () {
                    var result = xhr.responseText;
                    var obj = JSON.parse(result);
                    console.log(result);
                    for (var i = 0; i < 5; i++) {
                        section[i + 1].style.display = "none";
                        img[i].setAttribute("src", "");
                        title[i].innerText = "";
                        deleteBt[i].value = "";
                        hre[i].removeAttribute("href");
                        link[i].removeAttribute("href");
                        modify_link[i].removeAttribute("href");
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
                         deleteBt[i].value = obj[i]["ImageID"];
                         description[i].innerText = obj[i]["Description"];
                         if (i == 4 || i == obj.length - 1) {
                         section[i + 1].style.border = "none";
                         }
                         }
                         }*/
                        all();
                    }
                }});
        }
    }
    all();

});