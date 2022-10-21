const mainGame = document.querySelector('.main-game');  //seleziona l'area di gioco
const levels = [10, 9, 7];  //contine il numero di elementi per riga in base al livello
let elementsPerRow; //numero di elementi per riga
const BOMBS_NUMBER = 16;  //numero di bombe totali
let bombs = [];   //array contente gli id delle celle corrispondenti alle bombe
let score = 0;    //punteggio

//attende il clik del botone per avviare la funzione play
document.getElementById('play').addEventListener('click', play);

/**
 * Funzione principale che gestisce il gioco
 */
function play(){
  elementsPerRow = levels[parseInt(document.getElementById('level').value)];
  
  reset();

  generatePlayGround();

  bombs = generateBombs();
  
}

/**
 * Effettua un reset del campo di gioco, del punteggio e elimina il messaggio finale
 */
function reset () {
  mainGame.innerHTML ='';
  score=0;
  document.getElementById('end-message').innerText="";
  document.getElementById('end-message').classList.add('d-none');
}

/**
 * Genera il campo di gioco
 */
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

/**
 * Genera i quadrati sulla base dell'id
 * @param {*} id Intero (id del quadrato da creare)
 * @returns quadrato con id uguale al parametro
 */
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

/**
 * Genera una stringa con calc in css
 * @returns stringa con cal (100% / numero_di_elementi_per_riga)
 */
function generateCalcCss() {
  return `calc(100% / ${elementsPerRow})`;
}

/**
 * Gestisce l'evento click del quadrato; se non è una bomba calcola il punteggio e verifica la vittoria, altrimenti termina il gioco
 * @param {*} event 
 */
function clickSquare(event) {
  console.log(this.idElement);
  if(!bombs.includes(this.idElement)) {
    if(!this.classList.contains("clicked")){

      this.classList.add('clicked');
      score++;
      if(score === (Math.pow(elementsPerRow, 2) - BOMBS_NUMBER)){
        endGame(true);
      }
    }
  } else {
    endGame(false);
  }

}
/**
 * Genera gli id delle bombe sulla base dell'estrazione di numeri causali
 * @returns array con id delle bombe
 */
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

/**
 * Genera un numero casuale
 * @param {*} min intero (estremo minimo compreso)
 * @param {*} max intero (estremo massimo compreso)
 * @returns numero casuali compreso tra i due estremi
 */
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

/**
 * Effettua tutte le operazioni in base all'esito finale del gioco; se l'utente ha vinto 
 * stampa il messaggio di vittoria, in caso contrario stampa il messaggio di sconfitta, 
 * il punteggio ottenuto, mostra tutte le bombe e impedisce ulteriori clik
 * @param {*} won booleano (valore su cui si basa l'esito, true in caso di vittoria, false in caso di sconfitta)
 */
function endGame(won) {
  const endMessage = document.getElementById('end-message');
  endMessage.classList.remove('d-none');
  if(won) {
    endMessage.innerText = "Hai vinto";
  } else {
    endMessage.innerText = `Hai perso - Punteggio: ${score}`;
    showBombs();
    noClick();
  }
}

/**
 * Mostra tutte le bombe
 */
function showBombs() {
  const squares = document.getElementsByClassName('square');
  for(let i=0; i < Math.pow(elementsPerRow, 2); i++) {
    if(bombs.includes(squares[i].idElement)) {
      squares[i].classList.add('clicked-bomb');
    }
  }
}

/**
 * Genera un div che copre il campo di gioco impedendo ulteriori click sui quadrati
 */
function noClick() {
  const end = document.createElement('div');
  end.className = 'end-no-click';
  document.querySelector(".main-game").append(end);
}