/// <reference path="../TSDef/p5.global-mode.d.ts" />

"use strict";

let matrix = [];

function setup() {
  createCanvas(650, 650, P2D);
  stroke(0, 255, 0);
  textSize(20);
  fillMatrix();
}

function draw() {
  background(0, 60)
  matrix.forEach((stream) => { stream.animate() });
}

class Stream {
  constructor(_x, _y, _length, _speed) {
    this.x = _x;
    this.y = _y;
    this.length = _length;
    this.speed = _speed;
    this.stream = this.generateStream();
  }
  generateStream() {
    let stream = [];
    for (let i = 0; i < this.length; i++) stream.push(String.fromCharCode(0x30A0 + round(random(97))));
    return stream;
  }
  animate() {
    this.y += this.speed;
    for (let i = 0; i < this.stream.length; i++) {
      if (round(random(50)) === 1) this.stream[i] = String.fromCharCode(0x30A0 + round(random(97)))
      if (round(random(100)) === 1) this.speed = random(0.5, 3);
      if (this.y > 650 + 200) this.y = -10;
      i === 0 ? fill(200, 255, 200) : fill(0, 255, 0, 255 - floor(255 / this.stream.length) * i);
      i === 0 ? stroke(50, 255, 50) : stroke(0, 255, 0, 255 - floor(255 / this.stream.length) * i);
      text(this.stream[i], this.x, this.y + i * -20);
    }
  }
}

function fillMatrix() {
  for (let i = 0; i * 20 < 650; i++) {
    matrix.push(new Stream(i * 20, floor(random(-300, 800)), floor(random(5, 10)), floor(random(0.5, 5))));
    matrix.push(new Stream(i * 20, floor(random(-300, 800)), floor(random(5, 15)), floor(random(0.5, 5))));
  }
}