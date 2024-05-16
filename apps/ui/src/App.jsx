import { Route, Routes, BrowserRouter } from "react-router-dom";
import MainPage from "./components/Pages/MainPage";
import QuestionPage from "./components/Pages/QuestionPage";
import RankPage from "./components/Pages/Rank";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/question" element={<QuestionPage />} />
        <Route path="/result" element={<RankPage />} />
      </Routes>
    </BrowserRouter>
  );
}
