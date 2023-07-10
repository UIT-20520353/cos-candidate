function RegisterContestSkeleton() {
  return (
    <div className={"mt-5 w-full "}>
      <div className={"w-full animate-pulse space-y-2 rounded-md bg-gray-100 p-3"}>
        <div className={"grid grid-cols-3"}>
          <div className={"h-6 w-2/3 rounded-full bg-gray-300"}></div>
          <div className={"h-6 w-full"}></div>
          <div className={"h-6 w-2/3 rounded-full bg-gray-300"}></div>
        </div>
        <div className={"grid grid-cols-3"}>
          <div className={"h-5 w-5/6 rounded-full bg-gray-300"}></div>
          <div className={"h-5 w-2/3 rounded-full bg-gray-300"}></div>
          <div className={"h-5 w-1/2 rounded-full bg-gray-300"}></div>
        </div>
        <div className={"h-5 w-1/6 rounded-full bg-gray-300"}></div>
        <div className={"h-40 w-full rounded-md bg-gray-300"}></div>
      </div>
      <div className={"mt-5 w-full"}>
        <p className={"text-xl font-medium text-black"}>Danh sách các đội đã đăng ký</p>
        <div className={"mt-3 grid w-full animate-pulse grid-cols-3 gap-3"}>
          <div className={"w-full space-y-2 bg-gray-100 p-2"}>
            <div className={"h-4 w-1/3 rounded-full bg-gray-300"}></div>
            <div className={"h-4 w-5/6 rounded-full bg-gray-300"}></div>
            <div className={"h-4 w-3/4 rounded-full bg-gray-300"}></div>
            <div className={"h-4 w-1/2 rounded-full bg-gray-300"}></div>
          </div>
          <div className={"w-full space-y-2 bg-gray-100 p-2"}>
            <div className={"h-4 w-1/3 rounded-full bg-gray-300"}></div>
            <div className={"h-4 w-5/6 rounded-full bg-gray-300"}></div>
            <div className={"h-4 w-3/4 rounded-full bg-gray-300"}></div>
            <div className={"h-4 w-1/2 rounded-full bg-gray-300"}></div>
          </div>
          <div className={"w-full space-y-2 bg-gray-100 p-2"}>
            <div className={"h-4 w-1/3 rounded-full bg-gray-300"}></div>
            <div className={"h-4 w-5/6 rounded-full bg-gray-300"}></div>
            <div className={"h-4 w-3/4 rounded-full bg-gray-300"}></div>
            <div className={"h-4 w-1/2 rounded-full bg-gray-300"}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterContestSkeleton;
