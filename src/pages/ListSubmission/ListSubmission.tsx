import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ISubmission } from "../../types/submission.type";
import { getListSubmissions } from "../../Query/api/submission-service";
import Swal from "sweetalert2";

type IPropsRow = {
  isOdd: boolean;
  data: ISubmission;
};

const getIdNumber = (id: string | undefined): number => {
  if (!id) return -1;
  const temp = id.split("-");
  return parseInt(temp[1]);
};

function RowSubmission(props: IPropsRow) {
  const getDateDisplay = (date: string): string => {
    const temp = date.split("-");
    return `${temp[2]}/${temp[1]}/${temp[0]}`;
  };

  return (
    <tr className={`border-b ${props.isOdd ? "bg-white" : "bg-gray-50"}`}>
      <th
        scope="row"
        className={`whitespace-nowrap px-6 py-4 font-medium ${props.isOdd ? "text-black" : "text-gray-900"}`}
      >
        {props.data.id}
      </th>
      <td className="px-6 py-4 text-base font-medium text-black">
        <p>{getDateDisplay(props.data.date_submit)}</p>
        <p>{props.data.time_submit}</p>
      </td>
      {/*<td className="px-6 py-4 text-base font-medium text-black">{idProblem}</td>*/}
      <td className="px-6 py-4 text-base font-medium text-black">{props.data.language}</td>
      <td
        className={`px-6 py-4 font-bold ${props.data.status === "Accepted" && "text-green-700"} ${
          props.data.status === "Wrong Answer" && "text-yellow-400"
        } ${props.data.status === "Compilation Error" && "text-red-600"}`}
      >
        {props.data.status}
      </td>
    </tr>
  );
}

function ListSubmission() {
  const { idProblem } = useParams<{ idProblem: string }>();
  const [submissions, setSubmissions] = useState<ISubmission[]>([]);

  const handleFetchData = async () => {
    Swal.fire({
      title: "Đang lấy dữ liệu",
      allowOutsideClick: false,
      showConfirmButton: false,
      position: "center",
      didOpen() {
        Swal.showLoading();
      }
    });

    const data = await getListSubmissions(getIdNumber(idProblem), parseInt(sessionStorage.getItem("id") ?? "-1"));
    if (data && data.length !== 0) setSubmissions(data ?? []);

    Swal.close();
  };

  useEffect(() => {
    handleFetchData();
  }, []);

  return (
    <div className={"my-4 w-full bg-gray-300 p-3"}>
      <p className={"text-xl font-medium"}>Bảng chấm bài</p>
      <table className="mt-5 w-full text-center text-sm text-gray-500">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700">
          <tr>
            <th scope="col" className="px-6 py-3">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              Thời gian nộp
            </th>
            {/*<th scope="col" className="px-6 py-3">*/}
            {/*  Bài tập*/}
            {/*</th>*/}
            <th scope="col" className="px-6 py-3">
              Ngôn ngữ
            </th>
            <th scope="col" className="px-6 py-3">
              Kết quả
            </th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((submission, index) => {
            if (index % 2) return <RowSubmission key={`submission-${submission.id}`} isOdd={false} data={submission} />;
            return <RowSubmission key={`submission-${submission.id}`} isOdd={true} data={submission} />;
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ListSubmission;
