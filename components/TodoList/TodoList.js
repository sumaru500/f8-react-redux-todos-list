import { render } from "/libs/react-redux/index.js";
import TodoItem from "/components/TodoItem/TodoItem.js";
import {connect} from "/store.js";
import * as actionNames from "/constants/actions.js";
import * as filterNames from "/constants/filters.js";
function TodoList({todos, editIndex, filter, filters}) {
    return render`
    <input id="toggle-all" class="toggle-all" type="checkbox"
        ${todos.filter(filters[filterNames.ACTIVE]).length === 0 && 'checked'}
        onclick="dispatch('${actionNames.TOGGLE_ALL}', this.checked)"
    >
    <label for="toggle-all">Mark all as complete</label>
    <ul class="todo-list">
        <!-- These are here just to show the structure of the list items -->
        <!-- List items should get the class "editing" when editing and "completed" when marked as completed -->
        ${todos.filter(filters[filter]).map((todo, index) => TodoItem({todo, index, editIndex}))}
    </ul>
    `;
}

const stateToProps = state => ({
        todos: state.todos,
        filter: state.filter,
        filters: state.filters,
        editIndex: state.editIndex,
    });
export default connect(stateToProps)(TodoList);