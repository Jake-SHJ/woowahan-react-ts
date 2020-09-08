import { createStore } from "./redux";

const INCREMENT = "increment";

const reducer = (state = {}, action) => {
  if (action.type === INCREMENT) {
    return { ...state, count: state.count ? state.count + 1 : 1 };
  }
  return state;
};

const store = createStore(reducer);

store.subscribe(() => {
  console.log(store.getState());
});

const actionCreator = (type, data) => {
  return {
    ...data,
    type: type,
  };
};

const increment = () => {
  store.dispatch(actionCreator(INCREMENT));
};

increment();
increment();
increment();
increment();
increment();
