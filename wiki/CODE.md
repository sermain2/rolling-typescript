## ☑️ 코드 컨벤션

- 문자열을 처리할 때는 쌍따옴표를 사용하도록 한다.
- 문장이 종료될 때는 세미콜론을 붙여준다.
- 가독성을 위해 Prettier를 사용한다.
- 서로 연관된 파일들은 하나의 폴더에 넣어준다.

  ```
  components ─── SignupForm
                  └ SignupForm.j
                  └ SignupForm.test.js
                  └ SignupForm.style.js
  ```

- 블록 구문은 명시적으로 중괄호를 ({ }) 사용한다.

  ```jsx
  // bad
  if (true) return "hello";

  // good
  if (true) {
    return "hello";
  }
  ```

- 바로 return 하는 경우 return과 중괄호를 ({ }) 생략한다.

  ```jsx
  // bad
  const foo = () => {
    return "bar";
  };

  // good
  const foo = () => "bar";
  ```

- 주석은 Comment Anchors를 사용한다.
  ![image](https://github.com/un0211/ro1ling/assets/24778465/9f5ef6ce-e9e1-48d7-a5b4-540224de5a7e)

- 폴더 구조
  ```
  my-app
  ├── node_modules
  ├── public
  ├── src
      ├─ components
          ├─ common
          ├─ userPage
      ├─ assets
      ├─ pages
      ├─ constants
      ├─ apis
      ├─ styles
      ├─ App.js
      └─ index.js
  ├── .gitignore
  ├── package.json
  └── README.md
  ```

### ☑️ ES6

- spread 연산자를 사용한다.
- 구조 분해 할당을 사용한다.
- let과 const만 사용한다. (var 사용금지)
- 직접 null을 체크하기 보다 optional chaining 연산자 (?.)를 사용한다.
- 되도록 화살표 함수를 사용한다.

  ```jsx
  // index.jsx
  // 화살표 함수 사용 시 이렇게 선언 x
  export default const SignUpPage = () => {}

  // 화살표 함수 사용 시 이렇게 선언 o
  // 함수 앞에 export를 붙이는 것이 아닌 별도로 export문을 작성해주어야 합니다.
  const SignUpPage = () => {}

  export default SignUpPage;

  // function 사용시
  export default function SignUpPage = () => {};
  ```

### ☑️ CSS

- inline css, !important 를 사용하지 않는다.
- 스타일 시트 파일(CSS)은 스타일 시트 적용할 파일명과 동일하게 맞춘다.

### ☑️ 명명 규칙

- 상수는 스네이크 케이스로 작성한다.
  ```
  const NAME_ROLE;
  ```
- 함수명, 변수명은 카멜케이스로 작성한다.
- 파일명은 카멜 케이스를 기본으로 하며, 컴포넌트일 경우에만 파스칼 케이스로 사용한다.
  ```
  // 카멜 케이스
  camelCase
  // 파스칼 케이스
  PascalCase
  ```
- 이벤트 핸들러는 function인 경우 handle*, Propsdls 경우 on* prefix를 붙여 작성한다.
  ```
  Props의 경우: on (onClick 등등)
  - on* 은 어떠한 이벤트가 연결된다는 것을 의미
  함수인 경우: handle (handleClick 등등)
  - handle* 은 이벤트가 발생했을 때 어떤 것이 호출되는지를 의미
  ```

---

### ☑️ 코드 컨벤션이 필요한 이유

- 팀원끼리 코드를 공유하기 때문에 일관성있는 코드를 작성하면 서로 이해하기 쉽다.
- 나중에 입사 지원 시 프로젝트를 하며 코드 컨벤션을 만들어 진행했다고 하면 협업 면에서 유리하게 작용할 수 있다.

### 참고

[코딩컨벤션](https://ui.toast.com/fe-guide/ko_CODING-CONVENTION)
