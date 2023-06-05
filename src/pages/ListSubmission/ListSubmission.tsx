import { useParams } from "react-router-dom";

function ListSubmission() {
  const { idProblem } = useParams();

  return (
    <div className={"my-4 w-full bg-gray-300 p-3"}>
      <p className={"text-lg font-medium"}>Bảng chấm bài</p>
      <table className="w-full text-center text-sm text-gray-500">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700">
          <tr>
            <th scope="col" className="px-6 py-3">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              Thời gian nộp
            </th>
            <th scope="col" className="px-6 py-3">
              Bài tập
            </th>
            <th scope="col" className="px-6 py-3">
              Ngôn ngữ
            </th>
            <th scope="col" className="px-6 py-3">
              Kết quả
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b bg-white">
            <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-black">
              123671234
            </th>
            <td className="px-6 py-4 text-base font-medium text-black">
              <p>28/05/2023</p>
              <p>21:03</p>
            </td>
            <td className="px-6 py-4 text-base font-medium text-black">{idProblem}</td>
            <td className="px-6 py-4 text-base font-medium text-black">Java</td>
            <td className="px-6 py-4 font-bold text-green-800">Accepted</td>
          </tr>
          <tr className="border-b bg-gray-50">
            <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
              123671289234
            </th>
            <td className="px-6 py-4 text-base font-medium text-black">
              <p>28/05/2023</p>
              <p>20:23</p>
            </td>
            <td className="px-6 py-4 text-base font-medium text-black">{idProblem}</td>
            <td className="px-6 py-4 text-base font-medium text-black">Java</td>
            <td className="px-6 py-4 font-bold text-black">Compilation error</td>
          </tr>
          <tr className="border-b bg-white">
            <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-black">
              123671234
            </th>
            <td className="px-6 py-4 text-base font-medium text-black">
              <p>28/05/2023</p>
              <p>21:03</p>
            </td>
            <td className="px-6 py-4 text-base font-medium text-black">{idProblem}</td>
            <td className="px-6 py-4 text-base font-medium text-black">Java</td>
            <td className="px-6 py-4 font-bold text-black">Wrong answer on test 4</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ListSubmission;
