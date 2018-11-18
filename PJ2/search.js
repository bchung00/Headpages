window.addEventListener("load", function () {
    var bt = document.getElementById("buttonSearch");
    var pic = document.getElementsByClassName("img");
    var hre = document.getElementsByClassName("href");
    var title = document.getElementsByTagName("h2");
    var num = document.getElementsByTagName("dt");
    var description = document.getElementsByTagName("p");
    var xhr = new XMLHttpRequest();
    var link = document.getElementsByClassName("link");
    var PostImg = document.getElementsByClassName("PostImg");
    var content = document.getElementsByClassName("description1")
    var type = document.getElementsByClassName("type");
    var time = document.getElementsByClassName("time");
    var founder = document.getElementsByClassName("founder");

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
    var home = document.getElementById("home");
    var uid = getCookie("uid");
    home.setAttribute("href","personalPage.html?uid="+uid);

    function clear() {
        for (var i = 0; i < 5; i++) {
            if (i == 5) break;
            pic[i].setAttribute("src", "");
            title[i].innerText = "";
            description[i].innerText = "";
            num[i + 1].style.display = "none";
            link[i].removeAttribute("href")
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
                title[0].className = "title";
                description[0].removeAttribute("hidden");
                pic[0].removeAttribute("hidden");

                if(str=="post=") {
                    for (var i = 0; i < obj.length; i++) {
                        pic[i].removeAttribute("hidden");
                        PostImg[i].removeAttribute("hidden");
                        if(obj[i]["PhotoPath"] != null) {
                            pic[i].setAttribute("src", obj[i]["PhotoPath"]);
                        }else{
                            pic[i].setAttribute("src", "photos/blank.jpeg");
                        }
                        title[i].innerText = obj[i]["Name"];
                        hre[i].setAttribute("href", "personalPage.html?uid=" + obj[i]["UID"]);
                        link[i].setAttribute("href", "personalPage.html?uid=" + obj[i]["UID"]);
                        content[i].removeAttribute("hidden");
                        if (obj[i]["Text"] == null) {
                            content[i].innerText = "No Content.";
                        } else
                            content[i].innerText = obj[i]["Text"];
                        if(obj[i]["Photo_File"] != null) {
                            PostImg[i].setAttribute("src", obj[i]["Photo_File"]);
                        }else{
                            PostImg[i].removeAttribute("src");
                        }
                        type[i].setAttribute("hidden", "hidden");
                        time[i].setAttribute("hidden", "hidden");
                        founder[i].setAttribute("hidden", "hidden");
                        num[i + 1].style.display = "block";
                    }
                }else if(str=="group="){
                    for (var i = 0; i < obj.length; i++) {
                        pic[i].setAttribute("hidden","hidden");
                        pic[i].removeAttribute("src");

                        title[i].innerText = obj[i]["Name"];
                        hre[i].setAttribute("href", "group.html");
                        link[i].setAttribute("href", "group.html");
                        content[i].removeAttribute("hidden");
                        if (obj[i]["Description"] == null) {
                            content[i].innerText = "No Description.";
                        } else
                            content[i].innerText = obj[i]["Description"];
                        PostImg[i].removeAttribute("src");
                        PostImg[i].setAttribute("hidden","hidden");
                        type[i].removeAttribute("hidden");
                        type[i].innerText = "Type: " + obj[i]["Type"];
                        founder[i].removeAttribute("hidden");
                        founder[i].innerText = "Founder: " + obj[i]["Founder"];
                        time[i].setAttribute("hidden", "hidden");
                        num[i + 1].style.display = "block";
                    }
                } else if(str=="event="){
                    for (var i = 0; i < obj.length; i++) {
                        pic[i].setAttribute("hidden","hidden");
                        pic[i].removeAttribute("src");

                        title[i].innerText = obj[i]["CName"];
                        //hre[i].setAttribute("href", "detail.html?eid=" + obj[i]["EID"]);
                        //link[i].setAttribute("href", "detail.html?eid=" + obj[i]["EID"]);
                        content[i].removeAttribute("hidden");
                        if (obj[i]["Description"] == null) {
                            content[i].innerText = "No Description.";
                        } else
                            content[i].innerText = obj[i]["Description"];
                        PostImg[i].removeAttribute("src");
                        PostImg[i].setAttribute("hidden","hidden");
                        type[i].removeAttribute("hidden");
                        type[i].innerText = "Date: " + obj[i]["Date"];
                        time[i].removeAttribute("hidden");
                        time[i].innerText = "Time " + obj[i]["Time"];
                        founder[i].removeAttribute("hidden");
                        founder[i].innerText = "Founder: " + obj[i]["UName"];
                        num[i + 1].style.display = "block";
                    }
                }
                else if(str=="user="){
                    for (var i = 0; i < obj.length; i++) {
                        pic[i].removeAttribute("hidden");
                        if(obj[i]["PhotoPath"] != null) {
                            pic[i].setAttribute("src", obj[i]["PhotoPath"]);
                        }else{
                            pic[i].setAttribute("src", "photos/blank.jpeg");
                        }
                        title[i].innerText = obj[i]["Name"];
                        hre[i].setAttribute("href", "personalPage.html?uid=" + obj[i]["UID"]);
                        link[i].setAttribute("href", "personalPage.html?uid=" + obj[i]["UID"]);
                        content[i].setAttribute("hidden","hidden");

                        PostImg[i].removeAttribute("src");
                        PostImg[i].setAttribute("hidden","hidden");
                        type[i].setAttribute("hidden","hidden");
                        time[i].setAttribute("hidden","hidden");
                        founder[i].setAttribute("hidden","hidden");
                        num[i + 1].style.display = "block";
                    }
                }
            }
        }
    }
    bt.addEventListener("click", function () {
        document.getElementById("hint").style.display = "none";
        clear();

        document.getElementById("warning").innerText="";

        var content = document.getElementById("filterTitle").value;

        if (document.getElementById("byPost").checked) {
            filterBy("post=", content);
        }
        else if (document.getElementById("byGroup").checked) {
            filterBy("group=", content);
        }
        else if (document.getElementById("byEvent").checked) {
            filterBy("event=", content);
        }
        else if (document.getElementById("byUser").checked) {
            filterBy("user=", content);
        }
        else{
            var warning = document.getElementById("warning");
            warning.innerText=" * Please Choose a Type";
        }

    });

});

