let array = [{"index":0,"name":"Social media ad for Bonehill Gaming","src":"bhgsome.png"},{"index":1,"name":"Poster for TFT league","src":"tftesite.png"}];

let index;
let playing=false;
let carousel;

$(function () {
    init();
});

function init() {
    if (localStorage.getItem("imageIndex") != null)
        index = localStorage.getItem("imageIndex");
    else
        index = 0;
    update();
}

function navHandler() {
    let x = document.getElementById("navUl");
    if (x.className === "navShown") {
        x.className = "nav";
    } else {
        x.className = "navShown";
    }
}

function showPrevious() {
    if (index == 0)
        index = array.length -1;
    else
        index--;
    $("#carousel-image").fadeOut(1000, update);
}

function showNext() {
    if (index == array.length -1)
        index = 0;
    else
        index++;
    $("#carousel-image").fadeOut(1000, update);
}

function play() {
    if (playing == true) {
        playing = false;
        document.getElementById("playBut").innerHTML = "PLAY";
    }
    else {
        playing = true;
        document.getElementById("playBut").innerHTML = "STOP";
    }
    show();
}

function show() {
    if (playing == false) {
        window.clearInterval(carousel)
    }
    else {
        showNext();
        clearInterval(carousel);
        carousel = setInterval(show, 4000);
    }
}

function update() {
    $("#carousel-image").attr("src", "image/"+array[index].src).fadeIn(1000);
    $("#carousel-title").html(array[index].name);
    localStorage.setItem("imageIndex", index);
}