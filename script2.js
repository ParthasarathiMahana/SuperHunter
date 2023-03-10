// Fetching the search bar section
var search_div = document.getElementById("content");
var searchButton = document.getElementById("icon");
var searchBox = document.getElementById("search-superhero");
var list = document.getElementById("recom");

// Fetching All Navigation options
var homeNav = document.getElementById("home");
var myfavNav = document.getElementById("my-favs");
var allSHNav = document.getElementById("AllSuperHeros");

// Fetching Different Div to show different Result
var home_container = document.getElementById("result-container");
var favs_container = document.getElementById("result-container2");
var all_SuperHero_container = document.getElementById("result-container3");
var search_res_container = document.getElementById("result-container4");
var detailsEach_container = document.getElementById("result-container5");

// stores result to help in auto complete
var names = [];
// Array of objects tostores id and display property of favourites
var favsCount = 0;
// variable for keeping record whether details of all super has been already shownor not
var shDetails = false;
var shDetailsEach = false;

var prevFavs = {};

// setting up ajax call
var request = new XMLHttpRequest();
request.open('get', 'https://gateway.marvel.com/v1/public/characters?ts=1&apikey=857b6f8da8acbb134cd01372d3a37317&hash=8d5b1d4072cc9d93c562de8999fcd160');
request.send();

// For creating small image section, to be displayed on home, fav, and search
function createSmallImageSection(imgUrl, nameOfSH, shid) {
    var img_div = document.createElement("div");
    var icon_div = document.createElement("div");
    icon_div.classList.add("fav-icon");
    icon_div.innerHTML = '❤️';
    icon_div.id = shid;
    img_div.append(icon_div);

    // Handling addition and removal from favourites list
    icon_div.addEventListener("click", function (event) {
        event.stopPropagation();
        var keys = Object.keys(localStorage);
        var values = Object.values(localStorage);
        for (let i = 0; i < values.length; i++) {
            if (values[i] == icon_div.id) {
                localStorage.removeItem(keys[i]);
                favs_container.innerHTML = "";
                myfavNav.click();
                return;
            }
        }
        window.localStorage.setItem(favsCount++, icon_div.id);
    });

    img_div.classList.add("image-box");
    img_div.style.height = 15 + "rem";
    img_div.style.width = 16 + "rem";
    img_div.id = shid;
    var image = document.createElement("img");
    image.src = imgUrl;
    image.style.height = 90 + "%";
    image.style.width = 100 + "%";
    img_div.append(image);

    var name_div = document.createElement("div");
    name_div.style.width = 100 + "%";
    name_div.style.height = 10 + "%";
    name_div.style.textAlign = "center";
    name_div.innerHTML = nameOfSH;
    name_div.style.fontWeight = 700;
    img_div.append(name_div);

    img_div.addEventListener("click", function () {
        var res = JSON.parse(request.response);
        let id = img_div.id;
        for (let i = 0; i < res.data.results.length; i++) {
            if (id == res.data.results[i].id) {
                showDetailesEach(i);
            }
        }
    });

    return img_div;
}

// Showing Results for Home page
function HomePageResult(num) {

    var responseJSON;
    request.onload = function () {
        responseJSON = JSON.parse(request.response);

        for (let j = 0; j < responseJSON.data.results.length; j++) {
            names.push(responseJSON.data.results[j].name);
        }

        for (let i = 0; i < num; i++) {
            var path = responseJSON.data.results[i].thumbnail.path + '.' + responseJSON.data.results[i].thumbnail.extension;
            var shName = responseJSON.data.results[i].name;
            var id = responseJSON.data.results[i].id;
            var div = createSmallImageSection(path, shName, id);
            home_container.append(div);
        }
    }
}

// We can change the number of result we want to show in home page.
// HomePageResult(15);
HomePageResult(10);
// handling the clicking event on home button of navigation bar
homeNav.addEventListener("click", function () {
    search_div.style.display = "flex";
    home_container.style.display = "flex";
    favs_container.style.display = "none";
    all_SuperHero_container.style.display = "none";
    search_res_container.style.display = "none";
    detailsEach_container.style.display = "none";
});

