const {createStore} = require('redux') ;
const defaultState ={
    screen:'LOGIN',
    value:0

}
const reducers =(state=defaultState,action)=>{
    if(action.type === 'UP') return {value: state.value+1,screen: state.screen};
    if(action.type === 'DOWN') return {value: state.value-1,screen: state.screen};
    if(action.type === 'LOGIN') return {screen: 'LOGIN',value: state.value};
    if(action.type === 'ADMIN') return {screen: 'ADMIN',value: state.value};
    return state;
};
const store = createStore(reducers);
console.log('truoc:'+store.getState().value);
console.log('truoc:'+store.getState().screen);



store.dispatch({type:'UP'});

store.dispatch({type:'UP'});

console.log('sau:'+store.getState().value);
console.log('sau:'+store.getState().screen);