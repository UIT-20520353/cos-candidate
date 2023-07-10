function StartContestSkeleton() {
  return (
    <div className={"mt-5 grid grid-cols-3 gap-4"}>
      {[1, 2, 3, 4, 5, 6].map((item) => {
        return (
          <div key={`start-contest-${item}`} className={"w-full animate-pulse space-y-2 rounded-md bg-gray-100 p-3"}>
            <div className={"h-7 w-2/3 rounded-full bg-gray-300"}></div>
            <div className={"h-8 w-1/3 rounded-full bg-gray-300"}></div>
            <div className={"h-5 w-1/2 rounded-full bg-gray-300"}></div>
            <div className={"h-5 w-1/2 rounded-full bg-gray-300"}></div>
            <div className={"h-5 w-1/2 rounded-full bg-gray-300"}></div>
            <div className={"h-5 w-1/2 rounded-full bg-gray-300"}></div>
            <div className={"h-9 w-1/2 rounded-md bg-gray-300"}></div>
          </div>
        );
      })}
    </div>
  );
}

export default StartContestSkeleton;
