const andar = document.getElementById("moveButton");
const girarEsq = document.getElementById("girarEsq");
const girarDir = document.getElementById("girarDir");
const lightBox = document.getElementById("lightButton");
const fasetButton = document.getElementById("faseButton");

const boxes = document.querySelectorAll(".box"); //transforma os elementos em um array
const boxesMain = document.querySelectorAll(".boxMain");
const boxesP1 = document.querySelectorAll(".boxP1");
const boxesP2 = document.querySelectorAll ("boxP2")
const person = document.getElementById("person");

const theEnd = document.getElementById("theEnd");

let positionX = 0;
let positionY = 0;
const gridSize = 5;

boxes[0].appendChild(person);

let boxIllumination = 0;

function updatePosition() {
  const loc = positionY * gridSize + positionX;
  boxes[loc].appendChild(person);
  if (boxes[loc] === boxes[22]) {
    alert("Parabéns! Você consigou pegar a fruta!");
    andar.style.display = "none";
    girarDir.style.display = "none";
    girarEsq.style.display = "none";
    fasetButton.style.display = "inline-block";
    theEnd.style.display = "none"
  }
  boxIllumination  = boxes[loc];  
}

lightBox.addEventListener("click", () => {
  boxIllumination .style.backgroundColor = "yellow";
});

