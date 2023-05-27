import Header from "../../components/Header";
import { NavLink, useParams } from "react-router-dom";
import { useState } from "react";
import CodeEditor from "../../components/CodeEditor";

function DetailProblem() {
  const { idProblem, idContest } = useParams();
  const [solution, setSolution] = useState<string>("");

  const handleCodeChange = (code: string) => {
    setSolution(code);
  };

  const handleSubmit = () => {
    console.log(solution);
  };

  return (
    <div className={"flex w-full flex-col items-center"}>
      <Header />
      <div className={"my-8 w-4/5"}>
        <div className={"flex w-full flex-row items-start justify-between gap-3"}>
          <p className={"flex-1 text-3xl font-medium text-[#10002b]"}>{idProblem}</p>
          <NavLink
            className={"rounded-md bg-gray-200 px-5 py-2 font-medium shadow-md duration-300 hover:bg-gray-300"}
            to={`/contest/enter/${idContest}`}
          >
            Quay lại
          </NavLink>
        </div>
        <div className={"mt-4 grid w-full gap-y-3 rounded-md bg-gray-100 p-3 shadow-md"}>
          <div className={"w-full"}>
            <p className={"text-xl font-medium"}>Đề bài</p>
            <p className={"text-base font-normal"}>
              Trò chơi ô chữ được diễn ra trên bảng chữ hình chữ nhật kích thước m×n. Các dòng của bảng được đánh số từ
              1 đến m, từ trên xuống dưới, các cột của bảng được đánh số từ 1 đến n, từ trái qua phải. Ô nằm trên giao
              của dòng i và cột j được gọi là ô (i, j). Mỗi ô của lưới chứa một ký tự. Khi bắt đầu trò chơi, người chơi
              sẽ được cho một từ khóa P là một xâu ký tự và nhiệm vụ của người chơi là xuất phát từ ô (1, 1), kết thúc
              tại ô (m, n) để tìm một đường đi trên bảng chữ chứa từ khoá P. Tại mỗi bước, người chơi có thể di chuyển
              sang ô kề cạnh bên phải hoặc sang ô kề cạnh bên dưới. Khi kết thúc trò chơi, người chơi nhận được một xâu
              ký tự T gồm các ký tự trong các ô trên đường đi được xếp liên tiếp nhau. Người chơi giành chiến thắng nếu
              từ khóa P xuất hiện trong xâu T, nghĩa là từ khoá P trùng với một đoạn gồm các ký tự liên tiếp trong T.
              Yêu cầu: Cho bảng chữ và từ khóa P, đếm số lượng đường đi khác nhau giúp người chơi giành chiến thắng. Hai
              đường đi được gọi là khác nhau nếu tồn tại một ô thuộc đường đi này nhưng không thuộc đường đi kia.
            </p>
          </div>
          <div className={"w-full"}>
            <p className={"text-lg font-medium"}>Dữ liệu vào</p>
            <p className={"text-base font-normal"}>
              Dòng đầu tiên ghi ba số nguyên dương m, n, D (D ≤ 109, m,n {"<"}=100) Dòng thứ hai chứa từ khóa P là một
              xâu gồm không quá m+n-1 chữ cái in hoa, mỗi chữ cái được lấy trong 26 chữ cái từ ‘A’ đến ‘Z’. Tiếp đến là
              m dòng mô tả bảng chữ, mỗi dòng chứa một xâu gồm n ký tự, mỗi ký tự là một chữ cái in hoa trong 26 chữ cái
              từ ‘A’ đến ‘Z’.
            </p>
          </div>
          <div className={"w-full"}>
            <p className={"text-lg font-medium"}>Dữ liệu ra</p>
            <p className={"text-base font-normal"}>số lượng đường đi đếm được chia dư cho D</p>
          </div>
          <div className={"w-full"}>
            <p className={"text-lg font-medium"}>Dữ liệu mẫu</p>
            <div className={"mt-2 grid w-full grid-cols-2"}>
              <div className={"w-full border border-b-0 border-r-0 border-black text-center"}>
                <p className={"text-lg font-medium uppercase"}>input</p>
              </div>
              <div className={"w-full border border-b-0 border-black text-center"}>
                <p className={"text-lg font-medium uppercase"}>output</p>
              </div>
              <div className={"w-full border border-r-0 border-black text-center"}>
                <p>
                  3 3 10 <br /> VOI <br /> VOI <br /> VVV <br /> IOI
                </p>
              </div>
              <div className={"w-full border border-black text-center"}>
                <p>3</p>
              </div>
            </div>
          </div>
        </div>
        <div className={"mt-4 w-full rounded-md bg-gray-200 p-3 shadow-md"}>
          <CodeEditor solution={solution} updateSolution={handleCodeChange} />
          <button
            type={"button"}
            className={"mt-3 w-full rounded-md bg-[#023e8a] px-5 py-2 text-white duration-200 hover:bg-[#0247A1]"}
            onClick={handleSubmit}
          >
            Nộp bài
          </button>
        </div>
      </div>
    </div>
  );
}

export default DetailProblem;
