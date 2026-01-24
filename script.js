const girarEsq = document.getElementById("girarEsq");
const andar = document.getElementById("moveButton");
const girarDir = document.getElementById("girarDir");
const lightBox = document.getElementById("lightButton");
const p1Button = document.getElementById("p1Button");
const p2Button = document.getElementById("p2Button");
const jumpButton = document.getElementById("jumpButton")
const retryButton = document.getElementById("retryButton");
const faseButton = document.getElementById("faseButton");
const startButton = document.getElementById("startExec");
const returnButton = document.getElementById("returnButton")
const person = document.getElementById("person");
const theEnd = document.getElementById("theEnd");

const optionMain = document.getElementById("optionMain");
const optionP1 = document.getElementById("optionP1");
const optionP2 = document.getElementById("optionP2");

const boxes = document.querySelectorAll(".box"); //transforma os elementos em um array
const boxesMain = document.querySelectorAll(".boxMain");
const boxesP1 = document.querySelectorAll(".boxP1");
const boxesP2 = document.querySelectorAll(".boxP2");

const gridSize = Math.sqrt(Math.abs(boxes.length));
let positionX = 0;
let positionY = 0;
let boxIllumination = 0;
let rotacao = 0;

function updatePosition(ultimoComando) {
  console.log(boxes)
  console.log(comandos)
  const loc = positionY * gridSize + positionX;
  boxes[loc].appendChild(person);

  boxIllumination = boxes[loc];

  if (boxes[loc].classList.contains("pokeClass")) {
    person.style.display = "none";
    setTimeout(() => {
      alert("Seu pokemon foi capturado! GAMER OVER");
      resetGame();
      return;
    }, 100)
  }
  else if (boxes[loc].id === "endBox" && ultimoComando) {
    theEnd.style.display = "none"
    setTimeout(() => {
      alert("🎉 Parabéns! Você chegou ao final! Vá para o próximo nível.");
      faseButton.style.display = "inline-block";
      return;
    }, 100);
  }
  else if (boxes[loc].id !== "endBox" && ultimoComando) {
    setTimeout(() => {
      alert("Infelizmente você não conseguiu! Tente novamente.")
      return;
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

function pularCasa() {
  if (rotacao === 0) {
    if (positionY < gridSize - 1) {
      positionY += 2;
    }
  } else if (rotacao === 90 || rotacao === -270) {
    if (positionX > 0) {
      positionX -= 2;
    }
  } else if (rotacao === -90 || rotacao === 270) {
    if (positionX < gridSize - 1) {
      positionX += 2;
    }
  } else if (rotacao === 180 || rotacao === -180) {
    if (positionY > 0) {
      positionY -= 2;
    }
  }
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

function adicionarComandosMain(funcao, cor, iconClass) {
  if (ccm < boxesMain.length) {
    comandos.push(funcao);
    boxesMain[ccm].style.backgroundColor = cor;

    if (iconClass === "p1") {
      boxesMain[ccm].innerHTML = "P1 ";
    } else if (iconClass === "p2") {
      boxesMain[ccm].innerHTML = "P2";
    } else if (iconClass === "jump") {
      boxesMain[ccm].innerHTML = "J";
    } else {

      const icon = document.createElement("i");
      icon.classList.add("bi", iconClass, "icon-comando");

      boxesMain[ccm].appendChild(icon);
    }
    ccm++;
  }
}

function adicionarComandosP1(funcao, cor, iconClass) {
  if (ccp1 < boxesP1.length) {
    comandosP1.push(funcao);
    boxesP1[ccp1].style.backgroundColor = cor;

    if (iconClass === "jump") {
      boxesP1[ccp1].innerHTML = "J";
    } else {

      const icon = document.createElement("i");
      icon.classList.add("bi", iconClass, "icon-comando");

      boxesP1[ccp1].appendChild(icon);
    }
    ccp1++;
  }
}

function adicionarComandosP2(funcao, cor, iconClass) {
  if (ccp2 < boxesP2.length) {
    comandosP2.push(funcao);
    boxesP2[ccp2].style.backgroundColor = cor;

    if (iconClass === "jump") {
      boxesP2[ccp2].innerHTML = "J";
    } else {
      const icon = document.createElement("i");
      icon.classList.add("bi", iconClass, "icon-comando");

      boxesP2[ccp2].appendChild(icon);
    }
    ccp2++;
  }
}

andar.addEventListener("click", () => {
  if (verificarOptionDep() === optionMain) {
    adicionarComandosMain(andarPersonsagem, "#7c7c7c96", "bi-arrow-up");
  } else if (verificarOptionDep() === optionP1) {
    adicionarComandosP1(andarPersonsagem, "#7c7c7c96 ", "bi-arrow-up");
  } else if (verificarOptionDep() === optionP2) {
    adicionarComandosP2(andarPersonsagem, "#7c7c7c96 ", "bi-arrow-up");
  } else {
    alert("Escolha entre: Main, P1 e P2");
  }
});
girarEsq.addEventListener("click", () => {
  if (verificarOptionDep() === optionMain) {
    adicionarComandosMain(girarPersonagemEsq, "#7c7c7c96 ", "bi-arrow-clockwise");
  } else if (verificarOptionDep() === optionP1) {
    adicionarComandosP1(girarPersonagemEsq, "#7c7c7c96 ", "bi-arrow-clockwise");
  } else if (verificarOptionDep() === optionP2) {
    adicionarComandosP2(girarPersonagemEsq, "#7c7c7c96 ", "bi-arrow-clockwise");
  } else {
    alert("Escolha entre: Main, P1 e P2");
  }
});
girarDir.addEventListener("click", () => {
  if (verificarOptionDep() === optionMain) {
    adicionarComandosMain(girarPersonagemDir, "#7c7c7c96 ", "bi-arrow-counterclockwise");
  } else if (verificarOptionDep() === optionP1) {
    adicionarComandosP1(girarPersonagemDir, "#7c7c7c96 ", "bi-arrow-counterclockwise");
  } else if (verificarOptionDep() === optionP2) {
    adicionarComandosP2(girarPersonagemDir, "#7c7c7c96 ", "bi-arrow-counterclockwise");
  } else {
    alert("Escolha entre: Main, P1 e P2");
  }
});
lightBox.addEventListener("click", () => {
  if (verificarOptionDep() === optionMain) {
    adicionarComandosMain(acenderCasa, "#7c7c7c96 ", "bi-lightbulb");
  } else if (verificarOptionDep() === optionP1) {
    adicionarComandosP1(acenderCasa, "#7c7c7c96 ", "bi-lightbulb");
  } else if (verificarOptionDep() === optionP2) {
    adicionarComandosP2(acenderCasa, "#7c7c7c96 ", "bi-lightbulb");
  } else {
    alert("Escolha entre: Main, P1 e P2");
  }
});
p1Button.addEventListener("click", () => {
  if (verificarOptionDep() === optionMain) {
    adicionarComandosMain(callP1, "#7c7c7c96 ", "p1");
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
    adicionarComandosMain(callP2, "#7c7c7c96 ", "p2");
  } else if (verificarOptionDep() === optionP1) {
    alert("É posivel adicionar P2 somente na Main");
  } else if (verificarOptionDep() === optionP2) {
    alert("É posivel adicionar P2 somente na Main");
  } else {
    alert("Escolha entre: Main, P1 e P2");
  }
});
jumpButton.addEventListener("click", () => {
  if (verificarOptionDep() === optionMain) {
    adicionarComandosMain(pularCasa, "#7c7c7c96 ", "jump");
  } else if (verificarOptionDep() === optionP1) {
    adicionarComandosP1(pularCasa, "#7c7c7c96 ", "jump");
  } else if (verificarOptionDep() === optionP2) {
    adicionarComandosP2(pularCasa, "#7c7c7c96 ", "jump");
  } else {
    alert("Escolha entre: Main, P1 e P2");
  }
});

startButton.addEventListener("click", () => {
  const locInicial = positionY * gridSize + positionX;
  boxIllumination = boxes[locInicial];

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

      updatePosition(i === filaExec.length - 1);
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
  jumpButton.style.display = "none";
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

function resetGame() {
  positionX = 0;
  positionY = 0;
  rotacao = 0;
  boxIllumination = 0;

  comandos = [];
  comandosP1 = [];
  comandosP2 = [];
  ccm = 0;
  ccp1 = 0;
  ccp2 = 0;

  boxesMain.forEach(box => {
    box.style.backgroundColor = "";
    box.innerHTML = "";
  });

  boxesP1.forEach(box => {
    box.style.backgroundColor = "";
    box.innerHTML = "";
  });

  boxesP2.forEach(box => {
    box.style.backgroundColor = "";
    box.innerHTML = "";
  });

  person.style.display = "block";
  person.style.transform = "rotate(0deg)";
  boxes[0].appendChild(person);

  retryButton.style.display = "none";
  faseButton.style.display = "none";

  andar.style.display = "inline-block";
  girarDir.style.display = "inline-block";
  girarEsq.style.display = "inline-block";
  p1Button.style.display = "inline-block";
  p2Button.style.display = "inline-block";
  lightBox.style.display = "inline-block";
  startButton.style.display = "inline-block";
  jumpButton.style.display = "inline-block";
}