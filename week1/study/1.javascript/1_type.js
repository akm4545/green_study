// 원시타입
// 객체가 아닌 다른 모든 타입

{
    // undefined 
    // 선언 후 값이 할당되지 않은 변수 또는 인수에 자동 할당
    // null과 undefined만이 하나의 값만 가지고 나머지는 두 개 이상(true, false)
    let foo

    typeof foo === 'undefined' //true

    function bar(hello){
        return hello
    }   

    typeof bar() === 'undefined' //true
}

{
    // null
    // 값이 없거나 비었을 때

    // typeof로 null 확인시 object 반환
    // 초창기 자바스크립트가 값을 표현하는 방식 때문에 발생한 문제
    typeof null === 'object' //true?
}

{
    // Boolean
    // true, false
    // truthy, falsy한 값이 존재

    if(1){
        //true
    }

    if(0){
        //false
    }

    if(NaN){
        //false
    }

    // 조건문 외에도 truthy와 falsy를 Boolean()을 통해 확인 가능
    Boolean(1) //true
    Boolean(0) //false
    Boolean(true) //true
}

{
    // Number
    // 자바스크립트는 모든 숫자를 하나의 타입에 저장
    const a = 1

    const maxInteger = Math.pow(2, 53)
    maxInteger - 1 === Number.MAX_SAFE_INTEGER //true

    const minInteger = -(Math.pow(2, 53) - 1)
    minInteger === Number.MIN_SAFE_INTEGER //true

    // 2진수, 8진수, 16진수 지원 X
    // 모두 10진수로 해석
    const 이진수_2 = 0b10 //2진수(binary) 2
    이진수_2 == 2 //true

    const 팔진수_8 = 0o10 //8진수(octal) 8
    팔진수_8 == 8 //true

    const 십육진수_16 = 0x10 // 16진수(hexadecimal) 16
    십육진수_16 == 16 //true
}

{
    //BigInt
    // number 자료형을 넘는 크기의 숫자
    9007199254740992 === 9007199254740993 //마지막 숫자가 다른데 true 더이상 다룰 수 없는 크기이기 떄문

    const maxInteger = Number.MAX_SAFE_INTEGER
    console.log(maxInteger + 5 === maxInteger + 6) //true ???

    // bigint형
    const bigInt1 = 9007199254740995n //끝에 n을 붙이거나
    const bigInt2 = BigInt('9007199254740995') //BigInt 함수를 사용

    const number = 9007199254740992
    const bigint = 9007199254740992n

    typeof number // number
    typeof bigint // bigint

    number == bigint //true
    number === bigint //false (엄격한 비교로 타입이 다르기 때문)
}

{
    //String 
    // '\n안녕하세요.\n'
    const longText = `
    안녕하세요.
    `

    //error
    //const longText= "
    //안녕하세요.
    //"

    // 문자열은 변경 불가능
    const foo = 'bar'

    console.log(foo[0]) //'b'

    foo[0] = 'a'

    console.log(foo) //bar
}

{
    // Symbol
    // ES6추가 
    // 중복되지 않는 고윳값 
    // 함수로만 생성 가능
    
    // 동일한 인수를 넘기더라도 같은 값으로 취급 x
    // 함수 내부에 넘겨주는 값은 Symbol 생성에 영향을 미치지 않는다(Symbol.for 제외)    
    const key = Symbol('key')
    const key2 = Symbol('key')

    key === key2 //false

    // 동일값을 위해선 for를 사용
    Symbol.for('hello') === Symbol.for('hello') //true
}

{
    //Object

    typeof [] === 'object' //true
    typeof {} === 'object' //true

    function hello(){}
    typeof hello === 'function' //true

    const hello1 = function(){

    }

    const hello2 = function(){

    }

    hello1 === hello2 //false
}

{
    let hello = 'hello world'
    let hi = hello

    console.log(hello === hi) //true

    hello = 'hello world'
    hi = 'hello world'

    console.log(hello === hi) //true

    //다음 객체는 완벽하게 동일한 내용
    var hello = {
        greet: 'hello, world',
    }

    var hi = {
        greet: 'hello, world'
    }

    // 객체는 참조를 저장하기 떄문
    console.log(hello === hi) //false
    console.log(hello.greet === hi.greet) //true

    var hello = {
        greet: 'hello, world',
    }

    // 같은 참조
    var hi = hello

    console.log(hi === hello) //true
}

{
    // 자바스크립트 비교 방법
    // Object.is 사용

    // == 연산자는 형변환 후 비교 Object.is는 ===와 동일하게 타입이 다르면 false

    // === 와의 차이점
    -0 === +0 //true
    Object.is(-0, +0) //false

    Number.NaN === NaN //false
    Object.is(Number.NaN, NaN) //true

    NaN === 0 / 0 //false
    Object.is(NaN, 0 / 0) //true

    // == 와 ===가 만족하지 못하는 몇 가지 특이 케이스를 보완
    // Object.is도 객체 비교는 차이가 없다
    Object.is({}, {}) //false

    const a = {
        hello: 'hi',
    }

    const b = a 

    Object.is(a, b) //true
    a === b //true
}