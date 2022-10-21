const mainGame = document.querySelector('.main-game');
let elementsPerRow;
const BOMBS_NUMBER = 16;
let bombs = [];
let score = 0;

document.getElementById('play').addEventListener('click', play);

function play(){
  elementsPerRow = parseInt(document.getElementById('level').value);
  
  reset();

  generatePlayGround();

  bombs = generateBombs();
  
}

function reset () {
  mainGame.innerHTML ='';
}

function generatePlayGround () {
  const grid = document.createElement("div");
  grid.className = 'grid';
  mainGame.appendChild(grid);
  for (let i = 1; i <= Math.pow(elementsPerRow, 2); i++){
    grid.append(createSquare(i));
  }
  grid.style.border = "1px solid black";
  grid.style.background= "white";
}


function createSquare(id) {
  const square = document.createElement('div');
  square.className = 'square';
  square.idElement = id;
  square.innerHTML= `<span>${id}</span>`;
  square.addEventListener('click', clickSquare)
  square.style.width = generateCalcCss();
  square.style.height = generateCalcCss();
  return square;
}

function generateCalcCss() {
  return `calc(100% / ${elementsPerRow})`;
}

function clickSquare(event) {
  console.log(this.idElement);
  if(!bombs.includes(this.idElement)) {
    this.classList.add('clicked');
    score++;
    if(score === (Math.pow(elementsPerRow, 2) - BOMBS_NUMBER)){
      endGame(true);
    }
  } else {
    endGame(false);
  }

}

function generateBombs() {
  const bombsGenerated = [];

  while (bombsGenerated.length < BOMBS_NUMBER) {
    const idBomb = getRndInteger(1, Math.pow(elementsPerRow, 2));
    if(!bombsGenerated.includes(idBomb)) {
      bombsGenerated.push(idBomb);
    }
  }
  return bombsGenerated;
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function endGame(won) {
  const endMessage = document.getElementById('end-message');
  if(won) {
    endMessage.innerText = "Hai vinto";
  } else {
    endMessage.innerText = "Hai perso";
    showBombs();
    noClick();
  }
}


function showBombs() {
  const squares = document.getElementsByClassName('square');
  for(let i=0; i < Math.pow(elementsPerRow, 2); i++) {
    if(bombs.includes(i+1)) {
      squares[i].classList.add('clicked-bomb')
    }
  }
}

function noClick() {
  const end = document.createElement('div');
  end.className = 'end-no-click';
  document.querySelector(".main-game").append(end);
}