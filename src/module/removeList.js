export const removeToDo = (toDo) => {
  document.querySelector('.listToDo').removeChild(toDo);
  const localData = JSON.parse(localStorage.getItem('list'));
  const data = Array.from(localData).filter((i) => i.completed === false);
  data.forEach((el, index) => {
    el.index = index + 1;
  });
  localStorage.setItem('list', JSON.stringify(data));
};
export const clearAll = () => {
  const localData = JSON.parse(localStorage.getItem('list'));
  const toDoContainer = document.querySelectorAll('.toDoContainer');
  toDoContainer.forEach((i) => {
    if (i.classList.contains('checkedContainer')) {
      removeToDo(i);
    }
  });
  const data = Array.from(localData).filter((i) => i.completed === false);
  data.forEach((el, index) => {
    el.index = index + 1;
  });
  localStorage.setItem('list', JSON.stringify(data));
};
export const editToDo = (toDoContainer, toDo) => {
  const editInput = document.createElement('input');
  editInput.type = 'text';
  editInput.className = 'editInput';
  editInput.value = toDo.textContent;
  toDoContainer.replaceChild(editInput, toDo);
  editInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const toDoContainers = document.querySelectorAll('.toDoContainer');
      const localData = JSON.parse(localStorage.getItem('list'));
      for (let i = 0; i < toDoContainers.length; i += 1) {
        if (toDoContainers[i].classList.contains('checkedContainer')) {
          localData[i].description = editInput.value;
          localStorage.setItem('list', JSON.stringify(localData));
        }
      }
      editInput.parentElement.classList.remove('checkedContainer');
      toDoContainer.replaceChild(toDo, editInput);
      toDo.textContent = editInput.value;
    }
  });
  const removeIcons = document.querySelectorAll('.fa-trash');
  removeIcons.forEach((i) => {
    i.addEventListener('click', () => {
      removeToDo(i.parentElement);
    });
  });
};