{
    // 클로저
    // 함수와 함수가 선언된 어휘적 환경의 조합

    // 어휘적 환경 예제 코드
    // 어휘적 환경 = 변수가 코드 내부에서 어디서 선언됐는지 (변수 유효범위)
    // 코드가 작성된 순간에 정적으로 결정
    // 클로저는 이러한 어휘적 환경을 조합해 코딩하는 기법
    function add(){
        const a = 10
        function innerAdd(){
            const b = 20
            console.log(a + b)
        }
        innerAdd() //30
    }

    add()
}

{
    // 전역 스코프
    // 전역 레벨에 선언하는것
    // 어디서든 호출 가능
    // 브라우저 환경에서 전역 객체는 window이며 전역 레벨에서 선언한 스코프가 바인딩
    var global = 'global scope'

    function hello(){
        console.log(global)
    }

    console.log(global) // global scope
    hello() //global scope
    console.log(global === window.global) //true
}

{
    // 함수 스코프
    // 자바스크립트는 기본적으로 함수 레벨 스코프를 따른다
    // 즉 {} 블록이 스코프 범위를 결정하지 않는다
    if(true){
        var global = 'global scope'
    }

    // {} 블록 밖에서도 접근 가능
    console.log(global) // global scope
    console.log(global === window.global) // true

    function hello() {
        var local = 'local variable'
        console.log(local) //local variable
    }

    // 단순 if 블록과 다르게 함수 블록 내부에서는 일반적인 예측과 같이 스코프 결정
    hello()
    console.log(local) //error

    // 중첩일 경우 일단 가까운 스코프에서 변수가 존재하는지를 먼저 확인
    var x = 10

    function foo(){
        var x = 100
        console.log(x) // 100

        function bar(){
            var x = 1000
            console.log(x) // 1000
        }

        bar()
    }

    console.log(x) // 10
    foo()
}

{
    // 함수와 함수가 선언된 어휘적 환경의 조합 = 함수 레벨 스코프를 활용해 어떤 작업을 할 수 있는 개념
    function outerFunction(){
        var x = 'hello'

        function innerFunction(){
            console.log(x)
        }

        return innerFunction
    }

    const innerFunction = outerFunction()
    // x 변수가 존재하지 않지만 해당 함수가 선언된 어휘적 환경
    // 즉 outerFunction에는 x변수가 존재하며 접근도 가능
    // 따라서 같은 환경에서 선언되고 반환된 innerFunction에서는 x라는 변수가 존재하던 환경을 기억
    innerFunction() //hello
}

{
    // 전역 스코프는 누구든 접근 가능
    var counter = 0

    function handleClick(){
        counter++
    }

    // 리액트가 관리하는 내부 상태 값은 리액트가 별도로 관리하는 클로저 내부에서만 접근 가능

    // 클로저 활용 코드로 변경
    function Counter(){
        var counter = 0

        return {
            increase: function(){
                return ++counter
            },
            decrease: function(){
                return --counter
            },
            counter: function(){
                console.log('counter에 접근!')
                return counter
            },
        }
    }

    var c = Counter()

    console.log(c.increase()) //1
    console.log(c.increase()) //2
    console.log(c.increase()) //3
    console.log(c.decrease()) //2
    console.log(c.counter) //2

    // 클로저 사용시 이점
    // 사용자가 직접 수정 막음
    // 접근하는 경우를 제한해 로그를 남기는 등의 부차적인 작업 수행 가능
    // 변수 수정을 해당 함수에 맡겨 무분별하게 변경되는 것을 막음
    // 전역 스코프의 사용을 막고 개발자가 원하는 정보만 원하는 방향으로 노출 가능
}

{
    // 의도 = 1초 간격으로 0, 1, 2, 3, 4를 차례대로 출력
    // 실행 = 5만 출력 
    // var 가 전역변수이기 때문에 for문을 순회 후 태스크 큐에 있는 setTimeout 실행 시 i = 5로 업데이트
    for (var i=0; i<5; i++){
        setTimeout(function(){
            console.log(i)
        }, i * 1000)
    }

    // 함수 레벨 스코프가 아닌 블록 레벨 스코프를 가지는 let으로 수정
    for (let i=0; i<5; i++){
        setTimeout(function(){
            console.log(i)
        }, i * 1000)
    }

    // 클로저를 제대로 활용
    for(var i=0; i<5; i++){
        setTimeout(
            (function(sec){
                return function(){
                    console.log(sec)
                }
            })(i),
            i * 1000,
        )
    }

    // 클로저는 환경을 기억해야 하므로 추가로 비용이 발생

    // 예시 코드
    // 일반적인 함수
    // 메모리 용량에 영향을 미치지 않음
    const aButton = document.getElementById('a')

    function heavyJob(){
        const longArr = Array.from({length: 10000000}, (_, i) => i + 1)
        console.log(longArr.length)
    }

    aButton.addEventListener('click', heavyJob)

    // 클로저
    // 해당 코드는 약 40MB 차지
    function heavyJobWithClosure(){
        const longArr = Array.from({length: 10000000}, (_, i) => i + 1)

        return function(){
            console.log(longArr.length)
        }
    }

    const innerFunc = heavyJobWithClosure()
    bButton.addEventListener('click', function(){
        innerFunc()
    })
}

{
    // 클로저는 함수형 프로그래밍의 중요한 개념 
    // 부수 효과가 없고 순수해야 한다는 목적을 당성하기 위해 적극적으로 사용되는 개념
    // 공짜가 아니기 때문에 항상 주의를 기울여야 한다
}