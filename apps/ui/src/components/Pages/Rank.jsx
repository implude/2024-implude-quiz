import { useEffect, useState } from "react";
import axios from "axios";
import { styled } from "styled-components";
import { useSearchParams } from "react-router-dom";
import { DataDevelop } from "../Data-Develop";
import { DataDesign } from "../Data-Design";
import { ChevronDown } from "lucide-react";

export default function RankPage() {
  const [fetchDevData, setFetchDevData] = useState([]);
  const [fetchDesignData, setFetchDesignData] = useState([]);
  const [searchParams] = useSearchParams();
  const [totalScore, setTotalScore] = useState(0);

  useEffect(() => {
    let tempTotalScore = 0;
    searchParams.get("type") == "dev"
      ? DataDevelop.map((data) => {
          data.Point ? (tempTotalScore += Number(data.Point)) : null;
        })
      : searchParams.get("type") == "design"
        ? DataDesign.map((data) => {
            data.Point ? (tempTotalScore += Number(data.Point)) : null;
          })
        : null;
    setTotalScore(tempTotalScore);
  }, []);

  useEffect(() => {
    axios.get(import.meta.env.VITE_BASE_URL + "/get_dev").then((res) => {
      setFetchDevData(res.data.data);
    });
    axios.get(import.meta.env.VITE_BASE_URL + "/get_design").then((res) => {
      setFetchDesignData(res.data.data);
    });
  }, []);

  return (
    <>
      <Wrap>
        {searchParams.get("name") && searchParams.get("score") ? (
          <Greet>
            <Blue>{searchParams.get("name")}</Blue>님,{" "}
            <Blue>
              {searchParams.get("type") == "dev"
                ? "개발"
                : searchParams.get("type") == "design"
                  ? "디자인"
                  : null}
            </Blue>{" "}
            퀴즈에서 <Blue>{totalScore}</Blue>점 중{" "}
            <Blue>{searchParams.get("score")}</Blue>점 획득하셨습니다!
          </Greet>
        ) : null}
        <TableCon>
          <div>
            <Title>개발 퀴즈 랭킹</Title>
            <table>
              <thead>
                <tr>
                  <td>순위</td>
                  <td>이름</td>
                  <td>점수</td>
                </tr>
              </thead>
              <tbody>
                {fetchDevData[0] ? (
                  fetchDevData.map(({ id, name, score, same_name }, i) => (
                    <tr key={id}>
                      <td className={i < 3 ? "top" : null}>{i + 1}</td>
                      <td>
                        {name}{" "}
                        {same_name == "0"
                          ? null
                          : "(" + (Number(same_name) + 1) + ")"}
                      </td>
                      <td>{score}점</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3">아직 랭킹에 등록된 사용자가 없습니다.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div>
            <Title>디자인 퀴즈 랭킹</Title>
            <table>
              <thead>
                <tr>
                  <td>순위</td>
                  <td>이름</td>
                  <td>점수</td>
                </tr>
              </thead>
              <tbody>
                {fetchDesignData[0] ? (
                  fetchDesignData.map(({ id, name, score, same_name }, i) => (
                    <tr key={id}>
                      <td className={i < 3 ? "top" : null}>{i + 1}</td>
                      <td>
                        {name}{" "}
                        {same_name == "0"
                          ? null
                          : "(" + (Number(same_name) + 1) + ")"}
                      </td>
                      <td>{score}점</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3">아직 랭킹에 등록된 사용자가 없습니다.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </TableCon>
        <Implude>
          <img src="/img/logo.png" alt="임플루드 로고" /> #IMPLUDE
        </Implude>
        <VideoAlert>
          <ChevronDown /> 임플루드 홍보 영상 보기 <ChevronDown />
        </VideoAlert>
        <iframe
          width="1236"
          height="695"
          src="https://www.youtube.com/embed/9Ge3Xdw28kc?autoplay=1&mute=1"
          title="2024 #IMPLUDE 홍보영상"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      </Wrap>
    </>
  );
}

const Wrap = styled.div`
  box-sizing: border-box;
  padding: 2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  & table {
    border-collapse: collapse;
    & td {
      background: #fff;
      padding: 1rem 2rem;
      text-align: center;
    }
    & thead {
      font-weight: 600;
      & td {
        background: #005ecc;
        color: #fff;
      }
    }
    & tbody {
      & td {
        border-bottom: 1px solid #eaeaea;
        &.top {
          font-weight: 600;
          color: #0076ff;
        }
        &:nth-child(1) {
          font-size: 1.2rem;
        }
        &:nth-child(4) {
          color: #9f9f9f;
        }
      }
    }
  }
`;

const Blue = styled.span`
  color: #0076ff;
`;

const Greet = styled.div`
  font-size: 2rem;
  font-weight: 800;
  margin: 5rem 0;
`;

const Title = styled.div`
  font-size: 1.8rem;
  font-weight: 800;
  background: #fff;
  border-block: 3px solid #0076ff;
  box-sizing: border-box;
  padding: 0.6rem 12rem;
  text-align: center;
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

const TableCon = styled.div`
  display: flex;
  gap: 2rem;
  & > div {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;

const VideoAlert = styled.div`
  color: #000;
  display: flex;
  align-items: center;
  gap: 0.2rem;
  font-weight: 700;
`;
