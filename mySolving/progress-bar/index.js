function Progress(el) {
  this.$progress = document.getElementById(el);
  this.$button = document.querySelector('button');
  this.queue = [];
  this.className = 'progress-on';
  this.clickCnt = 0;
  this.animationProgressState = false;
  this.eventBind();
  this.animationQueueControl();
}

Progress.prototype.onClick = function () {
  this.clickCnt++;
  if (this.clickCnt > 5) return;

  this.$button.textContent = `Run ${this.clickCnt}`;
  const $progressOn = document.createElement('div');
  $progressOn.classList.add(this.className);
  this.queue.push($progressOn);
};

Progress.prototype.animationQueueControl = function () {
  if (this.queue.length > 0 && !this.animationProgressState) {
    const elem = this.queue.shift();
    this.$progress.append(elem);

    elem.onanimationstart = function () {
      this.animationProgressState = true;
    }.bind(this);

    elem.onanimationend = function () {
      this.animationProgressState = false;
      elem.remove();
      this.clickCnt--;
      this.$button.textContent =
        this.clickCnt > 0 ? `Run ${this.clickCnt}` : 'Run';
    }.bind(this);
  }

  window.requestAnimationFrame(this.animationQueueControl.bind(this));
};

Progress.prototype.eventBind = function () {
  this.$button.addEventListener('click', this.onClick.bind(this));
};

new Progress('progress');
