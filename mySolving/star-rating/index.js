function Star(el, count, callback) {
  // Write a logic to create star rating problem
}

function getStar(value) {
  document.getElementById('display-star').innerHTML = value;
}
new Star('#star', 5, getStar);
