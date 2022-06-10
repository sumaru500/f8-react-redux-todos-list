import { render } from "/libs/react-redux/index.js";
import { connect } from "../../store.js";
function Header() {
    return render`
    
    <header class="header">
    <h1>todos</h1>
    <input 
        class="new-todo" 
        placeholder="What needs to be done?" 
        autofocus
        onkeyup="event.keyCode === 13 && dispatch('add', this.value.trim())"
    >
    </header>

    `;
}

export default connect()(Header);