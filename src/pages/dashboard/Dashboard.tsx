import Header from "../../components/Header";
import "react-toastify/dist/ReactToastify.css";

function Dashboard() {
  return (
    <div className={"flex w-full flex-col items-center"}>
      <Header />

      <div className={"mt-8 flex w-4/5 flex-row items-start gap-x-5"}>
        <div className={"flex w-3/5 flex-col items-start gap-y-7"}>
          <div className={"w-full"}>
            <p className={"cursor-pointer text-2xl font-medium text-blue-950 hover:text-blue-800"}>
              Thi học sinh giỏi tin học cấp tỉnh Ninh Thuận
            </p>
            <p className={"text-xl"}>
              <span className={"cursor-pointer text-amber-500 hover:text-amber-700"}>
                Trường trung học phổ thông chuyên Lê Quý Đôn
              </span>
              , ngày 12/03/2023
            </p>
          </div>
          <div className={"w-full"}>
            <p className={"cursor-pointer text-2xl font-medium text-blue-950 hover:text-blue-800"}>
              Thi học sinh giỏi tin học cấp quốc gia
            </p>
            <p className={"text-xl"}>
              <span className={"cursor-pointer text-amber-500 hover:text-amber-700"}>Bộ giáo dục</span>, ngày 30/04/2023
            </p>
          </div>
          <div className={"w-full"}>
            <p className={"cursor-pointer text-2xl font-medium text-blue-950 hover:text-blue-800"}>Testing Round 49</p>
            <p className={"text-xl"}>
              <span className={"cursor-pointer text-amber-500 hover:text-amber-700"}>Free contest</span>, ngày
              06/05/2023
            </p>
          </div>
          <div className={"w-full"}>
            <p className={"cursor-pointer text-2xl font-medium text-blue-950 hover:text-blue-800"}>
              Beginner Free Contest 51
            </p>
            <p className={"text-xl"}>
              <span className={"cursor-pointer text-amber-500 hover:text-amber-700"}>Free contest</span>, ngày
              15/04/2023
            </p>
          </div>
        </div>
        <div className={"flex flex-1 flex-col items-center gap-y-7"}>
          <div className={"w-full rounded-md border-gray-300 bg-gray-200 p-3 shadow-md"}>
            <p className={"text-xl font-semibold text-blue-950"}>Bảng xếp hạng các đội</p>

            <div className="overflow-x-auto">
              <table className="mt-3 w-full text-left text-sm text-gray-500">
                <thead className="border border-black bg-stone-100 text-xs uppercase text-gray-700">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Hạng
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Tên đội
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Điểm
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border border-black bg-stone-200">
                    <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                      1
                    </th>
                    <td className="cursor-pointer px-6 py-4 hover:text-black">Đội này mạnh</td>
                    <td className="px-6 py-4">1570</td>
                  </tr>
                  <tr className="border border-black bg-stone-200">
                    <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                      2
                    </th>
                    <td className="cursor-pointer px-6 py-4 hover:text-black">UIT</td>
                    <td className="px-6 py-4">1480</td>
                  </tr>
                  <tr className="border border-black bg-stone-200">
                    <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                      3
                    </th>
                    <td className="cursor-pointer px-6 py-4 hover:text-black">BKU</td>
                    <td className="px-6 py-4">1450</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className={"w-full rounded-md border-gray-300 bg-gray-200 p-3 shadow-md"}>
            <p className={"text-xl font-semibold text-blue-950"}>Bảng xếp hạng các cuộc thi</p>

            <div className="overflow-x-auto">
              <table className="mt-3 w-full text-left text-sm text-gray-500">
                <thead className="border border-black bg-stone-100 text-xs uppercase text-gray-700">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Hạng
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Tên cuộc thi
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Số thí sinh
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border border-black bg-stone-200">
                    <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                      1
                    </th>
                    <td className="cursor-pointer px-6 py-4 hover:text-black">Beginner Free Contest 51</td>
                    <td className="px-6 py-4">86</td>
                  </tr>
                  <tr className="border border-black bg-stone-200">
                    <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                      2
                    </th>
                    <td className="cursor-pointer px-6 py-4 hover:text-black">We code</td>
                    <td className="px-6 py-4">56</td>
                  </tr>
                  <tr className="border border-black bg-stone-200">
                    <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                      3
                    </th>
                    <td className="cursor-pointer px-6 py-4 hover:text-black">Testing Round 49</td>
                    <td className="px-6 py-4">50</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
