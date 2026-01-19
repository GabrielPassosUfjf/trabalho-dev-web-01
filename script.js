const andar = document.getElementById("moveButton");
const girarEsq = document.getElementById("girarEsq");
const girarDir = document.getElementById("girarDir");
const lightBox = document.getElementById("lightButton");
const retryButton = document.getElementById("retryButton");
const faseButton = document.getElementById("faseButton");
const p1Button = document.getElementById("p1Button");
const p2Button = document.getElementById("p2Button");
const startButton = document.getElementById("startExec");
const returnButton = document.getElementById("returnButton")

const optionMain = document.getElementById("optionMain");
const optionP1 = document.getElementById("optionP1");
const optionP2 = document.getElementById("optionP2");

const boxes = document.querySelectorAll(".box"); //transforma os elementos em um array
const boxesMain = document.querySelectorAll(".boxMain");
const boxesP1 = document.querySelectorAll(".boxP1");
const boxesP2 = document.querySelectorAll(".boxP2");
const person = document.getElementById("person");

const theEnd = document.getElementById("theEnd");

let positionX = 0;
let positionY = 0;
const gridSize = 5;

//boxes[0].appendChild(person);

let boxIllumination = 0;
let rotacao = 0;

function updatePosition() {
  const loc = positionY * gridSize + positionX;
  boxes[loc].appendChild(person);

  boxIllumination = boxes[loc];

  if (loc === 22) {
    theEnd.style.display = "none";
    setTimeout(() => {
      alert("🎉 Parabéns! Você chegou ao final!");
      faseButton.style.display = "inline-block";
      retryButton.style.display = "inline-block";
    }, 100);
  }
}

function andarPersonsagem() {
  if (rotacao === 0) {
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
  rotacao -= 90;
  if (rotacao <= -360) {
    rotacao = 0;
  }
}

function acenderCasa() {
  boxIllumination.style.backgroundColor = "yellow";
}

let ccm = 0; //contadorCasaMain
let ccp1 = 0; //contadorCasaP1
let ccp2 = 0; //contadorCasaP2
let comandos = [];
let comandosP1 = [];
let comandosP2 = [];

function callP1() {
  return comandosP1;
}
function callP2() {
  return comandosP2;
}

function adicionarComandosMain(funcao, cor) {
  if (ccm < boxesMain.length) {
    comandos.push(funcao);
    boxesMain[ccm].style.backgroundColor = cor;
    ccm++;
  }
}

function adicionarComandosP1(funcao, cor) {
  if (ccp1 < boxesP1.length) {
    comandosP1.push(funcao);
    boxesP1[ccp1].style.backgroundColor = cor;
    ccp1++;
  }
}

function adicionarComandosP2(funcao, cor) {
  if (ccp2 < boxesP2.length) {
    comandosP2.push(funcao);
    boxesP2[ccp2].style.backgroundColor = cor;
    ccp2++;
  }
}

andar.addEventListener("click", () => {
  if (verificarOptionDep() === optionMain) {
    adicionarComandosMain(andarPersonsagem, "green");
  } else if (verificarOptionDep() === optionP1) {
    adicionarComandosP1(andarPersonsagem, "green");
  } else if (verificarOptionDep() === optionP2) {
    adicionarComandosP2(andarPersonsagem, "green");
  } else {
    alert("Escolha entre: Main, P1 e P2");
  }
});
girarEsq.addEventListener("click", () => {
  if (verificarOptionDep() === optionMain) {
    adicionarComandosMain(girarPersonagemEsq, "blue");
  } else if (verificarOptionDep() === optionP1) {
    adicionarComandosP1(girarPersonagemEsq, "blue");
  } else if (verificarOptionDep() === optionP2) {
    adicionarComandosP2(girarPersonagemEsq, "blue");
  } else {
    alert("Escolha entre: Main, P1 e P2");
  }
});
girarDir.addEventListener("click", () => {
  if (verificarOptionDep() === optionMain) {
    adicionarComandosMain(girarPersonagemDir, "blue");
  } else if (verificarOptionDep() === optionP1) {
    adicionarComandosP1(girarPersonagemDir, "blue");
  } else if (verificarOptionDep() === optionP2) {
    adicionarComandosP2(girarPersonagemDir, "blue");
  } else {
    alert("Escolha entre: Main, P1 e P2");
  }
});
lightBox.addEventListener("click", () => {
  if (verificarOptionDep() === optionMain) {
    adicionarComandosMain(acenderCasa, "yellow");
  } else if (verificarOptionDep() === optionP1) {
    adicionarComandosP1(acenderCasa, "yellow");
  } else if (verificarOptionDep() === optionP2) {
    adicionarComandosP2(acenderCasa, "yellow");
  } else {
    alert("Escolha entre: Main, P1 e P2");
  }
});
p1Button.addEventListener("click", () => {
  if (verificarOptionDep() === optionMain) {
    adicionarComandosMain(callP1, "pink");
  } else if (verificarOptionDep() === optionP1) {
    alert("É posivel adicionar P1 somente na Main");
  } else if (verificarOptionDep() === optionP2) {
    alert("É posivel adicionar P1 somente na Main");
  } else {
    alert("Escolha entre: Main, P1 e P2");
  }
});
p2Button.addEventListener("click", () => {
  if (verificarOptionDep() === optionMain) {
    adicionarComandosMain(callP2, "pink");
  } else if (verificarOptionDep() === optionP1) {
    alert("É posivel adicionar P2 somente na Main");
  } else if (verificarOptionDep() === optionP2) {
    alert("É posivel adicionar P2 somente na Main");
  } else {
    alert("Escolha entre: Main, P1 e P2");
  }
});

startButton.addEventListener("click", () => {
  let i = 0;
  let filaExec = [...comandos];
  const intervalo = setInterval(() => {
    if (i >= filaExec.length) {
      clearInterval(intervalo);
      return;
    } else {
      const cmd = filaExec[i];
      const result = cmd();

      if (Array.isArray(result)) {
        filaExec.splice(i, 1, ...result);
        return;
      }

      updatePosition();
      person.style.transform = `rotate(${rotacao}deg)`;
      i++;
    }
  }, 500);

  retryButton.style.display = "inline-block";
  andar.style.display = "none";
  girarDir.style.display = "none";
  girarEsq.style.display = "none";
  p1Button.style.display = "none";
  p2Button.style.display = "none";
  lightBox.style.display = "none";
  startButton.style.display = "none";
  returnButton.style.display = "none"
});

optionMain.addEventListener("click", () => {
  verificarOptionDep();
});
optionP1.addEventListener("click", () => {
  verificarOptionDep();
});
optionP2.addEventListener("click", () => {
  verificarOptionDep();
});

function verificarOptionDep() {
  const selecionado = document.querySelector('input[name="dep"]:checked');
  if (selecionado === optionMain) {
    return optionMain;
  } else if (selecionado === optionP1) {
    return optionP1;
  } else if (selecionado === optionP2) {
    return optionP2;
  } else {
    return false;
  }
}

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
