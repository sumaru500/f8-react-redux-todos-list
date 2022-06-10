export default function logger(loggedReducer) {
    return (prevState, action, ...args) => {
        // log previous state and action args
        console.group(action);
        console.log('prevState : ', prevState);
        console.log('...args : ', [...args]);
        const nextState = loggedReducer(prevState, action, ...args);
        // log current state and action args
        console.log('nextState : ', nextState);
        console.groupEnd(action);
        return nextState;
    }
}