// For showing result of All SepurHero's Details
allSHNav.addEventListener("click", function () {
    // Made display of all other divs none
    home_container.style.display = "none";
    search_div.style.display = "none";
    favs_container.style.display = "none";
    detailsEach_container.style.display = "none";

    var response = JSON.parse(request.response);

    for (let i = 0; i < response.data.results.length; i++) {
        var response = JSON.parse(request.response);

        var detailes_container = document.createElement("div");
        detailes_container.style.width = 70 + "rem";
        detailes_container.style.height = 20 + 'rem';
        detailes_container.style.backgroundColor = "white";
        detailes_container.style.marginBottom = 1 + "rem";
        detailes_container.style.display = "flex";

        var img_part = document.createElement("div");
        img_part.style.width = 35 + "%";
        img_part.style.height = 100 + "%";
        detailes_container.append(img_part);

        var img_details = document.createElement("img");
        img_details.src = response.data.results[i].thumbnail.path + '.' + response.data.results[i].thumbnail.extension
        img_part.append(img_details);
        img_details.style.width = 100 + "%";
        img_details.style.height = 100 + "%";

        var text_details = document.createElement("div");
        text_details.style.width = 65 + "%";
        text_details.style.height = 100 + "%";
        // text_details.style.border = "1px solid red"
        text_details.style.display = "flex";
        text_details.style.flexDirection = "column";

        var name = document.createElement("div");
        name.style.width = 100 + "%";
        name.style.color = "black";
        name.style.fontWeight = 700;
        name.style.fontSize = 1.5 + "rem";
        name.style.marginLeft = 1 + "rem";

        name.innerHTML = "Name: " + response.data.results[i].name;
        text_details.append(name);

        let description = document.createElement("div");
        description.style.width = 98 + "%";
        description.style.height = 40 + "%";
        description.style.color = "black";
        description.style.fontSize = 1 + "rem";
        description.style.marginLeft = 1 + "rem";

        description.innerHTML = "<h4>Description: </h4>" + response.data.results[i].description;
        text_details.append(description);

        let comics = document.createElement("div");
        comics.style.width = 98 + "%";
        comics.style.height = 10 + "%";
        comics.style.color = "black";
        comics.style.fontSize = 1 + "rem";
        comics.style.marginLeft = 1 + "rem";

        comics.innerHTML = "<h4>Comic Link: </h4>" + response.data.results[i].urls[1].url;
        text_details.append(comics);

        detailes_container.append(text_details);

        all_SuperHero_container.style.display = "flex";
        if (shDetails == false) {
            all_SuperHero_container.append(detailes_container);
        }
    }
    shDetails = true;
});

// For Showing result of favourites
myfavNav.addEventListener("click", favourites);
function favourites() {
    favs_container.innerHTML = "";
    var res = JSON.parse(request.response);
    all_SuperHero_container.style.display = "none";
    search_div.style.display = "none";
    home_container.style.display = "none";
    detailsEach_container.style.display = "none";
    favs_container.style.display = "flex";
    favs_container.style.justifyContent = "center";
    favs_container.style.alignItems = "center";

    var favKeyArr = Object.keys(localStorage);
    var prevFavArr = Object.keys(prevFavs);

    // if (favKeyArr.length > prevFavArr.length) {
    for (let i = 0; i < favKeyArr.length; i++) {
        for (let j = 0; j < res.data.results.length; j++) {
            if (localStorage.getItem(favKeyArr[i]) == res.data.results[j].id) {
                var path = res.data.results[j].thumbnail.path + '.' + res.data.results[j].thumbnail.extension;
                var shName = res.data.results[j].name;
                var id = res.data.results[j].id;
                var div = createSmallImageSection(path, shName, id);
                favs_container.append(div);
            }
        }
    }
    // }
    prevFavs = localStorage;
}

