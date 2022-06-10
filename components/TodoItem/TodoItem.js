import { render } from '/libs/react-redux/index.js';
import {REMOVE, TOGGLE, EDIT_BEGIN, EDIT_END, EDIT_CANCEL} from '/constants/actions.js';
function TodoItem({todo, index, editIndex}) {
  return render`
  <li class="${todo.completed && 'completed'} ${index === editIndex && 'editing'}">
    <div class="view">
        <input 
            class="toggle" 
            type="checkbox" 
            ${todo.completed && 'checked'}
            onChange="dispatch('${TOGGLE}', ${index})"

            >
        <label 
             ondblclick="dispatch('${EDIT_BEGIN}', ${index})"
        >${todo.title}</label>
        <button class="destroy"
            onclick="dispatch('${REMOVE}', ${index})"
        ></button>
    </div>
  <input class="edit" value=${todo.title}
    onkeyup="
    event.keyCode === 27 && dispatch('${EDIT_CANCEL}', ${index}) || event.keyCode === 13 && dispatch('${EDIT_END}', ${index}, this.value.trim())   
    "
    onblur="dispatch('${EDIT_END}', ${index}, this.value.trim())"
    >
  </li>
  `;
}

export default TodoItem;
