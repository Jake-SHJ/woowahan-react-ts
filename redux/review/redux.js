export const createStore = (reducer) => {
  let state;
  const listeners = [];
  const getState = () => ({ ...state });
  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach((fn) => fn());
  };
  const subscribe = (fn) => {
    listeners.push(fn);
  };
  return { getState, dispatch, subscribe };
};

// *** state는 immutable object로 다룬다

// 흐름의 이해
// store 생성
// > store를 구독하고 있는 상태로 action의 발생
// > 해당 reducer의 실행 (state의 변경)
// > dispatch를 통해 바뀐 state를 subscriber에게 전달
