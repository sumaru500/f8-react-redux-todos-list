import { render } from "/libs/react-redux/index.js";
import {connect} from "/store.js";
import * as filterNames from "/constants/filters.js";
import * as actionNames from "/constants/actions.js";
function Footer({todos, filter, filters}) {
    console.log(filters);
    return render`
    <footer class="footer">
        <!-- This should be "0 items left" by default -->
        <span class="todo-count"><strong>${todos.filter(filters[filterNames.ACTIVE]).length}</strong> item left</span>
        <!-- Remove this if you don't implement routing -->
        <ul class="filters">
        ${Object.keys(filters).map(filterName => {
            return render`
            <li>
                <a class="${filterName===filter && 'selected'}" href="#/"
                    data-filter="${filterName}"
                    onclick="dispatch('${actionNames.FILTER}', this.dataset.filter)"
                >
                ${filterName[0].toUpperCase() + filterName.slice(1)}
                </a>
            </li>
            `
        })}
        </ul>
        <!-- Hidden if no completed items are left ↓ -->
        <button class="clear-completed" 
            ${todos.filter(filters[filterNames.COMPLETED]).length === 0 && 'hidden'}
            onclick="dispatch('${actionNames.CLEAR_COMPLETED}')"
        >
            Clear completed
        </button>
    </footer>
    `;
}
const stateToProps = (state) => ({
    todos: state.todos,
    filter: state.filter,
    filters: state.filters
})
export default connect()(Footer);