const mainGame = document.querySelector('.main-game');
let elementsPerRow;

document.getElementById('play').addEventListener('click', play)

function play(){
  elementsPerRow = parseInt(document.getElementById('level').value);
  
  reset();

  generatePlayGround();
  
}

function reset () {
  mainGame.innerHTML ='';
}

function generatePlayGround () {
  const grid = document.createElement("div");
  grid.className = 'grid';
  mainGame.appendChild(grid);
  console.log('1');
  for (let i = 1; i <= Math.pow(elementsPerRow, 2); i++){
    grid.append(createSquare(i));
  }
  grid.style.border = "1px solid black";
  grid.style.background= "white";
}


function createSquare(id){
  const square = document.createElement('div');
  square.className = 'square';
  square.idElement = id;
  square.innerHTML= `<span>${id}</span>`;
  square.addEventListener('click', clickSquare)
  square.style.width = generateCalcCss();
  square.style.height = generateCalcCss();
  return square;
}

function generateCalcCss(){
  return `calc(100% / ${elementsPerRow})`;
}

function clickSquare(event){
  console.log(this.idElement);
  this.classList.add('clicked');
}