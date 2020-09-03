// 개념
// flux architecture or redux architecture

//  store 객체는 immutable 해야한다 => 클로저로 숨긴다
export function createStore(reducer) {
  let state;
  const listeners = [];
  const getState = () => ({ ...state }); // 새로운 객체를 리턴
  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach((fn) => fn());
  };
  const subscribe = (fn) => {
    listeners.push(fn);
  };

  return {
    getState,
    dispatch,
    subscribe,
  };
}
