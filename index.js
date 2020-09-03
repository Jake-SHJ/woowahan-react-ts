let x = 10;

// 값으로 정의된 것들은 변수에 넣을 수 있다
// nprimitive, object, function => 거의 모든 게 값

function foo() {
  // 모든 함수는 값을 반환한다 return or undefined
  return 0;
} // 함수 정의문

const bar = function () {}; // 함수식, 값으로 취급하기 때문에 끝에 ';'이 붙는다, 함수를 값으로 취급할 때 이름을 생략할 수 있다 (변수가 정의하기 때문)

(function () {})(); // IIFE, 단 한번만 호출하는 함수가 필요할 때 사용

bar();

// HOF => 함수를 인자로 받고, 함수를 반환하는 함수
function foo(x) {
  x();
  return function () {};
}

const y = foo(function () {
  // 일을 위임하고, 답변을 받는다 => callback
});
// 형태가 달라도 본질은 같다, 결국 다 값이라 가능한 일
// 함수 = 코드를 묶고 있는 값 => 호출함으로써 실행

// 변형된 함수
const a = function foo() {
  foo(); // 재귀 호출을 하려면 function 이름이 필요함 (생략 불가)
};

const b = function (x) {};

// arrow function
const c = (x) => x * 2;
// 코드를 실행했을 때 값으로 마무리가 되면 식 (결과가 평가 되는 경우, ';'가 마지막에 들어가는 경우)
// 코드를 실행했을 때 값이 아니면 문 (if, while, for...)

console.log(c(10));

const x = 10;
const y = () => 10;
console.log(x, y()); // x = y()

function d() {
  this.name = 10; // constructor, prototype 기반
}

const e = new d(); // new 연산자, 최초 생성시 빈 객체 생성, 해당 함수내에 this가 그 빈 객체를 가리킴, 이후 자연스럽게 객체를 반환

if (e instanceof d) {
  // 객체 형태의 validation 위임
}

// 좀 더 명시적으로 표현하기 위해 class를 사용
class f {
  constructor() {
    // 생성자를 명확히 알 수 있음
    this.name = 10;
  }
}

// d는 new 함수를 강제할 수 없음, new 없이도 호출 가능
const g = new f(); // class는 new를 강제함

const person = {
  name: "jake",
  getName() {
    return this.name;
  },
};

console.log(person.getName()); // 호출하는 순간의 소유자와 this가 연결 (실행 컨텍스트에 따라)

const man = person.getName;

console.log(man()); // 호출자를 확인이 안되면 전역객체에 자연스럽게 연결 => this = window

button.addEventListener("click", person.getName.bind(person)); // bind를 통해 this를 고정
person.getName.call(person); // or apply

// class, arrow function을 사용하면 bind 쓸 일이 없어진다

// 클로저

function i(x) {
  return function () {
    return x;
  };
}

const k = i(10);

console.log(k());

// module pattern

const person = {
  age: 10,
};

function makePerson() {
  let age = 10;

  return {
    getAge() {
      return age;
    },
    setAge(x) {
      age = x > 1 && x < 130 ? x : age;
    },
  };
}

let p = mekaPerson();

console.log(p.getAge());

// redux를 배우기 위한 advanced한 함수를 알아야한다
// 비동기의 흐름

// function l(x) {
//   console.log("받았다");
// }

// setTimeout(l, 1000);

// 콜백 지옥의 시작...
setTimeout(function (x) {
  console.log("받았다");
  setTimeout(function (y) {
    console.log("또 받았다");
  }, 2000);
}, 1000);

const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    // 클로저의 형태를 갖는다
    resolve("응답1"); // then의 함수를 호출
  }, 1000);

  // reject(); // catch의 함수를 호출
});

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("응답2"); // then의 함수를 호출
  }, 1000);
});

p1.then(p2())
  .then(function () {})
  .catch(function () {}); // then을 가진 promise 객체를 리턴

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// async await의 등장
async function main() {
  console.log("1");
  await delay(2000); // thenable 객체에서 resolve 값을 리턴
  // reject는?
  try {
    const x = await delay(2000);
  } catch (e) {
    // reject가 되면 catch에 잡힘
    console.error(e);
  }
  console.log("2");
}

main();
