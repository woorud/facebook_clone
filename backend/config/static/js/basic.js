// variable & constant: 변수 & 상수, 변수(var) <-> 허락(let) <-> 상수(const), 변수를 지정할 때는 let 사용 지향
// expression: value -> datatype -> boolean, null, undefined, number, string...
// let nickname = prompt('이름');
let nickname = 'woorud'
let age = 25;
let bear;
let kind = true;

console.log(typeof kind); // 콘솔창에 기록을 남겨주는 명령 

// 산술연산, 비교연산, 대입연산, 논리연산(not-!, and-&&, or-||)
let a = 1;
let b = 2;

console.log(a+b)

// 조건문: if
if(nickname === 'woorud'){
    console.log(true);
}else if(nickname === '재경'){
    console.log(true);
}else {
    console.log(false)
}

// 반복문: for, while
let i = 0;
while(i < 5){
    console.log(i);
    i++;
}

// ajax: 비동기 통신방식
// type(전송방식), url(접근할 url), data(전달할 값)
// datatype(어떠한 데이터타입으로 사용할지, html, json...), success(성공할 경우 불러올 함수)
// error(실패할 경우 불러올 함수), complete(성공 or 실패 뒤에 실행할 함수, 사용 x)
