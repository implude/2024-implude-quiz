import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

export default function MainPage() {
  const navigate = useNavigate();
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  return (
    <Wrap>
      <MainCon>
        <Implude>
          <img src="/img/logo.png" alt="/img/logo.png" />
          #IMPLUDE
        </Implude>
        <BtnCon>
          <SelectMent>어떤 퀴즈로 도전하시겠습니까?</SelectMent>
          <Btns>
            <button
              onClick={() => setType("dev")}
              className={type == "dev" ? "selected" : ""}
            >
              개발 퀴즈
            </button>
            <button
              onClick={() => setType("design")}
              className={type == "design" ? "selected" : ""}
            >
              디자인 퀴즈
            </button>
          </Btns>
          {type == "dev" || type == "design" ? (
            <input
              placeholder="플레이어 이름 입력"
              onInput={(e) => setName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key == "Enter") {
                  if (name === "") return;
                  navigate(`/question?type=${type}&name=${name}`);
                }
              }}
            />
          ) : null}
          {(type == "dev" || type == "design") && name ? (
            <Start
              onClick={() => {
                navigate(`/question?type=${type}&name=${name}`);
              }}
            >
              도전!
            </Start>
          ) : null}
        </BtnCon>
      </MainCon>
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

const Implude = styled.div`
  & img {
    height: 7vh;
  }
  display: flex;
  align-items: center;
  gap: 0.5vw;
  font-size: 3rem;
  font-weight: 800;
  font-family: "Poppins";
`;

const SelectMent = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
`;

const BtnCon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  background: #fff;
  border: 1px solid #eaeaea;
  padding: 6rem 8rem;
  border-radius: 20px;
  box-shadow: 2px 4px 5px #eaeaea;

  & input {
    outline: none;
    border: 1px solid #eaeaea;
    padding: 0.8rem 1rem;
    font-size: 1.1rem;
    border-radius: 10px;
  }

  & button {
    box-sizing: border-box;
    text-align: center;
    font-weight: 500;
    background: #fff;
    border-radius: 20px;
    font-size: 1.3rem;
    border: 1px solid #eaeaea;
    padding: 1.2rem 2rem;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px;
    &.selected,
    &:hover,
    &:focus {
      transform: scale(1.03);
      outline: none;
    }
  }
`;

const Btns = styled.div`
  display: flex;
  gap: 2rem;
  & > button:hover,
  & > button:focus,
  & > button.selected {
    font-weight: 900;
  }
  & > button:nth-child(1):hover,
  & > button:nth-child(1):focus,
  & > button:nth-child(1).selected {
    background: url("/img/devbg.jpg");
    background-size: 200%;
    background-repeat: no-repeat;
    background-position: 60%;
    color: #fff;
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: #000;
  }
  & > button:nth-child(2):hover,
  & > button:nth-child(2):focus,
  & > button:nth-child(2).selected {
    background: url("/img/desbg.jpg");
    background-size: 200%;
    background-repeat: no-repeat;
    background-position: 50%;
    color: #fff;
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: #000;
  }
`;

const Start = styled.button`
  width: 80%;
  padding: 0.8rem !important;
  &:hover,
  &:focus {
    font-weight: 800;
  }
`;

const MainCon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  width: 40vw;
`;
