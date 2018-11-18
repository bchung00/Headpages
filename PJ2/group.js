window.addEventListener("load", function () {
    var title = document.getElementsByTagName("h2");
    var xhr = new XMLHttpRequest();
    var count = document.getElementsByClassName("count");
    var num = document.getElementsByTagName("dt");
    var description = document.getElementsByClassName("description");


    function getCookie(c_name) {
        if (document.cookie.length > 0) {
            c_start = document.cookie.indexOf(c_name + "=")
            if (c_start != -1) {
                c_start = c_start + c_name.length + 1
                c_end = document.cookie.indexOf(";", c_start)
                if (c_end == -1) c_end = document.cookie.length
                return document.cookie.substring(c_start, c_end);
            }
        }
        return ""
    }

    var home = document.getElementById("home");
    var uid = getCookie("uid");
    home.setAttribute("href", "personalPage.html?uid=" + uid);

    xhr.open("post", "group.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("key=1");
    xhr.onload = function () {
        var res = xhr.responseText;
        console.log(res);
        var obj = JSON.parse(res);

        //if no results
        if (res == "[]") {
            title[0].innerText = "No result";
            title[0].className = "noResult";
            count[0].setAttribute("hidden","hidden");
            num[1].style.display = "block";
        } else {
            title[0].className = "title";
            count[0].removeAttribute("hidden");

            for (var i = 0; i < 10; i++) {
                description[i].style.width = "100%";
                title[i].innerText = obj[i]["name"];
                count[i].removeAttribute("hidden");
                count[i].innerText = "Members: " + obj[i]["COUNT(*)"];
                num[i + 1].style.display = "block";
            }

        }
    }
});

