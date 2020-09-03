import { createStore } from "./redux";

const INCREMENT = "increment";
const RESET = "reset";
function reducer(state = {}, action) {
  if (action.type === INCREMENT) {
    return { ...state, count: state.count ? state.count + 1 : 1 }; // 새로운 객체를 반환한다
  } else if (action.type === RESET) {
    return {
      ...state,
      count: action.resetCount,
    };
  }

  return state;
}

const store = createStore(reducer);

function update() {
  console.log(store.getState());
}

store.subscribe(update);

function actionCreator(type, data) {
  return {
    ...data,
    type: type,
  };
}

function increment() {
  store.dispatch(actionCreator(INCREMENT));
}

function reset() {
  store.dispatch(actionCreator(RESET, { resetCount: 10 }));
}

increment();
reset();
