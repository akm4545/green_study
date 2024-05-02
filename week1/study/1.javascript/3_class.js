{
    // 클래스 예제
    // Car 클래스 선언
    class Car{
        // constructor는 생성자 
        // 최초 생성시 어떤 인수를 받을지 결정하고 객체를 초기화한다
        constructor(name){
            this.name = name
        }

        // 메서드
        honk(){
            console.log(`${this.name}이 경적을 울립니다!`)
        }

        // 정적 메서드
        static hello(){
            console.log('저는 자동차 입니다')
        }

        // setter
        set age(value){
            this.carAge = value
        }

        // getter
        get age(){
            return this.carAge
        }
    }

    // Car 클래스로 car 객체 생성
    const myCar = new Car('자동차')

    // 메서드 호출
    myCar.honk()

    // 정적 메서드는 클래스에서 직접 호출
    Car.hello()

    // 정적 메서드는 객체에서는 호출 불가
    //error
    myCar.hello()

    // setter로 값 할당
    myCar.age = 32

    // getter로 값 가져오기
    console.log(myCar.age, myCar.name) //32 자동차
}

{
    // constructor
    // 생성자 
    // 하나만 존재 가능, 생략 가능
    class Car {
        constructor(name){
            this.name = name
        }

        //error
        constructor(name){
            this.name = name
        }
    }

    class Car2{
        //생성자 생략 가능
    }
}

{
    // 프로퍼티
    // 클래스 속성 값
    // 자바스크립트에서는 public, private(#) 지원
    // 타입스크립트는 private, protected, public 사용 가능
    class Car{
        constructor(name){
            // 값을 받으면 내부에 프로퍼티로 할당
            this.name = name
        }
    }

    const myCar = new Car('자동차') //프로퍼티 값을 넘겨줌
}

{
    // getter = get을 붙임
    class Car {
        constructor(name){
            this.name = name
        }

        get firstCharacter(){
            return this.name[0]
        }
    }

    const myCar = new Car('자동차')
    myCar.firstCharacter() // 자

    // setter = set을 붙음
    class Car2{
        constructor(name){
            this.name = name
        }

        get firstCharacter(){
            return this.name[0]
        }

        set firstCharacter(char){
            this.name = [char, ...this.name.slice(1)].join('')
        }
    }

    const myCar2 = new Car2('자동차')
    myCar2.firstCharacter //자
    myCar2.firstCharacter = '차'

    console.log(myCar2.firstCharacter, myCar2.name) //차, 차동차
}

{
    // 인스턴스 메서드
    // 클래스 내부에 선언한 메서드
    // prototype에 선언되므로 프로토타입 메서드로 불리기도 한다
    class Car{
        constructor(name){
            this.name = name
        }

        // 인스턴스 메서드 정의
        hello(){
            console.log(`안녕하세요, ${this.name}입니다.`)
        }
    }

    const myCar = new Car('자동차')
    // 프로토타입에 선언됐기 떄문에 접근 가능
    myCar.hello() //안녕하세요. 자동차입니다.

    // 인수로 넘겨준 변수의 prototype을 확인
    // Car의 prototype을 받은 것으로 짐작할 수 있다
    Object.getPrototypeOf(myCar) // {constructor: f, hello: f}

    Object.getPrototypeOf(myCar) === Car.prototype //true
    // 해당 코드도 프로토타입 확인
    // 가급적 사용하지 말자
    // 과거 브라우저에서 호환성을 지키기 위해서만 존재
    myCar.__proto__ === Car.prototype //true

    // 직접 객체에서 선언하지 않았음에도 프로토타입에 있는 메서드를 찾아서 실행을 도와주는것 = 프로토타입 체이닝
    // 모든 객체는 프로토타입을 가지고 있음
    // 특정 속성을 찾을때 자기부터 시작해서 이 프로토타입을 타고 최상위 객체인 Object까지 검사
    // myCar에서 시작해서 부모인 Car에서 hello를 찾는 프로토타입 체이닝을 거쳐서 hello 호출
}

{
    // 정적 메서드
    // 클래스의 인스턴스가 아닌 이름으로 호출
    // 정적 메서드 내부의 this는 클래스로 생성된 인스턴스가 아닌 클래스 자신을 가리킴
    // 메서드에서 일반적으로 사용하는 this 사용 불가능
    // 애플리케이션 전역에서 사용하는 유틸 함수를 정적 메서드로 많이 활용하는 편
    class Car {
        static hello(){
            console.log('안녕하세요!')
        }
    }

    const myCar = new Car()

    myCar.hello() //error
    Car.hello() //안녕하세요!

    // 리액트 클래스 컴포넌트 생명주기인 static getDerivedStateFromProps(props, state)에서는 this.state에 접근할 수 없다
}

