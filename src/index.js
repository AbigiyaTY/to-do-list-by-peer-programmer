import './style.css';
import { getFromLocal } from './module/localStorage.js';
import { clearAll } from './module/removeList.js';
import addTodo from './module/addList.js';

const textInput = document.querySelector('input');
textInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && textInput.value) {
    addTodo(textInput.value);
    textInput.value = null;
  }
});

window.addEventListener('load', getFromLocal);

const clearAllbtn = document.querySelector('button');
clearAllbtn.addEventListener('click', clearAll);