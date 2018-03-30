(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

let fetchImage = (() => {
  var _ref = _asyncToGenerator(function* (url) {
    const resp = yield fetch(url);
    const blob = yield resp.blob();
    return createImageBitmap(blob);
  });

  return function fetchImage(_x) {
    return _ref.apply(this, arguments);
  };
})();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function getRandomImage() {
  return fetchImage('https://source.unsplash.com/random');
}

function draw(img, alpha = 1) {
  const gal = document.getElementById('gallery');
  const ctx = gal.getContext('2d');
  ctx.globalAlpha = alpha;
  ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, gal.width, gal.height);
}

function fade(image) {
  return new Promise(resolve => {
    function fadeIn(alpha) {
      draw(image, alpha);
      if (alpha >= .99) {
        resolve();
      } else {
        alpha += (1 - alpha) / 24;
        window.requestAnimationFrame(() => fadeIn(alpha));
      }
    }
    fadeIn(0.1);
  });
}

function wait(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

const pause = () => wait(1500);

function repeat(fn) {
  return new Promise((resolve, reject) => {
    const go = () => fn().then(() => {
      setTimeout(go, 0);
    }, reject);
    go();
  });
}

function nextImage() {
  return getRandomImage().then(fade).then(pause);
}

function start() {
  return repeat(nextImage).catch(start);
}

start();

},{}]},{},[1]);
