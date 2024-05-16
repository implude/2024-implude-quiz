import { DataDesign } from "../Data-Design";
import { DataDevelop } from "../Data-Develop";

import { styled } from "styled-components";

export default function Modal({ questionNumber, type, isRight }) {
  const Wrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.7rem 1rem;
    background: ${isRight ? "rgba(0,168,129,.08)" : "rgba(245,83,94,.08)"};
    color: ${isRight ? "#08785e" : "#d91c29"};
    border-radius: 10px;
    font-weight: 500;
  `;

  return (
    <Wrap>
      <Right>
        {isRight ? (
          <span>
            <span>O</span>
            <span>정답입니다.</span>
          </span>
        ) : (
          <span>
            <span>X</span>
            <span>오답입니다.</span>
          </span>
        )}
      </Right>
      <DescCon>
        해설
        <Desc>
          {type == "dev"
            ? DataDevelop[questionNumber].Desc
            : type == "design"
              ? DataDesign[questionNumber].Desc
              : "퀴즈 형식이 올바르지 않습니다."}
        </Desc>
      </DescCon>
    </Wrap>
  );
}

const Right = styled.div`
  & > span {
    display: flex;
    gap: 0.7rem;
    & > span:nth-child(1) {
      font-weight: 800;
    }
  }
`;

const DescCon = styled.div``;

const Desc = styled.span`
  &::before {
    content: " | ";
    font-weight: 600;
    margin-inline: 0.2rem;
  }
`;
