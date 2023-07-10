import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ISubmission } from "~/types";
import { getListSubmissions } from "~/Query";
import ShowCodeModal from "~/components/Modal/ShowCodeModal";
import { useSessionStorage } from "~/utils";
import { useQuery } from "@tanstack/react-query";
import ListSubmissionSkeleton from "~/skeletons/list-submission-skeleton";

type IPropsRow = {
  isOdd: boolean;
  data: ISubmission;
  openModal: (code: string, language: string) => void;
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
        <button className={"hover:underline "} onClick={() => props.openModal(props.data.code, props.data.language)}>
          {props.data.id}
        </button>
      </th>
      <td className="px-6 py-4 text-base font-medium text-black">
        <p>{getDateDisplay(props.data.date_submit)}</p>
        <p>{props.data.time_submit}</p>
      </td>
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
  const [user] = useSessionStorage("cos-candidate", null);
  const { idProblem } = useParams<{ idProblem: string }>();
  const [isOpenModal, setIsOpenModal] = useState<{ open: boolean; code: string; language: string }>({
    open: false,
    code: "",
    language: ""
  });

  const { data: submissions, isLoading: isFetchingSubmissions } = useQuery({
    queryKey: ["submission-list", `problem-${Number(idProblem) || -1}`, `user-${user.id}`],
    queryFn: () => {
      return getListSubmissions(Number(idProblem) || -1, user.id);
    }
  });

  useEffect(() => {
    document.title = "Các lần bạn nộp";
  }, []);

  const openModal = (code: string, language: string) => {
    setIsOpenModal({ open: true, code, language });
  };
  const closeModal = () => {
    setIsOpenModal({ open: false, code: "", language: "" });
  };

  return (
    <div className={"my-4 w-full bg-gray-300 p-3"}>
      <p className={"text-xl font-medium"}>Bảng chấm bài</p>
      {isFetchingSubmissions && <ListSubmissionSkeleton />}
      {!isFetchingSubmissions && (
        <table className="mt-5 w-full text-center text-sm text-gray-500">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Thời gian nộp
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
            {submissions?.map((submission, index) => {
              if (index % 2)
                return (
                  <RowSubmission
                    openModal={openModal}
                    key={`submission-${submission.id}`}
                    isOdd={false}
                    data={submission}
                  />
                );
              return (
                <RowSubmission
                  openModal={openModal}
                  key={`submission-${submission.id}`}
                  isOdd={true}
                  data={submission}
                />
              );
            })}
          </tbody>
        </table>
      )}

      {isOpenModal.open && (
        <ShowCodeModal language={isOpenModal.language} code={isOpenModal.code} closeModal={closeModal} />
      )}
    </div>
  );
}

export default ListSubmission;
