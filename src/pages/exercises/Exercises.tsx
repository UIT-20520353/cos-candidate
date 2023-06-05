import Header from "../../components/Header";

function Exercises() {
  return (
    <div className={"flex w-full flex-col items-center"}>
      <Header />
      <div className={"my-8 w-4/5"}>
        <p className={"text-2xl font-medium text-[#10002b]"}>Danh sách bài tập</p>
        <table className="w-full text-center text-sm text-gray-500">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3">
                Mã
              </th>
              <th scope="col" className="px-6 py-3">
                Tên bài tập
              </th>
              <th scope="col" className="px-6 py-3">
                Số giải được
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
              <td className="px-6 py-4 text-base font-medium text-black">
                GCDFIB - Ước chung lớn nhất của dãy fibonacci
              </td>
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
              <td className="px-6 py-4 text-base font-medium text-black">
                GCDFIB - Ước chung lớn nhất của dãy fibonacci
              </td>
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
              <td className="px-6 py-4 text-base font-medium text-black">
                GCDFIB - Ước chung lớn nhất của dãy fibonacci
              </td>
              <td className="px-6 py-4 text-base font-medium text-black">Java</td>
              <td className="px-6 py-4 font-bold text-black">Wrong answer on test 4</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Exercises;
