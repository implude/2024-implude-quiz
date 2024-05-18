import { styled } from "styled-components";
import { DataDevelop } from "../Data-Develop";
import { DataDesign } from "../Data-Design";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import axios from "axios";
import Modal from "./Modal";

import bgm from "../../../public/audio/bgm.mp3";

export default function Quiz() {
  const navigate = useNavigate();

  const [solveTime, setSolveTime] = useState(0);

  const [level, setLevel] = useState(1);
  const [point, setPoint] = useState(0);
  const [choice, setChoice] = useState([]); // 유저가 전송한 답안
  const [choiceIndex, setChoiceIndex] = useState(-1);
  const [inputValue, setInputValue] = useState("");
  const [progressbarArr, setProgressbarArr] = useState([]);
  const [isModal, setModal] = useState(false);
  const QuestionData =
    getQuizType() == "dev" ? [...DataDevelop] : [...DataDesign];
  const QuestionMaxNum = QuestionData.length - 1; // level이 이 숫자보다 커지면 테스트 종료
  const [searchParams, setSearchParams] = useSearchParams();
  const [isRight, setRight] = useState(false);

  const audio = useRef();

  useEffect(() => {
    setInterval(() => {
      setSolveTime((prev) => prev + 1);
    }, 1000);
  }, []);

  function getSolveTime(sec) {
    let min = Math.floor(sec / 60);
    let realSec = sec % 60;
    return `${min < 10 ? "0" + min : min} : ${realSec < 10 ? "0" + realSec : realSec}`;
  }

  function getQuizType() {
    const url = new URL(window.location.href);
    const param = url.searchParams;
    return param.get("type");
  }

  const onButtonClick = (value) => {
    setChoiceIndex(value);
    setModal(true);
    // 객관식 답 제출했을 때
    let copy = [...choice, QuestionData[level].Choice[value]]; // 맨 마지막에 답안 추가
    setChoice(copy);
    if (QuestionData[level].Choice[value] === QuestionData[level].Ans) {
      setPoint((prev) => prev + QuestionData[level].Point);
      setRight(true);
    } else {
      setRight(false);
    }
  };

  const onSubmit = () => {
    setModal(true);
    // 주관식 답 제출했을 때
    if (inputValue != "") {
      let copy = [...choice, inputValue]; // 맨 마지막에 답안 추가
      setChoice(copy);
      if (inputValue === QuestionData[level].Ans) {
        setPoint((prev) => prev + QuestionData[level].Point);
        setRight(true);
      } else {
        setRight(false);
      }
    }
  };

  function progressBarFunc() {
    let tempArr = [];
    for (let i = 0; i < QuestionData.length; i++) {
      if (i < level)
        tempArr.push(<ProgressBlock key={i} className="progress" />);
      else tempArr.push(<ProgressBlock key={i} />);
    }
    setProgressbarArr([...tempArr]);
  }

  useEffect(() => {
    progressBarFunc();
  }, [level]);

  useEffect(() => {
    if (solveTime >= 600) {
      navigate("/");
    }
  }, [solveTime]);

  const ProgressBlock = styled.div`
    // QuestionData.length를 받아와야 해서 여기에 둠
    width: ${`calc(100% / ${QuestionData.length - 1})`};
    padding: 0.1rem 0;
    border-radius: 30px;
    box-sizing: border-box;
    background: #0076ff;

    box-shadow: rgba(0, 0, 0, 0.1) 1px 1px 2px;
    &:not(.progress) {
      background: #fff;
      border: 1px solid #eaeaea;
    }
  `;

  return (
    <Wrap>
      <audio src={bgm} ref={audio}></audio>
      <QuizBox
        onMouseMove={() => {
          audio.current.play();
        }}
      >
        <Time>{getSolveTime(solveTime)}</Time>
        <Info>
          <Level>문제 {level}.</Level>
          <Point>
            현재 점수 <Slash /> <PointNum>{point}점</PointNum>
          </Point>
          <LevelNum>
            {level} / {QuestionData.length - 1}
          </LevelNum>
        </Info>
        <ProgressBarCon>{progressbarArr.map((v) => v)}</ProgressBarCon>
        <Quest>
          {QuestionData[level].Q}
          {QuestionData[level].isImgExist ? (
            <img src={QuestionData[level].src} alt={QuestionData[level].src} />
          ) : (
            ""
          )}
        </Quest>
        <AnswerBox>
          {QuestionData[level].isSubject ? (
            <InputAnswer>
              <input
                type="text"
                onChange={(e) => setInputValue(e.target.value)}
                value={inputValue}
                placeholder="답안을 입력하세요!"
                disabled={isModal ? true : false}
                onKeyDown={(e) => {
                  if (e.key == "Enter") onSubmit();
                }}
              />
              <button onClick={() => (!isModal ? onSubmit() : null)}>
                전송
              </button>
            </InputAnswer>
          ) : (
            [0, 1].map((index) => (
              <Answer
                key={index}
                onClick={() => (!isModal ? onButtonClick(index) : null)}
                disabled={isModal ? true : false}
                className={index == choiceIndex ? "selected" : null}
              >
                {QuestionData[level].Choice[index]}
              </Answer>
            ))
          )}
        </AnswerBox>
        {isModal ? (
          <ModalCon>
            <Modal
              questionNumber={level}
              type={getQuizType()}
              isRight={isRight}
            />
            <button
              onClick={() => {
                console.log(level, QuestionMaxNum);
                if (level >= QuestionMaxNum) {
                  console.log(getQuizType());
                  // const userScore = isRight
                  //   ? point + QuestionData[level].Point
                  //   : point;
                  axios
                    .post(
                      import.meta.env.VITE_BASE_URL + `/post_${getQuizType()}`,
                      {
                        // /post_dev 혹은 /post_design으로 요청
                        name: searchParams.get("name"),
                        score: point,
                        sec: solveTime,
                      }
                    )
                    .then((_response) => {
                      navigate(
                        `/result?name=${searchParams.get("name")}&score=${point}&type=${getQuizType()}`
                      );
                      location.reload(true);
                    });
                } else {
                  setChoiceIndex(-1);
                  setLevel(level + 1);
                  setModal(false);
                  setInputValue("");
                }
              }}
            >
              다음 문제
            </button>
          </ModalCon>
        ) : null}
        <Implude>
          <img src="/img/logo.png" alt="임플루드 로고" /> #IMPLUDE
        </Implude>
      </QuizBox>
    </Wrap>
  );
}

