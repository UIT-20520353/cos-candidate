function ContestSkeleton() {
  return (
    <li className={"space-y-2 rounded-md border border-gray-200 bg-gray-100 p-3 shadow-md"}>
      <div className={"h-7 w-60 animate-pulse bg-gray-300"}></div>
      <div className={"h-8 w-32 animate-pulse bg-gray-300"}></div>
      <div className={"h-7 w-44 animate-pulse bg-gray-300"}></div>
      <div className={"h-7 w-36 animate-pulse bg-gray-300"}></div>
      <div className={"h-7 w-36 animate-pulse bg-gray-300"}></div>
      <div className={"h-7 w-32 animate-pulse bg-gray-300"}></div>
    </li>
  );
}

export default ContestSkeleton;
