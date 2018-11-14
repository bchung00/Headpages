/**
 * Created by Chanyeol on 2017/6/29.
 */
/**
 * Created by lyqlucy on 17/6/23.
 */
window.addEventListener("load",function () {
    var warning = document.getElementById("warning");
    var country = document.getElementById("country");
    var continent = document.getElementById("continent");
    var latitude = document.getElementById("latitude");
    var longitude = document.getElementById("longitude");
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

    document.getElementById("city").addEventListener("change",function () {
        var xhr1 = new XMLHttpRequest();
        xhr1.open("post", "modify.php", true);
        xhr1.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        var data = "type=change&city="+ city.value;
        console.log(data);
        xhr1.send(data);
        xhr1.onload = function () {
            var res = xhr1.responseText;
            console.log(res);
            var obj = JSON.parse(res);
            console.log(obj);
            country.value = obj["country"];
            continent.value = obj["continent"];
        }
    });

    document.getElementById("bt").addEventListener("click", function () {
        if(uid==""){
            warning.innerText=" * 未登录";
        }else {
            if (((latitude.value.match(/^[-+]?[0-9]+(\.\d{1,6})?$/)) || latitude.value == null)
                && ((longitude.value.match(/^[-+]?[0-9]+(\.\d{1,6})?$/)) || longitude.value == null)) {
                var form = document.getElementById("uploadForm");
                var formData = new FormData(form);
                formData.append("uid", uid);
                var xhr = new XMLHttpRequest();
                xhr.open("post", "upload.php", true);
                xhr.send(formData);
                xhr.onload = function () {
                    var res = xhr.responseText;
                    console.log(res);
                    if (res == "success") {
                        window.location.href = "my photos.html";
                    } else
                        warning.innerText = " * " + res;
                }
            } else {
                warning.innerText = " * 请输入正确的经纬度";
            }
        }
    });
});