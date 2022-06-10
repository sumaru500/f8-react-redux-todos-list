import {attach} from './store.js';
import App from './pages/App/App.js';

// attach the most container App to the root element in index.html
attach(App, document.querySelector('#root'));