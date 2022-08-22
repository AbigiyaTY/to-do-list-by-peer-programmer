import { updateLocal, myArray } from './localStorage.js';
import MyObject from './constractors.js';
import { editToDo } from './removeList.js';

const addTodo = (toDoValue) => {
  const toDoContainer = document.createElement('div');
  toDoContainer.className = 'toDoContainer';
  toDoContainer.innerHTML += `
<input type="checkbox" class="checkbox"/>
<span>${toDoValue}</span>
<i class="fa fa-ellipsis-v"></i>
<i class="fa fa-trash"></i>
`;
  document.querySelector('.listToDo').appendChild(toDoContainer);
  const checkBox = document.querySelectorAll('.checkbox');
  checkBox.forEach((i) => {
    i.addEventListener('click', () => {
      i.parentElement.classList.toggle('checkedContainer');
      i.nextElementSibling.classList.toggle('checkToDo');
      i.parentElement.lastElementChild.classList.toggle('trashActive');
      i.parentElement.lastElementChild.previousElementSibling.classList.toggle('editDisable');
      updateLocal();
    });
  });
  const object = new MyObject(toDoValue, false, checkBox.length);
  myArray.push(object);
  localStorage.setItem('list', JSON.stringify(myArray));
  const editIcons = document.querySelectorAll('.fa-ellipsis-v');
  editIcons.forEach((i) => {
    i.addEventListener('click', () => {
      editToDo(toDoContainer, i.previousElementSibling);
    });
  });
};

export default addTodo;