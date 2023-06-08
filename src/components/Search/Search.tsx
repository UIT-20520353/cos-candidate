import { useRef } from "react";

type IProps = {
  handleSearch: (value: string) => void;
};

function Search(props: IProps) {
  const inputSearchRef = useRef<HTMLInputElement>(null);
  const handleSearchClick = () => {
    if (!inputSearchRef) return;
    props.handleSearch(inputSearchRef.current.value);
  };

  return (
    <div className={"my-5 flex w-full items-center"}>
      <input
        ref={inputSearchRef}
        type="text"
        className={
          "min-h-[50px] w-1/3 rounded-[6px_0_0_6px] border border-solid border-[#5e4dcd] bg-transparent px-4 py-0 text-[15px] text-black focus:border-[#3898EC] focus:outline-none"
        }
        id={"search-input"}
        placeholder="Nhập tên cuộc thi"
        autoComplete="off"
      />
      <button
        className={
          "min-h-[50px] w-40 cursor-pointer rounded-[0_6px_6px_0] border-[none] bg-[#5e4dcd] px-[1em] py-[0.5em] text-[15px] text-white transition-[background-color] duration-[0.3s] ease-[ease-in-out] hover:bg-[#5e5dcd] focus:outline-none"
        }
        type="button"
        onClick={handleSearchClick}
      >
        Tìm kiếm
      </button>
    </div>
  );
}

export default Search;
