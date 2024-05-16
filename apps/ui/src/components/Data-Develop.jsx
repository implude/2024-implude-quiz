export const DataDevelop = [
  // 1단계 문제
  {},
  {
    Q: "웹을 작성할때 쓰는 언어는 XML / CCS / Typescript이다.",
    Ans: "X",
    Point: 10,
    Choice: ["O", "X"],
    Level: 1,
    isImgExist: false,
    Desc: "웹을 작성할때 쓰는 언어는 HTML(Hyper Text Markup Language), CSS(Cascading Style Sheet), Javascript 입니다.",
    isSubject: false,
  },
  {
    Q: "웹은 브라우저를 통해 들어갈 수 있다.",
    Ans: "O",
    Point: 10,
    Choice: ["O", "X"],
    Level: 1,
    isImgExist: false,
    Desc: "웹은 Chrome, Microsoft Edge 와 같은 브라우저로 들어갈 수 있습니다.",
    isSubject: false,
  },
  // 2단계 문제
  {
    Q: "C언어 출력은 print()로 한다",
    Ans: "X",
    Point: 10,
    Choice: ["O", "X"],
    Level: 2,
    isImgExist: false,
    Desc: "C언어 출력은 printf()로 합니다.",
    isSubject: false,
  },
  {
    Q: "Python 출력은 print()로 한다",
    Ans: "O",
    Point: 10,
    Choice: ["O", "X"],
    Level: 2,
    isImgExist: false,
    Desc: "Python 출력은 print()로 합니다.",
    isSubject: false,
  },

  // 3단계 문제
  {
    Q: "C언어는 B언어를 개량해서 만들었다.",
    Ans: "O",
    Point: 10,
    Choice: ["O", "X"],
    Level: 3,
    isImgExist: false,
    Desc: "C언어는 B언어를 개량해서 만든 프로그래밍 언어입니다.",
    isSubject: false,
  },
  {
    Q: "HTML은 프로그래밍 언어다.",
    Ans: "X",
    Point: 10,
    Choice: ["O", "X"],
    Level: 3,
    isImgExist: false,
    Desc: "HTML(Hyper Text Markup Language)은 프로그래밍 언어가 아닌, 마크업 언어입니다.",
    isSubject: false,
  },

  // 4단계 문제
  {
    Q: "웹을 직접적으로 조종하는 언어는 Javascript와 Typescript이다.",
    Ans: "X",
    Point: 20,
    Choice: ["O", "X"],
    Level: 4,
    isImgExist: false,
    Desc: "웹을 직접적으로 조종하는 언어는 Javascript 입니다. Typescript는 Javascript의 문제점을 해소하기 위해 생겨난 Javascript의 슈퍼셋이며, Javascript 파일로 변환하는 과정을 거치게 됩니다.",
    isSubject: false,
  },
  {
    Q: "파이썬은 인터프리터 언어이다.",
    Ans: "O",
    Point: 20,
    Choice: ["O", "X"],
    Level: 4,
    isImgExist: false,
    Desc: "파이썬은 코드를 한 줄씩 실행하면서 오류를 검사하는 인터프리터 언어입니다.",
    isSubject: false,
  },

  // 5단계 문제
  {
    Q: "CommonJS는 다른 모듈을 불러올 때 require()를 사용한다.",
    Ans: "O",
    Point: 30,
    Choice: ["O", "X"],
    Level: 5,
    isImgExist: false,
    Desc: "프론트엔드에서 사용하는 ES6, ES7 등과 다르게, Node.js 등 백엔드 쪽에서 많이 사용하는 CommonJS는 모듈을 불러오기 위해 require()를 사용합니다.",
    isSubject: false,
  },
  {
    Q: "Kotlin은 iOS 개발, swift는 안드로이드 개발용이다.",
    Ans: "X",
    Point: 30,
    Choice: ["O", "X"],
    Level: 5,
    isImgExist: false,
    Desc: "문제와는 반대로 Kotlin이 안드로이드 개발, Swift가 iOS 개발용입니다.",
    isSubject: false,
  },

  // 6단계 문제
  {
    Q: "(Python) 이 사진에서 오류가 난 행을 고르시오. (숫자만 쓸 것)", // 파이썬
    Ans: "4",
    Point: 30,
    src: "/img/python.png", // 파이썬 코드 사진 주소
    Level: 6,
    isImgExist: true,
    Desc: "4번째 줄에서, 대입연산자(=)가 아닌 비교연산자(==)를 사용해야 합니다.",
    isSubject: true,
  },
  {
    Q: "(C언어) 이 사진에서 오류가 난 행을 고르시오. (숫자만 쓸 것)", // C언어
    Ans: "4",
    Point: 30,
    src: "/img/c.png", // C언어 코드 사진 주소
    Level: 6,
    isImgExist: true,
    Desc: "4번째 줄에서, 변수명의 시작은 숫자가 될 수 없습니다.",
    isSubject: true,
  },
  {
    Q: "https의 포트 번호는?",
    Ans: "443",
    Point: 30,
    Level: 6,
    Choice: ["443", "80"],
    isImgExist: false,
    Desc: "https의 포트 번호는 443이고, http의 포트 번호는 80입니다.",
    isSubject: false,
  }, // 250점 만점
];
