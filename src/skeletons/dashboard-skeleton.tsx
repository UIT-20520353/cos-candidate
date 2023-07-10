function DashboardSkeleton() {
  return (
    <div className={"mt-8 flex w-4/5 flex-row items-start gap-x-5"}>
      <div className={"flex w-3/5 flex-col items-start gap-y-5"}>
        <p className={"mb-2 text-2xl font-medium"}>Các cuộc thi sắp diễn ra</p>
        <div className={"w-full animate-pulse space-y-1"}>
          <div className={"h-7 w-full rounded bg-gray-300"}></div>
          <div className={"grid h-5 grid-cols-3 gap-1"}>
            <div className={"col-span-2 rounded bg-gray-300"}></div>
            <div className={"rounded bg-gray-300"}></div>
          </div>
        </div>
        <div className={"w-full animate-pulse space-y-1"}>
          <div className={"h-7 w-full rounded bg-gray-300"}></div>
          <div className={"grid h-5 grid-cols-3 gap-1"}>
            <div className={"col-span-2 rounded bg-gray-300"}></div>
            <div className={"rounded bg-gray-300"}></div>
          </div>
        </div>
        <div className={"w-full animate-pulse space-y-1"}>
          <div className={"h-7 w-full rounded bg-gray-300"}></div>
          <div className={"grid h-5 grid-cols-3 gap-1"}>
            <div className={"col-span-2 rounded bg-gray-300"}></div>
            <div className={"rounded bg-gray-300"}></div>
          </div>
        </div>
      </div>
      <div className={"flex flex-1 flex-col items-center gap-y-5"}>
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
                    Số đội tham gia
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="animate-pulse border border-black bg-stone-100">
                  <th scope="row" className="px-6 py-2">
                    <span className={"bg-gray-300 px-3 text-gray-300"}>1</span>
                  </th>
                  <td className="px-6 py-2">
                    <span className={"bg-gray-300 px-4 text-gray-300"}>dasjdkhka123123</span>
                  </td>
                  <td className="px-6 py-2">
                    <span className={"bg-gray-300 px-4 text-gray-300"}>12</span>
                  </td>
                </tr>
                <tr className="animate-pulse border border-black bg-stone-100">
                  <th scope="row" className="px-6 py-2">
                    <span className={"bg-gray-300 px-3 text-gray-300"}>1</span>
                  </th>
                  <td className="px-6 py-2">
                    <span className={"bg-gray-300 px-4 text-gray-300"}>dasjdkhka123123</span>
                  </td>
                  <td className="px-6 py-2">
                    <span className={"bg-gray-300 px-4 text-gray-300"}>12</span>
                  </td>
                </tr>
                <tr className="animate-pulse border border-black bg-stone-100">
                  <th scope="row" className="px-6 py-2">
                    <span className={"bg-gray-300 px-3 text-gray-300"}>1</span>
                  </th>
                  <td className="px-6 py-2">
                    <span className={"bg-gray-300 px-4 text-gray-300"}>dasjdkhka123123</span>
                  </td>
                  <td className="px-6 py-2">
                    <span className={"bg-gray-300 px-4 text-gray-300"}>12</span>
                  </td>
                </tr>
                <tr className="animate-pulse border border-black bg-stone-100">
                  <th scope="row" className="px-6 py-2">
                    <span className={"bg-gray-300 px-3 text-gray-300"}>1</span>
                  </th>
                  <td className="px-6 py-2">
                    <span className={"bg-gray-300 px-4 text-gray-300"}>dasjdkhka123123</span>
                  </td>
                  <td className="px-6 py-2">
                    <span className={"bg-gray-300 px-4 text-gray-300"}>12</span>
                  </td>
                </tr>
                <tr className="animate-pulse border border-black bg-stone-100">
                  <th scope="row" className="px-6 py-2">
                    <span className={"bg-gray-300 px-3 text-gray-300"}>1</span>
                  </th>
                  <td className="px-6 py-2">
                    <span className={"bg-gray-300 px-4 text-gray-300"}>dasjdkhka123123</span>
                  </td>
                  <td className="px-6 py-2">
                    <span className={"bg-gray-300 px-4 text-gray-300"}>12</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardSkeleton;
