export default function createStore(reducer) {
    // initialize state, initial state will be passed by default param in our reducer
    // this state will be used as a closure
    let state = reducer();

    // used to render html component
    const roots = new Map(); // [root, component]

    function render() {
        for (const [root, component] of roots) {
            root.innerHTML = component();
        }
    }

    return {
        attach(component, root) {
            roots.set(root, component);
            render();
        },
        connect(stateSelector = state => state) {
            return component => (props, ...args) => 
                component(Object.assign({}, props, stateSelector(state), ...args));
        },
        dispatch(action, ...args) {
            state = reducer(state, action, ...args);
            render();
        }
    };
}