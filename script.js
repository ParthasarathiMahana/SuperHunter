var searchBtn = document.getElementById("icon");
searchBtn.addEventListener("click", showRes);

var request = new XMLHttpRequest();
request.open('get','https://gateway.marvel.com/v1/public/characters?ts=1&apikey=857b6f8da8acbb134cd01372d3a37317&hash=8d5b1d4072cc9d93c562de8999fcd160');
request.send();

function showRes()
{
    
}
function showRes1()
{
    var searchBox = document.getElementById("search-superhero");
    var name = searchBox.value;
    console.log(name);
    request.onload = function(){
        const responseJSON = JSON.parse(request.response);
        // responseJSON.data.results.length
        for(var i=0; i<10; i++)
        {
            var img_div = document.createElement("div");
            // img_div.style.border = "1px solid white";
            
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

