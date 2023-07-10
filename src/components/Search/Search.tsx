import { SubmitHandler, useForm } from "react-hook-form";

type IProps = {
  handleSearch: (value: string) => void;
  placeHolder: string;
};

function Search(props: IProps) {
  const { register, handleSubmit } = useForm<{ searchText: string }>();

  const onSubmit: SubmitHandler<{ searchText: string }> = (data) => {
    props.handleSearch(data.searchText);
  };

  return (
    <form className={"flex w-1/2 items-center"} onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        className={
          "min-h-[50px] w-full rounded-[6px_0_0_6px] border border-solid border-[#5e4dcd] bg-transparent px-4 py-0 text-[15px] text-black focus:border-[#3898EC] focus:outline-none"
        }
        id={"search-input"}
        placeholder={props.placeHolder}
        autoComplete="off"
        {...register("searchText")}
      />
      <button
        className={
          "min-h-[50px] w-40 cursor-pointer rounded-[0_6px_6px_0] border-[none] bg-[#5e4dcd] px-[1em] py-[0.5em] text-[15px] text-white transition-[background-color] duration-[0.3s] ease-[ease-in-out] hover:bg-[#5e5dcd] focus:outline-none"
        }
        type="submit"
      >
        Tìm kiếm
      </button>
    </form>
  );
}

export default Search;
