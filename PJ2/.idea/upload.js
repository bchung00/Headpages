/**
 * Created by Chanyeol on 2017/6/25.
 */
window.addEventListener("load",function () {
    document.getElementById("bt").addEventListener("click", function () {
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
        var form = document.getElementById("uploadForm");
        var formData = new FormData(form);
        formData.append("uid",uid);
        var xhr = new XMLHttpRequest();
        xhr.open("post", "upload.php", true);
        xhr.send(formData);
        xhr.onload = function () {
            var res = xhr.responseText;
            console.log(res=="success");
            if(res=="success"){
                window.location.href="my photos.html";
            }else
                alert(res);
        }
    });
});