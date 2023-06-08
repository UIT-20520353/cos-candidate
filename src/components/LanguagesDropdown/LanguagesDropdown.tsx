import Select from "react-select";
import { ILanguageOption, languageOptions } from "../../constants/languageOptions";
import { customStyles } from "../../constants/customStyles";

type IProps = {
  onSelectChange: (sl: ILanguageOption) => void;
};

function LanguagesDropdown(props: IProps) {
  return (
    <Select
      placeholder={`Filter By Category`}
      options={languageOptions}
      styles={customStyles}
      defaultValue={languageOptions[0]}
      onChange={(selectedOption) => props.onSelectChange(selectedOption)}
    />
  );
}

export default LanguagesDropdown;
