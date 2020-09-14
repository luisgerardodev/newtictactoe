//DOM Elements
const table = document.querySelector('table');
const boxes = document.querySelectorAll('td');
let gameOverLabel = document.querySelector('#gameover');

//Board
const board = {
  rows: {
    r1: [boxes[0],boxes[1],boxes[2]],
    r2: [boxes[3],boxes[4],boxes[5]],
    r3: [boxes[6],boxes[7],boxes[8]],
  },
  columns: {
    c1: [boxes[0],boxes[3],boxes[6]],
    c2: [boxes[1],boxes[4],boxes[7]],
    c3: [boxes[2],boxes[5],boxes[8]],
  },
  diagonals: {
    d1: [boxes[0],boxes[4],boxes[8]],
    d2: [boxes[2],boxes[4],boxes[6]],
  }
}

//Game Variables
let winner = '';
let turnX = true;
let isGameOver = false;


//Game Functions
const isSelected = (box) => {
  return box.classList.contains('selected');
}

const checkWin = ({rows, columns, diagonals}) => {
  const rowsArr = [...Object.values(rows)];
  const columnsArr = [...Object.values(columns)];
  const diagonalsArr = [...Object.values(diagonals)];

  rowsArr.map(row => {
    if (row.every(b => b.innerHTML !== '' && b.innerHTML == row[0].innerHTML)) {
      row.map(b => b.style.backgroundColor = '#fddb3a')
      isGameOver = true;
    }
  });

  columnsArr.map(column => {
    if (column.every(b => b.innerHTML !== '' && b.innerHTML == column[0].innerHTML)) {
      column.map(b => b.style.backgroundColor = '#fddb3a')
      isGameOver = true;
    }
  });

  diagonalsArr.map (diagonal => {
    if (diagonal.every(b => b.innerHTML !== '' && b.innerHTML == diagonal[0].innerHTML)) {
      diagonal.map(b => b.style.backgroundColor = '#fddb3a')
      isGameOver = true;
    }
  });
}

const checkTie = () => {
  const boxesArr = [...boxes];
  return boxesArr.every(box => isSelected(box));
}

const checkBoard = () => {
  checkWin(board)
  if (isGameOver) {
    winner = turnX ? 'X' : 'O';
    gameOverLabel.innerHTML = `${winner} WON!`;
  } else if (checkTie()) {
    isGameOver = true;
    gameOverLabel.innerHTML = 'TIE!';
  }
}


//Hover Handler
table.addEventListener('mouseover', (e) => {
  const box = e.target;

  if (!isGameOver && box.tagName == 'TD' && !isSelected(box)) {
    box.style.backgroundColor = '#52575d';
  }
})
table.addEventListener('mouseout', (e) => {
  const box = e.target;

  if (!isGameOver && box.tagName == 'TD' && !isSelected(box)) {
    box.style.backgroundColor = '';
  }
})

//Click Handler
table.addEventListener('click', (e) => {
  const box = e.target;

  if (!isGameOver && box.tagName == 'TD' && box.innerHTML == '') {
    if (turnX) {
      box.innerHTML = '<img src="icons/cross-white.png">';
      box.classList.add('selected');
      // box.style.backgroundColor = '#fdcb9e';
      checkBoard();
      if (!isGameOver) {
        turnX = false;
      }
    } else {
      box.innerHTML = '<img src="icons/circle.png">'
      box.classList.add('selected');
      // box.style.backgroundColor = '#40bad5';
      checkBoard();
      if (!isGameOver) {
        turnX = true;
      }
    } 
  }
})