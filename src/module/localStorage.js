import { removeToDo, editToDo } from './removeList.js';

export const myArray = [];
export const updateLocal = () => {
  const localData = JSON.parse(localStorage.getItem('list'));
  const toDos = document.querySelectorAll('span');
  for (let i = 0; i < toDos.length; i += 1) {
    if (toDos[i].classList.contains('checkToDo')) {
      localData[i].completed = true;
    } else {
      localData[i].completed = false;
    }
  }
  localStorage.setItem('list', JSON.stringify(localData));
};
export const getFromLocal = (e) => {
  e.preventDefault();
  const data = JSON.parse(localStorage.getItem('list'));
  data.forEach((i) => {
    myArray.push(i);
    const toDoContainer = document.createElement('div');
    toDoContainer.className = 'toDoContainer';
    toDoContainer.innerHTML += `
        <input type="checkbox" class="checkbox">
        <span>${i.description}</span>
        <i class="fa fa-ellipsis-v"></i>
        <i class="fa fa-trash"></i>
        `;
    document.querySelector('.listToDo').appendChild(toDoContainer);
    const editIcons = document.querySelectorAll('.fa-ellipsis-v');
    editIcons.forEach((i) => {
      i.addEventListener('click', () => {
        editToDo(toDoContainer, i.previousElementSibling);
        i.parentElement.classList.add('checkedContainer');
      });
    });
  });
  const checkBox = document.querySelectorAll('.checkbox');
  checkBox.forEach((i) => {
    i.addEventListener('click', () => {
      i.parentElement.classList.toggle('checkedContainer');
      i.nextElementSibling.classList.toggle('checkToDo');
      i.parentElement.lastElementChild.classList.toggle('trashActive');
      i.parentElement.lastElementChild.previousElementSibling.classList.toggle(
        'editDisable',
      );
      updateLocal();
    });
  });
  const removeIcons = document.querySelectorAll('.fa-trash');
  removeIcons.forEach((i) => {
    i.addEventListener('click', () => {
      removeToDo(i.parentElement);
    });
  });
  localStorage.setItem('list', JSON.stringify(myArray));
};