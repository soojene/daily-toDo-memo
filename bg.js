const body = document.querySelector("body");

const numOfImg = 9;

// function handleImgLoad(){
//     console.log("finish loading");
// } API로 하는게 아니라서 필요없음

function paintImg (imgNum){
    const image = new Image();
    image.src = `img/${imgNum + 1}.jpg`;
    image.classList.add("bgImg");
    body.appendChild(image);
    // image.addEventListener("loadend", handleImgLoad);
}

function genNumber (){
    const number = Math.floor(Math.random() * numOfImg);
    return number; 
}

function init (){
    const randomNumber = genNumber();
    paintImg(randomNumber);
}

init();