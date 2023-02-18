var searchBtn = document.getElementById("icon");
searchBtn.addEventListener("click", showRes);

var favs =[];

var request = new XMLHttpRequest();
request.open('get','https://gateway.marvel.com/v1/public/characters?ts=1&apikey=857b6f8da8acbb134cd01372d3a37317&hash=8d5b1d4072cc9d93c562de8999fcd160');
request.send();

function showRes()
{
    
}
function showRes1(num)
{
    num=10;
    var searchBox = document.getElementById("search-superhero");
    var name = searchBox.value;
    console.log(name);
    request.onload = function(){
        const responseJSON = JSON.parse(request.response);
        // responseJSON.data.results.length
        for(let i=0; i<num; i++)
        {
            var img_div = document.createElement("div");
            // img_div.style.border = "1px solid white";
            var icon_div = document.createElement("div");
            icon_div.classList.add("fav-icon");
            icon_div.innerHTML = '❤️';
            img_div.append(icon_div);

            icon_div.addEventListener("click", function(){
                var element = {
                    id: responseJSON.data.results[i].id,
                    display: false
                };
                favs.push(element);
            });
            
            img_div.classList.add("image-box");
            img_div.style.height = 15+"rem";
            img_div.style.width = 16+"rem";
            var image = document.createElement("img");
            image.src = responseJSON.data.results[i].thumbnail.path+'.'+'jpg';
            image.style.height = 90+"%";
            image.style.width = 100+"%";
            img_div.append(image);

            var name_div = document.createElement("div");
            name_div.style.width = 100+"%";
            name_div.style.height = 10+"%";
            name_div.style.textAlign = "center";
            name_div.innerHTML = responseJSON.data.results[i].name;
            name_div.style.fontWeight = 700;
            document.getElementById("result-container").append(img_div);
            img_div.append(name_div);
        }
        
    };
}
showRes1();

const myfavPage = document.getElementById("my-favs");
myfavPage.addEventListener("click", reload);
function reload()
{
    var res = JSON.parse(request.response);

    var search_div = document.getElementById("content");
    search_div.style.display="none";

    var result_container = document.getElementById("result-container");
    result_container.style.display="none";

    var result_container2 = document.getElementById("result-container2");
    result_container2.style.display = "flex";
    result_container2.style.justifyContent = "center";
    result_container2.style.alignItems = "center";

    for(let i=0; i<res.data.results.length; i++)
    {
        for(let j=0; j<favs.length; j++)
        {
            if(res.data.results[i].id == favs[j].id)
            {
                var img_div = document.createElement("div");
                // img_div.style.border = "1px solid white";
                var icon_div = document.createElement("div");
                icon_div.classList.add("fav-icon");
                icon_div.innerHTML = '❤️';
                img_div.append(icon_div);

                img_div.classList.add("image-box");
                img_div.style.height = 15+"rem";
                img_div.style.width = 16+"rem";
                img_div.style.marginRight = 1+"rem";
                img_div.id = favs[j].id;
                var image = document.createElement("img");
                image.src = res.data.results[i].thumbnail.path+'.'+'jpg';
                image.style.height = 90+"%";
                image.style.width = 100+"%";
                img_div.append(image);

                var name_div = document.createElement("div");
                name_div.style.width = 100+"%";
                name_div.style.height = 10+"%";
                name_div.style.textAlign = "center";
                name_div.innerHTML = res.data.results[i].name;
                name_div.style.fontWeight = 700;
                if(favs[j].display == false){
                    document.getElementById("result-container2").append(img_div);
                    favs[j].display = true;
                }
                img_div.append(name_div);

                icon_div.addEventListener("click", function(){
                    document.getElementById(favs[j].id).remove();
                    favs.pop(favs[j]);
                });
            }
        }
    }
}
var home = document.getElementById("home");
home.addEventListener("click", function(){
    document.getElementById("result-container").style.display = "flex";
    document.getElementById("content").style.display = "flex";
    document.getElementById("result-container2").style.display = "none";
})