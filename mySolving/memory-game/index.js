function Memory(el) {
  this.$memory = document.getElementById(el);
  this.$score = document.querySelectorAll('h2');
  this.$button = document.querySelector('button');

  this.progressState = true;
  this.score = 0;
  this.highScore = 0;
  this.currentClickedOrder = 0;
  this.memoryBackground = 'e1e1e1';

  this.randomVals = [];
  this.clicedkVals = [];
  this.timerIds = [];

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
  return JSON.stringify(this.randomVals) === JSON.stringify(this.clicedkVals);
};

Memory.prototype.variableInitialization = function () {
  this.currentClickedOrder = 0;
  this.randomVals = [];
  this.clicedkVals = [];
};

Memory.prototype.gameInitialization = function () {
  this.variableInitialization();
  this.score = 0;
  this.$button.disabled = false;

  this.timerIds.forEach((timerId) => {
    clearTimeout(timerId);
  });

  setTimeout(() => {
    if (this.$memory.classList.contains('shake'))
      this.$memory.classList.remove('shake');
  }, 800);
};

Memory.prototype.checkMemoryAndSetBgColor = function (elem) {
  const idx = this.currentClickedOrder;
  let selectedFlag = false;

  if (
    this.score === this.randomVals.length - 1 &&
    this.randomVals[idx] === this.clicedkVals[idx]
  ) {
    this.currentClickedOrder++;
    elem.style.background = 'blue';
    selectedFlag = true;
  } else {
    elem.style.background = 'red';
    this.$memory.classList.add('shake');

    this.gameInitialization();

    const [$score] = this.$score;
    $score.textContent = `Score: ${this.score}`;

    selectedFlag = false;
  }

  setTimeout(() => {
    elem.style.background = '';
  }, 500);

  return selectedFlag;
};

Memory.prototype.setRandomMemory = function () {
  this.progressState = true;
  let timerCnt = 0;
  for (let i = 0; i <= this.score; i++) {
    const randomVal = this.getRandomVal();
    const selectedMemory = this.getSelectedMemory(randomVal);
    this.randomVals.push(randomVal);
    const timerId = setTimeout(() => {
      selectedMemory.style.background = 'blue';
      setTimeout(() => {
        selectedMemory.style.background = '';
        if (this.score === timerCnt) this.progressState = false;
        timerCnt++;
      }, 500);
    }, 1000 * (i + 1));

    this.timerIds.push(timerId);
  }
};

Memory.prototype.onClickStart = function (e) {
  e.target.disabled = true;
  this.setRandomMemory();
};

Memory.prototype.onClickMemory = function (e) {
  if (!this.$button.disabled || this.progressState) return;

  const targetMemory = e.target;
  const clickedMemory = Number(targetMemory.dataset.cell);

  this.clicedkVals.push(clickedMemory);

  const selectedFlag = this.checkMemoryAndSetBgColor(targetMemory);

  if (
    this.clicedkVals.length === this.randomVals.length &&
    this.compareValues() &&
    selectedFlag
  ) {
    this.score++;
    this.score > this.highScore && this.highScore++;

    const [$score, $highScore] = this.$score;
    $score.textContent = `Score: ${this.score}`;
    $highScore.textContent = `High Score: ${this.highScore}`;

    this.variableInitialization();
    this.setRandomMemory();
  }
};

Memory.prototype.eventsBind = function () {
  this.$button.addEventListener('click', this.onClickStart.bind(this));
  this.$memory.addEventListener('click', this.onClickMemory.bind(this));
};
new Memory('memory');
