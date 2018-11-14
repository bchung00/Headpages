/**
 * Created by Chanyeol on 2017/6/25.
 */
window.addEventListener("load",function (){
    var warning = document.getElementById("warning");
    var title = document.getElementById("title");
    var description = document.getElementById("description");
    var city = document.getElementById("city");
    var country = document.getElementById("country");
    var continent = document.getElementById("continent");
    var latitude = document.getElementById("latitude");
    var longitude = document.getElementById("longitude");
    var img = document.getElementById("picture");

    var id = window.location.href.split("=");
    var xhr = new XMLHttpRequest();
    xhr.open("post", "modify.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    var data = "type=getInfo&id="+id[1];
    xhr.send(data);
    xhr.onload = function () {
        var res = xhr.responseText;
        console.log(res);
        var obj = JSON.parse(res);
        console.log(obj);
        title.value = obj["title"];
        description.value = obj["description"];
        city.value = obj["city"];
        country.value = obj["country"];
        continent.value = obj["continent"];
        latitude.value = obj["latitude"];
        longitude.value = obj["longitude"];
        img.setAttribute("src","travel-images/medium/"+obj["path"]);
    }

    city.addEventListener("change",function () {
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

    document.getElementById("btSubmit").onclick = function () {
        if(((latitude.value.match(/^[-+]?[0-9]+(\.\d{1,6})?$/)) || latitude.value == null)
            && ((longitude.value.match(/^[-+]?[0-9]+(\.\d{1,6})?$/)) || longitude.value == null)){
            fetch("modify.php?type=modify&id="+id[1]+ "&title=" + title.value + "&description=" + description.value+ "&city=" + city.value+ "&country=" + country.value+ "&continent=" + continent.value+ "&latitude=" + latitude.value+ "&longitude=" + longitude.value).then(function(rsp) {
                return rsp.text();
            }).then(function(data) {
                console.log(data);
                if(data=="success"){
                    alert("修改成功！");
                    window.location.href = "my photos.html";
                }else {
                    warning.innerText = " * 修改失败";
                }
            });
        }else{
            warning.innerText=" * 请输入正确的经纬度";
        }
    };
});