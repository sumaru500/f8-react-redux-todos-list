import { render } from "/libs/react-redux/index.js";
import Header from "/components/Header/Header.js";
import Footer from "/components/Footer/Footer.js";
import TodoList from "/components/TodoList/TodoList.js";
export default function App() {
    return render`   
    <section class="todoapp">
    ${Header()}
    <!-- This section should be hidden by default and shown when there are todos -->
    <section class="main">
    ${TodoList()}
    </section>
    <!-- This footer should hidden by default and shown when there are todos -->
    ${Footer()}
</section>    
    `;
}