function PixelArt(el, rows, cols) {
  this.$grid = document.querySelector(el);
  this.posArr = [];
  this.rows = rows;
  this.cols = cols;
  this.createEl();
  this.eventBind();
  // write logic to create pixel art grid.
}

PixelArt.prototype.createEl = function () {
  for (let col = 0; col < this.cols; col++) {
    const colDiv = document.createElement('div');
    colDiv.style.display = 'flex';
    colDiv.style.justifyContent = 'center';
    for (let row = 0; row < this.rows; row++) {
      const rowDiv = document.createElement('div');
      rowDiv.style.width = '50px';
      rowDiv.style.height = '50px';
      rowDiv.style.border = '1px solid black';
      rowDiv.style.cursor = 'pointer';
      rowDiv.dataset.position = `${col}-${row}`;

      this.posArr.push([col, row]);
      colDiv.appendChild(rowDiv);
    }

    this.$grid.appendChild(colDiv);
    this.$grid.style.margin = '0 auto';
    this.$grid.style.width = `${50 * 10}px`;
    this.$grid.ondragstart = function () {
      return false;
    };
  }
};

PixelArt.prototype.getSelectedEl = function (currentPos) {
  const currentPosSplit = currentPos.split('-');
  return this.posArr
    .filter((p) => {
      return (
        p[0].toString() === currentPosSplit[0] &&
        p[1].toString() === currentPosSplit[1]
      );
    })
    .map((p) => {
      return this.$grid.children[p[0]].children[p[1]];
    })[0];
};

PixelArt.prototype.setBgColor = function (currentPos, eventType) {
  const selectedEl = this.getSelectedEl(currentPos);

  if (eventType === 'click') {
    if (selectedEl.style.backgroundColor) selectedEl.style.backgroundColor = '';
    else selectedEl.style.backgroundColor = 'blue';
  }

  if (eventType === 'mousemove') selectedEl.style.backgroundColor = 'black';
};

PixelArt.prototype.onClick = function (e) {
  const currentPos = e.target.dataset.position;
  if (!currentPos) return;
  this.setBgColor(currentPos, 'click');
  this.$grid.removeEventListener('mousemove', this.onMouseMove);
};

PixelArt.prototype.onMouseDown = function () {
  const onMouseMoveBind = onMouseMove.bind(this);

  function onMouseMove(e) {
    this.setBgColor(e.target.dataset.position, 'mousemove');
  }

  function onMouseUp() {
    this.$grid.removeEventListener('mousemove', onMouseMoveBind);
  }

  this.$grid.addEventListener('mousemove', onMouseMoveBind);
  this.$grid.addEventListener('mouseup', onMouseUp.bind(this));
};

PixelArt.prototype.eventBind = function () {
  this.$grid.addEventListener('click', this.onClick.bind(this));
  this.$grid.addEventListener('mousedown', this.onMouseDown.bind(this));
};

new PixelArt('#grid', 10, 10);
