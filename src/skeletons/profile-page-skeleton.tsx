function ProfilePageSkeleton() {
  return (
    <div className={"mt-8 w-4/5 animate-pulse"}>
      <div className={"flex flex-row items-center justify-between"}>
        <div className={"h-7 w-1/6 rounded-md bg-gray-300"}></div>
        <div className={"h-10 w-32 rounded-md bg-gray-300"}></div>
      </div>
      <div className={"mt-5 grid w-full grid-cols-2 gap-4 rounded-md bg-gray-300 p-3"}>
        <div className={"h-10 w-full rounded-md bg-gray-100"}></div>
        <div className={"h-10 w-full rounded-md bg-gray-100"}></div>
        <div className={"h-10 w-full rounded-md bg-gray-100"}></div>
        <div className={"h-10 w-full rounded-md bg-gray-100"}></div>
        <div className={"col-span-2 h-10 w-full rounded-md bg-gray-100"}></div>
      </div>
    </div>
  );
}

export default ProfilePageSkeleton;
