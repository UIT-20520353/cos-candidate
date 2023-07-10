function ProblemsOfContestSkeleton() {
  return (
    <div className={"mt-5 grid w-full grid-cols-3 gap-3"}>
      {[1, 2, 3, 4, 5, 6].map((item) => {
        return (
          <div
            key={`problem-of-contest-${item}`}
            className={"w-full animate-pulse space-y-2 rounded-md bg-gray-100 p-2"}
          >
            <div className={"h-6 w-2/5 rounded-full bg-gray-300"}></div>
            <div className={"h-4 w-5/6 rounded-full bg-gray-300"}></div>
            <div className={"h-4 w-11/12 rounded-full bg-gray-300"}></div>
            <div className={"h-4 w-11/12 rounded-full bg-gray-300"}></div>
            <div className={"h-4 w-1/2 rounded-full bg-gray-300"}></div>
            <div className={"h-8 w-1/4 rounded-md bg-gray-300"}></div>
          </div>
        );
      })}
    </div>
  );
}

export default ProblemsOfContestSkeleton;
