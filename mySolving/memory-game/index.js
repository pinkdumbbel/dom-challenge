function Memory(el) {
  this.$memory = document.getElementById(el);
  this.$score = document.querySelectorAll('h2');
  this.$button = document.querySelector('button');

  this.score = 0;
  this.highScore = 0;
  this.currentClickedOrder = 0;
  this.clickedVal = 0;
  this.memoryBackground = 'e1e1e1';

  this.randomVals = [];
  this.clicedkVals = [];

  this.createEl();
  this.eventsBind();
}

Memory.prototype.createEl = function () {
  for (let i = 0; i < 5; i++) {
    const el = document.createElement('div');
    el.classList.add('memory-block');
    el.dataset.cell = i;
    this.$memory.append(el);
  }
};

Memory.prototype.getRandomVal = function () {
  return Math.floor(Math.random() * 5);
};

Memory.prototype.getSelectedMemory = function (random) {
  return document.querySelector(`[data-cell='${random}']`);
};

Memory.prototype.compareValues = function () {
  const randomVal = JSON.stringify(this.randomVals);
  const clickedVal = JSON.stringify(this.clicedkVals);

  return randomVal === clickedVal;
};

Memory.prototype.variableInitialization = function () {
  this.currentClickedOrder = 0;
  this.randomVals = [];
  this.clicedkVals = [];
};

Memory.prototype.checkMemoryAndSetBgColor = function (elem) {
  const score = this.score + 1;
  const idx = this.currentClickedOrder;
  let flag = false;

  if (
    score === this.randomVals.length &&
    this.randomVals[idx] === this.clicedkVals[idx]
  ) {
    this.currentClickedOrder++;
    elem.style.background = 'blue';
    flag = true;
  } else {
    elem.style.background = 'red';
    this.$memory.classList.add('shake');

    this.score = 0;
    this.variableInitialization();

    const [$score] = this.$score;
    $score.textContent = `Score: ${this.score}`;

    flag = false;
  }

  setTimeout(() => {
    elem.style.background = '';
  }, 500);

  return flag;
};

Memory.prototype.onClickStart = function (e) {
  e.target.disabled = true;
  this.setRandomMemory();
};

Memory.prototype.setRandomMemory = function () {
  for (let i = 0; i <= this.score; i++) {
    setTimeout(() => {
      const randomVal = this.getRandomVal();
      const selectedMemory = this.getSelectedMemory(randomVal);
      this.randomVals.push(randomVal);

      selectedMemory.style.background = 'blue';

      setTimeout(() => {
        selectedMemory.style.background = '';
      }, 500);
    }, 1000 * (i + 1));
  }
};

Memory.prototype.onClickMemory = function (e) {
  const targetMemory = e.target;
  const clickedMemory = Number(targetMemory.dataset.cell);

  this.clicedkVals.push(clickedMemory);

  if (
    this.clicedkVals.length === this.randomVals.length &&
    this.compareValues()
  ) {
    this.score++;
    this.highScore++;

    const [$score, $highScore] = this.$score;
    $score.textContent = `Score: ${this.score}`;
    $highScore.textContent = `High Score: ${this.highScore}`;

    this.setRandomMemory();
    this.variableInitialization();
  }
};

Memory.prototype.eventsBind = function () {
  this.$button.addEventListener('click', this.onClickStart.bind(this));
  this.$memory.addEventListener('click', this.onClickMemory.bind(this));
};

new Memory('memory');
