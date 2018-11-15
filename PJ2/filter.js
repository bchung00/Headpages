
var allPage = 1;

fetch("browsePost.php?key=1").then(function (rsp) {
    return rsp.json();
}).then(function (data) {
    var table = document.getElementsByClassName("filter");
    var result = document.getElementsByClassName("result");
    var link = document.getElementsByClassName("link");
    for (var i = 0; i < data.length; i++) {
        if (i == 16) break;
        result[i].setAttribute("src", "travel-images/square-medium/" + data[i]["PATH"]);
        link[i].setAttribute("href", "detail.html?id="+ data[i]["ImageID"]);
        result[i].style.display="block";
    }
    var pageNum = Math.ceil(data.length/16);
    var page = document.getElementById("pages");
    for(var i=1;i<=pageNum;i++) {
        var newPage = document.createElement("div");
        newPage.id="page"+i;
        newPage.innerText = i;
        newPage.className="";
        page.appendChild(newPage);
        page.style.marginLeft = (54-3*i)+"%";
    }
    for(var k = 1; k<=pageNum ; k++) {
        document.getElementById("page"+k).addEventListener("click", function () {
            document.getElementById("page"+allPage).className="";
            this.className="page1";
            allPage = this.innerText;
            var result = document.getElementsByClassName("result");
            for (var i = 0; i < 16; i++) {
                result[i].removeAttribute("src");
                link[i].removeAttribute("href");
                result[i].style.display="none";

            }
            var picNum = data.length-16*this.innerText+16;
            var currentPage = this.innerText*16-16;
            for (var i = 0; i < picNum; i++) {
                if (i == 16) break;//如果大于三个则需要分页
                result[i].setAttribute("src", "travel-images/square-medium/" + data[i+currentPage]["PATH"]);
                link[i].setAttribute("href", "detail.html?id=" + data[i]["ImageID"]);
                result[i].style.display="block";
            }
        });
    }
});
function clear() {
    var link = document.getElementsByClassName("link");
    var result = document.getElementsByClassName("result");
    for (var i = 0; i < 16; i++) {
        result[i].removeAttribute("src");
        link[i].removeAttribute("href");
        result[i].style.display="none";
    }
    var page = document.getElementById("pages");
    while (page.firstChild){
        page.removeChild(page.firstChild);
    }
}

