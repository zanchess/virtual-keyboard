import {
  dataKeyLetters, notSymbol, dataKeyNumbers, dataKeyFunc,
} from './data.js';

let currentLanguage = 'ru';
let flag = false;
let flagShift = false;
let flagCaps = true;

/* Get root block  and create dom nodes */
const mainPage = document.querySelector('body');
const container = document.createElement('div');
const keyboard = document.createElement('div');
const textarea = document.createElement('textarea');
const taskName = document.createElement('h1');
const description = document.createElement('h4');

/* add main blocks in dom */
keyboard.classList.add('keyboard');
description.classList.add('descr');
taskName.innerHTML = 'Virtual Keyboard';
description.innerHTML = ' OS: Windows. Change language: CTRL + Alt <br> Write symbol: SHIFT + key. Upper Case: CapsLock';
mainPage.appendChild(taskName);
mainPage.appendChild(container);
container.appendChild(textarea);
container.appendChild(keyboard);
container.appendChild(description);
/* textarea.setAttribute('readonly', 'disabled'); */

/* parse data keyboard */
const setCashLanguage = () => {
  const cashLanguage = localStorage.getItem('lang');
  if (!cashLanguage || cashLanguage === 'ru') {
    currentLanguage = 'ru';
  } else if (cashLanguage === 'eng') {
    currentLanguage = 'eng';
  }
};

/* create keys for keyboard */
const createKeys = (element) => {
  const key = document.createElement('div');
  if (currentLanguage === 'ru') {
    key.innerHTML = element.RU.toLocaleLowerCase();
  } else if (currentLanguage === 'eng') {
    key.innerHTML = element.EN.toLocaleLowerCase();
  }
  key.classList.add(element.key);
  key.setAttribute('data-code', element.code);
  keyboard.appendChild(key);
};

/* Func which create russian keyboard DOM */
const createKeyboardBlocks = () => {
  dataKeyLetters.forEach((elem) => {
    createKeys(elem);
  });
  dataKeyNumbers.forEach((elem) => {
    createKeys(elem);
  });
  dataKeyFunc.forEach((elem) => {
    createKeys(elem);
  });
  localStorage.setItem('currentLanguage', 'ru');
};

/* Get keyboard with language which we need */
setCashLanguage();
createKeyboardBlocks();