const Wrap = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
`;

const QuizBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  width: 40vw;
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Level = styled.div`
  font-size: 2rem;
  font-weight: bold;
`;

const Slash = styled.span`
  &::before {
    content: "|";
  }
  color: #c0c0c0;
  font-weight: 500;
  font-size: 1.5rem;
`;

const Point = styled.div`
  font-size: 1.3rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;

const PointNum = styled.span``;

const PlusPoint = styled.span``;

const LevelNum = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  border-radius: 10px;
  border: 1px solid #eaeaea;
  background: #fff;
  padding: 0.4rem 1rem;
`;

const ProgressBarCon = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 0.3rem;
`;

const Quest = styled.div`
  width: 100%;
  padding: 3rem;
  box-sizing: border-box;
  border-radius: 20px;
  border: 1px solid #eaeaea;
  background: #fff;
  font-size: 1.5rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 2rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px;
  line-height: 1.6rem;
  & img {
    height: 10rem;
  }
`;

const AnswerBox = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
`;

const InputAnswer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 1rem;
  & input {
    outline: none;
    border: 1px solid #eaeaea;
    padding: 0.5rem 1rem;
    font-size: 1.1rem;
    border-radius: 5px;
    transition: all 0.2s ease;
    &:focus {
      border: 1px solid #0076ff;
      background: #e2eefe;
    }
  }
  & button {
    padding: 0.5rem 1rem;
    background: #fff;
    outline: none;
    border: 1px solid #eaeaea;
    font-size: 1.1rem;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.2s ease;
    &:hover {
      border: 1px solid #0076ff;
      background: #e2eefe;
    }
  }
`;

const Answer = styled.div`
  width: 50%;
  box-sizing: border-box;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 400;
  background: #fff;
  border-radius: 20px;
  border: 1px solid #eaeaea;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px;
  &:hover,
  &:focus,
  &.selected {
    background: #e2eefe;
    border: 1px solid #0076ff;
    transform: scale(1.03);
  }
`;

const Implude = styled.div`
  & img {
    height: 3vh;
  }
  display: flex;
  align-items: center;
  gap: 0.5vw;
  font-size: 1.5rem;
  font-weight: 800;
  font-family: "Poppins";
`;

const ModalCon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  & > button {
    box-sizing: border-box;
    text-align: center;
    font-weight: 400;
    background: #fff;
    border-radius: 20px;
    border: 1px solid #eaeaea;
    padding: 1rem 1.5rem;
    font-size: 1.1rem;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px;
    &.selected,
    &:hover,
    &:focus {
      transform: scale(1.03);
      font-weight: 500;
      outline: none;
      background: #e2eefe;
      border: 1px solid #0076ff;
    }
  }
`;

const Time = styled.div`
  width: 3.6rem;
  text-align: center;
  padding: 0.5rem 0.7rem;
  border: 1px solid #eaeaea;
  background: #fff;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 500;
`;
