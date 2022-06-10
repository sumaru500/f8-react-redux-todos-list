import createStorage from "./libs/storage/index.js";
import * as actionNames from "./constants/actions.js";
import * as filterNames from "./constants/filters.js";

const storage = createStorage('TODOS_KEY');
const initialState = {
    todos: storage.get('todos') || [],
    editIndex: null,
    filter: filterNames.ALL,
    filters: {
        [filterNames.ALL]: (todo) => {
            return true;
        },
        [filterNames.ACTIVE]: (todo) => {
            return !todo.completed;
        },
        [filterNames.COMPLETED]: (todo) => {
            return todo.completed;
        },
    }
}

const actions = {
    [actionNames.ADD]: function(state, title) {
        state.todos.push({
            title,
            completed: false
        });
        // save to store
        storage.set('todos', state.todos);
    } ,
    [actionNames.TOGGLE]: function(state, index) {
        state.todos[index].completed = !state.todos[index].completed;
        // save to store
        storage.set('todos', state.todos); 
    },
    [actionNames.FILTER]: function(state, filter) {
        state.filter = filter;
    },
    [actionNames.CLEAR_COMPLETED]: function(state) {
        state.todos = state.todos.filter(state.filters[filterNames.ACTIVE]);
        // save to store
        storage.set('todos', state.todos); 
    },
    [actionNames.REMOVE]: function(state, index) {
        state.todos.splice(index,1);
        // save to store
        storage.set('todos', state.todos); 
    },
    [actionNames.TOGGLE_ALL]: function(state, checked) {
        state.todos.forEach((todo) => {todo.completed = checked;});
        // save to store
        storage.set('todos', state.todos); 
    },
    [actionNames.EDIT_BEGIN]: function(state, editIndex) {
        state.editIndex = editIndex;
    },
    [actionNames.EDIT_CANCEL]: function(state, editIndex) {
        state.editIndex = null;
    },
    [actionNames.EDIT_END]: function(state, editIndex, newTitle) {
        if (newTitle) {
            state.todos[editIndex].title = newTitle;
        }
        else {
            this[actionNames.REMOVE](state, editIndex);
        }
        state.editIndex = null;
        // save to store
        storage.set('todos', state.todos);
    },
}
export default function reducer(state = initialState, action, ...args) {
    actions[action] && actions[action](state, ...args);
    return state;
}