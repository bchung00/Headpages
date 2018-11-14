/**
 * Created by Chanyeol on 2017/6/25.
 */
window.addEventListener("load", function () {
    var bt = document.getElementById("buttonFilter");
    var result = document.getElementsByClassName("main")[0];
    var pic = document.getElementsByClassName("img");
    var hre = document.getElementsByClassName("href");
    var title = document.getElementsByTagName("h2");
    var num = document.getElementsByTagName("dt");
    var description = document.getElementsByTagName("p");
    var page = document.getElementById("pages");
    var xhr = new XMLHttpRequest();
    var link = document.getElementsByClassName("link");


    //清空内容
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


    //筛选函数
    function filterBy(str, variable) {
        //Ajax
        xhr.open("post", "search.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(str + variable);
        xhr.onload = function () {
            var res = xhr.responseText;
            console.log(res);
            var obj = JSON.parse(res);
            var pageNum = Math.ceil(obj.length/5);

            //如果没拿到数据 显示no result
            if(res=="[]"){
                //把第一部分的都改了
                title[0].innerText = "No result";
                title[0].className = "noResult";
                description[0].setAttribute("hidden","hidden");
                pic[0].setAttribute("hidden","hidden");
                num[1].style.display = "block";
                link[0].removeAttribute("href");

            }
            //循环输出结果
            else {
                //第一部分还原
                title[0].className = "title";
                description[0].removeAttribute("hidden");
                pic[0].removeAttribute("hidden");

                //放元素

                for(var i=1;i<=pageNum;i++) {
                    var newPage = document.createElement("div");
                    newPage.id="page"+i;
                    newPage.innerText = i;
                    page.appendChild(newPage);
                    page.style.marginLeft = (54-2*i)+"%";
                }
                for (var i = 0; i < obj.length; i++) {
                    if (i == 5) break;//如果大于三个则需要分页
                    pic[i].setAttribute("src", "travel-images/square-medium/" + obj[i]["PATH"]);
                    title[i].innerText = obj[i]["Title"];
                    link[i].setAttribute("href", "detail.html?id=" + obj[i]["ImageID"]);
                    hre[i].setAttribute("href", "detail.html?id=" + obj[i]["ImageID"]);
                    if (obj[i]["Description"] == null) {
                        description[i+1].innerText = "No Description";
                    } else
                        description[i+1].innerText = obj[i]["Description"];
                    num[i + 1].style.display = "block";
                }

                for(var k = 1;k<=pageNum;k++) {
                    document.getElementById("page"+k).addEventListener("click", function () {

                        console.log(this.innerText+"is clicked");
                        console.log(pageNum);
                        for (var i = 0; i < 5; i++) {
                            if (i == 5) break;
                            pic[i].setAttribute("src", "");
                            title[i].innerText = "";
                            description[i].innerText = "";
                            link[i].removeAttribute("href");
                            num[i + 1].style.display = "none";
                        }

                        var picNum = obj.length-5*this.innerText+5;
                        var currentPage = this.innerText*5-5;
                        for (var i = 0; i < picNum; i++) {
                            if (i == 5) break;//如果大于三个则需要分页
                            pic[i].setAttribute("src", "travel-images/square-medium/" + obj[i + currentPage]["PATH"]);
                            title[i].innerText = obj[i + currentPage]["Title"];
                            hre[i].setAttribute("href", "detail.html?id=" + obj[i + currentPage]["ImageID"]);
                            link[i].setAttribute("href", "detail.html?id=" + obj[i+currentPage]["ImageID"]);
                            if (obj[i + currentPage]["Description"] == null) {
                                description[i+1].innerText = "No Description";
                            }
                            else
                                description[i+1].innerText = obj[i + currentPage]["Description"];
                            num[i + 1].style.display = "block";
                        }
                    });

                }
            }
        }
    }
    bt.addEventListener("click", function () {
        document.getElementById("hint").style.display = "none";
        clear();

        document.getElementById("warning").innerText="";//提示清空
        //得到两个inputbox里的输入
        var filterTitle = document.getElementById("filterTitle").value;
        var filterDescription = document.getElementById("filterDescription").value;


        //如果选中filterbyTitle
        if (document.getElementById("byTitle").checked) {
            if (filterTitle.length < 2) {
                var warning = document.getElementById("warning");
                warning.innerText=" * 请输入更长的关键词";
            }
            else
                filterBy("title=", filterTitle);
        }
        //如果选中filterbyDescription
        else if (document.getElementById("byDescription").checked) {
            if (filterDescription.length < 2) {
                var warning = document.getElementById("warning");
                warning.innerText=" * 请输入更长的关键词";
            }
            else filterBy("description=", filterDescription);
        }
        else{
            var warning = document.getElementById("warning");
            warning.innerText=" * 请选择筛选方式";
        }

    });

});