// showing individual details of a superhero/supervillain
function showDetailesEach(index) {
    all_SuperHero_container.style.display = "none";
    home_container.style.display = "none";
    search_div.style.display = "none";
    favs_container.style.display = "none";

    detailsEach_container.innerHTML = "";
    detailsEach_container.style.display = "flex";
    detailsEach_container.style.justifyContent = "center";
    detailsEach_container.style.alignItems = "center";

    var response = JSON.parse(request.response);
    let i = index;

    var response = JSON.parse(request.response);

    var detailes_container = document.createElement("div");
    detailes_container.style.width = 70 + "rem";
    detailes_container.style.height = 20 + 'rem';
    detailes_container.style.backgroundColor = "white";
    detailes_container.style.marginBottom = 1 + "rem";
    detailes_container.style.display = "flex";

    var img_part = document.createElement("div");
    img_part.style.width = 35 + "%";
    img_part.style.height = 100 + "%";
    detailes_container.append(img_part);

    var img_details = document.createElement("img");
    img_details.src = response.data.results[i].thumbnail.path + '.' + response.data.results[i].thumbnail.extension
    img_part.append(img_details);
    img_details.style.width = 100 + "%";
    img_details.style.height = 100 + "%";

    var text_details = document.createElement("div");
    text_details.style.width = 65 + "%";
    text_details.style.height = 100 + "%";
    // text_details.style.border = "1px solid red"
    text_details.style.display = "flex";
    text_details.style.flexDirection = "column";

    var name = document.createElement("div");
    name.style.width = 100 + "%";
    name.style.color = "black";
    name.style.fontWeight = 700;
    name.style.fontSize = 1.5 + "rem";
    name.style.marginLeft = 1 + "rem";

    name.innerHTML = "Name: " + response.data.results[i].name;
    text_details.append(name);

    let description = document.createElement("div");
    description.style.width = 98 + "%";
    description.style.height = 40 + "%";
    description.style.color = "black";
    description.style.fontSize = 1 + "rem";
    description.style.marginLeft = 1 + "rem";

    description.innerHTML = "<h4>Description: </h4>" + response.data.results[i].description;
    text_details.append(description);

    let comics = document.createElement("div");
    comics.style.width = 98 + "%";
    comics.style.height = 10 + "%";
    comics.style.color = "black";
    comics.style.fontSize = 1 + "rem";
    comics.style.marginLeft = 1 + "rem";

    comics.innerHTML = "<h4>Comic Link: </h4>" + response.data.results[i].urls[1].url;
    text_details.append(comics);

    detailes_container.append(text_details);

    if (shDetailsEach == false) {
        detailsEach_container.append(detailes_container);
    }

    // shDetailsEach = true;
}

// Auto Complete Feature of search bar
searchBox.addEventListener("input", function (event) {
    // e.targe
    let availableNames = [];
    if (event.target.value) {
        availableNames = names.filter(ifMatch);
        function ifMatch(nameX) {
            return nameX.toLowerCase().includes(event.target.value);
        }
        availableNames = availableNames.map(nameX => `<li class="recom_list", id=${nameX.replace(/ +/g, "")}>${nameX}</li>`);
    }
    showArr(availableNames);
});

function showArr(availableNames) {
    if (!availableNames, length) {
        html = "";
    }
    else {
        html = availableNames.join('');
    }
    list.innerHTML = html;
}

window.setInterval(function(){
    if(list.innerHTML.includes("li"))
    {
        var litem = list.getElementsByTagName("li");
        var value = Object.values(litem);
        for(let i = 0; i<value.length; i++)
        {
            // console.log(value[i]);
            value[i].addEventListener("click", function(){
                searchBox.value = value[i].innerHTML;
            });
        }
    }
}, 500);

searchButton.addEventListener("click", function(){
    var searchVal = searchBox.value;
    var res1 = JSON.parse(request.response);
    for(let i=0; i<res1.data.results.length; i++)
    {
        if(searchVal == res1.data.results[i].name)
        {
            showDetailesEach(i);
        }
    }
});