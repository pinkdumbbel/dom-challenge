function Star(el, count, callback) {
  this.$star = document.querySelector(el);
  this.count = count;
  this.callback = callback;
  this.clicked = 0;
  this.createEl();
  this.eventBind();
}

Star.prototype.createEl = function () {
  for (let i = 1; i <= this.count; i++) {
    const $i = document.createElement('i');
    $i.className = 'fa fa-star-o';
    $i.dataset.index = i;
    $i.style.cursor = 'pointer';
    this.$star.appendChild($i);
  }
};

Star.prototype.fill = function (ratingVal) {
  for (let i = 0; i < this.count; i++) {
    const child = this.$star.children[i];
    if (i < ratingVal && child.classList.contains('fa-star-o'))
      child.classList.replace('fa-star-o', 'fa-star');

    if (i >= ratingVal && child.classList.contains('fa-star'))
      child.classList.replace('fa-star', 'fa-star-o');
  }
};

Star.prototype.onMouseOver = function (e) {
  const ratingVal = e.target.dataset.index;
  if (!ratingVal) return;
  this.fill(ratingVal);
};

Star.prototype.onMouseLeave = function () {
  this.fill(this.clicked);
};

Star.prototype.onClick = function (e) {
  this.clicked = e.target.dataset.index;
  this.callback(this.clicked);
};

Star.prototype.eventBind = function () {
  this.$star.addEventListener('mouseover', this.onMouseOver.bind(this));
  this.$star.addEventListener('mouseleave', this.onMouseLeave.bind(this));
  this.$star.addEventListener('click', this.onClick.bind(this));
};

function getStar(value) {
  document.getElementById('display-star').innerHTML = value;
}
new Star('#star', 5, getStar);
