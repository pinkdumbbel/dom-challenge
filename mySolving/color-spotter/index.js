function Spotter(el, col, row) {
  this.$spotter = document.querySelector(el);
  this.$score = document.querySelector('h1');
  this.cloneSpotter = null;
  this.el = el;
  this.col = col;
  this.row = row;

  this.score = 0;

  this.rowLength = 100;

  this.createEl();
  this.eventsBind();
}

Spotter.prototype.createEl = function () {
  const col = this.col + this.score;
  const row = this.row + this.score;
  const { color, oddColor } = this.getRandomColors();
  const random = Math.floor(Math.random() * col * row);
  let cellCnt = 0;
  let cellColor;

  //this.$score.innerText = `Score:${this.score}`;
  this.$score.innerText = `Score:${this.score}`;
  for (let i = 0; i < col; i++) {
    const colEl = document.createElement('div');
    colEl.style.display = 'flex';

    for (let j = 0; j < row; j++) {
      const rowEl = document.createElement('div');
      cellColor = color;
      rowEl.style.width = `${this.rowLength}px`;
      rowEl.style.height = `${this.rowLength}px`;
      if (cellCnt === random) {
        cellColor = oddColor;
        rowEl.dataset.answer = 'answer';
      }

      rowEl.style.backgroundColor = cellColor;

      rowEl.classList.add('row');

      colEl.appendChild(rowEl);

      cellCnt++;
    }
    this.$spotter.appendChild(colEl);
    this.$spotter.classList.add('shake');

    setTimeout(() => {
      if (this.$spotter.classList.contains('shake'))
        this.$spotter.classList.remove('shake');
    }, 800);
  }
};

Spotter.prototype.onClick = function (e) {
  if (this.score === 9) {
    alert('perfect!');
    return;
  }

  const answer = e.target.dataset.answer;

  if (answer) {
    this.score++;
    this.rowLength -= 5;
    this.clearChild();
    this.createEl();
  } else {
    this.score = 0;
    this.rowLength = 100;
    this.clearChild();
    this.createEl();
  }
};

Spotter.prototype.clearChild = function () {
  while (this.$spotter.hasChildNodes()) {
    this.$spotter.removeChild(this.$spotter.firstChild);
  }
};

Spotter.prototype.eventsBind = function () {
  this.$spotter.addEventListener('click', this.onClick.bind(this));
};

Spotter.prototype.getRandomColors = function () {
  const ratio = 0.618033988749895;

  const hue = (Math.random() + ratio) % 1;
  const saturation = Math.round(Math.random() * 100) % 85;
  const lightness = Math.round(Math.random() * 100) % 85;

  const color =
    'hsl(' + Math.round(360 * hue) + ',' + saturation + '%,' + lightness + '%)';
  const oddColor =
    'hsl(' +
    Math.round(360 * hue) +
    ',' +
    saturation +
    '%,' +
    (lightness + 5) +
    '%)';

  return {
    color,
    oddColor,
  };
};

new Spotter('#spotter', 4, 4);