{
    // 상속
    // extends로 기존 클래스를 상속받아서 확장
    class Car {
        constructor(name){
            this.name = name
        }

        honk(){
            console.log(`${this.name} 경적을 울립니다!`)
        }
    }

    class Truck extends Car{
        constructor(name){
            //부모 클래스의 constructor (Car constructor)
            super(name)
        }

        load(){
            console.log('짐을 싣습니다.')
        }
    }

    const myCar = new Car('자동차')
    myCar.honk() //자동차 경적을 울립니다!

    const truck = new Truck('트럭')
    truck.honk() //트럭 경적을 울립니다!
    truck.load() //짐을 싣습니다!
}

{
    // ES6 이전 = 프로토타입을 활용해 클래스의 작동 방식을 동일하게 구현
    // 클래스 작동 방식 = 자바스크립트의 프로토타입 활용

    // Car클래스 코드 바벨 트랜스파일 결과
    // 클래스 코드
    class Car {
        constructor(name){
            this.name = name
        }

        honk(){
            console.log(`${this.name}이 경적을 울립니다!`)
        }

        static hello(){
            console.log('저는 자동차입니다')
        }

        set age(value){
            this.carAge = value;
        }

        get age(){
            return this.carAge;
        }
    }

    // 바벨 변환 코드
    'use strict'

    //클래스가 함수처럼 호출되는 것을 방지
    function _classCallCheck(instance, Constructor){
        if(!(instance instanceof Constructor)){
            throw new TypeError('Cannot call a class as a function')
        }
    }

    // 프로퍼티 할당 코드
    function _definePropertes(target, props){
        for (var i = 0; i<props.length; i++){
            var descriptor = props[i]

            descriptor.enumerable = descriptor.enumerable || false
            descriptor.configurable = true

            if('value' in descriptor) descriptor.writable = true
            Object.defineProperty(target, descriptor.key, descriptor)
        }
    }

    // 프로토타입 메서드와 정적 메서드를 선언하는 코드
    // 헬퍼 함수를 만들어 클래스와 동일한 방식으로 동작할 수 있도록 변경
    function _createClass(Constructor, protoProps, staticProps){
        if(protoProps) _definePropertes(Constructor.prototype, protoProps)
        if(staticProps) _definePropertes(Constructor, staticProps)
        Object.defineProperty(Constructor, 'prototype', {writable: false})

        return Constructor
    }

    var Car = /*#__PURE__*/ (function(){
        function Car(name){
            _classCallCheck(this, Car)

            this.name = name
        }

        _createClass(
            Car,
            [
                {
                    key: 'honk',
                    value: function honk(){
                        console.log(
                            ''.concat(
                                this.name,
                                '\uC774 \uACBD\uC801\uC744 \uC6B8\uB9BD\uB2C8\uB2E4!',
                            ),
                        )
                    },
                },
                {
                    key: 'age',
                    get: function get(){
                        return this.carAge
                    },
                    set: function set(value){
                        this.carAge = value
                    },
                },
            ],
            [
                {
                    key: 'hello',
                    value: function hello(){
                        console.log('저는 자동차입니다')
                    },
                },
            ],
        )

        return Car
    })()
}

{
    // 위 코드를 보기 쉽게 변경
    var Car = (function(){
        function Car(name){
            this.name = name
        }

        // 프로토타입 메서드 실제로 프로토타입에 할당해야 프로토타입 메서드로 작동
        Car.prototype.honk = function(){
            console.log(`${this.name}이 경적을 울립니다!`)
        }

        // 정적 메서드 인스턴스 생성 없이 바로 호출 가능하므로 직접 할당
        Car.hello = function(){
            console.log('저는 자동차입니다')
        }

        // Car 객체에 속성을 직접 정의
        Object.defineProperty(Car, 'age', {
            // get과 set은 각각 접근자, 설정자로 사용할 수 있는 예약어
            //getter
            get: function(){
                return this.carAge
            },
            //setter
            set: function(value){
                this.carAge = value
            },
        })

        return Car
    })()
}