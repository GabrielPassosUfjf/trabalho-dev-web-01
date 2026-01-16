const andar = document.getElementById("moveButton");
const girarEsq = document.getElementById("girarEsq");
const girarDir = document.getElementById("girarDir");
const lightBox = document.getElementById("lightButton");
const faseButton = document.getElementById("faseButton");
const p1Button = document.getElementById("p1Button");
const p2Button = document.getElementById("p2Button");
const startButton = document.getElementById("startExec");

const boxes = document.querySelectorAll(".box"); //transforma os elementos em um array
const boxesMain = document.querySelectorAll(".boxMain");
const boxesP1 = document.querySelectorAll(".boxP1");
const boxesP2 = document.querySelectorAll("boxP2");
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
  
  boxIllumination = boxes[loc];
}

lightBox.addEventListener("click", () => {
  boxIllumination.style.backgroundColor = "yellow";
});

// andar.addEventListener("click", () => {
//   if (rotacao === 0 || rotacao % 360 === 0) {
//     if (positionY < gridSize - 1) {
//       positionY++;
//       updatePosition();
//     }
//   } else if (rotacao === 90 || rotacao === -270) {
//     if (positionX > 0) {
//       positionX--;
//       updatePosition();
//     }
//   } else if (rotacao === -90 || rotacao === 270) {
//     if (positionX < gridSize - 1) {
//       positionX++;
//       updatePosition();
//     }
//   } else if (rotacao === 180 || rotacao === -180) {
//     if (positionY > 0) {
//       positionY--;
//       updatePosition();
//     }
//   }
// });

// let rotacao = 0;

// girarEsq.addEventListener("click", () => {
//   console.log(rotacao);
//   rotacao += 90;
//   if (rotacao >= 360) {
//     rotacao = 0;
//   }
//   person.style.transform = `rotate(${rotacao}deg)`;
// });

// girarDir.addEventListener("click", () => {
//   console.log(rotacao);
//   rotacao -= 90;
//   if (rotacao <= -360) {
//     rotacao = 0;
//   }
//   person.style.transform = `rotate(${rotacao}deg)`;
// });

let ccm = 0; //contadorCasaMain
let rotacao = 0;

function andarPersonsagem() {
  if (rotacao === 0 || rotacao % 360 === 0) {
    if (positionY < gridSize - 1) {
      positionY++;
    }
  } else if (rotacao === 90 || rotacao === -270) {
    if (positionX > 0) {
      positionX--;
    }
  } else if (rotacao === -90 || rotacao === 270) {
    if (positionX < gridSize - 1) {
      positionX++;
    }
  } else if (rotacao === 180 || rotacao === -180) {
    if (positionY > 0) {
      positionY--;
    }
  }
}

function girarPersonagemEsq() {
  rotacao += 90;
  if (rotacao >= 360) {
    rotacao = 0;
  }
}

function girarPersonagemDir() {
  console.log(rotacao);
  rotacao -= 90;
  if (rotacao <= -360) {
    rotacao = 0;
  }
}

// andar.addEventListener("click", () => {
//   for (let i = ccm; i < 14; i++) {
//     boxesMain[i].style.backgroundColor = "red";
//     boxesMain[i] = andarPersonsagem();

//     startButton.addEventListener("click", () => {
//       updatePosition();
//     });
//     ccm++;
//     break;
//   }
// });

// girarEsq.addEventListener("click", () => {
//   for (let i = ccm; i < 14; i++) {
//     boxesMain[i].style.backgroundColor = "blue";
//     boxesMain[i] = girarPersonagemEsq();
//     startButton.addEventListener("click", () => {
//       person.style.transform = `rotate(${rotacao}deg)`;
//     });
//     ccm++;
//     break;
//   }
// });

// girarDir.addEventListener("click", () => {
//   for (let i = ccm; i < 14; i++) {
//     boxesMain[i].style.backgroundColor = "blue";
//     boxesMain[i] = girarPersonagemDir();
//     startButton.addEventListener("click", () => {
//       person.style.transform = `rotate(${rotacao}deg)`;
//     });
//     ccm++;
//     break;
//   }
// });

let comandos = [];

function adicionarCmd(funcao, cor) {
  if (ccm < boxesMain.length) {
    comandos.push(funcao);
    boxesMain[ccm].style.backgroundColor = cor;
    ccm++;
  }
}

andar.addEventListener("click", () => {
  adicionarCmd(andarPersonsagem, "red");
});
girarEsq.addEventListener("click", () => {
  adicionarCmd(girarPersonagemEsq, "blue");
});
girarDir.addEventListener("click", () => {
  adicionarCmd(girarPersonagemDir, "blue");
});

startButton.addEventListener("click", () => {
  let i = 0;

  const intervalo = setInterval(() => {
    if (i < comandos.length) {
      comandos[i]();
      updatePosition();
      person.style.transform = `rotate(${rotacao}deg)`;
      i++;
    } else {
      clearInterval;
      comandos = [];
    }
  }, 500);

  andar.style.display = "none";
    girarDir.style.display = "none";
    girarEsq.style.display = "none";
    faseButton.style.display = "inline-block";
    theEnd.style.display = "none";
    p1Button.style.display = "none";
    p2Button.style.display = "none";
    lightBox.style.display = "none";
});
