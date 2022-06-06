function Board(el, cols, rows) {
  this.$board = document.getElementById(el);
  this.cols = cols;
  this.rows = rows;

  this.activeCell = [];

  this.createEl();
  this.eventBind();
}

Board.prototype.createEl = function () {
  this.$board.style.width = '640px';
  this.$board.style.height = '640px';
  this.$board.style.border = '7px solid black';
  this.$board.style.borderRadius = '10px';
  this.$board.style.margin = '0 auto';
  this.$board.style.padding = '1px';
  for (let i = 0; i < this.cols; i++) {
    const colDiv = document.createElement('div');
    colDiv.style.display = 'flex';
    for (let j = 0; j < this.rows; j++) {
      const rowDiv = document.createElement('div');

      rowDiv.style.width = '80px';
      rowDiv.style.height = '80px';
      if ((i + j) % 2 == 1) rowDiv.style.backgroundColor = 'black';
      rowDiv.style.cursor = 'pointer';
      rowDiv.dataset.position = `${i}-${j}`;

      colDiv.appendChild(rowDiv);
    }

    this.$board.appendChild(colDiv);
  }
};

Board.prototype.setBgColor = function (col, row, originCellColor) {
  let leftCol = col;
  let leftRow = row;

  let rightCol = col;
  let rightRow = row;

  const cellColor = originCellColor === 'black' ? 'blue' : 'red';

  while (leftCol > 0 && leftRow > 0) {
    leftCol--;
    leftRow--;

    this.$board.children[leftCol].children[leftRow].style.backgroundColor =
      cellColor;

    this.activeCell.push([leftCol, leftRow, originCellColor]);
  }

  while (rightCol < 7 && rightRow < 7) {
    rightCol++;
    rightRow++;
    this.$board.children[rightCol].children[rightRow].style.backgroundColor =
      cellColor;

    this.activeCell.push([rightCol, rightRow, originCellColor]);
  }

  leftCol = col;
  leftRow = row;

  rightCol = col;
  rightRow = row;

  while (leftCol < 7 && leftRow > 0) {
    leftCol++;
    leftRow--;

    this.$board.children[leftCol].children[leftRow].style.backgroundColor =
      cellColor;

    this.activeCell.push([leftCol, leftRow, originCellColor]);
  }

  while (rightCol > 0 && rightRow < 7) {
    rightCol--;
    rightRow++;

    this.$board.children[rightCol].children[rightRow].style.backgroundColor =
      cellColor;

    this.activeCell.push([rightCol, rightRow, originCellColor]);
  }
};

Board.prototype.onClick = function (e) {
  const currentPos = e.target.dataset.position;

  const [col, row] = currentPos.split('-');

  this.activeCell.length > 0 && this.clearCell();
  //블랙 row 선택시
  if ((Number(col) + Number(row)) % 2 == 1) {
    this.$board.children[col].children[row].style.backgroundColor = 'blue';
    this.activeCell.push([col, row, 'black']);
    this.setBgColor(col, row, 'black');
  } else {
    this.$board.children[col].children[row].style.backgroundColor = 'red';
    this.activeCell.push([col, row, 'white']);
    this.setBgColor(col, row, 'white');
  }
};

Board.prototype.clearCell = function () {
  this.activeCell.forEach(([col, row, color]) => {
    this.$board.children[col].children[row].style.backgroundColor = color;
  });
};

Board.prototype.eventBind = function () {
  this.$board.addEventListener('click', this.onClick.bind(this));
};

new Board('board', 8, 8);