//逐级筛选的实现
window.addEventListener("load", function () {


    var continent_sel = document.getElementById("continent_sel");
    var country_sel = document.getElementById("country_sel");
    var city_sel = document.getElementById("city_sel");

    fetch("get_data.php?type=get_continent_list&conti=null&country=null").then(function(rsp) {
        return rsp.text();
    }).then(function(data) {
        console.log(data);
        data = JSON.parse(data);
        while (continent_sel.firstChild) {
            continent_sel.removeChild(continent_sel.firstChild);
        }
        var opt = document.createElement("option");
        opt.setAttribute("value", "0");
        opt.appendChild(document.createTextNode("Filter by Continent"));
        continent_sel.appendChild(opt);
        data.forEach(function(continent) {
            let opt = document.createElement("option");
            opt.setAttribute("value", continent.ContinentCode);
            opt.appendChild(document.createTextNode(continent.ContinentName));
            continent_sel.appendChild(opt);
        })
    });

    document.getElementById("continent_sel").addEventListener("change", function () {
        document.getElementById("buttonFilter").removeAttribute("disabled");
        var selectedContinent = document.getElementById("continent_sel").selectedIndex;
        var selectedValue = document.getElementById("continent_sel").options[selectedContinent].innerText;
        var url = "get_data.php?type=get_country_list&conti=" + selectedValue + "&country=null";
        console.log(url);

        fetch(url).then(function (rsp) {
            return rsp.text();
        }).then(function (data) {

            data = JSON.parse(data);

            while (country_sel.firstChild) {
                country_sel.removeChild(country_sel.firstChild);
            }
            var opt = document.createElement("option");
            opt.setAttribute("value", "0");
            opt.setAttribute("data-iso", "0");
            opt.appendChild(document.createTextNode("Filter by Country"));
            country_sel.appendChild(opt);
            while (city_sel.firstChild) {
                city_sel.removeChild(city_sel.firstChild);
            }
            var opt = document.createElement("option");
            opt.setAttribute("value", "0");
            opt.appendChild(document.createTextNode("Filter by City"));
            city_sel.appendChild(opt);
            data.forEach(function (country) {
                var opt = document.createElement("option");
                opt.setAttribute("value", country.GeoNameId);
                opt.setAttribute("data-iso", country.ISO);
                opt.appendChild(document.createTextNode(country.CountryName));
                country_sel.appendChild(opt);
            })
        });
        document.getElementById("country_sel").addEventListener("change", function () {
            var selectedCountry = document.getElementById("country_sel").selectedIndex;
            var selectedCountryValue = document.getElementById("country_sel").options[selectedCountry].dataset.iso;
            var url = "get_data.php?type=get_city_list&conti=" + selectedValue + "&country=" + selectedCountryValue;
            console.log(url);
            fetch(url).then(function (rsp) {
                return rsp.text();
            }).then(function (data) {
                console.log(data);
                data = JSON.parse(data);

                while (city_sel.firstChild) {
                    city_sel.removeChild(city_sel.firstChild);
                }
                var opt = document.createElement("option");
                opt.setAttribute("value", "0");
                opt.appendChild(document.createTextNode("Filter by City"));
                city_sel.appendChild(opt);
                data.forEach(function (city) {
                    var opt = document.createElement("option");
                    opt.setAttribute("value", city.GeoNameId);
                    opt.appendChild(document.createTextNode(city.AsciiName));
                    city_sel.appendChild(opt);
                })
            });
        });
    });

    document.getElementById("buttonFilter").addEventListener("click", function () {
        clear();
        //得到节点
        var selectedContinent = document.getElementById("continent_sel").selectedIndex;
        var selectedValue = document.getElementById("continent_sel").options[selectedContinent].innerText;
        var selectedCountry = document.getElementById("country_sel").selectedIndex;
        var selectedCountryValue = document.getElementById("country_sel").options[selectedCountry].dataset.iso;
        var selectedCity = document.getElementById("city_sel").selectedIndex;
        var selectedCityValue = document.getElementById("city_sel").options[selectedCity].value;


        var info="continent=" + selectedValue + "&country=" + selectedCountryValue + "&city=" + selectedCityValue;
        console.log(info);
        var xhr = new XMLHttpRequest();
        xhr.open("post", "filterpic.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(info);
        xhr.onload = function () {
            var rsp = xhr.responseText;
            var data = JSON.parse(rsp);
            var pageNum = Math.ceil(data.length/16);
            var result = document.getElementsByClassName("result");
            var link = document.getElementsByClassName("link");
            for (var i = 0; i < data.length; i++) {
                if (i == 16)break;
                result[i].style.display="block";
                result[i].setAttribute("src", "travel-images/square-medium/" + data[i]["PATH"]);
                link[i].setAttribute("href", "detail.html?id=" + data[i]["ImageID"]);
                result[i].style.display="block";
            }
            var page = document.getElementById("pages");
            for(var i=1;i<=pageNum;i++) {
                var newPage = document.createElement("div");
                newPage.id="page"+i;
                newPage.innerText = i;
                page.appendChild(newPage);
                page.style.marginLeft = (54-3*i)+"%";
            }
            for(var k = 1; k<=pageNum ; k++) {
                document.getElementById("page"+k).addEventListener("click", function () {
                    document.getElementById("page"+allPage).className="";
                    this.className="page1";
                    allPage = this.innerText;
                    var result = document.getElementsByClassName("result");
                    for (var i = 0; i < 16; i++) {
                        result[i].style.display="none";
                        result[i].removeAttribute("src");
                        link[i].removeAttribute("href");
                    }
                    var picNum = data.length-16*this.innerText+16;
                    var currentPage = this.innerText*16-16;
                    for (var i = 0; i < picNum; i++) {
                        if (i == 16) break;
                        result[i].setAttribute("src", "travel-images/square-medium/" + data[i+currentPage]["PATH"]);
                        link[i].setAttribute("href", "detail.html?id=" + data[i]["ImageID"]);
                        result[i].style.display="block";
                    }
                });
            }
        };
    });
});
