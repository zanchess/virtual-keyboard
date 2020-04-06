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

/* Get current keyboard  */
let keys = keyboard.querySelectorAll('div');

/* Change on English Keyboard func */
const changeLanguage = () => {
  const letters = keyboard.querySelectorAll('div');
  if (currentLanguage === 'ru') {
    currentLanguage = 'eng';
    letters.forEach((elem) => {
      const datacode = elem.getAttribute('data-code');
      dataKeyLetters.forEach((cell) => {
        if (cell.code === datacode) {
          elem.innerHTML = cell.EN.toLowerCase();
        }
      });
    });
  } else if (currentLanguage === 'eng') {
    currentLanguage = 'ru';
    letters.forEach((elem) => {
      const datacode = elem.getAttribute('data-code');
      dataKeyLetters.forEach((cell) => {
        if (cell.code === datacode) {
          elem.innerHTML = cell.RU.toLowerCase();
        }
      });
    });
  }
  keys = keyboard.querySelectorAll('div');
  localStorage.setItem('lang', currentLanguage);
};

/* Change on numbers keyboard */
const changeNumbers = () => {
  const letters = keyboard.querySelectorAll('div');
  letters.forEach((elem) => {
    const datacode = elem.getAttribute('data-code');
    dataKeyNumbers.forEach((cell) => {
      if (cell.code === datacode) {
        elem.innerHTML = cell.RU;
      }
    });
  });
};

/* Change on symbols keyboard */
const changeSymbols = () => {
  flag = true;
  const letters = keyboard.querySelectorAll('div');
  letters.forEach((elem) => {
    const datacode = elem.getAttribute('data-code');
    dataKeyNumbers.forEach((cell) => {
      if (cell.code === datacode) {
        elem.innerHTML = cell.symbol;
      }
    });
  });
};

/* key down CapsLock key */
const changeCaps = () => {
  const letters = keyboard.querySelectorAll('div');
  letters.forEach((elem) => {
    const datacode = elem.getAttribute('data-code');
    if (!notSymbol.includes(datacode)) {
      elem.classList.toggle('caps-lock');
    }
  });
  keys = keyboard.querySelectorAll('div');
  flagCaps = false;
};

/* MOUSE */
/* handler functions for mouse events */
const mouseDown = (e) => {
  const dataCode = e.target.getAttribute('data-code');
  e.target.classList.add('click');
  const textArray = textarea.value.split('');
  const positionOfEntry = textarea.selectionStart;

  if (!e.target.classList.contains('keyboard') && (!notSymbol.includes(dataCode)) && e.target.classList.contains('caps-lock')) {
    textArray.splice(positionOfEntry, 0, e.target.innerHTML.toUpperCase());
    textarea.value = textArray.join('');
    textarea.setSelectionRange(positionOfEntry + 1, positionOfEntry + 1);
  }
  if (!e.target.classList.contains('keyboard') && (!notSymbol.includes(dataCode)) && !e.target.classList.contains('caps-lock')) {
    textArray.splice(positionOfEntry, 0, e.target.innerHTML.toLowerCase());
    textarea.value = textArray.join('');
    textarea.setSelectionRange(positionOfEntry + 1, positionOfEntry + 1);
  }
  if (dataCode === 'Tab') {
    textArray.splice(positionOfEntry, 0, '    ');
    textarea.value = textArray.join('');
    textarea.setSelectionRange(positionOfEntry + 4, positionOfEntry + 4);
  }
  if (dataCode === 'Enter') {
    textArray.splice(positionOfEntry, 0, '\n');
    textarea.value = textArray.join('');
    textarea.setSelectionRange(positionOfEntry + 1, positionOfEntry + 1);
  }
  if (dataCode === 'Backspace') {
    const str = textarea.value;
    textarea.value = str.substring(0, str.length - 1);
  }
  if (dataCode === 'CapsLock') {
    changeCaps();
  }
  if (dataCode === 'Delete') {
    textArray.splice(positionOfEntry, 1);
    textarea.value = textArray.join('');
    textarea.setSelectionRange(positionOfEntry, positionOfEntry);
  }
  textarea.focus();
  textarea.addEventListener('blur', () => {
    textarea.focus();
  });
};

/* mouse up handler */
const endClick = (e) => {
  if (!e.target.classList.contains('keyboard')) {
    e.target.classList.remove('click');
  }
};