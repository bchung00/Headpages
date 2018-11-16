/**
 * Created by Chanyeol on 2017/6/25.
 */
window.addEventListener("load", function () {
    var bt = document.getElementById("buttonSearch");
    var result = document.getElementsByClassName("main")[0];
    var pic = document.getElementsByClassName("img");
    var hre = document.getElementsByClassName("href");
    var title = document.getElementsByTagName("h2");
    var num = document.getElementsByTagName("dt");
    var description = document.getElementsByTagName("p");
    var page = document.getElementById("pages");
    var xhr = new XMLHttpRequest();
    var link = document.getElementsByClassName("link");
    var PostImg = document.getElementsByClassName("PostImg");


    function clear() {
        for (var i = 0; i < 5; i++) {
            if (i == 5) break;
            pic[i].setAttribute("src", "");
            title[i].innerText = "";
            description[i].innerText = "";
            num[i + 1].style.display = "none";
            link[i].removeAttribute("href")
        }
        while (page.firstChild){
            page.removeChild(page.firstChild);
        }
    }


    function filterBy(str, variable) {
        xhr.open("post", "search.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(str + variable);
        xhr.onload = function () {
            var res = xhr.responseText;
            console.log(res);
            var obj = JSON.parse(res);
            var pageNum = Math.ceil(obj.length/5);

            //if no results
            if(res=="[]"){
                title[0].innerText = "No result";
                title[0].className = "noResult";
                description[0].setAttribute("hidden","hidden");
                pic[0].setAttribute("hidden","hidden");
                num[1].style.display = "block";
                link[0].removeAttribute("href");

            }
            else {
                if(str=="post=") {
                    title[0].className = "title";
                    description[0].removeAttribute("hidden");
                    pic[0].removeAttribute("hidden");

                    for (var i = 1; i <= pageNum; i++) {
                        var newPage = document.createElement("div");
                        newPage.id = "page" + i;
                        newPage.innerText = i;
                        page.appendChild(newPage);
                        page.style.marginLeft = (54 - 2 * i) + "%";
                    }

                    for (var i = 0; i < obj.length; i++) {
                        if (i == 5) break;
                        if(obj[i]["PhotoPath"] != null) {
                            pic[i].setAttribute("src", obj[i]["PhotoPath"]);
                        }else{
                            pic[i].setAttribute("src", "photos/blank.jpeg");
                        }
                        title[i].innerText = obj[i]["Name"];
                        hre[i].setAttribute("href", "detail.html?id=" + obj[i]["PostID"]);
                        link[i].setAttribute("href", "detail.html?id=" + obj[i]["PostID"]);

                        if (obj[i]["Content"] == null) {
                            description[i + 1].innerText = "No Description";
                        } else
                            description[i + 1].innerText = obj[i]["Description"];
                        if(obj[i]["Photo_File"] != null) {
                            PostImg[i].setAttribute("src", obj[i]["Photo_File"]);
                        }else{
                            PostImg[i].removeAttribute("src");
                        }
                        num[i + 1].style.display = "block";
                    }

                    for (var k = 1; k <= pageNum; k++) {
                        document.getElementById("page" + k).addEventListener("click", function () {

                            console.log(this.innerText + "is clicked");
                            console.log(pageNum);
                            for (var i = 0; i < 5; i++) {
                                if (i == 5) break;
                                pic[i].setAttribute("src", "");
                                title[i].innerText = "";
                                description[i].innerText = "";
                                link[i].removeAttribute("href");
                                num[i + 1].style.display = "none";
                            }

                            var picNum = obj.length - 5 * this.innerText + 5;
                            var currentPage = this.innerText * 5 - 5;
                            for (var i = 0; i < picNum; i++) {
                                if (i == 5) break;
                                pic[i].setAttribute("src", obj[i + currentPage]["Photo_File"]);
                                title[i].innerText = obj[i + currentPage]["Title"];
                                hre[i].setAttribute("href", "detail.html?id=" + obj[i + currentPage]["ImageID"]);
                                link[i].setAttribute("href", "detail.html?id=" + obj[i + currentPage]["ImageID"]);
                                if (obj[i + currentPage]["Description"] == null) {
                                    description[i + 1].innerText = "No Description";
                                } else
                                    description[i + 1].innerText = obj[i + currentPage]["Description"];
                                num[i + 1].style.display = "block";
                            }
                        });

                    }
                }
            }
        }
    }
    bt.addEventListener("click", function () {
        document.getElementById("hint").style.display = "none";
        clear();

        document.getElementById("warning").innerText="";//提示清空
        //得到两个inputbox里的输入
        var content = document.getElementById("filterTitle").value;


        if (document.getElementById("byPost").checked) {
            if (content.length < 2) {
                var warning = document.getElementById("warning");
                warning.innerText=" * Please give more key words!";
            }
            else
                filterBy("post=", content);
        }
        else if (document.getElementById("byGroup").checked) {
            if (content.length < 2) {
                var warning = document.getElementById("warning");
                warning.innerText=" * Please Give More Key Words!";
            }
            else filterBy("group=", content);
        }
        else if (document.getElementById("byEvent").checked) {
            if (content.length < 2) {
                var warning = document.getElementById("warning");
                warning.innerText=" * Please Give More Key Words!";
            }
            else filterBy("event=", content);
        }
        else if (document.getElementById("byUser").checked) {
            if (content.length < 2) {
                var warning = document.getElementById("warning");
                warning.innerText=" * Please Give More Key Words!";
            }
            else filterBy("user=", content);
        }
        else{
            var warning = document.getElementById("warning");
            warning.innerText=" * Please Choose a Type";
        }

    });

});

